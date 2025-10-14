import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: "Nuevas reformas en el Código Civil: Lo que debe saber",
      date: "15 de marzo, 2024",
      description:
        "Análisis de las últimas modificaciones al Código Civil y Comercial de la Nación y su impacto en las relaciones familiares y patrimoniales.",
      slug: "reformas-codigo-civil-2024",
    },
    {
      id: 2,
      title: "Guía completa sobre el proceso de divorcio en Argentina",
      date: "8 de marzo, 2024",
      description:
        "Todo lo que necesita saber sobre los trámites, plazos y requisitos para iniciar un proceso de divorcio en nuestro país.",
      slug: "guia-proceso-divorcio-argentina",
    },
    {
      id: 3,
      title: "Derechos de las víctimas en accidentes de tránsito",
      date: "1 de marzo, 2024",
      description:
        "Conozca sus derechos como víctima de un accidente de tránsito y los pasos a seguir para reclamar una indemnización justa.",
      slug: "derechos-victimas-accidentes-transito",
    },
    {
      id: 4,
      title: "Sucesiones: Cómo planificar la transmisión de su patrimonio",
      date: "22 de febrero, 2024",
      description:
        "Aspectos clave de la planificación sucesoria, testamentos y estrategias para proteger el patrimonio familiar.",
      slug: "planificacion-sucesoria-patrimonio",
    },
    {
      id: 5,
      title: "Jurisprudencia destacada: Compensación económica en divorcios",
      date: "15 de febrero, 2024",
      description:
        "Análisis de fallos recientes sobre compensación económica y su aplicación en casos de divorcio con desequilibrio patrimonial.",
      slug: "jurisprudencia-compensacion-economica",
    },
    {
      id: 6,
      title: "Régimen de visitas: Derechos de los abuelos",
      date: "8 de febrero, 2024",
      description: "Marco legal y jurisprudencia sobre el derecho de los abuelos a mantener contacto con sus nietos.",
      slug: "regimen-visitas-abuelos",
    },
  ]

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

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="border-border hover:shadow-lg transition-shadow bg-card flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Calendar className="w-4 h-4" />
                  <time>{post.date}</time>
                </div>
                <CardTitle className="text-xl font-serif text-foreground leading-tight">{post.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <CardDescription className="text-card-foreground leading-relaxed mb-4 flex-1">
                  {post.description}
                </CardDescription>
                <Button asChild variant="link" className="text-foreground hover:text-primary p-0 h-auto justify-start">
                  <Link href={`/blog/${post.slug}`}>Leer más →</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}
