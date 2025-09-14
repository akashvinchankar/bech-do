import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import ProductsContent from "./products-content";

// Loading component for suspense fallback
function ProductsPageSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Header Section Skeleton */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
        <div className="container max-w-screen-xl mx-auto">
          <div className="text-center mb-12">
            <div className="h-6 w-24 bg-white/20 rounded-full mx-auto mb-4"></div>
            <div className="h-12 bg-white/20 rounded mb-6"></div>
            <div className="h-4 bg-white/20 rounded max-w-2xl mx-auto"></div>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <Skeleton className="flex-1 h-14" />
              <div className="flex gap-4">
                <Skeleton className="w-48 h-14" />
                <Skeleton className="w-24 h-14" />
              </div>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-24" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid Skeleton */}
      <section className="py-16 px-4">
        <div className="container max-w-screen-xl mx-auto">
          <div className="mb-12">
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="border-0 shadow-md rounded-lg overflow-hidden">
                <Skeleton className="aspect-square w-full" />
                <div className="p-4">
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-6 w-1/3 mb-3" />
                  <Skeleton className="h-3 w-full mb-1" />
                  <Skeleton className="h-3 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsPageSkeleton />}>
      <ProductsContent />
    </Suspense>
  );
}