import { Metadata } from "next"
import { LoginForm } from "@/components/auth/login-form"
import Image from "next/image"
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
          <Link href="/" className="inline-block mb-6">
            <Image 
              src="/logo.png" 
              alt="Autoschadebureau.nl Logo" 
              width={200}
              height={56}
              priority
              className="h-14 w-auto mx-auto"
            />
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
