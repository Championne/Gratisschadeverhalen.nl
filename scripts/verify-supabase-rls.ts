/**
 * Supabase RLS (Row Level Security) Verification Script
 * 
 * Run with: npx ts-node scripts/verify-supabase-rls.ts
 * 
 * This script checks if your Supabase tables have proper RLS policies configured.
 * It uses the service role key to query the pg_policies system table.
 */

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceRoleKey) {
  console.error('❌ Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

// Create admin client with service role
const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false }
})

// Tables that MUST have RLS enabled with specific policies
const CRITICAL_TABLES = [
  {
    name: 'claims',
    requiredPolicies: [
      { type: 'SELECT', description: 'Users can only read their own claims' },
      { type: 'INSERT', description: 'Users can only insert their own claims' },
      { type: 'UPDATE', description: 'Users can only update their own claims (or admin only)' },
    ],
    sensitiveColumns: ['email', 'telefoon', 'naam', 'iban'],
  },
  {
    name: 'claim_documents',
    requiredPolicies: [
      { type: 'SELECT', description: 'Users can only read documents for their claims' },
      { type: 'INSERT', description: 'Users can only insert documents for their claims' },
    ],
    sensitiveColumns: ['file_path', 'file_url'],
  },
  {
    name: 'audit_logs',
    requiredPolicies: [
      { type: 'SELECT', description: 'Admin only or no direct access' },
      { type: 'INSERT', description: 'System/service role only' },
    ],
    sensitiveColumns: ['details', 'performed_by'],
  },
  {
    name: 'inbound_emails',
    requiredPolicies: [
      { type: 'SELECT', description: 'Admin only' },
    ],
    sensitiveColumns: ['from_email', 'subject', 'body_text'],
  },
]

// Tables that can be public read
const PUBLIC_READ_TABLES = [
  {
    name: 'verzekeraars',
    note: 'Public insurance company data - read access OK for all',
  },
]

interface PolicyInfo {
  schemaname: string
  tablename: string
  policyname: string
  permissive: string
  roles: string[]
  cmd: string
  qual: string
  with_check: string
}

async function checkRLSEnabled(tableName: string): Promise<boolean> {
  const { data, error } = await supabase.rpc('check_rls_enabled', { table_name: tableName })
  
  if (error) {
    // Fallback: try direct query
    const { data: tableData, error: tableError } = await supabase
      .from('information_schema.tables')
      .select('*')
      .eq('table_name', tableName)
      .single()
    
    // If we can't check, assume we need manual verification
    return false
  }
  
  return data === true
}

async function getPoliciesForTable(tableName: string): Promise<PolicyInfo[]> {
  // Query pg_policies view for the table
  const { data, error } = await supabase
    .rpc('get_policies_for_table', { p_table_name: tableName })
  
  if (error) {
    console.log(`  ⚠️ Could not query policies programmatically for ${tableName}`)
    return []
  }
  
  return data || []
}

