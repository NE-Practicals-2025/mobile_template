import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";

import CarCard from "~/components/ui/cards/CarCard";
import HomeHeader from "~/components/ui/headers/HomeHeader";
import SearchBar from "~/components/ui/search/SearchBar";
import SectionHeader from "~/components/ui/sections/SectionHeader";
import useCars from "~/hooks/useCars";
import { ICar } from "~/types";

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const { cars, loading } = useCars();
  // Handlers
  const handleLocationPress = () => {
    // Handle location press
  };

  const handleHostPress = () => {
    // Handle host press
  };

  const handleCarPress = (car: ICar) => {
    router.push(`/(cars)/${car.id}`);
  };

  const handleFavoritePress = (car: ICar) => {
    // Toggle favorite status
    console.log("Toggle favorite for car:", car.id);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-4 pt-4">
          {/* Header Section */}
          <HomeHeader
            points={200}
            onLocationPress={handleLocationPress}
            onHostPress={handleHostPress}
          />

          {/* Search Section */}
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFilterPress={() => console.log("Filter pressed")}
          />

          {/* Top Rated Cars Section */}
          <View className="mb-6">
            <SectionHeader
              title="Top Rated Cars"
              onViewAllPress={() => router.push("/cars")}
            />
            {loading ? (
              <ActivityIndicator />
            ) : (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="space-x-4"
              >
                {cars?.slice(0, 3).map((car) => (
                  <View key={car.id} className="w-72">
                    <CarCard
                      car={car}
                      onPress={handleCarPress}
                      onFavoritePress={handleFavoritePress}
                    />
                  </View>
                ))}
              </ScrollView>
            )}
          </View>

          {/* Most Popular Cars Section */}
          <View className="mb-6">
            <SectionHeader
              title="Most Popular Cars"
              onViewAllPress={() => router.push("/cars")}
            />
            {loading ? (
              <ActivityIndicator />
            ) : (
              cars
                ?.reverse()
                ?.slice(0, 3)
                ?.map((car) => (
                  <CarCard
                    key={car.id}
                    car={car}
                    onPress={handleCarPress}
                    onFavoritePress={handleFavoritePress}
                  />
                ))
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
