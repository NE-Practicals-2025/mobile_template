import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

import { fonts } from "~/styles";

export interface IFormInput extends React.ComponentProps<typeof TextInput> {
  isPassword?: boolean;
  errorMessage?: string;
}

const FormInput = ({
  isPassword,
  errorMessage,
  className = "",
  ...props
}: IFormInput) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="w-full">
      {/* Input Container */}
      <View
        className={`flex-row items-center h-16 bg-gray-50 rounded-xl border border-gray-200 ${className}`}
      >
        <TextInput
          {...props}
          style={fonts.text}
          className="flex-1 px-4  text-base"
          placeholderTextColor="#9CA3AF"
          secureTextEntry={isPassword && !showPassword}
        />
        {isPassword && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            className="px-4"
          >
            <FontAwesome
              name={showPassword ? "eye" : "eye-slash"}
              size={20}
              color="#9CA3AF"
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Error Message Display */}
      {errorMessage && (
        <Text style={fonts.text} className="text-red-500 text-sm mt-1">
          {errorMessage}
        </Text>
      )}
    </View>
  );
};

export default FormInput;
