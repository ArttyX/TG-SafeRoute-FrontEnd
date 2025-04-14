import { Input, InputField } from '@gluestack-ui/themed';

interface CustomInputProps {
  placeholder: string;
  type?: 'text' | 'password';
}

export default function CustomInput({ placeholder, type = 'text' }: CustomInputProps) {
  return (
    <Input variant="underlined" size="lg">
      <InputField placeholder={placeholder} type={type} />
    </Input>
  );
}
