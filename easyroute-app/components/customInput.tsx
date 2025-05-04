import { Input, InputField, Text } from '@gluestack-ui/themed';

interface CustomInputProps {
  placeholder: string;
  type?: 'text' | 'password';
  value?: string;
  onChangeText?: (text: string) => void;
  errorMessage?: string;
}

export default function CustomInput({ placeholder, type = 'text', value, onChangeText, errorMessage }: CustomInputProps) {
  return (
    <>
      <Input variant="underlined" size="lg" borderColor={errorMessage ? '$red600' : undefined}>
        <InputField
          placeholder={placeholder}
          type={type}
          value={value}
          onChangeText={onChangeText}
        />
      </Input>
      {errorMessage ? (
        <Text color="$red600" fontSize="$sm" mt="$1">
          {errorMessage}
        </Text>
      ) : null}
    </>
  );
}
