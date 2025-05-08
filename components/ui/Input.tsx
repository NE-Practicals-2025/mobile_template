import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

import { fonts } from "~/styles";

interface IFormInput {
  icon?: React.ReactNode;
  placeholder?: string;
  containerStyle?: object;
  inputStyle?: object;
  value?: string;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric";
  onChangeText?: (text: string) => void;
  onBlur?: () => void;
  placeholderTextColor?: string;
  isPassword?: boolean;
  errorMessage?: string;
}

const FormInput = (props: IFormInput) => {
  const { height } = useWindowDimensions();
  const [isShowPassword, setIsShowPassword] = useState(false);

  return (
    <View className="w-full">
      {/* Input Container */}
      <View
        className={`relative flex-row items-center w-full rounded-md ${
          props.errorMessage ? "border border-red-500" : ""
        }`}
        style={[
          {
            height: height * 0.07,
          },
          props.containerStyle,
        ]}
      >
        {props.icon}
        <TextInput
          accessible={false}
          accessibilityLabel={props.placeholder || "Input field"}
          value={props.value}
          onBlur={props.onBlur}
          onChangeText={props.onChangeText}
          placeholder={props.placeholder || "Enter text"}
          placeholderTextColor={props.placeholderTextColor ?? "#1D1D1DA8"}
          secureTextEntry={props.isPassword && !isShowPassword}
          keyboardType={props.keyboardType || "default"}
          autoCapitalize="none"
          className="text-lg flex-1 border border-[#807A7A] h-16 my-2 rounded-md"
          style={[
            {
              color: "#1D1D1DA8",
              fontFamily: "DMSans",
              paddingLeft: props.icon ? 25 : 20,
              lineHeight: 19,
            },
            props.inputStyle,
          ]}
        />

        {/* Password Visibility Toggle */}
        {props.isPassword && (
          <TouchableOpacity
            className="absolute right-5"
            onPress={() => setIsShowPassword(!isShowPassword)}
          >
            {isShowPassword ? (
              <Ionicons name="eye-off" size={24} color="gray" />
            ) : (
              <Ionicons name="eye" size={24} color="gray" />
            )}
          </TouchableOpacity>
        )}
      </View>

      {/* Error Message Display */}
      {props.errorMessage && (
        <Text className="text-[#FF3D00] mt-1 ml-0" style={fonts.textLight}>
          {props.errorMessage}
        </Text>
      )}
    </View>
  );
};

export default FormInput;
