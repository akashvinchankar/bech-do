import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { ApiResponse, ApiError } from "@/types/api";

class ApiClient {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Request interceptor to add auth token
    this.instance.interceptors.request.use(
      (config) => {
        const token = this.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor to handle errors
    this.instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          // Token expired or invalid
          this.removeToken();
          // Redirect to login page
          if (typeof window !== "undefined") {
            window.location.href = "/login";
          }
        }
        return Promise.reject(this.handleApiError(error));
      }
    );
  }

  private getToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  }

  private removeToken(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
    }
  }

  private handleApiError(error: unknown): ApiError {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return {
          message:
            error.response.data?.error ||
            error.response.data?.message ||
            "An error occurred",
          status: error.response.status,
          field: error.response.data?.field,
        };
      } else if (error.request) {
        return {
          message: "Network error. Please check your connection.",
        };
      }
    }

    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    return {
      message: errorMessage,
    };
  }

  public setAuthToken(token: string): void {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token);
    }
  }

  public setRefreshToken(refreshToken: string): void {
    if (typeof window !== "undefined") {
      localStorage.setItem("refreshToken", refreshToken);
    }
  }

  // HTTP Methods
  public async get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response: AxiosResponse<ApiResponse<T>> = await this.instance.get(
      url,
      config
    );
    return response.data;
  }

  public async post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response: AxiosResponse<ApiResponse<T>> = await this.instance.post(
      url,
      data,
      config
    );
    return response.data;
  }

  public async put<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response: AxiosResponse<ApiResponse<T>> = await this.instance.put(
      url,
      data,
      config
    );
    return response.data;
  }

  public async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response: AxiosResponse<ApiResponse<T>> = await this.instance.delete(
      url,
      config
    );
    return response.data;
  }

  // File upload method
  public async uploadFile<T>(
    url: string,
    file: File,
    onUploadProgress?: (progress: number) => void
  ): Promise<ApiResponse<T>> {
    const formData = new FormData();
    formData.append("file", file);

    const response: AxiosResponse<ApiResponse<T>> = await this.instance.post(
      url,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total && onUploadProgress) {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            onUploadProgress(progress);
          }
        },
      }
    );
    return response.data;
  }
}

// Create and export a singleton instance
export const apiClient = new ApiClient();
export default apiClient;
