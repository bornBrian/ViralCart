import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface Product {
  id: string
  title: string
  slug: string
  description: string
  price: string
  affiliate_url: string
  images: string[]
  tags: string[]
  available_countries: string[]
  created_at: string
}

export interface ProductClick {
  id: number
  product_id: string
  created_at: string
  country: string | null
}

export interface AnalyticsData {
  total_clicks: number
  clicks_by_product: Array<{
    product_id: string
    product_title: string
    click_count: number
  }>
  recent_trend: Array<{
    date: string
    clicks: number
  }>
}
