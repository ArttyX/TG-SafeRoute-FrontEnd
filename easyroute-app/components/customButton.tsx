import { Button, Text } from '@gluestack-ui/themed';
import { ReactNode } from 'react';

interface CustomButtonProps {
  onPress: () => void;
  children: ReactNode;
  color?: string;
  bg?: string;
  variant?: string;
  disabled?: boolean; // adiciona essa prop
}

export default function CustomButton({
  onPress,
  children,
  color = '$white',
  bg = '$red600',
  disabled = false,  // valor padrão
}: CustomButtonProps) {
  return (
    <Button
      onPress={onPress}
      bg={bg}
      height={50}
      disabled={disabled} // repassa para o Button
      opacity={disabled ? 0.6 : 1} // deixa o botão meio transparente se estiver desabilitado
    >
      <Text color={color}>{children}</Text>
    </Button>
  );
}
