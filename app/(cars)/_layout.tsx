import { Stack } from "expo-router";

export default function CarsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Cars",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: "Car Details",
          presentation: "modal",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
