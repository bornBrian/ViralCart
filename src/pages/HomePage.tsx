import { useState } from 'react'
import Hero from '@/components/Hero'
import ProductGrid from '@/components/ProductGrid'
import ProductDetailOverlay from '@/components/ProductDetailOverlay'
import { Product } from '@/lib/supabase'

export default function HomePage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const scrollToProducts = () => {
    const productsSection = document.getElementById('products')
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <>
      <Hero onCTAClick={scrollToProducts} />
      <ProductGrid onProductSelect={setSelectedProduct} />
      <ProductDetailOverlay
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  )
}
