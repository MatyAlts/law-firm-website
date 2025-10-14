import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Scale, Users, Car, Heart, FileText } from "lucide-react"

export default function HomePage() {
  const practiceAreas = [
    {
      title: "Derecho de Familia",
      description: "Asesoramiento integral en cuestiones familiares, custodia, régimen de visitas y alimentos.",
      icon: Heart,
    },
    {
      title: "Sucesiones",
      description: "Tramitación de sucesiones, testamentos y planificación patrimonial.",
      icon: FileText,
    },
    {
      title: "Accidentes de Tránsito",
      description: "Defensa de víctimas de accidentes de tránsito y reclamos por daños.",
      icon: Car,
    },
    {
      title: "Divorcios",
      description: "Divorcios contenciosos y de común acuerdo, liquidación de sociedad conyugal.",
      icon: Users,
    },
    {
      title: "Daños y Perjuicios",
      description: "Reclamos por daños materiales, morales y lucro cesante.",
      icon: Scale,
    },
  ]

  return (
    <main>
      {/* Hero Section */}
      <section
        className="relative min-h-[70vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/images/courthouse-hero.jpg')" }}
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/50" />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 text-balance drop-shadow-lg">
            Belmonte – Lucero – Salafia
          </h1>
          <p className="text-xl sm:text-2xl text-white/95 mb-4 font-serif italic drop-shadow-md">Estudio Jurídico</p>
          <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto text-pretty drop-shadow-md">
            Compromiso, ética y resultados.
          </p>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl">
            <Link href="/contacto">Solicitar consulta</Link>
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 sm:py-20 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-6">Nuestro Estudio</h2>
            <p className="text-lg text-card-foreground leading-relaxed mb-6">
              Somos un estudio jurídico con sede en Mendoza, Argentina, especializado en{" "}
              <span className="font-semibold text-foreground">derecho de familia</span>,{" "}
              <span className="font-semibold text-foreground">derecho civil</span> y{" "}
              <span className="font-semibold text-foreground">derecho laboral</span>.
            </p>
            <p className="text-lg text-card-foreground leading-relaxed">
              Nuestro compromiso es brindar asesoramiento legal de excelencia, con un enfoque personalizado y orientado
              a resultados concretos para cada uno de nuestros clientes.
            </p>
          </div>
        </div>
      </section>

      {/* Practice Areas */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-4">Áreas de Práctica</h2>
            <p className="text-lg text-card-foreground max-w-2xl mx-auto">
              Ofrecemos servicios legales especializados en las siguientes áreas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {practiceAreas.map((area, index) => {
              const Icon = area.icon
              return (
                <Card key={index} className="border-border hover:shadow-lg transition-shadow bg-card">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-secondary" />
                    </div>
                    <CardTitle className="text-xl font-serif text-foreground">{area.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-card-foreground leading-relaxed">
                      {area.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="text-center mt-12">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-primary text-foreground hover:bg-primary hover:text-primary-foreground bg-transparent"
            >
              <Link href="/areas">Ver todas las áreas</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-6">¿Necesita asesoramiento legal?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-95">
            Contáctenos para una consulta personalizada. Estamos aquí para ayudarle.
          </p>
          <Button asChild size="lg" variant="secondary" className="bg-card text-foreground hover:bg-card/90">
            <Link href="/contacto">Solicitar consulta</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
