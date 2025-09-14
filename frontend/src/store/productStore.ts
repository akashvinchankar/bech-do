import { create } from "zustand";
import {
  Product,
  CreateProductRequest,
  UpdateProductRequest,
  ProductFilters,
  Category,
} from "@/types/product";
import apiClient from "@/lib/api";

interface ProductState {
  products: Product[];
  categories: Category[];
  selectedProduct: Product | null;
  filters: ProductFilters;
  pagination: {
    total: number;
    page: number;
    totalPages: number;
  };
  isLoading: boolean;
  error: string | null;
}

interface ProductActions {
  fetchProducts: (filters?: ProductFilters) => Promise<void>;
  fetchProduct: (id: number) => Promise<void>;
  createProduct: (data: CreateProductRequest) => Promise<Product>;
  updateProduct: (data: UpdateProductRequest) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
  fetchCategories: () => Promise<void>;
  setFilters: (filters: Partial<ProductFilters>) => void;
  clearFilters: () => void;
  setSelectedProduct: (product: Product | null) => void;
  clearError: () => void;
}

type ProductStore = ProductState & ProductActions;

const initialFilters: ProductFilters = {
  page: 1,
  limit: 12,
  sortBy: "date_desc",
};

export const useProductStore = create<ProductStore>()((set, get) => ({
  // State
  products: [],
  categories: [],
  selectedProduct: null,
  filters: initialFilters,
  pagination: {
    total: 0,
    page: 1,
    totalPages: 0,
  },
  isLoading: false,
  error: null,

  // Actions
  fetchProducts: async (filters?: ProductFilters) => {
    try {
      set({ isLoading: true, error: null });

      const currentFilters = filters || get().filters;
      const queryParams = new URLSearchParams();

      Object.entries(currentFilters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          if (Array.isArray(value)) {
            value.forEach((item) => queryParams.append(key, item.toString()));
          } else {
            queryParams.append(key, value.toString());
          }
        }
      });

      // Make direct fetch call since backend doesn't follow ApiResponse format
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1"
        }/products/?${queryParams}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();

      if (data.products && data.pagination) {
        const products = data.products;
        const { current_page, total_pages, total_count } = data.pagination;

        set({
          products,
          pagination: {
            total: total_count,
            page: current_page,
            totalPages: total_pages,
          },
          filters: currentFilters,
          isLoading: false,
          error: null,
        });
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch products";
      set({
        isLoading: false,
        error: errorMessage,
      });
    }
  },

  fetchProduct: async (id: number) => {
    try {
      set({ isLoading: true, error: null });

      // Make direct fetch call since backend doesn't follow ApiResponse format
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1"
        }/products/${id}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch product");
      }

      const data = await response.json();

      if (data.product) {
        set({
          selectedProduct: data.product,
          isLoading: false,
          error: null,
        });
      } else {
        throw new Error("Product not found");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch product";
      set({
        isLoading: false,
        error: errorMessage,
      });
    }
  },

  createProduct: async (data: CreateProductRequest): Promise<Product> => {
    try {
      set({ isLoading: true, error: null });

      // Transform camelCase to snake_case for backend
      const backendData = {
        title: data.title,
        description: data.description,
        price: data.price,
        images: data.images,
        condition: data.condition,
        location: data.location,
        is_negotiable: false, // default value
        category_id: data.categoryId,
      };

      // Make direct fetch call since backend doesn't follow ApiResponse format
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1"
        }/products`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              typeof window !== "undefined" ? localStorage.getItem("token") : ""
            }`,
          },
          body: JSON.stringify(backendData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create product");
      }

      const responseData = await response.json();
      const product = responseData.product;

      // Add new product to the beginning of the list
      const currentProducts = get().products;
      set({
        products: [product, ...currentProducts],
        isLoading: false,
        error: null,
      });

      return product;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to create product";
      set({
        isLoading: false,
        error: errorMessage,
      });
      throw error;
    }
  },

  updateProduct: async (data: UpdateProductRequest) => {
    try {
      set({ isLoading: true, error: null });

      const response = await apiClient.put<Product>(
        `/products/${data.id}`,
        data
      );

      if (response.success && response.data) {
        const currentProducts = get().products;
        const updatedProducts = currentProducts.map((product) =>
          product.id === data.id ? response.data! : product
        );

        set({
          products: updatedProducts,
          selectedProduct: response.data,
          isLoading: false,
          error: null,
        });
      } else {
        throw new Error(response.message || "Failed to update product");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to update product";
      set({
        isLoading: false,
        error: errorMessage,
      });
      throw error;
    }
  },

  deleteProduct: async (id: number) => {
    try {
      set({ isLoading: true, error: null });

      const response = await apiClient.delete(`/products/${id}`);

      if (response.success) {
        const currentProducts = get().products;
        const filteredProducts = currentProducts.filter(
          (product) => product.id !== id
        );

        set({
          products: filteredProducts,
          selectedProduct: null,
          isLoading: false,
          error: null,
        });
      } else {
        throw new Error(response.message || "Failed to delete product");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to delete product";
      set({
        isLoading: false,
        error: errorMessage,
      });
      throw error;
    }
  },

  fetchCategories: async () => {
    try {
      // Make direct fetch call since backend doesn't follow ApiResponse format
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1"
        }/categories/`
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch categories: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();

      if (data.categories) {
        set({ categories: data.categories });
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  },

  setFilters: (filters: Partial<ProductFilters>) => {
    const currentFilters = get().filters;
    const newFilters = { ...currentFilters, ...filters };
    set({ filters: newFilters });
  },

  clearFilters: () => {
    set({ filters: initialFilters });
  },

  setSelectedProduct: (product: Product | null) => {
    set({ selectedProduct: product });
  },

  clearError: () => {
    set({ error: null });
  },
}));
