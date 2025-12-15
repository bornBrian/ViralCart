import { useEffect, useState } from 'react'
import { Product, supabase } from '@/lib/supabase'
import ProductCard from './ProductCard'

interface ProductGridProps {
  onProductSelect: (product: Product) => void
}

export default function ProductGrid({ onProductSelect }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      setProducts(data || [])
    } catch (err) {
      console.error('Error fetching products:', err)
      setError('Failed to load products. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

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
    )
  }

  if (error) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={fetchProducts}
            className="btn-secondary"
          >
            Try Again
          </button>
        </div>
      </section>
    )
  }

  if (products.length === 0) {
    return (
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <p className="text-text-muted text-xl font-light">
              No products available yet. Check back soon!
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="products" className="py-20 px-6 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ letterSpacing: '-0.03em' }}>
            Our Curated Collection
          </h2>
          <p className="text-xl md:text-2xl text-text-muted max-w-3xl mx-auto font-light leading-relaxed">
            Each product has been personally tested and vetted for quality, functionality, and value
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
  )
}
