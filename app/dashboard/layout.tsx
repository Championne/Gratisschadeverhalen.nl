import { ReactNode } from 'react'

export default function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  // Dashboard pages render their own DashboardHeader
  // This layout prevents the SiteHeader from showing
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  )
}
