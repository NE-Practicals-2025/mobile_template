import { View, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onFilterPress?: () => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChangeText,
  onFilterPress,
  placeholder = "Search any car...",
}: SearchBarProps) {
  return (
    <View className="flex-row items-center bg-gray-100 rounded-xl p-3 mb-6">
      <Ionicons name="search" size={20} color="#666" />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        className="flex-1 ml-2 text-base"
        placeholderTextColor="#666"
      />
      <TouchableOpacity onPress={onFilterPress}>
        <Ionicons name="options-outline" size={20} color="#666" />
      </TouchableOpacity>
    </View>
  );
}
