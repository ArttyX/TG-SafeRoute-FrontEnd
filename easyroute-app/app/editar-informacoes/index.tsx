import React, { useEffect, useState } from 'react';
import { VStack, Text, Box, Image, Input, InputField } from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '@/components/customButton';
import * as ImagePicker from 'expo-image-picker';

export default function EditarInformacoes() {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [foto, setFoto] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Precisamos de permissão para acessar suas fotos!');
      }
    })();
  }, []);

  useEffect(() => {
    const carregar = async () => {
      const emailSalvo = await AsyncStorage.getItem('usuarioLogado');
      if (!emailSalvo) return;

      const usuarioRaw = await AsyncStorage.getItem(`usuario-${emailSalvo}`);
      if (!usuarioRaw) return;

      const usuario = JSON.parse(usuarioRaw);
      setNome(usuario.nome || '');
      setEmail(usuario.email || '');
      setFoto(usuario.foto || '');
    };
    carregar();
  }, []);

  const escolherFotoGaleria = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
      aspect: [1, 1], // para foto quadrada
    });

    if (!result.canceled) {
      setFoto(result.assets[0].uri);
    }
  };

  const tirarFoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Precisamos de permissão para usar a câmera!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 1,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      setFoto(result.assets[0].uri);
    }
  };

  const salvar = async () => {
    if (!email) return;

    const dadosAtualizados = {
      nome,
      email,
      foto,
      senha: '', // senha não editável aqui
    };

    const usuarioSalvo = await AsyncStorage.getItem(`usuario-${email}`);
    if (usuarioSalvo) {
      const antigo = JSON.parse(usuarioSalvo);
      dadosAtualizados.senha = antigo.senha; // preserva senha
    }

    await AsyncStorage.setItem(`usuario-${email}`, JSON.stringify(dadosAtualizados));
    await AsyncStorage.setItem('usuarioLogado', email);

    router.replace('/tabs/perfil');
  };

  return (
    <Box flex={1} p="$5" bg="$white">
      <VStack space="lg">
        <Text fontSize="$2xl" fontWeight="bold">Editar Informações</Text>

        <Image
          source={foto ? { uri: foto } : require('@/assets/Pessoa.png')}
          alt="Foto"
          w={100}
          h={100}
          borderRadius={50}
          alignSelf="center"
        />


        <Input>
          <InputField
            placeholder="Nome"
            value={nome}
            onChangeText={setNome}
          />
        </Input>

        <Input>
          <InputField
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
          />
        </Input>
        
        <CustomButton onPress={escolherFotoGaleria}>
          <Text color="white">Escolher foto da galeria</Text>
        </CustomButton>

        <CustomButton onPress={tirarFoto}>
          <Text color="white">Tirar foto</Text>
        </CustomButton>

        <CustomButton onPress={salvar}>
          <Text color="white">Salvar Alterações</Text>
        </CustomButton>

        <CustomButton onPress={() => router.navigate('/tabs/perfil')}>
          <Text color='white'>Cancelar</Text>
        </CustomButton>
      </VStack>
    </Box>
  );
}
