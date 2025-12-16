import { useState } from "react";
import { supabase, Product } from "@/lib/supabase";
import { slugify } from "@/lib/utils";

interface ProductEditModalProps {
  product: Product;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ProductEditModal({
  product,
  onClose,
  onSuccess,
}: ProductEditModalProps) {
  const [formData, setFormData] = useState({
    title: product.title,
    description: product.description || "",
    price: product.price || "",
    affiliate_url: product.affiliate_url,
    tags: product.tags?.join(", ") || "",
    available_countries: product.available_countries?.join(", ") || "US",
    category: product.category || "",
  });
  const [imageUrls, setImageUrls] = useState<string[]>(product.images || [""]);
  const [videoUrls, setVideoUrls] = useState<string[]>(product.videos || [""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUrlChange = (index: number, value: string) => {
    const newUrls = [...imageUrls];
    newUrls[index] = value;
    setImageUrls(newUrls);
  };

  const addImageUrlField = () => {
    setImageUrls([...imageUrls, ""]);
  };

  const removeImageUrlField = (index: number) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index));
  };

  const handleVideoUrlChange = (index: number, value: string) => {
    const newUrls = [...videoUrls];
    newUrls[index] = value;
    setVideoUrls(newUrls);
  };

  const addVideoUrlField = () => {
    setVideoUrls([...videoUrls, ""]);
  };

  const removeVideoUrlField = (index: number) => {
    setVideoUrls(videoUrls.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!formData.title || !formData.affiliate_url) {
        throw new Error("Title and affiliate URL are required");
      }

      const validImages = imageUrls.filter((url) => url.trim() !== "");
      const validVideos = videoUrls.filter((url) => url.trim() !== "");

      const productData = {
        title: formData.title,
        slug: slugify(formData.title),
        description: formData.description,
        price: formData.price,
        affiliate_url: formData.affiliate_url,
        images: validImages,
        videos: validVideos.length > 0 ? validVideos : null,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        available_countries: formData.available_countries
          .split(",")
          .map((c) => c.trim()),
        category: formData.category || null,
      };

      const { error: updateError } = await supabase
        .from("products")
        .update(productData)
        .eq("id", product.id);

      if (updateError) throw updateError;

      onSuccess();
    } catch (err: any) {
      console.error("Error updating product:", err);
      setError(err.message || "Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full my-8">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl flex items-center justify-between">
          <h2 className="text-xl font-bold">Edit Product</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-6 max-h-[calc(100vh-12rem)] overflow-y-auto">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="label">
                Product Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="input"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="label">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="input min-h-[120px]"
              />
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price" className="label">
                Price
              </label>
              <input
                type="text"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="input"
                placeholder="$99.99"
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="label">
                Category
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="input"
                placeholder="Electronics, Fashion, etc."
              />
            </div>

            {/* Affiliate URL */}
            <div>
              <label htmlFor="affiliate_url" className="label">
                Amazon Affiliate URL *
              </label>
              <input
                type="url"
                id="affiliate_url"
                name="affiliate_url"
                value={formData.affiliate_url}
                onChange={handleInputChange}
                className="input"
                required
              />
            </div>

            {/* Image URLs */}
            <div>
              <label className="label">Product Images (URLs)</label>
              <div className="space-y-2">
                {imageUrls.map((url, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="url"
                      value={url}
                      onChange={(e) =>
                        handleImageUrlChange(index, e.target.value)
                      }
                      className="input"
                      placeholder="https://example.com/image.jpg"
                    />
                    {imageUrls.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeImageUrlField(index)}
                        className="px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addImageUrlField}
                  className="text-accent hover:underline text-sm"
                >
                  + Add another image
                </button>
              </div>
            </div>

            {/* Video URLs */}
            <div>
              <label className="label">Product Videos (URLs) - Optional</label>
              <div className="space-y-2">
                {videoUrls.map((url, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="url"
                      value={url}
                      onChange={(e) =>
                        handleVideoUrlChange(index, e.target.value)
                      }
                      className="input"
                      placeholder="https://example.com/video.mp4"
                    />
                    {videoUrls.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeVideoUrlField(index)}
                        className="px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addVideoUrlField}
                  className="text-accent hover:underline text-sm"
                >
                  + Add another video
                </button>
              </div>
            </div>

            {/* Tags */}
            <div>
              <label htmlFor="tags" className="label">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                className="input"
                placeholder="electronics, wireless, audio"
              />
            </div>

            {/* Countries */}
            <div>
              <label htmlFor="available_countries" className="label">
                Available Countries (comma-separated)
              </label>
              <input
                type="text"
                id="available_countries"
                name="available_countries"
                value={formData.available_countries}
                onChange={handleInputChange}
                className="input"
                placeholder="US, UK, CA"
              />
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Updating..." : "Update Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
