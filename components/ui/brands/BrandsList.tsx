import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { IBrand } from "~/types";

interface BrandsListProps {
  brands: IBrand[];
  onBrandPress?: (brand: IBrand) => void;
}

export default function BrandsList({ brands, onBrandPress }: BrandsListProps) {
  return (
    <View className="mb-6">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-xl">Top Brands</Text>
        <TouchableOpacity>
          <Text className="text-gray-500">View All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="space-x-4"
      >
        {brands.map((brand) => (
          <TouchableOpacity
            key={brand.id}
            onPress={() => onBrandPress?.(brand)}
            className="items-center"
          >
            <View className="w-20 h-20 bg-gray-100 rounded-full items-center justify-center mb-2">
              <Image
                source={{ uri: brand.logo }}
                className="w-12 h-12"
                resizeMode="contain"
              />
            </View>
            <Text className="text-sm font-medium">{brand.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
