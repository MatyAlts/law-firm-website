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
    <div className="space-y-6 md:space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-primary md:text-3xl">Gestión de Blogs</h1>
          <p className="text-sm text-muted-foreground md:text-base">Administre los artículos del blog</p>
        </div>
        <Link href="/admin/blogs/new">
          <Button className="gap-2 w-full sm:w-auto">
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
              <CardHeader className="p-4 md:p-6">
                <div className="space-y-3">
                  <div className="space-y-2">
                    <CardTitle className="font-serif text-lg md:text-xl">{blog.title}</CardTitle>
                    <CardDescription className="line-clamp-2 text-sm">{blog.summary}</CardDescription>
                    <div className="flex flex-col gap-1 pt-1 text-xs text-muted-foreground sm:flex-row sm:items-center sm:gap-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(blog.createdAt).toLocaleDateString("es-AR")}
                      </span>
                      <span className="truncate">Slug: /{blog.slug}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 pt-2 sm:flex-row">
                    <Link href={`/admin/blogs/${blog.id}/edit`} className="flex-1 sm:flex-none">
                      <Button variant="outline" size="sm" className="w-full gap-2 bg-transparent sm:w-auto">
                        <Edit className="h-4 w-4" />
                        Editar
                      </Button>
                    </Link>
                    <form action={`/admin/blogs/${blog.id}/delete`} method="post" className="flex-1 sm:flex-none">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full gap-2 bg-transparent text-destructive hover:bg-destructive hover:text-destructive-foreground sm:w-auto"
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
