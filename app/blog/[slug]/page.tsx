import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Calendar, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import ScrollReveal from "@/components/scroll-reveal"

export const revalidate = 0 // Always fetch fresh data

interface Section {
  title: string
  content: string
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const supabase = await createClient()

  const { data: post, error } = await supabase.from("blogs").select("*").eq("slug", params.slug).single()

  if (error || !post) {
    notFound()
  }

  const sections = post.sections as Section[]

  return (
    <main className="py-16 sm:py-20">
      <article className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Back Button */}
        <ScrollReveal>
          <Link href="/blog">
            <Button variant="ghost" className="mb-8 gap-2 hover:bg-transparent">
              <ArrowLeft className="w-4 h-4" />
              Volver al Blog
            </Button>
          </Link>
        </ScrollReveal>

        {/* Article Header */}
        <ScrollReveal delay={0.1}>
          <header className="mb-12">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Calendar className="w-4 h-4" />
              <time>
                {new Date(post.created_at).toLocaleDateString("es-AR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-foreground mb-6 text-balance">
              {post.title}
            </h1>
            <p className="text-xl text-card-foreground leading-relaxed text-pretty">{post.description}</p>
          </header>
        </ScrollReveal>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          {sections.map((section, index) => (
            <ScrollReveal key={index} delay={0.1 * (index + 2)}>
              <section className="mb-8">
                {section.title && (
                  <h2 className="text-2xl font-serif font-bold text-foreground mb-4">{section.title}</h2>
                )}
                <div className="text-card-foreground leading-relaxed whitespace-pre-wrap">{section.content}</div>
              </section>
            </ScrollReveal>
          ))}
        </div>

        {/* Call to Action */}
        <ScrollReveal delay={0.3}>
          <div className="mt-16 p-8 bg-muted rounded-lg text-center">
            <h3 className="text-2xl font-serif font-bold text-foreground mb-4">¿Necesita asesoramiento legal?</h3>
            <p className="text-card-foreground mb-6">
              Nuestro equipo está disponible para ayudarle con su consulta jurídica
            </p>
            <Button asChild size="lg">
              <Link href="/contacto">Solicitar Consulta</Link>
            </Button>
          </div>
        </ScrollReveal>
      </article>
    </main>
  )
}
