import CustomButton from '@/components/customButton';
import CustomInput from '@/components/customInput';
import { VStack, Text, Pressable, Icon, HStack } from '@gluestack-ui/themed';
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
        <CustomInput placeholder="Usuário" />
        
        <CustomInput placeholder="Senha" type="password" />

        <CustomButton onPress={() => router.push('/tabs/sobre')}>Fazer Login</CustomButton>
      </VStack>

      <Pressable onPress={() => router.replace('/cadastro')}>
        <Text color="black" fontSize="$md">
          Não possui um cadastro? <Text fontWeight="bold" color="$red600" underline>Cadastre-se aqui!</Text>
        </Text>
      </Pressable>
    </VStack>
  );
}
