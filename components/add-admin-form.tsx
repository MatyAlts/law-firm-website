"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface AddAdminFormProps {
  currentUserRole: string
}

export function AddAdminForm({ currentUserRole }: AddAdminFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "editor",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await fetch("/api/admin/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess(`Admin user ${data.user.email} created successfully!`)
        setFormData({
          email: "",
          password: "",
          role: "editor",
        })
        router.refresh()
      } else {
        setError(data.error || "Failed to create admin user")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardContent className="p-4 md:p-6 pt-4 md:pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm md:text-base">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="text-sm md:text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm md:text-base">Password</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              minLength={8}
              className="text-sm md:text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role" className="text-sm md:text-base">Role</Label>
            <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
              <SelectTrigger className="text-sm md:text-base">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="editor">Editor</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                {currentUserRole === "superadmin" && <SelectItem value="superadmin">Super Admin</SelectItem>}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Editor: Can manage content | Admin: Can manage content and users | Super Admin: Full access
            </p>
          </div>

          {error && <div className="rounded-lg bg-destructive/10 p-3 text-xs md:text-sm text-destructive">{error}</div>}

          {success && <div className="rounded-lg bg-green-500/10 p-3 text-xs md:text-sm text-green-600">{success}</div>}

          <Button type="submit" className="w-full text-sm md:text-base" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Admin User"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
