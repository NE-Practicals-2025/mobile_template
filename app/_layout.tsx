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

import { AuthProvider } from "~/contexts/auth.context";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(auth)",
};

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
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(cars)" options={{ headerShown: false }} />
          <Stack.Screen
            name="modal"
            options={{ presentation: "modal", headerShown: false }}
          />
        </Stack>
      </ThemeProvider>
    </AuthProvider>
  );
}
