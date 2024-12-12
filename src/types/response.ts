export interface Response<T> {
  data?: IData<T>;
  error?: IError;
}

export interface IData<T> {
  status: "success";
  code: number;
  message: string;
  data: T;
  pagination: Pagination;
}

export interface IError {
  data: {
    status: "fail";
    message: string;
  };
  status: number;
}

export interface Pagination {
  page: number;
  limit: number;
  totalPage: number;
  prevPage: number | null;
  nextPage: number | null;
  totalItem: number;
}
