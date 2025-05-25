import { useLocalSearchParams, useRouter } from 'expo-router';
import { Box, Text, VStack, ScrollView, Heading } from '@gluestack-ui/themed';
import { cursosData } from '@/data/cursos';
import BackButton from '@/components/backButton';
import CustomButton from '@/components/customButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export default function ModuloScreen() {
  const { cursoId, moduloId } = useLocalSearchParams();
  const router = useRouter();

  const curso = cursosData[cursoId as keyof typeof cursosData];
  const modulo = curso?.modulos.find(m => m.id === parseInt(moduloId as string));

  const [concluido, setConcluido] = useState(false);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const verificarConclusao = async () => {
      const email = await AsyncStorage.getItem('usuarioLogado');
      if (!email || !cursoId || !moduloId) {
        setConcluido(false);
        setCarregando(false);
        return;
      }

      const key = `pontuacoes-${email}`;
      const json = await AsyncStorage.getItem(key);
      const pontuacoes = json ? JSON.parse(json) : {};

      const pontuacaoSalva = pontuacoes?.[cursoId]?.[moduloId];
      if (pontuacaoSalva) {
        if (pontuacaoSalva.pontuacao === pontuacaoSalva.total) {
          setConcluido(true);
        } else {
          setConcluido(false);
        }
      } else {
        setConcluido(false);
      }
      setCarregando(false);
    };

    verificarConclusao();
  }, [cursoId, moduloId]);

  if (!curso || !modulo) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center" padding="$4">
        <Text color="$red600" fontSize="$lg">Módulo não encontrado.</Text>
      </Box>
    );
  }

  if (carregando) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <Text>Carregando...</Text>
      </Box>
    );
  }

  return (
    <Box flex={1} padding="$5" marginVertical={5}>
      <BackButton />
      <Heading size="lg" mb="$4">{modulo.titulo}</Heading>

      {/* Caixa com scroll próprio para a descrição */}
      <Box
        bg="$gray100"
        p="$4"
        borderRadius="$md"
        mb="$4"
        height={600}         // altura fixa para limitar a área da descrição
      >
        <ScrollView showsVerticalScrollIndicator>
          <VStack space="md">
            {modulo.descricao2.map((paragrafo, index) => (
              <Text
                key={index}
                fontSize="$md"
                lineHeight={24}
                color="$gray800"
              >
                {paragrafo}
              </Text>
            ))}
          </VStack>
        </ScrollView>
      </Box>

      {concluido ? (
        <Text fontSize="$md" color="$green600" fontWeight="bold" textAlign="center">
          🎉 Você já concluiu este módulo!
        </Text>
      ) : (
        <CustomButton onPress={() => router.push(`/teste/${cursoId}/${moduloId}/testeId`)}>
          <Text color='white'>Iniciar Teste</Text>
        </CustomButton>
      )}
    </Box>
  );
}
