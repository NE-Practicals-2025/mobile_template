import { BookingsApi, CarsApi, UsersApi } from "~/lib/api";

export function getUsers() {
  return UsersApi.get("/");
}
export function getCars() {
  return CarsApi.get("/");
}
export function getBookings() {
  return BookingsApi.get("/");
}
