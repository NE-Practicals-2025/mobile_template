export interface ApiResponse<T = any> {
  content: T;
  data: T;
  success: boolean;
  message: string;
  error: any;
}

export interface IPagination<T = any[]> {
  content: T;
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: Pageable;
  size: number;
  sort: Sort;
  totalElements: number;
  totalPages: number;
}

export interface Pageable {
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  sort: Sort;
  unpaged: boolean;
}
export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface IPaginatedQuery {
  limit?: number;
  page?: number;
  sort?: string;
  filter?: string;
}

export interface IBrand {
  id: string;
  name: string;
  logo: string;
}

export interface ICar {
  id: string;
  brand: string;
  model: string;
  price: string;
  numberOfSeats: string;
  availableFrom: string;
  photo: string;
  createdAt: string;
  rating?: number;
}

export interface IBooking {
  id: string;
  carId: string;
  userId: string;
  from: Date;
  to: Date;
  createdAt: string;
}

export interface User {
  id: string;
  username: string;
  password: string;
  name: string;
}

export interface Expense {
  id: string;
  name: string;
  amount: string;
  description: string;
  createdAt: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
}

export interface CreateExpenseData {
  name: string;
  amount: string;
  description: string;
}
