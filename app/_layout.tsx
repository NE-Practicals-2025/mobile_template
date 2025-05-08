import "../global.css";

import { useFonts } from "expo-font";
import { Stack } from "expo-router";
//load DM Sans font in react native expo

import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(auth)",
};

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    DMSans: require("../assets/fonts/DM_Sans/static/DMSans_18pt-Regular.ttf"),
    DMSansBold: require("../assets/fonts/DM_Sans/static/DMSans_18pt-Bold.ttf"),
    DMSansLight: require("../assets/fonts/DM_Sans/static/DMSans_18pt-Light.ttf"),
    DMSansMedium: require("../assets/fonts/DM_Sans/static/DMSans_18pt-Medium.ttf"),
    DMSansSemiBold: require("../assets/fonts/DM_Sans/static/DMSans_18pt-SemiBold.ttf"),
    DMSansThin: require("../assets/fonts/DM_Sans/static/DMSans_18pt-Thin.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  if (!fontsLoaded) {
    return null;
  }
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="modal" options={{ presentation: "modal" }} />
    </Stack>
  );
}
