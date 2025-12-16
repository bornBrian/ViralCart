# Database Migration Required

## Important: Run This SQL in Supabase

Before testing the new features (videos and product details), you need to add the `videos` and `category` columns to your database.

### Steps:

1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/iylsmwivoxdbivzuiksk
2. Click **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy and paste the following SQL:

```sql
-- Add videos and category columns to products table
ALTER TABLE products ADD COLUMN IF NOT EXISTS videos text[];
ALTER TABLE products ADD COLUMN IF NOT EXISTS category text;
```

5. Click **Run** (or press Ctrl+Enter)
6. You should see "Success. No rows returned"

### What This Does:

- **videos column**: Allows storing multiple video URLs for each product (optional)
- **category column**: Allows categorizing products (optional, used in detail page display)

### After Running:

✅ Admin panel will be able to upload videos
✅ Product detail pages will show Images/Videos tabs when videos exist
✅ No errors when adding products with videos

---

**File Location:** The SQL is also saved in `database/add_videos_column.sql`
