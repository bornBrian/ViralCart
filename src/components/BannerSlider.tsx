import { useState, useEffect } from "react";
import { supabase, Product } from "@/lib/supabase";

interface BannerSliderProps {
  banners: { image: string; title?: string; subtitle?: string }[];
  onSearch?: (query: string) => void;
  suggestions?: string[];
}

export default function BannerSlider({ banners, onSearch }: BannerSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<Product[]>([]);

  // Auto-slide every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }
    if (isRightSwipe) {
      setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim().length >= 2) {
      // Fetch suggestions from database
      const { data } = await supabase
        .from("products")
        .select("*")
        .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
        .limit(5);

      setSuggestions(data || []);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }

    if (onSearch) {
      onSearch(query);
    }
  };

  const handleSuggestionClick = (product: Product) => {
    setSearchQuery(product.title);
    setShowSuggestions(false);
    setSuggestions([]);
    if (onSearch) {
      onSearch(product.title);
    }
    // Dismiss keyboard
    (document.activeElement as HTMLElement)?.blur();
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuggestions(false);
    // Dismiss keyboard
    (document.activeElement as HTMLElement)?.blur();
  };

  return (
    <div className="bg-white">
      {/* Search Bar */}
      <div className="px-4 py-3 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search products..."
              className="w-full px-4 py-2.5 pl-10 pr-4 rounded-lg text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>

            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto">
                {suggestions.map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => handleSuggestionClick(product)}
                    className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-gray-50 border-b border-gray-100 last:border-0 text-left"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-10 h-10 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {product.title}
                      </p>
                      <p className="text-xs text-accent font-semibold">
                        ${product.price}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {showSuggestions &&
              searchQuery.trim().length >= 2 &&
              suggestions.length === 0 && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg px-4 py-3">
                  <p className="text-sm text-gray-500 text-center">
                    No products found
                  </p>
                </div>
              )}
          </form>
        </div>
      </div>

      {/* Banner Slider */}
      <div
        className="relative w-full h-[160px] sm:h-[200px] md:h-[260px] overflow-hidden bg-gray-100"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Slides */}
        <div
          className="flex transition-transform duration-500 ease-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {banners.map((banner, index) => (
            <div
              key={index}
              className="min-w-full h-full relative flex items-center justify-center"
            >
              <img
                src={banner.image}
                alt={banner.title || "Banner"}
                className="w-full h-full object-cover"
              />
              {banner.title && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4 md:p-6">
                  <h3 className="text-white text-base md:text-xl font-bold mb-1">
                    {banner.title}
                  </h3>
                  {banner.subtitle && (
                    <p className="text-white/90 text-xs md:text-sm">
                      {banner.subtitle}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Dots Indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-1.5 rounded-full transition-all ${
                index === currentSlide ? "bg-white w-6" : "bg-white/50 w-1.5"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
