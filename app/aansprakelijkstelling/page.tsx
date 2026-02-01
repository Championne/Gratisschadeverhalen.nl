"use client"

import Link from "next/link"
import Image from "next/image"
import { Printer, ArrowLeft, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AansprakelijkstellingPage() {
  const handlePrint = () => {
    window.print()
  }

  const today = new Date().toLocaleDateString('nl-NL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

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

      {/* Info Banner */}
      <div className="print:hidden bg-amber-50 border-b border-amber-200">
        <div className="container mx-auto px-4 py-3">
          <div className="max-w-4xl mx-auto flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800">
              <strong>Tip:</strong> Dit is een voorbeeldbrief. Pas de gemarkeerde teksten aan met uw eigen gegevens 
              voordat u de brief verstuurt. Of laat ons dit voor u regelen via{" "}
              <Link href="/claim-indienen" className="text-primary hover:underline font-medium">
                claim indienen
              </Link>.
            </p>
          </div>
        </div>
      </div>

      {/* Letter Content */}
      <main className="container mx-auto px-4 py-8 print:py-0">
        <div className="max-w-3xl mx-auto bg-white print:max-w-none">
          
          {/* Header */}
          <div className="mb-8 print:mb-6">
            <div className="text-right mb-8 print:mb-6">
              <p className="font-medium">[UW NAAM]</p>
              <p>[Uw adres]</p>
              <p>[Postcode + Woonplaats]</p>
              <p className="mt-2">[Uw telefoonnummer]</p>
              <p>[Uw e-mailadres]</p>
            </div>

            <div className="mb-8 print:mb-6">
              <p className="font-medium">[NAAM VERZEKERAAR TEGENPARTIJ]</p>
              <p>Afdeling Schade</p>
              <p>[Adres verzekeraar]</p>
              <p>[Postcode + Plaats]</p>
            </div>

            <div className="mb-6 print:mb-4">
              <p>[Plaats], {today}</p>
            </div>

            <div className="mb-6 print:mb-4">
              <p><strong>Betreft:</strong> Aansprakelijkstelling verkeersongeval d.d. [DATUM ONGEVAL]</p>
              <p><strong>Uw polisnummer:</strong> [POLISNUMMER TEGENPARTIJ]</p>
              <p><strong>Kenteken tegenpartij:</strong> [KENTEKEN TEGENPARTIJ]</p>
              <p><strong>Mijn kenteken:</strong> [UW KENTEKEN]</p>
            </div>
          </div>

          {/* Letter Body */}
          <div className="space-y-4 print:space-y-3 leading-relaxed">
            <p>Geachte heer/mevrouw,</p>

            <p>
              Op [DATUM ONGEVAL] om [TIJDSTIP] uur vond er een verkeersongeval plaats op/nabij [LOCATIE ONGEVAL]. 
              Hierbij was uw verzekerde, de heer/mevrouw [NAAM TEGENPARTIJ], met het voertuig met kenteken 
              [KENTEKEN TEGENPARTIJ] betrokken.
            </p>

            <p>
              <strong>Toedracht van het ongeval:</strong>
            </p>
            <p className="bg-gray-50 border border-gray-200 p-4 rounded print:bg-white print:border-gray-400">
              [Beschrijf hier kort en feitelijk wat er is gebeurd. Bijvoorbeeld: "Uw verzekerde reed achterop 
              mijn stilstaand voertuig" of "Uw verzekerde verleende geen voorrang bij het uitrijden van een 
              uitrit" etc.]
            </p>

            <p>
              Door dit ongeval is schade ontstaan aan mijn voertuig, merk [MERK AUTO], type [TYPE AUTO], 
              kenteken [UW KENTEKEN]. De schade bestaat uit:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>[Beschrijving schade, bijv. "Schade aan achterbumper en kofferbak"]</li>
              <li>[Eventuele andere schadeposten]</li>
            </ul>

            <p>
              Op grond van artikel 185 Wegenverkeerswet en artikel 6:162 BW (onrechtmatige daad) stel ik 
              uw verzekerde hierbij aansprakelijk voor alle door mij geleden en nog te lijden schade als 
              gevolg van dit ongeval.
            </p>

            <p>
              <strong>Ik verzoek u vriendelijk doch dringend om:</strong>
            </p>
            <ol className="list-decimal pl-6 space-y-1">
              <li>Binnen 14 dagen de aansprakelijkheid te erkennen;</li>
              <li>Een schade-expert in te schakelen voor de schadeopname;</li>
              <li>De schade volledig te vergoeden.</li>
            </ol>

            <p>
              <strong>Bijlagen:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Kopie Europees Schadeformulier (indien beschikbaar)</li>
              <li>Foto's van de schade</li>
              <li>Kopie rijbewijs en kentekenbewijs</li>
              <li>[Eventueel: getuigenverklaring, politierapport]</li>
            </ul>

            <p>
              Graag verneem ik binnen 14 dagen uw reactie. Bij uitblijven van een reactie binnen deze 
              termijn, behoud ik mij het recht voor om verdere juridische stappen te ondernemen.
            </p>

            <p className="mt-6">
              Met vriendelijke groet,
            </p>

            <div className="mt-8 print:mt-6">
              <div className="border-b border-gray-400 w-64 h-16 print:h-12"></div>
              <p className="mt-2">[Uw naam]</p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-4 border-t text-center text-sm text-muted-foreground print:mt-8 print:pt-2 print:text-xs">
            <p>
              <strong>112autoschade.nl</strong> | 085 060 5357 | info@112autoschade.nl
            </p>
            <p className="mt-1">
              Laat ons de aansprakelijkstelling voor u regelen – geheel gratis!
            </p>
          </div>

        </div>
      </main>

      <style jsx global>{`
        @media print {
          @page { margin: 2cm; size: A4; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .print\\:hidden { display: none !important; }
        }
      `}</style>
    </div>
  )
}
