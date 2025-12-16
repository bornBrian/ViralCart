import { useState } from "react";
import { Product, supabase } from "@/lib/supabase";
import ProductEditModal from "./ProductEditModal";

interface ProductListProps {
  products: Product[];
  onUpdate: () => void;
}

export default function ProductList({ products, onUpdate }: ProductListProps) {
  const [deleting, setDeleting] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleDelete = async (productId: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    setDeleting(productId);
    try {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", productId);

      if (error) throw error;

      onUpdate();
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Failed to delete product");
    } finally {
      setDeleting(null);
    }
  };

  const handleExportCSV = () => {
    // Create CSV content
    const headers = ["Title", "Price", "Affiliate URL", "Tags", "Created At"];
    const rows = products.map((p) => [
      p.title,
      p.price,
      p.affiliate_url,
      p.tags.join("; "),
      new Date(p.created_at).toLocaleDateString(),
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    // Download
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `products-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-text-muted mb-4">No products yet</p>
        <p className="text-sm text-text-muted">
          Upload your first product to get started
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">
          All Products ({products.length})
        </h2>
        <button onClick={handleExportCSV} className="btn-secondary text-sm">
          Export CSV
        </button>
      </div>

      <div className="space-y-4">
        {products.map((product) => (
          <div key={product.id} className="card flex items-start gap-4">
            {/* Thumbnail */}
            {product.images && product.images.length > 0 && (
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
              />
            )}

            {/* Details */}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg mb-1 truncate">
                {product.title}
              </h3>
              <p className="text-sm text-text-muted line-clamp-2 mb-2">
                {product.description}
              </p>
              <div className="flex items-center gap-4 text-sm">
                <span className="font-medium">{product.price}</span>
                {product.tags && product.tags.length > 0 && (
                  <div className="flex gap-1">
                    {product.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="bg-accent/10 text-accent px-2 py-0.5 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <a
                href={product.affiliate_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 text-sm text-accent hover:bg-accent/10 rounded-lg transition-colors"
              >
                View
              </a>
              <button
                onClick={() => setEditingProduct(product)}
                className="px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                disabled={deleting === product.id}
                className="px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
              >
                {deleting === product.id ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingProduct && (
        <ProductEditModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSuccess={() => {
            setEditingProduct(null);
            onUpdate();
          }}
        />
      )}
    </div>
  );
}
