# Complete Setup Commands

This file contains all the commands you need to set up Viral Cart from scratch.

## Initial Setup

```bash
# Navigate to project directory
cd d:\ViralCart

# Install all dependencies
npm install

# Create .env file from example
# Windows:
copy .env.example .env
# Mac/Linux:
# cp .env.example .env

# Edit .env with your actual values
# Use notepad, VS Code, or any text editor
notepad .env
```

## Environment Variables Setup

Edit your `.env` file with these values:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Admin Token (CHANGE THIS!)
VITE_ADMIN_TOKEN=generate-a-secure-random-token

# Optional
VITE_SITE_URL=http://localhost:5173
```

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run linter
npm run lint
```

## Supabase Setup

```sql
-- 1. Go to Supabase.com and create new project
-- 2. Wait for database to initialize
-- 3. Go to SQL Editor
-- 4. Run this command to enable UUID:

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 5. Copy and paste contents of database/schema.sql
-- 6. Execute the query
-- 7. (Optional) Run database/seed.sql for test data
```

## Git Setup

```bash
# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Initial commit
git commit -m "Initial commit - Viral Cart v1.0"

# Add remote (replace with your GitHub repo URL)
git remote add origin https://github.com/yourusername/viral-cart.git

# Push to GitHub
git push -u origin main
```

## Netlify Deployment

```bash
# Option 1: Via Netlify Dashboard
# 1. Go to netlify.com
# 2. Click "Add new site" > "Import an existing project"
# 3. Select your GitHub repo
# 4. Configure:
#    - Build command: npm run build
#    - Publish directory: dist
#    - Functions directory: netlify/functions
# 5. Add environment variables
# 6. Deploy!

# Option 2: Via Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize Netlify
netlify init

# Deploy
netlify deploy --prod
```

## Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Or deploy to production
vercel --prod
```

## GitHub Pages Deployment

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add deploy script to package.json:
# "scripts": {
#   "deploy": "npm run build && gh-pages -d dist"
# }

# Update vite.config.ts with base path:
# base: '/your-repo-name/'

# Deploy
npm run deploy
```

## Database Management Commands

```bash
# These are SQL commands to run in Supabase SQL Editor

-- View all products
SELECT * FROM products ORDER BY created_at DESC;

-- View all clicks
SELECT * FROM clicks ORDER BY created_at DESC;

-- Count total clicks
SELECT COUNT(*) FROM clicks;

-- Get clicks per product
SELECT 
  p.title,
  COUNT(c.id) as clicks
FROM products p
LEFT JOIN clicks c ON p.id = c.product_id
GROUP BY p.id, p.title
ORDER BY clicks DESC;

-- Delete all test data (CAREFUL!)
DELETE FROM clicks;
DELETE FROM products;
```

## Updating Dependencies

```bash
# Check for outdated packages
npm outdated

# Update all dependencies to latest
npm update

# Update specific package
npm update react react-dom

# Audit security vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix
```

## Troubleshooting Commands

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf node_modules/.vite

# Check Node and npm versions
node --version
npm --version

# Recommended versions:
# Node: v18.0.0 or higher
# npm: v9.0.0 or higher
```

## Production Checklist Commands

```bash
# 1. Build and test production bundle
npm run build
npm run preview

# 2. Check bundle size
npm run build
# Look at dist/ folder size

# 3. Test lighthouse score
# In Chrome DevTools > Lighthouse > Run audit

# 4. Verify environment variables are set
# In Netlify/Vercel dashboard

# 5. Test live site
# Visit your production URL
# Try uploading a product via admin
# Test click tracking
```

## Database Backup Commands

```sql
-- Export all products (run in Supabase SQL Editor)
SELECT 
  title,
  slug,
  description,
  price,
  affiliate_url,
  array_to_string(images, '|') as images,
  array_to_string(tags, ',') as tags,
  array_to_string(available_countries, ',') as countries,
  created_at
FROM products
ORDER BY created_at DESC;

-- Save results as CSV from Supabase dashboard
```

## Performance Optimization

```bash
# Analyze bundle size
npm run build -- --sourcemap
npx vite-bundle-visualizer

# Compress images (if you have many)
# Use online tools like:
# - tinypng.com
# - squoosh.app
# Or install imagemin:
npm install --save-dev imagemin imagemin-webp
```

## Monitoring Commands

```bash
# Check Netlify function logs
netlify functions:log track-click

# Check Netlify deploy status
netlify status

# Check Vercel deployment logs
vercel logs
```

## Useful npm Scripts to Add

Add these to your `package.json` if needed:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx",
    "deploy:netlify": "netlify deploy --prod",
    "deploy:vercel": "vercel --prod",
    "deploy:gh-pages": "npm run build && gh-pages -d dist",
    "clean": "rm -rf dist node_modules/.vite",
    "fresh": "rm -rf node_modules package-lock.json && npm install"
  }
}
```

## Quick Reference

| Task | Command |
|------|---------|
| Start dev server | `npm run dev` |
| Build for production | `npm run build` |
| Deploy to Netlify | `netlify deploy --prod` |
| Deploy to Vercel | `vercel --prod` |
| View local preview | `npm run preview` |
| Check for errors | `npm run lint` |
| Access admin | Navigate to `/admin?token=YOUR_TOKEN` |

---

**Pro Tip:** Save commonly used commands as npm scripts in package.json for faster access!
