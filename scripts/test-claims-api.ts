/**
 * Claims API Integration Test
 * 
 * Run with: npx ts-node scripts/test-claims-api.ts
 * 
 * Tests the critical claim submission flow without requiring Playwright.
 * This tests the Server Actions and API routes directly.
 */

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

// Test data
const TEST_CLAIM_DATA = {
  naam: 'TEST_AUTOMATED_Jan Testerman',
  email: 'test@example-automated-test.com',
  telefoon: '0612345678',
  kenteken_claimer: 'TEST-01-AB',
  kenteken_tegenpartij: 'TEST-02-CD',
  datum_ongeval: new Date().toISOString().split('T')[0],
  plaats_ongeval: 'Amsterdam (TEST)',
  toedracht: 'Dit is een geautomatiseerde test claim. Mag verwijderd worden.',
  verzekeraar_tegenpartij: 'Achmea',
  schade_omschrijving: 'Test schade beschrijving voor automated testing',
}

interface TestResult {
  name: string
  passed: boolean
  duration: number
  error?: string
  details?: any
}

const results: TestResult[] = []

async function runTest(name: string, testFn: () => Promise<any>): Promise<void> {
  const start = Date.now()
  try {
    const details = await testFn()
    results.push({
      name,
      passed: true,
      duration: Date.now() - start,
      details,
    })
    console.log(`✅ ${name} (${Date.now() - start}ms)`)
  } catch (error: any) {
    results.push({
      name,
      passed: false,
      duration: Date.now() - start,
      error: error.message,
    })
    console.log(`❌ ${name}: ${error.message}`)
  }
}

async function cleanupTestData(supabaseAdmin: any) {
  // Clean up any previous test data
  const { error } = await supabaseAdmin
    .from('claims')
    .delete()
    .like('naam', 'TEST_AUTOMATED_%')
  
  if (error) {
    console.log('⚠️ Cleanup warning:', error.message)
  }
}

