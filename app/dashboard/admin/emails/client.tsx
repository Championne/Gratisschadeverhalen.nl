"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import { RefreshCw, Trash2, Loader2 } from "lucide-react"
import { UnmatchedEmailsTable } from "@/components/admin/unmatched-emails-table"

export function UnmatchedEmailsClient() {
  const router = useRouter()
  const [emails, setEmails] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isCleaningSpam, setIsCleaningSpam] = useState(false)
  const [showSpam, setShowSpam] = useState(false)
  const [stats, setStats] = useState({ total: 0, unreadCount: 0 })

  // Fetch emails
  const fetchEmails = async (includeSpam = false) => {
    try {
      const response = await fetch(`/api/admin/emails/unmatched?includeSpam=${includeSpam}`)
      const data = await response.json()
      
      if (data.success) {
        setEmails(data.emails)
        setStats({
          total: data.total,
          unreadCount: data.unreadCount,
        })
      } else {
        throw new Error(data.error)
      }
    } catch (error: any) {
      console.error("Error fetching emails:", error)
      toast.error("Fout bij laden emails", {
        description: error.message,
      })
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }

  // Initial fetch
  useEffect(() => {
    fetchEmails(showSpam)
  }, [showSpam])

  // Refresh handler
  const handleRefresh = () => {
    setIsRefreshing(true)
    fetchEmails(showSpam)
    router.refresh()
  }

  // Cleanup spam handler
  const handleCleanupSpam = async () => {
    setIsCleaningSpam(true)
    try {
      const response = await fetch("/api/admin/emails/spam/cleanup", {
        method: "DELETE",
      })
      const data = await response.json()
      
      if (data.success) {
        toast.success("Spam opgeruimd", {
          description: data.message,
        })
        handleRefresh()
      } else {
        throw new Error(data.error)
      }
    } catch (error: any) {
      toast.error("Opruimen mislukt", {
        description: error.message,
      })
    } finally {
      setIsCleaningSpam(false)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Actions Bar */}
      <div className="flex items-center justify-between">
        <Tabs value={showSpam ? "spam" : "inbox"} onValueChange={(v) => setShowSpam(v === "spam")}>
          <TabsList>
            <TabsTrigger value="inbox">
              Inbox ({stats.total})
            </TabsTrigger>
            <TabsTrigger value="spam">
              Spam
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2">
          {showSpam && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleCleanupSpam}
              disabled={isCleaningSpam}
            >
              {isCleaningSpam ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4 mr-2" />
              )}
              Oude spam verwijderen
            </Button>
          )}
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            Vernieuwen
          </Button>
        </div>
      </div>

      {/* Email Table */}
      <UnmatchedEmailsTable
        emails={emails}
        onRefresh={handleRefresh}
      />
    </div>
  )
}
