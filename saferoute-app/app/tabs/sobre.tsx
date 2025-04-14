import { VStack, Text, ScrollView, Image, HStack } from '@gluestack-ui/themed';
export default function Sobre() {
  return (
    <ScrollView flex={1} bg="$backgroundLight">
      <VStack space="lg" px="$6" py="$8">
        <Text fontSize="$3xl" fontWeight="bold" color="black">
          Sobre o Projeto
        </Text>

        <Text fontSize="$md" color="black" textAlign="justify">
          Este aplicativo foi desenvolvido com o objetivo de aumentar a segurança de motoristas durante seus trajetos. Ele permite o cadastro de veículos e possui um sistema de acionamento de emergência, enviando um alerta com a localização caso o usuário não confirme sua segurança dentro de um tempo determinado. Buscamos integrar praticidade, usabilidade e segurança para promover viagens mais seguras aos motoristas.
        </Text>

        <Text fontSize="$3xl" fontWeight="bold" color="black" mt="$4">
          Sobre Nós
        </Text>

        <Text fontSize="$md" color="black" textAlign="justify">
          Somos estudantes do 6° Semestre em Análise e Desenvolvimento de Sistemas da Faculdade de Tecnologia de Indaiatuba. Acreditamos que a tecnologia pode ser uma poderosa aliada na prevenção de acidentes e situações de risco.
        </Text>

        <HStack mt="$6" space="md" alignItems="center" width="100%" flexWrap="wrap" flexShrink={1}>
          <Image
            source={require('../../assets/Arthur.png')}
            alt="Foto de Arthur Gonçalves Silva"
            width={80}
            height={80}
            borderRadius={100}
          />
          <VStack>
            <Text fontWeight="bold" fontSize="$lg" color="black">Arthur Gonçalves Silva</Text>
            <Text fontSize="$sm" color="black">
                Trabalha como suporte de infraestrutura, estudante de Análise e Desenvolvimento de Sistemas.
            </Text>
          </VStack>
        </HStack>

        <HStack mt="$4" space="md" alignItems="center" width="100%" flexWrap="wrap" flexShrink={1}>
          <Image
            source={require('../../assets/Wendel.png') }
            alt="Foto de Wendel Emanuel dos Santos"
            width={80}
            height={80}
            borderRadius={100}
          />
          <VStack>
            <Text fontWeight="bold" fontSize="$lg" color="black">Wendel Emanuel dos Santos</Text>
            <Text fontSize="$sm" color="black">
                Trabalha como técnico em mecatrônica, estudante de Análise e Desenvolvimento de Sistemas.
            </Text>
          </VStack>
        </HStack>
      </VStack>
    </ScrollView>
  );
}
