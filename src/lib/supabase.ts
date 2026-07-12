import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://pfiqxrnbvksoztjxvhim.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

let supabase: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!supabase) {
    supabase = createClient(supabaseUrl, supabaseKey);
  }
  return supabase;
}

export interface Product {
  id: string;
  slug: string;
  nameEn: string;
  nameZh: string;
  category: string;
  descriptionEn: string;
  descriptionZh: string;
  thickness: string;
  width: string;
  length: string;
  weight: string;
  color: string;
  material: string;
  featuresEn: string;
  featuresZh: string;
  applicationsEn: string;
  applicationsZh: string;
  certifications: string;
  images: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

// Get all products
export async function getProducts(): Promise<Product[]> {
  const client = getSupabase();
  const { data, error } = await client
    .from('Product')
    .select('*')
    .order('createdAt', { ascending: false });
  
  if (error) throw error;
  return data || [];
}

// Get product by ID
export async function getProductById(id: string): Promise<Product | null> {
  const client = getSupabase();
  const { data, error } = await client
    .from('Product')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) return null;
  return data;
}

// Get product by slug
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const client = getSupabase();
  const { data, error } = await client
    .from('Product')
    .select('*')
    .eq('slug', slug)
    .single();
  
  if (error) return null;
  return data;
}

// Create product
export async function createProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
  const client = getSupabase();
  const { data, error } = await client
    .from('Product')
    .insert(product)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

// Update product
export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
  const client = getSupabase();
  const { data, error } = await client
    .from('Product')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) return null;
  return data;
}

// Delete product
export async function deleteProduct(id: string): Promise<boolean> {
  const client = getSupabase();
  const { error } = await client
    .from('Product')
    .delete()
    .eq('id', id);
  
  return !error;
}

// Import products
export async function importProducts(newProducts: Partial<Product>[]): Promise<{
  created: number; updated: number; failed: number;
}> {
  const results = { created: 0, updated: 0, failed: 0 };
  
  for (const product of newProducts) {
    try {
      if (product.slug) {
        const existing = await getProductBySlug(product.slug);
        if (existing) {
          await updateProduct(existing.id, product);
          results.updated++;
        } else {
          await createProduct(product as Omit<Product, 'id' | 'createdAt' | 'updatedAt'>);
          results.created++;
        }
      } else {
        results.failed++;
      }
    } catch {
      results.failed++;
    }
  }
  return results;
}