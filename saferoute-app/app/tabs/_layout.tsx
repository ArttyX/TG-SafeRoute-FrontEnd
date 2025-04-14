import { Tabs } from 'expo-router';
import { Icon } from '@gluestack-ui/themed';
import { User, Info, CarFront, Map } from 'lucide-react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#dc2626',
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="informacoes"
        options={{
          title: 'Informações',
          tabBarIcon: ({ color }) => (
            <Icon as={User} color={color} size="lg" />
          ),
        }}
      />
      <Tabs.Screen
        name="sobre"
        options={{
          title: 'Sobre',
          tabBarIcon: ({ color }) => (
            <Icon as={Info} color={color} size="lg" />
          ),
        }}
      />
      <Tabs.Screen
        name="veiculos"
        options={{
          title: 'Veículos',
          tabBarIcon: ({ color }) => (
            <Icon as={CarFront} color={color} size="lg" />
          ),
        }}
      />
      <Tabs.Screen
        name="percurso"
        options={{
          title: 'Percurso',
          tabBarIcon: ({ color }) => (
            <Icon as={Map} color={color} size="lg" />
          ),
        }}
      />
    </Tabs>
  );
}
