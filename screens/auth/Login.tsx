import React from "react";
import { Image, Text, View } from "react-native";

import LoginForm from "~/components/ui/forms/LoginForm";
import { fonts } from "~/styles";

const LoginScreen = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white p-4 space-y-4 flex flex-col gap-2">
      <Image source={require("../../assets/logo.png")} className="w-20 h-20" />
      <Text style={fonts.textBold} className="text-xl">
        EventHub
      </Text>
      <Text style={fonts.textLight} className="text-sm font-bold">
        Sign in to your account
      </Text>
      <LoginForm className="w-full mt-4" />
    </View>
  );
};

export default LoginScreen;
