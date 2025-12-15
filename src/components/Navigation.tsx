import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const isAdmin = location.pathname.includes('/admin')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (isAdmin) return null // Don't show nav on admin pages

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/80 backdrop-blur-xl shadow-sm py-4' 
          : 'bg-transparent py-6'
      }`}
      style={{
        borderBottom: scrolled ? '1px solid rgba(0, 0, 0, 0.06)' : '1px solid transparent'
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="group flex items-center gap-2.5"
          aria-label="Viral Cart home"
        >
          <div className={`w-9 h-9 rounded-full bg-gradient-to-br from-accent to-emerald-600 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 ${
            scrolled ? 'shadow-md' : 'shadow-lg'
          }`}>
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span 
            className="text-xl font-bold text-charcoal group-hover:text-accent transition-colors"
            style={{ letterSpacing: '-0.03em' }}
          >
            Viral Cart
          </span>
        </Link>

        {/* Navigation items */}
        <div className="flex items-center gap-8">
          <a 
            href="#products" 
            className="text-sm font-medium text-charcoal-soft hover:text-charcoal transition-colors relative group hidden sm:block"
            style={{ letterSpacing: '0.01em' }}
          >
            Products
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
          </a>
          
          <a 
            href="#about" 
            className="text-sm font-medium text-charcoal-soft hover:text-charcoal transition-colors relative group hidden sm:block"
            style={{ letterSpacing: '0.01em' }}
          >
            About
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
          </a>

          {/* Newsletter CTA */}
          <button 
            className="bg-charcoal hover:bg-charcoal-light text-white text-sm font-medium px-5 py-2.5 rounded-full transition-all duration-300 hover:shadow-lg active:scale-95"
            style={{ letterSpacing: '0.01em' }}
            onClick={() => {
              // Placeholder for newsletter signup
              alert('Newsletter signup coming soon!')
            }}
          >
            Get Updates
          </button>
        </div>
      </div>
    </nav>
  )
}
