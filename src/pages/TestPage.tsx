import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function TestPage() {
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const runTests = async () => {
    setLoading(true);
    const testResults: any = {};

    // Test 1: Environment Variables
    testResults.envVars = {
      SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL || "MISSING",
      SUPABASE_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY
        ? "EXISTS (length: " +
          import.meta.env.VITE_SUPABASE_ANON_KEY.length +
          ")"
        : "MISSING",
      ADMIN_TOKEN: import.meta.env.VITE_ADMIN_TOKEN || "MISSING",
    };

    // Test 2: Supabase Connection
    try {
      const { data, error } = await supabase
        .from("products")
        .select("count", { count: "exact", head: true });
      testResults.connection = {
        status: error ? "FAILED" : "SUCCESS",
        error: error?.message || null,
        count: data,
      };
    } catch (err: any) {
      testResults.connection = {
        status: "ERROR",
        error: err.message,
      };
    }

    // Test 3: Read Products
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .limit(1);
      testResults.readProducts = {
        status: error ? "FAILED" : "SUCCESS",
        error: error?.message || null,
        data: data,
      };
    } catch (err: any) {
      testResults.readProducts = {
        status: "ERROR",
        error: err.message,
      };
    }

    // Test 4: Try Insert (will fail due to missing fields, but shows permission error)
    try {
      const { data, error } = await supabase
        .from("products")
        .insert({
          title: "Test Product",
          slug: "test-product-" + Date.now(),
          affiliate_url: "https://amazon.com/test",
        })
        .select();

      testResults.insertProduct = {
        status: error ? "FAILED" : "SUCCESS",
        error: error?.message || null,
        details: error?.details || null,
        hint: error?.hint || null,
        data: data,
      };
    } catch (err: any) {
      testResults.insertProduct = {
        status: "ERROR",
        error: err.message,
      };
    }

    setResults(testResults);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Viral Cart Diagnostics</h1>

        <button
          onClick={runTests}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 mb-8"
        >
          {loading ? "Running Tests..." : "Run Diagnostic Tests"}
        </button>

        {results && (
          <div className="space-y-6">
            {/* Environment Variables */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">
                1. Environment Variables
              </h2>
              <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
                {JSON.stringify(results.envVars, null, 2)}
              </pre>
            </div>

            {/* Connection Test */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">2. Supabase Connection</h2>
              <div
                className={`p-4 rounded ${
                  results.connection.status === "SUCCESS"
                    ? "bg-green-100"
                    : "bg-red-100"
                }`}
              >
                <p className="font-bold">Status: {results.connection.status}</p>
                {results.connection.error && (
                  <p className="text-red-600 mt-2">
                    Error: {results.connection.error}
                  </p>
                )}
              </div>
            </div>

            {/* Read Test */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">3. Read Products Test</h2>
              <div
                className={`p-4 rounded ${
                  results.readProducts.status === "SUCCESS"
                    ? "bg-green-100"
                    : "bg-red-100"
                }`}
              >
                <p className="font-bold">
                  Status: {results.readProducts.status}
                </p>
                {results.readProducts.error && (
                  <p className="text-red-600 mt-2">
                    Error: {results.readProducts.error}
                  </p>
                )}
                {results.readProducts.data && (
                  <pre className="bg-gray-100 p-2 rounded mt-2 text-sm overflow-x-auto">
                    {JSON.stringify(results.readProducts.data, null, 2)}
                  </pre>
                )}
              </div>
            </div>

            {/* Insert Test */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">4. Insert Product Test</h2>
              <div
                className={`p-4 rounded ${
                  results.insertProduct.status === "SUCCESS"
                    ? "bg-green-100"
                    : "bg-red-100"
                }`}
              >
                <p className="font-bold">
                  Status: {results.insertProduct.status}
                </p>
                {results.insertProduct.error && (
                  <div className="mt-2">
                    <p className="text-red-600 font-bold">
                      Error: {results.insertProduct.error}
                    </p>
                    {results.insertProduct.details && (
                      <p className="text-red-600 text-sm mt-1">
                        Details: {results.insertProduct.details}
                      </p>
                    )}
                    {results.insertProduct.hint && (
                      <p className="text-orange-600 text-sm mt-1">
                        Hint: {results.insertProduct.hint}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Summary */}
            <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
              <h2 className="text-xl font-bold mb-4">Summary & Next Steps</h2>
              <div className="space-y-2">
                {results.connection.status !== "SUCCESS" && (
                  <p className="text-red-600">
                    ❌ Database connection failed. Check environment variables.
                  </p>
                )}
                {results.readProducts.status !== "SUCCESS" && (
                  <p className="text-red-600">
                    ❌ Cannot read products. Check RLS policies.
                  </p>
                )}
                {results.insertProduct.error?.includes("permission denied") && (
                  <p className="text-red-600">
                    ❌ Cannot insert products. RLS policy blocking. Run the
                    policy fix SQL.
                  </p>
                )}
                {results.insertProduct.error?.includes(
                  "new row violates row-level security"
                ) && (
                  <p className="text-red-600">
                    ❌ RLS policy is blocking inserts. Run this SQL in Supabase:
                    <pre className="bg-white p-2 rounded mt-2 text-xs">
                      DROP POLICY IF EXISTS "Authenticated users can manage
                      products" ON products; CREATE POLICY "Allow anon to manage
                      products" ON products FOR ALL USING (true) WITH CHECK
                      (true);
                    </pre>
                  </p>
                )}
                {results.connection.status === "SUCCESS" &&
                  results.readProducts.status === "SUCCESS" &&
                  results.insertProduct.status === "SUCCESS" && (
                    <p className="text-green-600">
                      ✅ All tests passed! Your setup is working correctly.
                    </p>
                  )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
