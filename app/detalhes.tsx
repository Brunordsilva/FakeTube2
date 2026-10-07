import { router } from 'expo-router';
import { useState } from 'react';
import { Button, Image, Linking, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function DetalhesScreen() {
    const [pesquisa, setPesquisa] = useState('');
    const [cep, setCep] = useState('');
    const [endereco, setEndereco] = useState<any>(null);
    const [erro, setErro] = useState('');
    const [carregando, setCarregando] = useState(false);
    
    function Logo() {
        router.back();
    }

    function pesquisar() {
        setPesquisa(pesquisa);
    }

    function barraPesquisa() {
        router.push({
            pathname: '/pesquisa',
            params: {
                pesquisa: pesquisa,
            },
        })
    }

    async function achaEndereço() {
        setErro('');
        setEndereco(null);

        if (cep.length != 8) {
            setErro('Digite um cep com 8 numeros');
            return;
        }

        setCarregando(true);

        try {
            const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const dados = await resposta.json();

            if (dados.erro) {
                setErro('CEP não encontrado');
                return;
            }

        setEndereco(dados);
        } catch (erro) {
            setErro('Não foi possivel consultar o CEP.');
        } finally {
            setCarregando(false);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerRow}>

                <Pressable testID='logo' onPress={Logo}>
                    
                    <Image testID='logo'
                        style={styles.logo}
                        source={require('../assets/images/FakeTube.png')}
                    />

                </Pressable>

                <View style={styles.headerTextWrap}>
                    
                    <Text style={styles.title}>FakeTube</Text>

                </View>

                <TextInput testID='pesquisa'
                    style={styles.input}
                    placeholder="Pesquisar"
                    value={pesquisa}
                    onChangeText={setPesquisa}
                />

                <Pressable testID='lupa'
                    style={styles.button}
                    onPress={barraPesquisa}
                >
                    <Image
                        style={styles.lupa}
                        source={require('../assets/images/lupa.png')}
                    />

                </Pressable>
            </View>

            <View style={styles.container}>
                <Text style={styles.title}>📍 Buscar endereço</Text>

                <Text>Digite um CEP para consultar o endereço:</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Ex: 93510000"
                    keyboardType="numeric"
                    value={cep}
                    onChangeText={setCep}
                    maxLength={8}
                />

                <Button
                    title={carregando ? "Buscando..." : "Buscar CEP"}
                    onPress={achaEndereço}
                    disabled={carregando}
                />

                {erro !== "" && <Text style={styles.erro}>❌ {erro}</Text>}

                {endereco && (
                    <View style={styles.resultado}>
                        <Text style={styles.subtitulo}>📌 Endereço encontrado</Text>

                        <Text>CEP: {endereco.cep}</Text>
                        <Text>Rua: {endereco.logradouro}</Text>
                        <Text>Bairro: {endereco.bairro}</Text>
                        <Text>Cidade: {endereco.localidade}</Text>
                        <Text>Estado: {endereco.uf}</Text>

                    </View>
                )}
                
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#ffffff',
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 100,
        height: 90,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 4,
    },
    headerTextWrap: {
        marginLeft: 12,
    },
    lupa: {
        width: 80,
        height: 60,
    },
    input: {
        borderWidth: 1,
        borderColor: '#dad60cfa',
        borderRadius: 8,
        padding: 10,
        marginBottom: 12,
        width: '80%'
    },
    button: {
        padding: 18,
        borderRadius: 10,
    },
    resultado: {
        padding: 20,
        gap: 8,
        borderRadius: 10,
    },

    subtitulo: {
        fontSize: 20,
        fontWeight: "bold",
    },

    erro: {
        fontSize: 16,
    },
})