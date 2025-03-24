import { Button, VStack, Text } from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';

export default function SobreProjetoScreen() {
  const router = useRouter();

  return (
    <VStack flex={1} justifyContent="center" alignItems="center" space="lg" bg="$backgroundLight">
      <Text fontSize="$3xl" fontWeight="bold" color='black'>Sobre o Projeto</Text>
      <Text fontSize="$md" textAlign="justify" px={8} py={2} mx={10}>
        Este projeto tem como objetivo aumentar a segurança dos usuários durante o uso de aplicativos de rotas por meio do contador de tempo de viagem, iniciado a partir do pressionar de um botão.
      </Text>
      <Button bg="$red600" height={50} onPress={() => router.push('/')}>
        <Text color="$white">Voltar para a Home</Text>
      </Button>
    </VStack>
  );
}
