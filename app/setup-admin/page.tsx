"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Scale } from "lucide-react"
import { useState } from "react"

export default function SetupAdminPage() {
  const [result, setResult] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSetup = async () => {
    setIsLoading(true)
    setResult(null)

    try {
      const response = await fetch("/api/setup-admin", {
        method: "POST",
      })

      const data = await response.json()

      if (response.ok) {
        setResult(`✅ ${data.message}\nEmail: ${data.user.email}\nContraseña: changeme\nAcceda desde /admin/login`)
      } else {
        setResult(`❌ Error: ${data.error}`)
      }
    } catch (error) {
      setResult(`❌ Error: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 bg-background">
      <div className="w-full max-w-md">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2 text-center">
            <Scale className="h-12 w-12 text-primary" />
            <h1 className="font-serif text-2xl font-bold text-primary">Setup Admin User</h1>
            <p className="text-sm text-muted-foreground">One-time setup for admin account</p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Create Admin Account</CardTitle>
              <CardDescription>
                El backend Java crea por defecto la cuenta admin@lawfirm.com con contraseña "changeme".
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={handleSetup} className="w-full" disabled={isLoading}>
                {isLoading ? "Verificando..." : "Confirmar Usuario"}
              </Button>
              {result && (
                <div className="rounded-lg bg-muted p-4">
                  <pre className="whitespace-pre-wrap text-sm">{result}</pre>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
