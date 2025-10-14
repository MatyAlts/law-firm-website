import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, ArrowLeft } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"

export const metadata = {
  title: "Nuevas reformas en el Código Civil: Lo que debe saber | BLS Estudio Jurídico",
  description:
    "Análisis de las últimas modificaciones al Código Civil y Comercial de la Nación y su impacto en las relaciones familiares y patrimoniales.",
}

export default function ReformasCodigoCivil2024() {
  return (
    <main className="py-16 sm:py-20">
      <article className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Back Button */}
        <ScrollReveal>
          <Button asChild variant="ghost" className="mb-8 text-foreground hover:text-primary hover:bg-transparent">
            <Link href="/blog">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al Blog
            </Link>
          </Button>
        </ScrollReveal>

        {/* Article Header */}
        <ScrollReveal delay={0.1}>
          <header className="mb-12">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Calendar className="w-4 h-4" />
              <time>15 de marzo, 2024</time>
            </div>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-foreground mb-6 text-balance">
              Nuevas reformas en el Código Civil: Lo que debe saber
            </h1>
            <p className="text-xl text-card-foreground leading-relaxed">
              Análisis de las últimas modificaciones al Código Civil y Comercial de la Nación y su impacto en las
              relaciones familiares y patrimoniales.
            </p>
          </header>
        </ScrollReveal>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <ScrollReveal delay={0.2}>
            <section className="mb-12">
              <h2 className="text-3xl font-serif font-bold text-foreground mb-4">1. Introducción</h2>
              <p className="text-card-foreground leading-relaxed mb-4">
                Desde su entrada en vigencia el 1 de agosto de 2015, el Código Civil y Comercial de la Nación (CCyC /
                CCCN) constituyó una reforma de gran envergadura al unificar el antiguo Código Civil y el Código
                Comercial.
              </p>
              <p className="text-card-foreground leading-relaxed">
                Sin embargo, la evolución normativa no se detiene: en los últimos años se han introducido modificaciones
                específicas mediante Decretos de Necesidad y Urgencia (DNU) y leyes que ajustan aspectos puntuales de
                ese cuerpo legal.
              </p>
              <p className="text-card-foreground leading-relaxed">
                En este artículo analizaremos algunas de las reformas más destacadas, con especial atención en su
                repercusión sobre las relaciones familiares y patrimoniales.
              </p>
            </section>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <section className="mb-12">
              <h2 className="text-3xl font-serif font-bold text-foreground mb-6">2. Reformas recientes destacadas</h2>
              <p className="text-card-foreground leading-relaxed mb-6">
                Aquí se enumeran y explican los cambios más relevantes hasta la fecha:
              </p>

              <div className="mb-8">
                <h3 className="text-2xl font-serif font-semibold text-foreground mb-4">
                  2.1 DNU 70/2023: fortalecimiento del pacto entre privados en obligaciones de dar dinero
                </h3>
                <p className="text-card-foreground leading-relaxed mb-4">
                  El DNU 70/2023 introdujo modificaciones a varios artículos del CCyC relativos a obligaciones de dar
                  dinero, con el objetivo de realzar la autonomía de la voluntad contractual.
                </p>
                <ul className="list-disc pl-6 space-y-2 text-card-foreground mb-4">
                  <li>
                    El artículo 765 fue reformulado para permitir que las obligaciones monetarias puedan pactarse en
                    moneda que no sea de curso legal, eliminando la facultad del deudor de liberarse entregando "valor
                    equivalente" en moneda legal.
                  </li>
                  <li>
                    El artículo 766 fue complementado para exigir que el deudor entregue exactamente la especie pactada,
                    sin conversión judicial de moneda.
                  </li>
                  <li>
                    Asimismo, los artículos 958, 960 y 989 fueron modificados para limitar la potestad judicial de
                    alterar estipulaciones pactadas entre partes.
                  </li>
                </ul>
                <p className="text-card-foreground leading-relaxed">
                  Estas reformas refuerzan la idea de que los acuerdos entre privados —siempre que no violen el orden
                  público— tienen primacía, y los jueces no deben intervenir para alterar condiciones pactadas.
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-serif font-semibold text-foreground mb-4">
                  2.2 DNU 338/2025: domicilio electrónico contractual
                </h3>
                <p className="text-card-foreground leading-relaxed mb-4">
                  Una reforma más reciente (publicada el 19 de mayo de 2025) mediante el DNU 338/2025 reintrodujo
                  expresamente la posibilidad de constituir un domicilio electrónico contractual en las relaciones
                  jurídicas.
                </p>
                <p className="text-card-foreground leading-relaxed">
                  El artículo 75 del CCyC fue afectado con esta modificación, reconociendo que las partes pueden acordar
                  un domicilio electrónico para efectos contractuales. Esto moderniza la forma de notificación y vincula
                  el Derecho Civil con prácticas digitales contemporáneas.
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-serif font-semibold text-foreground mb-4">
                  2.3 Ley 27737 / modificaciones a la locación y plazos mínimos
                </h3>
                <p className="text-card-foreground leading-relaxed mb-4">
                  La Ley 27737 (publicada en el Boletín Oficial) introdujo una reforma al CCyC en materia de
                  arrendamientos.
                </p>
                <ul className="list-disc pl-6 space-y-2 text-card-foreground mb-4">
                  <li>
                    Se sustituye el artículo 1.198 para establecer que el contrato de locación, si no tiene plazo
                    expreso, se considera celebrado por un plazo mínimo de tres (3) años, salvo excepciones previstas
                    legalmente.
                  </li>
                  <li>
                    Se modifica el art. 1.199 para definir qué tipos de locaciones escapan a ese plazo mínimo (por
                    ejemplo: inmuebles con destino turístico, uso temporario, etc.).
                  </li>
                  <li>También se reforma el artículo 1.201 en sintonía con los nuevos plazos.</li>
                  <li>
                    Además, la ley 27.551 modificó el artículo 1.221 para regular la resolución anticipada del contrato
                    de locación por parte del locatario.
                  </li>
                </ul>
                <p className="text-card-foreground leading-relaxed">
                  Estas reformas actualizan el régimen de locaciones en Argentina, con implicancias para arrendadores y
                  arrendatarios en cuanto a plazos obligatorios y derechos de resolución anticipada.
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-serif font-semibold text-foreground mb-4">
                  2.4 Cambios proyectados en contratos y actos jurídicos
                </h3>
                <p className="text-card-foreground leading-relaxed mb-4">
                  Además de las reformas ya sancionadas, existen proyectos y propuestas que buscan modificar otros
                  aspectos del CCyC, como:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-card-foreground mb-4">
                  <li>
                    Reformar el artículo 1004, eliminando restricciones derivadas de "hechos contrarios a la moral, al
                    orden público y a la dignidad humana" como objeto prohibido de contratos.
                  </li>
                  <li>
                    Modificar el artículo 1011 para suprimir la obligación de renegociar contratos de larga duración
                    antes de su rescisión unilateral.
                  </li>
                  <li>
                    Eliminar ciertas prohibiciones de contratos entre cónyuges bajo el régimen de comunidad que hoy
                    están reguladas por el inciso d) del artículo 1004.
                  </li>
                </ul>
                <p className="text-card-foreground leading-relaxed">
                  Estas propuestas, si prosperan, podrían ampliar aún más la libertad contractual en las relaciones
                  patrimoniales y revertir ciertas restricciones tradicionales.
                </p>
              </div>
            </section>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <section className="mb-12">
              <h2 className="text-3xl font-serif font-bold text-foreground mb-6">
                3. Impacto en relaciones familiares y patrimoniales
              </h2>
              <p className="text-card-foreground leading-relaxed mb-6">
                Las reformas no solo afectan contratos comerciales o civiles abstractos: tienen efectos directos en las
                estructuras familiares, matrimoniales y patrimoniales. A continuación algunos de los impactos más
                relevantes:
              </p>

              <div className="mb-8">
                <h3 className="text-2xl font-serif font-semibold text-foreground mb-4">
                  3.1 Régimen patrimonial del matrimonio
                </h3>
                <p className="text-card-foreground leading-relaxed mb-4">
                  El CCyC ya consolidó un sistema en el que los cónyuges pueden optar por diferentes regímenes
                  patrimoniales (comunidad, separación, etc.).
                </p>
                <p className="text-card-foreground leading-relaxed mb-4">
                  Se ha señalado que la reforma busca otorgar claridad jurídica, especificando qué bienes integran la
                  comunidad, cómo gestionarlos y cómo disolver la comunidad de ganancias al divorcio.
                </p>
                <p className="text-card-foreground leading-relaxed">
                  Los cambios recientes relacionados con la autonomía contractual pueden permitir que los cónyuges
                  acuerden disposiciones patrimoniales más personalizadas (siempre dentro de los límites legales).
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-serif font-semibold text-foreground mb-4">
                  3.2 Divorcio y pensión alimentaria
                </h3>
                <p className="text-card-foreground leading-relaxed mb-4">
                  La reforma del CCyC derogó el sistema de divorcio tradicional por culpa, adoptando el divorcio
                  incausado.
                </p>
                <p className="text-card-foreground leading-relaxed mb-4">
                  Esto implica que el divorcio puede tramitarse sin necesidad de probar culpa o falta de conducta,
                  agilizando procesos.
                </p>
                <p className="text-card-foreground leading-relaxed">
                  En cuanto a la pensión alimentaria, las reformas ponen el foco en la vulnerabilidad y autonomía. En el
                  contexto actual, los cambios contractuales podrían repercutir en la manera en que se calculan
                  obligaciones accesorias derivadas de relaciones familiares.
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-serif font-semibold text-foreground mb-4">
                  3.3 Contratos entre cónyuges, donaciones y enriquecimiento sin causa
                </h3>
                <p className="text-card-foreground leading-relaxed mb-4">
                  Las propuestas de reformar el artículo 1004 (eliminando ciertas restricciones morales) y flexibilizar
                  contratos entre cónyuges pueden modificar la posibilidad de realizar acuerdos patrimoniales directos
                  entre esposos, donaciones entre ellos o pactos especiales.
                </p>
                <p className="text-card-foreground leading-relaxed">
                  También podría haber implicancias en acciones de enriquecimiento sin causa si se reducen los límites
                  derivados del orden público.
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-serif font-semibold text-foreground mb-4">
                  3.4 Notificaciones y eficacia de actos digitales
                </h3>
                <p className="text-card-foreground leading-relaxed">
                  La incorporación del domicilio electrónico contractual (DNU 338/2025) tiene especial relevancia para
                  relaciones patrimoniales modernas (compraventas, contratos de servicios) dentro de contextos
                  digitales. Esto facilita comunicaciones formales dentro de relaciones jurídicas y agiliza la
                  operatividad de contratos con cláusulas virtuales.
                </p>
              </div>
            </section>
          </ScrollReveal>

          <ScrollReveal delay={0.5}>
            <section className="mb-12">
              <h2 className="text-3xl font-serif font-bold text-foreground mb-6">
                4. Conclusiones y recomendaciones prácticas
              </h2>
              <ul className="list-disc pl-6 space-y-4 text-card-foreground">
                <li>
                  Las reformas recientes muestran una clara tendencia hacia la autonomía de la voluntad y la primacía de
                  los acuerdos privados, reduciendo el margen de alteración judicial de pactos entre partes.
                </li>
                <li>
                  Esto obliga a ser más cuidadosos en la redacción de contratos: especificar moneda, plazos,
                  condiciones, domicilio (electrónico o no) con claridad, para evitar interpretaciones judiciales
                  adversas.
                </li>
                <li>
                  En el ámbito familiar, los cambios pueden permitir negociaciones más flexibles de bienes, donaciones o
                  acuerdos patrimoniales entre cónyuges, pero siempre dentro de límites legales de orden público.
                </li>
                <li>
                  El reconocimiento explícito del domicilio electrónico contractual es una modernización necesaria. En
                  contratos actuales conviene incluir cláusula electrónica cuando sea relevante.
                </li>
                <li>
                  Las reformas proyectadas aún no están vigentes, por lo que conviene seguir su evolución legislativa si
                  tu estudio maneja contratos complejos o transacciones patrimoniales de alto monto.
                </li>
              </ul>
            </section>
          </ScrollReveal>
        </div>

        {/* Call to Action */}
        <ScrollReveal delay={0.6}>
          <div className="mt-16 p-8 bg-card border border-border rounded-lg">
            <h3 className="text-2xl font-serif font-bold text-foreground mb-4">¿Necesita asesoramiento legal?</h3>
            <p className="text-card-foreground leading-relaxed mb-6">
              Nuestro equipo de abogados especializados está disponible para ayudarle con cualquier consulta sobre las
              reformas del Código Civil y su aplicación a su caso particular.
            </p>
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/contacto">Solicitar consulta</Link>
            </Button>
          </div>
        </ScrollReveal>
      </article>
    </main>
  )
}
