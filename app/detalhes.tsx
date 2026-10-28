import { router } from 'expo-router';
import { useState } from 'react';
import { Button, Image, Linking, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function DetalhesScreen() {
    const [pesquisa, setPesquisa] = useState('');
    const [cep, setCep] = useState('');
    const [endereco, setEndereco] = useState<any>(null);
    const [erro, setErro] = useState('');
    const [carregando, setCarregando] = useState(false);
    
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

                <Pressable
                    testID='logo'
                    style={styles.headerBrand}
                    onPress={() => router.replace('/')}
                    accessibilityRole='button'
                >
                    <Image testID='logo'
                        style={styles.logo}
                        source={require('../assets/images/FakeTube.png')}
                    />
                    <Text style={styles.title}>FakeTube</Text>
                </Pressable>

                <TextInput testID='pesquisa'
                    style={styles.input}
                    placeholder="Pesquisar"
                    value={pesquisa}
                    onChangeText={setPesquisa}
                />

                <Pressable testID='lupa'
                    style={styles.searchButton}
                    onPress={barraPesquisa}
                >
                    <Image
                        style={styles.lupa}
                        source={require('../assets/images/lupa.png')}
                    />

                </Pressable>
            </View>

            <View style={styles.content}>
                <Text style={styles.title}>📍 Buscar endereço</Text>

                <Text style={styles.instruction}>Digite um CEP para consultar o endereço:</Text>

                <TextInput
                    style={styles.cepInput}
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
                    color="#e53935"
                />

                {erro !== "" && <Text style={styles.erro}>❌ {erro}</Text>}

                {endereco && (
                    <View style={styles.resultado}>
                        <Text style={styles.subtitulo}>📌 Endereço encontrado</Text>

                        <Text style={styles.resultadoTexto}>CEP: {endereco.cep}</Text>
                        <Text style={styles.resultadoTexto}>Rua: {endereco.logradouro}</Text>
                        <Text style={styles.resultadoTexto}>Bairro: {endereco.bairro}</Text>
                        <Text style={styles.resultadoTexto}>Cidade: {endereco.localidade}</Text>
                        <Text style={styles.resultadoTexto}>Estado: {endereco.uf}</Text>

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
        backgroundColor: '#f6f7f9',
    },
    content: {
        flex: 1,
        padding: 18,
        gap: 12,
        borderRadius: 12,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#e8eaed',
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 16,
    },
    logo: {
        width: 58,
        height: 54,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: '#202124',
    },
    headerBrand: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    lupa: {
        width: 30,
        height: 30,
    },
    input: {
        flex: 1,
        minWidth: 0,
        height: 44,
        borderWidth: 1,
        borderColor: '#e0e3e8',
        borderRadius: 10,
        paddingHorizontal: 12,
        backgroundColor: '#ffffff',
        color: '#202124',
    },
    cepInput: {
        height: 44,
        borderWidth: 1,
        borderColor: '#e0e3e8',
        borderRadius: 10,
        paddingHorizontal: 12,
        backgroundColor: '#ffffff',
        color: '#202124',
    },
    searchButton: {
        width: 42,
        height: 42,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#e0e3e8',
    },
    resultado: {
        padding: 16,
        gap: 8,
        borderRadius: 12,
        backgroundColor: '#f6f7f9',
    },

    subtitulo: {
        fontSize: 18,
        fontWeight: "bold",
        color: '#303238',
    },
    instruction: {
        color: '#616873',
        fontSize: 15,
    },
    resultadoTexto: {
        color: '#3e434a',
        fontSize: 15,
    },

    erro: {
        fontSize: 16,
        color: '#c62828',
    },
})