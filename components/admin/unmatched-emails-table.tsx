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
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"
import {
  Mail,
  MoreHorizontal,
  Link2,
  Trash2,
  Eye,
  Search,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Paperclip,
} from "lucide-react"

interface PotentialMatch {
  claim_id: string
  claim_naam: string
  claim_kenteken: string
  claim_verzekeraar: string
  claim_status: string
  match_reason: string
  confidence: number
}

interface UnmatchedEmail {
  id: string
  from_email: string
  from_name: string | null
  subject: string
  body_text: string
  received_at: string
  has_attachments: boolean
  attachment_count: number
  is_spam: boolean | null
  admin_reviewed: boolean | null
  potential_matches: PotentialMatch[]
}

interface SearchResult {
  id: string
  naam: string
  email: string
  kenteken_tegenpartij: string
  verzekeraar_tegenpartij: string
  status: string
}

interface Props {
  emails: UnmatchedEmail[]
  onRefresh: () => void
}

export function UnmatchedEmailsTable({ emails, onRefresh }: Props) {
  const router = useRouter()
  const [selectedEmail, setSelectedEmail] = useState<UnmatchedEmail | null>(null)
  const [linkDialogOpen, setLinkDialogOpen] = useState(false)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [isLinking, setIsLinking] = useState(false)
  const [isMarkingSpam, setIsMarkingSpam] = useState<string | null>(null)

  // Search for claims
  const handleSearch = async (query: string) => {
    setSearchQuery(query)
    if (query.length < 2) {
      setSearchResults([])
      return
    }

    setIsSearching(true)
    try {
      const response = await fetch(`/api/admin/emails/search-claims?q=${encodeURIComponent(query)}`)
      const data = await response.json()
      if (data.success) {
        setSearchResults(data.claims)
      }
    } catch (error) {
      console.error("Search error:", error)
    } finally {
      setIsSearching(false)
    }
  }

  // Link email to claim
  const handleLink = async (claimId: string) => {
    if (!selectedEmail) return

    setIsLinking(true)
    try {
      const response = await fetch(`/api/admin/emails/${selectedEmail.id}/link`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ claimId }),
      })

      const data = await response.json()
      if (data.success) {
        toast.success("Email gekoppeld!", {
          description: data.message,
        })
        setLinkDialogOpen(false)
        setSelectedEmail(null)
        setSearchQuery("")
        setSearchResults([])
        onRefresh()
      } else {
        throw new Error(data.error)
      }
    } catch (error: any) {
      toast.error("Koppelen mislukt", {
        description: error.message,
      })
    } finally {
      setIsLinking(false)
    }
  }

  // Mark as spam
  const handleMarkSpam = async (emailId: string, isSpam: boolean = true) => {
    setIsMarkingSpam(emailId)
    try {
      const response = await fetch(`/api/admin/emails/${emailId}/spam`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isSpam }),
      })

      const data = await response.json()
      if (data.success) {
        toast.success(isSpam ? "Gemarkeerd als spam" : "Niet meer spam")
        onRefresh()
      } else {
        throw new Error(data.error)
      }
    } catch (error: any) {
      toast.error("Actie mislukt", {
        description: error.message,
      })
    } finally {
      setIsMarkingSpam(null)
    }
  }

  // Open link dialog with suggested matches
  const openLinkDialog = (email: UnmatchedEmail) => {
    setSelectedEmail(email)
    setLinkDialogOpen(true)
  }

  // Open view dialog
  const openViewDialog = (email: UnmatchedEmail) => {
    setSelectedEmail(email)
    setViewDialogOpen(true)
  }

  if (emails.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <CheckCircle2 className="h-12 w-12 text-green-500 mb-4" />
        <h3 className="text-lg font-medium">Geen ongematchte emails</h3>
        <p className="text-muted-foreground mt-1">
          Alle emails zijn gekoppeld of als spam gemarkeerd.
        </p>
      </div>
    )
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Van</TableHead>
            <TableHead>Onderwerp</TableHead>
            <TableHead>Ontvangen</TableHead>
            <TableHead>Suggesties</TableHead>
            <TableHead className="text-right">Acties</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {emails.map((email) => (
            <TableRow
              key={email.id}
              className={email.admin_reviewed ? "opacity-60" : ""}
            >
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-medium truncate max-w-[200px]">
                    {email.from_name || email.from_email}
                  </span>
                  {email.from_name && (
                    <span className="text-xs text-muted-foreground truncate max-w-[200px]">
                      {email.from_email}
                    </span>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {email.has_attachments && (
                    <Paperclip className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  )}
                  <span className="truncate max-w-[250px]">{email.subject || "(geen onderwerp)"}</span>
                </div>
              </TableCell>
              <TableCell>
                <span className="text-sm text-muted-foreground">
                  {formatDistanceToNow(new Date(email.received_at), {
                    addSuffix: true,
                    locale: nl,
                  })}
                </span>
              </TableCell>
              <TableCell>
                {email.potential_matches.length > 0 ? (
                  <div className="flex flex-wrap gap-1">
                    {email.potential_matches.slice(0, 2).map((match, idx) => (
                      <Badge
                        key={idx}
                        variant={match.confidence >= 80 ? "default" : "secondary"}
                        className="text-xs cursor-pointer"
                        onClick={() => openLinkDialog(email)}
                      >
                        {match.claim_naam?.split(" ")[0]} ({match.confidence}%)
                      </Badge>
                    ))}
                    {email.potential_matches.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{email.potential_matches.length - 2}
                      </Badge>
                    )}
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground">Geen suggesties</span>
                )}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => openViewDialog(email)}>
                      <Eye className="h-4 w-4 mr-2" />
                      Bekijken
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => openLinkDialog(email)}>
                      <Link2 className="h-4 w-4 mr-2" />
                      Koppelen aan claim
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => handleMarkSpam(email.id, true)}
                      className="text-red-600"
                      disabled={isMarkingSpam === email.id}
                    >
                      {isMarkingSpam === email.id ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4 mr-2" />
                      )}
                      Markeer als spam
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* View Email Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Email Details
            </DialogTitle>
            <DialogDescription>
              {selectedEmail?.subject || "(geen onderwerp)"}
            </DialogDescription>
          </DialogHeader>
          
          {selectedEmail && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Van:</span>
                  <p className="text-muted-foreground">
                    {selectedEmail.from_name && `${selectedEmail.from_name} `}
                    &lt;{selectedEmail.from_email}&gt;
                  </p>
                </div>
                <div>
                  <span className="font-medium">Ontvangen:</span>
                  <p className="text-muted-foreground">
                    {new Date(selectedEmail.received_at).toLocaleString("nl-NL")}
                  </p>
                </div>
              </div>

              {selectedEmail.has_attachments && (
                <div className="flex items-center gap-2 text-sm">
                  <Paperclip className="h-4 w-4" />
                  <span>{selectedEmail.attachment_count} bijlage(n)</span>
                </div>
              )}

              <div className="border rounded-lg p-4 bg-muted/30">
                <pre className="whitespace-pre-wrap text-sm font-mono">
                  {selectedEmail.body_text?.substring(0, 2000) || "(geen inhoud)"}
                  {selectedEmail.body_text && selectedEmail.body_text.length > 2000 && "..."}
                </pre>
              </div>

              {selectedEmail.potential_matches.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Mogelijke Claims</h4>
                  <div className="space-y-2">
                    {selectedEmail.potential_matches.map((match, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2 border rounded hover:bg-muted/50 cursor-pointer"
                        onClick={() => {
                          setViewDialogOpen(false)
                          openLinkDialog(selectedEmail)
                        }}
                      >
                        <div>
                          <span className="font-medium">{match.claim_naam}</span>
                          <span className="text-muted-foreground ml-2">
                            {match.claim_kenteken}
                          </span>
                        </div>
                        <Badge variant={match.confidence >= 80 ? "default" : "secondary"}>
                          {match.confidence}%
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
              Sluiten
            </Button>
            <Button onClick={() => {
              setViewDialogOpen(false)
              if (selectedEmail) openLinkDialog(selectedEmail)
            }}>
              <Link2 className="h-4 w-4 mr-2" />
              Koppelen
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Link to Claim Dialog */}
      <Dialog open={linkDialogOpen} onOpenChange={setLinkDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Link2 className="h-5 w-5" />
              Email Koppelen aan Claim
            </DialogTitle>
            <DialogDescription>
              Kies een claim om deze email aan te koppelen
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Zoek op naam, kenteken, email..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
              {isSearching && (
                <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 animate-spin" />
              )}
            </div>

            {/* Suggested Matches */}
            {selectedEmail?.potential_matches && selectedEmail.potential_matches.length > 0 && !searchQuery && (
              <div>
                <h4 className="text-sm font-medium mb-2 text-muted-foreground">
                  Gesuggereerde matches
                </h4>
                <div className="space-y-2 max-h-[200px] overflow-y-auto">
                  {selectedEmail.potential_matches.map((match) => (
                    <button
                      key={match.claim_id}
                      className="w-full flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors text-left"
                      onClick={() => handleLink(match.claim_id)}
                      disabled={isLinking}
                    >
                      <div>
                        <div className="font-medium">{match.claim_naam}</div>
                        <div className="text-sm text-muted-foreground">
                          {match.claim_kenteken} • {match.claim_verzekeraar}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {match.match_reason}
                        </div>
                      </div>
                      <Badge variant={match.confidence >= 80 ? "default" : "secondary"}>
                        {match.confidence}%
                      </Badge>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Search Results */}
            {searchQuery && searchResults.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2 text-muted-foreground">
                  Zoekresultaten
                </h4>
                <div className="space-y-2 max-h-[200px] overflow-y-auto">
                  {searchResults.map((claim) => (
                    <button
                      key={claim.id}
                      className="w-full flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors text-left"
                      onClick={() => handleLink(claim.id)}
                      disabled={isLinking}
                    >
                      <div>
                        <div className="font-medium">{claim.naam}</div>
                        <div className="text-sm text-muted-foreground">
                          {claim.kenteken_tegenpartij} • {claim.verzekeraar_tegenpartij}
                        </div>
                      </div>
                      <Badge variant="outline">{claim.status}</Badge>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {searchQuery && searchResults.length === 0 && !isSearching && (
              <div className="flex items-center gap-2 text-muted-foreground justify-center py-4">
                <AlertCircle className="h-4 w-4" />
                <span>Geen claims gevonden</span>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setLinkDialogOpen(false)
                setSearchQuery("")
                setSearchResults([])
              }}
            >
              Annuleren
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
