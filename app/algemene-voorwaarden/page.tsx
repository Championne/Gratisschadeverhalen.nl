import { Metadata } from "next"
import Link from "next/link"
import { Shield, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Algemene Voorwaarden",
  description: "Algemene voorwaarden van Autoschadebureau.nl - No cure no pay autoschade verhalen",
}

export default function AlgemeneVoorwaardenPage() {
  return (
    <div className="min-h-screen bg-white">
<main className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold mb-6">Algemene Voorwaarden</h1>
        
        <div className="prose prose-lg max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Definities</h2>
            <p className="text-muted-foreground">
              In deze algemene voorwaarden worden de volgende termen met een hoofdletter geschreven en hebben de volgende betekenis:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-4">
              <li><strong>Opdrachtgever:</strong> De natuurlijke persoon die schade heeft geleden als gevolg van een verkeersongeval en opdracht geeft aan Opdrachtnemer om deze schade te verhalen.</li>
              <li><strong>Opdrachtnemer:</strong> Autoschadebureau.nl, gevestigd te <span className="bg-yellow-100 font-semibold">[INVULLEN: Adres]</span>, KvK-nummer <span className="bg-yellow-100 font-semibold">[INVULLEN: KvK-nummer]</span>.</li>
              <li><strong>Overeenkomst:</strong> De overeenkomst tussen Opdrachtgever en Opdrachtnemer met betrekking tot het verhalen van materiële schade (voertuigschade/autoschade).</li>
              <li><strong>Claim:</strong> De aanspraak tot schadevergoeding die Opdrachtgever heeft op de aansprakelijke partij of diens WA-verzekeraar.</li>
              <li><strong>No Cure No Pay:</strong> Het principe waarbij Opdrachtgever alleen betaalt bij succesvol verhaal van de schade.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. Toepasselijkheid</h2>
            <p className="text-muted-foreground">
              Deze algemene voorwaarden zijn van toepassing op alle aanbiedingen, offertes en overeenkomsten waarbij Opdrachtnemer diensten verleent aan Opdrachtgever. Door gebruik te maken van onze diensten, verklaart Opdrachtgever zich akkoord met deze voorwaarden.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. Dienstverlening</h2>
            <h3 className="text-xl font-semibold mb-3 mt-4">3.1 Opdracht</h3>
            <p className="text-muted-foreground">
              Opdrachtnemer verleent diensten gericht op het verhalen van <strong>materiële schade aan voertuigen</strong> (autoschade/voertuigschade) bij de aansprakelijke partij of diens WA-verzekeraar.
            </p>
            
            <h3 className="text-xl font-semibold mb-3 mt-4">3.2 Werkzaamheden omvatten</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Beoordeling van de aansprakelijkheid</li>
              <li>Verzamelen van benodigde documentatie</li>
              <li>Opstellen en verzenden van aansprakelijkheidsbrief</li>
              <li>Onderhandelen met de aansprakelijke partij of WA-verzekeraar</li>
              <li>Indien noodzakelijk: inschakelen van juridische bijstand</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-4">3.3 Letselschade</h3>
            <p className="text-muted-foreground">
              Opdrachtnemer behandelt <strong>uitsluitend materiële schade</strong> (voertuigschade). Bij signalering van letselschade (whiplash, pijn, hoofdpijn, etc.) verwijst Opdrachtnemer de klant door naar een gespecialiseerde partner (Unitas Letselschade). Voor letselschade is een aparte aanmelding noodzakelijk.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-4">3.4 Inspanningsverplichting</h3>
            <p className="text-muted-foreground">
              Opdrachtnemer verplicht zich tot een <strong>inspanningsverplichting</strong>, geen resultaatsverplichting. Opdrachtnemer zal zich maximaal inspannen om de schade te verhalen, maar kan geen garantie geven op een succesvolle uitkomst.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Kosten en Vergoeding</h2>
            <h3 className="text-xl font-semibold mb-3 mt-4">4.1 Geen Kosten voor Opdrachtgever</h3>
            <p className="text-muted-foreground">
              <strong>Opdrachtgever betaalt NIETS</strong> voor onze dienstverlening. Geen voorschot, geen eigen bijdrage, geen kosten bij mislukking. U ontvangt 100% van uw schadevergoeding.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-4">4.2 Buitengerechtelijke Incassokosten</h3>
            <p className="text-muted-foreground mb-4">
              De kosten voor onze dienstverlening worden verhaald op de aansprakelijke partij (WA-verzekeraar van de tegenpartij) als <strong>buitengerechtelijke incassokosten</strong> conform het <strong>Convenant Buitengerechtelijke Kosten – Materieel</strong> van het Verbond van Verzekeraars.
            </p>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mb-4">
              <p className="font-semibold text-blue-900 mb-2">Standaard Lumpsum Bedragen (2026):</p>
              <ul className="text-sm text-blue-800 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="font-semibold min-w-[120px]">€44,50</span>
                  <span>Eenvoudige zaken zonder discussie (aansprakelijkheid snel erkend, eenvoudige afhandeling)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold min-w-[120px]">€408,20</span>
                  <span>Zaken met discussie (aansprakelijkheid betwist, expertise nodig, langer traject)</span>
                </li>
              </ul>
            </div>

            <p className="text-muted-foreground text-sm">
              Deze bedragen zijn vastgesteld door het Verbond van Verzekeraars en worden jaarlijks geïndexeerd. De verzekeraar is verplicht deze kosten te betalen bovenop de schadevergoeding aan Opdrachtgever.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-4">4.3 Uitbetaling aan Opdrachtgever</h3>
            <p className="text-muted-foreground">
              De volledige schadevergoeding wordt rechtstreeks aan Opdrachtgever uitbetaald. De buitengerechtelijke incassokosten worden separaat door de verzekeraar aan Opdrachtnemer voldaan. Opdrachtgever ontvangt dus 100% van zijn schade.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-4">4.4 No Cure No Pay</h3>
            <p className="text-muted-foreground">
              Opdrachtnemer werkt uitsluitend op <strong>no cure no pay</strong> basis. Als het verhaal van de schade niet slaagt (bijvoorbeeld bij gebrek aan aansprakelijkheid of bewijslast), betaalt Opdrachtgever niets en worden er geen kosten in rekening gebracht.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. Verplichtingen Opdrachtgever</h2>
            <h3 className="text-xl font-semibold mb-3 mt-4">5.1 Informatieverplichting</h3>
            <p className="text-muted-foreground">
              Opdrachtgever verplicht zich:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-4">
              <li>Alle relevante informatie en documenten volledig en naar waarheid te verstrekken</li>
              <li>Foto's, Europees Schadeformulier, en andere bewijsstukken te leveren</li>
              <li>Wijzigingen in de situatie direct door te geven</li>
              <li>Mee te werken aan het verhaalproces (bijv. schadeformulier invullen, vragen beantwoorden)</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-4">5.2 Verbod op eigen actie</h3>
            <p className="text-muted-foreground">
              Zodra Opdrachtgever de opdracht heeft gegeven, mag Opdrachtgever zelf <strong>geen contact</strong> meer opnemen met de tegenpartij of diens verzekeraar zonder toestemming van Opdrachtnemer. Dit kan het verhaalproces schaden.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-4">5.3 Rechtmatigheid</h3>
            <p className="text-muted-foreground">
              Opdrachtgever garandeert dat alle verstrekte informatie correct en waarheidsgetrouw is. Bij opzettelijk verstrekken van onjuiste informatie behoudt Opdrachtnemer zich het recht voor de overeenkomst te beëindigen. Indien de claim reeds is ingediend bij de verzekeraar, kan Opdrachtnemer de buitengerechtelijke incassokosten voor de reeds verrichte werkzaamheden verhalen op de verzekeraar.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Weigering en Beëindiging</h2>
            <h3 className="text-xl font-semibold mb-3 mt-4">6.1 Weigeringsgronden</h3>
            <p className="text-muted-foreground">
              Opdrachtnemer behoudt zich het recht voor een opdracht te weigeren of te beëindigen indien:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-4">
              <li>Er geen aansprakelijkheid van de tegenpartij kan worden vastgesteld</li>
              <li>De schade te gering is (onder <span className="bg-yellow-100 font-semibold">[INVULLEN: minimumbedrag, bijv. €200]</span>)</li>
              <li>De verjaringstermijn is verstreken</li>
              <li>Opdrachtgever onjuiste of onvolledige informatie heeft verstrekt</li>
              <li>Opdrachtgever de overeenkomst schendt</li>
              <li>De claim kansarm wordt ingeschat (&lt;30% kans van slagen)</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-4">6.2 Kosten bij weigering</h3>
            <p className="text-muted-foreground">
              Bij weigering of beëindiging door Opdrachtnemer (anders dan door toedoen van Opdrachtgever) zijn er <strong>geen kosten</strong> voor Opdrachtgever.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-4">6.3 Opzegging door Opdrachtgever</h3>
            <p className="text-muted-foreground">
              Opdrachtgever kan de opdracht te allen tijde beëindigen. Indien beëindiging plaatsvindt <strong>nadat</strong> Opdrachtnemer een aansprakelijkheidsbrief heeft verstuurd en de schade alsnog wordt uitgekeerd, behoudt Opdrachtnemer het recht om de buitengerechtelijke incassokosten (zoals genoemd in artikel 4.2) te verhalen op de verzekeraar. Dit komt niet ten laste van Opdrachtgever.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">7. Aansprakelijkheid</h2>
            <h3 className="text-xl font-semibold mb-3 mt-4">7.1 Beperking aansprakelijkheid</h3>
            <p className="text-muted-foreground">
              Opdrachtnemer is <strong>alleen aansprakelijk</strong> voor schade die het directe gevolg is van opzet of grove schuld van Opdrachtnemer. De aansprakelijkheid is in alle gevallen beperkt tot het bedrag dat in het betreffende geval door de beroepsaansprakelijkheidsverzekering wordt gedekt.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-4">7.2 Uitgesloten aansprakelijkheid</h3>
            <p className="text-muted-foreground">
              Opdrachtnemer is <strong>niet aansprakelijk</strong> voor:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-4">
              <li>Indirecte schade (bijvoorbeeld gederfde winst, gevolgschade)</li>
              <li>Vertragingen in het verhaalproces door externe partijen (verzekeraar, rechtbank)</li>
              <li>Onjuiste of onvolledige informatie verstrekt door Opdrachtgever</li>
              <li>Het niet slagen van de claim ondanks maximale inspanning</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-4">7.3 Verjaring</h3>
            <p className="text-muted-foreground">
              Elk recht op schadevergoeding jegens Opdrachtnemer verjaart 12 maanden na het moment waarop Opdrachtgever bekend werd of redelijkerwijs bekend kon zijn met het ontstaan van de schade.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">8. Privacy en Gegevensverwerking</h2>
            <p className="text-muted-foreground">
              Voor de verwerking van persoonsgegevens verwijzen wij naar ons <Link href="/privacy" className="text-primary hover:underline font-medium">Privacybeleid</Link>. Door gebruik te maken van onze diensten stemt Opdrachtgever in met de verwerking van persoonsgegevens zoals beschreven in het privacybeleid.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">9. Klachten</h2>
            <h3 className="text-xl font-semibold mb-3 mt-4">9.1 Klachtenprocedure</h3>
            <p className="text-muted-foreground">
              Klachten over de dienstverlening kunnen worden ingediend via:
            </p>
            <ul className="list-none space-y-2 text-muted-foreground mt-4">
              <li><strong>Email:</strong> <span className="bg-yellow-100 font-semibold">[INVULLEN: klachten@gratisschadeverhalen.nl]</span></li>
              <li><strong>Telefoon:</strong> <span className="bg-yellow-100 font-semibold">[INVULLEN: telefoonnummer]</span></li>
              <li><strong>Post:</strong> <span className="bg-yellow-100 font-semibold">[INVULLEN: Adres]</span></li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-4">9.2 Behandeling klachten</h3>
            <p className="text-muted-foreground">
              Opdrachtnemer zal:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-4">
              <li>De klacht binnen 5 werkdagen bevestigen</li>
              <li>De klacht binnen 14 dagen inhoudelijk behandelen</li>
              <li>Bij noodzaak van langer onderzoek: tussentijds informeren</li>
              <li>Een schriftelijke reactie sturen met voorgestelde oplossing</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-4">9.3 Geschillencommissie</h3>
            <p className="text-muted-foreground">
              Indien een klacht niet tot wederzijdse tevredenheid wordt opgelost, kan Opdrachtgever zich wenden tot <span className="bg-yellow-100 font-semibold">[INVULLEN: geschillencommissie, bijv. Kifid of andere relevante instantie]</span>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">10. Intellectueel Eigendom</h2>
            <p className="text-muted-foreground">
              Alle intellectuele eigendomsrechten op documenten, brieven, rapporten en andere materialen opgesteld door Opdrachtnemer blijven eigendom van Opdrachtnemer. Opdrachtgever mag deze niet zonder toestemming verveelvoudigen of aan derden verstrekken.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">11. Wijziging Voorwaarden</h2>
            <p className="text-muted-foreground">
              Opdrachtnemer behoudt zich het recht voor deze algemene voorwaarden te wijzigen. Wijzigingen worden tijdig gecommuniceerd via de website. Voor reeds lopende opdrachten blijven de ten tijde van de opdracht geldende voorwaarden van kracht.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">12. Toepasselijk Recht en Bevoegde Rechter</h2>
            <p className="text-muted-foreground">
              Op alle overeenkomsten tussen Opdrachtnemer en Opdrachtgever is <strong>Nederlands recht</strong> van toepassing. Geschillen zullen worden voorgelegd aan de bevoegde rechter in het arrondissement waar Opdrachtnemer is gevestigd, tenzij dwingend recht anders bepaalt.
            </p>
          </section>

          <section className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
            <h3 className="text-xl font-bold mb-3">📋 Bedrijfsgegevens</h3>
            <ul className="space-y-2 text-sm">
              <li><strong>Handelsnaam:</strong> Autoschadebureau.nl</li>
              <li><strong>KvK-nummer:</strong> <span className="bg-yellow-100 font-semibold">[INVULLEN: KvK-nummer]</span></li>
              <li><strong>BTW-nummer:</strong> <span className="bg-yellow-100 font-semibold">[INVULLEN: BTW-nummer]</span></li>
              <li><strong>Adres:</strong> <span className="bg-yellow-100 font-semibold">[INVULLEN: Straat + huisnummer, Postcode Plaats]</span></li>
              <li><strong>Telefoon:</strong> <span className="bg-yellow-100 font-semibold">[INVULLEN: Telefoonnummer]</span></li>
              <li><strong>Email:</strong> <span className="bg-yellow-100 font-semibold">[INVULLEN: info@gratisschadeverhalen.nl]</span></li>
              <li><strong>IBAN:</strong> <span className="bg-yellow-100 font-semibold">[INVULLEN: IBAN-nummer]</span></li>
            </ul>
          </section>

          <section>
            <p className="text-sm text-muted-foreground italic">
              Laatst bijgewerkt: {new Date().toLocaleDateString('nl-NL', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <p className="text-sm text-muted-foreground italic mt-2">
              Versie: 1.0 (MVP - Te finaliseren bij bedrijfsoprichting)
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
