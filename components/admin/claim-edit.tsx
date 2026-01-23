"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { 
  Edit, 
  Save, 
  X, 
  User, 
  Car, 
  FileText,
  Loader2 
} from "lucide-react"

interface ClaimEditProps {
  claim: any
  onUpdate?: () => void
}

export function ClaimEdit({ claim, onUpdate }: ClaimEditProps) {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    // Klant info
    naam: claim.naam || '',
    email: claim.email || '',
    telefoon: claim.telefoon || '',
    
    // Tegenpartij info
    kenteken_tegenpartij: claim.kenteken_tegenpartij || '',
    naam_tegenpartij: claim.naam_tegenpartij || '',
    verzekeraar_tegenpartij: claim.verzekeraar_tegenpartij || '',
    polisnummer_tegenpartij: claim.polisnummer_tegenpartij || '',
    
    // Schade info
    datum_ongeval: claim.datum_ongeval 
      ? new Date(claim.datum_ongeval).toISOString().split('T')[0] 
      : '',
    plaats_ongeval: claim.plaats_ongeval || '',
    beschrijving: claim.beschrijving || '',
    geschatte_schade: claim.geschatte_schade || '',
    reparatie_offerte: claim.reparatie_offerte || '',
  })

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleCancel = () => {
    // Reset form data
    setFormData({
      naam: claim.naam || '',
      email: claim.email || '',
      telefoon: claim.telefoon || '',
      kenteken_tegenpartij: claim.kenteken_tegenpartij || '',
      naam_tegenpartij: claim.naam_tegenpartij || '',
      verzekeraar_tegenpartij: claim.verzekeraar_tegenpartij || '',
      polisnummer_tegenpartij: claim.polisnummer_tegenpartij || '',
      datum_ongeval: claim.datum_ongeval 
        ? new Date(claim.datum_ongeval).toISOString().split('T')[0] 
        : '',
      plaats_ongeval: claim.plaats_ongeval || '',
      beschrijving: claim.beschrijving || '',
      geschatte_schade: claim.geschatte_schade || '',
      reparatie_offerte: claim.reparatie_offerte || '',
    })
    setIsEditing(false)
  }

  const handleSave = async () => {
    try {
      setIsSaving(true)

      // Detect changes
      const changes: Record<string, { old: any, new: any }> = {}
      Object.keys(formData).forEach(key => {
        const oldValue = claim[key]
        const newValue = formData[key as keyof typeof formData]
        
        // Convert date for comparison
        const oldCompare = key === 'datum_ongeval' && oldValue
          ? new Date(oldValue).toISOString().split('T')[0]
          : oldValue
        
        if (oldCompare != newValue && (newValue || oldValue)) {
          changes[key] = { old: oldValue || null, new: newValue || null }
        }
      })

      if (Object.keys(changes).length === 0) {
        toast.info("Geen wijzigingen gedetecteerd")
        setIsEditing(false)
        return
      }

      const response = await fetch(`/api/admin/claims/${claim.id}/edit`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...formData,
          changes // Send detected changes for audit log
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to update claim')
      }

      toast.success(`Claim succesvol bijgewerkt (${Object.keys(changes).length} velden gewijzigd)`)
      setIsEditing(false)
      router.refresh()
      onUpdate?.()
    } catch (error) {
      console.error('Error updating claim:', error)
      toast.error('Fout bij opslaan van wijzigingen')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Edit Toggle Button */}
      <div className="flex justify-end">
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} variant="outline">
            <Edit className="h-4 w-4 mr-2" />
            Claim Bewerken
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button 
              onClick={handleCancel} 
              variant="outline"
              disabled={isSaving}
            >
              <X className="h-4 w-4 mr-2" />
              Annuleren
            </Button>
            <Button 
              onClick={handleSave}
              disabled={isSaving}
            >
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

      {/* Klant Informatie */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Klant Informatie
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="naam">Naam</Label>
              {isEditing ? (
                <Input
                  id="naam"
                  value={formData.naam}
                  onChange={(e) => handleChange('naam', e.target.value)}
                  placeholder="Naam claimer"
                />
              ) : (
                <p className="font-medium mt-2">{claim.naam || 'Niet ingevuld'}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="email">Email</Label>
              {isEditing ? (
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="email@voorbeeld.nl"
                />
              ) : (
                <p className="font-medium mt-2">{claim.email}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="telefoon">Telefoon</Label>
              {isEditing ? (
                <Input
                  id="telefoon"
                  value={formData.telefoon}
                  onChange={(e) => handleChange('telefoon', e.target.value)}
                  placeholder="06-12345678"
                />
              ) : (
                <p className="font-medium mt-2">{claim.telefoon || 'Niet ingevuld'}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="plaats_ongeval">Plaats Ongeval</Label>
              {isEditing ? (
                <Input
                  id="plaats_ongeval"
                  value={formData.plaats_ongeval}
                  onChange={(e) => handleChange('plaats_ongeval', e.target.value)}
                  placeholder="Amsterdam"
                />
              ) : (
                <p className="font-medium mt-2">{claim.plaats_ongeval || 'Niet ingevuld'}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Voertuig Informatie */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Car className="h-5 w-5" />
            Voertuig Informatie
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
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
                <p className="font-mono font-medium text-lg mt-2">{claim.kenteken_tegenpartij}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="naam_tegenpartij">Naam Tegenpartij</Label>
              {isEditing ? (
                <Input
                  id="naam_tegenpartij"
                  value={formData.naam_tegenpartij}
                  onChange={(e) => handleChange('naam_tegenpartij', e.target.value)}
                  placeholder="Naam bestuurder"
                />
              ) : (
                <p className="font-medium mt-2">{claim.naam_tegenpartij || 'Niet ingevuld'}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="verzekeraar_tegenpartij">Verzekeraar Tegenpartij</Label>
              {isEditing ? (
                <Input
                  id="verzekeraar_tegenpartij"
                  value={formData.verzekeraar_tegenpartij}
                  onChange={(e) => handleChange('verzekeraar_tegenpartij', e.target.value)}
                  placeholder="ANWB, Allianz, etc."
                />
              ) : (
                <p className="font-medium mt-2">{claim.verzekeraar_tegenpartij || 'Niet ingevuld'}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="polisnummer_tegenpartij">Polisnummer</Label>
              {isEditing ? (
                <Input
                  id="polisnummer_tegenpartij"
                  value={formData.polisnummer_tegenpartij}
                  onChange={(e) => handleChange('polisnummer_tegenpartij', e.target.value)}
                  placeholder="Polisnummer"
                />
              ) : (
                <p className="font-medium mt-2">{claim.polisnummer_tegenpartij || 'Niet ingevuld'}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Schade Informatie */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Schade Informatie
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="datum_ongeval">Datum Ongeval</Label>
              {isEditing ? (
                <Input
                  id="datum_ongeval"
                  type="date"
                  value={formData.datum_ongeval}
                  onChange={(e) => handleChange('datum_ongeval', e.target.value)}
                />
              ) : (
                <p className="font-medium mt-2">
                  {claim.datum_ongeval 
                    ? new Date(claim.datum_ongeval).toLocaleDateString('nl-NL')
                    : 'Niet ingevuld'
                  }
                </p>
              )}
            </div>
            
            <div>
              <Label htmlFor="geschatte_schade">Geschat Bedrag (€)</Label>
              {isEditing ? (
                <Input
                  id="geschatte_schade"
                  type="number"
                  value={formData.geschatte_schade}
                  onChange={(e) => handleChange('geschatte_schade', e.target.value)}
                  placeholder="1500"
                />
              ) : (
                <p className="font-medium text-lg mt-2">
                  {claim.geschatte_schade 
                    ? `€${Number(claim.geschatte_schade).toLocaleString('nl-NL')}`
                    : 'Niet ingevuld'
                  }
                </p>
              )}
            </div>
            
            <div>
              <Label htmlFor="reparatie_offerte">Reparatie Offerte (€)</Label>
              {isEditing ? (
                <Input
                  id="reparatie_offerte"
                  type="number"
                  value={formData.reparatie_offerte}
                  onChange={(e) => handleChange('reparatie_offerte', e.target.value)}
                  placeholder="1800"
                />
              ) : (
                <p className="font-medium mt-2">
                  {claim.reparatie_offerte 
                    ? `€${Number(claim.reparatie_offerte).toLocaleString('nl-NL')}`
                    : 'Niet ingevuld'
                  }
                </p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="beschrijving">Beschrijving</Label>
            {isEditing ? (
              <Textarea
                id="beschrijving"
                value={formData.beschrijving}
                onChange={(e) => handleChange('beschrijving', e.target.value)}
                placeholder="Beschrijf het ongeval..."
                rows={5}
                className="mt-2"
              />
            ) : (
              <p className="text-sm whitespace-pre-wrap mt-2">
                {claim.beschrijving || 'Geen beschrijving opgegeven'}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
