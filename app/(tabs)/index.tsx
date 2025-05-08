import { Stack } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import EventCard from "~/components/ui/cards/Event";
import { events } from "~/data";
import { fonts } from "~/styles";

export default function Home() {
  const [layout, setLayout] = useState<"grid" | "list">("grid");

  return (
    <>
      {/* <Stack.Screen options={{ title: "Events" }} /> */}
      <SafeAreaView className="flex-1">
        <View style={styles.container}>
          {/* Layout Toggle */}
          <View className="flex-row justify-between items-center mb-4">
            <Text style={fonts.textBold} className="text-xl">
              Upcoming Events
            </Text>
            <View className="flex-row bg-gray-100 rounded-lg p-1">
              <TouchableOpacity
                onPress={() => setLayout("grid")}
                className={`px-4 py-2 rounded-md ${
                  layout === "grid" ? "bg-white shadow-sm" : ""
                }`}
              >
                <Text
                  style={fonts.textMedium}
                  className={
                    layout === "grid" ? "text-primary" : "text-gray-600"
                  }
                >
                  Grid
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setLayout("list")}
                className={`px-4 py-2 rounded-md ${
                  layout === "list" ? "bg-white shadow-sm" : ""
                }`}
              >
                <Text
                  style={fonts.textMedium}
                  className={
                    layout === "list" ? "text-primary" : "text-gray-600"
                  }
                >
                  List
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Events List */}
          <FlatList
            data={events}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            numColumns={layout === "grid" ? 2 : 1}
            key={layout} // Force re-render when layout changes
            columnWrapperStyle={
              layout === "grid"
                ? { justifyContent: "space-between" }
                : undefined
            }
            renderItem={({ item }) => (
              <EventCard
                layout={layout}
                event={item}
                onPress={() => console.log("Event pressed:", item.title)}
              />
            )}
            contentContainerStyle={styles.listContent}
          />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  listContent: {
    paddingBottom: 24,
  },
});
