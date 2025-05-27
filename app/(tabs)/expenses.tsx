import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { RelativePathString, router } from 'expo-router';
import { Expense } from '../../types';
import useExpenses from '../../hooks/useExpenses';
import { Ionicons } from '@expo/vector-icons';
import { fonts } from '../../styles';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

export default function ExpensesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const { expenses, loading, error, deleteExpense, refetchExpenses } = useExpenses(searchQuery);

  const handleDeleteExpense = async (expenseId: string) => {
    try {
      await deleteExpense(expenseId);
      // Show success toast
      Toast.show({
        text1: 'Expense deleted successfully',
        type: 'success',
      });
    } catch (error) {
      // Show error toast
      Toast.show({
        text1: 'Failed to delete expense',
        type: 'error',
      });
    }
  };

  const renderExpenseItem = ({ item }: { item: Expense }) => (
    <TouchableOpacity
      className="bg-white rounded-2xl mb-4 shadow-sm overflow-hidden"
      onPress={() => router.push(`/expense/${item.id}` as RelativePathString)}
    >
      <View className="p-4">
        <View className="flex-row justify-between items-start">
          <View className="flex-1">
            <Text style={fonts.textSemiBold} className="text-xl text-gray-800 mb-1">{item.name}</Text>
            <Text style={fonts.text} className="text-gray-600 mb-2">{item.description}</Text>
            <Text style={fonts.text} className="text-gray-500 text-sm">
              {new Date(item.createdAt).toLocaleDateString()}
            </Text>
          </View>
          <View className="items-end">
            <Text style={fonts.textBold} className="text-xl text-blue-500 mb-2">
              ${parseFloat(item.amount).toFixed(2)}
            </Text>
            <TouchableOpacity
              onPress={() => handleDeleteExpense(item.id)}
              className="bg-red-50 p-2 rounded-lg"
            >
              <Ionicons name="trash-outline" size={20} color="#EF4444" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (error) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text style={fonts.text} className="text-red-500">{error}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-6 pt-12 pb-4 shadow-sm">
        <View className="flex-row justify-between items-center mb-4">
          <View>
            <Text style={fonts.textBold} className="text-2xl text-gray-800">Expenses</Text>
            <Text style={fonts.text} className="text-gray-500">Track your spending</Text>
          </View>
          <View className="flex-row space-x-2">
            <TouchableOpacity
              onPress={refetchExpenses}
              className="bg-gray-50 p-2 rounded-xl"
            >
              <Ionicons name="refresh" size={24} color="#374151" />
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-blue-500 w-12 h-12 rounded-full items-center justify-center shadow-lg"
              onPress={() => router.push('/expense/new')}
            >
              <Ionicons name="add" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-2 mb-2">
          <Ionicons name="search" size={20} color="#9CA3AF" />
          <TextInput
            className="flex-1 ml-2 text-gray-800"
            placeholder="Search expenses..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={fonts.text}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      {/* Content */}
      <View className="flex-1 px-4 pt-4">
        {loading ? (
          <View className="flex-1 items-center justify-center">
            <Text style={fonts.text} className="text-gray-500">Loading expenses...</Text>
          </View>
        ) : expenses.length === 0 ? (
          <View className="flex-1 items-center justify-center">
            <View className="bg-white p-6 rounded-2xl shadow-sm items-center">
              <Ionicons 
                name={searchQuery ? "search-outline" : "wallet-outline"} 
                size={48} 
                color="#9CA3AF" 
              />
              <Text style={fonts.textMedium} className="text-gray-500 mt-4 text-center">
                {searchQuery 
                  ? "No expenses found matching your search"
                  : "No expenses yet. Add your first expense!"}
              </Text>
            </View>
          </View>
        ) : (
          <FlatList
            data={expenses}
            renderItem={renderExpenseItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </View>
    </View>
  );
} 