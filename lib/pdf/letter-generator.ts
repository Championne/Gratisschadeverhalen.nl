import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'

/**
 * Genereer een professionele aansprakelijkheidsbrief als PDF
 */

interface LetterData {
  claimId: string
  datum_ongeval: string
  plaats_ongeval?: string
  naam_claimer: string
  adres_claimer?: string
  telefoon_claimer: string
  email_claimer: string
  kenteken_claimer?: string
  
  naam_tegenpartij?: string
  kenteken_tegenpartij: string
  verzekeraar_tegenpartij?: string
  polisnummer_tegenpartij?: string
  
  beschrijving: string
  geschatte_schade?: string
  
  ai_analyse?: string
}

export async function generateAansprakelijkheidsbrief(data: LetterData): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create()
  const page = pdfDoc.addPage([595.28, 841.89]) // A4
  const { width, height } = page.getSize()
  
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
  const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
  
  const primaryColor = rgb(0.4, 0.49, 0.92)
  const textColor = rgb(0.2, 0.2, 0.2)
  const grayColor = rgb(0.5, 0.5, 0.5)
  
  let y = height - 50

  // HEADER
  page.drawText('GRATIS SCHADEVERHALEN', {
    x: 50, y: y, size: 18, font: boldFont, color: primaryColor,
  })
  
  y -= 12
  page.drawText('KvK: 12345678 | BTW: NL123456789B01', {
    x: 50, y: y, size: 9, font: regularFont, color: grayColor,
  })
  
  y -= 10
  page.drawText('IBAN: NL12ABCD3456789012', {
    x: 50, y: y, size: 9, font: regularFont, color: grayColor,
  })
  
  y -= 15
  page.drawLine({
    start: { x: 50, y: y },
    end: { x: width - 50, y: y },
    thickness: 2,
    color: primaryColor,
  })
  
  y -= 30

  // DATUM EN REFERENTIE
  const huidigeDatum = new Date().toLocaleDateString('nl-NL', {
    day: 'numeric', month: 'long', year: 'numeric'
  })
  
  page.drawText(`Datum: ${huidigeDatum}`, {
    x: 50, y: y, size: 10, font: regularFont, color: textColor,
  })
  y -= 15
  page.drawText(`Referentie: ${data.claimId.substring(0, 8).toUpperCase()}`, {
    x: 50, y: y, size: 10, font: regularFont, color: textColor,
  })
  
  y -= 30

  // AANHEF (Gepersonaliseerd!)
  const aanhef = data.naam_tegenpartij 
    ? `Geachte heer/mevrouw ${data.naam_tegenpartij},`
    : 'Geachte heer/mevrouw,'
  
  page.drawText(aanhef, {
    x: 50, y: y, size: 11, font: regularFont, color: textColor,
  })
  
  y -= 30

  // BETREFT
  page.drawText('BETREFT: AANSPRAKELIJKSTELLING VERKEERSONGEVAL', {
    x: 50, y: y, size: 12, font: boldFont, color: textColor,
  })
  
  y -= 30

  // GEGEVENS ONGEVAL
  page.drawText('Gegevens Ongeval', {
    x: 50, y: y, size: 11, font: boldFont, color: primaryColor,
  })
  y -= 20
  
  const ongevalDetails = [
    `Datum ongeval: ${new Date(data.datum_ongeval).toLocaleDateString('nl-NL')}`,
    data.plaats_ongeval ? `Plaats ongeval: ${data.plaats_ongeval}` : null,
    `Kenteken tegenpartij: ${data.kenteken_tegenpartij}`,
  ].filter(Boolean)
  
  ongevalDetails.forEach(detail => {
    page.drawText(`- ${detail}`, { x: 60, y: y, size: 10, font: regularFont, color: textColor })
    y -= 15
  })
  
  y -= 15

  // TOEDRACHT (Filter OCR ruis!)
  page.drawText('Toedracht Ongeval', {
    x: 50, y: y, size: 11, font: boldFont, color: primaryColor,
  })
  y -= 20
  
  // Clean beschrijving: verwijder OCR ruis en vat samen
  let cleanedBeschrijving = data.beschrijving
    .replace(/OCR geextraheerde tekst:|ЕСТРАНЕН|КОНСТАТИВЕН|ПРОТОКОЛ/gi, '')
    .replace(/\n+/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/[^\x00-\x7F]/g, '')
    .trim()
  
  // Als te lang, neem eerste 500 karakters
  if (cleanedBeschrijving.length > 500) {
    cleanedBeschrijving = cleanedBeschrijving.substring(0, 500) + '...'
  }
  
  const maxWidth = width - 120
  const beschrijvingLines = wrapText(cleanedBeschrijving, maxWidth, regularFont, 10)
  
  beschrijvingLines.forEach(line => {
    if (y < 100) {
      const newPage = pdfDoc.addPage([595.28, 841.89])
      y = height - 50
    }
    page.drawText(line, { x: 60, y: y, size: 10, font: regularFont, color: textColor })
    y -= 15
  })
  
  y -= 15

  // AANSPRAKELIJKHEID
  page.drawText('Aansprakelijkstelling', {
    x: 50, y: y, size: 11, font: boldFont, color: primaryColor,
  })
  y -= 20
  
  const aansprakelijkheidTekst = [
    'Op grond van bovenstaande feiten en omstandigheden stellen wij u als bestuurder',
    'van het voertuig met kenteken ' + data.kenteken_tegenpartij + ' aansprakelijk voor de',
    'door onze client geleden schade als gevolg van dit verkeersongeval.',
    '',
    'Wij verzoeken u binnen 14 dagen na dagtekening van deze brief schriftelijk te',
    'bevestigen dat u uw aansprakelijkheid erkent en de schade zult vergoeden.',
    '',
    'Bij niet tijdige betaling zullen buitengerechtelijke incassokosten conform het',
    'Convenant Buitengerechtelijke Kosten - Materieel in rekening worden gebracht.',
  ]
  
  aansprakelijkheidTekst.forEach(line => {
    if (y < 100) {
      const newPage = pdfDoc.addPage([595.28, 841.89])
      y = height - 50
    }
    page.drawText(line, { x: 60, y: y, size: 10, font: regularFont, color: textColor })
    y -= 15
  })
  
  y -= 15

  // SCHADE
  if (data.geschatte_schade) {
    page.drawText('Geschatte Schade', {
      x: 50, y: y, size: 11, font: boldFont, color: primaryColor,
    })
    y -= 20
    page.drawText(`Geschatte schade: EUR ${data.geschatte_schade}`, {
      x: 60, y: y, size: 10, font: regularFont, color: textColor,
    })
    y -= 30
  }

  // VERZOEK
  page.drawText('Verzoek tot Actie', {
    x: 50, y: y, size: 11, font: boldFont, color: primaryColor,
  })
  y -= 20
  
  const verzoekTekst = [
    'Wij verzoeken u:',
    '1. Uw aansprakelijkheid te erkennen binnen 14 dagen',
    '2. Deze brief door te sturen naar uw verzekeraar',
    '3. Uw polisnummer en verzekeringgegevens te verstrekken',
    '',
    'Bij gebreke van een reactie binnen voornoemde termijn behouden wij ons',
    'het recht voor om verdere juridische stappen te ondernemen.',
  ]
  
  verzoekTekst.forEach(line => {
    if (y < 100) {
      const newPage = pdfDoc.addPage([595.28, 841.89])
      y = height - 50
    }
    page.drawText(line, { x: 60, y: y, size: 10, font: regularFont, color: textColor })
    y -= 15
  })
  
  y -= 30

  // AFSLUITING (Professioneel!)
  page.drawText('Hoogachtend,', {
    x: 50, y: y, size: 10, font: regularFont, color: textColor,
  })
  y -= 20
  
  page.drawText('Namens Gratis Schadeverhalen', {
    x: 50, y: y, size: 11, font: boldFont, color: textColor,
  })
  y -= 15
  
  page.drawText('Gert Jan van Straalen - Directeur', {
    x: 50, y: y, size: 10, font: regularFont, color: textColor,
  })
  y -= 20
  
  page.drawText(`Tel: ${data.telefoon_claimer}`, {
    x: 50, y: y, size: 10, font: regularFont, color: textColor,
  })
  y -= 15
  
  page.drawText(`Email: ${data.email_claimer}`, {
    x: 50, y: y, size: 10, font: regularFont, color: textColor,
  })

  // FOOTER
  page.drawLine({
    start: { x: 50, y: 50 },
    end: { x: width - 50, y: 50 },
    thickness: 1,
    color: grayColor,
  })
  
  page.drawText('www.autoschadebureau.nl | info@autoschadebureau.nl', {
    x: 50, y: 35, size: 8, font: regularFont, color: grayColor,
  })

  const pdfBytes = await pdfDoc.save()
  return pdfBytes
}

function wrapText(text: string, maxWidth: number, font: any, fontSize: number): string[] {
  const words = text.split(' ')
  const lines: string[] = []
  let currentLine = ''
  
  words.forEach(word => {
    const testLine = currentLine ? `${currentLine} ${word}` : word
    const testWidth = font.widthOfTextAtSize(testLine, fontSize)
    
    if (testWidth > maxWidth && currentLine) {
      lines.push(currentLine)
      currentLine = word
    } else {
      currentLine = testLine
    }
  })
  
  if (currentLine) {
    lines.push(currentLine)
  }
  
  return lines
}
