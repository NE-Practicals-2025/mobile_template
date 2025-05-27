import React, { useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import useExpenses from '../../hooks/useExpenses';
import { fonts } from '../../styles';
import { expenseService } from '~/services/api';

export default function HomeScreen() {
  const { expenses, refetchExpenses } = useExpenses();

  // Fetch expenses every time the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      expenseService.getAllExpenses()
    }, [])
  );

  const totalAmount = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
  const topExpenses = [...expenses]
    .sort((a, b) => parseFloat(b.amount) - parseFloat(a.amount))
    .slice(0, 3);

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-6 pt-12 pb-4 shadow-sm">
        <View className="flex-row justify-between items-center">
          <View>
            <Text style={fonts.textBold} className="text-2xl text-gray-800">Dashboard</Text>
            <Text style={fonts.text} className="text-gray-500">Track your finances</Text>
          </View>
          <TouchableOpacity
            onPress={refetchExpenses}
            className="bg-gray-50 p-2 rounded-xl"
          >
            <Ionicons name="refresh" size={24} color="#374151" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1">
        {/* Stats Cards */}
        <View className="px-4 pt-4">
          <View className="flex-row space-x-4">
            {/* Total Expenses Card */}
            <View className="flex-1 bg-white rounded-2xl p-4 shadow-sm">
              <View className="bg-blue-50 w-12 h-12 rounded-xl items-center justify-center mb-3">
                <Ionicons name="wallet-outline" size={24} color="#3B82F6" />
              </View>
              <Text style={fonts.textMedium} className="text-gray-500 text-sm">Total Expenses</Text>
              <Text style={fonts.textBold} className="text-2xl text-gray-800 mt-1">
                {expenses.length}
              </Text>
            </View>

            {/* Total Amount Card */}
            <View className="flex-1 bg-white rounded-2xl p-4 shadow-sm">
              <View className="bg-green-50 w-12 h-12 rounded-xl items-center justify-center mb-3">
                <Ionicons name="cash-outline" size={24} color="#10B981" />
              </View>
              <Text style={fonts.textMedium} className="text-gray-500 text-sm">Total Amount</Text>
              <Text style={fonts.textBold} className="text-2xl text-gray-800 mt-1">
                ${totalAmount.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        {/* Top Expenses Section */}
        <View className="px-4 pt-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text style={fonts.textBold} className="text-xl text-gray-800">Top Expenses</Text>
            <TouchableOpacity
              onPress={() => router.push('/(tabs)/expenses')}
              className="flex-row items-center"
            >
              <Text style={fonts.textMedium} className="text-blue-500 mr-1">View All</Text>
              <Ionicons name="arrow-forward" size={16} color="#3B82F6" />
            </TouchableOpacity>
          </View>

          {topExpenses.length === 0 ? (
            <View className="bg-white rounded-2xl p-6 items-center">
              <Ionicons name="wallet-outline" size={48} color="#9CA3AF" />
              <Text style={fonts.textMedium} className="text-gray-500 mt-4 text-center">
                No expenses yet. Add your first expense!
              </Text>
            </View>
          ) : (
            <View className="space-y-3">
              {topExpenses.map((expense) => (
                <TouchableOpacity
                  key={expense.id}
                  className="bg-white rounded-2xl p-4 shadow-sm"
                  onPress={() => router.push(`/expense/${expense.id}`)}
                >
                  <View className="flex-row justify-between items-center">
                    <View className="flex-1">
                      <Text style={fonts.textSemiBold} className="text-gray-800 text-lg">
                        {expense.name}
                      </Text>
                      <Text style={fonts.text} className="text-gray-500">
                        {expense.description}
                      </Text>
                    </View>
                    <Text style={fonts.textBold} className="text-blue-500 text-lg">
                      ${parseFloat(expense.amount).toFixed(2)}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Quick Actions */}
        <View className="px-4 pt-6 pb-8">
          <Text style={fonts.textBold} className="text-xl text-gray-800 mb-4">Quick Actions</Text>
          <TouchableOpacity
            className="bg-blue-500 rounded-2xl p-4 flex-row items-center justify-center"
            onPress={() => router.push('/expense/new')}
          >
            <Ionicons name="add-circle-outline" size={24} color="white" />
            <Text style={fonts.textSemiBold} className="text-white text-lg ml-2">
              Add New Expense
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
