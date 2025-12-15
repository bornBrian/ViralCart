-- Example Analytics Queries for Supabase
-- Use these in your admin dashboard or SQL editor

-- 1. Total clicks across all products
SELECT COUNT(*) as total_clicks
FROM clicks;

-- 2. Clicks per product (with product details)
SELECT 
  p.id,
  p.title,
  p.price,
  COUNT(c.id) as click_count
FROM products p
LEFT JOIN clicks c ON p.id = c.product_id
GROUP BY p.id, p.title, p.price
ORDER BY click_count DESC;

-- 3. Top 10 most clicked products
SELECT 
  p.title,
  COUNT(c.id) as clicks
FROM products p
LEFT JOIN clicks c ON p.id = c.product_id
GROUP BY p.id, p.title
ORDER BY clicks DESC
LIMIT 10;

-- 4. Clicks in the last 30 days
SELECT COUNT(*) as recent_clicks
FROM clicks
WHERE created_at >= NOW() - INTERVAL '30 days';

-- 5. Daily click trend (last 30 days)
SELECT 
  DATE(created_at) as date,
  COUNT(*) as clicks
FROM clicks
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- 6. Clicks by country (if tracking)
SELECT 
  COALESCE(country, 'Unknown') as country,
  COUNT(*) as clicks
FROM clicks
GROUP BY country
ORDER BY clicks DESC;

-- 7. Product performance with country breakdown
SELECT 
  p.title,
  COALESCE(c.country, 'Unknown') as country,
  COUNT(c.id) as clicks
FROM products p
LEFT JOIN clicks c ON p.id = c.product_id
GROUP BY p.title, c.country
ORDER BY clicks DESC;

-- 8. Recent clicks (last 100)
SELECT 
  p.title,
  c.created_at,
  c.country
FROM clicks c
JOIN products p ON c.product_id = p.id
ORDER BY c.created_at DESC
LIMIT 100;

-- 9. Products with no clicks
SELECT 
  p.id,
  p.title,
  p.created_at
FROM products p
LEFT JOIN clicks c ON p.id = c.product_id
WHERE c.id IS NULL
ORDER BY p.created_at DESC;

-- 10. Average clicks per product
SELECT 
  AVG(click_count) as avg_clicks_per_product
FROM (
  SELECT 
    p.id,
    COUNT(c.id) as click_count
  FROM products p
  LEFT JOIN clicks c ON p.id = c.product_id
  GROUP BY p.id
) subquery;

-- 11. Click rate by day of week
SELECT 
  TO_CHAR(created_at, 'Day') as day_of_week,
  COUNT(*) as clicks
FROM clicks
GROUP BY TO_CHAR(created_at, 'Day'), EXTRACT(DOW FROM created_at)
ORDER BY EXTRACT(DOW FROM created_at);

-- 12. Monthly click trend
SELECT 
  DATE_TRUNC('month', created_at) as month,
  COUNT(*) as clicks
FROM clicks
GROUP BY DATE_TRUNC('month', created_at)
ORDER BY month DESC;

-- 13. Product conversion funnel (views vs clicks)
-- Note: This requires adding a 'views' table if you want to track page views
-- For now, we only have clicks

-- 14. Get sparkline data for a specific product (last 30 days)
WITH date_series AS (
  SELECT generate_series(
    CURRENT_DATE - INTERVAL '29 days',
    CURRENT_DATE,
    '1 day'::interval
  )::date AS date
)
SELECT 
  ds.date,
  COUNT(c.id) as clicks
FROM date_series ds
LEFT JOIN clicks c ON DATE(c.created_at) = ds.date 
  AND c.product_id = 'YOUR-PRODUCT-UUID-HERE'
GROUP BY ds.date
ORDER BY ds.date;

-- 15. Export data for CSV
SELECT 
  p.title as "Product Title",
  p.price as "Price",
  COUNT(c.id) as "Total Clicks",
  MAX(c.created_at) as "Last Click",
  p.affiliate_url as "Affiliate URL"
FROM products p
LEFT JOIN clicks c ON p.id = c.product_id
GROUP BY p.id, p.title, p.price, p.affiliate_url
ORDER BY "Total Clicks" DESC;
