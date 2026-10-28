import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Button, Image, Linking, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function PesquisaScreen() {
    const { pesquisa } = useLocalSearchParams<{ pesquisa?: string }>();
    const [novaPesquisa, setPesquisa] = useState('');
    function pesquisar() {
        setPesquisa(novaPesquisa);
    }

    function barraPesquisa() {
        router.push({
            pathname: '/pesquisa',
            params: {
                pesquisa: novaPesquisa,
            },
        })
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
                    placeholder="Pesquisar vídeos"
                    value={novaPesquisa}
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
            <Text style={styles.query}>{pesquisa}</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f6f7f9',
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 18,
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
    query: {
        padding: 14,
        borderRadius: 10,
        backgroundColor: '#ffffff',
        color: '#303238',
        fontSize: 16,
    },
})