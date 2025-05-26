import axios from "axios";
import * as SecureStore from "expo-secure-store";

import { getUsers } from "./index.service";
import { UsersApi } from "~/lib/api";
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
  private email: string | null = null;

  private constructor() {}

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(data: LoginData): Promise<AuthResponse> {
    try {
      const users = await getUsers();
      console.log("users", users);
      const user = users.data.find((user: any) => user.email === data.email);
      if (!user) {
        throw new Error("User not found");
      }
      await SecureStore.setItemAsync("user", JSON.stringify(user));
      await SecureStore.setItemAsync("token", JSON.stringify(user.email));
      return user;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await UsersApi.post(`/`, data);
      console.log("response", response?.data);
      // await this.setToken(response.data.token);
      return response?.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async logout(): Promise<void> {
    await SecureStore.deleteItemAsync("user");
    await SecureStore.deleteItemAsync("token");
    this.email = null;
  }

  async isAuthenticated(): Promise<boolean> {
    const token = await this.getEmail();
    return !!token;
  }

  async getEmail(): Promise<string | null> {
    if (this.email) return this.email;

    const token = await SecureStore.getItemAsync("token");
    if (token) this.email = token;
    return token;
  }

  private async setToken(token: string): Promise<void> {
    await SecureStore.setItemAsync("token", token);
    this.email = token;
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
