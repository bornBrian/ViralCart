# 🚀 Deploy Viral Cart - Complete Guide

Follow these steps to get your site live for FREE and accessible 24/7!

---

## Step 1: Set Up Your Database (5 minutes)

### Run the Database Schema

1. Go to: **https://supabase.com/dashboard/project/iylsmwivoxdbivzuiksk/sql/new**

2. Open `d:\ViralCart\database\schema.sql` in VS Code

3. Copy **ALL** the content (Ctrl+A, then Ctrl+C)

4. Paste it into the Supabase SQL Editor

5. Click the **RUN** button (bottom right)

6. You should see: ✅ **"Success. No rows returned"**

---

## Step 2: Push to GitHub (10 minutes)

### 2.1 Create a new GitHub repository

1. Go to: **https://github.com/new**

2. Repository name: `viral-cart` (or any name you like)

3. Make it **Public**

4. **DO NOT** add README, .gitignore, or license (we already have these)

5. Click **"Create repository"**

### 2.2 Push your code

Open a new PowerShell terminal in VS Code and run these commands ONE BY ONE:

```powershell
# Initialize git (if not already done)
cd D:\ViralCart
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit - Viral Cart storefront"

# Add your GitHub repository (REPLACE with YOUR username and repo name)
git remote add origin https://github.com/YOUR_USERNAME/viral-cart.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Important:** Replace `YOUR_USERNAME` with your actual GitHub username!

If asked to log in, use your GitHub credentials.

---

## Step 3: Deploy to Vercel (5 minutes)

### 3.1 Sign up for Vercel

1. Go to: **https://vercel.com/signup**

2. Click **"Continue with GitHub"**

3. Authorize Vercel to access your repositories

### 3.2 Import your project

1. On the Vercel dashboard, click **"Add New..." → "Project"**

2. Find `viral-cart` in your repository list

3. Click **"Import"**

### 3.3 Configure environment variables

Before clicking "Deploy", scroll down to **Environment Variables** and add these 3 variables:

| Name | Value |
|------|-------|
| `VITE_SUPABASE_URL` | `https://iylsmwivoxdbivzuiksk.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5bHNtd2l2b3hkYml2enVpa3NrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ0NTE3MjUsImV4cCI6MjA1MDAyNzcyNX0.E_N7IG7tF2sXPqoRb6Wd2gLDcQ3K0kHLTGINHFLaRUY` |
| `VITE_ADMIN_TOKEN` | `viral-cart-admin-2025-secure-token` |

**Copy these values exactly!**

### 3.4 Deploy

1. Click the **"Deploy"** button

2. Wait 2-3 minutes for the build to complete

3. You'll see: 🎉 **"Congratulations! Your project has been deployed"**

4. Click on the deployment URL (something like `viral-cart.vercel.app`)

---

## Step 4: Get Your Live URL

After deployment, your site will be live at:

```
https://viral-cart-XXXXXXX.vercel.app
```

Or you can add a custom domain later (free with Vercel)!

---

## 📱 Add to Instagram Bio

1. Copy your Vercel URL

2. Go to Instagram → Edit Profile

3. Add to your bio:
   ```
   🛍️ Shop curated finds
   👇 viralcart-xxxxx.vercel.app
   ```

Or use a link shortener like:
- **bit.ly** → `bit.ly/viralcart`
- **linktr.ee** → Create a linktree with your URL

---

## 🎨 Upload Your First Products

Once live, go to:
```
https://your-site.vercel.app/admin?token=viral-cart-admin-2025-secure-token
```

Click **"Upload New"** and add products with:
- Product name
- Price (e.g., $29.99)
- Description
- Amazon affiliate link
- Image URLs (from Unsplash or Amazon)

Example image URL:
```
https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600
```

---

## ✅ Your Site is Now:

- ✨ **Live 24/7** (even when your computer is off)
- 🌍 **Accessible worldwide**
- ⚡ **Lightning fast** (Vercel's global CDN)
- 💰 **100% FREE** (no credit card required)
- 🔄 **Auto-updates** (push to GitHub, Vercel rebuilds automatically)

---

## 🚨 Troubleshooting

### Build fails on Vercel?

Make sure you added all 3 environment variables correctly.

### Admin page not working?

Check that you're using the correct admin token:
```
?token=viral-cart-admin-2025-secure-token
```

### Products not showing?

1. Verify you ran the database schema in Supabase
2. Check that products were uploaded successfully in the admin panel

---

## 🎯 Next Steps

1. **Add products** via the admin panel
2. **Share your link** on Instagram
3. **Track clicks** in the Analytics tab
4. **Earn commissions** from Amazon sales!

---

**Need help?** Check the logs in Vercel dashboard or your Supabase database tables.

Happy selling! 🎉
