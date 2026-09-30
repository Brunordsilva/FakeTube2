import { router } from 'expo-router';
import { useState } from 'react';
import { Button, Image, Linking, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import * as Location from 'expo-location';

export default function ProximosScreen() {
    const [pesquisa, setPesquisa] = useState('');
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);
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

    async function descobrirLocalizacao() {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
            alert("Permissão de localização negada!");
            return;
        }

        const location = await Location.getCurrentPositionAsync({});

        setLatitude(location.coords.latitude);
        setLongitude(location.coords.longitude);
    }

    function souza() {
        Linking.openURL('https://www.youtube.com/@Souzones');
    }

    function euhipe() {
        Linking.openURL('https://www.youtube.com/@EuHipe');
    }

    function gamer() {
        Linking.openURL('https://www.youtube.com/bitgamer');
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

            <Button title="Usar minha localização" onPress={descobrirLocalizacao} />

            {latitude !== null && (
                <View style={styles.resultado}>
                    <Text>Latitude: {latitude}</Text>

                    <Text>Longitude: {longitude}</Text>

                    <Text>Youtubers proximo a voce</Text>

                    <View style={styles.headerRow}>
                        <Pressable testID='souzone'
                            style={styles.canalButton}
                            onPress={souza}
                        >
                            <Image
                                style={styles.imagemCanal}
                                source={require('../assets/images/souzones.jpg')}
                            />
                            <Text>Souzones</Text>
                        </Pressable>

                        <Pressable testID='hipe'
                            style={styles.canalButton}
                            onPress={gamer}
                        >
                            <Image
                                style={styles.imagemCanal}
                                source={require('../assets/images/bit.jpg')}
                            />
                            <Text>Bitgamer</Text>
                        </Pressable>

                        <Pressable testID='hipe'
                            style={styles.canalButton}
                            onPress={euhipe}
                        >
                            <Image
                                style={styles.imagemCanal}
                                source={require('../assets/images/euhipe.jpg')}
                            />
                            <Text>Eu Hipe</Text>
                        </Pressable>
                    </View>
                </View>
            )}
        </SafeAreaView >
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
        gap: 10,
    },
    imagemCanal: {
        width: 'auto',
        height: 200,
    },
    canalButton: {
        padding: 18,
        marginRight: '10%',
        borderRadius: 10,
    },
})