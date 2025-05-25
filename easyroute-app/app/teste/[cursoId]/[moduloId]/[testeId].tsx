import { useLocalSearchParams } from 'expo-router';
import {
  Box,
  Text,
  VStack,
  ScrollView,
  RadioGroup,
  Radio,
  useToken,
} from '@gluestack-ui/themed';
import { cursosData } from '@/data/cursos';
import BackButton from '@/components/backButton';
import { useEffect, useState } from 'react';
import CustomButton from '@/components/customButton';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const salvarPontuacao = async (
  email: string,
  cursoId: string,
  moduloId: string,
  acertos: number,
  total: number
) => {
  try {
    const key = `pontuacoes-${email}`;
    const json = await AsyncStorage.getItem(key);
    let pontuacoes = json ? JSON.parse(json) : {};

    if (!pontuacoes[cursoId]) {
      pontuacoes[cursoId] = {};
    }

    pontuacoes[cursoId][moduloId] = {
      pontuacao: acertos,
      total,
      data: new Date().toISOString(),
    };

    await AsyncStorage.setItem(key, JSON.stringify(pontuacoes));
  } catch (error) {
    console.error('Erro ao salvar pontuação:', error);
  }
};

export default function TesteScreen() {
  // TODOS os hooks devem estar aqui no topo, SEM nenhuma condição antes deles
  const { cursoId, moduloId } = useLocalSearchParams();
  const curso = cursosData[cursoId as keyof typeof cursosData];
  const modulo = curso?.modulos.find(
    (m) => m.id === parseInt(moduloId as string)
  );

  const [respostas, setRespostas] = useState<string[]>([]);
  const [resultado, setResultado] = useState<{
    acertos: number;
    total: number;
  } | null>(null);

  const selectedColor = useToken('colors', 'blue600');

  useEffect(() => {
    const carregarDados = async () => {
      const email = await AsyncStorage.getItem('usuarioLogado');
      if (!email || !cursoId || !moduloId || !modulo) return;

      const key = `pontuacoes-${email}`;
      const json = await AsyncStorage.getItem(key);
      const pontuacoes = json ? JSON.parse(json) : {};

      const pontuacaoSalva = pontuacoes?.[cursoId]?.[moduloId];

      setRespostas(new Array(modulo.perguntas.length).fill(''));

      if (pontuacaoSalva) {
        setResultado({
          acertos: pontuacaoSalva.pontuacao,
          total: pontuacaoSalva.total,
        });
      }
    };

    carregarDados();
  }, [cursoId, moduloId, modulo]);

  // Agora, após todos os hooks, podemos condicionar retornos e renderizar a UI

  if (!curso || !modulo) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center" padding="$4">
        <Text color="$red600" fontSize="$lg">
          Curso ou Módulo não encontrados.
        </Text>
      </Box>
    );
  }

  if (respostas.length === 0) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <Text>Carregando perguntas...</Text>
      </Box>
    );
  }

  const handleRespostaChange = (id: number, resposta: string) => {
    if (resultado) return;
    const novas = [...respostas];
    novas[id] = resposta;
    setRespostas(novas);
  };

  const enviarRespostas = async () => {
    let acertos = 0;

    modulo.perguntas.forEach((pergunta, index) => {
      if (respostas[index] === pergunta.respostaCorreta) {
        acertos++;
      }
    });

    const email = await AsyncStorage.getItem('usuarioLogado');
    if (!email) return;

    await salvarPontuacao(
      email,
      cursoId as string,
      moduloId as string,
      acertos,
      modulo.perguntas.length
    );

    setResultado({ acertos, total: modulo.perguntas.length });
  };

  const handleEnviar = () => {
    Alert.alert(
      'Confirmar envio',
      'Tem certeza de que deseja enviar suas respostas?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Enviar', onPress: enviarRespostas },
      ]
    );
  };

  const refazerTeste = async () => {
    setRespostas(new Array(modulo.perguntas.length).fill(''));
    setResultado(null);

    try {
      const email = await AsyncStorage.getItem('usuarioLogado');
      if (!email) return;

      const key = `pontuacoes-${email}`;
      const json = await AsyncStorage.getItem(key);
      let pontuacoes = json ? JSON.parse(json) : {};

      if (pontuacoes[cursoId]?.[moduloId]) {
        delete pontuacoes[cursoId][moduloId];
        await AsyncStorage.setItem(key, JSON.stringify(pontuacoes));
      }
    } catch (error) {
      console.error('Erro ao limpar pontuação:', error);
    }
  };

  const todasRespondidas = !respostas.includes('');

  return (
    <Box flex={1} padding="$5" marginVertical={5}>
      <BackButton />
      <Text fontSize="$2xl" fontWeight="bold" mb="$4">
        {modulo.titulo}
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack space="md">
          <Text fontSize="$md" mb="$2">
            {modulo.descricao}
          </Text>

          {modulo.perguntas.map((pergunta, index) => {
            const acertou = resultado
              ? respostas[index] === pergunta.respostaCorreta
              : false;
            return (
              <Box
                key={pergunta.id}
                mb="$4"
                borderWidth={resultado ? 2 : 0}
                borderColor={resultado ? (acertou ? 'green' : 'red') : undefined}
                borderRadius="$md"
                padding="$2"
                bg={resultado && acertou ? '$green100' : undefined}
              >
                <Text fontSize="$md" fontWeight="bold" mb="$2">
                  {pergunta.enunciado}
                </Text>
                <RadioGroup
                  value={respostas[index] ?? ''}
                  onChange={(value) => handleRespostaChange(index, value)}
                >
                  <VStack space="sm">
                    {pergunta.alternativas.map((alternativa) => {
                      const selecionada = respostas[index] === alternativa;
                      return (
                        <Radio
                          key={alternativa}
                          value={alternativa}
                          disabled={!!resultado}
                          sx={{
                            borderColor: selecionada ? selectedColor : undefined,
                            bg: selecionada ? '$blue100' : undefined,
                            borderWidth: selecionada ? 2 : 1,
                            borderRadius: '$md',
                            padding: '$2',
                          }}
                        >
                          <Radio.Indicator />
                          <Radio.Label>{alternativa}</Radio.Label>
                        </Radio>
                      );
                    })}
                  </VStack>
                </RadioGroup>
                {resultado && (
                  <Text mt="$1" fontWeight="bold" color={acertou ? 'green' : 'red'}>
                    {acertou
                      ? 'Resposta correta!'
                      : `Resposta correta: ${pergunta.respostaCorreta}`}
                  </Text>
                )}
              </Box>
            );
          })}

          {!resultado && (
            <CustomButton onPress={handleEnviar} disabled={!todasRespondidas}>
              <Text color="white">Enviar Respostas</Text>
            </CustomButton>
          )}

          {resultado && (
            <>
              <Text mt="$4" fontSize="$lg" fontWeight="bold" textAlign="center">
                Você acertou {resultado.acertos} de {resultado.total} perguntas.
              </Text>
              <CustomButton onPress={refazerTeste} bg="$red600">
                <Text color="white">Refazer Teste</Text>
              </CustomButton>
            </>
          )}
        </VStack>
      </ScrollView>
    </Box>
  );
}
