"use client"

import { useState } from "react"
import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle, HelpCircle, ArrowRight, ArrowLeft, Upload, AlertTriangle } from "lucide-react"

// Vragen voor de SchadeScan
const questions = [
  {
    id: 1,
    question: "Wie heeft het ongeval veroorzaakt?",
    description: "Bepaal wie aansprakelijk is voor de schade",
    options: [
      { value: "ander", label: "De andere partij (niet mijn schuld)", points: 3 },
      { value: "beide", label: "Gedeelde schuld / onduidelijk", points: 1 },
      { value: "ik", label: "Ikzelf (mijn schuld)", points: 0 },
    ]
  },
  {
    id: 2,
    question: "Kent u het kenteken van de tegenpartij?",
    description: "Met het kenteken kunnen we de verzekeraar achterhalen",
    options: [
      { value: "ja", label: "Ja, ik heb het kenteken genoteerd", points: 3 },
      { value: "gedeeltelijk", label: "Gedeeltelijk / niet zeker", points: 1 },
      { value: "nee", label: "Nee, onbekend", points: 0 },
    ]
  },
  {
    id: 3,
    question: "Is er een Europees Schadeformulier ingevuld?",
    description: "Dit document bewijst de toedracht van het ongeval",
    options: [
      { value: "ja_beide", label: "Ja, door beide partijen getekend", points: 3 },
      { value: "ja_een", label: "Ja, maar alleen door mij ingevuld", points: 2 },
      { value: "nee", label: "Nee, niet ingevuld", points: 1 },
    ]
  },
  {
    id: 4,
    question: "Heeft u foto's van de schade?",
    description: "Foto's zijn belangrijk bewijsmateriaal",
    options: [
      { value: "veel", label: "Ja, meerdere duidelijke foto's", points: 3 },
      { value: "weinig", label: "Een paar foto's", points: 2 },
      { value: "nee", label: "Geen foto's", points: 1 },
    ]
  },
  {
    id: 5,
    question: "Is de tegenpartij WA-verzekerd?",
    description: "Elke auto in Nederland moet WA-verzekerd zijn",
    options: [
      { value: "ja", label: "Ja / Waarschijnlijk wel", points: 3 },
      { value: "weet_niet", label: "Weet ik niet", points: 2 },
      { value: "nee", label: "Nee, niet verzekerd", points: 0 },
    ]
  },
  {
    id: 6,
    question: "Wanneer vond het ongeval plaats?",
    description: "Recente ongevallen zijn makkelijker te verhalen",
    options: [
      { value: "recent", label: "Afgelopen 30 dagen", points: 3 },
      { value: "maanden", label: "1-6 maanden geleden", points: 2 },
      { value: "lang", label: "Meer dan 6 maanden geleden", points: 1 },
    ]
  },
]

