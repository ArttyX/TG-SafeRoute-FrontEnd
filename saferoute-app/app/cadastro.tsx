import BackButton from '@/components/backButton';
import CustomButton from '@/components/customButton';
import CustomInput from '@/components/customInput';
import { VStack, Text, HStack } from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';

export default function CadastroScreen() {
  const router = useRouter();

  return (
    <VStack flex={1} justifyContent="center" alignItems="center" space="lg" bg="$backgroundLight" p="$5">
      <HStack width="80%" mb="$10">
        <BackButton/>
      </HStack>

      <Text fontSize="$3xl" fontWeight="bold" color="black">Cadastro</Text>

      <VStack space="md" width="80%">
        <CustomInput placeholder="Usuário"/>

        <CustomInput placeholder="Senha" type="password"/>

        <CustomInput placeholder="Repetir Senha" type="password" />

        <CustomButton onPress={() => router.push('/login')}>
          <Text color='white'>Cadastrar</Text>
        </CustomButton>
      </VStack>
    </VStack>
  );
}
