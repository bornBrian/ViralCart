import { useState } from "react";
import BannerSlider from "@/components/BannerSlider";
import ProductGrid from "@/components/ProductGrid";
import ProductDetailPage from "@/components/ProductDetailPage";
import { Product } from "@/lib/supabase";

const BANNERS = [
  {
    image:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&q=80",
    title: "🔥 Hot Deals This Week",
    subtitle: "Up to 50% off on selected items",
  },
  {
    image:
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&q=80",
    title: "⚡ Fast Delivery",
    subtitle: "Get your products in 2-3 days",
  },
  {
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80",
    title: "✨ Quality Guaranteed",
    subtitle: "Every product tested and verified",
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
