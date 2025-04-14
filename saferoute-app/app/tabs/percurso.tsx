import { VStack, Text } from '@gluestack-ui/themed';

export default function PercursoScreen() {
  return (
    <VStack flex={1} justifyContent="center" alignItems="center" bg="$backgroundLight">
      <Text fontSize="$2xl" fontWeight="bold" color="black">
        Começar Percurso
      </Text>
      <Text color="black">Em breve: seleção de veículo e ativação do percurso</Text>
    </VStack>
  );
}
