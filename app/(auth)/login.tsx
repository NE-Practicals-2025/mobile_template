import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { authService } from '../../services/api';
import { useAuth } from '../../contexts/auth.context';
import Toast from 'react-native-toast-message';
import { fonts } from '~/styles';
import useValidate, { ValidationRules } from '~/hooks/useValidate';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ username: '', password: '' });
  const { login } = useAuth();
  const { validate } = useValidate();

  const validationSchema: ValidationRules = {
    username: {
      type: "email",
      required: true,
      message: "Please enter a valid email address"
    },
    password: {
      type: "string",
      required: true,
      minLength: 6,
      message: "Password must be at least 6 characters"
    }
  };

  const validateField = (name: string, value: string) => {
    const fieldSchema = { [name]: validationSchema[name] };
    const fieldData = { [name]: value };
    const { errors } = validate(fieldData, fieldSchema);
    setErrors(prev => ({
      ...prev,
      [name]: errors[name] || ""
    }));
  };

  const handleLogin = async () => {
    const { isValid, errors } = validate({ username, password }, validationSchema);
    setErrors({
      username: errors.username || '',
      password: errors.password || ''
    });

    if (!isValid) {
      return;
    }

    setIsLoading(true);
    try {
      const user = await authService.login({ username, password });
      await login(user);
      router.replace('/(tabs)');
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Login failed',
        text2: error instanceof Error ? error.message : 'Login failed',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white">
      {/* Background Pattern */}
      <View className="absolute top-0 left-0 right-0 h-64 bg-blue-500 rounded-b-[50px]" />
      
      <View className="flex-1 px-6 pt-20">
        {/* Logo and Title */}
        <View className="items-center mb-12">
          <View className="w-20 h-20 bg-white rounded-full items-center justify-center mb-4 shadow-lg">
            <Text style={fonts.textBold} className="text-3xl text-blue-500">$</Text>
          </View>
          <Text style={fonts.textBold} className="text-3xl text-white mb-2">Finance Tracker</Text>
          <Text style={fonts.textLight} className="text-white/80">Track your expenses with ease</Text>
        </View>

        {/* Login Card */}
        <View className="bg-white rounded-2xl p-6 shadow-lg">
          <Text style={fonts.textSemiBold} className="text-2xl text-gray-800 mb-6">Welcome Back</Text>

          <View className="space-y-4">
            <View>
              <Text style={fonts.textLight} className="text-gray-600 mb-2">Username</Text>
              <TextInput
                className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-800"
                placeholder="Enter your username"
                value={username}
                onChangeText={(text) => {
                  setUsername(text);
                  validateField('username', text);
                }}
                autoCapitalize="none"
                keyboardType="email-address"
              />
              {errors.username ? (
                <Text style={fonts.text} className="text-red-500 text-sm mt-1">{errors.username}</Text>
              ) : null}
            </View>

            <View>
              <Text style={fonts.textLight} className="text-gray-600 mb-2">Password</Text>
              <TextInput
                className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-800"
                placeholder="Enter your password"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  validateField('password', text);
                }}
                secureTextEntry
              />
              {errors.password ? (
                <Text style={fonts.text} className="text-red-500 text-sm mt-1">{errors.password}</Text>
              ) : null}
            </View>

            <TouchableOpacity
              className="bg-blue-500 p-4 rounded-xl mt-6"
              onPress={handleLogin}
              disabled={isLoading}
            >
              <Text style={fonts.textSemiBold} className="text-white text-center font-semibold text-lg">
                {isLoading ? 'Logging in...' : 'Login'}
              </Text>
            </TouchableOpacity>

            {/* <TouchableOpacity
              onPress={() => router.push('/(auth)/register')}
              className="mt-4"
            >
              <Text style={fonts.textLight} className="text-center text-gray-600">
                Don't have an account? Register
              </Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </View>
    </View>
  );
}
