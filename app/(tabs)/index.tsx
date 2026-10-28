import { router } from 'expo-router';
import { useState } from 'react';
import { Button, Image, Linking, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function HomeScreen() {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [pesquisa, setPesquisa] = useState('');

  function like() {
    setLikes((currentLikes) => currentLikes + 1);
  }

  function dislike() {
    setDislikes((currentDislikes) => currentDislikes + 1);
  }

  function canal() {
    Linking.openURL('https://www.youtube.com/@CellbitLives');
  }

  function abrirDetalhes() {
    router.push({ pathname: '/detalhes' });
  }

  function barraPesquisa() {
    router.push({
      pathname: '/pesquisa',
      params: { pesquisa },
    });
  }

  function proximidade() {
    router.push({ pathname: '/proximos' });
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerRow}>
          <Pressable
            testID='logo'
            style={styles.headerBrand}
            onPress={() => router.replace('/')}
            accessibilityRole='button'
          >
            <Image
              style={styles.logo}
              source={require('../../assets/images/FakeTube.png')}
            />
            <Text style={styles.title}>FakeTube</Text>
          </Pressable>

          <TextInput
            testID='pesquisa'
            style={styles.input}
            placeholder="Pesquisar"
            value={pesquisa}
            onChangeText={setPesquisa}
            onSubmitEditing={barraPesquisa}
            returnKeyType="search"
          />
          <Pressable
            testID='lupa'
            style={styles.searchButton}
            onPress={barraPesquisa}
            accessibilityRole='button'
            accessibilityLabel="Pesquisar"
          >
            <Image
              style={styles.lupa}
              source={require('../../assets/images/lupa.png')}
            />
          </Pressable>
        </View>

        <View style={styles.topButton}>
          <Button
            title="Ir para cadastro"
            onPress={() => router.push('/cadastro')}
          />
        </View>

        <Image
          style={styles.video}
          source={require('../../assets/images/video.png')}
          resizeMode="contain"
        />

        <View style={styles.actionsRow}>
          <Pressable
            testID='canal'
            style={styles.channelButton}
            onPress={canal}
            accessibilityRole='button'
          >
            <Image
              style={styles.channelImage}
              source={require('../../assets/images/canal.jpg')}
            />
            <Text style={styles.channelName}>CellbitLives</Text>
          </Pressable>

          <View style={styles.reactions}>
            <Pressable
              testID='like'
              style={styles.reactionButton}
              onPress={like}
              accessibilityRole='button'
              accessibilityLabel={`Curtir, ${likes}`}
            >
              <Image
                style={styles.reactionImage}
                source={require('../../assets/images/like.jpg')}
              />
              <Text>{likes}</Text>
            </Pressable>
            <Pressable
              testID='dislike'
              style={styles.reactionButton}
              onPress={dislike}
              accessibilityRole='button'
              accessibilityLabel={`Não gostei, ${dislikes}`}
            >
              <Image
                style={styles.reactionImage}
                source={require('../../assets/images/dislike.png')}
              />
              <Text>{dislikes}</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.navigationButtons}>
          <Button title="Endereço" onPress={abrirDetalhes} />
          <Button title="Próximos a você" onPress={proximidade} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    padding: 20,
    gap: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerBrand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  logo: {
    width: 58,
    height: 54,
  },
  input: {
    flex: 1,
    minWidth: 0,
    borderWidth: 1,
    borderColor: '#dad60cfa',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 42,
  },
  searchButton: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lupa: {
    width: 34,
    height: 34,
  },
  topButton: {
    alignSelf: 'flex-start',
  },
  video: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#111111',
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 12,
  },
  channelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  channelImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  channelName: {
    fontSize: 15,
    fontWeight: '600',
  },
  reactions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  reactionButton: {
    minWidth: 58,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  reactionImage: {
    width: 26,
    height: 26,
  },
  navigationButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 10,
  },
});
