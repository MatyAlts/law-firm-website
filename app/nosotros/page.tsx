import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function NosotrosPage() {
  return (
    <main className="py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-foreground mb-8 text-center">Sobre Nosotros</h1>

          <div className="prose prose-lg max-w-none">
            <div className="bg-card p-8 rounded-lg mb-8">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-4">Nuestra Historia</h2>
              <p className="text-card-foreground leading-relaxed mb-4">
                Belmonte, Lucero Salafia es un estudio jurídico fundado en Mendoza, Argentina, con el objetivo de
                brindar servicios legales de excelencia en las áreas de derecho de familia, civil y laboral.
              </p>
              <p className="text-card-foreground leading-relaxed">
                Nuestro equipo está conformado por profesionales con amplia trayectoria y especialización en cada una de
                nuestras áreas de práctica, comprometidos con la defensa de los derechos de nuestros clientes.
              </p>
            </div>

            <div className="bg-card p-8 rounded-lg mb-8">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-4">Nuestros Valores</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold text-xl">•</span>
                  <div>
                    <strong className="text-foreground">Compromiso:</strong>
                    <span className="text-card-foreground"> Dedicación absoluta a cada caso y cliente.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold text-xl">•</span>
                  <div>
                    <strong className="text-foreground">Ética:</strong>
                    <span className="text-card-foreground">
                      {" "}
                      Actuamos con integridad y transparencia en todo momento.
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold text-xl">•</span>
                  <div>
                    <strong className="text-foreground">Resultados:</strong>
                    <span className="text-card-foreground">
                      {" "}
                      Orientados a lograr los mejores resultados para nuestros clientes.
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold text-xl">•</span>
                  <div>
                    <strong className="text-foreground">Profesionalismo:</strong>
                    <span className="text-card-foreground"> Actualización constante y excelencia en el servicio.</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-card p-8 rounded-lg">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-4">¿Por qué elegirnos?</h2>
              <p className="text-card-foreground leading-relaxed mb-4">
                En Belmonte, Lucero Salafia entendemos que cada caso es único y requiere un enfoque personalizado.
                Nos tomamos el tiempo necesario para comprender su situación y diseñar la mejor estrategia legal.
              </p>
              <p className="text-card-foreground leading-relaxed">
                Nuestro compromiso es acompañarlo en cada etapa del proceso legal, brindándole asesoramiento claro,
                honesto y orientado a la solución de su conflicto.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/contacto">Solicitar consulta</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
