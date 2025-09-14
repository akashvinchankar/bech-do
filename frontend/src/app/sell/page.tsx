"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, DollarSign, MapPin, Package, Camera, Sparkles } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useProductStore } from "@/store/productStore";
import {
  createProductSchema,
  type CreateProductFormData,
} from "@/lib/validations";
import Image from "next/image";

export default function SellPage() {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { isAuthenticated } = useAuthStore();
  const { createProduct, categories, isLoading, fetchCategories } =
    useProductStore();
  const router = useRouter();

  // Handle client-side mounting
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle authentication redirect
  useEffect(() => {
    if (isMounted && !isAuthenticated) {
      router.push("/login");
    }
  }, [isMounted, isAuthenticated, router]);

  // Fetch categories when component mounts
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const form = useForm<CreateProductFormData>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      categoryId: 0,
      title: "",
      description: "",
      price: 0,
      condition: "good",
      location: "",
      images: [],
    },
  });

  // Don't render anything until mounted and authenticated
  if (!isMounted) {
    return null;
  }

  if (!isAuthenticated) {
    return null;
  }

  const onSubmit = async (data: CreateProductFormData) => {
    try {
      console.log("Form submitted with data:", data);
      console.log("Uploaded images:", uploadedImages);

      // Use placeholder image if no images uploaded (for testing)
      const imagesToUse =
        uploadedImages.length > 0
          ? uploadedImages
          : ["https://via.placeholder.com/400x400?text=Product+Image"];

      const productData = {
        ...data,
        images: imagesToUse,
      };

      console.log("Product data being sent:", productData);

      const createdProduct = await createProduct(productData);
      console.log("Product created successfully:", createdProduct);

      alert("Listing created successfully!");
      router.push("/my-ads");
    } catch (error) {
      console.error("Failed to create product:", error);
      alert(
        `Failed to create listing: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files) return;

    setIsUploading(true);

    // Simulate image upload - replace with actual Cloudinary upload
    for (const file of Array.from(files)) {
      if (uploadedImages.length >= 5) break;

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setUploadedImages((prev) => [...prev, result]);
      };
      reader.readAsDataURL(file);
    }

    setIsUploading(false);
  };

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const conditionOptions = [
    { value: "new", label: "New", description: "Brand new, never used" },
    {
      value: "like_new",
      label: "Like New",
      description: "Barely used, excellent condition",
    },
    { value: "good", label: "Good", description: "Used but well maintained" },
    { value: "fair", label: "Fair", description: "Shows wear, but functional" },
    {
      value: "poor",
      label: "Poor",
      description: "Heavy wear, may need repairs",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-green-600 via-emerald-600 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container max-w-screen-xl mx-auto relative z-10 text-center">
          <Badge className="mb-4 bg-white/20 text-white border-0">
            <Package className="h-3 w-3 mr-1" />
            Sell Your Items
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Turn Your Items Into
            <br />
            <span className="text-yellow-300">Cash Today</span>
          </h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">
            Create a listing in minutes and reach thousands of potential buyers
            in your area
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 px-4">
        <div className="container max-w-4xl mx-auto">
          <Card className="border-0 shadow-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Create Your Listing
              </CardTitle>
              <CardDescription className="text-lg">
                Fill in the details below to create your product listing
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  {/* Image Upload Section */}
                  <div className="space-y-4">
                    <FormLabel className="text-lg font-semibold">
                      Product Images
                    </FormLabel>
                    <p className="text-sm text-muted-foreground">
                      Add up to 5 high-quality images of your item
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {/* Upload Button */}
                      {uploadedImages.length < 5 && (
                        <div className="relative">
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                          <div className="aspect-square border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex flex-col items-center justify-center hover:border-green-500 transition-colors bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-700">
                            <Camera className="h-12 w-12 text-muted-foreground mb-2" />
                            <p className="text-sm font-medium">
                              {isUploading ? "Uploading..." : "Click to upload"}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              PNG, JPG, WEBP
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Uploaded Images */}
                      {uploadedImages.map((image, index) => (
                        <div key={index} className="relative group">
                          <div className="aspect-square rounded-lg overflow-hidden relative">
                            <Image
                              src={image}
                              alt={`Upload ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <Button
                            type="button"
                            size="sm"
                            variant="destructive"
                            className="absolute -top-2 -right-2 rounded-full w-8 h-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeImage(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                          {index === 0 && (
                            <Badge className="absolute bottom-2 left-2 bg-blue-500">
                              Main
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Title */}
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel className="text-base font-semibold">
                            Product Title
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., iPhone 12 Pro 128GB - Excellent Condition"
                              className="h-12 text-lg"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Category */}
                    <FormField
                      control={form.control}
                      name="categoryId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold">
                            Category
                          </FormLabel>
                          <Select
                            onValueChange={(value) =>
                              field.onChange(parseInt(value))
                            }
                          >
                            <FormControl>
                              <SelectTrigger className="h-12">
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem
                                  key={category.id}
                                  value={category.id.toString()}
                                >
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Condition */}
                    <FormField
                      control={form.control}
                      name="condition"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold">
                            Condition
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="h-12">
                                <SelectValue placeholder="Select condition" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {conditionOptions.map((condition) => (
                                <SelectItem
                                  key={condition.value}
                                  value={condition.value}
                                >
                                  <div className="flex flex-col">
                                    <span className="font-medium">
                                      {condition.label}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                      {condition.description}
                                    </span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Price */}
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold">
                            Price
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                              <Input
                                type="number"
                                placeholder="0.00"
                                className="pl-10 h-12 text-lg"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(
                                    parseFloat(e.target.value) || 0
                                  )
                                }
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Location */}
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold">
                            Location
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                              <Input
                                placeholder="City, State"
                                className="pl-10 h-12"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Description */}
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold">
                          Description
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your item in detail. Include any flaws, accessories included, reason for selling, etc."
                            className="min-h-32 resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-4 pt-6">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 h-14"
                      onClick={() => router.back()}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 h-14 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      {isLoading ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Creating Listing...
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <Sparkles className="mr-2 h-5 w-5" />
                          Create Listing
                          {uploadedImages.length === 0 && (
                            <span className="ml-2 text-xs opacity-75">
                              (Test Mode)
                            </span>
                          )}
                        </div>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Tips Section */}
          <Card className="mt-8 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sparkles className="h-5 w-5 mr-2 text-yellow-500" />
                Tips for a Great Listing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold mb-2">📸 Great Photos</h4>
                  <p className="text-muted-foreground">
                    Use natural lighting, show multiple angles, and highlight
                    any flaws
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">
                    📝 Detailed Description
                  </h4>
                  <p className="text-muted-foreground">
                    Be honest about condition, include dimensions, and mention
                    included accessories
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">💰 Competitive Pricing</h4>
                  <p className="text-muted-foreground">
                    Research similar items and price fairly for quick sales
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">⚡ Quick Responses</h4>
                  <p className="text-muted-foreground">
                    Reply to inquiries promptly to maintain buyer interest
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
