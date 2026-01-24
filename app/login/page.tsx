import { Metadata } from "next"
import { LoginForm } from "@/components/auth/login-form"
import { Car } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Inloggen",
  description: "Log in op je account om je claims te bekijken",
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <Car className="h-10 w-10 text-primary" />
            <div className="flex items-center gap-1.5">
              <div className="flex flex-col leading-none">
                <span className="text-xl font-bold leading-tight">Autoschade</span>
                <span className="text-xl font-bold leading-tight">Bureau</span>
              </div>
              <span className="text-xl font-bold text-primary self-center">.nl</span>
            </div>
          </Link>
          <h1 className="text-3xl font-bold mb-2">Welkom terug</h1>
          <p className="text-muted-foreground">
            Log in om je claims te bekijken en te beheren
          </p>
        </div>

        <LoginForm />

        <p className="text-center text-sm text-muted-foreground mt-6">
          Nog geen account?{" "}
          <Link href="/registreren" className="text-primary hover:underline font-medium">
            Registreer gratis
          </Link>
        </p>
      </div>
    </div>
  )
}
