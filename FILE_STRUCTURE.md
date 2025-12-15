# Viral Cart - Complete File Structure

Below is the complete file tree for the Viral Cart project:

```
ViralCart/
│
├── public/                          # Static assets
│   └── vite.svg                     # Default Vite logo (replace with your logo)
│
├── src/                             # Source code
│   ├── components/                  # React components
│   │   ├── admin/                   # Admin-specific components
│   │   │   ├── AnalyticsDashboard.tsx   # Analytics charts and metrics
│   │   │   ├── ProductList.tsx          # Product management list
│   │   │   └── ProductUploadForm.tsx    # Product upload form
│   │   ├── Footer.tsx               # Site footer with disclosure
│   │   ├── Hero.tsx                 # Hero section with CTA
│   │   ├── ProductCard.tsx          # Individual product card
│   │   ├── ProductDetailOverlay.tsx # Product detail modal
│   │   └── ProductGrid.tsx          # Product grid layout
│   │
│   ├── pages/                       # Page components
│   │   ├── AdminPage.tsx            # Admin dashboard page
│   │   └── HomePage.tsx             # Main landing page
│   │
│   ├── lib/                         # Utilities and configurations
│   │   ├── supabase.ts              # Supabase client and types
│   │   └── utils.ts                 # Helper functions
│   │
│   ├── App.tsx                      # Main app component with routing
│   ├── main.tsx                     # React entry point
│   └── index.css                    # Global styles and Tailwind imports
│
├── netlify/                         # Netlify-specific files
│   └── functions/                   # Netlify serverless functions
│       ├── track-click.ts           # Click tracking function
│       └── package.json             # Function dependencies
│
├── api/                             # Vercel serverless functions
│   └── track-click.ts               # Click tracking function (Vercel)
│
├── database/                        # Database schemas and queries
│   ├── schema.sql                   # Supabase table definitions
│   ├── queries.sql                  # Example analytics queries
│   ├── seed.sql                     # Sample data for testing
│   └── firebase-alternative.md      # Firebase setup instructions
│
├── .vscode/                         # VS Code workspace settings
│   ├── extensions.json              # Recommended extensions
│   └── settings.json                # Editor settings
│
├── .editorconfig                    # Editor configuration
├── .env.example                     # Environment variables template
├── .eslintrc.cjs                    # ESLint configuration
├── .gitignore                       # Git ignore rules
├── DEPLOYMENT_CHECKLIST.md          # Pre-deployment checklist
├── index.html                       # HTML entry point
├── netlify.toml                     # Netlify configuration
├── package.json                     # Project dependencies and scripts
├── postcss.config.js                # PostCSS configuration
├── README.md                        # Main documentation
├── tailwind.config.js               # Tailwind CSS configuration
├── tsconfig.json                    # TypeScript configuration
├── tsconfig.node.json               # TypeScript config for Node
├── vercel.json                      # Vercel configuration
└── vite.config.ts                   # Vite build configuration
```

## Key Directories Explained

### `/src/components/`
React components organized by feature. The `admin/` subdirectory contains all admin-specific UI.

### `/netlify/functions/` & `/api/`
Serverless functions for both platforms. Netlify uses `/netlify/functions/`, Vercel uses `/api/`.

### `/database/`
All database-related files including schemas, example queries, and seed data.

### `/src/lib/`
Shared utilities, API clients, and helper functions used across the app.

## Core Files

| File | Purpose |
|------|---------|
| `package.json` | Dependencies and npm scripts |
| `vite.config.ts` | Vite bundler configuration |
| `tailwind.config.js` | Design system and theme |
| `netlify.toml` / `vercel.json` | Deployment configurations |
| `.env.example` | Environment variables template |

## Component Hierarchy

```
App
├── HomePage
│   ├── Hero
│   ├── ProductGrid
│   │   └── ProductCard (multiple)
│   └── ProductDetailOverlay
└── AdminPage
    ├── ProductUploadForm
    ├── ProductList
    └── AnalyticsDashboard

Footer (global)
```

## API Routes

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/track-click` | POST | Record product click for analytics |

## Admin Routes

| Route | Purpose | Auth Required |
|-------|---------|---------------|
| `/admin?token=XXX` | Admin dashboard | Yes (token) |

---

This structure is designed for:
- ✅ Easy navigation
- ✅ Clear separation of concerns
- ✅ Scalability
- ✅ Multiple deployment targets
