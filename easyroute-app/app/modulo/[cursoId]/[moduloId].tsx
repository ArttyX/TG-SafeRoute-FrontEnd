// app/modulo/[cursoId]/[moduloId].tsx

import { useLocalSearchParams, useRouter } from 'expo-router';
import { Box, Text, VStack, Button, Heading, ScrollView, Card } from '@gluestack-ui/themed';
import { cursosData } from '@/data/cursos';
import BackButton from '@/components/backButton';
import CustomButton from '@/components/customButton';

export default function ModuloScreen() {
  const { cursoId, moduloId } = useLocalSearchParams();
  const router = useRouter();

  // Obtendo o curso e módulo com base nos ids
  const curso = cursosData[cursoId as keyof typeof cursosData];
  const modulo = curso?.modulos.find(m => m.id === parseInt(moduloId as string));

  // Caso o curso ou módulo não existam
  if (!curso || !modulo) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center" padding="$4">
        <Text color="$red600" fontSize="$lg">Módulo não encontrado.</Text>
      </Box>
    );
  }

  return (
    <Box flex={1} padding="$4">
      <BackButton />
      <Heading size="lg" mb="$4">{modulo.titulo}</Heading>
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack space="md">
          <Text fontSize="$md" mb="$2">{modulo.descricao2}</Text>
          <Card bgColor='$white' borderWidth={1}>
          <Text fontWeight={'bold'} fontSize="$lg" mb="$2">Links para Estudo:</Text>
          <Text color='$blue600' fontSize="$md" mb="$2">{modulo.linksEstudo}</Text>
          </Card>
          <CustomButton onPress={() => {
          router.push(`/teste/${cursoId}/${moduloId}/testeId`);}}>
          <Text color='white'>Iniciar Teste</Text>
          </CustomButton>

        </VStack>
      </ScrollView>
    </Box>
  );
}
