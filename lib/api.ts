import axios from "axios";
import * as SecureStore from "expo-secure-store";
// const BASE_URL = "http://10.12.75.25:3000/api/v2";
const BASE_URL = "http://localhost:4000/api/v1";
export const UnAuthorizedApi = axios.create({
  baseURL: process.env.REACT_NATIVE_BACKEND_URL ?? BASE_URL,
  // "https://stagingapis.aguura.com/api/v2",
});

export const AuthorizedApi = axios.create({
  baseURL: process.env.REACT_NATIVE_BACKEND_URL ?? BASE_URL,
});

AuthorizedApi.interceptors.request.use(
  async (config) => {
    const stored = await SecureStore.getItemAsync("accessToken");
    const token = (stored as any)?.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => Promise.reject(error),
);
