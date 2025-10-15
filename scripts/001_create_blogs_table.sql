-- Create blogs table for storing blog posts
create table if not exists public.blogs (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text not null,
  sections jsonb not null default '[]'::jsonb,
  author_id uuid references auth.users(id) on delete cascade,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable Row Level Security
alter table public.blogs enable row level security;

-- Policies for blogs table
-- Anyone can read blogs
create policy "blogs_select_all"
  on public.blogs for select
  using (true);

-- Only authenticated users can insert blogs
create policy "blogs_insert_auth"
  on public.blogs for insert
  with check (auth.uid() = author_id);

-- Only authors can update their own blogs
create policy "blogs_update_own"
  on public.blogs for update
  using (auth.uid() = author_id);

-- Only authors can delete their own blogs
create policy "blogs_delete_own"
  on public.blogs for delete
  using (auth.uid() = author_id);

-- Create index for faster slug lookups
create index if not exists blogs_slug_idx on public.blogs(slug);

-- Create index for faster author lookups
create index if not exists blogs_author_id_idx on public.blogs(author_id);
