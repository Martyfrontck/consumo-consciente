import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Button, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const checkLogged = async () => {
      const token = await AsyncStorage.getItem('accessToken');
      if (token) {
        router.replace('/home');
      }
    };
    checkLogged();
  }, [router]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao Consumo Consciente</Text>
      <Button
        title="Entrar"
        onPress={() => router.push('/(auth)/LoginCadastro')}
        color="#4285F4"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5F5DC', paddingHorizontal: 20 },
  title: { fontSize: 24, marginBottom: 20, color: '#333', textAlign: 'center' },
});