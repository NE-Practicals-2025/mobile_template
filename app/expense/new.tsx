import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { fonts } from '~/styles';
import useExpenses from '../../hooks/useExpenses';
import useValidate, { ValidationRules } from '~/hooks/useValidate';
import Toast from 'react-native-toast-message';

export default function NewExpenseScreen() {
  const { createExpense } = useExpenses();
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({ name: '', amount: '', description: '' });
  const { validate } = useValidate();

  const validationSchema: ValidationRules = {
    name: {
      type: "string",
      required: true,
      message: "Name is required"
    },
    amount: {
      type: "string",
      required: true,
      pattern: /^\d+(\.\d{1,2})?$/,
      message: "Please enter a valid amount (e.g. 10.50)"
    },
    description: {
      type: "string",
      required: true,
      minLength: 3,
      message: "Description must be at least 3 characters"
    }
  };

  const validateField = (name: string, value: string) => {
    const fieldSchema = { [name]: validationSchema[name] };
    const fieldData = { [name]: value };
    const { errors } = validate(fieldData, fieldSchema);
    setErrors(prev => ({
      ...prev,
      [name]: errors[name] || ""
    }));
  };

  const handleSubmit = async () => {
    const { isValid, errors } = validate({ name, amount, description }, validationSchema);
    setErrors({
      name: errors.name || '',
      amount: errors.amount || '',
      description: errors.description || ''
    });

    if (!isValid) {
      return;
    }

    try {
      await createExpense({
        name,
        amount: parseFloat(amount).toString(),
        description
      });
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Expense created successfully'
      });
      router.back();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error instanceof Error ? error.message : 'Failed to create expense'
      });
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
                    onChangeText={(text) => {
                      setName(text);
                      validateField('name', text);
                    }}
                    style={fonts.text}
                  />
                </View>
                {errors.name ? (
                  <Text style={fonts.text} className="text-red-500 text-sm mt-1">{errors.name}</Text>
                ) : null}
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
                    onChangeText={(text) => {
                      setAmount(text);
                      validateField('amount', text);
                    }}
                    keyboardType="decimal-pad"
                    style={fonts.text}
                  />
                </View>
                {errors.amount ? (
                  <Text style={fonts.text} className="text-red-500 text-sm mt-1">{errors.amount}</Text>
                ) : null}
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
                    onChangeText={(text) => {
                      setDescription(text);
                      validateField('description', text);
                    }}
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                    style={[fonts.text, { height: 100 }]}
                  />
                </View>
                {errors.description ? (
                  <Text style={fonts.text} className="text-red-500 text-sm mt-1">{errors.description}</Text>
                ) : null}
              </View>
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            className="bg-blue-500 p-4 rounded-xl mt-6"
            onPress={handleSubmit}
          >
            <Text style={fonts.textSemiBold} className="text-white text-center font-semibold text-lg">
              Create Expense
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
} 