'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FileQuestion, Home, Map } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to homepage after 5 seconds
    const timer = setTimeout(() => {
      router.push('/')
    }, 5000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <FileQuestion className="h-24 w-24 text-primary mx-auto mb-6 opacity-80" />
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Pagina niet gevonden
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            De pagina die u zoekt bestaat niet of is verplaatst.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <p className="text-lg mb-6">
            U wordt automatisch doorgestuurd naar de homepage over <span className="font-bold text-primary">5 seconden</span>.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg" className="w-full sm:w-auto">
                <Home className="mr-2 h-5 w-5" />
                Naar Homepage
              </Button>
            </Link>
            
            <Link href="/sitemap.xml" target="_blank">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                <Map className="mr-2 h-5 w-5" />
                Bekijk Sitemap
              </Button>
            </Link>
          </div>
        </div>

        <div className="text-sm text-muted-foreground">
          <p className="mb-4">Populaire pagina's:</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/claim-indienen" className="text-primary hover:underline">
              Claim Indienen
            </Link>
            <span className="text-gray-300">•</span>
            <Link href="/schadescan" className="text-primary hover:underline">
              SchadeScan
            </Link>
            <span className="text-gray-300">•</span>
            <Link href="/diensten" className="text-primary hover:underline">
              Diensten
            </Link>
            <span className="text-gray-300">•</span>
            <Link href="/blog" className="text-primary hover:underline">
              Blog
            </Link>
            <span className="text-gray-300">•</span>
            <Link href="/contact" className="text-primary hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
