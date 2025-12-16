import { useEffect, useState } from "react";
import { Product, supabase } from "@/lib/supabase";

interface ProductGridProps {
  onProductSelect: (product: Product) => void;
  searchQuery?: string;
}

export default function ProductGrid({
  searchQuery = "",
  onProductSelect,
}: ProductGridProps) {
  const [productsByCategory, setProductsByCategory] = useState<
    Record<string, Product[]>
  >({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);

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

      setAllProducts(data || []);

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
                  <div
                    key={j}
                    className="flex-shrink-0 w-[280px] animate-pulse"
                  >
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

  // Filter products based on search
  const filteredProducts = searchQuery
    ? allProducts.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const displayCategories = searchQuery ? {} : productsByCategory;

  return (
    <section id="products" className="py-3 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-3 pb-20">
        {/* Search Results */}
        {searchQuery && (
          <div className="mb-6">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3 px-1">
              Search Results for "{searchQuery}" ({filteredProducts.length})
            </h2>
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-sm">
                  No products found matching "{searchQuery}"
                </p>
                <p className="text-gray-400 text-xs mt-2">
                  Try different keywords
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => onProductSelect(product)}
                    className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="aspect-square relative overflow-hidden bg-gray-100">
                      <img
                        src={
                          (product.images &&
                            product.images.length > 0 &&
                            product.images[0]) ||
                          "https://via.placeholder.com/400?text=No+Image"
                        }
                        alt={product.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src =
                            "https://via.placeholder.com/400?text=No+Image";
                        }}
                      />
                    </div>
                    <div className="p-2">
                      <h3 className="text-xs md:text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                        {product.title}
                      </h3>
                      <p className="text-sm md:text-base font-bold text-accent mb-2">
                        ${product.price}
                      </p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(
                            product.affiliate_url,
                            "_blank",
                            "noopener,noreferrer"
                          );
                        }}
                        className="block w-full bg-accent hover:bg-accent-hover text-white text-xs font-medium py-1.5 rounded text-center transition-colors"
                      >
                        Order Amazon
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Category Products */}
        {!searchQuery &&
          Object.keys(displayCategories).map((category) => (
            <div key={category} className="mb-6">
              <div className="flex items-center justify-between mb-3 px-1">
                <h2 className="text-base md:text-lg font-bold text-gray-900">
                  {category}
                </h2>
                {productsByCategory[category].length > 6 && (
                  <button className="text-accent text-xs md:text-sm font-medium">
                    See All →
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3">
                {productsByCategory[category].slice(0, 10).map((product) => (
                  <div
                    key={product.id}
                    onClick={() => onProductSelect(product)}
                    className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="aspect-square relative overflow-hidden bg-gray-100">
                      <img
                        src={
                          (product.images &&
                            product.images.length > 0 &&
                            product.images[0]) ||
                          "https://via.placeholder.com/400?text=No+Image"
                        }
                        alt={product.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src =
                            "https://via.placeholder.com/400?text=No+Image";
                        }}
                      />
                    </div>
                    <div className="p-2">
                      <h3 className="text-xs md:text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                        {product.title}
                      </h3>
                      <p className="text-sm md:text-base font-bold text-accent mb-2">
                        ${product.price}
                      </p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(
                            product.affiliate_url,
                            "_blank",
                            "noopener,noreferrer"
                          );
                        }}
                        className="block w-full bg-accent hover:bg-accent-hover text-white text-xs font-medium py-1.5 rounded text-center transition-colors"
                      >
                        Order Amazon
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

        {/* End of Products Indicator */}
        {!searchQuery && Object.keys(displayCategories).length > 0 && (
          <div className="text-center py-8 border-t border-gray-200 mt-8">
            <p className="text-gray-400 text-xs">— End of Products —</p>
          </div>
        )}
      </div>
    </section>
  );
}
