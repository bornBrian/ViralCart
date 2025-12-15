# Quick Start Guide - Viral Cart

This guide will get you from zero to deployed in under 30 minutes.

## ⚡ Speed Run (15 minutes)

### Step 1: Clone & Install (2 min)

```bash
cd d:\ViralCart
npm install
```

### Step 2: Supabase Setup (5 min)

1. Go to [supabase.com](https://supabase.com) → "New Project"
2. Name it "viral-cart" (or anything)
3. Wait for database to initialize
4. Go to SQL Editor → New Query
5. Copy-paste content from `database/schema.sql` → Run
6. (Optional) Copy-paste `database/seed.sql` → Run (for test products)
7. Go to Settings → API → Copy:
   - Project URL
   - `anon` `public` key

### Step 3: Environment Setup (1 min)

Create `.env` file:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_ADMIN_TOKEN=my-secret-token-12345
```

### Step 4: Test Locally (2 min)

```bash
npm run dev
```

Visit:
- Main site: `http://localhost:5173`
- Admin: `http://localhost:5173/admin?token=my-secret-token-12345`

### Step 5: Deploy to Netlify (5 min)

1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com) → "Add new site"
3. Import your repo
4. Configure:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Add environment variables (same as `.env`)
6. Deploy!

**Done!** Your site is live. 🎉

---

## 🎯 First Steps After Deployment

### 1. Upload Your First Product

1. Go to `https://your-site.netlify.app/admin?token=YOUR_TOKEN`
2. Click "Upload New" tab
3. Fill in:
   - Product title
   - Description
   - Price (e.g., "$99.99")
   - Amazon affiliate URL
   - Image URL (use Unsplash for testing)
   - Tags (comma-separated)
4. Click "Upload Product"

### 2. Test Click Tracking

1. Go to your homepage
2. Click "Check price — Amazon" on a product
3. Return to admin → "Analytics" tab
4. You should see 1 click recorded!

### 3. Customize Your Site

Edit these files:

**Change site name:**
- `src/components/Hero.tsx` - Hero headline
- `src/components/Footer.tsx` - Footer text
- `index.html` - Page title

**Change colors:**
- `tailwind.config.js` - Update `accent` color

**Change logo:**
- Replace `public/logo.svg` with your logo

---

## 🔧 Common Tasks

### Add a New Product (via Admin)

1. Admin → "Upload New"
2. Fill form
3. Submit

### Delete a Product

1. Admin → "Products" tab
2. Find product
3. Click "Delete"

### View Analytics

1. Admin → "Analytics" tab
2. See total clicks, per-product stats, and 30-day trends

### Export All Products

1. Admin → "Products" tab
2. Click "Export CSV"

---

## 🚨 Troubleshooting

### "Failed to load products"

**Cause:** Supabase connection issue

**Fix:**
1. Check `.env` variables are correct
2. Verify Supabase project is active
3. Check browser console for errors

### Admin page says "Access requires authentication token"

**Cause:** Missing or incorrect token in URL

**Fix:**
- Make sure URL has `?token=YOUR_TOKEN`
- Verify `VITE_ADMIN_TOKEN` matches in:
  - Local `.env` file
  - Netlify environment variables

### Serverless function errors

**Netlify:**
1. Go to Netlify dashboard → Functions
2. Check logs for errors
3. Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set

**Vercel:**
1. Go to Vercel dashboard → Functions
2. Check logs
3. Verify environment variables

### Images not loading

**Cause:** CORS or invalid URLs

**Fix:**
1. Use Unsplash URLs for testing: `https://images.unsplash.com/photo-XXXXX`
2. Or upload to Supabase Storage
3. Make sure URLs are publicly accessible

---

## 📱 Mobile Testing

Test on your phone:

1. Get your local IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
2. Visit `http://YOUR_IP:5173` on your phone
3. Make sure you're on the same WiFi network

Or use ngrok:

```bash
npx ngrok http 5173
```

---

## 🎨 Design Customization Cheat Sheet

### Colors (in `tailwind.config.js`)

```javascript
colors: {
  'soft-white': '#FAFAFA',  // Background
  'charcoal': '#1A1A1A',    // Text
  'accent': '#10B981',       // Buttons (change this!)
}
```

Popular alternatives:
- Electric Blue: `#3B82F6`
- Purple: `#8B5CF6`
- Orange: `#F97316`
- Pink: `#EC4899`

### Fonts

Add to `index.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet">
```

Update `tailwind.config.js`:

```javascript
fontFamily: {
  sans: ['Poppins', 'system-ui', 'sans-serif'],
}
```

### Hero Text

Edit `src/components/Hero.tsx`:

```tsx
<h1>
  Your Headline Here —{' '}
  <span className="text-gradient">
    Your Subheadline
  </span>
</h1>
```

---

## 📊 Analytics Deep Dive

### View Custom Analytics

1. Go to Supabase dashboard
2. SQL Editor → New Query
3. Copy queries from `database/queries.sql`
4. Run any query you want!

### Example: Top Products This Week

```sql
SELECT 
  p.title,
  COUNT(c.id) as clicks
FROM products p
LEFT JOIN clicks c ON p.id = c.product_id
WHERE c.created_at >= NOW() - INTERVAL '7 days'
GROUP BY p.id, p.title
ORDER BY clicks DESC
LIMIT 5;
```

---

## 🚀 Going to Production

Before launching to real users:

1. ✅ Change `ADMIN_TOKEN` to something secure (use [random.org](https://www.random.org/passwords/))
2. ✅ Replace sample products with real ones
3. ✅ Add your Amazon Associates tag to all URLs
4. ✅ Test affiliate links work
5. ✅ Compress all images
6. ✅ Run Lighthouse audit (aim for 90+)
7. ✅ Test on mobile
8. ✅ Add custom domain (optional)

---

## 🆘 Need Help?

1. Check [README.md](./README.md) for full documentation
2. Review [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)
3. Check [FILE_STRUCTURE.md](./FILE_STRUCTURE.md) for code organization
4. Look at example queries in `database/queries.sql`
5. Open an issue on GitHub

---

## 🎓 Next Steps

Once you're comfortable:

1. **Add more features:**
   - Product categories/filters
   - Search functionality
   - User reviews
   - Email capture

2. **Improve SEO:**
   - Add sitemap.xml
   - Optimize meta tags
   - Add structured data (JSON-LD)

3. **Enhance analytics:**
   - Add Google Analytics
   - Track more events (views, time on page)
   - A/B test different CTAs

4. **Scale:**
   - Add caching (Redis/Upstash)
   - Optimize images (CDN)
   - Add rate limiting

---

**You're all set!** Start uploading products and sharing your curated collection. 🚀
