"use client"

import { DownloadLetterButton } from "@/components/download-letter-button"

interface ClaimActionsProps {
  claimId: string
}

export function ClaimActions({ claimId }: ClaimActionsProps) {
  return (
    <div className="flex gap-3">
      <DownloadLetterButton claimId={claimId} variant="default" size="sm" />
    </div>
  )
}
