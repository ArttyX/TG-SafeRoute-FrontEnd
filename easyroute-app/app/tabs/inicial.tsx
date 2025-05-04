// app/inicial.tsx

import { Box, Text, VStack, Pressable, HStack, Icon } from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';
import { Bike, Car, Utensils } from 'lucide-react-native';

const cursos = [
  { nome: 'Entregador de Alimentos', icone: Utensils, id: 'alimentos' },
  { nome: 'Transporte de Produtos', icone: Bike, id: 'produtos' },
  { nome: 'Transporte de Pessoas', icone: Car, id: 'pessoas' },
];

export default function Inicial() {
  const router = useRouter();

  return (
    <Box flex={1} px="$4" pt="$12" bg="$white">
      <Text fontSize="$2xl" fontWeight="bold" mb="$4">
        Bem-vindo ao EasyRoute!
      </Text>

      <Text fontSize="$md" mb="$4">Escolha um curso para começar:</Text>

      <VStack space="md">
        {cursos.map((curso) => (
          <Pressable
            key={curso.id}
            onPress={() => router.push(`/curso/${curso.id}`)}  // Vai para a página do curso
            borderWidth={1}
            borderColor="$gray300"
            p="$4"
            rounded="$lg"
            bg="$gray100"
          >
            <HStack alignItems="center" space="sm">
              <Icon as={curso.icone} size="lg" />
              <Text fontSize="$md">{curso.nome}</Text>
            </HStack>
          </Pressable>
        ))}
      </VStack>
    </Box>
  );
}
