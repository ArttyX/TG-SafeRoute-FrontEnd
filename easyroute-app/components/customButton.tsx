import { Button, Text } from '@gluestack-ui/themed';
import { ReactNode } from 'react';

interface CustomButtonProps {
  onPress: () => void;
  children: ReactNode;
  color?: string;
  bg?: string;
}

export default function CustomButton({ onPress, children, color = '$white', bg = '$red600' }: CustomButtonProps) {
  return (
    <Button onPress={onPress} bg={bg} height={50}>
      <Text color={color}>{children}</Text>
    </Button>
  );
}
