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
    USING (user_email = auth.jwt() ->> 'email');

  -- 5. Create policy: Users can create orders
  CREATE POLICY "Users can create orders" ON orders
    FOR INSERT
    WITH CHECK (user_email = auth.jwt() ->> 'email');

  -- 6. Create policy: Users can update their own orders
  CREATE POLICY "Users can update own orders" ON orders
    FOR UPDATE
    USING (user_email = auth.jwt() ->> 'email')
    WITH CHECK (user_email = auth.jwt() ->> 'email');

  -- 7. Create policy: Users can delete their own orders
  CREATE POLICY "Users can delete own orders" ON orders
    FOR DELETE
    USING (user_email = auth.jwt() ->> 'email');

  -- 8. Create policy: Authenticated users can view all orders (for admin/dashboard)
  CREATE POLICY "Authenticated users can view all orders" ON orders
    FOR SELECT
    TO authenticated
    USING (true);

  -- 9. Create index for faster order lookups by user email
  CREATE INDEX IF NOT EXISTS idx_orders_user_email ON orders(user_email);

  -- 10. Verify setup
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
