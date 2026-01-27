"use client"

import Link from "next/link"
import Image from "next/image"
import { Printer, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function OprijverklaringPage() {
  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Print Controls */}
      <div className="print:hidden bg-gray-50 border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <Link href="/downloads" className="text-primary hover:underline flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Terug naar Downloads
            </Link>
            <Button onClick={handlePrint} className="gap-2">
              <Printer className="h-4 w-4" />
              Afdrukken / Opslaan als PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <main className="container mx-auto px-4 py-8 print:py-0">
        <div className="max-w-3xl mx-auto bg-white print:max-w-none">
          
          {/* Header */}
          <div className="border-b-2 border-primary pb-4 mb-6 print:pb-2 print:mb-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-primary print:text-xl">OPRIJVERKLARING</h1>
                <p className="text-sm text-muted-foreground">Schuldbekentenis bij aanrijding</p>
              </div>
              <div className="text-right print:hidden">
                <Image 
                  src="/logo.png" 
                  alt="Autoschadebureau.nl" 
                  width={150} 
                  height={40}
                  className="h-10 w-auto"
                />
              </div>
            </div>
          </div>

          {/* Explanation */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 print:bg-gray-100 print:border-gray-300 print:p-3 print:mb-4">
            <p className="text-sm">
              <strong>Wat is een oprijverklaring?</strong> Dit is een schriftelijke erkenning van schuld door de 
              veroorzaker van een aanrijding. Met deze verklaring erkent de tegenpartij dat hij/zij aansprakelijk 
              is voor de schade. Dit document versterkt uw positie bij het verhalen van de schade.
            </p>
          </div>

          {/* Form */}
          <div className="space-y-6 print:space-y-4">
            
            {/* Declaration Text */}
            <section className="mb-6 print:mb-4">
              <h2 className="text-lg font-bold border-b border-gray-300 pb-2 mb-4 print:text-base print:pb-1 print:mb-3">
                Verklaring
              </h2>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 print:bg-white print:border-gray-400">
                <p className="leading-relaxed">
                  Ondergetekende verklaart hierbij dat hij/zij op <span className="border-b border-gray-400 px-8 mx-1"></span> (datum) 
                  om <span className="border-b border-gray-400 px-6 mx-1"></span> uur te <span className="border-b border-gray-400 px-16 mx-1"></span> (plaats) 
                  met zijn/haar voertuig is opgereden tegen / aangereden met het voertuig van de benadeelde partij, 
                  waardoor schade is ontstaan.
                </p>
                <p className="mt-4 leading-relaxed">
                  Ondergetekende erkent hierbij <strong>volledig aansprakelijk</strong> te zijn voor deze aanrijding 
                  en de daaruit voortvloeiende schade.
                </p>
              </div>
            </section>

            {/* Veroorzaker */}
            <section className="mb-6 print:mb-4">
              <h2 className="text-lg font-bold border-b border-gray-300 pb-2 mb-4 print:text-base print:pb-1 print:mb-3">
                1. Gegevens veroorzaker (ondergetekende)
              </h2>
              <div className="space-y-3 print:space-y-2">
                <div className="grid grid-cols-2 gap-4 print:gap-2">
                  <div>
                    <label className="text-sm font-medium">Achternaam</label>
                    <div className="border-b border-gray-400 h-8 print:h-6"></div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Voornaam</label>
                    <div className="border-b border-gray-400 h-8 print:h-6"></div>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Adres</label>
                  <div className="border-b border-gray-400 h-8 print:h-6"></div>
                </div>
                <div className="grid grid-cols-2 gap-4 print:gap-2">
                  <div>
                    <label className="text-sm font-medium">Postcode + Woonplaats</label>
                    <div className="border-b border-gray-400 h-8 print:h-6"></div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Telefoonnummer</label>
                    <div className="border-b border-gray-400 h-8 print:h-6"></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 print:gap-2">
                  <div>
                    <label className="text-sm font-medium">Kenteken voertuig</label>
                    <div className="border-b border-gray-400 h-8 print:h-6"></div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Merk/Type voertuig</label>
                    <div className="border-b border-gray-400 h-8 print:h-6"></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 print:gap-2">
                  <div>
                    <label className="text-sm font-medium">Verzekeringsmaatschappij</label>
                    <div className="border-b border-gray-400 h-8 print:h-6"></div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Polisnummer</label>
                    <div className="border-b border-gray-400 h-8 print:h-6"></div>
                  </div>
                </div>
              </div>
            </section>

            {/* Benadeelde */}
            <section className="mb-6 print:mb-4">
              <h2 className="text-lg font-bold border-b border-gray-300 pb-2 mb-4 print:text-base print:pb-1 print:mb-3">
                2. Gegevens benadeelde partij
              </h2>
              <div className="space-y-3 print:space-y-2">
                <div className="grid grid-cols-2 gap-4 print:gap-2">
                  <div>
                    <label className="text-sm font-medium">Achternaam</label>
                    <div className="border-b border-gray-400 h-8 print:h-6"></div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Voornaam</label>
                    <div className="border-b border-gray-400 h-8 print:h-6"></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 print:gap-2">
                  <div>
                    <label className="text-sm font-medium">Kenteken voertuig</label>
                    <div className="border-b border-gray-400 h-8 print:h-6"></div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Merk/Type voertuig</label>
                    <div className="border-b border-gray-400 h-8 print:h-6"></div>
                  </div>
                </div>
              </div>
            </section>

            {/* Beschrijving schade */}
            <section className="mb-6 print:mb-4">
              <h2 className="text-lg font-bold border-b border-gray-300 pb-2 mb-4 print:text-base print:pb-1 print:mb-3">
                3. Beschrijving van de schade
              </h2>
              <div className="border border-gray-400 min-h-[100px] print:min-h-[80px] p-2">
                <div className="space-y-5 print:space-y-4">
                  <div className="border-b border-gray-300"></div>
                  <div className="border-b border-gray-300"></div>
                  <div className="border-b border-gray-300"></div>
                  <div className="border-b border-gray-300"></div>
                </div>
              </div>
            </section>

            {/* Ondertekening */}
            <section className="mb-6 print:mb-4">
              <h2 className="text-lg font-bold border-b border-gray-300 pb-2 mb-4 print:text-base print:pb-1 print:mb-3">
                4. Ondertekening veroorzaker
              </h2>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 print:bg-white print:p-3">
                <p className="text-sm mb-4 print:mb-3">
                  Ondergetekende verklaart dat bovenstaande naar waarheid is ingevuld en erkent aansprakelijkheid 
                  voor de ontstane schade.
                </p>
                <div className="grid grid-cols-2 gap-8 print:gap-4">
                  <div>
                    <label className="text-sm font-medium">Plaats</label>
                    <div className="border-b border-gray-400 h-8 print:h-6"></div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Datum</label>
                    <div className="border-b border-gray-400 h-8 print:h-6"></div>
                  </div>
                </div>
                <div className="mt-6 print:mt-4">
                  <label className="text-sm font-medium">Handtekening veroorzaker</label>
                  <div className="border border-gray-400 h-20 print:h-14 mt-2 rounded"></div>
                </div>
              </div>
            </section>

          </div>

          {/* Footer */}
          <div className="text-center text-sm text-muted-foreground border-t pt-4 print:pt-2 print:text-xs">
            <p>
              <strong>Autoschadebureau.nl</strong> | 085 060 5357 | info@autoschadebureau.nl | www.autoschadebureau.nl
            </p>
          </div>

        </div>
      </main>

      <style jsx global>{`
        @media print {
          @page { margin: 1.5cm; size: A4; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .print\\:hidden { display: none !important; }
        }
      `}</style>
    </div>
  )
}
