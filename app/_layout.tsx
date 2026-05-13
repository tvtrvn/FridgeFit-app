import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { Colors } from '@/constants/theme';
import { useIngredientsHydration } from '@/hooks/useIngredientsHydration';

export const unstable_settings = {
  anchor: '(tabs)',
};

const NavTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.brand,
    background: Colors.surface,
    card: Colors.surfaceElevated,
    text: Colors.text,
    border: Colors.border,
    notification: Colors.accent,
  },
};

export default function RootLayout() {
  useIngredientsHydration();

  return (
    <ThemeProvider value={NavTheme}>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: Colors.surface },
          headerTintColor: Colors.text,
          contentStyle: { backgroundColor: Colors.surface },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="recipe/[id]"
          options={{ title: '', headerTransparent: true, headerBackTitle: 'Back' }}
        />
      </Stack>
      <StatusBar style="dark" />
    </ThemeProvider>
  );
}
