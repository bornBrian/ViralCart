import { supabase } from './supabase'

/**
 * Track product click - fires asynchronously before redirect
 */
export async function trackProductClick(productId: string): Promise<void> {
  try {
    await supabase.from('clicks').insert([
      {
        product_id: productId,
        created_at: new Date().toISOString(),
      },
    ])
  } catch (error) {
    // Silent fail - don't block user experience
    console.error('Failed to track click:', error)
  }
}

/**
 * Safely open affiliate link in new tab
 */
export function openAffiliateLink(url: string, productId: string): void {
  // Track the click
  trackProductClick(productId)
  
  // Open affiliate link after a tiny delay to ensure tracking fires
  setTimeout(() => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }, 50)
}

/**
 * Generate slug from title
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Format price
 */
export function formatPrice(price: string): string {
  // If already formatted, return as-is
  if (price.startsWith('$')) return price
  
  // Try to parse and format
  const numPrice = parseFloat(price)
  if (!isNaN(numPrice)) {
    return `$${numPrice.toFixed(2)}`
  }
  
  return price
}

/**
 * Generate star rating
 */
export function generateStars(rating: number): string {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
  
  return '★'.repeat(fullStars) + 
         (hasHalfStar ? '⯨' : '') + 
         '☆'.repeat(emptyStars)
}

/**
 * Lazy load images with Intersection Observer
 */
export function setupLazyLoading(): void {
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]')
    
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement
          img.src = img.dataset.src || ''
          img.removeAttribute('data-src')
          imageObserver.unobserve(img)
        }
      })
    })
    
    lazyImages.forEach((img) => imageObserver.observe(img))
  }
}

/**
 * Check if admin token is valid
 */
export function checkAdminToken(token: string | null): boolean {
  const adminToken = import.meta.env.VITE_ADMIN_TOKEN || 
                     (typeof window !== 'undefined' && (window as any).ADMIN_TOKEN)
  
  return token === adminToken
}
