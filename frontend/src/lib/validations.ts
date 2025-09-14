import { z } from "zod";

// Authentication validation schemas
export const loginSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(50, "Username must be less than 50 characters")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores"
      ),
    email: z
      .string()
      .email("Invalid email address")
      .min(1, "Email is required"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(100, "Password must be less than 100 characters"),
    confirmPassword: z.string(),
    firstName: z
      .string()
      .min(2, "First name must be at least 2 characters")
      .max(50, "First name must be less than 50 characters"),
    lastName: z
      .string()
      .min(2, "Last name must be at least 2 characters")
      .max(50, "Last name must be less than 50 characters"),
    phone: z
      .string()
      .regex(/^\+?[\d\s-()]+$/, "Invalid phone number format")
      .optional()
      .or(z.literal("")),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

// Product validation schemas
export const createProductSchema = z.object({
  categoryId: z.number().min(1, "Please select a category"),
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(200, "Title must be less than 200 characters"),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters")
    .max(1000, "Description must be less than 1000 characters"),
  price: z
    .number()
    .min(0.01, "Price must be greater than 0")
    .max(1000000, "Price cannot exceed 1,000,000"),
  condition: z.enum(["new", "like_new", "good", "fair", "poor"], {
    message: "Please select a condition",
  }),
  location: z
    .string()
    .min(2, "Location must be at least 2 characters")
    .max(100, "Location must be less than 100 characters"),
  images: z
    .array(z.string().url("Invalid image URL"))
    .min(1, "At least one image is required")
    .max(5, "Maximum 5 images allowed"),
});

export const updateProductSchema = createProductSchema.partial().extend({
  id: z.number(),
});

// Contact/Profile validation schemas
export const updateProfileSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters"),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters"),
  phone: z
    .string()
    .regex(/^\+?[\d\s-()]+$/, "Invalid phone number format")
    .optional()
    .or(z.literal("")),
  profileImage: z
    .string()
    .url("Invalid image URL")
    .optional()
    .or(z.literal("")),
});

// Search and filter validation
export const searchFiltersSchema = z.object({
  search: z.string().optional(),
  categoryId: z.number().optional(),
  minPrice: z.number().min(0).optional(),
  maxPrice: z.number().min(0).optional(),
  condition: z.array(z.string()).optional(),
  location: z.string().optional(),
  sortBy: z
    .enum(["price_asc", "price_desc", "date_asc", "date_desc", "views_desc"])
    .optional(),
  page: z.number().min(1).optional(),
  limit: z.number().min(1).max(100).optional(),
});

// Type inference from schemas
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type CreateProductFormData = z.infer<typeof createProductSchema>;
export type UpdateProductFormData = z.infer<typeof updateProductSchema>;
export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;
export type SearchFiltersData = z.infer<typeof searchFiltersSchema>;
