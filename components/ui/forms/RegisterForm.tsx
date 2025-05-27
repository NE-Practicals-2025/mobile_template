import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import FormInput from "../elements/Input";

import useValidate, { ValidationRules } from "~/hooks/useValidate";
import { fonts } from "~/styles";

interface IRegisterForm {
  className?: string;
}

const RegisterForm = ({ className }: IRegisterForm) => {
  const navigate = useRouter();
  const { validate } = useValidate();
  const [error, setError] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });

  const validationSchema: ValidationRules = {
    username: {
      type: "string" as const,
      required: true,
      minLength: 3,
      message: "Username must be at least 3 characters",
    },
    email: {
      type: "email" as const,
      required: true,
      message: "Please enter a valid email address",
    },
    password: {
      type: "string" as const,
      required: true,
      minLength: 6,
      message: "Password must be at least 6 characters",
    },
  };

  const validateField = (name: string, value: string) => {
    const fieldSchema = { [name]: validationSchema[name] };
    const fieldData = { [name]: value };
    const { errors } = validate(fieldData, fieldSchema);
    setError((prev) => ({
      ...prev,
      [name]: errors[name] || "",
    }));
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateField(name, value);
  };

  const handleRegister = () => {
    const { isValid, errors } = validate(formData, validationSchema);
    setError({
      username: errors.username || "",
      email: errors.email || "",
      password: errors.password || "",
    });

    if (isValid) {
      console.log("Form is valid:", formData);
      // Proceed with registration
    }
  };

  return (
    <View className={`${className} flex flex-col gap-4`}>
      <FormInput
        placeholder="Username"
        value={formData.username}
        onChangeText={(text) => handleInputChange("username", text)}
        errorMessage={error.username}
      />
      <FormInput
        placeholder="Email"
        value={formData.email}
        onChangeText={(text) => handleInputChange("email", text)}
        errorMessage={error.email}
      />
      <FormInput
        placeholder="Password"
        value={formData.password}
        onChangeText={(text) => handleInputChange("password", text)}
        secureTextEntry
        isPassword
        errorMessage={error.password}
      />
      <TouchableOpacity
        className="bg-primary rounded-md py-4 px-2"
        onPress={handleRegister}
      >
        <Text
          style={fonts.textBold}
          className="text-lg text-center text-white"
        >
          Register
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigate.push("/(auth)/login")}>
        <Text
          style={fonts.textLight}
          className="text-base text-center"
        >
          Already have an account? Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterForm;
