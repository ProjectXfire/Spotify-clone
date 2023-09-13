export interface IResponse<T> {
  data: T;
  message: null | string;
  errorMessage: string | null;
}
