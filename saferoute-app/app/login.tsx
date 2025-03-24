import { VStack, Text, Input, InputField, Button, Pressable, Icon, HStack } from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';

export default function LoginScreen() {
  const router = useRouter();

  return (
    <VStack flex={1} justifyContent="center" alignItems="center" space="lg" bg="$backgroundLight" p="$5">
      <HStack width="80%" mb="$10">
        <Pressable onPress={() => router.push('/')}>
          <Icon as={ArrowLeft} size="xl" color="$red600" />
        </Pressable>
      </HStack>

      <Text fontSize="$3xl" fontWeight="bold" color='black'>Login</Text>

      <VStack space="md" width="80%">
        <Input variant="underlined" size="lg">
          <InputField placeholder="Usuário" />
        </Input>

        <Input variant="underlined" size="lg">
          <InputField placeholder="Senha" type="password" />
        </Input>

        <Button bg="$red600" height={50} onPress={() => router.push('/home')}>
          <Text color="$white">Fazer Login</Text>
        </Button>
      </VStack>

      <Pressable onPress={() => router.replace('/cadastro')}>
        <Text color="black" fontSize="$md">
          Não possui um cadastro? <Text fontWeight="bold" color="$red600" underline>Cadastre-se aqui!</Text>
        </Text>
      </Pressable>
    </VStack>
  );
}
