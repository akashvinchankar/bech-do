-- Migration to add missing columns to match Go models

-- Add username to users table
ALTER TABLE users ADD COLUMN username VARCHAR(100) UNIQUE;

-- Add slug to categories table
ALTER TABLE categories ADD COLUMN slug VARCHAR(100) UNIQUE;

-- Add is_sold, is_active, sold_at to products table
ALTER TABLE products ADD COLUMN is_sold BOOLEAN DEFAULT FALSE;
ALTER TABLE products ADD COLUMN is_active BOOLEAN DEFAULT TRUE;
ALTER TABLE products ADD COLUMN sold_at TIMESTAMP WITH TIME ZONE;

-- Ensure views column matches Go model expectations
-- (No change needed, views is already correct in DB)

-- Update triggers to include new columns (if necessary)
-- No changes needed for triggers as they apply to updated_at automatically