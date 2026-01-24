"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { toast } from "sonner"
import { Edit, Save, X, Loader2, RefreshCw, Info } from "lucide-react"

interface ClaimEditUserProps {
  claim: {
    id: string
    beschrijving: string
    plaats_ongeval?: string
    kenteken_tegenpartij: string
    naam_tegenpartij?: string
    verzekeraar_tegenpartij?: string
    polisnummer_tegenpartij?: string
    geschatte_schade?: number
    status: string
  }
  onUpdate?: () => void
}

export function ClaimEditUser({ claim, onUpdate }: ClaimEditUserProps) {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    beschrijving: claim.beschrijving || '',
    plaats_ongeval: claim.plaats_ongeval || '',
    kenteken_tegenpartij: claim.kenteken_tegenpartij || '',
    naam_tegenpartij: claim.naam_tegenpartij || '',
    verzekeraar_tegenpartij: claim.verzekeraar_tegenpartij || '',
    polisnummer_tegenpartij: claim.polisnummer_tegenpartij || '',
    geschatte_schade: claim.geschatte_schade?.toString() || '',
  })

  // Check if claim can be edited
  const finalStatuses = ['afgerond', 'geweigerd', 'geannuleerd']
  const canEdit = !finalStatuses.includes(claim.status)

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleCancel = () => {
    setFormData({
      beschrijving: claim.beschrijving || '',
      plaats_ongeval: claim.plaats_ongeval || '',
      kenteken_tegenpartij: claim.kenteken_tegenpartij || '',
      naam_tegenpartij: claim.naam_tegenpartij || '',
      verzekeraar_tegenpartij: claim.verzekeraar_tegenpartij || '',
      polisnummer_tegenpartij: claim.polisnummer_tegenpartij || '',
      geschatte_schade: claim.geschatte_schade?.toString() || '',
    })
    setIsEditing(false)
  }

  const handleSave = async () => {
    try {
      setIsSaving(true)

      // Build update payload
      const updates: Record<string, any> = {}
      
      if (formData.beschrijving !== claim.beschrijving) {
        updates.beschrijving = formData.beschrijving
      }
      if (formData.plaats_ongeval !== (claim.plaats_ongeval || '')) {
        updates.plaats_ongeval = formData.plaats_ongeval
      }
      if (formData.kenteken_tegenpartij !== claim.kenteken_tegenpartij) {
        updates.kenteken_tegenpartij = formData.kenteken_tegenpartij.toUpperCase()
      }
      if (formData.naam_tegenpartij !== (claim.naam_tegenpartij || '')) {
        updates.naam_tegenpartij = formData.naam_tegenpartij
      }
      if (formData.verzekeraar_tegenpartij !== (claim.verzekeraar_tegenpartij || '')) {
        updates.verzekeraar_tegenpartij = formData.verzekeraar_tegenpartij
      }
      if (formData.polisnummer_tegenpartij !== (claim.polisnummer_tegenpartij || '')) {
        updates.polisnummer_tegenpartij = formData.polisnummer_tegenpartij
      }
      if (formData.geschatte_schade !== (claim.geschatte_schade?.toString() || '')) {
        updates.geschatte_schade = formData.geschatte_schade ? parseFloat(formData.geschatte_schade) : null
      }

      if (Object.keys(updates).length === 0) {
        toast.info("Geen wijzigingen gedetecteerd")
        setIsEditing(false)
        return
      }

      const response = await fetch(`/api/claims/${claim.id}/update`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to update claim')
      }

      toast.success(result.message || 'Claim bijgewerkt!', {
        description: result.aiReanalysis?.triggered 
          ? '🤖 AI analyseert uw wijzigingen...'
          : undefined
      })

      setIsEditing(false)
      router.refresh()
      onUpdate?.()

    } catch (error: any) {
      console.error('Error updating claim:', error)
      toast.error('Fout bij opslaan', {
        description: error.message || 'Probeer het later opnieuw'
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (!canEdit) {
    return (
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          Deze claim is afgerond en kan niet meer worden gewijzigd.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5" />
              Gegevens Aanvullen
            </CardTitle>
            <CardDescription>
              Wijzig of vul ontbrekende informatie aan. Wijzigingen worden automatisch geanalyseerd.
            </CardDescription>
          </div>
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Bewerken
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button onClick={handleCancel} variant="outline" size="sm" disabled={isSaving}>
                <X className="h-4 w-4 mr-2" />
                Annuleren
              </Button>
              <Button onClick={handleSave} size="sm" disabled={isSaving}>
                {isSaving ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                Opslaan
              </Button>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {isEditing && (
          <Alert className="bg-blue-50 border-blue-200">
            <RefreshCw className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              Na het opslaan wordt uw claim automatisch opnieuw geanalyseerd door onze AI.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          {/* Tegenpartij gegevens */}
          <div className="space-y-2">
            <Label htmlFor="kenteken_tegenpartij">Kenteken Tegenpartij</Label>
            {isEditing ? (
              <Input
                id="kenteken_tegenpartij"
                value={formData.kenteken_tegenpartij}
                onChange={(e) => handleChange('kenteken_tegenpartij', e.target.value.toUpperCase())}
                placeholder="XX-YY-99"
                className="font-mono"
              />
            ) : (
              <p className="font-mono font-medium py-2">{claim.kenteken_tegenpartij || '-'}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="naam_tegenpartij">Naam Tegenpartij</Label>
            {isEditing ? (
              <Input
                id="naam_tegenpartij"
                value={formData.naam_tegenpartij}
                onChange={(e) => handleChange('naam_tegenpartij', e.target.value)}
                placeholder="Naam bestuurder (optioneel)"
              />
            ) : (
              <p className="py-2">{claim.naam_tegenpartij || <span className="text-muted-foreground">Niet ingevuld</span>}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="verzekeraar_tegenpartij">Verzekeraar Tegenpartij</Label>
            {isEditing ? (
              <Input
                id="verzekeraar_tegenpartij"
                value={formData.verzekeraar_tegenpartij}
                onChange={(e) => handleChange('verzekeraar_tegenpartij', e.target.value)}
                placeholder="Bijv. ANWB, Allianz, Centraal Beheer"
              />
            ) : (
              <p className="py-2">{claim.verzekeraar_tegenpartij || <span className="text-muted-foreground">Niet ingevuld</span>}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="polisnummer_tegenpartij">Polisnummer (optioneel)</Label>
            {isEditing ? (
              <Input
                id="polisnummer_tegenpartij"
                value={formData.polisnummer_tegenpartij}
                onChange={(e) => handleChange('polisnummer_tegenpartij', e.target.value)}
                placeholder="Indien bekend"
              />
            ) : (
              <p className="py-2">{claim.polisnummer_tegenpartij || <span className="text-muted-foreground">Niet ingevuld</span>}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="plaats_ongeval">Plaats Ongeval</Label>
            {isEditing ? (
              <Input
                id="plaats_ongeval"
                value={formData.plaats_ongeval}
                onChange={(e) => handleChange('plaats_ongeval', e.target.value)}
                placeholder="Stad/gemeente"
              />
            ) : (
              <p className="py-2">{claim.plaats_ongeval || <span className="text-muted-foreground">Niet ingevuld</span>}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="geschatte_schade">Geschatte Schade (€)</Label>
            {isEditing ? (
              <Input
                id="geschatte_schade"
                type="number"
                value={formData.geschatte_schade}
                onChange={(e) => handleChange('geschatte_schade', e.target.value)}
                placeholder="Bijv. 1500"
              />
            ) : (
              <p className="py-2">
                {claim.geschatte_schade 
                  ? `€${Number(claim.geschatte_schade).toLocaleString('nl-NL')}`
                  : <span className="text-muted-foreground">Niet ingevuld</span>
                }
              </p>
            )}
          </div>
        </div>

        {/* Beschrijving */}
        <div className="space-y-2">
          <Label htmlFor="beschrijving">Beschrijving Ongeval</Label>
          {isEditing ? (
            <Textarea
              id="beschrijving"
              value={formData.beschrijving}
              onChange={(e) => handleChange('beschrijving', e.target.value)}
              placeholder="Beschrijf het ongeval zo gedetailleerd mogelijk..."
              rows={4}
            />
          ) : (
            <p className="text-sm whitespace-pre-wrap py-2 bg-muted/30 rounded p-3">
              {claim.beschrijving || 'Geen beschrijving opgegeven'}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
