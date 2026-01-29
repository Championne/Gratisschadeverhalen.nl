import { Metadata } from "next"
import Link from "next/link"
import { FileText, Download, ClipboardList, Users, Mail, FileCheck, Phone, ArrowRight, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Downloads | Handige Formulieren & Checklists Autoschade",
  description: "Download gratis het Europees Schadeformulier, auto-ongeval checklist, getuigenverklaring template en meer voor uw materiële autoschade claim.",
  keywords: ["Europees schadeformulier downloaden", "checklist auto-ongeval", "getuigenverklaring", "aansprakelijkheidsbrief", "verzekeraar contactgegevens", "autoschade formulieren"],
}

const downloads = [
  {
    icon: FileText,
    title: "Europees Schadeformulier (Leeg PDF)",
    description: "Een universeel schadeformulier dat in heel Europa wordt gebruikt. Essentieel om na een aanrijding samen met de tegenpartij in te vullen.",
    usage: "Direct na elk auto-ongeluk, ongeacht de ernst van de schade, om de feiten en toedracht vast te leggen.",
    filename: "europees-schadeformulier-leeg.pdf",
    available: true,
  },
  {
    icon: ClipboardList,
    title: "Checklist na Auto-ongeval",
    description: "Een praktische checklist met alle stappen die u moet volgen direct na een auto-ongeval. Van veiligheidsmaatregelen tot het verzamelen van bewijs.",
    usage: "Houd deze checklist in uw dashboardkastje. Gebruik deze als leidraad direct na een ongeval.",
    filename: "checklist-auto-ongeval.pdf",
    available: false,
  },
  {
    icon: Users,
    title: "Getuigenverklaring Template",
    description: "Een gestandaardiseerd template voor getuigen om hun waarnemingen van het ongeval gedetailleerd vast te leggen.",
    usage: "Te gebruiken wanneer er getuigen aanwezig waren bij het ongeval. Laat hen dit formulier zo snel mogelijk invullen.",
    filename: "getuigenverklaring-template.pdf",
    available: false,
  },
  {
    icon: Mail,
    title: "Aansprakelijkheidsbrief Template",
    description: "Een professionele template voor een brief waarin u de aansprakelijke partij formeel aansprakelijk stelt voor de geleden materiële schade.",
    usage: "Wanneer de aansprakelijke partij bekend is, maar de schadeafhandeling stagneert.",
    filename: "aansprakelijkheidsbrief-template.pdf",
    available: false,
  },
  {
    icon: Phone,
    title: "Overzicht Verzekeraar Contactgegevens",
    description: "Een handig overzicht van de contactgegevens van de belangrijkste autoverzekeraars in Nederland voor het melden van schade.",
    usage: "Handig om bij de hand te hebben voor snelle communicatie met uw eigen verzekeraar na een ongeval.",
    filename: "overzicht-verzekeraar-contact.pdf",
    available: false,
  },
]

export default function DownloadsPage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Download className="h-4 w-4" />
              Gratis Downloads
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Handige Documenten voor Uw Autoschade Claim
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Download gratis formulieren, checklists en templates om u te ondersteunen bij elke stap van het schadeverhaalproces.
            </p>
          </div>

          {/* Downloads Grid */}
          <section className="mb-16">
            <div className="grid gap-6">
              {downloads.map((download, index) => (
                <Card key={index} className={`border-2 ${download.available ? 'hover:border-primary' : 'opacity-75'} transition-colors`}>
                  <CardContent className="py-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-shrink-0">
                        <div className={`h-16 w-16 rounded-full flex items-center justify-center ${download.available ? 'bg-primary/10' : 'bg-gray-100'}`}>
                          <download.icon className={`h-8 w-8 ${download.available ? 'text-primary' : 'text-gray-400'}`} />
                        </div>
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-xl font-semibold mb-2">{download.title}</h3>
                        <p className="text-muted-foreground mb-3">{download.description}</p>
                        <div className="bg-blue-50 rounded-lg p-3 mb-4">
                          <p className="text-sm text-blue-800">
                            <strong>Wanneer gebruiken:</strong> {download.usage}
                          </p>
                        </div>
                        {download.available ? (
                          <Link href={`/assets/downloads/${download.filename}`} target="_blank">
                            <Button className="gap-2">
                              <Download className="h-4 w-4" />
                              Download PDF
                            </Button>
                          </Link>
                        ) : (
                          <Button disabled variant="outline" className="gap-2">
                            <AlertCircle className="h-4 w-4" />
                            Binnenkort beschikbaar
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="mb-12">
            <Card className="bg-gradient-to-br from-orange-50 to-white border-2 border-orange-200">
              <CardContent className="py-10 text-center">
                <FileCheck className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-4">Hulp Nodig bij Uw Schadeclaim?</h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Hoewel deze documenten u waardevolle ondersteuning bieden, blijft deskundige hulp cruciaal bij complexe schadedossiers. 
                  <strong> Gratisschadeverhalen.nl biedt 100% kosteloze bijstand</strong> bij het verhalen van uw materiële autoschade.
                </p>
                <Link href="/claim-indienen">
                  <Button size="lg" className="gap-2 bg-orange-500 hover:bg-orange-600">
                    <ArrowRight className="h-5 w-5" />
                    Laat Uw Schade Kosteloos Verhalen
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </section>

          {/* Back Link */}
          <div className="text-center">
            <Link href="/" className="text-primary hover:underline inline-flex items-center gap-2">
              ← Terug naar Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
