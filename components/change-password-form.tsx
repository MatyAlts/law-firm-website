"use client"

import type React from "react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ChangePasswordFormProps {
  userEmail: string
}

export function ChangePasswordForm({ userEmail }: ChangePasswordFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    if (formData.newPassword !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden")
      setIsLoading(false)
      return
    }

    if (formData.newPassword.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres")
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess("Contraseña actualizada exitosamente")
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        })
      } else {
        setError(data.error || "Error al cambiar la contraseña")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader className="p-4 md:p-6">
        <CardTitle className="text-lg md:text-xl">Cambiar Contraseña</CardTitle>
        <CardDescription className="text-sm">Actualiza la contraseña de tu cuenta: {userEmail}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 md:p-6 pt-0 md:pt-0">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword" className="text-sm md:text-base">Contraseña Actual</Label>
            <Input
              id="currentPassword"
              type="password"
              value={formData.currentPassword}
              onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
              required
              className="text-sm md:text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPassword" className="text-sm md:text-base">Nueva Contraseña</Label>
            <Input
              id="newPassword"
              type="password"
              value={formData.newPassword}
              onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
              required
              minLength={8}
              className="text-sm md:text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-sm md:text-base">Confirmar Nueva Contraseña</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
              minLength={8}
              className="text-sm md:text-base"
            />
          </div>

          {error && <div className="rounded-lg bg-destructive/10 p-3 text-xs md:text-sm text-destructive">{error}</div>}

          {success && <div className="rounded-lg bg-green-500/10 p-3 text-xs md:text-sm text-green-600">{success}</div>}

          <Button type="submit" className="w-full text-sm md:text-base" disabled={isLoading}>
            {isLoading ? "Actualizando..." : "Cambiar Contraseña"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
