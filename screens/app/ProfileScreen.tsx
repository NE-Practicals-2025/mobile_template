import { FontAwesome } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";

import { UserIcon } from "~/components/core/icons";
import { useAuth } from "~/contexts/auth.context";
import { fonts } from "~/styles";
export default function ProfileScreen() {
  const { logout } = useAuth();
  const [user, setUser] = React.useState<any>({});
  const [, setToken] = React.useState<any>({});

  React.useEffect(() => {
    const fetchData = async () => {
      const userData = await SecureStore.getItemAsync("user");
      const tokenData = await SecureStore.getItemAsync("token");
      if (userData) setUser(JSON.parse(userData));
      if (tokenData) setToken(JSON.parse(tokenData));
    };
    fetchData();
  }, []);

  console.log("user --> ", user);
  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            await logout();
          } catch {
            Alert.alert("Error", "Failed to logout. Please try again.");
          }
        },
      },
    ]);
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar hidden />
      {/* Profile Header */}
      <View className="bg-primary h-48 rounded-b-[40px] items-center justify-center pb-10">
        <View className="w-28 h-28 bg-white rounded-full items-center justify-center border-4 border-white shadow-sm pb-4">
          <UserIcon color="#3D56F0" height={50} width={50} />
        </View>
        <View className="items-center mt-4 px-6">
          <Text style={fonts.textBold} className="text-2xl text-white">
            {user?.username}
          </Text>
          <Text style={fonts.text} className="text-black mt-1">
            {user?.email}
          </Text>
          <Text style={fonts.text} className="text-black mt-1">
            {user?.phone}
          </Text>
        </View>
      </View>

      <View className="px-6 mt-2">
        <TouchableOpacity className="flex-row items-center gap-4 bg-gray-50 p-4 rounded-xl mb-4">
          <View className="w-10 h-10 bg-gray-200 rounded-full items-center justify-center">
            <UserIcon color="black" height={20} width={20} />
          </View>
          <View className="ml-4 flex-1">
            <Text style={fonts.textMedium} className="text-gray-900">
              Account Settings
            </Text>
            <Text style={fonts.text} className="text-gray-600 text-sm">
              Update your profile information
            </Text>
          </View>
          <FontAwesome name="angle-right" size={20} color="#4B5563" />
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center gap-4 bg-gray-50 p-4 rounded-xl">
          <View className="w-10 h-10 bg-gray-200 rounded-full items-center justify-center">
            <FontAwesome name="bell-o" size={20} color="#4B5563" />
          </View>
          <View className="ml-4 flex-1">
            <Text style={fonts.textMedium} className="text-gray-900">
              Notifications
            </Text>
            <Text style={fonts.text} className="text-gray-600 text-sm">
              Manage your notifications
            </Text>
          </View>
          <FontAwesome name="angle-right" size={20} color="#4B5563" />
        </TouchableOpacity>

        {/* Logout Button */}
        <TouchableOpacity
          onPress={handleLogout}
          className="flex-row items-center gap-4 bg-red-50 p-4 rounded-xl mt-8"
        >
          <View className="w-10 h-10 bg-red-100 rounded-full items-center justify-center">
            <FontAwesome name="sign-out" size={20} color="#EF4444" />
          </View>
          <View className="ml-4">
            <Text style={fonts.textMedium} className="text-red-500">
              Logout
            </Text>
            <Text style={fonts.text} className="text-red-400 text-sm">
              Sign out of your account
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
