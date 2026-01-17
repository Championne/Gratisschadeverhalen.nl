import jsPDF from 'jspdf'

interface ClaimData {
  naam: string
  email: string
  telefoon: string
  kenteken_tegenpartij: string
  naam_tegenpartij?: string
  verzekeraar_tegenpartij?: string
  datum_ongeval: string
  plaats_ongeval?: string
  beschrijving: string
}

export function generateAansprakelijkheidsbrief(claimData: ClaimData): jsPDF {
  const doc = new jsPDF()
  
  // Marges
  const leftMargin = 20
  const pageWidth = doc.internal.pageSize.width
  let currentY = 20

  // Header
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text('Gratisschadeverhalen.nl', leftMargin, currentY)
  currentY += 5
  doc.text('info@gratisschadeverhalen.nl', leftMargin, currentY)
  currentY += 5
  doc.text('088-1234567', leftMargin, currentY)
  currentY += 15

  // Datum
  const today = new Date().toLocaleDateString('nl-NL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
  doc.text(`Datum: ${today}`, leftMargin, currentY)
  currentY += 15

  // Aan (verzekeraar)
  doc.setFont('helvetica', 'bold')
  doc.text('Aan:', leftMargin, currentY)
  currentY += 7
  doc.setFont('helvetica', 'normal')
  doc.text(claimData.verzekeraar_tegenpartij || 'WA-verzekeraar', leftMargin, currentY)
  currentY += 5
  doc.text(`T.a.v. afdeling Schade`, leftMargin, currentY)
  currentY += 15

  // Betreft
  doc.setFont('helvetica', 'bold')
  doc.text('Betreft: Aansprakelijkstelling WA-schade', leftMargin, currentY)
  currentY += 10

  // Inhoud brief
  doc.setFont('helvetica', 'normal')
  
  const lines = [
    'Geachte heer/mevrouw,',
    '',
    `Namens ondergetekende, ${claimData.naam}, doe ik u hierbij een beroep op artikel 6:162 BW`,
    `inzake de aansprakelijkstelling voor de door uw verzekerde veroorzaakte schade aan het voertuig`,
    `van cliënt.`,
    '',
    'FEITEN:',
    `- Datum ongeval: ${new Date(claimData.datum_ongeval).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })}`,
    `- Plaats ongeval: ${claimData.plaats_ongeval || 'Zoals vermeld in schadeformulier'}`,
    `- Kenteken tegenpartij: ${claimData.kenteken_tegenpartij}`,
    claimData.naam_tegenpartij ? `- Naam bestuurder: ${claimData.naam_tegenpartij}` : '',
    '',
    'GEBEURTENIS:',
  ]

  lines.forEach(line => {
    if (line !== '') {
      const splitText = doc.splitTextToSize(line, pageWidth - 2 * leftMargin)
      doc.text(splitText, leftMargin, currentY)
      currentY += 7 * splitText.length
    } else {
      currentY += 5
    }
  })

  // Beschrijving
  const beschrijvingLines = doc.splitTextToSize(claimData.beschrijving, pageWidth - 2 * leftMargin)
  doc.text(beschrijvingLines, leftMargin, currentY)
  currentY += 7 * beschrijvingLines.length + 10

  // Conclusie
  const conclusieLines = [
    'CONCLUSIE:',
    `Uit bovenstaande blijkt dat uw verzekerde aansprakelijk is voor de door cliënt geleden schade.`,
    `Op grond van artikel 6:162 BW stel ik u dan ook aansprakelijk voor de materiële schade die`,
    `cliënt heeft geleden als gevolg van dit verkeersongeval.`,
    '',
    'VERZOEK:',
    `Ik verzoek u vriendelijk doch dringend om binnen 14 dagen na dagtekening van deze brief`,
    `schriftelijk te bevestigen dat u de aansprakelijkheid erkent en de schade zult vergoeden.`,
    '',
    `Mocht u binnen de gestelde termijn niet reageren, dan behouden wij ons het recht voor om`,
    `zonder nadere aankondiging juridische stappen te ondernemen.`,
    '',
    'Hoogachtend,',
    '',
    '',
    'Gratisschadeverhalen.nl',
    `Namens: ${claimData.naam}`,
    '',
    'Bijlagen:',
    '- Foto\'s van de schade',
    '- Europees Schadeformulier (indien aanwezig)',
    '- Eventuele andere relevante documenten',
  ]

  conclusieLines.forEach(line => {
    if (currentY > doc.internal.pageSize.height - 30) {
      doc.addPage()
      currentY = 20
    }
    
    if (line !== '') {
      const splitText = doc.splitTextToSize(line, pageWidth - 2 * leftMargin)
      doc.text(splitText, leftMargin, currentY)
      currentY += 7 * splitText.length
    } else {
      currentY += 5
    }
  })

  return doc
}

export function downloadPDF(doc: jsPDF, filename: string = 'aansprakelijkheidsbrief.pdf') {
  doc.save(filename)
}

export function getPDFBlob(doc: jsPDF): Blob {
  return doc.output('blob')
}
