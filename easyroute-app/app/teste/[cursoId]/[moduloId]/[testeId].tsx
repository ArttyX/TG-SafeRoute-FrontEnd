import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  Box,
  Text,
  VStack,
  ScrollView,
  RadioGroup,
  Radio,
} from '@gluestack-ui/themed';
import { cursosData } from '@/data/cursos';
import BackButton from '@/components/backButton';
import { useState } from 'react';
import CustomButton from '@/components/customButton';

export default function TesteScreen() {
  const { cursoId, moduloId } = useLocalSearchParams();
  const router = useRouter();
  const curso = cursosData[cursoId as keyof typeof cursosData];

  const modulo = curso?.modulos.find(
    (m) => m.id === parseInt(moduloId as string)
  );

  if (!curso || !modulo) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center" padding="$4">
        <Text color="$red600" fontSize="$lg">
          Curso ou Módulo não encontrados.
        </Text>
      </Box>
    );
  }

  const [respostas, setRespostas] = useState<string[]>(
    new Array(modulo.perguntas.length).fill('')
  );

  const handleRespostaChange = (id: number, resposta: string) => {
    const newRespostas = [...respostas];
    newRespostas[id] = resposta;
    setRespostas(newRespostas);
  };

  const handleEnviar = () => {
    let acertos = 0;
  
    modulo.perguntas.forEach((pergunta, index) => {
      if (respostas[index] === pergunta.respostaCorreta) {
        acertos++;
      }
    });
  
    router.push({
      pathname: `/resultado/${cursoId}/${moduloId}`,
      params: {
        acertos: acertos.toString(),
        total: modulo.perguntas.length.toString(),
      },
    });
  };
  

  return (
    <Box flex={1} padding="$4">
      <BackButton />
      <Text fontSize="$2xl" fontWeight="bold" mb="$4">
        {modulo.titulo}
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack space="md">
          <Text fontSize="$md" mb="$2">
            {modulo.descricao}
          </Text>

          {modulo.perguntas.map((pergunta, index) => (
            <Box key={pergunta.id} mb="$4">
              <Text fontSize="$md" fontWeight="bold" mb="$2">
                {pergunta.enunciado}
              </Text>
              <RadioGroup
                value={respostas[index]}
                onChange={(value) => handleRespostaChange(index, value)}
              >
                <VStack space="sm">
                  {pergunta.alternativas.map((alternativa, i) => (
                    <Radio key={i} value={alternativa}>
                      <Radio.Indicator />
                      <Radio.Label>{alternativa}</Radio.Label>
                    </Radio>
                  ))}
                </VStack>
              </RadioGroup>
            </Box>
          ))}

          <CustomButton onPress={handleEnviar}>
            <Text color="white">Enviar Respostas</Text>
          </CustomButton>
        </VStack>
      </ScrollView>
    </Box>
  );
}
