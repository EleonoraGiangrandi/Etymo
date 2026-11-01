import '@/lib/expo-crypto-polyfill';
import { Stack } from 'expo-router';
import { ThemeProvider } from '@/context/theme-context';
import { AuthProvider } from '@/context/auth-context';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
        </Stack>
      </AuthProvider>
    </ThemeProvider>
  );
}