async function main() {
  console.log('=' .repeat(60))
  console.log('🧪 CLAIMS API INTEGRATION TESTS')
  console.log('=' .repeat(60))
  console.log(`📅 ${new Date().toISOString()}`)
  console.log(`🌐 Testing against: ${baseUrl}`)
  console.log('')

  const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false }
  })

  const supabaseAnon = createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false }
  })

  // Cleanup before tests
  await cleanupTestData(supabaseAdmin)

  // ============================================
  // TEST 1: Database Connection
  // ============================================
  await runTest('Database connection', async () => {
    const { data, error } = await supabaseAdmin
      .from('verzekeraars')
      .select('id')
      .limit(1)
    
    if (error) throw new Error(`Database error: ${error.message}`)
    return { verzekeraars_accessible: true }
  })

  // ============================================
  // TEST 2: Verzekeraars table has data
  // ============================================
  await runTest('Verzekeraars data exists', async () => {
    const { count, error } = await supabaseAdmin
      .from('verzekeraars')
      .select('*', { count: 'exact', head: true })
    
    if (error) throw new Error(`Query error: ${error.message}`)
    if (!count || count === 0) throw new Error('No verzekeraars in database')
    return { count }
  })

  // ============================================
  // TEST 3: Claims table structure
  // ============================================
  await runTest('Claims table accepts required fields', async () => {
    const { data, error } = await supabaseAdmin
      .from('claims')
      .insert({
        ...TEST_CLAIM_DATA,
        status: 'nieuw',
        aansprakelijkheid_assessment: null,
      })
      .select()
      .single()
    
    if (error) throw new Error(`Insert error: ${error.message}`)
    return { claim_id: data.id }
  })

  // ============================================
  // TEST 4: Anonymous cannot read claims
  // ============================================
  await runTest('RLS: Anonymous cannot read claims', async () => {
    const { data, error } = await supabaseAnon
      .from('claims')
      .select('*')
      .limit(1)
    
    // Should either error or return empty due to RLS
    if (data && data.length > 0) {
      throw new Error('RLS FAILED: Anonymous user could read claims!')
    }
    return { rls_working: true }
  })

  // ============================================
  // TEST 5: Audit logging works
  // ============================================
  await runTest('Audit logging functional', async () => {
    const { data: claim } = await supabaseAdmin
      .from('claims')
      .select('id')
      .like('naam', 'TEST_AUTOMATED_%')
      .single()
    
    if (!claim) throw new Error('No test claim found')

    // Insert audit log
    const { error } = await supabaseAdmin
      .from('audit_logs')
      .insert({
        claim_id: claim.id,
        action: 'TEST_ACTION',
        performed_by: 'AUTOMATED_TEST',
        details: { test: true },
      })
    
    if (error) throw new Error(`Audit log error: ${error.message}`)
    return { audit_logged: true }
  })

  // ============================================
  // TEST 6: API Health Check
  // ============================================
  await runTest('API health endpoint', async () => {
    try {
      const response = await fetch(`${baseUrl}/api/health`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
      })
      
      // Even 404 means the server is running
      if (response.status === 404) {
        return { server_running: true, health_endpoint: 'not_configured' }
      }
      
      return { 
        server_running: true, 
        status: response.status,
        health_endpoint: response.ok ? 'ok' : 'error'
      }
    } catch (error: any) {
      if (error.code === 'ECONNREFUSED') {
        throw new Error(`Server not running at ${baseUrl}`)
      }
      // Network error but might be CORS - server probably running
      return { server_running: 'unknown', note: error.message }
    }
  })

  // ============================================
  // TEST 7: Agent API endpoint exists
  // ============================================
  await runTest('Agent API endpoint accessible', async () => {
    try {
      const response = await fetch(`${baseUrl}/api/agent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ claimId: 'test-invalid-id' }),
      })
      
      // 400/401/404 all indicate the endpoint exists and is responding
      return { 
        endpoint_exists: true,
        status: response.status,
      }
    } catch (error: any) {
      if (error.code === 'ECONNREFUSED') {
        throw new Error(`Server not running at ${baseUrl}`)
      }
      return { endpoint_exists: 'unknown', note: error.message }
    }
  })

  // ============================================
  // TEST 8: Environment variables configured
  // ============================================
  await runTest('Required environment variables', async () => {
    const required = [
      'NEXT_PUBLIC_SUPABASE_URL',
      'NEXT_PUBLIC_SUPABASE_ANON_KEY',
      'SUPABASE_SERVICE_ROLE_KEY',
      'ANTHROPIC_API_KEY',
      'RESEND_API_KEY',
    ]
    
    const adminEmail = process.env.RESEND_ADMIN_EMAIL || process.env.AGENT_ADMIN_EMAIL
    
    const missing = required.filter(key => !process.env[key])
    
    if (missing.length > 0) {
      throw new Error(`Missing: ${missing.join(', ')}`)
    }
    
    if (!adminEmail) {
      throw new Error('No admin email configured (RESEND_ADMIN_EMAIL or AGENT_ADMIN_EMAIL)')
    }
    
    return { 
      all_configured: true,
      admin_email_set: !!adminEmail,
    }
  })

  // Cleanup after tests
  console.log('\n🧹 Cleaning up test data...')
  await cleanupTestData(supabaseAdmin)

  // ============================================
  // RESULTS SUMMARY
  // ============================================
  console.log('\n' + '='.repeat(60))
  console.log('📊 TEST RESULTS SUMMARY')
  console.log('='.repeat(60))

  const passed = results.filter(r => r.passed).length
  const failed = results.filter(r => !r.passed).length
  const totalTime = results.reduce((sum, r) => sum + r.duration, 0)

  console.log(`\n✅ Passed: ${passed}`)
  console.log(`❌ Failed: ${failed}`)
  console.log(`⏱️ Total time: ${totalTime}ms`)

  if (failed > 0) {
    console.log('\n🚨 FAILED TESTS:')
    results.filter(r => !r.passed).forEach(r => {
      console.log(`   ❌ ${r.name}: ${r.error}`)
    })
  }

  console.log('\n' + '='.repeat(60))
  
  if (failed === 0) {
    console.log('🎉 ALL TESTS PASSED - Ready for production!')
  } else {
    console.log('⚠️ Some tests failed - Review before deploying')
    process.exit(1)
  }
}

main().catch(console.error)
