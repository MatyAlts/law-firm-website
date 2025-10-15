-- Create admin user in Supabase Auth
-- Email: natal00203@gmail.com
-- Password: Mustafa1308

-- First, insert into auth.users with encrypted password
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  confirmation_token,
  recovery_token
)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'natal00203@gmail.com',
  crypt('Mustafa1308', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  FALSE,
  '',
  ''
)
RETURNING id;

-- Then insert into admin_profiles using the same user id
-- Note: You'll need to replace the UUID below with the one returned from the previous query
-- Or run this as a transaction

DO $$
DECLARE
  new_user_id uuid;
BEGIN
  -- Insert user into auth.users
  INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    raw_app_meta_data,
    raw_user_meta_data,
    is_super_admin
  )
  VALUES (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    'natal00203@gmail.com',
    crypt('Mustafa1308', gen_salt('bf')),
    NOW(),
    NOW(),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    '{}',
    FALSE
  )
  RETURNING id INTO new_user_id;

  -- Insert into admin_profiles
  INSERT INTO public.admin_profiles (id, email, full_name, created_at)
  VALUES (new_user_id, 'natal00203@gmail.com', 'Admin User', NOW());
  
  RAISE NOTICE 'Admin user created with ID: %', new_user_id;
END $$;
