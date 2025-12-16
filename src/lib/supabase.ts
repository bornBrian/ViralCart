import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://iylsmwivoxdbivzuiksk.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5bHNtd2l2b3hkYml2enVpa3NrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU4MTEwMTgsImV4cCI6MjA4MTM4NzAxOH0.j3SHcf4h631q-zwAYVh526mBZRFHwuTcK6_C_0JmcZA'

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
