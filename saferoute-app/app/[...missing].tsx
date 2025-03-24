import { VStack, Text, Button } from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';

export default function ErrorScreen() {
  const router = useRouter();

  return (
    <VStack flex={1} justifyContent="center" alignItems="center" space="lg" bg="$backgroundLight" p="$5">
      <Text fontSize="$3xl" fontWeight="bold" color="$red600">Erro 404</Text>
      <Text fontSize="$lg" textAlign="center">Página não encontrada!</Text>
      <Button bg="$red600" height={50} onPress={() => router.replace('/')}>
        <Text color="$white">Voltar para a Página Inicial</Text>
      </Button>
    </VStack>
  );
}
