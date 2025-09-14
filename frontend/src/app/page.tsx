import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Users, Shield, Zap } from "lucide-react";

export default function HomePage() {
  const features = [
    {
      icon: ShoppingBag,
      title: "Easy Selling",
      description:
        "Upload photos and descriptions of your items in minutes. Reach thousands of potential buyers.",
    },
    {
      icon: Users,
      title: "Trusted Community",
      description:
        "Connect with verified buyers and sellers in your area. Build trust through ratings and reviews.",
    },
    {
      icon: Shield,
      title: "Safe Transactions",
      description:
        "Secure payment processing and buyer protection policies keep your transactions safe.",
    },
    {
      icon: Zap,
      title: "Quick Deals",
      description:
        "Find great deals on quality pre-owned items. Chat directly with sellers to negotiate.",
    },
  ];

  const popularCategories = [
    { name: "Electronics", count: "2.5k items", color: "bg-blue-500" },
    { name: "Furniture", count: "1.8k items", color: "bg-green-500" },
    { name: "Clothing", count: "3.2k items", color: "bg-purple-500" },
    { name: "Books", count: "950 items", color: "bg-orange-500" },
    { name: "Home & Garden", count: "1.2k items", color: "bg-pink-500" },
    { name: "Sports", count: "680 items", color: "bg-indigo-500" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 px-4 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container max-w-screen-xl mx-auto text-center relative z-10">
          <div className="mb-8">
            <Badge className="mb-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 px-4 py-2">
              ✨ New marketplace for everyone
            </Badge>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent leading-tight">
            Turn Your{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Old Items
            </span>
            <br />
            Into{" "}
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Cash Today
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
            Join thousands of people buying and selling pre-owned items in your
            area. Find amazing deals and give your unused items a new purpose.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-4"
              asChild
            >
              <Link href="/products">🛍️ Browse Items</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-purple-200 hover:border-purple-300 hover:bg-purple-50 px-8 py-4"
              asChild
            >
              <Link href="/sell">💰 Start Selling</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">10k+</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">25k+</div>
              <div className="text-sm text-muted-foreground">Items Sold</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">$2M+</div>
              <div className="text-sm text-muted-foreground">Total Value</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-600">4.8★</div>
              <div className="text-sm text-muted-foreground">User Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-white dark:bg-gray-800">
        <div className="container max-w-screen-xl mx-auto">
          <div className="text-center mb-20">
            <Badge className="mb-6 bg-blue-100 text-blue-700 border-0">
              Why Choose Us
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Built for Modern Sellers
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We make buying and selling pre-owned items simple, safe, and
              incredibly rewarding.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900"
              >
                <CardHeader className="pb-4">
                  <div className="mb-4 mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-24 px-4 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container max-w-screen-xl mx-auto">
          <div className="text-center mb-20">
            <Badge className="mb-6 bg-purple-100 text-purple-700 border-0">
              Explore Categories
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Popular Categories
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover amazing deals across all categories and find exactly what
              you&apos;re looking for
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {popularCategories.map((category, index) => (
              <Link
                key={index}
                href={`/products?category=${category.name.toLowerCase()}`}
              >
                <Card className="hover:shadow-2xl transition-all duration-300 cursor-pointer border-0 hover:-translate-y-3 bg-white dark:bg-gray-800 group">
                  <CardContent className="p-8 text-center">
                    <div
                      className={`h-16 w-16 mx-auto mb-4 rounded-2xl ${category.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}
                    >
                      <span className="text-white font-bold text-xl">
                        {category.name[0]}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </h3>
                    <Badge
                      variant="secondary"
                      className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-0"
                    >
                      {category.count}
                    </Badge>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container max-w-screen-xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white leading-tight">
            Ready to Start Your
            <br />
            <span className="text-yellow-300">Selling Journey?</span>
          </h2>
          <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join our community of buyers and sellers. Create your account and
            start exploring amazing deals today. It&apos;s completely free!
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 px-10 py-4 text-lg font-semibold"
              asChild
            >
              <Link href="/register">🚀 Sign Up Free</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-10 py-4 text-lg font-semibold"
              asChild
            >
              <Link href="/login">✨ Login</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
