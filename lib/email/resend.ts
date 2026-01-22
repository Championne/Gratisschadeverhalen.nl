import { Resend } from 'resend'

// Use a placeholder during build if no API key is available
const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder_for_build')

interface EmailOptions {
  to: string
  subject: string
  html: string
  text?: string
  cc?: string
  attachments?: Array<{
    filename: string
    content: Buffer | string
    encoding?: string
    contentType?: string
  }>
}

export async function sendEmail({ to, subject, html, text, cc, attachments }: EmailOptions) {
  try {
    // In development, use onboarding@resend.dev if domain not verified
    const isDevelopment = process.env.NODE_ENV === 'development'
    const fromEmail = isDevelopment 
      ? 'Gratis Schadeverhalen <onboarding@resend.dev>'
      : 'Autoschadebureau <noreply@autoschadebureau.nl>'

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [to],
      ...(cc && { cc: [cc] }),
      subject,
      html,
      ...(text && { text }),
      ...(attachments && { attachments }),
    })

    if (error) {
      console.error('❌ Email send error:', error)
      throw error
    }

    console.log('✅ Email verzonden naar:', to)
    console.log('📧 Email ID:', data?.id)
    
    return data
  } catch (error) {
    console.error('Failed to send email:', error)
    throw error
  }
}
