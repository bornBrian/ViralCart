# Viral Cart 🛒

A modern, mobile-first Amazon affiliate storefront with admin dashboard and lightweight analytics. Built with React, TypeScript, Tailwind CSS, and deployable for free on Netlify, Vercel, or GitHub Pages.

> **🚀 NEW TO THIS PROJECT?** Start with [START_HERE.md](./START_HERE.md) for a quick overview and next steps!

> **⚡ WANT TO LAUNCH FAST?** Jump to [QUICK_START.md](./QUICK_START.md) for a 15-minute setup guide!

## ✨ Features

- **Curated Product Showcase** - Beautiful, responsive product grid with smooth animations
- **Product Detail Overlay** - Smooth transitions with detailed product information
- **Admin Dashboard** - Upload products, view analytics, manage catalog (no signup required)
- **Click Analytics** - Track "Buy on Amazon" clicks per product with 30-day trends
- **Serverless Functions** - Click tracking via Netlify/Vercel functions
- **Privacy-First** - No cookies, no PII collection, minimal analytics
- **Mobile-First Design** - Optimized for all screen sizes
- **SEO Optimized** - Fast loading, semantic HTML, proper meta tags
- **Affiliate Compliant** - Clear disclosure and proper link attribution

## 🎨 Design Inspiration

The design borrows tasteful micro-interactions and clean layouts from:
- **Rive** - Subtle motion and vector animations
- **ReactBits** - Compact animated components
- **barba.js** - Smooth page transitions
- **21st.dev** - Space and composition
- **roydenso.com & abhijitrout.in** - Portfolio clarity

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- A Supabase account (free tier)
- GitHub account for deployment

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd ViralCart
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run the schema from `database/schema.sql`
3. (Optional) Run `database/seed.sql` for sample data
4. Get your project URL and anon key from Settings > API

### 3. Configure Environment Variables

Create a `.env` file in the root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_ADMIN_TOKEN=your-secret-admin-token-here
```

### 4. Run Locally

```bash
npm run dev
```

Visit `http://localhost:5173` to see your site.

### 5. Access Admin Panel

Navigate to `http://localhost:5173/admin?token=YOUR_ADMIN_TOKEN`

## 📦 Project Structure

```
ViralCart/
├── src/
│   ├── components/
│   │   ├── Hero.tsx                    # Hero section with CTA
│   │   ├── ProductCard.tsx             # Individual product card
│   │   ├── ProductGrid.tsx             # Product grid layout
│   │   ├── ProductDetailOverlay.tsx    # Product detail modal
│   │   ├── Footer.tsx                  # Footer with disclosure
│   │   └── admin/
│   │       ├── ProductUploadForm.tsx   # Admin upload form
│   │       ├── ProductList.tsx         # Admin product management
│   │       └── AnalyticsDashboard.tsx  # Analytics dashboard
│   ├── pages/
│   │   ├── HomePage.tsx                # Main landing page
│   │   └── AdminPage.tsx               # Admin dashboard page
│   ├── lib/
│   │   ├── supabase.ts                 # Supabase client & types
│   │   └── utils.ts                    # Utility functions
│   ├── App.tsx                         # Main app component
│   ├── main.tsx                        # App entry point
│   └── index.css                       # Global styles
├── netlify/functions/
│   └── track-click.ts                  # Netlify serverless function
├── api/
│   └── track-click.ts                  # Vercel serverless function
├── database/
│   ├── schema.sql                      # Supabase database schema
│   ├── queries.sql                     # Example analytics queries
│   ├── seed.sql                        # Sample data
│   └── firebase-alternative.md         # Firebase setup (alternative)
├── netlify.toml                        # Netlify config
├── vercel.json                         # Vercel config
├── tailwind.config.js                  # Tailwind configuration
└── package.json
```

## 🌐 Deployment

### Option 1: Netlify (Recommended)

1. **Connect your repo:**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" > "Import an existing project"
   - Connect to your GitHub repo

2. **Configure build settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Functions directory: `netlify/functions`

3. **Set environment variables:**
   - Go to Site settings > Environment variables
   - Add:
     ```
     VITE_SUPABASE_URL=https://your-project.supabase.co
     VITE_SUPABASE_ANON_KEY=your-anon-key
     ADMIN_TOKEN=your-secret-token
     ```

4. **Deploy:**
   - Click "Deploy site"
   - Your site will be live at `https://your-site.netlify.app`

5. **Access admin:**
   - Visit `https://your-site.netlify.app/admin?token=YOUR_ADMIN_TOKEN`

### Option 2: Vercel

1. **Install Vercel CLI** (optional):
   ```bash
   npm i -g vercel
   ```

2. **Deploy via CLI:**
   ```bash
   vercel
   ```

3. **Or use Vercel Dashboard:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repo
   - Configure environment variables (same as Netlify)
   - Deploy

4. **Serverless functions:**
   - Vercel automatically detects functions in the `api/` directory

