import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";

import useCars from "~/hooks/useCars";

export default function CarDetails() {
  const { id } = useLocalSearchParams();
  const { cars } = useCars();

  const car = useMemo(() => cars?.find((c) => c.id === id), [cars, id]);

  if (!car) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Car Image */}
      <View className="h-96">
        <Image
          source={{ uri: car.photo }}
          className="w-full h-full"
          resizeMode="cover"
        />
        <View className="w-full absolute top-12">
          <TouchableOpacity
            onPress={() => router.back()}
            className="absolute top-4 left-4 bg-white p-2 rounded-full"
          >
            <Ionicons name="arrow-back" size={24} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity className="absolute top-4 right-4 bg-white p-2 rounded-full">
            <Ionicons name="heart-outline" size={24} color="#666" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Car Details */}
      <View className="p-4">
        <View className="flex-row justify-between items-center mb-4">
          <View>
            <Text className="text-2xl font-bold">{car.model}</Text>
            <Text className="text-gray-500">{car.brand}</Text>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="star" size={20} color="#FFD700" />
            <Text className="ml-1 text-lg font-semibold">5.00</Text>
          </View>
        </View>

        {/* Specifications */}
        <View className="flex-row justify-between mb-6">
          <View className="items-center">
            <View className="bg-gray-100 p-3 rounded-full mb-2">
              <Ionicons name="people-outline" size={24} color="#666" />
            </View>
            <Text className="text-sm">{car.numberOfSeats} Seats</Text>
          </View>
          <View className="items-center">
            <View className="bg-gray-100 p-3 rounded-full mb-2">
              <Ionicons name="speedometer-outline" size={24} color="#666" />
            </View>
            <Text className="text-sm">Automatic</Text>
          </View>
          <View className="items-center">
            <View className="bg-gray-100 p-3 rounded-full mb-2">
              <Ionicons name="flash-outline" size={24} color="#666" />
            </View>
            <Text className="text-sm">Electric</Text>
          </View>
        </View>

        {/* Availability */}
        <View className="mb-6">
          <Text className="text-lg font-bold mb-2">Availability</Text>
          <Text className="text-gray-500">
            Available from {new Date(car.availableFrom).toLocaleDateString()}
          </Text>
        </View>

        {/* Price */}
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-gray-500">Price</Text>
            <Text className="text-2xl font-bold">${car.price}/hour</Text>
          </View>
          <TouchableOpacity className="bg-[#4CAF50] px-6 py-3 rounded-full">
            <Text className="text-white font-bold text-lg">Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
