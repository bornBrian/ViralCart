import { useState, useEffect } from 'react'

interface HeroProps {
  onCTAClick: () => void
}

export default function Hero({ onCTAClick }: HeroProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Trigger animation on mount
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-6 py-20 md:py-24 overflow-hidden">
      {/* Sophisticated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-warm-white via-accent-light/30 to-soft-white" />
      
      {/* Organic blob shapes */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-200/20 rounded-full blur-3xl" />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M0 0h1v1H0V0zm10 0h1v1h-1V0zm10 0h1v1h-1V0zm10 0h1v1h-1V0zm10 0h1v1h-1V0zm10 0h1v1h-1V0zm10 0h1v1h-1V0zm10 0h1v1h-1V0z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      <div className="relative max-w-6xl mx-auto text-center">
        {/* Main headline */}
        <h1 
          className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[0.95] tracking-tighter-xl transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          Curated Amazon Finds —{' '}
          <span className="text-gradient block mt-3">
            Tested & Trusted
          </span>
        </h1>

        {/* Subline */}
        <p 
          className={`text-xl sm:text-2xl md:text-3xl text-text-muted max-w-3xl mx-auto mb-12 font-light leading-relaxed transition-all duration-1000 delay-150 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
          style={{ letterSpacing: '-0.01em' }}
        >
          Handpicked products that actually work.<br className="hidden sm:block" /> No fluff, just quality items we've tested.
        </p>

        {/* CTA Button with sophisticated animation */}
        <button
          onClick={onCTAClick}
          className={`group relative px-8 py-4 text-lg font-medium text-white bg-charcoal hover:bg-charcoal-light rounded-full inline-flex items-center gap-3 overflow-hidden transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
          style={{ 
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
          aria-label="View today's curated product picks"
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 14px rgba(0, 0, 0, 0.1)';
          }}
        >
          <span className="relative z-10">See Today's Picks</span>
          <svg 
            className="w-5 h-5 relative z-10 group-hover:translate-y-0.5 transition-transform" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2.5} 
              d="M19 9l-7 7-7-7"
            />
          </svg>
          <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/10 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </button>

        {/* Trust badge */}
        <div 
          className={`mt-12 inline-flex items-center gap-2 text-sm text-text-muted transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>Every product personally tested</span>
        </div>
      </div>
    </section>
  )
}
