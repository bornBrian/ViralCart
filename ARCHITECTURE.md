# Viral Cart - Architecture & Data Flow

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         CLIENT (Browser)                     │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   HomePage   │  │  AdminPage   │  │   Footer     │     │
│  │              │  │              │  │              │     │
│  │  • Hero      │  │  • Upload    │  │  • Disclosure│     │
│  │  • Products  │  │  • Analytics │  │  • Links     │     │
│  │  • Detail    │  │  • Manage    │  │              │     │
│  └──────┬───────┘  └──────┬───────┘  └──────────────┘     │
│         │                 │                                 │
└─────────┼─────────────────┼─────────────────────────────────┘
          │                 │
          ▼                 ▼
┌─────────────────────────────────────────────────────────────┐
│                    API LAYER (Serverless)                    │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  /api/track-click                                     │  │
│  │  • Receives product_id from client                    │  │
│  │  • Records click in database                          │  │
│  │  • Returns success status                             │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
└──────────────────────────┬───────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                   DATABASE (Supabase)                        │
│                                                              │
│  ┌─────────────────┐        ┌─────────────────┐            │
│  │    products     │        │     clicks      │            │
│  │─────────────────│        │─────────────────│            │
│  │ • id            │◄───┐   │ • id            │            │
│  │ • title         │    └───│ • product_id    │            │
│  │ • price         │        │ • created_at    │            │
│  │ • affiliate_url │        │ • country       │            │
│  │ • images[]      │        └─────────────────┘            │
│  │ • tags[]        │                                        │
│  └─────────────────┘                                        │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow: User Clicks "Buy on Amazon"

```
1. User clicks button
   ↓
2. ProductCard.tsx triggers openAffiliateLink()
   ↓
3. trackProductClick() fires (utils.ts)
   ↓
4. navigator.sendBeacon() sends POST to /api/track-click
   ↓
5. Serverless function receives request
   ↓
6. Function inserts click record into Supabase
   ↓
7. Function returns { ok: true }
   ↓
8. Browser opens Amazon link in new tab
   ↓
9. User completes purchase (affiliate commission tracked by Amazon)
```

## Data Flow: Admin Uploads Product

```
1. Admin enters product details in form
   ↓
2. ProductUploadForm.tsx collects data
   ↓
3. Form validates input
   ↓
4. Supabase client inserts product directly
   ↓
5. Database stores product with UUID
   ↓
6. Success message shown to admin
   ↓
7. ProductList.tsx refreshes to show new product
   ↓
8. New product appears on homepage immediately
```

## Component Hierarchy

```
App.tsx
├─ BrowserRouter
│  └─ Routes
│     ├─ Route: /
│     │  └─ HomePage
│     │     ├─ Hero
│     │     │  └─ CTA Button
│     │     ├─ ProductGrid
│     │     │  └─ ProductCard[] (mapped)
│     │     │     ├─ Image
│     │     │     ├─ Title
│     │     │     ├─ Price
│     │     │     └─ Buy Button
│     │     └─ ProductDetailOverlay (conditional)
│     │        ├─ Image Gallery
│     │        ├─ Details
│     │        └─ Buy Button
│     │
│     └─ Route: /admin
│        └─ AdminPage
│           ├─ Auth Check
│           └─ Tabs
│              ├─ ProductList
│              │  └─ Product Cards with Delete
│              ├─ ProductUploadForm
│              │  └─ Form Fields
│              └─ AnalyticsDashboard
│                 ├─ Summary Stats
│                 └─ Product Analytics
│                    └─ Sparkline Charts
│
└─ Footer (global)
   ├─ Brand Info
   ├─ Links
   └─ Affiliate Disclosure
```

## State Management

