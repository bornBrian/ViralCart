-- Add videos and category columns to existing products table
ALTER TABLE products ADD COLUMN IF NOT EXISTS videos text[];
ALTER TABLE products ADD COLUMN IF NOT EXISTS category text;
