import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { slugify } from "@/lib/utils";

interface ExtractedProduct {
  title: string;
  price: string;
  images: string[];
  videos: string[];
  description: string;
  amazonUrl: string;
}

interface AutoImportProductProps {
  onSuccess: () => void;
}

export default function AutoImportProduct({
  onSuccess,
}: AutoImportProductProps) {
  const [affiliateTag, setAffiliateTag] = useState("viralcart-20");
  const [extractedData, setExtractedData] = useState<ExtractedProduct | null>(
    null
  );
  const [affiliateUrl, setAffiliateUrl] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Listen for messages from bookmarklet
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Only accept messages from our bookmarklet
      if (event.data.type === "AMAZON_PRODUCT_DATA") {
        console.log("Received product data:", event.data.product);
        setExtractedData(event.data.product);
        setError(null);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const bookmarkletCode = `javascript:(function(){var d=document;var t=d.querySelector('span#productTitle')||d.querySelector('h1.product-title-word-break')||d.querySelector('.product-title');var p=d.querySelector('.a-price-whole')||d.querySelector('.a-price .a-offscreen')||d.querySelector('[data-a-color="price"]');var imgs=Array.from(d.querySelectorAll('#altImages img, #imageBlock img, .a-dynamic-image')).map(i=>i.src.replace(/\\._.*_\\./, '.')).filter((v,i,a)=>a.indexOf(v)===i&&v.includes('https')&&!v.includes('play-icon')).slice(0,6);var vids=Array.from(d.querySelectorAll('video source, [data-video-url]')).map(v=>v.src||v.dataset.videoUrl).filter(v=>v).slice(0,2);var desc=(d.querySelector('#feature-bullets')||d.querySelector('#productDescription')||{}).innerText||'';var data={title:t?t.innerText.trim():'',price:p?p.innerText.replace(/[^0-9.]/g,''):'',images:imgs,videos:vids,description:desc.substring(0,500),amazonUrl:window.location.href.split('?')[0]};window.open('${window.location.origin}/admin?token=viral-cart-admin-2025-secure-token&mode=import','_blank');setTimeout(()=>{window.opener?.postMessage({type:'AMAZON_PRODUCT_DATA',product:data},'${window.location.origin}')},1000);})();`;

  const handleUpload = async () => {
    if (!extractedData || !affiliateUrl) {
      setError("Please provide your Amazon affiliate link");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const productData = {
        title: extractedData.title,
        slug: slugify(extractedData.title),
        description: extractedData.description,
        price: extractedData.price,
        affiliate_url: affiliateUrl,
        images: extractedData.images,
        videos: extractedData.videos.length > 0 ? extractedData.videos : null,
        tags: [],
        available_countries: ["US"],
        category: category || "Featured",
      };

      const { error: insertError } = await supabase
        .from("products")
        .insert([productData]);

      if (insertError) throw insertError;

      setSuccess(true);
      setExtractedData(null);
      setAffiliateUrl("");
      setCategory("");
      onSuccess();

      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      console.error("Error uploading product:", err);
      setError(err.message || "Failed to upload product");
    } finally {
      setLoading(false);
    }
  };

  const copyBookmarklet = () => {
    navigator.clipboard.writeText(bookmarkletCode);
    alert(
      "📋 Bookmarklet copied! Now create a bookmark and paste this as the URL"
    );
  };

  return (
    <div className="max-w-4xl">
      {!extractedData && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-bold mb-2">Auto-Import from Amazon</h2>
          <p className="text-sm text-gray-600 mb-6">
            Extract product data automatically while browsing Amazon
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
            <p className="text-sm font-medium mb-3">Setup Instructions:</p>
            <ol className="text-sm text-gray-700 space-y-2 list-decimal list-inside">
              <li>Click "Copy Bookmarklet" below</li>
              <li>Right-click bookmarks bar → Add bookmark</li>
              <li>Name: "Import to ViralCart"</li>
              <li>Paste as URL → Save</li>
            </ol>
          </div>

          <div className="bg-white border border-gray-300 rounded p-3 mb-3">
            <code className="text-xs text-gray-600 break-all block max-h-16 overflow-y-auto">
              {bookmarkletCode}
            </code>
          </div>

          <button
            onClick={copyBookmarklet}
            className="w-full bg-accent hover:bg-accent/90 text-white py-2.5 rounded font-medium mb-4"
          >
            Copy Bookmarklet
          </button>

          <div className="bg-blue-50 border border-blue-200 rounded p-3">
            <p className="text-sm text-gray-700">
              <strong>Usage:</strong> Go to any Amazon product → Click your
              bookmark → Paste affiliate link → Upload
            </p>
          </div>

          {/* Step 2: Usage */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
            <h3 className="text-lg font-bold text-green-900 mb-3 flex items-center gap-2">
              <span className="bg-green-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm">
                2
              </span>
              How to Use
            </h3>

            <ol className="space-y-3 text-sm text-green-800">
              <li className="flex items-start gap-3">
                <span className="font-bold text-green-600">1.</span>
                <span>Go to any Amazon product page you want to add</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-green-600">2.</span>
                <span>
                  Click the "📦 Import to ViralCart" bookmark you created
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-green-600">3.</span>
                <span>
                  A new tab will open here with all product data extracted!
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-green-600">4.</span>
                <span>Paste your affiliate link and click Upload</span>
              </li>
            </ol>
          </div>

          {/* Affiliate Tag Setting */}
          <div className="mt-6 bg-purple-50 border border-purple-200 rounded-lg p-4">
            <label className="label text-purple-900">
              Your Amazon Affiliate Tag (for quick conversion)
            </label>
            <input
              type="text"
              value={affiliateTag}
              onChange={(e) => setAffiliateTag(e.target.value)}
              className="input"
              placeholder="your-tag-20"
            />
            <p className="text-xs text-purple-700 mt-2">
              💡 We'll show you how to get your affiliate link quickly
            </p>
          </div>
        </div>
      )}

      {extractedData && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Product Extracted</h2>
            <button
              onClick={() => setExtractedData(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded mb-4 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-3 py-2 rounded mb-4 text-sm">
              Product uploaded successfully!
            </div>
          )}

          {/* Preview */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
            <h3 className="font-bold mb-3">Extracted Data:</h3>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs font-medium text-gray-600 mb-1">Title:</p>
                <p className="text-sm font-semibold">{extractedData.title}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-600 mb-1">Price:</p>
                <p className="text-sm font-semibold text-green-600">
                  ${extractedData.price}
                </p>
              </div>
            </div>

            {extractedData.description && (
              <div className="mb-4">
                <p className="text-xs font-medium text-gray-600 mb-1">
                  Description:
                </p>
                <p className="text-xs text-gray-700 line-clamp-3">
                  {extractedData.description}
                </p>
              </div>
            )}

            <div className="mb-4">
              <p className="text-xs font-medium text-gray-600 mb-2">
                Images: {extractedData.images.length} found
              </p>
              <div className="flex gap-2 overflow-x-auto">
                {extractedData.images.slice(0, 5).map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt=""
                    className="w-16 h-16 object-cover rounded border"
                  />
                ))}
              </div>
            </div>

            {extractedData.videos.length > 0 && (
              <div>
                <p className="text-xs font-medium text-gray-600 mb-1">
                  Videos: {extractedData.videos.length} found ✅
                </p>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <div className="bg-blue-50 border border-blue-200 rounded p-3">
              <p className="text-sm text-gray-700 mb-2">
                <strong>Next:</strong> Get your affiliate link from Amazon
                Associates
              </p>
              <a
                href="https://affiliate-program.amazon.com/home/productlinks"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline"
              >
                Open Amazon Associates →
              </a>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Amazon Affiliate Link *
              </label>
              <input
                type="url"
                value={affiliateUrl}
                onChange={(e) => setAffiliateUrl(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="https://www.amazon.com/dp/B08...?tag=your-tag-20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Electronics, Fashion, etc."
              />
            </div>

            <button
              onClick={handleUpload}
              disabled={loading || !affiliateUrl}
              className="w-full bg-accent hover:bg-accent/90 text-white py-3 rounded font-medium disabled:opacity-50"
            >
              {loading ? "Uploading..." : "Upload Product"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