```
┌─────────────────────────────────────────────────────────────┐
│                     STATE ARCHITECTURE                       │
│                                                              │
│  Component Level State (useState)                           │
│  ├─ Hero: isVisible (animation trigger)                     │
│  ├─ ProductCard: imageLoaded                                │
│  ├─ ProductGrid: products[], loading, error                 │
│  ├─ ProductDetailOverlay: currentImageIndex                 │
│  ├─ AdminPage: isAuthenticated, activeTab                   │
│  ├─ ProductUploadForm: formData, imageUrls                  │
│  └─ AnalyticsDashboard: analytics[], totalClicks            │
│                                                              │
│  URL State (useSearchParams)                                │
│  └─ AdminPage: ?token=XXX                                   │
│                                                              │
│  Session Storage                                             │
│  └─ admin_auth: 'true' (persist admin login)                │
│                                                              │
│  No Global State Management Needed                          │
│  (Props and local state sufficient for this scale)          │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Authentication Flow

```
┌──────────────────────────────────────────────────────────────┐
│                   ADMIN AUTHENTICATION                        │
│                                                              │
│  1. User visits /admin                                       │
│       ↓                                                      │
│  2. Check for ?token= in URL                                 │
│       ↓                                                      │
│  3. Compare with VITE_ADMIN_TOKEN env var                    │
│       ↓                                                      │
│  4. If match:                                                │
│       • Set isAuthenticated = true                           │
│       • Store in sessionStorage                              │
│       • Show admin dashboard                                 │
│       ↓                                                      │
│  5. If no match:                                             │
│       • Show "Access Required" message                       │
│       • Display instructions                                 │
│                                                              │
│  Note: No user accounts, no passwords, just a token          │
│  Simple but effective for small teams                        │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

## Database Relationships

```
┌─────────────────────────────────────────────────────────────┐
│                    DATABASE SCHEMA                           │
│                                                              │
│  products                       clicks                       │
│  ┌──────────────┐              ┌──────────────┐            │
│  │ id (uuid)    │◄─────────────│ product_id   │            │
│  │ title        │              │ (FK)          │            │
│  │ slug         │              │               │            │
│  │ description  │              │ id (bigserial)│            │
│  │ price        │              │ created_at    │            │
│  │ affiliate_url│              │ country       │            │
│  │ images[]     │              └──────────────┘            │
│  │ tags[]       │                                           │
│  │ available_   │              Relationship:                │
│  │  countries[] │              One-to-Many                  │
│  │ created_at   │              (One product has many clicks)│
│  └──────────────┘                                           │
│                                                              │
│  Indexes:                                                    │
│  • products.slug (UNIQUE)                                    │
│  • products.created_at                                       │
│  • clicks.product_id                                         │
│  • clicks.created_at                                         │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Request Flow: Track Click

```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │ 1. User clicks "Buy on Amazon"
       │
       ▼
┌─────────────────────────────────────────────┐
│ ProductCard.tsx                             │
│ • handleBuyClick()                          │
│ • calls openAffiliateLink(url, productId)  │
└──────┬──────────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────────┐
│ utils.ts                                    │
│ • trackProductClick(productId)              │
│ • navigator.sendBeacon(POST)                │
└──────┬──────────────────────────────────────┘
       │ 2. Async request (non-blocking)
       │
       ▼
┌─────────────────────────────────────────────┐
│ Netlify/Vercel Function                     │
│ /api/track-click                            │
│ • Parse request body                        │
│ • Extract product_id                        │
│ • Call Supabase                             │
└──────┬──────────────────────────────────────┘
       │ 3. INSERT query
       │
       ▼
┌─────────────────────────────────────────────┐
│ Supabase                                    │
│ • INSERT INTO clicks (product_id, ...)      │
│ • Returns success                           │
└──────┬──────────────────────────────────────┘
       │ 4. Response
       │
       ▼
┌─────────────────────────────────────────────┐
│ Function responds                           │
│ { ok: true }                                │
└──────┬──────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────┐
│ Browser (meanwhile...)       │
│ • Opens Amazon link          │
│ • User sees product page     │
└──────────────────────────────┘

