import Link from "next/link"
import { redirect } from "next/navigation"
import { Plus, Calendar, Edit, Trash2, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { fetchApi } from "@/lib/api/fetch"
import type { BlogPost } from "@/lib/api/types"

export default async function AdminDashboardPage() {
  let blogs: BlogPost[] = []
  let error: string | null = null

  try {
    blogs = await fetchApi<BlogPost[]>("/blogs")
  } catch (err) {
    if (err instanceof Error && err.message.includes("401")) {
      redirect("/admin/login")
    }
    error = err instanceof Error ? err.message : "Error desconocido"
  }

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
            <p className="text-destructive">Error al cargar los blogs: {error}</p>
          </CardContent>
        </Card>
      )}

      {!error && blogs.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="mb-4 h-12 w-12 text-muted-foreground" />
            <p className="mb-2 text-lg font-medium text-muted-foreground">No hay blogs publicados</p>
            <p className="mb-4 text-sm text-muted-foreground">Comience creando su primer artículo</p>
            <Link href="/admin/blogs/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Crear Primer Blog
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {!error && blogs.length > 0 && (
        <div className="grid gap-4">
          {blogs.map((blog) => (
            <Card key={blog.id} className="transition-shadow hover:shadow-md">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-1">
                    <CardTitle className="font-serif text-xl">{blog.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{blog.summary}</CardDescription>
                    <div className="flex items-center gap-4 pt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(blog.createdAt).toLocaleDateString("es-AR")}
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
                        className="gap-2 bg-transparent text-destructive hover:bg-destructive hover:text-destructive-foreground"
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
