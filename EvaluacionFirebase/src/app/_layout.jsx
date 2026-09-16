import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { Colors } from '../constants/theme';
import { Loading } from '../components/Loading';

SplashScreen.preventAutoHideAsync().catch(() => {});

// Tiempo mínimo que el splash permanece visible, para que se note la marca
// incluso cuando Firebase resuelve la sesión casi al instante.
const MIN_SPLASH_MS = 1800;
const splashMinDelay = new Promise((resolve) => setTimeout(resolve, MIN_SPLASH_MS));

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <StatusBar style="dark" />
        <RootNavigator />
      </AuthProvider>
    </SafeAreaProvider>
  );
}

function RootNavigator() {
  const { user, initializing } = useAuth();
  const [splashReady, setSplashReady] = useState(false);

  useEffect(() => {
    if (!initializing) {
      splashMinDelay.then(() => {
        setSplashReady(true);
        SplashScreen.hideAsync().catch(() => {});
      });
    }
  }, [initializing]);

  if (initializing || !splashReady) {
    return <Loading fullscreen label="Preparando tu sesión..." />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Colors.background },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Protected guard={!user}>
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="forgot-password" />
      </Stack.Protected>
      <Stack.Protected guard={!!user}>
        <Stack.Screen name="dashboard" />
      </Stack.Protected>
    </Stack>
  );
}
