import CustomButton from '@/components/customButton';
import { VStack, Text, Button } from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';

export default function ErrorScreen() {
  const router = useRouter();

  return (
    <VStack flex={1} justifyContent="center" alignItems="center" space="lg" bg="$backgroundLight" p="$5">
      <Text fontSize="$3xl" fontWeight="bold" color="$red600">Erro 404</Text>
      <Text fontSize="$lg" textAlign="center">Página não encontrada!</Text>
      <CustomButton onPress={() => router.back()}>
        <Text color='white'>Voltar</Text>
      </CustomButton>
    </VStack>
  );
}