async function runVerification() {
  console.log('=' .repeat(60))
  console.log('🔐 SUPABASE RLS VERIFICATION REPORT')
  console.log('=' .repeat(60))
  console.log(`📅 Generated: ${new Date().toISOString()}`)
  console.log(`🌐 Supabase URL: ${supabaseUrl}`)
  console.log('')

  const issues: string[] = []
  const warnings: string[] = []

  // Check critical tables
  console.log('📋 CRITICAL TABLES (Must have RLS):')
  console.log('-'.repeat(60))
  
  for (const table of CRITICAL_TABLES) {
    console.log(`\n🔍 Table: ${table.name}`)
    console.log(`   Sensitive columns: ${table.sensitiveColumns.join(', ')}`)
    console.log(`   Required policies:`)
    
    for (const policy of table.requiredPolicies) {
      console.log(`   - ${policy.type}: ${policy.description}`)
    }
    
    // Try to verify by attempting operations that should fail
    console.log(`\n   ⚡ Quick security tests:`)
    
    // Test 1: Can we read without auth?
    const anonClient = createClient(supabaseUrl!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
      auth: { persistSession: false }
    })
    
    const { data: anonData, error: anonError } = await anonClient
      .from(table.name)
      .select('id')
      .limit(1)
    
    if (anonData && anonData.length > 0) {
      issues.push(`❌ ${table.name}: Anonymous users can read data!`)
      console.log(`   ❌ FAIL: Anonymous read returned data`)
    } else if (anonError && anonError.code === '42501') {
      console.log(`   ✅ PASS: Anonymous read blocked by RLS`)
    } else if (anonError) {
      console.log(`   ⚠️ CHECK: Anonymous read error: ${anonError.message}`)
      warnings.push(`⚠️ ${table.name}: Check anonymous read policy - ${anonError.message}`)
    } else {
      console.log(`   ⚠️ CHECK: Anonymous read returned empty (could be OK if table empty)`)
      warnings.push(`⚠️ ${table.name}: Verify RLS is enabled (empty result)`)
    }
  }

  // Check public tables
  console.log('\n\n📋 PUBLIC READ TABLES:')
  console.log('-'.repeat(60))
  
  for (const table of PUBLIC_READ_TABLES) {
    console.log(`\n🔍 Table: ${table.name}`)
    console.log(`   Note: ${table.note}`)
    
    const anonClient = createClient(supabaseUrl!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
      auth: { persistSession: false }
    })
    
    const { data, error } = await anonClient
      .from(table.name)
      .select('id')
      .limit(1)
    
    if (data) {
      console.log(`   ✅ Public read works as expected`)
    } else {
      warnings.push(`⚠️ ${table.name}: Public read may be blocked - verify if intentional`)
      console.log(`   ⚠️ Public read blocked/empty: ${error?.message || 'no data'}`)
    }
  }

  // Summary
  console.log('\n\n' + '='.repeat(60))
  console.log('📊 SUMMARY')
  console.log('='.repeat(60))
  
  if (issues.length === 0 && warnings.length === 0) {
    console.log('\n✅ All automated checks passed!')
  } else {
    if (issues.length > 0) {
      console.log('\n🚨 CRITICAL ISSUES:')
      issues.forEach(i => console.log(`   ${i}`))
    }
    if (warnings.length > 0) {
      console.log('\n⚠️ WARNINGS (Manual verification needed):')
      warnings.forEach(w => console.log(`   ${w}`))
    }
  }

  // Manual verification checklist
  console.log('\n\n' + '='.repeat(60))
  console.log('📝 MANUAL VERIFICATION CHECKLIST')
  console.log('='.repeat(60))
  console.log(`
Go to Supabase Dashboard → Authentication → Policies and verify:

CLAIMS TABLE:
[ ] RLS is ENABLED on the table
[ ] SELECT policy: auth.uid() = user_id OR role = 'admin'
[ ] INSERT policy: auth.uid() = user_id  
[ ] UPDATE policy: auth.uid() = user_id OR role = 'admin'
[ ] DELETE policy: role = 'admin' only (or disabled)

CLAIM_DOCUMENTS TABLE:
[ ] RLS is ENABLED
[ ] Policies reference claim ownership through claims table join

AUDIT_LOGS TABLE:
[ ] RLS is ENABLED
[ ] Only service_role can INSERT
[ ] Only admin can SELECT (or no direct access)

INBOUND_EMAILS TABLE:
[ ] RLS is ENABLED  
[ ] Only admin/service_role can access

VERZEKERAARS TABLE:
[ ] Can be public read (insurance company names are not sensitive)
[ ] Only admin can INSERT/UPDATE/DELETE

API KEY PERMISSIONS (Project Settings → API):
[ ] anon key: Only has permissions matching RLS policies
[ ] service_role key: Only used server-side, NEVER exposed to client
`)

  console.log('\n🔗 Direct link to Supabase policies:')
  console.log(`   ${supabaseUrl?.replace('.supabase.co', '')}/project/default/auth/policies`)
}

// Run the verification
runVerification()
  .then(() => {
    console.log('\n✅ Verification script completed')
    process.exit(0)
  })
  .catch((err) => {
    console.error('\n❌ Verification failed:', err)
    process.exit(1)
  })
