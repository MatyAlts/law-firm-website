-- Creating a safer migration that handles existing table
-- Drop existing table and recreate with proper schema
DROP TABLE IF EXISTS public.admin_profiles CASCADE;

-- Create admin_profiles table with comprehensive fields
CREATE TABLE public.admin_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin', 'editor')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_admin_profiles_email ON public.admin_profiles(email);
CREATE INDEX idx_admin_profiles_role ON public.admin_profiles(role);
CREATE INDEX idx_admin_profiles_status ON public.admin_profiles(status);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_admin_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to call the function
CREATE TRIGGER trigger_update_admin_updated_at
  BEFORE UPDATE ON public.admin_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_admin_updated_at();

-- Enable Row Level Security
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Policy: Admins can view all admin profiles
CREATE POLICY "Admins can view all admin profiles"
  ON public.admin_profiles
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_profiles
      WHERE id = auth.uid() AND status = 'active'
    )
  );

-- Policy: Super admins can insert new admin profiles
CREATE POLICY "Super admins can insert admin profiles"
  ON public.admin_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.admin_profiles
      WHERE id = auth.uid() AND role = 'super_admin' AND status = 'active'
    )
  );

-- Policy: Super admins can update admin profiles
CREATE POLICY "Super admins can update admin profiles"
  ON public.admin_profiles
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_profiles
      WHERE id = auth.uid() AND role = 'super_admin' AND status = 'active'
    )
  );

-- Policy: Admins can update their own profile
CREATE POLICY "Admins can update own profile"
  ON public.admin_profiles
  FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- Grant necessary permissions
GRANT ALL ON public.admin_profiles TO authenticated;
GRANT ALL ON public.admin_profiles TO service_role;

-- Add comment to table
COMMENT ON TABLE public.admin_profiles IS 'Stores admin user profiles with role-based access control';
