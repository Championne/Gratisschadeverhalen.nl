"use client"

import { AlertTriangle, CheckCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface EscalationBadgeProps {
  status: string
  escalatieReden?: string | null
  escalatieOpgelost?: boolean
  size?: "sm" | "md" | "lg"
  showTooltip?: boolean
}

export function EscalationBadge({ 
  status, 
  escalatieReden, 
  escalatieOpgelost = false,
  size = "md",
  showTooltip = true
}: EscalationBadgeProps) {
  // Niet tonen als status niet 'escalated' is
  if (status !== 'escalated') return null

  const isResolved = escalatieOpgelost

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-3 py-1",
    lg: "text-base px-4 py-1.5",
  }

  return (
    <div className="relative inline-flex items-center gap-2">
      <Badge 
        variant={isResolved ? "outline" : "destructive"}
        className={`${sizeClasses[size]} ${
          isResolved 
            ? "bg-green-50 text-green-700 border-green-300" 
            : "bg-red-100 text-red-800 border-red-300 animate-pulse"
        }`}
      >
        {isResolved ? (
          <>
            <CheckCircle className="h-3 w-3 mr-1" />
            Escalatie Opgelost
          </>
        ) : (
          <>
            <AlertTriangle className="h-3 w-3 mr-1" />
            Escalatie Vereist
          </>
        )}
      </Badge>
      
      {showTooltip && escalatieReden && !isResolved && (
        <div className="hidden lg:block absolute left-0 top-full mt-2 w-64 p-3 bg-white rounded-lg shadow-lg border border-red-200 z-10 text-sm">
          <div className="font-semibold text-red-800 mb-1">Reden:</div>
          <div className="text-gray-700">{escalatieReden}</div>
          <div className="absolute -top-1 left-4 w-2 h-2 bg-white border-t border-l border-red-200 transform rotate-45"></div>
        </div>
      )}
    </div>
  )
}

/**
 * Compact versie voor tabel weergave
 */
export function EscalationBadgeCompact({ status, escalatieReden }: EscalationBadgeProps) {
  if (status !== 'escalated') return null

  return (
    <div className="flex items-center gap-1 text-red-600" title={escalatieReden || "Handmatige aandacht vereist"}>
      <AlertTriangle className="h-4 w-4" />
      <span className="text-xs font-semibold">!</span>
    </div>
  )
}
