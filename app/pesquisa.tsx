import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Button, Image, Linking, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function HomeScreen() {
    const { pesquisa } = useLocalSearchParams<{ pesquisa?: string }>();
    function Voltar() {
        router.back();
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerRow}>
                <Button
                    title='Voltar'
                    onPress={Voltar}
                />
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
})