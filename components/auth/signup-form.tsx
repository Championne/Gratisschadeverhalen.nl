"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Mail, Lock, User } from "lucide-react"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"

export function SignupForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validatie
    if (formData.password !== formData.confirmPassword) {
      toast.error("Wachtwoorden komen niet overeen")
      return
    }

    if (formData.password.length < 6) {
      toast.error("Wachtwoord moet minimaal 6 tekens zijn")
      return
    }

    setIsLoading(true)

    try {
      const supabase = createClient()
      
      // Maak account aan
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.name,
          },
        },
      })

      if (error) throw error

      // Maak user profile aan
      if (data.user) {
        const { error: profileError } = await supabase
          .from('user_profiles')
          .insert([
            {
              id: data.user.id,
              full_name: formData.name,
            },
          ])

        if (profileError) {
          console.error("Profile creation error:", profileError)
        }
      }

      toast.success("Account aangemaakt!", {
        description: "Controleer je email voor de verificatie link"
      })

      router.push("/login")
    } catch (error: any) {
      console.error("Signup error:", error)
      toast.error("Registratie mislukt", {
        description: error.message || "Probeer het later opnieuw"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignup = async () => {
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) throw error
    } catch (error: any) {
      console.error("Google signup error:", error)
      toast.error("Google registratie mislukt", {
        description: error.message
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Aanmaken</CardTitle>
        <CardDescription>
          Maak een gratis account aan in 30 seconden
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Google Signup */}
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={handleGoogleSignup}
        >
          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Registreer met Google
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              Of met email
            </span>
          </div>
        </div>

        {/* Email Signup Form */}
        <form onSubmit={handleSignup} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Volledige Naam</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Jan de Vries"
                value={formData.name}
                onChange={handleChange}
                required
                className="pl-10"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="jouw@email.nl"
                value={formData.email}
                onChange={handleChange}
                required
                className="pl-10"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Wachtwoord</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Minimaal 6 tekens"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                className="pl-10"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Bevestig Wachtwoord</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Herhaal wachtwoord"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="pl-10"
              />
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Account aanmaken...
              </>
            ) : (
              "Account Aanmaken"
            )}
          </Button>
        </form>

        <p className="text-xs text-muted-foreground text-center">
          Door een account aan te maken ga je akkoord met onze{" "}
          <a href="/privacy" className="underline hover:text-primary">
            privacyvoorwaarden
          </a>
          .
        </p>
      </CardContent>
    </Card>
  )
}
