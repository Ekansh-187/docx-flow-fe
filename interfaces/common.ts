export interface IResponseWrapper<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface IPaginationResponseWrapper<T> {
  data: T;
  message: string;
  success: boolean;
  total: number;
  page: number;
  pageSize: number;
}

export interface IFiltersObj {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  search?: string;
}
