import { useEffect, useState } from 'react'
import { Product } from '@/lib/supabase'
import { openAffiliateLink, formatPrice } from '@/lib/utils'

interface ProductDetailOverlayProps {
  product: Product | null
  onClose: () => void
}

export default function ProductDetailOverlay({ product, onClose }: ProductDetailOverlayProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    if (product) {
      // Prevent body scroll when overlay is open
      document.body.style.overflow = 'hidden'
      setTimeout(() => setIsVisible(true), 10)
    } else {
      document.body.style.overflow = 'unset'
      setIsVisible(false)
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [product])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])

  if (!product) return null

  const images = product.images && product.images.length > 0 
    ? product.images 
    : ['https://via.placeholder.com/600x400?text=Product+Image']

  const handleBuyClick = () => {
    openAffiliateLink(product.affiliate_url, product.id)
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  // Example benefits - in production, these would come from product data
  const benefits = [
    'Premium build quality',
    'Long-lasting durability',
    'Great value for money',
    'Positive user reviews',
  ]

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        isVisible ? 'bg-black/60 backdrop-blur-sm' : 'bg-black/0'
      }`}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-detail-title"
    >
      {/* Modal content */}
      <div
        className={`relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto transition-all duration-300 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-colors"
          aria-label="Close product details"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid md:grid-cols-2 gap-8 p-6 md:p-8">
          {/* Left: Images */}
          <div className="space-y-4">
            {/* Main image */}
            <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
              <img
                src={images[currentImageIndex]}
                alt={`${product.title} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail navigation */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      idx === currentImageIndex
                        ? 'border-accent'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Details */}
          <div className="flex flex-col">
            {/* Title and tags */}
            <div className="mb-4">
              {product.tags && product.tags.length > 0 && (
                <div className="flex gap-2 mb-3">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <h2 id="product-detail-title" className="text-3xl font-bold mb-2">
                {product.title}
              </h2>
              <div className="flex items-center gap-2 text-sm text-text-muted">
                <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Tested and verified</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-text-muted mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* Key benefits */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Why we recommend it:</h3>
              <ul className="space-y-2">
                {benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-text-muted">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price and CTA */}
            <div className="mt-auto">
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-4xl font-bold text-charcoal">
                  {formatPrice(product.price)}
                </span>
                <span className="text-sm text-text-muted">on Amazon</span>
              </div>

              <button
                onClick={handleBuyClick}
                className="w-full btn-primary text-lg py-4"
                aria-label={`Buy ${product.title} on Amazon`}
              >
                Check price — Amazon
              </button>

              <p className="text-xs text-text-muted text-center mt-3">
                Opens in new tab • Affiliate link
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
