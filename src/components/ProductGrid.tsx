import { useState } from "react";
import { Product } from "@/lib/supabase";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  onProductSelect: (product: Product) => void;
}

// Sample products - replace with your own Amazon affiliate links
const SAMPLE_PRODUCTS: Product[] = [
  {
    id: "1",
    title: "Wireless Earbuds Pro",
    description:
      "Premium noise-cancelling wireless earbuds with 30-hour battery life",
    price: 79.99,
    image_url:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80",
    amazon_url: "https://amazon.com", // Replace with your affiliate link
    category: "Electronics",
    tags: ["audio", "wireless", "earbuds"],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Smart Watch Ultra",
    description: "Fitness tracking smartwatch with heart rate monitor and GPS",
    price: 199.99,
    image_url:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
    amazon_url: "https://amazon.com", // Replace with your affiliate link
    category: "Electronics",
    tags: ["smartwatch", "fitness", "health"],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Portable Power Bank",
    description: "20000mAh fast-charging portable charger for all devices",
    price: 39.99,
    image_url:
      "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&q=80",
    amazon_url: "https://amazon.com", // Replace with your affiliate link
    category: "Electronics",
    tags: ["charger", "power bank", "portable"],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export default function ProductGrid({ onProductSelect }: ProductGridProps) {
  const [products] = useState<Product[]>(SAMPLE_PRODUCTS);
  const loading = false;
  const error = null;

  if (loading) {
    return (
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 rounded-2xl aspect-[4/3] mb-5" />
                <div className="h-5 bg-gray-200 rounded-lg w-3/4 mb-3" />
                <div className="h-5 bg-gray-200 rounded-lg w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-red-500 mb-4">{error}</p>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
            </div>
            <p className="text-text-muted text-xl font-light">
              No products available yet. Check back soon!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="py-20 px-6 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-16 text-center">
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            style={{ letterSpacing: "-0.03em" }}
          >
            Our Curated Collection
          </h2>
          <p className="text-xl md:text-2xl text-text-muted max-w-3xl mx-auto font-light leading-relaxed">
            Each product has been personally tested and vetted for quality,
            functionality, and value
          </p>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onDetailClick={onProductSelect}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
