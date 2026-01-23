"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { formatDistanceToNow } from "date-fns"
import { nl } from "date-fns/locale"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Eye, Search, Filter } from "lucide-react"

interface Claim {
  id: string
  referentie: string
  status: string
  kenteken_aanvrager: string
  kenteken_tegenpartij: string
  verzekeraar_tegenpartij: string | null
  created_at: string
  schadebedrag_geschat: number | null
  users?: {
    email: string
    naam: string | null
  }
}

interface AdminClaimsTableProps {
  claims: Claim[]
}

const statusColors = {
  nieuw: "bg-blue-500",
  in_behandeling: "bg-orange-500",
  afgerond: "bg-green-500",
  geannuleerd: "bg-gray-500",
}

const statusLabels = {
  nieuw: "Nieuw",
  in_behandeling: "In Behandeling",
  afgerond: "Afgerond",
  geannuleerd: "Geannuleerd",
}

export function AdminClaimsTable({ claims }: AdminClaimsTableProps) {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [verzekeraaarFilter, setVerzekeraaarFilter] = useState<string>("all")

  // Get unique verzekeraars for filter
  const verzekeraars = Array.from(
    new Set(claims.map(c => c.verzekeraar_tegenpartij).filter(Boolean))
  ).sort()

  // Filter claims
  const filteredClaims = claims.filter(claim => {
    const matchesSearch = 
      claim.referentie?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.kenteken_aanvrager?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.kenteken_tegenpartij?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.users?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.users?.naam?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesVezekeraar = 
      verzekeraaarFilter === "all" || 
      claim.verzekeraar_tegenpartij === verzekeraaarFilter

    return matchesSearch && matchesVezekeraar
  })

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Zoek op referentie, kenteken, email, naam..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={verzekeraaarFilter} onValueChange={setVerzekeraaarFilter}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Verzekeraar" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alle Verzekeraars</SelectItem>
            {verzekeraars.map(verzekeraar => (
              <SelectItem key={verzekeraar} value={verzekeraar as string}>
                {verzekeraar}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        {filteredClaims.length} van {claims.length} claims
      </div>

      {/* Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Referentie</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Klant</TableHead>
              <TableHead>Kentekens</TableHead>
              <TableHead>Verzekeraar</TableHead>
              <TableHead>Bedrag</TableHead>
              <TableHead>Aangemaakt</TableHead>
              <TableHead className="text-right">Acties</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClaims.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                  Geen claims gevonden
                </TableCell>
              </TableRow>
            ) : (
              filteredClaims.map((claim) => (
                <TableRow key={claim.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-medium">
                    {claim.referentie}
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[claim.status as keyof typeof statusColors]}>
                      {statusLabels[claim.status as keyof typeof statusLabels]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{claim.users?.naam || 'Onbekend'}</span>
                      <span className="text-xs text-muted-foreground">{claim.users?.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col text-sm">
                      <span className="text-xs text-muted-foreground">Aanvrager:</span>
                      <span className="font-mono">{claim.kenteken_aanvrager}</span>
                      <span className="text-xs text-muted-foreground mt-1">Tegenpartij:</span>
                      <span className="font-mono">{claim.kenteken_tegenpartij}</span>
                    </div>
                  </TableCell>
                  <TableCell>{claim.verzekeraar_tegenpartij || '-'}</TableCell>
                  <TableCell>
                    {claim.schadebedrag_geschat 
                      ? `€${claim.schadebedrag_geschat.toLocaleString('nl-NL')}`
                      : '-'
                    }
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {formatDistanceToNow(new Date(claim.created_at), {
                        addSuffix: true,
                        locale: nl
                      })}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => router.push(`/dashboard/admin/claims/${claim.id}`)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Bekijken
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
