export default function Footer() {
  return (
    <footer className="bg-charcoal text-white py-16 px-6 mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent to-emerald-600 flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold" style={{ letterSpacing: '-0.03em' }}>Viral Cart</h3>
            </div>
            <p className="text-gray-400 text-base leading-relaxed font-light">
              Curated Amazon finds, tested and trusted. We personally vet every product for quality and value.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold mb-4 text-lg" style={{ letterSpacing: '-0.01em' }}>Quick Links</h4>
            <ul className="space-y-3 text-base">
              <li>
                <a href="#products" className="text-gray-400 hover:text-accent transition-colors duration-200 inline-flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-accent transition-colors" />
                  Products
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-accent transition-colors duration-200 inline-flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-accent transition-colors" />
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-accent transition-colors duration-200 inline-flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-accent transition-colors" />
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4 text-lg" style={{ letterSpacing: '-0.01em' }}>Legal</h4>
            <ul className="space-y-3 text-base">
              <li>
                <a href="#privacy" className="text-gray-400 hover:text-accent transition-colors duration-200 inline-flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-accent transition-colors" />
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="text-gray-400 hover:text-accent transition-colors duration-200 inline-flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-accent transition-colors" />
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Affiliate disclosure */}
        <div className="border-t border-charcoal-soft pt-12">
          <div className="bg-charcoal-soft/50 rounded-2xl p-6 mb-6 border border-charcoal-soft">
            <p className="text-sm text-gray-400 leading-relaxed font-light">
              <strong className="text-gray-200 font-medium">Affiliate Disclosure:</strong> As an Amazon Associate I earn from qualifying purchases. 
              This means when you click on links and make a purchase, we may receive a small commission at no extra cost to you. 
              We only recommend products we've personally tested and believe in.
            </p>
          </div>

          {/* Privacy notice */}
          <div className="bg-charcoal-soft/50 rounded-2xl p-6 mb-8 border border-charcoal-soft">
            <p className="text-sm text-gray-400 leading-relaxed font-light">
              <strong className="text-gray-200 font-medium">Privacy:</strong> We use minimal analytics to improve your experience. 
              We track product click data (product ID and timestamp) but do not collect personal information. 
              No cookies are used for tracking.
            </p>
          </div>

          {/* Copyright */}
          <p className="text-center text-sm text-gray-500 font-light" style={{ letterSpacing: '0.01em' }}>
            © {new Date().getFullYear()} Viral Cart. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
