import { Metadata } from "next"
import { SignupForm } from "@/components/auth/signup-form"
import { Car } from "lucide-react"
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
