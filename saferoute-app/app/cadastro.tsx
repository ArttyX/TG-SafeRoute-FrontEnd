import { VStack, Text, Input, InputField, Button, Pressable, Icon, HStack } from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';

export default function CadastroScreen() {
  const router = useRouter();

  return (
    <VStack flex={1} justifyContent="center" alignItems="center" space="lg" bg="$backgroundLight" p="$5">
      <HStack width="80%" mb="$10">
        <Pressable onPress={() => router.push('/')}>
          <Icon as={ArrowLeft} size="xl" color="$red600" />
        </Pressable>
      </HStack>

      <Text fontSize="$3xl" fontWeight="bold" color="black">Cadastro</Text>

      <VStack space="md" width="80%">
        <Input variant="underlined" size="lg">
          <InputField placeholder="Usuário" />
        </Input>

        <Input variant="underlined" size="lg">
          <InputField placeholder="Senha" type="password" />
        </Input>

        <Input variant="underlined" size="lg">
          <InputField placeholder="Repetir Senha" type="password" />
        </Input>

        <Button bg="$red600" height={50} onPress={() => router.push('/home')}>
          <Text color="$white">Cadastrar</Text>
        </Button>
      </VStack>
    </VStack>
  );
}
