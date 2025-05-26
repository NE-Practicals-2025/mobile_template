import { useState } from "react";
import { View, ActivityIndicator, FlatList, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import SearchBar from "~/components/ui/search/SearchBar";
import CarCard from "~/components/ui/cards/CarCard";
import useCars from "~/hooks/useCars";
import { ICar } from "~/types";

export default function CarsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const { cars, loading } = useCars();

  const handleCarPress = (car: ICar) => {
    router.push(`/(cars)/${car.id}`);
  };

  const handleFavoritePress = (car: ICar) => {
    // Toggle favorite status
    console.log("Toggle favorite for car:", car.id);
  };

  const filteredCars = cars?.filter(
    (car) =>
      car?.model?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      car?.brand?.toLowerCase()?.includes(searchQuery?.toLowerCase()),
  );

  const renderHeader = () => (
    <View className="p-4 bg-white">
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        onFilterPress={() => console.log("Filter pressed")}
        placeholder="Search by brand or model..."
      />
    </View>
  );

  const renderItem = ({ item }: { item: ICar }) => (
    <CarCard
      car={item}
      onPress={handleCarPress}
      onFavoritePress={handleFavoritePress}
    />
  );

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={filteredCars}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
