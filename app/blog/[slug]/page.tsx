import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar } from "lucide-react"

import ScrollReveal from "@/components/scroll-reveal"
import { Button } from "@/components/ui/button"
import { fetchApi } from "@/lib/api/fetch"
import type { BlogPost } from "@/lib/api/types"

export const revalidate = 0

interface Section {
  title: string
  content: string
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  let post: BlogPost | null = null

  try {
    post = await fetchApi<BlogPost>(`/blogs/slug/${params.slug}`, { skipAuth: true })
  } catch (error) {
    notFound()
  }

  if (!post) {
    notFound()
  }

  const sections = parseContent(post.content)

  return (
    <main className="py-16 sm:py-20">
      <article className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <Link href="/blog">
            <Button variant="ghost" className="mb-8 gap-2 hover:bg-transparent">
              <ArrowLeft className="h-4 w-4" />
              Volver al Blog
            </Button>
          </Link>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <header className="mb-12">
            <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <time>
                {new Date(post.createdAt).toLocaleDateString("es-AR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
            <h1 className="mb-6 text-balance text-4xl font-serif font-bold text-foreground sm:text-5xl">{post.title}</h1>
            <p className="text-pretty text-xl leading-relaxed text-card-foreground">{post.summary}</p>
          </header>
        </ScrollReveal>

        <div className="prose prose-lg max-w-none">
          {sections.map((section, index) => (
            <ScrollReveal key={index} delay={0.1 * (index + 2)}>
              <section className="mb-8">
                {section.title && (
                  <h2 className="mb-4 text-2xl font-serif font-bold text-foreground">{section.title}</h2>
                )}
                <div className="whitespace-pre-wrap leading-relaxed text-card-foreground">{section.content}</div>
              </section>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="mt-16 rounded-lg bg-muted p-8 text-center">
            <h3 className="mb-4 text-2xl font-serif font-bold text-foreground">¿Necesita asesoramiento legal?</h3>
            <p className="mb-6 text-card-foreground">
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

function parseContent(content: string): Section[] {
  if (!content) {
    return []
  }

  const lines = content.split(/\r?\n/)
  const sections: Section[] = []
  let currentTitle = ""
  let currentContent: string[] = []

  const flush = () => {
    if (currentTitle || currentContent.length > 0) {
      sections.push({
        title: currentTitle.replace(/^##\s*/, ""),
        content: currentContent.join("\n").trim(),
      })
    }
    currentTitle = ""
    currentContent = []
  }

  lines.forEach((line) => {
    if (line.startsWith("## ")) {
      flush()
      currentTitle = line
    } else {
      currentContent.push(line)
    }
  })

  flush()

  if (sections.length === 0) {
    return [{ title: "", content }]
  }

  return sections
}
