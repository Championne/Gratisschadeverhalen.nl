import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { generateAansprakelijkheidsbrief } from '@/lib/pdf/letter-generator'

export async function POST(request: NextRequest) {
  try {
    const { claimId } = await request.json()

    if (!claimId) {
      return NextResponse.json({ error: 'No claimId provided' }, { status: 400 })
    }

    // Fetch claim from database
    const supabase = await createClient()
    const { data: claim, error } = await supabase
      .from('claims')
      .select('*')
      .eq('id', claimId)
      .single()

    if (error || !claim) {
      return NextResponse.json({ error: 'Claim not found' }, { status: 404 })
    }

    // Generate PDF
    const pdfBytes = await generateAansprakelijkheidsbrief({
      claimId: claim.id,
      datum_ongeval: claim.datum_ongeval,
      plaats_ongeval: claim.plaats_ongeval,
      naam_claimer: claim.naam,
      telefoon_claimer: claim.telefoon,
      email_claimer: claim.email,
      kenteken_claimer: claim.kenteken_claimer,
      naam_tegenpartij: claim.naam_tegenpartij,
      kenteken_tegenpartij: claim.kenteken_tegenpartij,
      verzekeraar_tegenpartij: claim.verzekeraar_tegenpartij,
      polisnummer_tegenpartij: claim.polisnummer_tegenpartij,
      beschrijving: claim.beschrijving,
      geschatte_schade: claim.geschatte_schade,
      ai_analyse: claim.ai_notes,
    })

    // Return PDF as download
    return new NextResponse(pdfBytes, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="aansprakelijkheidsbrief-${claim.id.substring(0, 8)}.pdf"`,
      },
    })

  } catch (error: any) {
    console.error('PDF Generation Error:', error)
    return NextResponse.json(
      { error: 'Failed to generate PDF', details: error.message },
      { status: 500 }
    )
  }
}
