import React, { useState } from 'react';
import CustomButton from '@/components/customButton';
import CustomInput from '@/components/customInput';
import { VStack, Text, Pressable, Icon, HStack } from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';

export default function LoginScreen() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ username: '', password: '' });

  const handleLogin = () => {
    let valid = true;
    const newErrors = { username: '', password: '' };

    if (!username.trim()) {
      newErrors.username = 'Usuário é obrigatório';
      valid = false;
    }

    if (!password.trim()) {
      newErrors.password = 'Senha é obrigatória';
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      router.push('/tabs/inicial');
    }
  };

  return (
    <VStack flex={1} justifyContent="center" alignItems="center" space="lg" bg="$backgroundLight" p="$5">
      <HStack width="80%" mb="$10">
        <Pressable onPress={() => router.push('/')}>
          <Icon as={ArrowLeft} size="xl" color="$red600" />
        </Pressable>
      </HStack>

      <Text fontSize="$3xl" fontWeight="bold" color='black'>Login</Text>

      <VStack space="md" width="80%">
        <CustomInput
          placeholder="Usuário"
          value={username}
          onChangeText={setUsername}
          errorMessage={errors.username}
        />

        <CustomInput
          placeholder="Senha"
          type="password"
          value={password}
          onChangeText={setPassword}
          errorMessage={errors.password}
        />

        <CustomButton onPress={handleLogin}>Fazer Login</CustomButton>
      </VStack>

      <Pressable onPress={() => router.replace('/cadastro')}>
        <Text color="black" fontSize="$md">
          Não possui um cadastro? <Text fontWeight="bold" color="$red600" underline>Cadastre-se aqui!</Text>
        </Text>
      </Pressable>
    </VStack>
  );
}
