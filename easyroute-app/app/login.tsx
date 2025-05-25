import React, { useState } from 'react';
import CustomButton from '@/components/customButton';
import CustomInput from '@/components/customInput';
import { VStack, Text, Pressable, Icon, HStack } from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { Alert } from 'react-native';
import { loginUsuario } from '@/services/authlocal';

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });

  const handleLogin = async () => {
  let valid = true;
  const newErrors = { email: '', password: '' };

  // Verifica se o e-mail foi preenchido
  if (!email.trim()) {
    newErrors.email = 'E-mail é obrigatório';
    valid = false;
  } else {
    // Validação de formato do e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      newErrors.email = 'E-mail inválido';
      valid = false;
    }
  }

  if (!password.trim()) {
    newErrors.password = 'Senha é obrigatória';
    valid = false;
  }

  setErrors(newErrors);

  if (!valid) return;

  try {
    await loginUsuario(email, password);
    router.push('/tabs/inicial');
  } catch (error: any) {
    let msg = 'Erro ao fazer login.';
    if (error.code === 'auth/user-not-found') msg = 'Usuário não encontrado.';
    if (error.code === 'auth/wrong-password') msg = 'Senha incorreta.';
    Alert.alert('Erro de login', msg);
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
  placeholder="E-mail"
  value={email}
  onChangeText={setEmail}
  errorMessage={errors.email}
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
