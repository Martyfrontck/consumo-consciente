import { useRouter } from 'expo-router';
import { Button, Text, View } from 'react-native';

export default function Home() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Bem-vindo ao Consumo Consciente 🌱</Text>
      <Button
        title="Entrar / Cadastrar"
        onPress={() => router.push('/(auth)/LoginCadastro')}
        color="#4285F4"
      />
    </View>
  );
}