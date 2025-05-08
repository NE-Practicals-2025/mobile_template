import { FontAwesome } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { Stack } from "expo-router";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import FormInput from "~/components/ui/elements/Input";
import { fonts } from "~/styles";

export default function CreateEvent() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    date: new Date(),
    image: "",
    maxAttendees: "",
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled) {
      setFormData({ ...formData, image: result.assets[0].uri });
    }
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setFormData({ ...formData, date: selectedDate });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Stack.Screen
        options={{
          title: "Create Event",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "white" },
        }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
        >
          {/* Image Upload Section */}
          <TouchableOpacity onPress={pickImage} className="mb-6">
            <View
              className={`w-full h-48 rounded-xl bg-gray-100 items-center justify-center ${
                formData.image
                  ? "border-0"
                  : "border-2 border-dashed border-gray-300"
              }`}
            >
              {formData.image ? (
                <Image
                  source={{ uri: formData.image }}
                  className="w-full h-full rounded-xl"
                  resizeMode="cover"
                />
              ) : (
                <View className="items-center">
                  <FontAwesome name="camera" size={32} color="#9CA3AF" />
                  <Text
                    style={fonts.textMedium}
                    className="text-gray-500 mt-2 text-base"
                  >
                    Add Event Cover Image
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>

          {/* Form Fields */}
          <View className="flex flex-col gap-3">
            <FormInput
              placeholder="Event Title"
              value={formData.title}
              onChangeText={(text) => setFormData({ ...formData, title: text })}
            />

            {/* Description Input */}
            <View className="bg-gray-50 rounded-xl border border-gray-200">
              <TextInput
                placeholder="Description"
                value={formData.description}
                onChangeText={(text) =>
                  setFormData({ ...formData, description: text })
                }
                multiline
                numberOfLines={4}
                style={[fonts.text, styles.textArea]}
                className="p-4 border border-[#807A7A] rounded-lg"
                placeholderTextColor="#1D1D1DA8"
              />
            </View>

            <FormInput
              placeholder="Location"
              value={formData.location}
              onChangeText={(text) =>
                setFormData({ ...formData, location: text })
              }
            />

            {/* Date Picker */}
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              className="bg-gray-50 rounded-xl p-4 border border-[#807A7A]"
            >
              <Text style={fonts.textMedium} className="text-gray-600 mb-1">
                Date & Time
              </Text>
              <Text style={fonts.text} className="text-gray-900">
                {formData.date.toLocaleString()}
              </Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={formData.date}
                mode="datetime"
                display="inline"
                onChange={handleDateChange}
              />
            )}

            <FormInput
              placeholder="Maximum Attendees"
              value={formData.maxAttendees}
              onChangeText={(text) =>
                setFormData({ ...formData, maxAttendees: text })
              }
              keyboardType="numeric"
            />
          </View>

          {/* Create Button */}
          <TouchableOpacity
            className="bg-primary rounded-xl py-4 px-6 mt-8 mb-6"
            onPress={() => console.log("Create Event:", formData)}
          >
            <Text
              style={fonts.textBold}
              className="text-white text-center text-lg"
            >
              Create Event
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
});
