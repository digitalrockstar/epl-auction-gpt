import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { getSupabasePublishableKey, getSupabaseSecretKey, getSupabaseUrl } from "@/lib/env";

export function hasSupabaseEnv() {
  return Boolean(getSupabaseUrl() && getSupabasePublishableKey());
}

export function createClient() {
  const url = getSupabaseUrl();
  const key = getSupabasePublishableKey();
  if (!url || !key) return null;
  return createSupabaseClient(url, key);
}

export function createServiceClient() {
  const url = getSupabaseUrl();
  const key = getSupabaseSecretKey();
  if (!url || !key) return null;
  return createSupabaseClient(url, key, { auth: { persistSession: false } });
/*export function hasSupabaseEnv() { return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY); }
export function createClient() { if (!hasSupabaseEnv()) return null; return createSupabaseClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!); }
export function createServiceClient() { if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) return null; return createSupabaseClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } }); }

export function createClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
*/
