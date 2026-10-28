import { router, useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import { TouchableOpacity, FlatList, Alert, Button, Image, Linking, Platform, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebaseConfig";

const mostrarAlerta = (titulo: string, mensagem: string) => {
  if (Platform.OS === "web") {
    window.alert(`${titulo}\n\n${mensagem}`);
    return;
  }

  Alert.alert(titulo, mensagem);
};

export default function Cadastro() {
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [editandoId, setEditandoId] = useState<string | null>(null);

  const validarCampos = () => {
    if (!nome.trim() || !senha.trim() || !email.trim()) {
      mostrarAlerta("Atenção", "Preencha nome, email e senha");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      mostrarAlerta("Atenção", "Informe um email válido, como usuario@gmail.com");
      return false;
    }

    if (senha.trim().length < 8) {
      mostrarAlerta("Atenção", "A senha precisa ter pelo menos 8 caracteres");
      return false;
    }

    return true;
  };

  const iniciarEdicao = (usuario: any) => {
    setNome(usuario.nome);
    setEmail(usuario.email ?? "");
    setSenha(usuario.senha ?? "");
    setEditandoId(usuario.id);
  };
  const listarUsuarios = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "usuarios"));
      const lista: any[] = [];
      querySnapshot.forEach((documento) => {
        lista.push({ id: documento.id, ...documento.data() });
      });
      setUsuarios(lista);
    } catch (error) {
      console.error("Erro ao listar:", error);
      mostrarAlerta("Erro", "Não foi possível carregar os usuarios");
    }
  };

  const limparCampos = () => {
    setNome("");
    setEmail("")
    setSenha("");
    setEditandoId(null);
  };

  const adicionarUsuario = async () => {
    if (!validarCampos()) {
      return;
    }

    try {
      await addDoc(collection(db, "usuarios"), {
        nome: nome.trim(),
        email: email.trim(),
        senha: senha.trim(),
      });
      limparCampos();
      mostrarAlerta("Sucesso", "Usuário cadastrado!");
    } catch (error) {
      console.error("Erro ao adicionar:", error);
      mostrarAlerta("Erro", "Não foi possível adicionar o usuario");
    }
  };

  const atualizarUsuario = async () => {
    if (!editandoId) {
      mostrarAlerta("Atenção", "Selecione um usuário para editar");
      return;
    }

    if (!validarCampos()) {
      return;
    }

    try {
      const usuarioRef = doc(db, "usuarios", editandoId);
      await updateDoc(usuarioRef, {
        nome: nome.trim(),
        email: email.trim(),
        senha: senha.trim(),
      });
      mostrarAlerta("Sucesso", "Usuario atualizado!");
      limparCampos();
      await listarUsuarios();
    } catch (error) {
      console.error("Erro ao atualizar:", error);
      mostrarAlerta("Erro", "Não foi possível atualizar o usuario");
    }
  };

  useEffect(() => {
    listarUsuarios();
  }, []);

  const confirmarExclusao = async (id: string) => {
    try {
      await deleteDoc(doc(db, "usuarios", id));
      mostrarAlerta("Sucesso", "Usuário excluído!");
      listarUsuarios();
    } catch (error) {
      console.error("Erro ao excluir:", error);
      mostrarAlerta("Erro", "Não foi possível excluir o usuário");
    }
  };

  const excluirUsuario = (id: string, nomeUsuario: string) => {
    const mensagem = `Deseja excluir o usuario ${nomeUsuario}?`;
    if (Platform.OS === "web") {
      if (window.confirm(mensagem)) {
        void confirmarExclusao(id);
      }
      return;
    }

    Alert.alert("Confirmar exclusão", mensagem, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () => void confirmarExclusao(id),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.logoButton}
        onPress={() => router.replace("/")}
        accessibilityRole="button"
      >
        <Image
          style={styles.logo}
          source={require("../assets/images/FakeTube.png")}
          resizeMode="contain"
        />
        <Text style={styles.nomeApp}>FakeTube</Text>
      </Pressable>
      <Text style={styles.titulo}>Crie sua conta</Text>

      {/* Formulário */}
      <TextInput
        style={styles.input}
        placeholder="Nome do usuario"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
      />

      {editandoId ? (
        <View style={styles.botoesEdicao}>
          <Button
            title="Atualizar Usuario"
            onPress={atualizarUsuario}
            color="#e53935"
          />
          <View style={{ height: 8 }} />
          <Button title="Cancelar Edição" onPress={limparCampos} color="#70757d" />
        </View>
      ) : (
        <Button title="Terminar cadastro" onPress={adicionarUsuario} color="#e53935" />
      )}
      <Button title="Voltar para o início" onPress={() => router.replace("/")} color="#626a73" />

      <Text style={styles.subtitulo}>Lista de usuarios</Text>

      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.info}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.email}>{item.email}</Text>
              <Text style={styles.senha}>{item.senha}</Text>
            </View>

            <View style={styles.acoes}>
              <TouchableOpacity
                style={[styles.botao, styles.botaoEditar]}
                onPress={() => iniciarEdicao(item)}
              >
                <Text style={styles.textoBotao}>Editar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.botao, styles.botaoExcluir]}
                onPress={() => excluirUsuario(item.id, item.nome)}
              >
                <Text style={styles.textoBotao}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.vazio}>Nenhum usuario cadastrado ainda.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 12,
    backgroundColor: "#f6f7f9",
  },
  logoButton: {
    alignSelf: "center",
    alignItems: "center",
    padding: 8,
    marginBottom: 8,
  },
  logo: {
    width: 110,
    height: 65,
    alignSelf: "center",
  },
  nomeApp: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    color: "#25282d",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#202124",
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e0e3e8",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    fontSize: 16,
    color: "#202124",
  },
  botoesEdicao: {
    marginBottom: 12,
    gap: 8,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 25,
    marginBottom: 12,
    color: "#303238",
  },
  item: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e8eaed",
    elevation: 1,
  },
  info: {
    flex: 1,
  },
  nome: {
    fontSize: 16,
    fontWeight: "600",
    color: "#202124",
  },
  email: {
    fontSize: 14,
    color: "#68707a",
    marginTop: 2,
  },
  senha: {
    fontSize: 14,
    color: "#68707a",
    marginTop: 2,
  },
  acoes: {
    flexDirection: "row",
    gap: 8,
  },
  botao: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  botaoEditar: {
    backgroundColor: "#e53935",
  },
  botaoExcluir: {
    backgroundColor: "#70757d",
  },
  textoBotao: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
  vazio: {
    textAlign: "center",
    marginTop: 30,
    color: "#7a8089",
  },
});