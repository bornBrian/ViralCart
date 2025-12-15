-- Sample seed data for testing
-- Run this after creating your schema

-- Insert sample products
INSERT INTO products (title, slug, description, price, affiliate_url, images, tags, available_countries) VALUES
(
  'Premium Wireless Noise-Cancelling Headphones',
  'premium-wireless-headphones',
  'Studio-quality sound with active noise cancellation. Perfect for travel, work, or relaxing at home. 30-hour battery life.',
  '$299.99',
  'https://www.amazon.com/dp/B08EXAMPLE?tag=youraffid',
  ARRAY[
    'https://images.unsplash.com/photo-1545127398-14699f92334b?w=600',
    'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600'
  ],
  ARRAY['electronics', 'audio', 'travel'],
  ARRAY['US', 'UK', 'CA']
),
(
  'Ergonomic Mechanical Keyboard',
  'ergonomic-mechanical-keyboard',
  'Premium typing experience with hot-swappable switches. Built for developers and writers who type all day.',
  '$149.99',
  'https://www.amazon.com/dp/B08EXAMPLE2?tag=youraffid',
  ARRAY[
    'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600',
    'https://images.unsplash.com/photo-1595225476474-87563907a212?w=600'
  ],
  ARRAY['electronics', 'productivity', 'gaming'],
  ARRAY['US', 'UK', 'CA', 'AU']
),
(
  'Insulated Stainless Steel Water Bottle',
  'insulated-water-bottle',
  'Keeps drinks cold for 24 hours, hot for 12 hours. Perfect for gym, office, or outdoor adventures. Leak-proof design.',
  '$34.99',
  'https://www.amazon.com/dp/B08EXAMPLE3?tag=youraffid',
  ARRAY[
    'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600'
  ],
  ARRAY['lifestyle', 'fitness', 'eco-friendly'],
  ARRAY['US', 'UK', 'CA', 'AU', 'DE']
),
(
  'Portable Laptop Stand',
  'portable-laptop-stand',
  'Lightweight aluminum stand that improves posture and airflow. Folds flat for travel. Compatible with all laptop sizes.',
  '$49.99',
  'https://www.amazon.com/dp/B08EXAMPLE4?tag=youraffid',
  ARRAY[
    'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600'
  ],
  ARRAY['productivity', 'ergonomics', 'travel'],
  ARRAY['US', 'UK', 'CA']
),
(
  'Smart LED Desk Lamp',
  'smart-led-desk-lamp',
  'Adjustable color temperature and brightness. USB charging port. Touch controls and memory function for your preferred settings.',
  '$59.99',
  'https://www.amazon.com/dp/B08EXAMPLE5?tag=youraffid',
  ARRAY[
    'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600'
  ],
  ARRAY['home', 'productivity', 'lighting'],
  ARRAY['US', 'UK', 'CA', 'AU']
),
(
  'Wireless Charging Pad',
  'wireless-charging-pad',
  'Fast 15W charging for compatible devices. Sleek design with LED indicator. Works through most phone cases.',
  '$24.99',
  'https://www.amazon.com/dp/B08EXAMPLE6?tag=youraffid',
  ARRAY[
    'https://images.unsplash.com/photo-1591290619762-c588f0f1a43d?w=600'
  ],
  ARRAY['electronics', 'accessories', 'tech'],
  ARRAY['US', 'UK', 'CA', 'AU', 'DE']
);

-- Insert some sample click data for testing analytics
-- (Replace UUIDs with actual product IDs after insertion)
-- 
-- To get product IDs after insertion:
-- SELECT id, title FROM products;
--
-- Then insert clicks like:
-- INSERT INTO clicks (product_id, created_at, country) VALUES
--   ('product-uuid-1', NOW() - INTERVAL '5 days', 'US'),
--   ('product-uuid-1', NOW() - INTERVAL '3 days', 'UK'),
--   ('product-uuid-2', NOW() - INTERVAL '1 day', 'US');
