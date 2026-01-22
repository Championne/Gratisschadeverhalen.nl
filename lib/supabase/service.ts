/**
 * Supabase Service Role Client
 * 
 * Deze client gebruikt de SERVICE ROLE KEY en bypassed RLS policies.
 * Gebruik ALLEEN voor:
 * - Server-side admin operations
 * - Webhooks (zonder user context)
 * - Cron jobs
 * - Background processing
 * 
 * NIET gebruiken voor user-facing operations!
 */

import { createClient } from '@supabase/supabase-js'

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL')
}

if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('Missing env.SUPABASE_SERVICE_ROLE_KEY')
}

/**
 * Create a Supabase client with SERVICE ROLE privileges
 * 
 * WARNING: This client bypasses Row Level Security!
 * Only use for trusted server-side operations.
 */
export const createServiceClient = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )
}
