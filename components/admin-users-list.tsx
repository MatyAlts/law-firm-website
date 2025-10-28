import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface AdminUser {
  id: string
  email: string
  role: string
  createdAt: string
}

interface AdminUsersListProps {
  admins: AdminUser[]
  currentUserEmail: string
}

export function AdminUsersList({ admins, currentUserEmail }: AdminUsersListProps) {
  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "superadmin":
        return "default"
      case "admin":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-3 md:space-y-4">
      {admins.length === 0 ? (
        <Card>
          <CardContent className="p-4 md:p-6 pt-4 md:pt-6">
            <p className="text-center text-sm md:text-base text-muted-foreground">No admin users found</p>
          </CardContent>
        </Card>
      ) : (
        admins.map((admin) => (
          <Card key={admin.id}>
            <CardContent className="p-4 md:p-6 pt-4 md:pt-6">
              <div className="space-y-3">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-sm md:text-base break-all">{admin.email}</h3>
                    {admin.email === currentUserEmail && (
                      <Badge variant="outline" className="text-xs">
                        Tú
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant={getRoleBadgeVariant(admin.role)} className="text-xs">
                    {admin.role}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Alta: {new Date(admin.createdAt).toLocaleDateString("es-AR")}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}
