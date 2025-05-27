import { useState, useEffect, useCallback } from 'react';
import { expenseService } from '../services/api';
import { Expense, CreateExpenseData } from '../types';
import Toast from 'react-native-toast-message';
import { AxiosError } from 'axios';

const useExpenses = (searchQuery?: string) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetchExpenses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await expenseService.getAllExpenses(searchQuery);
      setExpenses(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch expenses');
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  // Fetch expenses when search query changes
  useEffect(() => {
    refetchExpenses();
  }, [searchQuery, refetchExpenses]);

  // Create new expense
  const createExpense = async (expenseData: CreateExpenseData): Promise<Expense> => {
    setLoading(true);
    setError(null);
    try {
      const newExpense = await expenseService.createExpense(expenseData);
      setExpenses(prev => [...prev, newExpense]);
      return newExpense;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create expense');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete expense
  const deleteExpense = async (id: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await expenseService.deleteExpense(id);
      setExpenses(prev => prev.filter(expense => expense.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete expense');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Get single expense
  const getExpense = async (id: string): Promise<Expense> => {
    setLoading(true);
    setError(null);
    try {
      const expense = await expenseService.getExpense(id);
      // Update the expense in the list if it exists
      setExpenses(prev => 
        prev.map(exp => exp.id === id ? expense : exp)
      );
      return expense;
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Failed to fetch expense details',
        text2: (err as Error).message
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    expenses,
    loading,
    error,
    createExpense,
    deleteExpense,
    getExpense,
    refetchExpenses,
  };
};

export default useExpenses; 