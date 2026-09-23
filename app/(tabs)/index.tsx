import { router } from 'expo-router';
import { useState } from 'react';
import { Button, Image, Linking, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';

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

  function pesquisar() {
    setPesquisa(pesquisa);
  }
  function canal() {
    Linking.openURL('https://www.youtube.com/@CellbitLives');
  }

  function abrirDetalhes() {
    router.push({
      pathname: '/detalhes',
    })
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
        <Image testID='logo'
          style={styles.logo}
          source={require('../../assets/images/FakeTube.png')}
        />
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
            source={require('../../assets/images/lupa.png')}
          />
        </Pressable>

      </View>
      <Image
        style={styles.video}
        source={require('../../assets/images/video.png')}
      />
      <View style={styles.headerRow}>
        <Pressable testID='canal'
          style={styles.canalButton}
          onPress={canal}
        >
          <Image
            style={styles.imagemCanal}
            source={require('../../assets/images/canal.jpg')}
          />
          <Text>CellbitLives</Text>
        </Pressable>

        <Pressable testID='like'
          style={styles.button}
          onPress={like}
        >
          <Image
            style={styles.botoes}
            source={require('../../assets/images/like.jpg')}
          />
        </Pressable>
        <Text>{likes}</Text>

        <Pressable testID='dislike'
          style={styles.button}
          onPress={dislike}
        >
          <Image
            style={styles.botoes}
            source={require('../../assets/images/dislike.png')}
          />
        </Pressable>
        <Text>{dislikes}</Text>

        <Button
          title='detalhes'
          onPress={abrirDetalhes}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  headerTextWrap: {
    marginLeft: 12,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  logo: {
    width: 100,
    height: 90,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#dad60cfa',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    width: '80%'
  },
  lupa: {
    width: 80,
    height: 60,
  },
  botoes: {
    width: 100,
    height: 90,
  },
  button: {
    padding: 18,
    borderRadius: 10,
  },
  video: {
    width: '100%',
    height: '60%'
  },
  imagemCanal: {
    width: 100,
    height: 90,
  },
  canalButton: {
    padding: 18,
    marginRight: 850,
    borderRadius: 10,
  },
});