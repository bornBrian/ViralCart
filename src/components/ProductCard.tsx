import { useState } from 'react'
import { Product } from '@/lib/supabase'
import { openAffiliateLink, formatPrice } from '@/lib/utils'

interface ProductCardProps {
  product: Product
  onDetailClick: (product: Product) => void
}

export default function ProductCard({ product, onDetailClick }: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleBuyClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    openAffiliateLink(product.affiliate_url, product.id)
  }

  // Extract first image or use placeholder
  const mainImage = product.images && product.images.length > 0 
    ? product.images[0] 
    : 'https://via.placeholder.com/400x300?text=Product+Image'

  // Simple rating (you can make this dynamic from product data)
  const rating = 4.5

  const [isHovered, setIsHovered] = useState(false)

  return (
    <article 
      className="product-card group relative"
      onClick={() => onDetailClick(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onDetailClick(product)
        }
      }}
      aria-label={`View details for ${product.title}`}
    >
      {/* Hover glow effect */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r from-accent/20 to-emerald-400/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`} />
      
      {/* Image container */}
      <div className="relative overflow-hidden rounded-2xl mb-5 aspect-[4/3] bg-gradient-to-br from-gray-50 to-gray-100">
        <img
          src={mainImage}
          alt={product.title}
          className={`w-full h-full object-cover transition-all duration-700 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            transform: isHovered ? 'scale(1.05) rotate(1deg)' : 'scale(1) rotate(0deg)',
            filter: isHovered ? 'brightness(1.05) contrast(1.05)' : 'brightness(1) contrast(1)',
            transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
        
        {/* Overlay on hover */}
        <div className={`absolute inset-0 bg-gradient-to-t from-charcoal/20 via-transparent to-transparent transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
        
        {/* Tested badge */}
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3.5 py-1.5 rounded-full text-xs font-semibold text-charcoal shadow-sm" style={{ letterSpacing: '0.01em' }}>
          ✓ Tested by us
        </div>

        {/* Tag badges */}
        {product.tags && product.tags.length > 0 && (
          <div className="absolute bottom-4 left-4 flex gap-2">
            <span className="bg-charcoal text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg" style={{ letterSpacing: '0.02em' }}>
              {product.tags[0]}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="space-y-4">
        {/* Title */}
        <h3 className="font-semibold text-xl leading-tight line-clamp-2 group-hover:text-charcoal transition-colors duration-300" style={{ letterSpacing: '-0.02em' }}>
          {product.title}
        </h3>

        {/* Description/Why it's useful */}
        <p className="text-base text-text-muted line-clamp-2 leading-relaxed font-light">
          {product.description || 'Quality product tested and approved'}
        </p>

        {/* Price and Rating */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-3xl font-bold text-charcoal" style={{ letterSpacing: '-0.03em', fontVariantNumeric: 'tabular-nums' }}>
            {formatPrice(product.price)}
          </span>
          <div className="flex items-center gap-1">
            <span className="text-amber-400 text-lg leading-none">
              {'★'.repeat(Math.floor(rating))}
              {'☆'.repeat(5 - Math.floor(rating))}
            </span>
            <span className="text-sm text-text-muted ml-1 font-medium" style={{ fontVariantNumeric: 'tabular-nums' }}>
              {rating}
            </span>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={handleBuyClick}
          className="w-full bg-charcoal hover:bg-charcoal-light text-white font-medium py-3.5 px-5 rounded-xl transition-all duration-300 hover:shadow-lg active:scale-[0.98]"
          style={{ 
            letterSpacing: '0.01em',
            boxShadow: isHovered ? '0 8px 24px rgba(0, 0, 0, 0.15)' : '0 2px 8px rgba(0, 0, 0, 0.08)'
          }}
          aria-label={`Check price for ${product.title} on Amazon`}
        >
          Check price — Amazon
        </button>
      </div>
    </article>
  )
}
