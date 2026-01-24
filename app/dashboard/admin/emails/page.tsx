import { Metadata } from "next"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { UnmatchedEmailsClient } from "./client"

export const metadata: Metadata = {
  title: "Email Inbox - Admin",
  description: "Beheer ongematchte emails",
}

// Disable caching
export const revalidate = 0
export const dynamic = 'force-dynamic'

export default async function AdminEmailsPage() {
  const supabase = await createClient()

  // Check if user is authenticated
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  // Use service role for admin operations
  const { createClient: createServiceClient } = await import('@supabase/supabase-js')
  const supabaseAdmin = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )

  // Fetch counts for stats
  const { count: unmatchedCount } = await supabaseAdmin
    .from('inbound_emails')
    .select('*', { count: 'exact', head: true })
    .is('claim_id', null)
    .or('is_spam.is.null,is_spam.eq.false')

  const { count: spamCount } = await supabaseAdmin
    .from('inbound_emails')
    .select('*', { count: 'exact', head: true })
    .eq('is_spam', true)

  const { count: unreadCount } = await supabaseAdmin
    .from('inbound_emails')
    .select('*', { count: 'exact', head: true })
    .is('claim_id', null)
    .is('admin_reviewed', null)
    .or('is_spam.is.null,is_spam.eq.false')

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold">Email Inbox</h1>
          {(unreadCount || 0) > 0 && (
            <Badge variant="destructive" className="text-sm">
              {unreadCount} nieuw
            </Badge>
          )}
        </div>
        <p className="text-muted-foreground">
          Beheer emails die niet automatisch aan een claim gekoppeld konden worden
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Ongematchte Emails</CardDescription>
            <CardTitle className="text-3xl">{unmatchedCount || 0}</CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Ongelezen</CardDescription>
            <CardTitle className="text-3xl text-orange-600">{unreadCount || 0}</CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Spam</CardDescription>
            <CardTitle className="text-3xl text-red-600">{spamCount || 0}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Email List (Client Component) */}
      <Card>
        <CardHeader>
          <CardTitle>Ongematchte Emails</CardTitle>
          <CardDescription>
            Koppel emails aan claims of markeer als spam
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UnmatchedEmailsClient />
        </CardContent>
      </Card>
    </div>
  )
}
