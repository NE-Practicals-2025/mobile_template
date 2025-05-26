import axios from "axios";
import { useState, useEffect } from "react";

import { BookingsApi, CarsApi } from "~/lib/api";
import { getBookings, getCars } from "~/services/index.service";
import { IBooking, ICar } from "~/types";

const useBookings = () => {
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await getBookings();
        setBookings(response.data);
      } catch {
        setError("Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const createBooking = async (booking: Omit<IBooking, "id" & "createdAt">) => {
    try {
      const response = await BookingsApi.post("/", booking);
      setBookings((prev) => [response.data, ...prev]);
    } catch {
      setError("Failed to create booking");
    }
  };

  const deleteBooking = async (id: string) => {
    try {
      await BookingsApi.delete(`/${id}`);
      setBookings((prev) => prev.filter((booking) => booking.id !== id));
    } catch {
      setError("Failed to delete booking");
    }
  };

  return { bookings, loading, error, createBooking, deleteBooking };
};

export default useBookings;
