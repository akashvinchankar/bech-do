"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Search,
  Filter,
  SlidersHorizontal,
  Heart,
  MapPin,
  Clock,
  Eye,
} from "lucide-react";
import { useProductStore } from "@/store/productStore";
import Image from "next/image";
import Link from "next/link";

export default function ProductsContent() {
  const searchParams = useSearchParams();
  const {
    products,
    categories,
    isLoading,
    pagination,
    filters,
    fetchProducts,
    fetchCategories,
    setFilters,
  } = useProductStore();

  useEffect(() => {
    fetchCategories();

    // Get initial filters from URL params
    const initialFilters = {
      search: searchParams.get("search") || "",
      category: searchParams.get("category") || "",
      sortBy:
        (searchParams.get("sortBy") as
          | "price_asc"
          | "price_desc"
          | "date_asc"
          | "date_desc"
          | "views_desc") || "date_desc",
      page: 1,
      limit: 12,
    };

    setFilters(initialFilters);
    fetchProducts(initialFilters);
  }, [searchParams, fetchProducts, fetchCategories, setFilters]);

  const handleSearch = (value: string) => {
    const newFilters = { ...filters, search: value, page: 1 };
    setFilters(newFilters);
    fetchProducts(newFilters);
  };

  const handleSortChange = (sortBy: string) => {
    const newFilters = {
      ...filters,
      sortBy: sortBy as
        | "price_asc"
        | "price_desc"
        | "date_asc"
        | "date_desc"
        | "views_desc",
      page: 1,
    };
    setFilters(newFilters);
    fetchProducts(newFilters);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container max-w-screen-xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-white/20 text-white border-0">
              <Search className="h-3 w-3 mr-1" />
              Marketplace
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Discover Amazing
              <br />
              <span className="text-yellow-300">Deals</span> Today
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Browse thousands of quality pre-owned items from trusted sellers
              in your area
            </p>
          </div>

          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search for items..."
                  value={filters.search || ""}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-12 h-14 text-lg bg-white/90 backdrop-blur-sm border-0 shadow-lg"
                />
              </div>

              <div className="flex gap-4">
                <Select
                  value={filters.sortBy || "date_desc"}
                  onValueChange={handleSortChange}
                >
                  <SelectTrigger className="w-48 h-14 bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                    <div className="flex items-center">
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date_desc">Newest First</SelectItem>
                    <SelectItem value="date_asc">Oldest First</SelectItem>
                    <SelectItem value="price_asc">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price_desc">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="views_desc">Most Popular</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  className="h-14 px-6 bg-white/90 backdrop-blur-sm border-0 shadow-lg"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-3 justify-center">
              <Button
                variant={!filters.categoryId ? "default" : "outline"}
                onClick={() => {
                  const newFilters = {
                    ...filters,
                    categoryId: undefined,
                    page: 1,
                  };
                  setFilters(newFilters);
                  fetchProducts(newFilters);
                }}
                className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white hover:text-blue-600"
              >
                All Categories
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={
                    filters.categoryId === category.id ? "default" : "outline"
                  }
                  onClick={() => {
                    const newFilters = {
                      ...filters,
                      categoryId: category.id,
                      page: 1,
                    };
                    setFilters(newFilters);
                    fetchProducts(newFilters);
                  }}
                  className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white hover:text-blue-600"
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-16 px-4">
        <div className="container max-w-screen-xl mx-auto">
          {/* Results Header */}
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">
                {filters.search
                  ? `Results for "${filters.search}"`
                  : "All Products"}
              </h2>
              <p className="text-muted-foreground">
                {pagination.total} items found
              </p>
            </div>
          </div>

          {/* Products Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {Array.from({ length: 8 }).map((_, index) => (
                <Card key={index} className="overflow-hidden">
                  <Skeleton className="h-64 w-full" />
                  <CardContent className="p-6">
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-4" />
                    <Skeleton className="h-6 w-1/4" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <div className="mb-8">
                <div className="mx-auto w-32 h-32 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
                  <Search className="h-16 w-16 text-gray-400" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-4">No products found</h3>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                We couldn&apos;t find any products matching your criteria. Try
                adjusting your search or filters.
              </p>
              <Button
                onClick={() => {
                  setFilters({
                    search: "",
                    categoryId: undefined,
                    sortBy: "date_desc",
                    page: 1,
                    limit: 12,
                  });
                  fetchProducts({
                    search: "",
                    sortBy: "date_desc",
                    page: 1,
                    limit: 12,
                  });
                }}
              >
                Show All Products
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <Link key={product.id} href={`/products/${product.id}`}>
                    <Card className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-gray-800 h-full flex flex-col">
                      <div className="relative aspect-square overflow-hidden">
                        <Image
                          src={product.images[0] || "/placeholder-product.jpg"}
                          alt={product.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-3 right-3 z-10">
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:bg-white w-8 h-8 p-0"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                            }}
                          >
                            <Heart className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 text-xs px-2 py-1">
                            {product.condition.replace("_", " ").toUpperCase()}
                          </Badge>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      <CardContent className="p-4 flex-1 flex flex-col">
                        <div className="flex-1">
                          <div className="mb-2">
                            <h3 className="font-semibold text-base mb-1 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                              {product.title}
                            </h3>
                          </div>

                          <div className="text-xl font-bold text-green-600 mb-3">
                            {formatPrice(product.price)}
                          </div>

                          <div className="space-y-2 text-xs text-muted-foreground">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center min-w-0">
                                <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                                <span className="truncate">
                                  {product.location}
                                </span>
                              </div>
                              <div className="flex items-center ml-2">
                                <Eye className="h-3 w-3 mr-1" />
                                <span>{product.viewsCount}</span>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              <span>{formatDate(product.createdAt)}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="mt-16 flex justify-center">
                  <div className="flex gap-2">
                    {Array.from(
                      { length: pagination.totalPages },
                      (_, i) => i + 1
                    ).map((page) => (
                      <Button
                        key={page}
                        variant={
                          pagination.page === page ? "default" : "outline"
                        }
                        onClick={() => {
                          const newFilters = { ...filters, page };
                          setFilters(newFilters);
                          fetchProducts(newFilters);
                        }}
                        className="w-12 h-12"
                      >
                        {page}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}