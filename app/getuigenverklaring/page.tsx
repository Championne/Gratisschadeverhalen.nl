"use client"

import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Printer, Download, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function GetuigenverklaringPage() {
  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Print Controls - Hidden when printing */}
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

      {/* Printable Form */}
      <main className="container mx-auto px-4 py-8 print:py-0">
        <div className="max-w-3xl mx-auto bg-white print:max-w-none">
          
          {/* Header */}
          <div className="border-b-2 border-primary pb-4 mb-6 print:pb-2 print:mb-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-primary print:text-xl">GETUIGENVERKLARING</h1>
                <p className="text-sm text-muted-foreground">112autoschade.nl</p>
              </div>
              <div className="text-right print:hidden">
                <Image 
                  src="/logo.png" 
                  alt="112autoschade.nl" 
                  width={150} 
                  height={40}
                  className="h-10 w-auto"
                />
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 print:bg-gray-100 print:border-gray-300 print:p-3 print:mb-4">
            <p className="text-sm">
              <strong>Instructie:</strong> Vul dit formulier volledig in. De getuige dient het formulier te ondertekenen. 
              Stuur het ingevulde formulier naar <strong>info@112autoschade.nl</strong> of upload het via uw dashboard.
            </p>
          </div>

          {/* Section 1: Gegevens Getuige */}
          <section className="mb-6 print:mb-4">
            <h2 className="text-lg font-bold border-b border-gray-300 pb-2 mb-4 print:text-base print:pb-1 print:mb-3">
              1. Gegevens van de getuige
            </h2>
            <div className="space-y-4 print:space-y-2">
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
                <label className="text-sm font-medium">Adres (straat + huisnummer)</label>
                <div className="border-b border-gray-400 h-8 print:h-6"></div>
              </div>
              <div className="grid grid-cols-2 gap-4 print:gap-2">
                <div>
                  <label className="text-sm font-medium">Postcode</label>
                  <div className="border-b border-gray-400 h-8 print:h-6"></div>
                </div>
                <div>
                  <label className="text-sm font-medium">Woonplaats</label>
                  <div className="border-b border-gray-400 h-8 print:h-6"></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 print:gap-2">
                <div>
                  <label className="text-sm font-medium">Telefoonnummer</label>
                  <div className="border-b border-gray-400 h-8 print:h-6"></div>
                </div>
                <div>
                  <label className="text-sm font-medium">E-mailadres</label>
                  <div className="border-b border-gray-400 h-8 print:h-6"></div>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Relatie tot betrokkene (bijv. geen, kennis, collega, familie)</label>
                <div className="border-b border-gray-400 h-8 print:h-6"></div>
              </div>
            </div>
          </section>

          {/* Section 2: Gegevens Ongeval */}
          <section className="mb-6 print:mb-4">
            <h2 className="text-lg font-bold border-b border-gray-300 pb-2 mb-4 print:text-base print:pb-1 print:mb-3">
              2. Gegevens van het ongeval
            </h2>
            <div className="space-y-4 print:space-y-2">
              <div className="grid grid-cols-2 gap-4 print:gap-2">
                <div>
                  <label className="text-sm font-medium">Datum ongeval</label>
                  <div className="border-b border-gray-400 h-8 print:h-6"></div>
                </div>
                <div>
                  <label className="text-sm font-medium">Tijdstip ongeval</label>
                  <div className="border-b border-gray-400 h-8 print:h-6"></div>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Locatie/adres van het ongeval</label>
                <div className="border-b border-gray-400 h-8 print:h-6"></div>
              </div>
              <div>
                <label className="text-sm font-medium">Waar bevond u zich ten opzichte van het ongeval?</label>
                <div className="border-b border-gray-400 h-8 print:h-6"></div>
              </div>
              <div>
                <label className="text-sm font-medium">Weersomstandigheden (droog, regen, mist, etc.)</label>
                <div className="border-b border-gray-400 h-8 print:h-6"></div>
              </div>
            </div>
          </section>

          {/* Section 3: Beschrijving */}
          <section className="mb-6 print:mb-4">
            <h2 className="text-lg font-bold border-b border-gray-300 pb-2 mb-4 print:text-base print:pb-1 print:mb-3">
              3. Beschrijving van het ongeval
            </h2>
            <p className="text-sm text-muted-foreground mb-3 print:mb-2">
              Beschrijf zo nauwkeurig mogelijk wat u heeft gezien. Vermeld indien mogelijk: rijrichting, snelheid, 
              richtingaanwijzers, verkeerslichten, voorrang, positie voertuigen, remmen, etc.
            </p>
            <div className="border border-gray-400 min-h-[200px] print:min-h-[150px] p-2">
              {/* Lines for writing */}
              <div className="space-y-6 print:space-y-4">
                <div className="border-b border-gray-300"></div>
                <div className="border-b border-gray-300"></div>
                <div className="border-b border-gray-300"></div>
                <div className="border-b border-gray-300"></div>
                <div className="border-b border-gray-300"></div>
                <div className="border-b border-gray-300"></div>
                <div className="border-b border-gray-300"></div>
                <div className="border-b border-gray-300"></div>
              </div>
            </div>
          </section>

          {/* Section 4: Schets */}
          <section className="mb-6 print:mb-4">
            <h2 className="text-lg font-bold border-b border-gray-300 pb-2 mb-4 print:text-base print:pb-1 print:mb-3">
              4. Schets van de situatie (optioneel)
            </h2>
            <p className="text-sm text-muted-foreground mb-3 print:mb-2">
              Teken hier een schets van de situatie met de positie van de voertuigen, rijrichting, etc.
            </p>
            <div className="border border-gray-400 min-h-[150px] print:min-h-[100px]"></div>
          </section>

          {/* Section 5: Ondertekening */}
          <section className="mb-6 print:mb-4">
            <h2 className="text-lg font-bold border-b border-gray-300 pb-2 mb-4 print:text-base print:pb-1 print:mb-3">
              5. Ondertekening
            </h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 print:bg-white print:p-3">
              <p className="text-sm mb-4 print:mb-3">
                Ondergetekende verklaart dat bovenstaande verklaring naar waarheid is ingevuld en dat hij/zij 
                bereid is deze verklaring indien nodig onder ede te bevestigen.
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
                <label className="text-sm font-medium">Handtekening getuige</label>
                <div className="border border-gray-400 h-24 print:h-16 mt-2 rounded"></div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <div className="text-center text-sm text-muted-foreground border-t pt-4 print:pt-2 print:text-xs">
            <p>
              <strong>112autoschade.nl</strong> | 085 060 5357 | info@112autoschade.nl | www.112autoschade.nl
            </p>
            <p className="mt-1">
              Stuur dit formulier naar info@112autoschade.nl of upload het via uw persoonlijke dashboard.
            </p>
          </div>

        </div>
      </main>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          @page {
            margin: 1.5cm;
            size: A4;
          }
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </div>
  )
}
