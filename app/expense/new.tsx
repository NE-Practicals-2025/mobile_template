import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import useExpenses from '../../hooks/useExpenses';
import { Ionicons } from '@expo/vector-icons';
import { fonts } from '../../styles';
import Toast from 'react-native-toast-message';

export default function NewExpenseScreen() {
  const { createExpense } = useExpenses();
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!amount || !name || !description) {
      // Show toast here
      return;
    }

    const amountNumber = parseFloat(amount);
    if (isNaN(amountNumber) || amountNumber <= 0) {
      // Show toast here
      return;
    }

    setIsLoading(true);
    try {
      await createExpense({
        name,
        amount: amountNumber.toString(),
        description,
      });
      // Show success toast here
      Toast.show({
        
      })
      router.back();
    } catch (error) {
      //toast
      
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-6 pt-12 pb-4 shadow-sm">
        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={() => router.back()}
            className="mr-4"
          >
            <Ionicons name="arrow-back" size={24} color="#374151" />
          </TouchableOpacity>
          <Text style={fonts.textBold} className="text-xl text-gray-800">New Expense</Text>
        </View>
      </View>

      <ScrollView className="flex-1">
        <View className="p-4">
          {/* Form Card */}
          <View className="bg-white rounded-2xl shadow-sm p-6">
            <View className="space-y-6">
              {/* Name Input */}
              <View>
                <Text style={fonts.textMedium} className="text-gray-700 mb-2">Name</Text>
                <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-xl px-4">
                  <Ionicons name="pricetag-outline" size={20} color="#6B7280" />
                  <TextInput
                    className="flex-1 p-4 text-gray-800"
                    placeholder="Enter expense name"
                    value={name}
                    onChangeText={setName}
                    style={fonts.text}
                  />
                </View>
              </View>

              {/* Amount Input */}
              <View>
                <Text style={fonts.textMedium} className="text-gray-700 mb-2">Amount</Text>
                <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-xl px-4">
                  <Ionicons name="cash-outline" size={20} color="#6B7280" />
                  <TextInput
                    className="flex-1 p-4 text-gray-800"
                    placeholder="Enter amount"
                    value={amount}
                    onChangeText={setAmount}
                    keyboardType="decimal-pad"
                    style={fonts.text}
                  />
                </View>
              </View>

              {/* Description Input */}
              <View>
                <Text style={fonts.textMedium} className="text-gray-700 mb-2">Description</Text>
                <View className="flex-row items-start bg-gray-50 border border-gray-200 rounded-xl px-4">
                  <Ionicons name="document-text-outline" size={20} color="#6B7280" className="mt-4" />
                  <TextInput
                    className="flex-1 p-4 text-gray-800"
                    placeholder="Enter description"
                    value={description}
                    onChangeText={setDescription}
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                    style={[fonts.text, { height: 100 }]}
                  />
                </View>
              </View>
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            className="bg-blue-500 rounded-2xl p-4 mt-6 flex-row items-center justify-center"
            onPress={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <View className="flex-row items-center">
                <Ionicons name="sync" size={20} color="white" className="animate-spin" />
                <Text style={fonts.textSemiBold} className="text-white text-lg ml-2">
                  Creating...
                </Text>
              </View>
            ) : (
              <View className="flex-row items-center">
                <Ionicons name="add-circle-outline" size={24} color="white" />
                <Text style={fonts.textSemiBold} className="text-white text-lg ml-2">
                  Create Expense
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
} 