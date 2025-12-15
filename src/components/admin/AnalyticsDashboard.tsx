import { useState, useEffect } from 'react'
import { Product, supabase } from '@/lib/supabase'

interface AnalyticsDashboardProps {
  products: Product[]
}

interface ProductAnalytics {
  product_id: string
  product_title: string
  click_count: number
  recent_clicks: number[]
}

export default function AnalyticsDashboard({ products }: AnalyticsDashboardProps) {
  const [analytics, setAnalytics] = useState<ProductAnalytics[]>([])
  const [totalClicks, setTotalClicks] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics()
  }, [products])

  async function fetchAnalytics() {
    try {
      setLoading(true)

      // Get total clicks
      const { count: total } = await supabase
        .from('clicks')
        .select('*', { count: 'exact', head: true })

      setTotalClicks(total || 0)

      // Get clicks per product
      const analyticsData: ProductAnalytics[] = []

      for (const product of products) {
        // Total clicks for this product
        const { count: productClicks } = await supabase
          .from('clicks')
          .select('*', { count: 'exact', head: true })
          .eq('product_id', product.id)

        // Last 30 days clicks
        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

        const { data: recentData } = await supabase
          .from('clicks')
          .select('created_at')
          .eq('product_id', product.id)
          .gte('created_at', thirtyDaysAgo.toISOString())
          .order('created_at', { ascending: true })

        // Group by day for sparkline
        const dailyClicks = new Array(30).fill(0)
        if (recentData) {
          recentData.forEach((click) => {
            const date = new Date(click.created_at)
            const daysDiff = Math.floor(
              (new Date().getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
            )
            if (daysDiff >= 0 && daysDiff < 30) {
              dailyClicks[29 - daysDiff]++
            }
          })
        }

        analyticsData.push({
          product_id: product.id,
          product_title: product.title,
          click_count: productClicks || 0,
          recent_clicks: dailyClicks,
        })
      }

      // Sort by click count
      analyticsData.sort((a, b) => b.click_count - a.click_count)
      setAnalytics(analyticsData)
    } catch (err) {
      console.error('Error fetching analytics:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-text-muted">Loading analytics...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Summary card */}
      <div className="card">
        <h2 className="text-2xl font-bold mb-6">Analytics Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-text-muted mb-1">Total Clicks</p>
            <p className="text-3xl font-bold text-accent">{totalClicks}</p>
          </div>
          <div>
            <p className="text-sm text-text-muted mb-1">Total Products</p>
            <p className="text-3xl font-bold">{products.length}</p>
          </div>
          <div>
            <p className="text-sm text-text-muted mb-1">Avg Clicks/Product</p>
            <p className="text-3xl font-bold">
              {products.length > 0 ? Math.round(totalClicks / products.length) : 0}
            </p>
          </div>
        </div>
      </div>

      {/* Per-product analytics */}
      <div className="card">
        <h3 className="text-xl font-semibold mb-4">Performance by Product</h3>
        
        {analytics.length === 0 ? (
          <p className="text-text-muted text-center py-8">
            No click data yet. Share your products to start tracking!
          </p>
        ) : (
          <div className="space-y-4">
            {analytics.map((item) => (
              <div
                key={item.product_id}
                className="border border-gray-200 rounded-lg p-4 hover:border-accent/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold truncate">{item.product_title}</h4>
                    <p className="text-sm text-text-muted">
                      {item.click_count} {item.click_count === 1 ? 'click' : 'clicks'}
                    </p>
                  </div>
                  <span className="text-2xl font-bold text-accent ml-4">
                    {item.click_count}
                  </span>
                </div>

                {/* Sparkline */}
                <div className="flex items-end gap-0.5 h-12">
                  {item.recent_clicks.map((count, idx) => {
                    const maxClicks = Math.max(...item.recent_clicks, 1)
                    const height = (count / maxClicks) * 100
                    return (
                      <div
                        key={idx}
                        className="flex-1 bg-accent/20 hover:bg-accent/40 rounded-t transition-colors"
                        style={{ height: `${height}%` }}
                        title={`${count} clicks`}
                      />
                    )
                  })}
                </div>
                <p className="text-xs text-text-muted mt-2 text-center">
                  Last 30 days
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Data note */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> Analytics track only "Buy on Amazon" button clicks. 
          No personal data is collected. Data updates in real-time via serverless functions.
        </p>
      </div>
    </div>
  )
}
