import i18n from '@/i18n';
import { DarkTheme as darkThemeNavigation, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { adaptNavigationTheme, PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';
import Toast from 'react-native-toast-message';

import { useThemeMode } from '@/hooks/useThemeMode';
import { darkTheme, lightTheme } from '@/theme/theme';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
void i18n;

export default function RootLayout() {
  const {isDark} = useThemeMode();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  const theme = isDark ? darkTheme : lightTheme;
  const { DarkTheme, LightTheme } = adaptNavigationTheme({
    reactNavigationLight: DefaultTheme,
    reactNavigationDark: darkThemeNavigation
  });

  return (
    <>
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <ThemeProvider value={isDark ? DarkTheme : LightTheme}>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
          </ThemeProvider>
        </PaperProvider>
      </SafeAreaProvider>
      <Toast />
    </>
  );
}
