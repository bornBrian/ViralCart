# 📁 Complete File Tree - Viral Cart

```
ViralCart/
│
├── 📄 package.json                      # Project dependencies & scripts
├── 📄 package-lock.json                 # Locked dependency versions
├── 📄 tsconfig.json                     # TypeScript configuration
├── 📄 tsconfig.node.json                # TypeScript for Node.js
├── 📄 vite.config.ts                    # Vite build configuration
├── 📄 tailwind.config.js                # Tailwind CSS theming
├── 📄 postcss.config.js                 # PostCSS plugins
├── 📄 .eslintrc.cjs                     # ESLint rules
├── 📄 .editorconfig                     # Editor configuration
├── 📄 .gitignore                        # Git ignore rules
├── 📄 .env.example                      # Environment template
├── 📄 netlify.toml                      # Netlify deployment config
├── 📄 vercel.json                       # Vercel deployment config
│
├── 📘 README.md                         # Main documentation (START HERE)
├── 📘 START_HERE.md                     # Quick overview & next steps
├── 📘 QUICK_START.md                    # 15-minute setup guide
├── 📘 DEPLOYMENT_CHECKLIST.md           # Pre-launch checklist
├── 📘 ARCHITECTURE.md                   # System design & data flow
├── 📘 FILE_STRUCTURE.md                 # Project organization
├── 📘 SETUP_COMMANDS.md                 # All CLI commands
├── 📘 PACKAGE_INFO.md                   # Dependency details
├── 📘 PROJECT_SUMMARY.md                # High-level overview
│
├── 📂 public/                           # Static assets
│   ├── 🖼️ logo.svg                      # Site logo
│   ├── 🖼️ vite.svg                      # Vite default logo (replace)
│   ├── 📄 robots.txt                    # SEO crawler rules
│   └── 📄 sitemap.xml                   # SEO sitemap
│
├── 📂 src/                              # Source code
│   │
│   ├── 📂 components/                   # React components
│   │   │
│   │   ├── 📂 admin/                    # Admin-specific components
│   │   │   ├── 🔷 AnalyticsDashboard.tsx    # Analytics charts & stats
│   │   │   ├── 🔷 ProductList.tsx            # Product management
│   │   │   └── 🔷 ProductUploadForm.tsx     # Upload form
│   │   │
│   │   ├── 🔷 Hero.tsx                  # Landing page hero
│   │   ├── 🔷 ProductCard.tsx           # Product card component
│   │   ├── 🔷 ProductGrid.tsx           # Product grid layout
│   │   ├── 🔷 ProductDetailOverlay.tsx  # Product modal
│   │   └── 🔷 Footer.tsx                # Site footer
│   │
│   ├── 📂 pages/                        # Page components
│   │   ├── 🔷 HomePage.tsx              # Main landing page
│   │   └── 🔷 AdminPage.tsx             # Admin dashboard
│   │
│   ├── 📂 lib/                          # Utilities & configs
│   │   ├── 🔷 supabase.ts               # Supabase client & types
│   │   └── 🔷 utils.ts                  # Helper functions
│   │
│   ├── 🔷 App.tsx                       # Main app with routing
│   ├── 🔷 main.tsx                      # React entry point
│   └── 🎨 index.css                     # Global styles
│
├── 📂 netlify/                          # Netlify-specific files
│   └── 📂 functions/                    # Netlify serverless
│       ├── 🔷 track-click.ts            # Click tracking API
│       └── 📄 package.json              # Function dependencies
│
├── 📂 api/                              # Vercel serverless functions
│   └── 🔷 track-click.ts                # Click tracking API (Vercel)
│
├── 📂 database/                         # Database files
│   ├── 📊 schema.sql                    # Table definitions
│   ├── 📊 queries.sql                   # Example analytics queries
│   ├── 📊 seed.sql                      # Sample data
│   └── 📄 firebase-alternative.md       # Firebase instructions
│
├── 📂 .vscode/                          # VS Code settings
│   ├── 📄 settings.json                 # Workspace settings
│   └── 📄 extensions.json               # Recommended extensions
│
└── 📂 dist/                             # Build output (generated)
    ├── 📄 index.html
    └── 📂 assets/
        ├── index-[hash].js
        ├── index-[hash].css
        └── vendor-[hash].js


LEGEND:
─────────────────────────────────────
📄 = Configuration file
📘 = Documentation file
📂 = Directory
🔷 = TypeScript/TSX file
🎨 = CSS file
🖼️ = Image/SVG file
📊 = SQL file
```

## File Counts

- **Total Files:** 50+
- **Source Files (src/):** 15
- **Documentation:** 9
- **Configuration:** 12
- **Database:** 4
- **Serverless Functions:** 2

## Size Breakdown

```
📦 Project Size (excluding node_modules)
├── src/             ~80 KB    (40 files)
├── database/        ~20 KB    (4 files)
├── docs/            ~120 KB   (9 markdown files)
├── config files     ~15 KB    (12 files)
├── public/          ~5 KB     (4 files)
├── functions/       ~10 KB    (3 files)
└── package.json     ~2 KB
────────────────────────────
Total:              ~252 KB

📦 node_modules/    ~350 MB   (installed dependencies)
📦 dist/           ~300 KB    (production build)
```

## What Each Directory Does

