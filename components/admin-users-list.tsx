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
    <div className="space-y-4">
      {admins.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">No admin users found</p>
          </CardContent>
        </Card>
      ) : (
        admins.map((admin) => (
          <Card key={admin.id}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{admin.email}</h3>
                    {admin.email === currentUserEmail && (
                      <Badge variant="outline" className="text-xs">
                        Tú
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Badge variant={getRoleBadgeVariant(admin.role)}>{admin.role}</Badge>
                    <Badge variant="outline">Alta: {new Date(admin.createdAt).toLocaleDateString("es-AR")}</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}
