import {
  DarkTheme as NavDarkTheme,
  DefaultTheme as NavLightTheme,
  ThemeProvider,
} from '@react-navigation/native'
import { QueryClientProvider } from '@tanstack/react-query'
import {
  MD3LightTheme,
  MD3DarkTheme,
  PaperProvider,
  adaptNavigationTheme,
} from 'react-native-paper'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import 'react-native-reanimated'

import { useColorScheme } from '@/hooks/use-color-scheme'
import queryClient from '@/api/queryClient'

export const unstable_settings = {
  anchor: '(tabs)',
}

const { LightTheme: NavPaperLight, DarkTheme: NavPaperDark } =
  adaptNavigationTheme({
    reactNavigationLight: NavLightTheme,
    reactNavigationDark: NavDarkTheme,
  })

export default function RootLayout() {
  const colorScheme = useColorScheme()

  const paperTheme = colorScheme === 'dark' ? MD3DarkTheme : MD3LightTheme
  const navTheme = colorScheme === 'dark' ? NavPaperDark : NavPaperLight

  const brandPrimary = '#6750A4'

  const paper = {
    ...paperTheme,
    colors: {
      ...paperTheme.colors,
      primary: brandPrimary,
    },
  }

  const nav = {
    ...navTheme,
    colors: {
      ...navTheme.colors,
      primary: brandPrimary,
    },
  }

  return (
    <PaperProvider theme={paper}>
      <ThemeProvider value={nav}>
        <QueryClientProvider client={queryClient}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
          <StatusBar style="auto" />
        </QueryClientProvider>
      </ThemeProvider>
    </PaperProvider>
  )
}
