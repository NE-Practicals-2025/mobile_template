import { Link } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import FormInput from "~/components/ui/elements/Input";
import { useAuth } from "~/contexts/auth.context";
import { fonts } from "~/styles";

export default function LoginScreen() {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setIsLoading(true);
      setError("");
      await login(formData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      <View className="flex-1 justify-center px-6">
        <View className="mb-8">
          <View className="flex-row items-center gap-2 my-3 justify-center">
            <Image
              source={require("~/assets/logo.png")}
              className="w-16 h-16 mb-2"
            />
          </View>
          <Text
            style={fonts.textBold}
            className="text-3xl text-center text-gray-900 mb-2"
          >
            Welcome Back
          </Text>
          <Text
            style={fonts.text}
            className="text-base text-center text-gray-600"
          >
            Sign in to continue to EventHub
          </Text>
        </View>

        <View className="space-y-4">
          <FormInput
            placeholder="Email"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            keyboardType="email-address"
            autoCapitalize="none"
            className="my-2"
          />

          <FormInput
            placeholder="Password"
            value={formData.password}
            onChangeText={(text) =>
              setFormData({ ...formData, password: text })
            }
            className="my-2"
            secureTextEntry
            isPassword
          />

          {error ? (
            <Text style={fonts.text} className="text-red-500 text-sm mb-2">
              {error}
            </Text>
          ) : null}

          <TouchableOpacity
            className="bg-primary rounded-xl py-4 px-6"
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text
                style={fonts.textBold}
                className="text-white text-center text-lg"
              >
                Sign In
              </Text>
            )}
          </TouchableOpacity>

          <View className="flex-row justify-center mt-4">
            <Text style={fonts.text} className="text-gray-600">
              Don't have an account?{" "}
            </Text>
            <Link href="/(auth)/register" asChild>
              <TouchableOpacity>
                <Text style={fonts.textBold} className="text-primary">
                  Sign Up
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
