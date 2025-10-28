import { redirect } from "next/navigation"

import { AddAdminForm } from "@/components/add-admin-form"
import { AdminUsersList } from "@/components/admin-users-list"
import { ChangePasswordForm } from "@/components/change-password-form"
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
    <div className="space-y-6 md:space-y-8">
      <div>
        <h1 className="mb-2 font-serif text-2xl md:text-3xl font-bold text-primary">Administradores</h1>
        <p className="text-sm md:text-base text-muted-foreground">Gestione las cuentas del panel</p>
      </div>

      <div className="space-y-6 md:space-y-8">
        <div>
          <h2 className="mb-4 font-serif text-lg md:text-xl font-semibold">Cambiar Contraseña</h2>
          <ChangePasswordForm userEmail={currentUser.email} />
        </div>

        <div className="grid gap-6 md:gap-8 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 font-serif text-lg md:text-xl font-semibold">Agregar Nuevo Admin</h2>
            <AddAdminForm currentUserRole={currentUser.role} />
          </div>

          <div>
            <h2 className="mb-4 font-serif text-lg md:text-xl font-semibold">Admins Existentes</h2>
            <AdminUsersList admins={admins} currentUserEmail={currentUser.email} />
          </div>
        </div>
      </div>
    </div>
  )
}
