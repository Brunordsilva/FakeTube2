import { router } from 'expo-router';
import { useState } from 'react';
import { Button, Image, Linking, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function DetalhesScreen() {
    const [pesquisa, setPesquisa] = useState('');
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


            <Text>Tem nada aqui, volta</Text>
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
})