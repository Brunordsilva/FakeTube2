import { router } from 'expo-router';
import { useState } from 'react';
import { Button, Image, Linking, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import * as Location from 'expo-location';

export default function ProximosScreen() {
    const [pesquisa, setPesquisa] = useState('');
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);
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

            <Button title="Usar minha localização" onPress={descobrirLocalizacao} color="#e53935" />

            {latitude !== null && (
                <View style={styles.resultado}>
                    <Text style={styles.coordinates}>Latitude: {latitude}</Text>

                    <Text style={styles.coordinates}>Longitude: {longitude}</Text>

                    <Text style={styles.sectionTitle}>Youtubers próximo a você</Text>

                    <View style={styles.channelsRow}>
                        <Pressable testID='souzone'
                            style={styles.canalButton}
                            onPress={souza}
                        >
                            <Image
                                style={styles.imagemCanal}
                                source={require('../assets/images/souzones.jpg')}
                            />
                            <Text style={styles.channelName}>Souzones</Text>
                        </Pressable>

                        <Pressable testID='bitzin'
                            style={styles.canalButton}
                            onPress={gamer}
                        >
                            <Image
                                style={styles.imagemCanal}
                                source={require('../assets/images/bit.jpg')}
                            />
                            <Text style={styles.channelName}>Bitgamer</Text>
                        </Pressable>

                        <Pressable testID='hipe'
                            style={styles.canalButton}
                            onPress={euhipe}
                        >
                            <Image
                                style={styles.imagemCanal}
                                source={require('../assets/images/euhipe.jpg')}
                            />
                            <Text style={styles.channelName}>Eu Hipe</Text>
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
        backgroundColor: '#f6f7f9',
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
        marginTop: 18,
        padding: 16,
        gap: 12,
        borderRadius: 12,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#e8eaed',
    },
    coordinates: {
        color: '#616873',
        fontSize: 14,
    },
    sectionTitle: {
        color: '#202124',
        fontSize: 18,
        fontWeight: '700',
    },
    channelsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    canalButton: {
        flexGrow: 1,
        flexBasis: 90,
        alignItems: 'center',
        gap: 8,
        padding: 12,
        borderRadius: 12,
        backgroundColor: '#f6f7f9',
    },
    imagemCanal: {
        width: 76,
        height: 76,
        borderRadius: 38,
    },
    channelName: {
        color: '#303238',
        fontSize: 14,
        fontWeight: '600',
    },
})