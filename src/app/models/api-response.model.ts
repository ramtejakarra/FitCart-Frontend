export interface ApiResponse<T> {
  success: boolean;
  status: string;
  result: T;
}
