import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { slugify } from '@/lib/utils'

interface ProductUploadFormProps {
  onSuccess: () => void
}

export default function ProductUploadForm({ onSuccess }: ProductUploadFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    affiliate_url: '',
    tags: '',
    available_countries: 'US',
  })
  const [imageUrls, setImageUrls] = useState<string[]>([''])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleImageUrlChange = (index: number, value: string) => {
    const newUrls = [...imageUrls]
    newUrls[index] = value
    setImageUrls(newUrls)
  }

  const addImageUrlField = () => {
    setImageUrls([...imageUrls, ''])
  }

  const removeImageUrlField = (index: number) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      // Validate
      if (!formData.title || !formData.affiliate_url) {
        throw new Error('Title and affiliate URL are required')
      }

      // Filter out empty image URLs
      const validImages = imageUrls.filter((url) => url.trim() !== '')

      // Prepare data
      const productData = {
        title: formData.title,
        slug: slugify(formData.title),
        description: formData.description,
        price: formData.price,
        affiliate_url: formData.affiliate_url,
        images: validImages,
        tags: formData.tags.split(',').map((tag) => tag.trim()).filter(Boolean),
        available_countries: formData.available_countries.split(',').map((c) => c.trim()),
      }

      // Insert into Supabase
      const { error: insertError } = await supabase
        .from('products')
        .insert([productData])

      if (insertError) throw insertError

      setSuccess(true)
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        price: '',
        affiliate_url: '',
        tags: '',
        available_countries: 'US',
      })
      setImageUrls([''])
      
      onSuccess()
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000)
    } catch (err: any) {
      console.error('Error uploading product:', err)
      setError(err.message || 'Failed to upload product')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl">
      <div className="card">
        <h2 className="text-2xl font-bold mb-6">Upload New Product</h2>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
            Product uploaded successfully!
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
              placeholder="e.g., Premium Wireless Headphones"
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
              placeholder="Why this product is useful and worth buying..."
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
              placeholder="https://www.amazon.com/..."
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
                    onChange={(e) => handleImageUrlChange(index, e.target.value)}
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
            <p className="text-xs text-text-muted mt-2">
              Tip: Upload images to Supabase Storage or use direct URLs
            </p>
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

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Uploading...' : 'Upload Product'}
          </button>
        </form>
      </div>
    </div>
  )
}
