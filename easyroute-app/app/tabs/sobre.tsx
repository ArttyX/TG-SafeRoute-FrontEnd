import CustomButton from '@/components/customButton';
import { Box, Text, VStack, Button, Link } from '@gluestack-ui/themed';
import { Linking } from 'react-native';

export default function Sobre() {
  return (
    <Box flex={1} px="$4" pt="$12" bg="$white">
      <Text fontSize="$2xl" fontWeight="bold" mb="$4">Sobre o Rota Fácil</Text>

      <Text mb="$4">
        O Rota Fácil é um aplicativo educacional para motoristas iniciantes. Nosso objetivo é ajudar entregadores e motoristas a se prepararem para o mercado com cursos especializados.
      </Text>

      <Text fontWeight="bold">Cursos oferecidos:</Text>
      <Text>• Entregador de Alimentos</Text>
      <Text>• Transporte de Produtos</Text>
      <Text>• Transporte de Pessoas</Text>

      <VStack space="md" mt="$6">
        <CustomButton onPress={() => Linking.openURL('mailto:contato@rotafacil.com')}>
          Enviar Email
        </CustomButton>
        <CustomButton onPress={() => Linking.openURL('https://github.com/seu-usuario')}>
          Visitar GitHub
        </CustomButton>
      </VStack>
    </Box>
  );
}
