import { Product } from "@/lib/supabase";
import ProductCard from "./ProductCard";

interface CategoryRowProps {
  category: string;
  products: Product[];
  onProductSelect: (product: Product) => void;
}

export default function CategoryRow({
  category,
  products,
  onProductSelect,
}: CategoryRowProps) {
  if (products.length === 0) return null;

  return (
    <div className="mb-12">
      {/* Category Header */}
      <div className="flex items-center justify-between mb-4 px-4">
        <h2 className="text-lg md:text-xl font-bold text-charcoal">
          {category}
        </h2>
        {products.length > 3 && (
          <button className="text-accent hover:text-accent-hover font-medium text-xs md:text-sm flex items-center gap-1 transition-colors">
            See All
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Horizontal Scrolling Products */}
      <div className="relative">
        <div
          className="flex gap-3 overflow-x-auto pb-4 px-4 snap-x snap-mandatory scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 w-[160px] sm:w-[180px] md:w-[220px] snap-start"
            >
              <ProductCard
                product={product}
                onClick={() => onProductSelect(product)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
