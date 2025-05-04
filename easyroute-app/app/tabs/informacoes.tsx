import { VStack, Text } from '@gluestack-ui/themed';

export default function InformacoesScreen() {
  return (
    <VStack flex={1} justifyContent="center" alignItems="center" bg="$backgroundLight">
      <Text fontSize="$2xl" fontWeight="bold" color="black">
        Informações do Usuário
      </Text>
      <Text color="black">Em breve: inserção de foto de perfil e documento</Text>
    </VStack>
  );
}
