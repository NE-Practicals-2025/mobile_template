import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { fonts } from "~/styles";

interface EventCardProps {
  layout?: "grid" | "list";
  event: {
    title: string;
    date: string;
    location: string;
    image: string;
    description?: string;
    attendees?: number;
  };
  onPress?: () => void;
}

const EventCard = ({ layout = "grid", event, onPress }: EventCardProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const renderImage = (imageStyle: string) => (
    <View className={`${imageStyle} relative bg-gray-100`}>
      <Image
        source={{ uri: event.image }}
        className="w-full h-full"
        resizeMode="cover"
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
      />
      {isLoading && (
        <View className="absolute inset-0 items-center justify-center bg-gray-100">
          <ActivityIndicator size="small" color="#007AFF" />
        </View>
      )}
    </View>
  );

  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white rounded-xl shadow-sm overflow-hidden mb-4 border border-gray-100"
      style={{ width: "48%" }}
    >
      {renderImage("w-full h-32")}
      <View className="p-2">
        <Text
          style={fonts.textBold}
          className="text-base text-gray-900 mb-1"
          numberOfLines={1}
        >
          {event.title}
        </Text>
        <Text
          style={fonts.textLight}
          className="text-xs text-gray-600 mb-1"
          numberOfLines={1}
        >
          {event.date} • {event.location}
        </Text>
        {event.description && (
          <Text
            style={fonts.text}
            className="text-xs text-gray-700"
            numberOfLines={2}
          >
            {event.description}
          </Text>
        )}
        {event.attendees && (
          <View className="flex-row items-center mt-1">
            <View className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1" />
            <Text style={fonts.textLight} className="text-xs text-gray-600">
              {event.attendees} attending
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default EventCard;
