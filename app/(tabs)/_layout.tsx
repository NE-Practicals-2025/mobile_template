import { Tabs } from "expo-router";

import { PlusIcon, PostIcon } from "~/components/core/icons";

export default function TabLayout() {

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
            <PostIcon color={color} width={35} height={35} />
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
