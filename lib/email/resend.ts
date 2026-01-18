import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface EmailOptions {
  to: string
  subject: string
  html: string
}

export async function sendEmail({ to, subject, html }: EmailOptions) {
  try {
    // In development, use onboarding@resend.dev if domain not verified
    const isDevelopment = process.env.NODE_ENV === 'development'
    const fromEmail = isDevelopment 
      ? 'Gratis Schadeverhalen <onboarding@resend.dev>'
      : 'Gratis Schadeverhalen <noreply@gratisschadeverhalen.nl>'

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [to],
      subject,
      html,
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
