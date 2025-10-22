import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginCadastro() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '477636096643-0hn5igg7lcv10c7fdsclcr27tl6d759b.apps.googleusercontent.com',
      offlineAccess: true,
      forceCodeForRefreshToken: true,
    });

    const trySilentLogin = async () => {
      try {
        const isSignedIn = await GoogleSignin.isSignedIn();
        if (isSignedIn) {
          const userInfo = await GoogleSignin.signInSilently();
          await AsyncStorage.setItem('accessToken', userInfo.idToken || '');
          await AsyncStorage.setItem('userName', userInfo.user?.name || '');
          router.replace('/home');
        }
      } catch (error) {
        console.log('Login silencioso falhou:', error);
      }
    };

    trySilentLogin();
  }, [router]);

  async function handleAuth() {
    try {
      setLoading(true);
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const userInfo = await GoogleSignin.signIn();
      const { idToken, user } = userInfo;

      if (!idToken || !user?.name) {
        throw new Error('Informações de login incompletas.');
      }

      await AsyncStorage.setItem('accessToken', idToken);
      await AsyncStorage.setItem('userName', user.name);

      router.replace('/home');
    } catch (error: any) {
      console.error('Erro ao autenticar:', error);
      Alert.alert('Erro ao autenticar', error?.message || 'Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Consumo Consciente</Text>
      <Text style={styles.subtitle}>Acesse ou crie sua conta com o Google</Text>
      <Button
        title={loading ? 'Entrando...' : 'Entrar / Cadastrar'}
        onPress={handleAuth}
        color="#4285F4"
        disabled={loading}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5F5DC', paddingHorizontal: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 10, color: '#333' },
  subtitle: { fontSize: 16, marginBottom: 30, color: '#666', textAlign: 'center' },
});