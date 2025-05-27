import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface HomeHeaderProps {
  points?: number;
  onLocationPress?: () => void;
  onHostPress?: () => void;
}

export default function HomeHeader({
  points = 200,
  onLocationPress,
  onHostPress,
}: HomeHeaderProps) {
  return (
    <View className="flex-row items-center justify-between mb-6">
      <View className="flex-1">
        <Text className="text-xl mt-2">Rent a Car anytime</Text>
      </View>

      <View className="flex-row items-center gap-3">
        <View className="flex-row items-center bg-gray-100 px-3 py-1 rounded-full">
          <Ionicons name="leaf" size={16} color="#4CAF50" />
          <Text className="ml-1 font-semibold">{points}</Text>
        </View>
        <TouchableOpacity
          onPress={onHostPress}
          className="bg-[#4CAF50] px-4 py-2 rounded-full"
        >
          <Text className="text-white font-medium">Host & Earn</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
