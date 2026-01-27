"use client"

import Link from "next/link"
import Image from "next/image"
import { Printer, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function WitnessStatementPage() {
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
              Back to Downloads
            </Link>
            <Button onClick={handlePrint} className="gap-2">
              <Printer className="h-4 w-4" />
              Print / Save as PDF
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
                <h1 className="text-2xl font-bold text-primary print:text-xl">WITNESS STATEMENT</h1>
                <p className="text-sm text-muted-foreground">Traffic Accident Declaration</p>
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

          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 print:bg-gray-100 print:border-gray-300 print:p-3 print:mb-4">
            <p className="text-sm">
              <strong>Instructions:</strong> Please complete this form in full. The witness must sign the statement. 
              Send the completed form to <strong>info@autoschadebureau.nl</strong> or upload it via your dashboard.
            </p>
          </div>

          {/* Section 1: Witness Details */}
          <section className="mb-6 print:mb-4">
            <h2 className="text-lg font-bold border-b border-gray-300 pb-2 mb-4 print:text-base print:pb-1 print:mb-3">
              1. Witness Details
            </h2>
            <div className="space-y-4 print:space-y-2">
              <div className="grid grid-cols-2 gap-4 print:gap-2">
                <div>
                  <label className="text-sm font-medium">Surname</label>
                  <div className="border-b border-gray-400 h-8 print:h-6"></div>
                </div>
                <div>
                  <label className="text-sm font-medium">First Name</label>
                  <div className="border-b border-gray-400 h-8 print:h-6"></div>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Address (street + number)</label>
                <div className="border-b border-gray-400 h-8 print:h-6"></div>
              </div>
              <div className="grid grid-cols-2 gap-4 print:gap-2">
                <div>
                  <label className="text-sm font-medium">Postal Code</label>
                  <div className="border-b border-gray-400 h-8 print:h-6"></div>
                </div>
                <div>
                  <label className="text-sm font-medium">City / Country</label>
                  <div className="border-b border-gray-400 h-8 print:h-6"></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 print:gap-2">
                <div>
                  <label className="text-sm font-medium">Telephone Number</label>
                  <div className="border-b border-gray-400 h-8 print:h-6"></div>
                </div>
                <div>
                  <label className="text-sm font-medium">Email Address</label>
                  <div className="border-b border-gray-400 h-8 print:h-6"></div>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Relationship to involved party (e.g., none, acquaintance, colleague, family)</label>
                <div className="border-b border-gray-400 h-8 print:h-6"></div>
              </div>
            </div>
          </section>

          {/* Section 2: Accident Details */}
          <section className="mb-6 print:mb-4">
            <h2 className="text-lg font-bold border-b border-gray-300 pb-2 mb-4 print:text-base print:pb-1 print:mb-3">
              2. Accident Details
            </h2>
            <div className="space-y-4 print:space-y-2">
              <div className="grid grid-cols-2 gap-4 print:gap-2">
                <div>
                  <label className="text-sm font-medium">Date of Accident</label>
                  <div className="border-b border-gray-400 h-8 print:h-6"></div>
                </div>
                <div>
                  <label className="text-sm font-medium">Time of Accident</label>
                  <div className="border-b border-gray-400 h-8 print:h-6"></div>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Location / Address of Accident</label>
                <div className="border-b border-gray-400 h-8 print:h-6"></div>
              </div>
              <div>
                <label className="text-sm font-medium">Where were you positioned relative to the accident?</label>
                <div className="border-b border-gray-400 h-8 print:h-6"></div>
              </div>
              <div>
                <label className="text-sm font-medium">Weather Conditions (dry, rain, fog, etc.)</label>
                <div className="border-b border-gray-400 h-8 print:h-6"></div>
              </div>
            </div>
          </section>

          {/* Section 3: Description */}
          <section className="mb-6 print:mb-4">
            <h2 className="text-lg font-bold border-b border-gray-300 pb-2 mb-4 print:text-base print:pb-1 print:mb-3">
              3. Description of the Accident
            </h2>
            <p className="text-sm text-muted-foreground mb-3 print:mb-2">
              Please describe as accurately as possible what you witnessed. Include if possible: direction of travel, 
              speed, indicators, traffic lights, right of way, vehicle positions, braking, etc.
            </p>
            <div className="border border-gray-400 min-h-[200px] print:min-h-[150px] p-2">
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

          {/* Section 4: Sketch */}
          <section className="mb-6 print:mb-4">
            <h2 className="text-lg font-bold border-b border-gray-300 pb-2 mb-4 print:text-base print:pb-1 print:mb-3">
              4. Sketch of the Situation (optional)
            </h2>
            <p className="text-sm text-muted-foreground mb-3 print:mb-2">
              Draw a sketch showing the position of the vehicles, direction of travel, etc.
            </p>
            <div className="border border-gray-400 min-h-[150px] print:min-h-[100px]"></div>
          </section>

          {/* Section 5: Signature */}
          <section className="mb-6 print:mb-4">
            <h2 className="text-lg font-bold border-b border-gray-300 pb-2 mb-4 print:text-base print:pb-1 print:mb-3">
              5. Declaration and Signature
            </h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 print:bg-white print:p-3">
              <p className="text-sm mb-4 print:mb-3">
                The undersigned declares that the above statement has been completed truthfully and is willing 
                to confirm this statement under oath if necessary.
              </p>
              <div className="grid grid-cols-2 gap-8 print:gap-4">
                <div>
                  <label className="text-sm font-medium">Place</label>
                  <div className="border-b border-gray-400 h-8 print:h-6"></div>
                </div>
                <div>
                  <label className="text-sm font-medium">Date</label>
                  <div className="border-b border-gray-400 h-8 print:h-6"></div>
                </div>
              </div>
              <div className="mt-6 print:mt-4">
                <label className="text-sm font-medium">Witness Signature</label>
                <div className="border border-gray-400 h-24 print:h-16 mt-2 rounded"></div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <div className="text-center text-sm text-muted-foreground border-t pt-4 print:pt-2 print:text-xs">
            <p>
              <strong>Autoschadebureau.nl</strong> | +31 85 060 5357 | info@autoschadebureau.nl | www.autoschadebureau.nl
            </p>
            <p className="mt-1">
              Send this form to info@autoschadebureau.nl or upload it via your personal dashboard.
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
