import { Metadata } from "next"
import Link from "next/link"
import { FileText, Download, ExternalLink, FileCheck, ClipboardList, Car, Users, Shield, PenLine, Globe, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Downloads | Formulieren & Documenten",
  description: "Download alle formulieren voor uw autoschade claim. Europees Schadeformulier, getuigenverklaring, aansprakelijkstelling. Snelle expertise bij Autoschadebureau.nl.",
}

const documents = [
  {
    category: "Schadeformulieren",
    items: [
      {
        title: "Europees Schadeformulier",
        description: "Het officiële Europees Aanrijdingsformulier. Vul dit in na een aanrijding samen met de tegenpartij.",
        icon: FileText,
        type: "PDF",
        url: "https://www.rijksoverheid.nl/binaries/rijksoverheid/documenten/formulieren/2016/07/01/europees-schadeformulier/europees-schadeformulier.pdf",
        external: true,
      },
      {
        title: "Oprijverklaring / Schuldbekentenis",
        description: "Formulier waarmee de veroorzaker schriftelijk erkent aansprakelijk te zijn voor de schade.",
        icon: FileCheck,
        type: "Formulier",
        url: "/oprijverklaring",
        external: false,
        isLink: true,
      },
    ],
  },
  {
    category: "Getuigenverklaringen",
    items: [
      {
        title: "Getuigenverklaring (Nederlands)",
        description: "Standaard formulier voor het vastleggen van een getuigenverklaring. Print of sla op als PDF.",
        icon: Users,
        type: "Formulier",
        url: "/getuigenverklaring",
        external: false,
        isLink: true,
      },
      {
        title: "Witness Statement (English)",
        description: "Standard form for recording a witness statement in English. Print or save as PDF.",
        icon: Globe,
        type: "Form",
        url: "/witness-statement",
        external: false,
        isLink: true,
      },
    ],
  },
  {
    category: "Voorbeeldbrieven",
    items: [
      {
        title: "Voorbeeldbrief Aansprakelijkstelling",
        description: "Voorbeeldbrief om de tegenpartij of verzekeraar aansprakelijk te stellen voor de schade.",
        icon: PenLine,
        type: "Brief",
        url: "/aansprakelijkstelling",
        external: false,
        isLink: true,
      },
    ],
  },
  {
    category: "Waarborgfonds Motorverkeer",
    items: [
      {
        title: "Waarborgfonds Schadeformulier",
        description: "Schadeformulier voor claims bij het Waarborgfonds (bij onverzekerde/onbekende tegenpartij).",
        icon: AlertTriangle,
        type: "PDF",
        url: "https://www.wbf.nl/wp-content/uploads/2020/01/Schadeformulier-motorrijtuigen.pdf",
        external: true,
      },
      {
        title: "Waarborgfonds Getuigenverklaring",
        description: "Speciale getuigenverklaring voor claims bij het Waarborgfonds Motorverkeer.",
        icon: Users,
        type: "PDF",
        url: "https://www.wbf.nl/wp-content/uploads/2020/01/Getuigenverklaring.pdf",
        external: true,
      },
      {
        title: "Brochure Waarborgfonds",
        description: "Informatie over het Waarborgfonds voor schade door onverzekerde of onbekende voertuigen.",
        icon: FileText,
        type: "PDF",
        url: "https://www.wbf.nl/wp-content/uploads/2020/01/Brochure-Waarborgfonds.pdf",
        external: true,
      },
    ],
  },
  {
    category: "Handleidingen & Tips",
    items: [
      {
        title: "Checklist Na Aanrijding",
        description: "Wat te doen direct na een auto-ongeluk? Deze checklist helpt u niets te vergeten.",
        icon: ClipboardList,
        type: "Artikel",
        url: "/blog/wat-te-doen-na-ongeval",
        external: false,
        isLink: true,
      },
      {
        title: "Foto Tips bij Schade",
        description: "Welke foto's moet u maken van de schade? Tips voor de beste documentatie.",
        icon: Car,
        type: "Artikel",
        url: "/blog/goede-fotos-autoschade",
        external: false,
        isLink: true,
      },
    ],
  },
  {
    category: "Juridische Documenten",
    items: [
      {
        title: "Algemene Voorwaarden",
        description: "Onze algemene voorwaarden voor het verhalen van autoschade.",
        icon: Shield,
        type: "Pagina",
        url: "/algemene-voorwaarden",
        external: false,
        isLink: true,
      },
      {
        title: "Privacybeleid",
        description: "Hoe wij omgaan met uw persoonsgegevens conform de AVG.",
        icon: Shield,
        type: "Pagina",
        url: "/privacy",
        external: false,
        isLink: true,
      },
    ],
  },
]

export default function DownloadsPage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Downloads</h1>
            <p className="text-xl text-muted-foreground">
              Alle formulieren en documenten die u nodig heeft voor uw autoschade claim
            </p>
          </div>

          {/* Belangrijke tip */}
          <Card className="mb-8 border-primary/30 bg-primary/5">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Tip: Upload uw schadeformulier</h3>
                  <p className="text-sm text-muted-foreground">
                    Heeft u al een ingevuld Europees Schadeformulier? Upload het direct via onze{" "}
                    <Link href="/claim-indienen" className="text-primary hover:underline font-medium">
                      claim indienen pagina
                    </Link>
                    . Ons systeem leest automatisch alle gegevens uit.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Document Categories */}
          <div className="space-y-8">
            {documents.map((category) => (
              <section key={category.category}>
                <h2 className="text-xl font-bold mb-4">{category.category}</h2>
                <div className="grid gap-4">
                  {category.items.map((doc) => (
                    <Card key={doc.title} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                            <doc.icon className="h-6 w-6 text-gray-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <h3 className="font-semibold">{doc.title}</h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {doc.description}
                                </p>
                              </div>
                              <div className="flex-shrink-0">
                                {doc.comingSoon ? (
                                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                    Binnenkort
                                  </span>
                                ) : doc.isLink ? (
                                  <Link href={doc.url}>
                                    <Button variant="outline" size="sm">
                                      Bekijken
                                      <ExternalLink className="ml-2 h-3 w-3" />
                                    </Button>
                                  </Link>
                                ) : doc.external ? (
                                  <a href={doc.url} target="_blank" rel="noopener noreferrer">
                                    <Button variant="outline" size="sm">
                                      <Download className="mr-2 h-3 w-3" />
                                      {doc.type}
                                    </Button>
                                  </a>
                                ) : (
                                  <a href={doc.url} download>
                                    <Button variant="outline" size="sm">
                                      <Download className="mr-2 h-3 w-3" />
                                      {doc.type}
                                    </Button>
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* CTA */}
          <Card className="mt-12 bg-gradient-to-br from-primary to-blue-600 text-white border-0">
            <CardContent className="text-center py-8">
              <h2 className="text-2xl font-bold mb-3">Klaar om uw schade te verhalen?</h2>
              <p className="text-blue-50 mb-6">
                Upload uw schadeformulier en wij regelen de rest – 100% gratis
              </p>
              <Link href="/claim-indienen">
                <Button size="lg" variant="secondary">
                  Direct Schade Melden
                </Button>
              </Link>
            </CardContent>
          </Card>

        </div>
      </main>
    </div>
  )
}
