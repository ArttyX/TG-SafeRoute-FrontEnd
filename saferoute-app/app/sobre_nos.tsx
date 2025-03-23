import { Button, VStack, Text, Image, HStack, Box, ScrollView } from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';

const membros = [
  {
    nome: 'Arthur Gonçalves Silva',
    descricao: 'Trabalha como suporte de infraestrutura, estudante de Análise e Desenvolvimento de Sistemas.',
    imagem: require('../assets/Arthur.png'), 
  },
  {
    nome: 'Wendel Emanuel dos Santos',
    descricao: 'Trabalha como técnico em mecatrônica, estudante de Análise e Desenvolvimento de Sistemas.',
    imagem: require('../assets/Wendel.png'),
  },
];

export default function SobreNosScreen() {
  const router = useRouter();

  return (
    <VStack flex={1} bg="$backgroundLight">
      <ScrollView>
        <VStack flex={1} justifyContent="center" alignItems="center" space="lg" px={8} py={6} marginTop={50}>
          <Text fontSize="$3xl" fontWeight="bold" color='black'>Sobre Nós</Text>
          {membros.map((membro, index) => (
            <HStack
              key={index}
              space="md"
              alignItems="flex-start"
              bg="$white"
              borderRadius="$lg"
              shadowOpacity="$5"
              p={4}
              width="100%"
              flexWrap="wrap"
              flexShrink={1}
            >
              <Box width={80} height={80} borderRadius="$full" overflow="hidden">
                <Image
                  source={membro.imagem}
                  alt={membro.nome}
                  style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                />
              </Box>
              <VStack flex={1}>
                <Text fontSize="$lg" fontWeight="bold">{membro.nome}</Text>
                <Text fontSize="$md">{membro.descricao}</Text>
              </VStack>
            </HStack>
          ))}
        </VStack>
      </ScrollView>
      <VStack alignItems="center" pb={20}>
        <Button bg="$red600" height={50} onPress={() => router.push('/')}>
          <Text color="$white">Voltar para a Home</Text>
        </Button>
      </VStack>
    </VStack>
  );
}
