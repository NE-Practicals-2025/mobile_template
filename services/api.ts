import axios, { AxiosError } from 'axios';
import { User, Expense, LoginCredentials, CreateExpenseData } from '../types';
import { useAuth } from '~/contexts/auth.context';

const API_BASE_URL = 'https://67ac71475853dfff53dab929.mockapi.io/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authService = {
  login: async (credentials: LoginCredentials): Promise<User> => {
    try {
      const response = await api.get(`/users?username=${credentials.username}`);
      const users = response.data;
      console.log(users);
      
      if (!users || users.length === 0) {
        throw new Error('User not found');
      }

      const user = users[0];
      if (user.password !== credentials.password) {
        throw new Error('Invalid password');
      }

      return user;
    } catch (error) {
      if(error instanceof AxiosError) {
        if(error.response?.status === 404) {
          throw new Error('User not found');
        }
      }
      throw error;
    }
  },
};

export const expenseService = {
  createExpense: async (expenseData: CreateExpenseData): Promise<Expense> => {
    try {
      const response = await api.post('/expenses', expenseData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getExpense: async (expenseId: string): Promise<Expense> => {
    try {
      const response = await api.get(`/expenses/${expenseId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAllExpenses: async (): Promise<Expense[]> => {
    try {
      const response = await api.get('/expenses');
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteExpense: async (expenseId: string): Promise<void> => {
    try {
      await api.delete(`/expenses/${expenseId}`);
    } catch (error) {
      throw error;
    }
  },
}; 