import { Metadata } from "next"
import { SignupForm } from "@/components/auth/signup-form"
import Image from "next/image"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Registreren",
  description: "Maak een gratis account aan",
}

export default function RegistrerenPage() {
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
          <h1 className="text-3xl font-bold mb-2">Account Aanmaken</h1>
          <p className="text-muted-foreground">
            Maak een gratis account aan om je claims te volgen
          </p>
        </div>

        <SignupForm />

        <p className="text-center text-sm text-muted-foreground mt-6">
          Al een account?{" "}
          <Link href="/login" className="text-primary hover:underline font-medium">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}
