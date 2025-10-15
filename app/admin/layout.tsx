import type React from "react"
import { createClient } from "@/lib/supabase/server"
import { Scale, FileText, LogOut, Home } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

async function AdminNav({ userEmail }: { userEmail: string }) {
  return (
    <nav className="border-b bg-card">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/admin" className="flex items-center gap-2 font-serif text-xl font-bold text-primary">
              <Scale className="h-6 w-6" />
              <span>Admin Panel</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/admin">
                <Button variant="ghost" size="sm" className="gap-2">
                  <FileText className="h-4 w-4" />
                  Blogs
                </Button>
              </Link>
              <Link href="/">
                <Button variant="ghost" size="sm" className="gap-2">
                  <Home className="h-4 w-4" />
                  Ver Sitio
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{userEmail}</span>
            <form action="/admin/logout" method="post">
              <Button variant="ghost" size="sm" className="gap-2" type="submit">
                <LogOut className="h-4 w-4" />
                Cerrar Sesión
              </Button>
            </form>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminNav userEmail={user.email || ""} />
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  )
}
