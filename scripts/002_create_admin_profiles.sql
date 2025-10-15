-- Create admin profiles table
create table if not exists public.admin_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  created_at timestamp with time zone default now()
);

-- Enable Row Level Security
alter table public.admin_profiles enable row level security;

-- Policies for admin_profiles
create policy "admin_profiles_select_own"
  on public.admin_profiles for select
  using (auth.uid() = id);

create policy "admin_profiles_insert_own"
  on public.admin_profiles for insert
  with check (auth.uid() = id);

create policy "admin_profiles_update_own"
  on public.admin_profiles for update
  using (auth.uid() = id);

-- Trigger to auto-create admin profile on signup
create or replace function public.handle_new_admin()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.admin_profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', null)
  )
  on conflict (id) do nothing;
  
  return new;
end;
$$;

drop trigger if exists on_auth_admin_created on auth.users;

create trigger on_auth_admin_created
  after insert on auth.users
  for each row
  execute function public.handle_new_admin();
