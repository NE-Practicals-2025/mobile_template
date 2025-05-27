import { View, Text, TouchableOpacity } from "react-native";

interface SectionHeaderProps {
  title: string;
  onViewAllPress?: () => void;
}

export default function SectionHeader({
  title,
  onViewAllPress,
}: SectionHeaderProps) {
  return (
    <View className="flex-row justify-between items-center mb-4">
      <Text className="text-xl">{title}</Text>
      <TouchableOpacity onPress={onViewAllPress}>
        <Text className="text-gray-500">View All</Text>
      </TouchableOpacity>
    </View>
  );
}
