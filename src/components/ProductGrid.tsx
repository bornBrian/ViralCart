import { useEffect, useState } from "react";
import { Product, supabase } from "@/lib/supabase";
import CategoryRow from "./CategoryRow";

interface ProductGridProps {
  onProductSelect: (product: Product) => void;
}

export default function ProductGrid({ onProductSelect }: ProductGridProps) {
  const [productsByCategory, setProductsByCategory] = useState<Record<string, Product[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Group products by category
      const grouped = (data || []).reduce((acc, product) => {
        const category = product.category || "Featured";
        if (!acc[category]) acc[category] = [];
        acc[category].push(product);
        return acc;
      }, {} as Record<string, Product[]>);

      setProductsByCategory(grouped);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <section className="py-12 md:py-20">
        <div className="space-y-12">
          {[1, 2, 3].map((i) => (
            <div key={i} className="px-4 md:px-6">
              <div className="h-8 bg-gray-200 rounded-lg w-48 mb-6 animate-pulse" />
              <div className="flex gap-4 overflow-x-auto">
                {[1, 2, 3, 4].map((j) => (
                  <div key={j} className="flex-shrink-0 w-[280px] animate-pulse">
                    <div className="bg-gray-200 rounded-2xl aspect-square mb-4" />
                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
                    <div className="h-5 bg-gray-200 rounded w-1/2" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button onClick={fetchProducts} className="btn-secondary">
            Try Again
          </button>
        </div>
      </section>
    );
  }

  const categories = Object.keys(productsByCategory);

  if (categories.length === 0) {
    return (
      <section className="py-20 px-4">
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
    <section id="products" className="py-12 md:py-20 scroll-mt-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-[1600px] mx-auto">
        {/* Section header */}
        <div className="mb-12 md:mb-16 px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-charcoal">
            Shop by Category
          </h2>
          <p className="text-lg md:text-xl text-text-muted max-w-2xl">
            Swipe to explore our hand-picked collections
          </p>
        </div>

        {/* Category rows */}
        {categories.map((category) => (
          <CategoryRow
            key={category}
            category={category}
            products={productsByCategory[category]}
            onProductSelect={onProductSelect}
          />
        ))}
      </div>
    </section>
  );
}