Total time: ~50-100ms (non-blocking)
User experience: Instant redirect
```

## Analytics Query Flow

```
Admin Dashboard
       │
       ▼
┌──────────────────────────────┐
│ AnalyticsDashboard.tsx       │
│ fetchAnalytics()             │
└──────┬───────────────────────┘
       │
       ▼
┌──────────────────────────────┐
│ Multiple Supabase Queries    │
│ • Count total clicks         │
│ • Group by product_id        │
│ • Filter last 30 days        │
│ • Aggregate by date          │
└──────┬───────────────────────┘
       │
       ▼
┌──────────────────────────────┐
│ Process Results              │
│ • Create daily arrays        │
│ • Sort by click count        │
│ • Format for display         │
└──────┬───────────────────────┘
       │
       ▼
┌──────────────────────────────┐
│ Render Charts                │
│ • Summary stats              │
│ • Sparklines (30 days)       │
│ • Product breakdown          │
└──────────────────────────────┘
```

## Deployment Flow

```
Local Development
       │
       ▼
Git Commit & Push
       │
       ▼
┌──────────────────────────────┐
│ GitHub Repository            │
│ (Source of truth)            │
└──────┬───────────────────────┘
       │
       ├──────────────────────┐
       │                      │
       ▼                      ▼
┌─────────────┐      ┌─────────────┐
│  Netlify    │      │   Vercel    │
│  • Detects  │      │  • Detects  │
│    push     │      │    push     │
│  • Runs     │      │  • Runs     │
│    build    │      │    build    │
│  • Deploys  │      │  • Deploys  │
│    to CDN   │      │    to Edge  │
└─────────────┘      └─────────────┘
       │                      │
       └──────────┬───────────┘
                  │
                  ▼
         ┌─────────────────┐
         │  Live Website   │
         │  • Static files │
         │  • Serverless   │
         │  • Functions    │
         └─────────────────┘
```

## Security Layers

```
┌─────────────────────────────────────────────────────────────┐
│                     SECURITY MODEL                           │
│                                                              │
│  1. Frontend (Public Access)                                │
│     ├─ Products: Read-only                                  │
│     ├─ Images: Public URLs                                  │
│     └─ Click tracking: Write-only (append-only logs)        │
│                                                              │
│  2. Admin Panel (Token Protected)                           │
│     ├─ Token validation via environment variable            │
│     ├─ No database of users                                 │
│     └─ Session-based after initial auth                     │
│                                                              │
│  3. Database (RLS Policies)                                 │
│     ├─ products: Public read, no public write               │
│     ├─ clicks: Public write, no public read                 │
│     └─ Admin operations: Via Supabase service key           │
│                                                              │
│  4. Serverless Functions                                    │
│     ├─ CORS: Restricted to your domain                      │
│     ├─ Rate limiting: Via hosting platform                  │
│     └─ Minimal data collection (no PII)                     │
│                                                              │
│  5. HTTPS                                                    │
│     └─ Enforced by hosting (Netlify/Vercel)                 │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| **No global state management** | App is simple enough; props & local state sufficient |
| **Token-based admin** | No need for full auth system; reduces complexity |
| **Direct Supabase from frontend** | Simplifies architecture; RLS provides security |
| **Serverless for clicks only** | Only operation that needs backend privacy |
| **navigator.sendBeacon** | Reliable tracking even during page unload |
| **No real-time updates** | Reduces complexity; manual refresh acceptable |
| **Static generation** | Fast, cheap hosting; good for SEO |

This architecture prioritizes:
- ✅ Simplicity
- ✅ Low cost
- ✅ Fast performance
- ✅ Easy maintenance
- ✅ Scalability to 1000s of products

Trade-offs accepted:
- ⚠️ No real-time analytics
- ⚠️ No user accounts
- ⚠️ Manual product management
- ⚠️ Limited to single admin user
