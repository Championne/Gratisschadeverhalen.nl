"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Loader2, User, Mail, Calendar, LogOut } from "lucide-react"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"

interface UserProfile {
  id: string
  full_name: string | null
  avatar_url: string | null
  email: string
  created_at: string
  provider: string
}

export function ProfileSettings() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [fullName, setFullName] = useState("")

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const supabase = createClient()
      
      // Haal user data op
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      if (userError || !user) throw userError

      // Haal profile op
      const { data: profileData, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (profileError && profileError.code !== 'PGRST116') {
        throw profileError
      }

      const combinedProfile: UserProfile = {
        id: user.id,
        full_name: profileData?.full_name || user.user_metadata?.full_name || null,
        avatar_url: profileData?.avatar_url || user.user_metadata?.avatar_url || null,
        email: user.email || '',
        created_at: user.created_at,
        provider: user.app_metadata?.provider || 'email'
      }

      setProfile(combinedProfile)
      setFullName(combinedProfile.full_name || '')
    } catch (error: any) {
      console.error('Error fetching profile:', error)
      toast.error('Kon profiel niet laden')
    } finally {
      setIsFetching(false)
    }
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const supabase = createClient()
      
      // Update profile in database
      const { error } = await supabase
        .from('user_profiles')
        .update({ 
          full_name: fullName,
          updated_at: new Date().toISOString()
        })
        .eq('id', profile?.id)

      if (error) throw error

      // Update local state
      if (profile) {
        setProfile({ ...profile, full_name: fullName })
      }

      toast.success('Profiel bijgewerkt!')
    } catch (error: any) {
      console.error('Error updating profile:', error)
      toast.error('Kon profiel niet bijwerken', {
        description: error.message
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      const supabase = createClient()
      await supabase.auth.signOut()
      toast.success('Uitgelogd')
      router.push('/')
      router.refresh()
    } catch (error) {
      console.error('Logout error:', error)
      toast.error('Uitloggen mislukt')
    }
  }

  if (isFetching) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!profile) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">Kon profiel niet laden</p>
        </CardContent>
      </Card>
    )
  }

  const initials = profile.full_name
    ?.split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase() || profile.email[0].toUpperCase()

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('nl-NL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="space-y-6">
      {/* Profile Card */}
      <Card>
        <CardHeader>
          <CardTitle>Profiel Informatie</CardTitle>
          <CardDescription>
            Beheer je persoonlijke gegevens
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar Section */}
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={profile.avatar_url || undefined} alt={profile.full_name || 'User'} />
              <AvatarFallback className="text-lg">{initials}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{profile.full_name || 'Geen naam'}</h3>
              <p className="text-sm text-muted-foreground">{profile.email}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Ingelogd via: <span className="font-medium capitalize">{profile.provider}</span>
              </p>
            </div>
          </div>

          {/* Edit Form */}
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Volledige Naam</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Je volledige naam"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Button type="submit" disabled={isLoading || fullName === profile.full_name}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Opslaan...
                </>
              ) : (
                'Profiel Bijwerken'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Account Info Card */}
      <Card>
        <CardHeader>
          <CardTitle>Account Informatie</CardTitle>
          <CardDescription>
            Details over je account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="font-medium">Email</p>
              <p className="text-muted-foreground">{profile.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="font-medium">Lid sinds</p>
              <p className="text-muted-foreground">{formatDate(profile.created_at)}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <User className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="font-medium">Login methode</p>
              <p className="text-muted-foreground capitalize">{profile.provider}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Logout Card */}
      <Card>
        <CardHeader>
          <CardTitle>Sessie</CardTitle>
          <CardDescription>
            Beheer je inlog sessie
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            variant="destructive" 
            onClick={handleLogout}
            className="w-full sm:w-auto"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Uitloggen
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
