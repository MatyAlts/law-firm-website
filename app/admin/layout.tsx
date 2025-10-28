import type React from "react"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { fetchApi } from "@/lib/api/fetch"
import type { LoginResponse } from "@/lib/api/types"
import { AdminNavClient } from "@/components/admin-nav"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers()
  const pathname = headersList.get("x-pathname") || ""

  if (pathname.includes("/admin/login")) {
    return <>{children}</>
  }

  try {
    const user = await fetchApi<LoginResponse>("/auth/me")
    return (
      <div className="min-h-screen bg-background">
        <AdminNavClient userEmail={user.email} />
        <main className="container mx-auto px-4 py-6 md:py-8">{children}</main>
      </div>
    )
  } catch (error) {
    redirect("/admin/login")
  }
}
