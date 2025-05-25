import CustomButton from '@/components/customButton';
import { Box, Text, Card } from '@gluestack-ui/themed';
import { Linking } from 'react-native';

export default function Sobre() {
  return (
    <Box flex={1} px="$4" pt="$12" bg="$white">
      <Text fontSize="$2xl" fontWeight="bold" mb="$4">Sobre o Projeto</Text>

      <Text mb="$4">
        O projeto EasyRoute é um aplicativo educacional para motoristas iniciantes. Nosso objetivo é ajudar entregadores e motoristas a se prepararem para o mercado com cursos especializados.
      </Text>

      <Text fontWeight="bold" fontSize={'$lg'}>Cursos oferecidos:</Text>
      <Box marginEnd={5} marginTop={5}>
      <Text fontWeight= "bold">• Entrega de Comida:</Text>
      <Text>Voltado para motoboys e motoristas de aplicativo como Ifood e afins.</Text>
      <Text fontWeight= "bold">• Entrega de Produtos:</Text>
      <Text>Voltado para motoristas para entregas de objetos.</Text>
      <Text fontWeight= "bold">• Transporte de Pessoas:</Text>
      <Text>Planejado para motoristas de serviços de taxi e semelhantes.</Text>
      </Box>
      <Card
            marginTop={5}
            borderWidth={1}
            borderColor="$gray300"
            borderRadius="$lg"
            padding="$4"
            backgroundColor="$white"
            shadowColor="$black"
            shadowOffset={{ width: 0, height: 1 }}
            shadowOpacity={0.1}
            shadowRadius={2}>
      <Text fontWeight={'$bold'} marginBottom={5}>Navegue pelo botão abaixo para acessar nosso formulário e dar seu feedback!</Text>
      <CustomButton onPress={() => Linking.openURL('https://google.com.br')}>Acessar Forms</CustomButton>
      </Card>
    </Box>
  );
}
