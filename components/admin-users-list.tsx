import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface AdminUser {
  id: string
  email: string
  full_name: string
  role: string
  status: string
  created_at: string
  last_login_at: string | null
}

interface AdminUsersListProps {
  admins: AdminUser[]
  currentUserId: string
}

export function AdminUsersList({ admins, currentUserId }: AdminUsersListProps) {
  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "super_admin":
        return "default"
      case "admin":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    return status === "active" ? "default" : "destructive"
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
                    <h3 className="font-semibold">{admin.full_name}</h3>
                    {admin.id === currentUserId && (
                      <Badge variant="outline" className="text-xs">
                        You
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{admin.email}</p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant={getRoleBadgeVariant(admin.role)}>{admin.role.replace("_", " ")}</Badge>
                    <Badge variant={getStatusBadgeVariant(admin.status)}>{admin.status}</Badge>
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
