export const backendUrl = "http://localhost:8080";

export type ApiResponse<T> = Promise<{ status: number; json: T }>;