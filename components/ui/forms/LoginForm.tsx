import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import FormInput from "../Input";

import { fonts } from "~/styles";
import { useRouter } from "expo-router";

interface ILoginForm {
  className?: string;
}

const LoginForm = ({ className }: ILoginForm) => {
    const navigate = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  return (
    <View className={`${className} flex flex-col gap-4`}>
      <FormInput
        placeholder="Email"
        value={formData.email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
      />
      <FormInput
        placeholder="Password"
        value={formData.password}
        onChangeText={(text) => setFormData({ ...formData, password: text })}
        secureTextEntry
        isPassword
      />
      <TouchableOpacity className="bg-primary rounded-md py-4 px-2">
        <Text
          style={fonts.textBold}
          className="text-lg text-center text-white font-bold"
        >
          Login
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigate.push("/(auth)/register")}>
        <Text
          style={fonts.textLight}
          className="text-base text-center font-bold"
        >
          Don't have an account? Sign up
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginForm;
