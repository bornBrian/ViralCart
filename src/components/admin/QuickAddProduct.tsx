import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { slugify } from "@/lib/utils";

interface QuickAddProductProps {
  onSuccess: () => void;
}

export default function QuickAddProduct({ onSuccess }: QuickAddProductProps) {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    amazonUrl: "",
    affiliateTag: "viralcart-20", // Default tag, user can change
    imageUrls: "",
    category: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const convertToAffiliateLink = (url: string, tag: string): string => {
    try {
      const urlObj = new URL(url);
      // Remove existing tag parameters
      urlObj.searchParams.delete("tag");
      urlObj.searchParams.delete("linkCode");
      // Add affiliate tag
      urlObj.searchParams.set("tag", tag);
      return urlObj.toString();
    } catch {
      return url;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      if (!formData.title || !formData.amazonUrl) {
        throw new Error("Title and Amazon URL are required");
      }

      // Convert Amazon URL to affiliate link
      const affiliateUrl = convertToAffiliateLink(
        formData.amazonUrl,
        formData.affiliateTag
      );

      // Parse image URLs (comma, space, or newline separated)
      const imageArray = formData.imageUrls
        .split(/[,\n]/)
        .map((url) => url.trim())
        .filter((url) => url.length > 0);

      if (imageArray.length === 0) {
        throw new Error("At least one image URL is required");
      }

      const productData = {
        title: formData.title,
        slug: slugify(formData.title),
        description: "", // Optional, can be added later via Edit
        price: formData.price || "0.00",
        affiliate_url: affiliateUrl,
        images: imageArray,
        videos: null,
        tags: [],
        available_countries: ["US"],
        category: formData.category || "Featured",
      };

      const { error: insertError } = await supabase
        .from("products")
        .insert([productData]);

      if (insertError) throw insertError;

      setSuccess(true);

      // Reset form
      setFormData({
        title: "",
        price: "",
        amazonUrl: "",
        affiliateTag: formData.affiliateTag, // Keep the tag
        imageUrls: "",
        category: "",
      });

      onSuccess();

      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      console.error("Error uploading product:", err);
      setError(err.message || "Failed to upload product");
    } finally {
      setLoading(false);
    }
  };

  const generateAffiliatePreview = () => {
    if (!formData.amazonUrl) return "";
    return convertToAffiliateLink(formData.amazonUrl, formData.affiliateTag);
  };

  return (
    <div className="max-w-4xl">
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Quick Add Product</h2>
            <p className="text-sm text-gray-600 mt-1">
              Fast workflow for adding products
            </p>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
            Product added successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Affiliate Tag */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <label
              htmlFor="affiliateTag"
              className="block text-sm font-medium mb-2"
            >
              Your Amazon Affiliate Tag
            </label>
            <input
              type="text"
              id="affiliateTag"
              name="affiliateTag"
              value={formData.affiliateTag}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="your-tag-20"
            />
            <p className="text-xs text-gray-600 mt-2">
              Set your affiliate tag once, it will be saved for future products
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Product Title */}
            <div>
              <label htmlFor="title" className="label">
                Product Title *{" "}
                <span className="text-xs text-gray-500">
                  (copy from Amazon)
                </span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="input"
                required
                placeholder="Premium Wireless Headphones..."
              />
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price" className="label">
                Price <span className="text-xs text-gray-500">(optional)</span>
              </label>
              <input
                type="text"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="input"
                placeholder="29.99"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="label">
              Category{" "}
              <span className="text-xs text-gray-500">
                (e.g., Electronics, Fashion)
              </span>
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="input"
              placeholder="Electronics"
            />
          </div>

          {/* Amazon URL */}
          <div>
            <label htmlFor="amazonUrl" className="label">
              Amazon Product URL *
            </label>
            <input
              type="url"
              id="amazonUrl"
              name="amazonUrl"
              value={formData.amazonUrl}
              onChange={handleInputChange}
              className="input"
              required
              placeholder="https://www.amazon.com/dp/B08..."
            />
            {formData.amazonUrl && (
              <div className="mt-2 p-3 bg-gray-50 border border-gray-200 rounded">
                <p className="text-xs font-medium text-gray-700 mb-1">
                  Your Affiliate Link:
                </p>
                <p className="text-xs text-gray-600 break-all font-mono">
                  {generateAffiliatePreview()}
                </p>
              </div>
            )}
          </div>

          {/* Image URLs - Bulk */}
          <div>
            <label htmlFor="imageUrls" className="label">
              Image URLs *{" "}
              <span className="text-xs text-gray-500">
                (paste all at once, separated by commas or new lines)
              </span>
            </label>
            <textarea
              id="imageUrls"
              name="imageUrls"
              value={formData.imageUrls}
              onChange={handleInputChange}
              className="input min-h-[120px] font-mono text-sm"
              required
              placeholder="https://example.com/image1.jpg,
https://example.com/image2.jpg,
https://example.com/image3.jpg"
            />
            <p className="text-xs text-gray-600 mt-2">
              Right-click Amazon product images → Copy image address → Paste
              here (one per line or comma-separated)
            </p>
          </div>

          {/* Preview Image Count */}
          {formData.imageUrls && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
              <p className="text-sm font-medium text-gray-700">
                {
                  formData.imageUrls.split(/[,\n]/).filter((url) => url.trim())
                    .length
                }{" "}
                images will be added
              </p>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed text-lg py-4"
          >
            {loading ? "Adding Product..." : "Add Product"}
          </button>

          <p className="text-xs text-gray-500 text-center">
            You can edit full details (description, tags, videos) later using
            the Edit button
          </p>
        </form>
      </div>

      {/* Quick Tips */}
      <div className="mt-6 grid md:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-2">1. Copy Title</h3>
          <p className="text-xs text-gray-600">
            From Amazon product page, copy the product title
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-2">2. Get Images</h3>
          <p className="text-xs text-gray-600">
            Right-click product images → "Copy image address" → Paste all at
            once
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-2">3. Paste URL</h3>
          <p className="text-xs text-gray-600">
            Copy Amazon URL from address bar → Auto-converts to affiliate link
          </p>
        </div>
      </div>
    </div>
  );
}
