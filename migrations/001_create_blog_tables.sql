-- Migration: Create blog tables

-- Create blog_categories table
CREATE TABLE IF NOT EXISTS blog_categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  category VARCHAR(100) REFERENCES blog_categories(name),
  author VARCHAR(100) NOT NULL,
  image_url TEXT,
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE
);

-- Add RLS policies
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;

-- Policy to allow public read access to published posts
CREATE POLICY "Leitura pública de posts publicados"
ON blog_posts FOR SELECT
USING (published = true);

-- Policy to allow admin full access to posts
CREATE POLICY "Acesso total para administradores"
ON blog_posts FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.email = auth.jwt() ->> 'email'
    AND auth.users.email IN (SELECT unnest(string_to_array(current_setting('app.settings.admin_emails'), ',')))
  )
);

-- Policy to allow admin full access to categories
CREATE POLICY "Acesso total para administradores"
ON blog_categories FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.email = auth.jwt() ->> 'email'
    AND auth.users.email IN (SELECT unnest(string_to_array(current_setting('app.settings.admin_emails'), ',')))
  )
);