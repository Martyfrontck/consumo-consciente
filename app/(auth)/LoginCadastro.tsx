import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useState } from 'react';
import { Button, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

GoogleSignin.configure({
  webClientId: '1039285808884-8e8v0b8m8g4v0g8v.apps.googleusercontent.com',
});

interface GoogleUserInfo {
  name?: string;
  email?: string;
  picture?: string;
  // outros campos que você quiser usar
}

export default function LoginCadastro() {
  const [response, setResponse] = useState<GoogleUserInfo | null>(null);
  const [token, setToken] = useState('');

  async function handleAuth() {
    try {
      const { idToken } = await GoogleSignin.signIn();
      const res = await fetch(
        'https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=' + idToken
      );
      const data: GoogleUserInfo = await res.json();
      setResponse(data);
      setToken(data.name || '');
      await AsyncStorage.setItem('accessToken', idToken);
      console.log('Usuário autenticado:', data.name);
    } catch (error) {
      console.error('Erro ao autenticar:', error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Consumo Consciente</Text>
      <Text style={styles.subtitle}>Acesse ou crie sua conta com o Google</Text>
      <Button title="Entrar / Cadastrar" onPress={handleAuth} color="#4285F4" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5DC', // bege suave
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    color: '#666',
    textAlign: 'center',
  },
});