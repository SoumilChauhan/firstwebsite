-- ============================================
-- BONTERS CORNER — SUPABASE DATABASE SETUP
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. Create the orders table first
CREATE TABLE IF NOT EXISTS orders (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  user_email text NOT NULL,
  items jsonb,
  total numeric(10, 2),
  status text DEFAULT 'pending',
  shipping_address jsonb,
  payment_method text
);

-- 2. Enable Row Level Security on orders table
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- 3. Drop existing policies if any (for clean setup)
DROP POLICY IF EXISTS "Users can view own orders" ON orders;
DROP POLICY IF EXISTS "Users can create orders" ON orders;
DROP POLICY IF EXISTS "Users can update own orders" ON orders;
DROP POLICY IF EXISTS "Users can delete own orders" ON orders;
DROP POLICY IF EXISTS "Authenticated users can view all orders" ON orders;

-- 4. Create policy: Users can view their own orders
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT
  USING (auth.jwt() ->> 'email' = user_email);

-- 5. Create policy: Users can create orders
CREATE POLICY "Users can create orders" ON orders
  FOR INSERT
  WITH CHECK (auth.jwt() ->> 'email' = user_email);

-- 6. Create policy: Users can update their own orders
CREATE POLICY "Users can update own orders" ON orders
  FOR UPDATE
  USING (auth.jwt() ->> 'email' = user_email)
  WITH CHECK (auth.jwt() ->> 'email' = user_email);

-- 7. Create policy: Users can delete their own orders
CREATE POLICY "Users can delete own orders" ON orders
  FOR DELETE
  USING (auth.jwt() ->> 'email' = user_email);

-- 8. Create policy: Authenticated users can view all orders (for admin/dashboard)
CREATE POLICY "Authenticated users can view all orders" ON orders
  FOR SELECT
  TO authenticated
  USING (true);

-- 9. Optional: Enable RLS on auth.users if not already enabled
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- 10. Grant access to authenticated users for auth tables
CREATE POLICY "Users can view own profile" ON auth.users
  FOR SELECT
  USING (auth.uid() = id);

-- 11. Create a helper function to get current user email
CREATE OR REPLACE FUNCTION get_current_user_email()
RETURNS text AS $$
  SELECT COALESCE(
    (auth.jwt() ->> 'email')::text,
    (auth.uid()::text)
  );
$$ LANGUAGE sql STABLE;

-- 12. Create index for faster order lookups by user email
CREATE INDEX IF NOT EXISTS idx_orders_user_email ON orders(user_email);

-- 13. Verify everything is set up correctly
SELECT
  'orders table exists' as check_name,
  count(*) as result
FROM information_schema.tables
WHERE table_schema = 'public' AND table_name = 'orders';

SELECT
  'RLS policies' as check_name,
  count(*) as result
FROM pg_policies
WHERE tablename = 'orders';

-- 14. Test insert (optional - removes after testing)
-- INSERT INTO orders (user_email, items, total, status)
-- VALUES ('test@example.com', '[{"name":"Test Product","price":100,"qty":1}]', 100, 'pending');
