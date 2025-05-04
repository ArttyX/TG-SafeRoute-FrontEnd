import { Pressable, Icon } from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';

export default function BackButton() {
  const router = useRouter();

  return (
    <Pressable onPress={() => router.back()}>
      <Icon as={ArrowLeft} size="xl" color="$red600" />
    </Pressable>
  );
}
