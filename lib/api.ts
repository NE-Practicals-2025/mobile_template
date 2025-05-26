import axios from "axios";
export const CarsApi = axios.create({
  baseURL: "https://683466dd464b49963602a953.mockapi.io/api/v1/cars",
});
export const BookingsApi = axios.create({
  baseURL: "https://683466dd464b49963602a953.mockapi.io/api/v1/bookings",
});

export const UsersApi = axios.create({
  baseURL: "https://683468ee464b49963602b515.mockapi.io/api/v1/users",
});
