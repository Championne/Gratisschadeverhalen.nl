/**
 * Admin Role Verification
 * 
 * Simple but secure admin check using environment variable.
 * Configure ADMIN_EMAILS in Vercel with comma-separated admin email addresses.
 * 
 * Example: ADMIN_EMAILS=gert.jan@example.com,admin@gratisschadeverhalen.nl
 */

import { User } from '@supabase/supabase-js'

/**
 * Check if a user has admin privileges
 * @param user - Supabase user object
 * @returns true if user is an admin
 */
export function isAdmin(user: User | null): boolean {
  if (!user || !user.email) {
    return false
  }

  const adminEmailsEnv = process.env.ADMIN_EMAILS || ''
  
  // Parse comma-separated list of admin emails
  const adminEmails = adminEmailsEnv
    .split(',')
    .map(email => email.trim().toLowerCase())
    .filter(email => email.length > 0)

  // If no admin emails configured, deny all access (fail secure)
  if (adminEmails.length === 0) {
    console.warn('⚠️ SECURITY: No ADMIN_EMAILS configured - admin access denied to all users')
    return false
  }

  const userEmail = user.email.toLowerCase()
  const isUserAdmin = adminEmails.includes(userEmail)

  if (!isUserAdmin) {
    console.log(`🔒 Admin access denied for: ${userEmail}`)
  }

  return isUserAdmin
}

/**
 * Get list of configured admin emails (for logging/debugging)
 * Returns censored emails for security
 */
export function getAdminEmailCount(): number {
  const adminEmailsEnv = process.env.ADMIN_EMAILS || ''
  return adminEmailsEnv.split(',').filter(e => e.trim().length > 0).length
}

/**
 * Validate that admin system is properly configured
 * Call this at startup to ensure security
 */
export function validateAdminConfig(): { valid: boolean; warning?: string } {
  const adminEmailsEnv = process.env.ADMIN_EMAILS || ''
  const adminEmails = adminEmailsEnv.split(',').filter(e => e.trim().length > 0)

  if (adminEmails.length === 0) {
    return {
      valid: false,
      warning: 'ADMIN_EMAILS not configured - admin dashboard will be inaccessible'
    }
  }

  // Check for obviously invalid emails
  const invalidEmails = adminEmails.filter(email => !email.includes('@'))
  if (invalidEmails.length > 0) {
    return {
      valid: false,
      warning: `Invalid admin emails detected: ${invalidEmails.join(', ')}`
    }
  }

  return { valid: true }
}
