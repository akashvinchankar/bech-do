-- Bech-Do Database Schema - Initial Migration
-- This file contains the complete database schema for the marketplace

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE,
    
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    pin_code VARCHAR(20),
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin'))
);

-- Categories table
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE,
    
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    icon VARCHAR(10),
    is_active BOOLEAN DEFAULT TRUE
);

-- Products table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE,
    
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    images JSONB DEFAULT '[]'::jsonb,
    condition VARCHAR(50) NOT NULL CHECK (condition IN ('new', 'like-new', 'good', 'fair', 'poor')),
    status VARCHAR(20) DEFAULT 'available' CHECK (status IN ('available', 'sold', 'hidden')),
    location VARCHAR(200),
    is_negotiable BOOLEAN DEFAULT FALSE,
    views INTEGER DEFAULT 0,
    
    -- Foreign keys
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE RESTRICT
);

-- Admin table
CREATE TABLE admins (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE,
    
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(200) NOT NULL,
    role VARCHAR(20) DEFAULT 'admin',
    is_active BOOLEAN DEFAULT TRUE
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_active ON users(is_active) WHERE is_active = TRUE;
CREATE INDEX idx_products_user_id ON products(user_id);
CREATE INDEX idx_products_category_id ON products(category_id);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_created_at ON products(created_at DESC);
CREATE INDEX idx_products_price ON products(price);
CREATE INDEX idx_products_location ON products(location);
CREATE INDEX idx_categories_active ON categories(is_active) WHERE is_active = TRUE;

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers to all tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_admins_updated_at BEFORE UPDATE ON admins
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Insert default categories
INSERT INTO categories (name, description, icon) VALUES
('Electronics', 'Electronic devices and gadgets', '⚡'),
('Furniture', 'Home and office furniture', '🪑'),
('Clothing', 'Clothes and accessories', '👕'),
('Books', 'Books and educational materials', '📚'),
('Sports', 'Sports and fitness equipment', '⚽'),
('Vehicles', 'Cars, bikes and other vehicles', '🚗'),
('Home Appliances', 'Kitchen and household appliances', '🏠'),
('Others', 'Miscellaneous items', '📦');

-- Insert default admin user (password: 'admin123')
INSERT INTO admins (email, password, name, role, is_active) VALUES
('admin@bechdo.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'System Admin', 'admin', TRUE);

-- Create a view for active products with user and category info
CREATE VIEW active_products_view AS
SELECT 
    p.*,
    u.first_name || ' ' || u.last_name as seller_name,
    u.email as seller_email,
    u.phone_number as seller_phone,
    c.name as category_name,
    c.icon as category_icon
FROM products p
JOIN users u ON p.user_id = u.id
JOIN categories c ON p.category_id = c.id
WHERE p.deleted_at IS NULL 
    AND p.status = 'available' 
    AND u.is_active = TRUE 
    AND c.is_active = TRUE;

-- Create a function to increment product views
CREATE OR REPLACE FUNCTION increment_product_views(product_id INTEGER)
RETURNS VOID AS $$
BEGIN
    UPDATE products 
    SET views = views + 1 
    WHERE id = product_id;
END;
$$ LANGUAGE plpgsql;

-- Grant necessary permissions (adjust as needed for your setup)
-- These might not be necessary in Supabase as it handles permissions automatically
-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO your_backend_user;
-- GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO your_backend_user;