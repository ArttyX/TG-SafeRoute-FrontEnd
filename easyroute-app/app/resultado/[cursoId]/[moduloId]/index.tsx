import { useLocalSearchParams, useRouter } from 'expo-router';
import { Box, Text, VStack } from '@gluestack-ui/themed';
import BackButton from '@/components/backButton';

export default function ResultadoScreen() {
  const { cursoId, moduloId, acertos, total } = useLocalSearchParams();

  const numAcertos = parseInt(acertos as string || '0');
  const numTotal = parseInt(total as string || '1');
  const percentual = Math.round((numAcertos / numTotal) * 100);

  return (
    <Box flex={1} padding="$4" justifyContent="center" alignItems="center">
      <BackButton />
      <VStack space="md" alignItems="center">
        <Text fontSize="$2xl" fontWeight="bold">Resultado do Teste</Text>
        <Text fontSize="$lg">Curso: {cursoId}</Text>
        <Text fontSize="$lg">Módulo: {moduloId}</Text>
        <Text fontSize="$lg">Acertos: {numAcertos} de {numTotal}</Text>
        <Text fontSize="$lg">Desempenho: {percentual}%</Text>
      </VStack>
    </Box>
  );
}
