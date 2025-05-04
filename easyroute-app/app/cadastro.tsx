import React, { useState } from 'react';
import BackButton from '@/components/backButton';
import CustomButton from '@/components/customButton';
import CustomInput from '@/components/customInput';
import { VStack, Text, HStack } from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';

export default function CadastroScreen() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [repeatUsername, setRepeatUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errors, setErrors] = useState({
    username: '',
    repeatUsername: '',
    password: '',
    repeatPassword: '',
  });

  const handleRegister = () => {
    const newErrors = {
      username: '',
      repeatUsername: '',
      password: '',
      repeatPassword: '',
    };
    let valid = true;

    if (!username.trim()) {
      newErrors.username = 'Usuário é obrigatório';
      valid = false;
    }

    if (!repeatUsername.trim()) {
      newErrors.repeatUsername = 'Repetir usuário é obrigatório';
      valid = false;
    } else if (username.trim() && repeatUsername.trim() && username !== repeatUsername) {
      newErrors.repeatUsername = 'Usuários não coincidem';
      valid = false;
    }

    if (!password.trim()) {
      newErrors.password = 'Senha é obrigatória';
      valid = false;
    }

    if (!repeatPassword.trim()) {
      newErrors.repeatPassword = 'Repetir senha é obrigatório';
      valid = false;
    } else if (password.trim() && repeatPassword.trim() && password !== repeatPassword) {
      newErrors.repeatPassword = 'Senhas não coincidem';
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      // Aqui você poderia enviar para o backend ou salvar localmente
      router.push('/login');
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
          placeholder="Usuário"
          value={username}
          onChangeText={setUsername}
          errorMessage={errors.username}
        />

        <CustomInput
          placeholder="Repetir Usuário"
          value={repeatUsername}
          onChangeText={setRepeatUsername}
          errorMessage={errors.repeatUsername}
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

        <CustomButton onPress={handleRegister}>
          <Text color='white'>Cadastrar</Text>
        </CustomButton>
      </VStack>
    </VStack>
  );
}
