import { Button, VStack, Text, Image, Box } from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <VStack flex={1} justifyContent="center" alignItems="center" space="lg" bg="$backgroundLight">
      <Text fontSize="$3xl" fontWeight="bold" color='black'>Bem-vindo ao SafeRoute!</Text>
      <Box width={200} height={200}>
        <Image
          source={require('../assets/Logo_SafeRoute.png')}
          alt="Logo do Projeto"
          style={{ width: 200, height: 200, resizeMode: 'contain' }}
        />
      </Box>
      <VStack space="lg" width="60%">
        <Button bg="$red600" height={50} marginBottom={10} onPress={() => router.push('/sobre_projeto')}>
          <Text color="$white">Sobre o Projeto</Text>
        </Button>
        <Button bg="$red600" height={50} marginBottom={10} onPress={() => router.push('/sobre_nos')}>
          <Text color="$white">Sobre Nós</Text>
        </Button>
        <Button bg="$red600" height={50} marginBottom={10} onPress={() => router.push('/login')}>
          <Text color="$white">Iniciar</Text>
        </Button>
      </VStack>
    </VStack>
  );
}
