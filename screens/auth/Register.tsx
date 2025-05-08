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

export default function RegisterScreen() {
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    email: "",
    password: "",
  });

  const handleRegister = async () => {
    if (!formData.email || !formData.password || !formData.username) {
      setError("Please fill in all fields");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Password validation
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    try {
      setIsLoading(true);
      setError("");
      await register(formData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
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
            Create Account
          </Text>
          <Text
            style={fonts.text}
            className="text-base text-center text-gray-600"
          >
            Sign up to get started with EventHub
          </Text>
        </View>

        <View className="flex flex-col gap-4">
          <FormInput
            placeholder="Names"
            value={formData.username}
            onChangeText={(text) =>
              setFormData({ ...formData, username: text })
            }
            autoCapitalize="none"
          />
          <FormInput
            placeholder="Phone Number"
            value={formData.phone}
            onChangeText={(text) => setFormData({ ...formData, phone: text })}
            autoCapitalize="none"
          />

          <FormInput
            placeholder="Email"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <FormInput
            placeholder="Password"
            value={formData.password}
            onChangeText={(text) =>
              setFormData({ ...formData, password: text })
            }
            secureTextEntry
            isPassword
          />

          {error ? (
            <Text style={fonts.text} className="text-red-500 text-sm">
              {error}
            </Text>
          ) : null}

          <TouchableOpacity
            className="bg-primary rounded-xl py-4 px-6"
            onPress={handleRegister}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text
                style={fonts.textBold}
                className="text-white text-center text-lg"
              >
                Sign Up
              </Text>
            )}
          </TouchableOpacity>

          <View className="flex-row justify-center mt-4">
            <Text style={fonts.text} className="text-gray-600">
              Already have an account?{" "}
            </Text>
            <Link href="/(auth)/login" asChild>
              <TouchableOpacity>
                <Text style={fonts.textBold} className="text-primary">
                  Sign In
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
