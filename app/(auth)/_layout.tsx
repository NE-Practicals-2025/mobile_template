import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";

export default function TabLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <PaperProvider>
        <Stack.Screen name="login" />
      </PaperProvider>
    </Stack>
  );
}
