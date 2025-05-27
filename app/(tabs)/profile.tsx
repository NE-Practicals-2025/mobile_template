import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '../../contexts/auth.context';
import { router } from 'expo-router';
import { fonts } from '~/styles';

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
              router.replace('/login');
            } catch (error) {
              Alert.alert('Error', 'Failed to logout');
            }
          },
        },
      ]
    );
  };

  return (
    <View className="flex-1 bg-white p-4">
      <View className="items-center mb-8">
        <View className="w-24 h-24 bg-blue-100 rounded-full items-center justify-center mb-4">
          <Text style={fonts.textBold} className="text-3xl text-blue-500">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </Text>
        </View>
        <Text style={fonts.textSemiBold} className="text-2xl">{user?.name}</Text>
        <Text style={fonts.textLight} className="text-gray-500">{user?.username}</Text>
      </View>

      <View className="space-y-4">
        <View className="bg-gray-50 p-4 rounded-lg">
          <Text style={fonts.textLight} className="text-gray-500 text-sm">Username</Text>
          <Text style={fonts.text} className="text-lg">{user?.username}</Text>
        </View>
      </View>

      <TouchableOpacity
        className="bg-red-500 p-4 rounded-lg mt-8"
        onPress={handleLogout}
      >
        <Text style={fonts.textSemiBold} className="text-white text-center">Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
