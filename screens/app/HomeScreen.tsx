import { View, Text, StatusBar } from "react-native";

const HomeScreen = () => {
  return (
    <View className="flex-1 bg-white">
      <StatusBar hidden />
      <View className="flex-1 items-center justify-center">
        <Text className="text-2xl">Home</Text>
      </View>
    </View>
  );
};

export default HomeScreen;
