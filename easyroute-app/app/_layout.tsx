import { GluestackUIProvider, StyledProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import { Slot } from 'expo-router';

export default function Layout() {
  return (
    <GluestackUIProvider config={config}>
      <StyledProvider config={config}>
        <Slot />
      </StyledProvider>
    </GluestackUIProvider>
  );
}
