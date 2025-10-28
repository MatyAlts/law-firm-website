import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Scale, Users, Car, Heart, FileText, Briefcase, Home, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ScrollReveal } from "@/components/scroll-reveal"

export default function AreasPage() {
  const practiceAreas = [
    {
      title: "Derecho de Familia",
      description:
        "Asesoramiento integral en todas las cuestiones relacionadas con el derecho de familia: régimen de visitas, alimentos, violencia familiar, y protección de derechos de niños, niñas y adolescentes.",
      icon: Heart,
      services: ["Custodia y régimen de visitas", "Cuota alimentaria", "Violencia familiar", "Filiación y adopción"],
    },
    {
      title: "Divorcios",
      description:
        "Tramitación de divorcios contenciosos y de común acuerdo. Liquidación de sociedad conyugal, compensación económica, y división de bienes. Asesoramiento en todas las etapas del proceso.",
      icon: Users,
      services: [
        "Divorcio de común acuerdo",
        "Divorcio contencioso",
        "Liquidación de bienes",
        "Compensación económica",
      ],
    },
    {
      title: "Sucesiones",
      description:
        "Tramitación completa de sucesiones, testamentos, declaratoria de herederos, y planificación patrimonial. Asesoramiento en la distribución de bienes y resolución de conflictos hereditarios.",
      icon: FileText,
      services: ["Declaratoria de herederos", "Testamentos", "Planificación sucesoria", "División de herencia"],
    },
    {
      title: "Accidentes de Tránsito",
      description:
        "Defensa integral de víctimas de accidentes de tránsito. Reclamos contra aseguradoras, indemnizaciones por lesiones, daño moral, y lucro cesante. Representación en juicios civiles y penales.",
      icon: Car,
      services: ["Reclamos a aseguradoras", "Indemnización por lesiones", "Daño moral", "Incapacidad laboral"],
    },
    {
      title: "Daños y Perjuicios",
      description:
        "Reclamos por daños materiales, daño moral, y lucro cesante derivados de accidentes, mala praxis, responsabilidad civil, y otros hechos ilícitos. Evaluación de daños y negociación de acuerdos.",
      icon: Scale,
      services: ["Mala praxis médica", "Responsabilidad civil", "Daño moral", "Lucro cesante"],
    },
    {
      title: "Derecho Laboral",
      description:
        "Asesoramiento a trabajadores en despidos, accidentes laborales, enfermedades profesionales, y reclamos salariales. Defensa de derechos laborales y negociación de acuerdos.",
      icon: Briefcase,
      services: [
        "Despidos injustificados",
        "Accidentes de trabajo",
        "Enfermedades profesionales",
        "Reclamos salariales",
      ],
    },
    {
      title: "Derecho Civil",
      description:
        "Asesoramiento en contratos, obligaciones, derechos reales, y responsabilidad civil. Redacción y revisión de contratos, mediación de conflictos, y representación judicial.",
      icon: Home,
      services: ["Contratos civiles", "Derechos reales", "Obligaciones", "Mediación de conflictos"],
    },
    {
      title: "Defensa del Consumidor",
      description:
        "Protección de derechos del consumidor frente a empresas y prestadores de servicios. Reclamos por productos defectuosos, servicios deficientes, y prácticas abusivas.",
      icon: Shield,
      services: ["Productos defectuosos", "Servicios deficientes", "Cláusulas abusivas", "Reclamos bancarios"],
    },
  ]

  return (
    <main className="py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-foreground mb-6">Áreas de Práctica</h1>
            <p className="text-lg text-card-foreground leading-relaxed">
              Ofrecemos servicios legales especializados en diversas áreas del derecho, con un enfoque personalizado y
              orientado a resultados.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-12">
          {practiceAreas.map((area, index) => {
            const Icon = area.icon
            return (
              <ScrollReveal key={index} delay={index * 100}>
                <Card className="border-border hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] bg-card h-full group cursor-pointer">
                  <CardHeader>
                    <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mb-4 transition-all duration-500 group-hover:bg-accent group-hover:scale-110 group-hover:rotate-12">
                      <Icon className="w-7 h-7 text-secondary transition-colors duration-500 group-hover:text-accent-foreground" />
                    </div>
                    <CardTitle className="text-2xl font-serif text-foreground mb-2 transition-colors duration-300 group-hover:text-accent">
                      {area.title}
                    </CardTitle>
                    <CardDescription className="text-card-foreground leading-relaxed text-base transition-all duration-300 group-hover:text-foreground">
                      {area.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-semibold text-foreground mb-3">Servicios incluidos:</h4>
                    <ul className="space-y-2">
                      {area.services.map((service, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-card-foreground">
                          <span className="text-primary mt-1">•</span>
                          <span>{service}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </ScrollReveal>
            )
          })}
        </div>

        <ScrollReveal delay={400}>
          <div className="bg-primary text-primary-foreground p-8 sm:p-12 rounded-lg text-center">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-4">¿No encuentra el área que busca?</h2>
            <p className="text-lg mb-6 opacity-95 max-w-2xl mx-auto">
              Contáctenos para consultar sobre otras áreas de práctica. Estamos aquí para ayudarle con cualquier
              cuestión legal.
            </p>
            <Button asChild size="lg" variant="secondary" className="bg-card text-foreground hover:bg-card/90">
              <Link href="/contacto">Contactar ahora</Link>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </main>
  )
}
