import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Animated } from 'react-native';
import { Box, Text, VStack, Image, HStack } from '@gluestack-ui/themed';
import CustomButton from '@/components/customButton';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { obterPerfilUsuarioLogado } from '@/services/authlocal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { cursosData } from '@/data/cursos';
import { CheckCircle2 } from 'lucide-react-native';

export default function Perfil() {
  const router = useRouter();
  const [nome, setNome] = useState('Carregando...');
  const [email, setEmail] = useState('');
  const [foto, setFoto] = useState<string | null>(null);
  const [progressoCursos, setProgressoCursos] = useState<{ [cursoId: string]: number }>({});
  const animatedValues = useRef<{ [cursoId: string]: Animated.Value }>({}).current;

  useFocusEffect(
    useCallback(() => {
      const carregarDados = async () => {
        try {
          const usuario = await obterPerfilUsuarioLogado();
          setNome(usuario.nome || '');
          setEmail(usuario.email || '');
          setFoto(usuario.foto || null);

          const emailLogado = usuario.email;
          const key = `pontuacoes-${emailLogado}`;
          const json = await AsyncStorage.getItem(key);
          const pontuacoes = json ? JSON.parse(json) : {};

          const novosProgresso: { [cursoId: string]: number } = {};

          for (const cursoId in cursosData) {
            const curso = cursosData[cursoId];
            const modulos = curso.modulos;
            const totalModulos = modulos.length;

            let modulosConcluidos = 0;

            modulos.forEach(modulo => {
              const pontuacao = pontuacoes?.[cursoId]?.[modulo.id];
              if (pontuacao && pontuacao.pontuacao === pontuacao.total) {
                modulosConcluidos++;
              }
            });

            const progresso = (modulosConcluidos / totalModulos) * 100;
            novosProgresso[cursoId] = progresso;

            // Inicializar e animar valores
            if (!animatedValues[cursoId]) {
              animatedValues[cursoId] = new Animated.Value(0);
            }

            Animated.timing(animatedValues[cursoId], {
              toValue: progresso,
              duration: 500,
              useNativeDriver: false,
            }).start();
          }

          setProgressoCursos(novosProgresso);
        } catch (e) {
          console.warn('Erro ao carregar perfil:', e);
          setNome('Usuário não encontrado');
          router.push('/login');
        }
      };

      carregarDados();
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

        <CustomButton onPress={() => router.push('/editar-informacoes')}>
          <Text color='white'>Editar Informações</Text>
        </CustomButton>
        <CustomButton bg="$red600" onPress={async () => {
          await AsyncStorage.removeItem('usuarioLogado');
          router.replace('/login');
        }}>
          <Text color='white'>Sair</Text>
        </CustomButton>
      </VStack>

      <Box mt="$8" mb="$4">
        <Text fontWeight="bold" fontSize="$md" mb="$2">Meus Cursos</Text>

        <VStack space="lg">
          {Object.entries(cursosData).map(([cursoId, curso]) => {
            const progresso = progressoCursos[cursoId] ?? 0;
            const finalizado = progresso >= 100;

            const larguraAnimada = animatedValues[cursoId]?.interpolate({
              inputRange: [0, 100],
              outputRange: ['0%', '100%'],
              extrapolate: 'clamp'
            });

            return (
              <Box key={cursoId}>
                <HStack justifyContent="space-between" alignItems="center" mb="$1">
                  <Text fontWeight="semibold">{curso.nome}</Text>
                  <HStack alignItems="center" space="xs">
                    <Text color="$gray600">{progresso.toFixed(0)}%</Text>
                    {finalizado && <CheckCircle2 size={18} color="#22c55e" />}
                  </HStack>
                </HStack>

                {/* Barra de progresso customizada */}
                <Box
                  height={12}
                  width="100%"
                  bg="$gray300"
                  borderRadius={8}
                  overflow="hidden"
                >
                <Animated.View
                  style={{
                  height: '100%',
                  width: larguraAnimada,
                  backgroundColor: finalizado ? '#22c55e' : '#60a5fa', // Verde se finalizado, azul claro caso contrário
                  borderRadius: 8,
                  }}/>
                </Box>
              </Box>
            );
          })}
        </VStack>
      </Box>
    </Box>
  );
}
