# Deployment Checklist

Before deploying to production, complete these steps:

## 1. Database Setup

- [ ] Create Supabase project
- [ ] Run `database/schema.sql` in Supabase SQL Editor
- [ ] Set up Row Level Security policies
- [ ] (Optional) Run `database/seed.sql` for test data
- [ ] Verify Supabase API keys

## 2. Environment Variables

### Required Variables

- [ ] `VITE_SUPABASE_URL` - Your Supabase project URL
- [ ] `VITE_SUPABASE_ANON_KEY` - Your Supabase anon/public key
- [ ] `ADMIN_TOKEN` - Secret token for admin access (use a strong random string)

### Optional Variables

- [ ] `VITE_SITE_URL` - Your production URL (for OG tags, analytics)

## 3. Content Preparation

- [ ] Replace sample products with your real products
- [ ] Compress and optimize product images
- [ ] Convert images to WebP format
- [ ] Upload images to Supabase Storage or CDN
- [ ] Update affiliate URLs with your Amazon Associates tag
- [ ] Test all affiliate links

## 4. Branding

- [ ] Update site name from "Viral Cart" to your brand
- [ ] Add favicon (replace `vite.svg` in `public/`)
- [ ] Customize color scheme in `tailwind.config.js`
- [ ] Update hero text and subline
- [ ] Customize footer links and social media
- [ ] Add your logo

## 5. SEO & Meta Tags

- [ ] Update page title in `index.html`
- [ ] Add meta description
- [ ] Add Open Graph tags
- [ ] Add Twitter Card tags
- [ ] Create and add `sitemap.xml`
- [ ] Create and add `robots.txt`
- [ ] Verify structured data (JSON-LD)

## 6. Analytics & Tracking

- [ ] Test click tracking functionality
- [ ] Verify analytics dashboard shows correct data
- [ ] (Optional) Add Google Analytics or other analytics
- [ ] Set up error monitoring (Sentry, LogRocket, etc.)

## 7. Performance

- [ ] Run Lighthouse audit (target 90+ on all metrics)
- [ ] Optimize images (compress, resize, lazy load)
- [ ] Enable caching headers (in `netlify.toml` or `vercel.json`)
- [ ] Test on slow 3G connection
- [ ] Test on mobile devices

## 8. Security

- [ ] Change default `ADMIN_TOKEN` to a strong random string
- [ ] Verify Supabase RLS policies are active
- [ ] Test that non-admin users can't access admin functions
- [ ] Enable HTTPS (automatic on Netlify/Vercel)
- [ ] Add CSP headers (Content Security Policy)
- [ ] Review and test CORS settings

## 9. Accessibility

- [ ] Test with screen reader (NVDA, JAWS, or VoiceOver)
- [ ] Verify all images have alt text
- [ ] Test keyboard navigation
- [ ] Check color contrast ratios (4.5:1 minimum)
- [ ] Verify focus indicators are visible
- [ ] Test with browser zoom at 200%

## 10. Legal & Compliance

- [ ] Add Amazon affiliate disclosure in footer ✓ (already included)
- [ ] Create Privacy Policy page
- [ ] Create Terms of Service page
- [ ] Add cookie/analytics consent banner if needed
- [ ] Verify affiliate link formatting (rel="sponsored noopener noreferrer")
- [ ] Ensure compliance with local e-commerce laws

## 11. Testing

- [ ] Test product grid loads correctly
- [ ] Test product detail overlay opens/closes
- [ ] Test "Buy on Amazon" links open in new tab
- [ ] Test admin login with token
- [ ] Test product upload form
- [ ] Test product deletion
- [ ] Test CSV export
- [ ] Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test on multiple devices (mobile, tablet, desktop)

## 12. Hosting Configuration

### Netlify

- [ ] Build command: `npm run build`
- [ ] Publish directory: `dist`
- [ ] Functions directory: `netlify/functions`
- [ ] Environment variables set
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active

### Vercel

- [ ] Framework preset: Vite
- [ ] Build command: `npm run build`
- [ ] Output directory: `dist`
- [ ] Environment variables set
- [ ] Custom domain configured (if applicable)

## 13. Post-Deployment

- [ ] Verify site loads at production URL
- [ ] Test all functionality in production
- [ ] Submit sitemap to Google Search Console
- [ ] Set up uptime monitoring
- [ ] Create backup of Supabase database
- [ ] Document any custom deployment steps
- [ ] Set up alerts for serverless function errors

## 14. Ongoing Maintenance

- [ ] Monitor analytics weekly
- [ ] Update products regularly
- [ ] Check for broken affiliate links monthly
- [ ] Update dependencies quarterly
- [ ] Review and improve SEO quarterly
- [ ] Backup database monthly

## Tools & Resources

- **Image Optimization:** [TinyPNG](https://tinypng.com), [Squoosh](https://squoosh.app)
- **Performance Testing:** [Lighthouse](https://developers.google.com/web/tools/lighthouse), [WebPageTest](https://www.webpagetest.org)
- **Accessibility Testing:** [WAVE](https://wave.webaim.org), [axe DevTools](https://www.deque.com/axe/devtools/)
- **SEO Testing:** [Google Search Console](https://search.google.com/search-console), [Ahrefs](https://ahrefs.com)
- **Uptime Monitoring:** [UptimeRobot](https://uptimerobot.com), [Pingdom](https://www.pingdom.com)

---

**Ready to Launch?** ✅ Once all items are checked, you're ready to deploy!
