import axios, { AxiosError } from 'axios';
import { User, Expense, LoginCredentials, CreateExpenseData, RegisterData } from '../types';
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

  register: async (userData: RegisterData): Promise<User> => {
    try {
      // Check if email already exists
      const existingUsers = await api.get(`/users?username=${userData.email}`);
      if (existingUsers.data && existingUsers.data.length > 0) {
        throw new Error('Email already exists');
      }

      // Create new user
      const response = await api.post('/users', {
        username: userData.email,
        password: userData.password,
      });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 409) {
          throw new Error('Email already exists');
        }
      }
      throw error;
    }
  }
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

  getAllExpenses: async (search?: string): Promise<Expense[]> => {
    try {
      const url = search ? `/expenses?name=${encodeURIComponent(search)}` : '/expenses';
      const response = await api.get(url);
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