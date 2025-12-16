export default function Footer() {
  return (
    <footer className="bg-gray-100 py-8 px-4 mt-12">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-sm text-gray-600 mb-3">
          <strong>Affiliate Disclosure:</strong> As an Amazon Associate we earn
          from qualifying purchases at no extra cost to you.
        </p>
        <p className="text-xs text-gray-500 mb-4">
          © 2025 Viral Cart. All rights reserved.
        </p>
        <div className="flex justify-center gap-4 text-xs text-gray-500">
          <a href="#privacy" className="hover:text-accent">
            Privacy
          </a>
          <span>•</span>
          <a href="#terms" className="hover:text-accent">
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
}
