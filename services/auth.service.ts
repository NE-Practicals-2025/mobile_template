import axios from "axios";
import * as SecureStore from "expo-secure-store";

import { UnAuthorizedApi } from "~/lib/api";

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    username: string;
  };
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData extends LoginData {
  username: string;
}

class AuthService {
  private static instance: AuthService;
  private token: string | null = null;

  private constructor() {}

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(data: LoginData): Promise<AuthResponse> {
    try {
      const response = await UnAuthorizedApi.post(`/auth/login`, data);
      await this.setToken(response.data.token);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await UnAuthorizedApi.post(`/auth/register`, data);
      await this.setToken(response.data.token);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async logout(): Promise<void> {
    await SecureStore.deleteItemAsync("accessToken");
    this.token = null;
  }

  async isAuthenticated(): Promise<boolean> {
    const token = await this.getToken();
    return !!token;
  }

  async getToken(): Promise<string | null> {
    if (this.token) return this.token;

    const token = await SecureStore.getItemAsync("accessToken");
    if (token) this.token = token;
    return token;
  }

  private async setToken(token: string): Promise<void> {
    await SecureStore.setItemAsync("accessToken", token);
    this.token = token;
  }

  private handleError(error: any): Error {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "An error occurred";
      return new Error(message);
    }
    return error;
  }
}

export default AuthService.getInstance();
