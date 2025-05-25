import React, { useState } from 'react';
import BackButton from '@/components/backButton';
import CustomButton from '@/components/customButton';
import CustomInput from '@/components/customInput';
import { VStack, Text, HStack } from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';
import { registrarUsuario } from '@/services/authlocal';

export default function CadastroScreen() {
  const router = useRouter();

  const [nome, setNome] = useState(''); // novo estado para nome
  const [email, setEmail] = useState('');
  const [repeatEmail, setRepeatEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errors, setErrors] = useState({
    nome: '',
    email: '',
    repeatEmail: '',
    password: '',
    repeatPassword: '',
    firebase: '',
  });

  const handleRegister = async () => {
    const newErrors = {
      nome: '',
      email: '',
      repeatEmail: '',
      password: '',
      repeatPassword: '',
      firebase: '',
    };
    let valid = true;

    if (!nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
      valid = false;
    }

    if (!email.trim()) {
      newErrors.email = 'Email é obrigatório';
      valid = false;
    }

    if (!repeatEmail.trim()) {
      newErrors.repeatEmail = 'Repetir email é obrigatório';
      valid = false;
    } else if (email !== repeatEmail) {
      newErrors.repeatEmail = 'Emails não coincidem';
      valid = false;
    }

    if (!password.trim()) {
      newErrors.password = 'Senha é obrigatória';
      valid = false;
    }

    if (!repeatPassword.trim()) {
      newErrors.repeatPassword = 'Repetir senha é obrigatório';
      valid = false;
    } else if (password !== repeatPassword) {
      newErrors.repeatPassword = 'Senhas não coincidem';
      valid = false;
    }

    setErrors(newErrors);
    if (!valid) return;

    try {
      // Passa o nome no terceiro argumento, foto deixei null
      await registrarUsuario(email, password, nome, null);
      router.replace('/login');
    } catch (error: any) {
      console.log(error);
      if (error.code === 'auth/email-already-in-use') {
        newErrors.firebase = 'Esse e-mail já está em uso.';
      } else {
        newErrors.firebase = 'Erro ao criar usuário: ' + error.message;
      }
      setErrors(newErrors);
    }
  };

  return (
    <VStack flex={1} justifyContent="center" alignItems="center" space="lg" bg="$backgroundLight" p="$5">
      <HStack width="80%" mb="$10">
        <BackButton />
      </HStack>

      <Text fontSize="$3xl" fontWeight="bold" color="black">Cadastro</Text>

      <VStack space="md" width="80%">
        <CustomInput
          placeholder="Nome"
          value={nome}
          onChangeText={setNome}
          errorMessage={errors.nome}
        />

        <CustomInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          errorMessage={errors.email}
        />

        <CustomInput
          placeholder="Repetir Email"
          value={repeatEmail}
          onChangeText={setRepeatEmail}
          errorMessage={errors.repeatEmail}
        />

        <CustomInput
          placeholder="Senha"
          type="password"
          value={password}
          onChangeText={setPassword}
          errorMessage={errors.password}
        />

        <CustomInput
          placeholder="Repetir Senha"
          type="password"
          value={repeatPassword}
          onChangeText={setRepeatPassword}
          errorMessage={errors.repeatPassword}
        />

        {errors.firebase !== '' && (
          <Text color="$red600" textAlign="center">{errors.firebase}</Text>
        )}

        <CustomButton onPress={handleRegister}>
          <Text color='white'>Cadastrar</Text>
        </CustomButton>
      </VStack>
    </VStack>
  );
}
