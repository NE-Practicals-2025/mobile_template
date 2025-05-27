import { RelativePathString, useRouter } from "expo-router";
import { useState } from "react";
import { Switch, Text, TouchableOpacity, View } from "react-native";

import FormInput from "../elements/Input";

import useValidate, { ValidationRules } from "~/hooks/useValidate";
import { fonts } from "~/styles";
interface ILoginForm {
  className?: string;
}

const LoginForm = ({ className }: ILoginForm) => {
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useRouter();
  const { validate } = useValidate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const validationSchema: ValidationRules = {
    email: {
      type: "email",
      required: true,
      message: "Email is required",
    },
    password: {
      type: "string",
      required: true,
      minLength: 6,
      message: "Password is required",
    },
  };

  const handleLogin = () => {
    const { isValid, errors } = validate(formData, validationSchema);
    setError({
      email: errors.email || "",
      password: errors.password || "",
    });

    if (isValid) {
      console.log("Form is valid:", formData);
      navigate.push("/(tabs)");
    }
  };

  return (
    <View className={`${className} flex flex-col gap-4`}>
      <FormInput
        placeholder="Email"
        value={formData.email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
        errorMessage={error.email}
      />
      <FormInput
        placeholder="Password"
        value={formData.password}
        onChangeText={(text) => setFormData({ ...formData, password: text })}
        secureTextEntry
        isPassword
        errorMessage={error.password}
      />
      <View className="flex flex-row items-center justify-between">
        <Text style={fonts.textLight}>
          <TouchableOpacity
            onPress={() => setRememberMe(!rememberMe)}
            className="flex flex-row items-center"
          >
            <Switch
              thumbColor="#fff"
              trackColor={{ true: "#5669FF" }}
              value={rememberMe}
              onValueChange={() => setRememberMe(!rememberMe)}
              style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }}
            />
            <Text style={fonts.textLight}>Remember Me</Text>
          </TouchableOpacity>
        </Text>
        <TouchableOpacity>
          <Text style={fonts.textLight}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        className="bg-primary rounded-md py-4 px-2"
        onPress={handleLogin}
      >
        <Text
          style={fonts.textBold}
          className="text-lg text-center text-white"
        >
          Login
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigate.push("/(auth)/register" as RelativePathString)}>
        <Text
          style={fonts.textLight}
          className="text-base text-center"
        >
          Don't have an account? Sign up
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginForm;