### Option 3: GitHub Pages (Static Only)

**Note:** GitHub Pages doesn't support serverless functions, so click tracking won't work.

1. **Update `vite.config.ts`:**
   ```typescript
   export default defineConfig({
     base: '/your-repo-name/',
     // ... rest of config
   })
   ```

2. **Install gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```

3. **Add deploy script to `package.json`:**
   ```json
   {
     "scripts": {
       "deploy": "npm run build && gh-pages -d dist"
     }
   }
   ```

4. **Deploy:**
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages:**
   - Go to repo Settings > Pages
   - Select `gh-pages` branch
   - Site will be live at `https://username.github.io/repo-name/`

## 🔧 Configuration

### Tailwind Design Tokens

Edit `tailwind.config.js` to customize colors:

```javascript
colors: {
  'soft-white': '#FAFAFA',    // Background
  'charcoal': '#1A1A1A',      // Primary text
  'accent': '#10B981',        // Emerald green (or change to electric blue: '#3B82F6')
  'text-muted': '#6B7280',    // Secondary text
}
```

### Admin Access

The admin panel is protected by a token-based system:

1. Set `ADMIN_TOKEN` in your environment variables
2. Access via `yoursite.com/admin?token=YOUR_TOKEN`
3. Token is stored in sessionStorage for convenience
4. No user authentication/signup required

### Click Tracking

Click tracking happens automatically when users click "Buy on Amazon":

1. Frontend fires a POST request to `/api/track-click`
2. Serverless function records the click in Supabase
3. Uses `navigator.sendBeacon` for reliability
4. Non-blocking - doesn't delay redirect

## 📊 Analytics

View analytics in the admin dashboard:

- **Total clicks** across all products
- **Clicks per product** with sparklines
- **30-day trends** for each product
- **CSV export** of all data

Run custom queries using `database/queries.sql` in Supabase SQL Editor.

## 🎨 Customization

### Add Your Branding

1. **Update site name:** Search and replace "Viral Cart" in:
   - `index.html` (title)
   - `src/components/Footer.tsx`
   - `README.md`

2. **Change logo:** Add your logo to `public/` and update `index.html`

3. **Customize hero text:** Edit `src/components/Hero.tsx`

### Add Rive Animation (Optional)

1. Create animation at [rive.app](https://rive.app)
2. Export as `.riv` file
3. Add to `public/` directory
4. Update `Hero.tsx`:
   ```tsx
   import { useRive } from '@rive-app/react-canvas'
   
   const { RiveComponent } = useRive({
     src: '/your-animation.riv',
     autoplay: true,
   })
   
   // Render in hero section
   ```

## 🔒 Security & Privacy

- **No cookies** - No tracking cookies used
- **No PII** - Only product_id and timestamp tracked
- **Rate limiting** - Consider adding rate limiting to serverless functions
- **CORS** - Configured for your domain only (update in functions)
- **RLS** - Supabase Row Level Security policies enabled

### Affiliate Disclosure

The footer includes the required disclosure:
> "As an Amazon Associate I earn from qualifying purchases."

All affiliate links include `rel="sponsored noopener noreferrer"`.

## 🐛 Troubleshooting

### Build Fails

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Supabase Connection Error

- Check your `.env` variables are correct
- Verify Supabase project is active
- Check API keys in Supabase dashboard

### Serverless Functions Not Working

**Netlify:**
- Ensure `netlify.toml` is in repo root
- Check function logs in Netlify dashboard
- Verify environment variables are set

**Vercel:**
- Ensure functions are in `api/` directory
- Check function logs in Vercel dashboard
- Verify `vercel.json` configuration

### Admin Page Won't Load

- Check `ADMIN_TOKEN` environment variable
- Try accessing with `?token=YOUR_TOKEN` in URL
- Clear sessionStorage in browser DevTools

## 📈 Performance

### Lighthouse Targets

- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

### Optimization Tips

1. **Compress images:** Use [TinyPNG](https://tinypng.com)
2. **Use WebP format:** Convert images to WebP
3. **Lazy load images:** Already implemented via `loading="lazy"`
4. **Enable caching:** Configure in Netlify/Vercel
5. **Use CDN:** Supabase Storage has CDN built-in

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repo
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - feel free to use for personal or commercial projects.

## 🙏 Credits

Design inspired by:
- [Rive](https://rive.app)
- [ReactBits](https://reactbits.dev)
- [barba.js](https://barba.js.org)
- [21st.dev](https://21st.dev)
- [roydenso.com](https://roydenso.com)
- [abhijitrout.in](https://abhijitrout.in)

Built with:
- [React](https://react.dev)
- [Vite](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Supabase](https://supabase.com)
- [Netlify](https://netlify.com) / [Vercel](https://vercel.com)

---

**Need help?** Open an issue or check the [documentation](./docs).

**Ready to launch?** Follow the deployment guide above and start curating! 🚀
