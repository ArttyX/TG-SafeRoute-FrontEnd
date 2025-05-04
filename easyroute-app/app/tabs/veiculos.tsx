import { VStack, Text } from '@gluestack-ui/themed';

export default function VeiculosScreen() {
  return (
    <VStack flex={1} justifyContent="center" alignItems="center" bg="$backgroundLight">
      <Text fontSize="$2xl" fontWeight="bold" color="black">
        Registro de Veículos
      </Text>
      <Text color="black">Em breve: cadastro, listagem e exclusão de veículos</Text>
    </VStack>
  );
}
