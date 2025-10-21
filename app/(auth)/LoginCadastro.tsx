import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Google from 'expo-auth-session/providers/google';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import React, { useEffect } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

export default function LoginCadastro() {
  const router = useRouter();

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '477636096643-0hn5igg71vc10x7dcfslcr27ld6r579b.apps.googleusercontent.com',
    androidClientId: '477636096643-android.apps.googleusercontent.com',
    iosClientId: '477636096643-ios.apps.googleusercontent.com',
    webClientId: '477636096643-web.apps.googleusercontent.com',
  });

  useEffect(() => {
    const handleAuth = async () => {
      if (response?.type === 'success' && response.authentication?.accessToken) {
        const token = response.authentication.accessToken;
        await AsyncStorage.setItem('accessToken', token);
        console.log('Token salvo:', token);
        router.replace('/home');
      } else if (response?.type === 'error') {
        Alert.alert('Erro ao autenticar', 'Não foi possível fazer login com o Google.');
      }
    };

    handleAuth();
  }, [response]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Consumo Consciente</Text>
      <Text style={styles.subtitle}>Acesse ou crie sua conta com o Google</Text>
      <Button
        title="Continuar com Google"
        disabled={!request}
        onPress={() => promptAsync()}
        color="#4285F4"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    color: '#555',
    textAlign: 'center',
  },
});