### 📂 `/src/components/`
React UI components. Split into:
- **`/admin/`** - Admin-only components (upload, analytics, list)
- **Root** - Public components (hero, products, footer)

### 📂 `/src/pages/`
Page-level components that map to routes:
- **`HomePage`** - Main landing (/)
- **`AdminPage`** - Admin dashboard (/admin)

### 📂 `/src/lib/`
Shared utilities and configurations:
- **`supabase.ts`** - Database client and TypeScript types
- **`utils.ts`** - Helper functions (tracking, formatting, etc.)

### 📂 `/netlify/functions/`
Netlify serverless functions (Node.js):
- **`track-click.ts`** - Records product clicks to database

### 📂 `/api/`
Vercel serverless functions (same functionality as Netlify):
- **`track-click.ts`** - Same as Netlify version, different platform

### 📂 `/database/`
Database setup and management:
- **`schema.sql`** - Create tables and indexes
- **`queries.sql`** - Analytics query examples
- **`seed.sql`** - Sample test data
- **`firebase-alternative.md`** - Firebase setup if you prefer it

### 📂 `/public/`
Static assets served as-is:
- **`logo.svg`** - Your site logo (replace this!)
- **`robots.txt`** - Search engine rules
- **`sitemap.xml`** - SEO sitemap

### 📂 `/.vscode/`
VS Code workspace settings:
- **`settings.json`** - Editor preferences
- **`extensions.json`** - Recommended extensions

### 📂 `/dist/` (Generated)
Production build output. Created by `npm run build`.
- **Don't edit manually!**
- **Deployed to hosting platform**

## Files You Should Edit

### Must Edit
- ✏️ `.env` - Add your Supabase credentials
- ✏️ `src/components/Hero.tsx` - Customize headline
- ✏️ `src/components/Footer.tsx` - Add your links
- ✏️ `tailwind.config.js` - Change colors/theme

### Should Edit
- ✏️ `public/logo.svg` - Add your logo
- ✏️ `index.html` - Update page title & description
- ✏️ `public/sitemap.xml` - Add your domain
- ✏️ `public/robots.txt` - Update sitemap URL

### Optional Edit
- ✏️ `src/components/ProductCard.tsx` - Adjust card design
- ✏️ `src/pages/HomePage.tsx` - Modify layout
- ✏️ `README.md` - Personalize docs

## Files You Shouldn't Touch

### Never Edit
- ❌ `package-lock.json` - Managed by npm
- ❌ `dist/` - Generated by build
- ❌ `node_modules/` - Managed by npm
- ❌ `.vscode/` - IDE settings (unless you know what you're doing)

### Rarely Edit
- ⚠️ `vite.config.ts` - Only if you need custom build config
- ⚠️ `tsconfig.json` - Only if you need TypeScript tweaks
- ⚠️ `.eslintrc.cjs` - Only if you want different linting rules

## Navigation Tips

### Finding Components
```bash
# All UI components
src/components/

# Admin-specific
src/components/admin/

# Page routes
src/pages/
```

### Finding Configs
```bash
# Deployment
netlify.toml, vercel.json

# TypeScript
tsconfig.json

# Tailwind
tailwind.config.js

# Vite
vite.config.ts
```

### Finding Docs
```bash
# All in root directory
README.md             - Main docs
QUICK_START.md        - Fast setup
START_HERE.md         - Overview
```

### Finding Serverless Functions
```bash
# Netlify
netlify/functions/track-click.ts

# Vercel
api/track-click.ts
```

## Import Paths

The project uses path aliases for cleaner imports:

```typescript
// Instead of: import { supabase } from '../../lib/supabase'
import { supabase } from '@/lib/supabase'

// Instead of: import utils from '../../lib/utils'
import { slugify } from '@/lib/utils'
```

Configured in:
- `vite.config.ts` (build-time resolution)
- `tsconfig.json` (TypeScript intellisense)

## Hidden Files (Start with .)

```
.env                  # Your secrets (NEVER commit!)
.env.example          # Template (safe to commit)
.gitignore            # Files Git ignores
.editorconfig         # Editor rules
.eslintrc.cjs         # Linting rules
```

**Show hidden files:**
- **Windows Explorer:** View > Show > Hidden items
- **Mac Finder:** Cmd + Shift + .
- **VS Code:** Already shows them

## Generated Files

These are created automatically:

```
dist/                 # After: npm run build
node_modules/         # After: npm install
package-lock.json     # After: npm install (first time)
.vite/                # During: npm run dev (cache)
```

**Can be safely deleted and regenerated!**

## Recommended File Order for Newcomers

1. **Read first:**
   - START_HERE.md
   - QUICK_START.md
   - README.md

2. **Set up:**
   - package.json (review dependencies)
   - .env (add your secrets)
   - database/schema.sql (run in Supabase)

3. **Explore code:**
   - src/App.tsx (routing)
   - src/pages/HomePage.tsx (main page)
   - src/components/Hero.tsx (first component)
   - src/components/ProductCard.tsx (key component)

4. **Customize:**
   - tailwind.config.js (colors)
   - src/components/Hero.tsx (headline)
   - public/logo.svg (branding)

5. **Deploy:**
   - netlify.toml or vercel.json
   - DEPLOYMENT_CHECKLIST.md

---

**Lost?** Start with [START_HERE.md](./START_HERE.md) or [QUICK_START.md](./QUICK_START.md)!
