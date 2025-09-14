"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Heart,
  Share2,
  MapPin,
  Clock,
  Eye,
  ArrowLeft,
  Phone,
  Mail,
  MessageCircle,
  Shield,
  Truck,
  RefreshCw,
  Star,
  ChevronLeft,
  ChevronRight,
  User,
} from "lucide-react";
import { useProductStore } from "@/store/productStore";
import { useAuthStore } from "@/store/authStore";
import Image from "next/image";
import Link from "next/link";

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const productId = parseInt(params.id as string);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const {
    selectedProduct: product,
    isLoading,
    error,
    fetchProduct,
  } = useProductStore();

  const { user } = useAuthStore();

  useEffect(() => {
    if (productId) {
      fetchProduct(productId);
    }
  }, [productId, fetchProduct]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const nextImage = () => {
    if (product && product.images.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === product.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (product && product.images.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? product.images.length - 1 : prev - 1
      );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container max-w-screen-xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-32 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="h-96 bg-gray-300 rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                <div className="h-6 bg-gray-300 rounded w-1/4"></div>
                <div className="h-20 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto w-32 h-32 bg-gradient-to-br from-red-200 to-red-300 rounded-full flex items-center justify-center mb-8">
            <RefreshCw className="h-16 w-16 text-red-500" />
          </div>
          <h2 className="text-2xl font-semibold mb-4">Product not found</h2>
          <p className="text-muted-foreground mb-8">
            The product you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
          <Button onClick={() => router.push("/products")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  const isOwner = user?.id === product.userId;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Breadcrumb */}
      <div className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container max-w-screen-xl mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <nav className="text-sm text-muted-foreground">
            <Link
              href="/products"
              className="hover:text-foreground transition-colors"
            >
              Products
            </Link>
            <span className="mx-2">›</span>
            <Link
              href={`/products?category=${product.category?.name}`}
              className="hover:text-foreground transition-colors"
            >
              {product.category?.name}
            </Link>
            <span className="mx-2">›</span>
            <span className="text-foreground font-medium">{product.title}</span>
          </nav>
        </div>
      </div>

      <div className="container max-w-screen-xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100">
              {product.images && product.images.length > 0 ? (
                <>
                  <Image
                    src={
                      product.images[currentImageIndex] ||
                      "/placeholder-product.jpg"
                    }
                    alt={product.title}
                    fill
                    className="object-cover cursor-zoom-in"
                  />
                  {product.images.length > 1 && (
                    <>
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm border-0 shadow-lg"
                        onClick={prevImage}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm border-0 shadow-lg"
                        onClick={nextImage}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="mx-auto w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mb-4">
                      <Eye className="h-8 w-8 text-gray-500" />
                    </div>
                    <p className="text-muted-foreground">No image available</p>
                  </div>
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      index === currentImageIndex
                        ? "border-blue-500 ring-2 ring-blue-200"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <Badge className="mb-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
                    {product.condition.replace("_", " ").toUpperCase()}
                  </Badge>
                  <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      {product.viewsCount || 0} views
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      Posted {formatDate(product.createdAt)}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="text-4xl font-bold text-green-600 mb-6">
                {formatPrice(product.price)}
                <Badge variant="outline" className="ml-3 text-sm font-normal">
                  Negotiable
                </Badge>
              </div>
            </div>

            <Separator />

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Description</h3>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {product.description}
              </p>
            </div>

            <Separator />

            {/* Location */}
            <div className="flex items-center text-muted-foreground">
              <MapPin className="h-5 w-5 mr-2" />
              <span>{product.location}</span>
            </div>

            <Separator />

            {/* Seller Info */}
            <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold">
                        {product.user?.firstName} {product.user?.lastName}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Verified Seller
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="font-semibold">4.8</span>
                  </div>
                </div>

                {!isOwner && (
                  <div className="space-y-3">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Chat with Seller
                    </Button>
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" className="w-full">
                        <Phone className="h-4 w-4 mr-2" />
                        Call
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Mail className="h-4 w-4 mr-2" />
                        Email
                      </Button>
                    </div>
                  </div>
                )}

                {isOwner && (
                  <div className="space-y-3">
                    <Badge className="w-full justify-center py-2 bg-green-100 text-green-800 border-green-200">
                      This is your listing
                    </Badge>
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" className="w-full">
                        Edit Listing
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full text-red-600 hover:text-red-700"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Safety Tips */}
            <Card className="border-0 shadow-lg bg-yellow-50 border-l-4 border-l-yellow-400 dark:bg-yellow-900/20">
              <CardContent className="p-4">
                <div className="flex items-start">
                  <Shield className="h-5 w-5 text-yellow-600 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                      Safety Tips
                    </h4>
                    <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                      <li>• Meet in a public place</li>
                      <li>• Check the item before payment</li>
                      <li>• Avoid advance payments</li>
                      <li>• Trust your instincts</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold mb-8">Similar Products</h2>
          <div className="text-center py-12 text-muted-foreground">
            <Truck className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Related products coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
