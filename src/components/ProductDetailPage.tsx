import { useState, useEffect } from "react";
import { Product } from "@/lib/supabase";

interface ProductDetailPageProps {
  product: Product;
  onClose: () => void;
}

export default function ProductDetailPage({
  product,
  onClose,
}: ProductDetailPageProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [activeTab, setActiveTab] = useState<"images" | "videos">("images");

  const hasVideos = product.videos && product.videos.length > 0;
  const mediaItems =
    activeTab === "images" ? product.images : product.videos || [];

  // Auto-slide images every 3 seconds
  useEffect(() => {
    if (activeTab === "images" && product.images.length > 1) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % product.images.length);
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [product.images.length, activeTab]);

  // Reset slide when switching tabs
  useEffect(() => {
    setCurrentSlide(0);
  }, [activeTab]);

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

    if (isLeftSwipe && currentSlide < mediaItems.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    }
    if (isRightSwipe && currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  const handleOrderClick = () => {
    window.open(product.affiliate_url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3 flex items-center">
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-full transition"
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h1 className="ml-3 text-base font-semibold text-gray-900 truncate flex-1">
          Product Details
        </h1>
      </div>

      {/* Media Tabs */}
      {hasVideos && (
        <div className="flex border-b border-gray-200 bg-white sticky top-[52px] z-10">
          <button
            onClick={() => setActiveTab("images")}
            className={`flex-1 px-4 py-3 text-sm font-medium transition ${
              activeTab === "images"
                ? "text-accent border-b-2 border-accent"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Images ({product.images.length})
          </button>
          <button
            onClick={() => setActiveTab("videos")}
            className={`flex-1 px-4 py-3 text-sm font-medium transition ${
              activeTab === "videos"
                ? "text-accent border-b-2 border-accent"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Videos ({product.videos?.length || 0})
          </button>
        </div>
      )}

      {/* Media Slider */}
      <div
        className="relative w-full h-[300px] sm:h-[400px] bg-gray-100"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {mediaItems.map((item, index) => (
            <div
              key={index}
              className="min-w-full h-full flex items-center justify-center bg-white"
            >
              {activeTab === "images" ? (
                <img
                  src={item}
                  alt={`${product.title} - ${index + 1}`}
                  className="w-full h-full object-contain"
                />
              ) : (
                <video
                  src={item}
                  controls
                  className="w-full h-full"
                  playsInline
                >
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          ))}
        </div>

        {/* Dots Indicator */}
        {mediaItems.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {mediaItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-1.5 rounded-full transition-all ${
                  index === currentSlide ? "bg-accent w-6" : "bg-gray-400 w-1.5"
                }`}
              />
            ))}
          </div>
        )}

        {/* Navigation Arrows (Desktop) */}
        {mediaItems.length > 1 && (
          <>
            <button
              onClick={() => setCurrentSlide((prev) => Math.max(0, prev - 1))}
              disabled={currentSlide === 0}
              className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center bg-white/90 hover:bg-white rounded-full shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg
                className="w-5 h-5 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={() =>
                setCurrentSlide((prev) =>
                  Math.min(mediaItems.length - 1, prev + 1)
                )
              }
              disabled={currentSlide === mediaItems.length - 1}
              className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center bg-white/90 hover:bg-white rounded-full shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg
                className="w-5 h-5 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Product Info */}
      <div className="px-4 py-5">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          {product.title}
        </h2>
        <p className="text-2xl font-bold text-accent mb-4">${product.price}</p>

        {product.category && (
          <div className="mb-4">
            <span className="inline-block px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
              {product.category}
            </span>
          </div>
        )}

        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">
            Description
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
            {product.description}
          </p>
        </div>

        {product.tags && product.tags.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky Order Button */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 px-4 py-3 shadow-lg">
        <button
          onClick={handleOrderClick}
          className="w-full bg-accent hover:bg-accent/90 text-white font-semibold py-3.5 px-6 rounded-lg transition flex items-center justify-center gap-2"
        >
          <span>Order on Amazon</span>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
