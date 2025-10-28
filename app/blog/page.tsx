import Link from "next/link"
import { Calendar } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { fetchApi } from "@/lib/api/fetch"
import type { BlogPost } from "@/lib/api/types"

export const revalidate = 0

export default async function BlogPage() {
  let blogPosts: BlogPost[] = []
  let error: string | null = null

  try {
    blogPosts = await fetchApi<BlogPost[]>("/blogs", { skipAuth: true })
  } catch (err) {
    error = err instanceof Error ? err.message : "Error al cargar los artículos"
  }

  return (
    <main className="py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h1 className="mb-6 text-4xl font-serif font-bold text-foreground sm:text-5xl">Blog Jurídico</h1>
          <p className="text-lg leading-relaxed text-card-foreground">
            Artículos, análisis de jurisprudencia y novedades del derecho argentino
          </p>
        </div>

        {error && (
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="text-destructive">{error}</p>
          </div>
        )}

        {!error && blogPosts.length === 0 && (
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-muted-foreground">No hay artículos publicados aún</p>
          </div>
        )}

        {!error && blogPosts.length > 0 && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="flex flex-col border-border bg-card transition-shadow hover:shadow-lg">
                <CardHeader>
                  <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <time>
                      {new Date(post.createdAt).toLocaleDateString("es-AR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                  <CardTitle className="text-xl font-serif leading-tight text-foreground">{post.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col">
                  <CardDescription className="mb-4 flex-1 leading-relaxed text-card-foreground">
                    {post.summary}
                  </CardDescription>
                  <Button asChild variant="link" className="h-auto justify-start p-0 text-foreground hover:text-primary">
                    <Link href={`/blog/${post.slug}`}>Leer más →</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
