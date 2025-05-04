// app/curso/[cursoId].tsx

import { useLocalSearchParams, useRouter } from 'expo-router';
import { Box, Text, VStack, ScrollView, Heading, Card, Input, InputField } from '@gluestack-ui/themed';
import { cursosData } from '@/data/cursos';
import BackButton from '@/components/backButton';
import CustomButton from '@/components/customButton';
import { useState } from 'react';

export default function CursoScreen() {
  const { cursoId } = useLocalSearchParams();
  const router = useRouter();
  const [mensagem, setMensagem] = useState('');
  // Obtendo o curso com base no cursoId
  const curso = cursosData[cursoId as keyof typeof cursosData];

  // Caso o curso não exista
  if (!curso) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center" padding="$4">
        <Text color="$red600" fontSize="$lg">Curso não encontrado.</Text>
      </Box>
    );
  }

  return (
    <Box flex={1} padding="$4">
      {/* Botão para voltar à tela anterior */}
      <BackButton />

      {/* Cabeçalho com nome do curso */}
      <Heading size="lg" mb="$4">{curso.nome}</Heading>

      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack space="md">
          <Card
            borderWidth={1}
            borderColor="$gray300"
            borderRadius="$lg"
            padding="$4"
            backgroundColor="$white"
            shadowColor="$black"
            shadowOffset={{ width: 0, height: 1 }}
            shadowOpacity={0.1}
            shadowRadius={2}>
          <Text marginBottom={5} textAlign='justify'>{curso.descricaoCurso}</Text>
          <Text fontWeight={'$bold'} color='black'>Mais Informações:</Text>
          <Text color="$red600">{curso.linksCurso}</Text>
          </Card>
          <Heading size="lg" mb="$1" fontWeight={'$bold'}>Módulos do Curso:</Heading>
          {/* Exibe os módulos do curso */}
          {curso.modulos.map((modulo, index) => (
            <Box
              key={index}
              borderWidth={1}
              borderColor="$gray300"
              borderRadius="$lg"
              padding="$4"
              backgroundColor="$white"
              shadowColor="$black"
              shadowOffset={{ width: 0, height: 1 }}
              shadowOpacity={0.1}
              shadowRadius={2}
            >
              <Text fontSize="$lg" fontWeight="$bold" mb="$2">{modulo.titulo}</Text>
              <Text fontSize="$sm" mb="$2">{modulo.descricao}</Text>
              <CustomButton onPress={() => router.push(`/modulo/${cursoId}/${modulo.id}`)}>
                <Text color='white'>Iniciar Módulo</Text>
              </CustomButton>
            </Box>
          ))}
        <Text color='black' fontSize="$lg" bold>Deixe seu feedback sobre o curso:</Text>
        <Input variant="outline" size="md" height={100}>
        <InputField
          borderColor='black'
          borderStyle='bold'
          margin={2}
          multiline
          textAlignVertical="top"
          placeholder="Escreva seu feedback aqui..."
          value={mensagem}
          onChangeText={setMensagem}
        />
        </Input>
        <CustomButton onPress={function (): void { } }>Enviar</CustomButton>
        </VStack>
      </ScrollView>
    </Box>
  );
}
