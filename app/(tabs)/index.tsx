import { useRouter } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { UserIcon } from "~/components/core/icons";
import EventCard from "~/components/ui/cards/Event";
import { events } from "~/data";
import { fonts } from "~/styles";

export default function Home() {
  const [layout] = useState<"grid" | "list">("grid");
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1">
      <View style={styles.container}>
        <View className="flex-row justify-between items-center my-10">
          <Text style={fonts.textBold} className="text-xl">
            Upcoming Events
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/modal")}
            className="flex-row items-center gap-2"
          >
            <UserIcon color="#3D56F0" height={45} width={45} />
          </TouchableOpacity>
        </View>
        {/* Events List */}
        <FlatList
          data={events}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          numColumns={layout === "grid" ? 2 : 1}
          key={layout} // Force re-render when layout changes
          columnWrapperStyle={
            layout === "grid" ? { justifyContent: "space-between" } : undefined
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
