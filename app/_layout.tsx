import "../global.css";

import {
  DefaultTheme,
  DarkTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useColorScheme } from "react-native";

import { AuthProvider, useAuth } from "~/contexts/auth.context";
import { router, useSegments } from 'expo-router';
import Toast from 'react-native-toast-message';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(auth)",
};

function RootLayoutNav() {
  const { user, isLoading } = useAuth();
  const segments = useSegments();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!user && !inAuthGroup) {
      router.replace('/login');
    } else if (user && inAuthGroup) {
      router.replace('/(tabs)');
    }
  }, [user, segments, isLoading]);

  return (
    <Stack>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="expense/[id]"
        options={{
          title: 'Expense Details',
          headerBackTitle: 'Back',
          headerShown: false
        }}
      />
      <Stack.Screen
        name="expense/new"
        options={{
          title: '',
          headerBackTitle: 'Back',
          headerShown: false
        }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    DMSans: require("../assets/fonts/DM_Sans/static/DMSans_18pt-Regular.ttf"),
    DMSansBold: require("../assets/fonts/DM_Sans/static/DMSans_18pt-Bold.ttf"),
    DMSansLight: require("../assets/fonts/DM_Sans/static/DMSans_18pt-Light.ttf"),
    DMSansMedium: require("../assets/fonts/DM_Sans/static/DMSans_18pt-Medium.ttf"),
    DMSansSemiBold: require("../assets/fonts/DM_Sans/static/DMSans_18pt-SemiBold.ttf"),
    DMSansThin: require("../assets/fonts/DM_Sans/static/DMSans_18pt-Thin.ttf"),
  });

  const colorScheme = useColorScheme();

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <RootLayoutNav />
      <Toast />
    </AuthProvider>
  );
}
