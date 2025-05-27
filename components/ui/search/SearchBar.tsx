import { View, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import useValidate, { ValidationRules } from "~/hooks/useValidate";
import { fonts } from "~/styles";

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
  const [error, setError] = useState('');
  const { validate } = useValidate();

  const validationSchema: ValidationRules = {
    search: {
      type: "string",
      maxLength: 50,
      message: "Search query is too long"
    }
  };

  const handleSearchChange = (text: string) => {
    const { errors } = validate({ search: text }, validationSchema);
    setError(errors.search || '');
    onChangeText(text);
  };

  return (
    <View className="flex-row items-center bg-gray-100 rounded-xl p-3 mb-6">
      <Ionicons name="search" size={20} color="#666" />
      <TextInput
        value={value}
        onChangeText={handleSearchChange}
        placeholder={placeholder}
        className="flex-1 ml-2 text-base"
        placeholderTextColor="#666"
      />
      <TouchableOpacity onPress={onFilterPress}>
        <Ionicons name="options-outline" size={20} color="#666" />
      </TouchableOpacity>
      {error ? (
        <Text style={fonts.text} className="text-red-500 text-sm mt-1">{error}</Text>
      ) : null}
    </View>
  );
}
