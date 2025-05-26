import axios from "axios";
import { useState, useEffect } from "react";
import { CarsApi } from "~/lib/api";
import { getCars } from "~/services/index.service";
import { ICar } from "~/types";

const useCars = () => {
  const [cars, setCars] = useState<ICar[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await getCars();
        setCars(response.data);
      } catch {
        setError("Failed to fetch cars");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const createCar = async (car: Omit<ICar, "id">) => {
    try {
      const response = await CarsApi.post("/", car);
      setCars((prev) => [response.data, ...prev]);
    } catch {
      setError("Failed to create post");
    }
  };

  const deleteCar = async (id: string) => {
    try {
      await CarsApi.delete(`/${id}`);
      setCars((prev) => prev.filter((car) => car.id !== id));
    } catch {
      setError("Failed to delete car");
    }
  };

  return { cars, loading, error, createCar, deleteCar };
};

export default useCars;
