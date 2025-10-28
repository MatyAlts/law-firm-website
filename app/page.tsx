import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Scale, Users, Car, Heart, FileText } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { ParallaxHero } from "@/components/parallax-hero"

export default function HomePage() {
  const practiceAreas = [
    {
      title: "Derecho de Familia",
      description: "Asesoramiento integral en cuestiones familiares, cuidado personal, régimen de comunicación y alimentos.",
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
      description: "Reclamos por daños materiales, daño moral y lucro cesante.",
      icon: Scale,
    },
  ]

  return (
    <main>
      {/* Hero Section */}
      <ParallaxHero imageUrl="/images/courthouse-hero.jpg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 text-balance drop-shadow-lg animate-fade-in">
            Belmonte, Lucero Salafia
          </h1>
          <p
            className="text-xl sm:text-2xl text-white/95 mb-4 font-serif italic drop-shadow-md animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            Estudio Jurídico
          </p>
          <p
            className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto text-pretty drop-shadow-md animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            Compromiso, ética y resultados.
          </p>
          <div className="animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl">
              <Link href="/contacto">Solicitar consulta</Link>
            </Button>
          </div>
        </div>
      </ParallaxHero>

      {/* About Section */}
      <section className="py-16 sm:py-20 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-6">Nuestro Estudio</h2>
              <p className="text-lg text-card-foreground leading-relaxed mb-6">
                Somos un estudio jurídico con sede en Mendoza, Argentina, especializado en{" "}
                <span className="font-semibold text-foreground">derecho de familia</span>,{" "}
                <span className="font-semibold text-foreground">derecho civil</span> y{" "}
                <span className="font-semibold text-foreground">derecho laboral</span>.
              </p>
              <p className="text-lg text-card-foreground leading-relaxed">
                Nuestro compromiso es brindar asesoramiento legal de excelencia, con un enfoque personalizado y
                orientado a resultados concretos para cada uno de nuestros clientes.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Practice Areas */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-4">Áreas de Práctica</h2>
              <p className="text-lg text-card-foreground max-w-2xl mx-auto">
                Ofrecemos servicios legales especializados en las siguientes áreas
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {practiceAreas.map((area, index) => {
              const Icon = area.icon
              return (
                <ScrollReveal key={index} delay={index * 100}>
                  <Card className="border-border hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] bg-card h-full group cursor-pointer">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4 transition-all duration-500 group-hover:bg-accent group-hover:scale-110 group-hover:rotate-12">
                        <Icon className="w-6 h-6 text-secondary transition-colors duration-500 group-hover:text-accent-foreground" />
                      </div>
                      <CardTitle className="text-xl font-serif text-foreground transition-colors duration-300 group-hover:text-accent">
                        {area.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-card-foreground leading-relaxed transition-all duration-300 group-hover:text-foreground">
                        {area.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              )
            })}
          </div>

          <ScrollReveal delay={500}>
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
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-6">¿Necesita asesoramiento legal?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto opacity-95">
              Contáctenos para una consulta personalizada. Estamos aquí para ayudarle.
            </p>
            <Button asChild size="lg" variant="secondary" className="bg-card text-foreground hover:bg-card/90">
              <Link href="/contacto">Solicitar consulta</Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </main>
  )
}
