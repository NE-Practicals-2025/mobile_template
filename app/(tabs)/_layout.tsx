import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";

import { CalendarIcon, PlusIcon } from "~/components/core/icons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: "#007AFF",
        tabBarStyle: {
          height: 80,
          paddingTop: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Events",
          tabBarIcon: ({ color }) => (
            <CalendarIcon color={color} width={35} height={35} />
          ),
          tabBarShowLabel: false,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: "Create",
          tabBarIcon: ({ color }) => (
            <PlusIcon color={color} width={35} height={35} />
          ),
          tabBarShowLabel: false,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
