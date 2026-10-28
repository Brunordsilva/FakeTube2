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
                    placeholder="Pesquisar"
                    value={novaPesquisa}
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
            <Text>{pesquisa}</Text>
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
    headerBrand: {
        flexDirection: 'row',
        alignItems: 'center',
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