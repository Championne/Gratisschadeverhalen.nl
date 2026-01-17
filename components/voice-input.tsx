"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Mic, MicOff } from "lucide-react"
import { toast } from "sonner"

interface VoiceInputProps {
  onTranscript: (text: string) => void
}

export function VoiceInput({ onTranscript }: VoiceInputProps) {
  const [isListening, setIsListening] = useState(false)
  const [recognition, setRecognition] = useState<any>(null)

  useEffect(() => {
    // Check if browser supports Web Speech API
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      
      if (SpeechRecognition) {
        const recognitionInstance = new SpeechRecognition()
        recognitionInstance.continuous = false
        recognitionInstance.interimResults = false
        recognitionInstance.lang = 'nl-NL'

        recognitionInstance.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript
          onTranscript(transcript)
          toast.success("Voice input toegevoegd", {
            description: `"${transcript.substring(0, 50)}..."`
          })
        }

        recognitionInstance.onerror = (event: any) => {
          console.error("Speech recognition error:", event.error)
          toast.error("Voice input mislukt", {
            description: "Controleer je microfoon permissies"
          })
          setIsListening(false)
        }

        recognitionInstance.onend = () => {
          setIsListening(false)
        }

        setRecognition(recognitionInstance)
      }
    }
  }, [onTranscript])

  const toggleListening = () => {
    if (!recognition) {
      toast.error("Voice input niet ondersteund", {
        description: "Je browser ondersteunt geen spraakherkenning"
      })
      return
    }

    if (isListening) {
      recognition.stop()
      setIsListening(false)
    } else {
      recognition.start()
      setIsListening(true)
      toast.info("Luisteren...", {
        description: "Spreek nu in je microfoon"
      })
    }
  }

  if (!recognition) {
    return null // Don't show button if not supported
  }

  return (
    <Button
      type="button"
      variant={isListening ? "destructive" : "outline"}
      size="icon"
      onClick={toggleListening}
      title={isListening ? "Stop met luisteren" : "Start voice input"}
    >
      {isListening ? (
        <MicOff className="h-4 w-4" />
      ) : (
        <Mic className="h-4 w-4" />
      )}
    </Button>
  )
}
