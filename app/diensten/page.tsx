import { Metadata } from "next"
import Link from "next/link"
import { 
  FileText, 
  Shield, 
  Clock, 
  Euro, 
  Car, 
  Camera,
  UserCheck,
  FileSearch,
  Zap,
  ArrowRight
} from "lucide-react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Onze Diensten - Autoschade Verhalen | Autoschadebureau.nl",
  description: "Alle diensten van Autoschadebureau.nl: autoschade verhalen, automatische schadeformulier verwerking, online claim tracking, expertise organisatie en meer. Volledig gratis.",
  keywords: [
    "autoschade verhalen diensten",
    "schadeformulier automatisch inlezen",
    "online claim tracking",
    "WA schade verhalen",
    "autoschade expertise",
    "gratis schadeafhandeling"
  ],
}

export default function DienstenPage() {
  return (
    <div className="min-h-screen">
      {/* Onze Diensten Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-green-50 py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Onze Diensten
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Wij regelen van A tot Z uw autoschade verhaal op de tegenpartij. 
                Snelle expertise, volledig digitaal en 100% gratis voor u.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Dienst 1: Autoschade Verhalen */}
              <Card className="border-2 border-primary/20">
                <CardHeader>
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Car className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Autoschade Verhalen</CardTitle>
                  <CardDescription className="text-base">
                    Onze kerndienst: uw voertuigschade volledig verhalen op de WA-verzekeraar van de tegenpartij
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Aansprakelijkheidsbrief opstellen en versturen</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Alle communicatie met de tegenpartij en verzekeraar</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Onderhandelen over schadevergoeding</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Volledige administratieve afhandeling</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">U betaalt niets - alles wordt door tegenpartij vergoed</span>
                    </li>
                  </ul>
                  <div className="mt-6">
                    <Link href="/claim-indienen">
                      <Button className="w-full">
                        Start Nu
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Dienst 2: Automatische Inlezing Schadeformulier */}
              <Card className="border-2">
                <CardHeader>
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <Camera className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-2xl">Automatische Inlezing Schadeformulier</CardTitle>
                  <CardDescription className="text-base">
                    Maak een foto van uw Europees Schadeformulier - wij lezen het automatisch in
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Automatische herkenning van kentekens, datum en locatie</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Slimme verwerking van handgeschreven tekst</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Automatisch invullen van claim formulier</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Bespaar tijd - klaar in 2 minuten</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">U controleert en vult eventueel aan</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Dienst 3: Online Claim Tracking */}
              <Card className="border-2">
                <CardHeader>
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <FileText className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle className="text-2xl">Online Claim Tracking</CardTitle>
                  <CardDescription className="text-base">
                    Volg uw claim 24/7 in uw persoonlijke dashboard met realtime updates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Realtime statusupdates over uw claim</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Alle documenten direct inzichtelijk</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Tijdlijn met volledige audit trail</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Upload extra documenten wanneer nodig</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Beveiligd met Google login</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Dienst 4: Expertise & Taxatie Organisatie */}
              <Card className="border-2">
                <CardHeader>
                  <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                    <FileSearch className="h-8 w-8 text-orange-600" />
                  </div>
                  <CardTitle className="text-2xl">Expertise & Taxatie</CardTitle>
                  <CardDescription className="text-base">
                    Wij organiseren professionele taxatie van uw schade en onderhandelen over het bedrag
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Inschakelen van gecertificeerde taxateurs</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Coördineren van schade-inspectie</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Beoordeling van expertiserapport</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Onderhandelen met verzekeraar over bedrag</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Zorgen voor eerlijke vergoeding</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Dienst 5: Letselschade Doorverwijzing */}
              <Card className="border-2">
                <CardHeader>
                  <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                    <UserCheck className="h-8 w-8 text-purple-600" />
                  </div>
                  <CardTitle className="text-2xl">Letselschade Doorverwijzing</CardTitle>
                  <CardDescription className="text-base">
                    Bij lichamelijke klachten verwijzen wij u door naar gespecialiseerde partners
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Wij signaleren mogelijke letselschade in uw dossier</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Doorverwijzing naar Unitas Letselschade (partner)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Gespecialiseerde begeleiding bij letsel</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Naadloze overdracht van uw dossier</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Ook letselschade - u betaalt niets</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Dienst 6: Juridische Escalatie */}
              <Card className="border-2">
                <CardHeader>
                  <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
                    <Shield className="h-8 w-8 text-red-600" />
                  </div>
                  <CardTitle className="text-2xl">Juridische Escalatie</CardTitle>
                  <CardDescription className="text-base">
                    Bij weigering of traag reagerende verzekeraars schakelen wij juridische expertise in
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Inschakelen van gespecialiseerde advocaten</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Versturen van formele aanmaningen</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Opstarten van juridische procedures</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">95% van de zaken komt tot schikking</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Alle kosten gedekt door tegenpartij</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-10 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Waarom voor ons kiezen?
              </h2>
              <p className="text-xl text-muted-foreground">
                Wat ons onderscheidt van andere schadebureaus
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <Zap className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>Volledig Digitaal</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Van upload tot uitbetaling 100% online. Ons systeem verwerkt uw formulieren automatisch. 
                    Realtime tracking via uw dashboard.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Euro className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>100% Gratis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    U betaalt letterlijk niets. De WA-verzekeraar van de tegenpartij vergoedt alle kosten, 
                    inclusief onze kosten. Geen voorschot, geen percentage.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Clock className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>Snel & Efficiënt</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Gemiddeld binnen 6 weken volledig afgehandeld. Professionele beoordeling binnen 24 uur. 
                    Wij handelen direct na indienen.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
