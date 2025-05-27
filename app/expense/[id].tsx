import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Expense } from '../../types';
import useExpenses from '../../hooks/useExpenses';
import { Ionicons } from '@expo/vector-icons';
import { fonts } from '../../styles';

export default function ExpenseDetailScreen() {
  const { id } = useLocalSearchParams();
  const { getExpense, deleteExpense } = useExpenses();
  const [expense, setExpense] = useState<Expense | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadExpense = async () => {
    try {
      const data = await getExpense(id as string);
      setExpense(data);
    } catch (error) {
      // Show error toast here
      router.back();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadExpense();
  }, [id]);

  const handleDeleteExpense = async () => {
    try {
      await deleteExpense(id as string);
      router.back();
    } catch (error) {
      // Show error toast here
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  if (!expense) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <View className="items-center">
          <Ionicons name="alert-circle-outline" size={48} color="#9CA3AF" />
          <Text style={fonts.textMedium} className="text-gray-500 mt-4">Expense not found</Text>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-6 pt-12 pb-4 shadow-sm">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <TouchableOpacity
              onPress={() => router.back()}
              className="mr-4"
            >
              <Ionicons name="arrow-back" size={24} color="#374151" />
            </TouchableOpacity>
            <Text style={fonts.textBold} className="text-xl text-gray-800">Expense Details</Text>
          </View>
          <TouchableOpacity
            onPress={loadExpense}
            className="bg-gray-50 p-2 rounded-xl"
          >
            <Ionicons name="refresh" size={24} color="#374151" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1">
        {/* Amount Card */}
        <View className="bg-white mx-4 mt-4 rounded-2xl shadow-sm overflow-hidden">
          <View className="bg-blue-500 h-32 items-center justify-center">
            <Text style={fonts.textBold} className="text-white text-4xl mb-2">
              ${parseFloat(expense.amount).toFixed(2)}
            </Text>
            <Text style={fonts.textMedium} className="text-white/80 text-lg">{expense.name}</Text>
          </View>
        </View>

        {/* Details Card */}
        <View className="bg-white mx-4 mt-4 rounded-2xl shadow-sm p-6">
          <View className="space-y-6">
            <View>
              <Text style={fonts.textMedium} className="text-gray-500 text-sm mb-1">Description</Text>
              <Text style={fonts.text} className="text-gray-800 text-lg">{expense.description}</Text>
            </View>

            <View className="flex-row items-center">
              <View className="flex-1">
                <Text style={fonts.textMedium} className="text-gray-500 text-sm mb-1">Created At</Text>
                <Text style={fonts.text} className="text-gray-800 text-lg">
                  {new Date(expense.createdAt).toLocaleDateString()}
                </Text>
              </View>
              <View className="flex-1">
                <Text style={fonts.textMedium} className="text-gray-500 text-sm mb-1">Time</Text>
                <Text style={fonts.text} className="text-gray-800 text-lg">
                  {new Date(expense.createdAt).toLocaleTimeString()}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Actions Card */}
        <View className="bg-white mx-4 mt-4 mb-6 rounded-2xl shadow-sm p-6">
          <TouchableOpacity
            className="flex-row items-center justify-center bg-red-50 p-4 rounded-xl"
            onPress={handleDeleteExpense}
          >
            <Ionicons name="trash-outline" size={20} color="#EF4444" />
            <Text style={fonts.textSemiBold} className="text-red-500 ml-2">Delete Expense</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
} 