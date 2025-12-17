import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { supabase, Product } from "@/lib/supabase";
import AutoImportProduct from "@/components/admin/AutoImportProduct";
import QuickAddProduct from "@/components/admin/QuickAddProduct";
import ProductUploadForm from "@/components/admin/ProductUploadForm";
import ProductList from "@/components/admin/ProductList";
import AnalyticsDashboard from "@/components/admin/AnalyticsDashboard";

export default function AdminPage() {
  const [searchParams] = useSearchParams();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "upload" | "products" | "analytics"
  >("upload");
  const [uploadMode, setUploadMode] = useState<"auto" | "quick" | "full">(
    "auto"
  );
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Check for admin token in URL
    const token = searchParams.get("token");
    const mode = searchParams.get("mode");
    // Hardcoded token as fallback (same as used before)
    const adminToken = "viral-cart-admin-2025-secure-token";

    if (token === adminToken) {
      setIsAuthenticated(true);
      // Optionally store in sessionStorage
      sessionStorage.setItem("admin_auth", "true");
    } else if (sessionStorage.getItem("admin_auth") === "true") {
      setIsAuthenticated(true);
    }

    // If mode=import, switch to auto-import mode
    if (mode === "import") {
      setActiveTab("upload");
      setUploadMode("auto");
    }
  }, [searchParams]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
    }
  }, [isAuthenticated]);

  async function fetchProducts() {
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setProducts(data);
  }

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    const adminToken = "viral-cart-admin-2025-secure-token";
    const currentUrl = window.location.origin + window.location.pathname;
    const authUrl = `${currentUrl}?token=${adminToken}`;

    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-soft-white">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Admin Access</h1>
            <p className="text-text-muted">Authentication required</p>
          </div>

          <div className="card space-y-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <p className="text-sm font-medium text-gray-900 mb-3">
                Click below to access admin panel:
              </p>
              <a
                href={authUrl}
                className="block w-full bg-accent hover:bg-accent-hover text-white font-medium py-3 px-4 rounded-lg text-center transition"
              >
                Enter Admin Panel
              </a>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-xs font-medium text-gray-700 mb-2">
                Or copy this link:
              </p>
              <code className="block bg-white px-3 py-2 rounded text-xs break-all border border-gray-300">
                {authUrl}
              </code>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link to="/" className="text-accent hover:underline text-sm">
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-soft-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1">Admin Dashboard</h1>
            <p className="text-text-muted">
              Manage products and view analytics
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-accent hover:underline">
              View Site
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm text-text-muted hover:text-charcoal"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("products")}
            className={`px-6 py-3 font-medium transition-colors border-b-2 ${
              activeTab === "products"
                ? "border-accent text-accent"
                : "border-transparent text-text-muted hover:text-charcoal"
            }`}
          >
            Products
          </button>
          <button
            onClick={() => setActiveTab("upload")}
            className={`px-6 py-3 font-medium transition-colors border-b-2 ${
              activeTab === "upload"
                ? "border-accent text-accent"
                : "border-transparent text-text-muted hover:text-charcoal"
            }`}
          >
            Upload New
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className={`px-6 py-3 font-medium transition-colors border-b-2 ${
              activeTab === "analytics"
                ? "border-accent text-accent"
                : "border-transparent text-text-muted hover:text-charcoal"
            }`}
          >
            Analytics
          </button>
        </div>

        {/* Content */}
        <div>
          {activeTab === "upload" && (
            <div>
              {/* Upload Mode Toggle */}
              <div className="flex gap-2 mb-6 justify-center flex-wrap">
                <button
                  onClick={() => setUploadMode("auto")}
                  className={`px-5 py-2.5 rounded-lg font-medium transition-all ${
                    uploadMode === "auto"
                      ? "bg-accent text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Auto-Import
                </button>
                <button
                  onClick={() => setUploadMode("quick")}
                  className={`px-5 py-2.5 rounded-lg font-medium transition-all ${
                    uploadMode === "quick"
                      ? "bg-accent text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Quick Add
                </button>
                <button
                  onClick={() => setUploadMode("full")}
                  className={`px-5 py-2.5 rounded-lg font-medium transition-all ${
                    uploadMode === "full"
                      ? "bg-accent text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Full Details
                </button>
              </div>

              {uploadMode === "auto" ? (
                <AutoImportProduct onSuccess={fetchProducts} />
              ) : uploadMode === "quick" ? (
                <QuickAddProduct onSuccess={fetchProducts} />
              ) : (
                <ProductUploadForm onSuccess={fetchProducts} />
              )}
            </div>
          )}
          {activeTab === "products" && (
            <ProductList products={products} onUpdate={fetchProducts} />
          )}
          {activeTab === "analytics" && (
            <AnalyticsDashboard products={products} />
          )}
        </div>
      </div>
    </div>
  );
}
