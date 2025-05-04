import React, { useEffect, useState } from 'react';
import { Box, Text, VStack, Input, InputField, Image, Button, ScrollView, Spinner } from '@gluestack-ui/themed';
import { TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '@/components/customButton';

const STORAGE_KEY = '@perfil_usuario';

export default function EditarInformacoes() {
  const router = useRouter();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [foto, setFoto] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    try {
      const dados = await AsyncStorage.getItem(STORAGE_KEY);
      if (dados) {
        const { nome, email, foto } = JSON.parse(dados);
        setNome(nome);
        setEmail(email);
        setFoto(foto);
      }
    } catch (e) {
      console.warn('Erro ao carregar dados:', e);
    } finally {
      setLoading(false);
    }
  }

  async function salvarAlteracoes() {
    try {
      const dados = JSON.stringify({ nome, email, foto });
      await AsyncStorage.setItem(STORAGE_KEY, dados);
      router.navigate('/perfil'); // volta para a tela de perfil
    } catch (e) {
      console.warn('Erro ao salvar dados:', e);
    }
  }

  async function escolherFoto() {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setFoto(result.assets[0].uri);
    }
  }

  if (loading) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center" bg="$white">
        <Spinner size="large" />
      </Box>
    );
  }

  return (
    <ScrollView flex={1} bg="$white" p="$4">
      <VStack space="lg" alignItems="center">
       <TouchableOpacity onPress={escolherFoto} style={{ alignItems: 'center' }}>
        <Image
         source={foto ? { uri: foto } : require('@/assets/Pessoa.png')}
         alt="Foto de perfil"
         w={120}
         h={120}
         borderRadius={60}
         borderWidth={2}
         borderColor="$gray300"/>
        <Text color="$red600" mt="$2" textAlign="center">Alterar foto</Text>
</TouchableOpacity>


        <Box w="100%">
          <Text fontWeight="bold" mb="$1">Nome</Text>
          <Input>
            <InputField value={nome} onChangeText={setNome} />
          </Input>
        </Box>

        <Box w="100%">
          <Text fontWeight="bold" mb="$1">Email</Text>
          <Input>
            <InputField value={email} onChangeText={setEmail} keyboardType="email-address" />
          </Input>
        </Box>

        <CustomButton onPress={salvarAlteracoes}>
          <Text color="$white">Salvar Alterações</Text>
        </CustomButton>
      </VStack>
    </ScrollView>
  );
}
