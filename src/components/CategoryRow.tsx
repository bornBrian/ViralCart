import { Product } from '@/lib/supabase'
import ProductCard from './ProductCard'

interface CategoryRowProps {
  category: string
  products: Product[]
  onProductSelect: (product: Product) => void
}

export default function CategoryRow({ category, products, onProductSelect }: CategoryRowProps) {
  if (products.length === 0) return null

  return (
    <div className="mb-12">
      {/* Category Header */}
      <div className="flex items-center justify-between mb-6 px-4 md:px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-charcoal">{category}</h2>
        {products.length > 4 && (
          <button className="text-accent hover:text-accent-hover font-medium text-sm md:text-base flex items-center gap-1 transition-colors">
            See All
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>

      {/* Horizontal Scrolling Products */}
      <div className="relative">
        <div 
          className="flex gap-4 md:gap-6 overflow-x-auto pb-4 px-4 md:px-6 snap-x snap-mandatory scrollbar-hide"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {products.map((product) => (
            <div 
              key={product.id}
              className="flex-shrink-0 w-[280px] md:w-[320px] snap-start"
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
  )
}
