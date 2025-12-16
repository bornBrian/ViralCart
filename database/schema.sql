-- Viral Cart Database Schema for Supabase (PostgreSQL)
-- Run these commands in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Products table
CREATE TABLE products (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  price text,
  affiliate_url text NOT NULL,
  images text[], -- array of image URLs
  videos text[], -- array of video URLs (optional)
  tags text[],
  available_countries text[],
  category text, -- product category
  created_at timestamptz DEFAULT now()
);

-- Add index on slug for faster lookups
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_created_at ON products(created_at DESC);

-- Clicks table for analytics
CREATE TABLE clicks (
  id bigserial PRIMARY KEY,
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  country text NULL
);

-- Add indexes for analytics queries
CREATE INDEX idx_clicks_product_id ON clicks(product_id);
CREATE INDEX idx_clicks_created_at ON clicks(created_at DESC);
CREATE INDEX idx_clicks_product_created ON clicks(product_id, created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE clicks ENABLE ROW LEVEL SECURITY;

-- Public read access for products
CREATE POLICY "Public can view products"
  ON products FOR SELECT
  USING (true);

-- Allow authenticated users (admin) to insert/update/delete products
CREATE POLICY "Authenticated users can manage products"
  ON products FOR ALL
  USING (auth.role() = 'authenticated');

-- Public can insert clicks (for tracking)
CREATE POLICY "Anyone can insert clicks"
  ON clicks FOR INSERT
  WITH CHECK (true);

-- Only authenticated users can view clicks (admin analytics)
CREATE POLICY "Authenticated users can view clicks"
  ON clicks FOR SELECT
  USING (auth.role() = 'authenticated');

-- Comments for documentation
COMMENT ON TABLE products IS 'Amazon affiliate products catalog';
COMMENT ON TABLE clicks IS 'Click tracking for analytics';
COMMENT ON COLUMN clicks.country IS 'ISO country code from IP geolocation (optional)';
