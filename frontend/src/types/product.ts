export interface Product {
  id: number;
  userId: number;
  categoryId: number;
  title: string;
  description: string;
  price: number;
  condition: "new" | "like_new" | "good" | "fair" | "poor";
  images: string[];
  location: string;
  isSold: boolean;
  isActive: boolean;
  viewsCount: number;
  createdAt: string;
  updatedAt: string;
  soldAt?: string;
  user?: {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    profileImage?: string;
  };
  category?: Category;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  isActive: boolean;
  createdAt: string;
}

export interface CreateProductRequest {
  categoryId: number;
  title: string;
  description: string;
  price: number;
  condition: "new" | "like_new" | "good" | "fair" | "poor";
  images: string[];
  location: string;
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {
  id: number;
}

export interface ProductFilters {
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
  condition?: string[];
  location?: string;
  search?: string;
  sortBy?: "price_asc" | "price_desc" | "date_asc" | "date_desc" | "views_desc";
  page?: number;
  limit?: number;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
}