export default function SchadeScanPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, { value: string; points: number }>>({})
  const [showResult, setShowResult] = useState(false)

  const handleAnswer = (value: string, points: number) => {
    setAnswers({ ...answers, [currentQuestion]: { value, points } })
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResult(true)
    }
  }

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const reset = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setShowResult(false)
  }

  const totalPoints = Object.values(answers).reduce((sum, a) => sum + a.points, 0)
  const maxPoints = questions.length * 3
  const percentage = Math.round((totalPoints / maxPoints) * 100)

  const getResultCategory = () => {
    if (percentage >= 80) return "excellent"
    if (percentage >= 60) return "good"
    if (percentage >= 40) return "moderate"
    return "low"
  }

  const resultData = {
    excellent: {
      title: "Uitstekende verhaalkans!",
      description: "Uw situatie is zeer gunstig voor het verhalen van uw schade. Alle belangrijke elementen zijn aanwezig.",
      color: "green",
      icon: CheckCircle,
      advice: "Dien nu uw claim in en ontvang gemiddeld binnen 6 weken uw vergoeding.",
    },
    good: {
      title: "Goede verhaalkans",
      description: "U heeft een goede kans om uw schade te verhalen. Er zijn voldoende bewijzen aanwezig.",
      color: "blue",
      icon: CheckCircle,
      advice: "Wij kunnen met de beschikbare informatie aan de slag. Eventueel ontbrekende documenten kunnen we vaak alsnog verkrijgen.",
    },
    moderate: {
      title: "Redelijke verhaalkans",
      description: "Er zijn enkele uitdagingen, maar verhalen is nog steeds mogelijk. Wij onderzoeken de mogelijkheden.",
      color: "amber",
      icon: AlertTriangle,
      advice: "Dien uw claim in en wij bekijken wat er mogelijk is. Vaak kunnen we met creativiteit en ervaring toch resultaat boeken.",
    },
    low: {
      title: "Beperkte verhaalkans",
      description: "De situatie is uitdagend, maar niet hopeloos. Laat ons de mogelijkheden onderzoeken.",
      color: "red",
      icon: XCircle,
      advice: "Neem contact met ons op om uw situatie te bespreken. Soms zijn er alternatieven die u niet kent.",
    },
  }

  const result = resultData[getResultCategory()]

  if (showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
        <main className="container mx-auto px-4 py-8 max-w-2xl">
          <Link href="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
            <ArrowLeft className="h-4 w-4" />
            Terug naar Home
          </Link>

          <Card className={`border-2 border-${result.color}-200 bg-${result.color}-50`}>
            <CardHeader className="text-center">
              <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-${result.color}-100 flex items-center justify-center`}>
                <result.icon className={`h-10 w-10 text-${result.color}-600`} />
              </div>
              <CardTitle className="text-2xl mb-2">{result.title}</CardTitle>
              <CardDescription className="text-base">{result.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Score indicator */}
              <div className="bg-white rounded-lg p-4 border">
                <div className="flex justify-between mb-2 text-sm">
                  <span>Verhaalkans score</span>
                  <span className="font-bold">{percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full ${
                      percentage >= 80 ? 'bg-green-500' : 
                      percentage >= 60 ? 'bg-blue-500' : 
                      percentage >= 40 ? 'bg-amber-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>

              {/* Advice */}
              <div className="bg-white rounded-lg p-4 border">
                <h4 className="font-semibold mb-2">Ons advies:</h4>
                <p className="text-sm text-muted-foreground">{result.advice}</p>
              </div>

              {/* Summary */}
              <div className="bg-white rounded-lg p-4 border">
                <h4 className="font-semibold mb-3">Uw antwoorden:</h4>
                <div className="space-y-2 text-sm">
                  {questions.map((q, i) => (
                    <div key={i} className="flex items-start gap-2">
                      {answers[i]?.points >= 2 ? (
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      ) : answers[i]?.points >= 1 ? (
                        <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                      )}
                      <span className="text-muted-foreground">
                        {q.question.replace("?", "")}: {" "}
                        <span className="text-foreground">
                          {q.options.find(o => o.value === answers[i]?.value)?.label}
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-3">
                <Link href="/claim-indienen" className="block">
                  <Button size="lg" className="w-full text-lg">
                    <Upload className="mr-2 h-5 w-5" />
                    Direct Claim Indienen
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button variant="outline" onClick={reset} className="w-full">
                  Opnieuw scannen
                </Button>
              </div>

              {/* Trust badges */}
              <div className="text-center text-sm text-muted-foreground pt-4 border-t">
                <p>100% gratis • Geen verplichtingen • Binnen 24 uur reactie</p>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  const question = questions[currentQuestion]
  const progress = ((currentQuestion) / questions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
          <ArrowLeft className="h-4 w-4" />
          Terug naar Home
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            SchadeScan
          </h1>
          <p className="text-lg text-muted-foreground">
            Check in 1 minuut of u uw schade kunt verhalen
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2 text-sm text-muted-foreground">
            <span>Vraag {currentQuestion + 1} van {questions.length}</span>
            <span>{Math.round(progress)}% voltooid</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-xl">{question.question}</CardTitle>
            <CardDescription>{question.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {question.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value, option.points)}
                className={`w-full p-4 text-left border-2 rounded-lg hover:border-primary hover:bg-primary/5 transition-all ${
                  answers[currentQuestion]?.value === option.value 
                    ? 'border-primary bg-primary/5' 
                    : 'border-gray-200'
                }`}
              >
                <span className="font-medium">{option.label}</span>
              </button>
            ))}

            {currentQuestion > 0 && (
              <Button variant="ghost" onClick={goBack} className="mt-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Vorige vraag
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Info box */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-3">
            <HelpCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-blue-900 mb-1">Waarom deze vragen?</p>
              <p className="text-blue-800">
                Op basis van uw antwoorden kunnen wij inschatten hoe groot de kans is dat u uw schade 
                succesvol kunt verhalen bij de tegenpartij.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
