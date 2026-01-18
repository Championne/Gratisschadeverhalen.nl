import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/header"
import { ProfileSettings } from "@/components/dashboard/profile-settings"

export const metadata = {
  title: "Profiel - Gratisschadeverhalen.nl",
  description: "Beheer je profiel en account instellingen",
}

export default async function ProfilePage() {
  const supabase = await createClient()

  const { data: { user }, error: userError } = await supabase.auth.getUser()

  if (userError || !user) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader user={user} />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Profiel Instellingen</h1>
            <p className="text-muted-foreground">
              Beheer je persoonlijke gegevens en account instellingen
            </p>
          </div>

          <ProfileSettings />
        </div>
      </main>
    </div>
  )
}
