import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { AddAdminForm } from "@/components/add-admin-form"
import { AdminUsersList } from "@/components/admin-users-list"

export default async function AdminUsersPage() {
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  // Get current admin's role
  const { data: currentAdmin } = await supabase.from("admin_profiles").select("role").eq("id", user.id).single()

  // Get all admin users
  const { data: admins } = await supabase.from("admin_profiles").select("*").order("created_at", { ascending: false })

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-primary mb-2">Admin Users</h1>
        <p className="text-muted-foreground">Manage admin accounts and permissions</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="font-serif text-xl font-semibold mb-4">Add New Admin</h2>
          <AddAdminForm currentUserRole={currentAdmin?.role || "editor"} />
        </div>

        <div>
          <h2 className="font-serif text-xl font-semibold mb-4">Existing Admins</h2>
          <AdminUsersList admins={admins || []} currentUserId={user.id} />
        </div>
      </div>
    </div>
  )
}
