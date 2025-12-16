import { useState } from "react";
import BannerSlider from "@/components/BannerSlider";
import ProductGrid from "@/components/ProductGrid";
import ProductDetailPage from "@/components/ProductDetailPage";
import { Product } from "@/lib/supabase";

const BANNERS = [
  {
    image:
      "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1400&q=80",
    title: "🔥 Flash Sale Today",
    subtitle: "Up to 70% off on trending products",
  },
  {
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1400&q=80",
    title: "💎 New Arrivals",
    subtitle: "Fresh products added daily",
  },
  {
    image:
      "https://images.unsplash.com/photo-1573855619003-97b4799dcd8b?w=1400&q=80",
    title: "🎁 Best Sellers",
    subtitle: "Top rated by customers",
  },
  {
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1400&q=80",
    title: "⚡ Limited Time Offer",
    subtitle: "Grab them before they're gone",
  },
];

export default function HomePage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <>
      {selectedProduct ? (
        <ProductDetailPage
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      ) : (
        <>
          <BannerSlider banners={BANNERS} onSearch={handleSearch} />
          <ProductGrid
            onProductSelect={setSelectedProduct}
            searchQuery={searchQuery}
          />
        </>
      )}
    </>
  );
}
