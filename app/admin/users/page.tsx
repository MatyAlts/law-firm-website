import { redirect } from "next/navigation"

import { AddAdminForm } from "@/components/add-admin-form"
import { AdminUsersList } from "@/components/admin-users-list"
import { fetchApi } from "@/lib/api/fetch"
import type { AdminUser, LoginResponse } from "@/lib/api/types"

export default async function AdminUsersPage() {
  let currentUser: LoginResponse | null = null
  let admins: AdminUser[] = []

  try {
    currentUser = await fetchApi<LoginResponse>("/auth/me")
    admins = await fetchApi<AdminUser[]>("/admins")
  } catch (error) {
    redirect("/admin/login")
  }

  if (!currentUser) {
    redirect("/admin/login")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 font-serif text-3xl font-bold text-primary">Administradores</h1>
        <p className="text-muted-foreground">Gestione las cuentas del panel</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="mb-4 font-serif text-xl font-semibold">Agregar Nuevo Admin</h2>
          <AddAdminForm currentUserRole={currentUser.role} />
        </div>

        <div>
          <h2 className="mb-4 font-serif text-xl font-semibold">Admins Existentes</h2>
          <AdminUsersList admins={admins} currentUserEmail={currentUser.email} />
        </div>
      </div>
    </div>
  )
}
