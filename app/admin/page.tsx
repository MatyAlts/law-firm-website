import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Calendar, Edit, Trash2, FileText } from "lucide-react"
import Link from "next/link"

interface Blog {
  id: string
  slug: string
  title: string
  description: string
  created_at: string
  updated_at: string
}

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  const { data: blogs, error } = await supabase.from("blogs").select("*").order("created_at", { ascending: false })

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-primary">Gestión de Blogs</h1>
          <p className="text-muted-foreground">Administre los artículos del blog</p>
        </div>
        <Link href="/admin/blogs/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Nuevo Blog
          </Button>
        </Link>
      </div>

      {error && (
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <p className="text-destructive">Error al cargar los blogs: {error.message}</p>
          </CardContent>
        </Card>
      )}

      {blogs && blogs.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-lg font-medium text-muted-foreground mb-2">No hay blogs publicados</p>
            <p className="text-sm text-muted-foreground mb-4">Comience creando su primer artículo</p>
            <Link href="/admin/blogs/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Crear Primer Blog
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {blogs && blogs.length > 0 && (
        <div className="grid gap-4">
          {blogs.map((blog: Blog) => (
            <Card key={blog.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <CardTitle className="font-serif text-xl">{blog.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{blog.description}</CardDescription>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(blog.created_at).toLocaleDateString("es-AR")}
                      </span>
                      <span>Slug: /{blog.slug}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link href={`/admin/blogs/${blog.id}/edit`}>
                      <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                        <Edit className="h-4 w-4" />
                        Editar
                      </Button>
                    </Link>
                    <form action={`/admin/blogs/${blog.id}/delete`} method="post">
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 text-destructive hover:bg-destructive hover:text-destructive-foreground bg-transparent"
                      >
                        <Trash2 className="h-4 w-4" />
                        Eliminar
                      </Button>
                    </form>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
