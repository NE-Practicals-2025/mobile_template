import { Ionicons } from "@expo/vector-icons";
import { View, Text, Image, TouchableOpacity } from "react-native";

import { ICar } from "~/types";

interface CarCardProps {
  car: ICar;
  onPress?: (car: ICar) => void;
  onFavoritePress?: (car: ICar) => void;
  isFavorite?: boolean;
}

export default function CarCard({
  car,
  onPress,
  onFavoritePress,
  isFavorite = false,
}: CarCardProps) {
  return (
    <TouchableOpacity
      onPress={() => onPress?.(car)}
      className="bg-white rounded-2xl shadow-sm mb-4 mx-2 overflow-hidden"
    >
      <View className="relative">
        <Image
          source={{ uri: car.photo }}
          className="w-full h-48"
          resizeMode="cover"
        />
        <TouchableOpacity
          onPress={() => onFavoritePress?.(car)}
          className="absolute top-2 right-2 bg-white p-2 rounded-full"
        >
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={20}
            color={isFavorite ? "#FF4B4B" : "#666"}
          />
        </TouchableOpacity>
      </View>

      <View className="p-4">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-lg">{car.model}</Text>
          <View className="flex-row items-center">
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text className="ml-1 font-medium">5.00</Text>
          </View>
        </View>

        <Text className="text-gray-500 mb-3">
          Available from {new Date(car.availableFrom).toLocaleDateString()}
        </Text>

        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center">
            <Ionicons name="people-outline" size={16} color="#666" />
            <Text className="ml-1">
              {Math.floor(Math.random() * 10) + 1} Seats
            </Text>
          </View>
          <Text className="">${car.price}/hour</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
