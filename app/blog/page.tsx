import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"
import { createClient } from "@/lib/supabase/server"

export const revalidate = 0 // Always fetch fresh data

export default async function BlogPage() {
  const supabase = await createClient()

  const { data: blogPosts, error } = await supabase.from("blogs").select("*").order("created_at", { ascending: false })

  return (
    <main className="py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-foreground mb-6">Blog Jurídico</h1>
          <p className="text-lg text-card-foreground leading-relaxed">
            Artículos, análisis de jurisprudencia y novedades del derecho argentino
          </p>
        </div>

        {error && (
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-destructive">Error al cargar los artículos del blog</p>
          </div>
        )}

        {blogPosts && blogPosts.length === 0 && (
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-muted-foreground">No hay artículos publicados aún</p>
          </div>
        )}

        {blogPosts && blogPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="border-border hover:shadow-lg transition-shadow bg-card flex flex-col">
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Calendar className="w-4 h-4" />
                    <time>
                      {new Date(post.created_at).toLocaleDateString("es-AR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                  <CardTitle className="text-xl font-serif text-foreground leading-tight">{post.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <CardDescription className="text-card-foreground leading-relaxed mb-4 flex-1">
                    {post.description}
                  </CardDescription>
                  <Button
                    asChild
                    variant="link"
                    className="text-foreground hover:text-primary p-0 h-auto justify-start"
                  >
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
