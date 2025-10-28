import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import ScrollReveal from "@/components/scroll-reveal"

export default function NosotrosPage() {
  return (
    <main className="py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-foreground mb-8 text-center">
              Sobre Nosotros
            </h1>
          </ScrollReveal>

          <div className="space-y-16">
            {/* Nuestra Historia */}
            <ScrollReveal delay={0.1}>
              <div className="bg-card p-6 sm:p-8 rounded-lg">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-4">Nuestra Historia</h2>
                <p className="text-card-foreground leading-relaxed mb-4">
                  Belmonte, Lucero Salafia es un estudio jurídico fundado en Mendoza, Argentina, con el objetivo de
                  brindar servicios legales de excelencia en las áreas de derecho de familia, civil y laboral.
                </p>
                <p className="text-card-foreground leading-relaxed">
                  Nuestro equipo está conformado por profesionales con amplia trayectoria y especialización en cada una
                  de nuestras áreas de práctica, comprometidos con la defensa de los derechos de nuestros clientes.
                </p>
              </div>
            </ScrollReveal>

            {/* Galería de Fotos Principal - Grid de 3 columnas */}
            <ScrollReveal delay={0.2}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <Image
                    src="/images/nosotros_1.jpg"
                    alt="Equipo legal Belmonte Lucero Salafia"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <Image
                    src="/images/nosotros_2.jpg"
                    alt="Profesionales del estudio jurídico"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <Image
                    src="/images/nosotros_3.jpg"
                    alt="Abogadas especializadas"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              </div>
            </ScrollReveal>

            {/* Nuestros Valores */}
            <ScrollReveal delay={0.3}>
              <div className="bg-card p-6 sm:p-8 rounded-lg">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-6">Nuestros Valores</h2>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold text-xl mt-1">•</span>
                    <div>
                      <strong className="text-foreground">Compromiso:</strong>
                      <span className="text-card-foreground"> Dedicación absoluta a cada caso y cliente.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold text-xl mt-1">•</span>
                    <div>
                      <strong className="text-foreground">Ética:</strong>
                      <span className="text-card-foreground">
                        {" "}
                        Actuamos con integridad y transparencia en todo momento.
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold text-xl mt-1">•</span>
                    <div>
                      <strong className="text-foreground">Resultados:</strong>
                      <span className="text-card-foreground">
                        {" "}
                        Orientados a lograr los mejores resultados para nuestros clientes.
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold text-xl mt-1">•</span>
                    <div>
                      <strong className="text-foreground">Profesionalismo:</strong>
                      <span className="text-card-foreground"> Actualización constante y excelencia en el servicio.</span>
                    </div>
                  </li>
                </ul>
              </div>
            </ScrollReveal>

            {/* Segunda Galería - Grid de 2x2 */}
            <ScrollReveal delay={0.4}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <Image
                    src="/images/nosotros_4.jpg"
                    alt="Oficinas del estudio"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <Image
                    src="/images/nosotros_5.jpg"
                    alt="Equipo de trabajo"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
              </div>
            </ScrollReveal>

            {/* Por qué elegirnos */}
            <ScrollReveal delay={0.5}>
              <div className="bg-card p-6 sm:p-8 rounded-lg">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-4">¿Por qué elegirnos?</h2>
                <p className="text-card-foreground leading-relaxed mb-4">
                  En Belmonte, Lucero Salafia entendemos que cada caso es único y requiere un enfoque personalizado. Nos
                  tomamos el tiempo necesario para comprender su situación y diseñar la mejor estrategia legal.
                </p>
                <p className="text-card-foreground leading-relaxed">
                  Nuestro compromiso es acompañarlo en cada etapa del proceso legal, brindándole asesoramiento claro,
                  honesto y orientado a la solución de su conflicto.
                </p>
              </div>
            </ScrollReveal>

            {/* Última Galería - 2 imágenes horizontales */}
            <ScrollReveal delay={0.6}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <Image
                    src="/images/nosotros_6.jpg"
                    alt="Profesionales en consulta"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <Image
                    src="/images/nosotros_7.jpg"
                    alt="Estudio jurídico en Mendoza"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
            </ScrollReveal>

            {/* CTA Final */}
            <ScrollReveal delay={0.7}>
              <div className="text-center pt-8">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Link href="/contacto">Solicitar consulta</Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </main>
  )
}
