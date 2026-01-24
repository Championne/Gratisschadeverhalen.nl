// Google Analytics 4 Component
// Note: Replace YOUR_GA4_MEASUREMENT_ID with your actual GA4 ID (format: G-XXXXXXXXXX)

export function GoogleAnalytics() {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX'
  
  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <script
        id="google-analytics"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  )
}

// Microsoft Clarity (Free Heatmaps & Session Recordings)
export function MicrosoftClarity() {
  const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID || 'XXXXXXXXXX'
  
  return (
    <script
      id="microsoft-clarity"
      type="text/javascript"
      dangerouslySetInnerHTML={{
        __html: `
          (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${CLARITY_ID}");
        `,
      }}
    />
  )
}

// Conversion Tracking Helper Functions
export const trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, eventParams)
  }
  
  // Also track in Clarity if available
  if (typeof window !== 'undefined' && (window as any).clarity) {
    (window as any).clarity('set', eventName, eventParams)
  }
}

// Main Conversion Events
export const trackConversion = (
  conversionType: 
    | 'claim_submitted' 
    | 'claim_form_started' 
    | 'document_uploaded'
    | 'contact_form_submitted'
    | 'phone_clicked'
    | 'email_clicked'
    | 'checklist_downloaded'
    | 'blog_read_completed'
    | 'cta_clicked'
) => {
  trackEvent(conversionType, {
    event_category: 'conversion',
    event_label: conversionType,
    value: 1,
    timestamp: new Date().toISOString()
  })
}

// User Engagement Events
export const trackEngagement = (
  engagementType:
    | 'scroll_depth_50'
    | 'scroll_depth_75'
    | 'scroll_depth_100'
    | 'time_on_page_30s'
    | 'time_on_page_60s'
    | 'time_on_page_120s'
    | 'video_play'
    | 'faq_opened'
    | 'testimonial_viewed'
) => {
  trackEvent('engagement', {
    event_category: 'engagement',
    event_label: engagementType,
    value: 1
  })
}

// Navigation Events
export const trackNavigation = (
  destination: string,
  source: 'header' | 'footer' | 'cta' | 'inline_link' | 'breadcrumb'
) => {
  trackEvent('navigation', {
    event_category: 'navigation',
    destination,
    source,
  })
}

// Lead Quality Events
export const trackLeadQuality = (
  quality: 'hot' | 'warm' | 'cold',
  reason: string
) => {
  trackEvent('lead_quality', {
    event_category: 'lead_scoring',
    quality,
    reason
  })
}

// Error Tracking
export const trackError = (
  errorType: 'form_validation' | 'api_error' | '404' | 'upload_failed',
  errorMessage?: string
) => {
  trackEvent('error', {
    event_category: 'error',
    error_type: errorType,
    error_message: errorMessage
  })
}

export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
      page_path: url,
    })
  }
}
