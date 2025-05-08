import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";

import { AuthorizedApi, UnAuthorizedApi } from "~/lib/api";
import { ApiResponse, IPaginatedQuery, IPagination } from "~/types";
export const getResError = (
  error?: any,
  defaultMs: string = "Something Went Wrong",
) => {
  if (!error) return defaultMs;
  const isNetError = error?.message?.includes("Network Error");
  if (isNetError) return "Network Error";
  return error?.response?.data?.message ?? error?.message ?? defaultMs;
};

type Opts = {
  onMount?: boolean;
  defaultData?: any;
  paginated?: boolean;
  pagination?: {
    url?: string;
    limit?: number;
    page?: number;
  };
  query?: { [key: string]: any };
  toastOnError?: boolean;
  useAuth?: boolean;
  refetchOnFocus?: boolean;
};

export default function useGet<T = any>(url?: string, options?: Opts) {
  const {
    onMount = true,
    defaultData,
    pagination,
    paginated,
    query,
    toastOnError = true,
    useAuth = true,
    refetchOnFocus = false,
  } = options ?? {};

  const [data, setData] = useState<T | null>(defaultData ?? null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [paginateOpts, setPaginateOpts] = useState<
    IPaginatedQuery & { totalPages: number }
  >({
    limit: pagination?.limit ?? 10,
    page: pagination?.page ?? 0,
    totalPages: 1,
  });

  const fetchApi = useAuth ? AuthorizedApi : UnAuthorizedApi;

  const get = async () => {
    setLoading(true);
    setError(null);
    if (!url) return;
    try {
      const response = await fetchApi.get<ApiResponse<T>>(url, {
        params: query,
      });

      const data =
        (response.data.data as any)?.data?.data ??
        (response.data.data as any)?.body?.data ??
        response.data?.data ??
        response.data?.content;
      setData(data);
      return data;
    } catch (error: any) {
      const err = getResError(error);
      if (toastOnError) {
        Alert.alert(err);
      }
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const getPaginated = async () => {
    setLoading(true);
    setError(null);
    if (!url) return;
    try {
      const response = await fetchApi.get(pagination?.url ?? url, {
        params: { ...paginateOpts, ...query },
      });

      const data: IPagination = response.data?.data ?? response.data;
      setData((data?.content as any) ?? defaultData);
      setPaginateOpts((prev) => ({
        ...prev,
        totalPages: data?.totalPages ?? 0,
      }));

      return data;
    } catch (error: any) {
      const err = getResError(error);
      if (toastOnError) {
        Alert.alert(err);
      }
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!onMount) return;
    if (pagination?.url || paginated) {
      getPaginated();
    } else {
      get();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if ((pagination?.url || paginated) && onMount) {
      getPaginated();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginateOpts.page, paginateOpts.limit]);
  useFocusEffect(
    useCallback(() => {
      if (refetchOnFocus) {
        pagination?.url || paginated ? getPaginated() : get();
      }
    }, [refetchOnFocus, url, JSON.stringify(query)]), // 👈 dependencies are important
  );
  return {
    data,
    loading,
    error,
    get,
    setData,
    paginateOpts,
    setPaginateOpts,
    getPaginated,
  };
}
