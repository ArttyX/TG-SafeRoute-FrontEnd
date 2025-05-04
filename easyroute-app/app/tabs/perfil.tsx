import React, { useState, useCallback } from 'react';
import { Box, Text, VStack, Image, Progress } from '@gluestack-ui/themed';
import CustomButton from '@/components/customButton';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const STORAGE_KEY = '@perfil_usuario';

export default function Perfil() {
  const router = useRouter();
  const [nome, setNome] = useState('João da Silva');
  const [email, setEmail] = useState('joao@email.com');
  const [foto, setFoto] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      const carregar = async () => {
        try {
          const dados = await AsyncStorage.getItem(STORAGE_KEY);
          if (dados) {
            const { nome, email, foto } = JSON.parse(dados);
            setNome(nome);
            setEmail(email);
            setFoto(foto);
          }
        } catch (e) {
          console.warn('Erro ao carregar perfil:', e);
        }
      };

      carregar();
    }, [])
  );

  return (
    <Box flex={1} px="$4" pt="$12" bg="$white">
      <VStack space="md" alignItems="center">
        <Image
          source={foto ? { uri: foto } : require('@/assets/Pessoa.png')}
          alt="Foto de perfil"
          w={100}
          h={100}
          borderRadius={50}
        />
        <Text fontSize="$lg" fontWeight="bold">{nome}</Text>
        <Text color="$gray600">{email}</Text>

        <CustomButton onPress={() => router.navigate('/editar-informacoes')}>
          <Text color='white'>Editar Informações</Text>
        </CustomButton>
      </VStack>

      <Box mt="$8">
        <Text fontWeight="bold" fontSize="$md" mb="$2">Meus Cursos</Text>

        <VStack space="sm">
          <Box>
            <Text>Entregador de Alimentos - 0%</Text>
            <Progress value={0} />
          </Box>
          <Box>
            <Text>Transporte de Produtos - 0%</Text>
            <Progress value={0} />
          </Box>
          <Box>
            <Text>Transporte de Pessoas - 0%</Text>
            <Progress value={0} />
          </Box>
        </VStack>
      </Box>
    </Box>
  );
}
