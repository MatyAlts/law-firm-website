import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Scale } from "lucide-react"

export default function AvisoLegalPage() {
  return (
    <main className="py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <Scale className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-foreground mb-4">Aviso Legal</h1>
            <p className="text-muted-foreground">Última actualización: Octubre 2025</p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-serif">1. Identificación</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-card-foreground">
                <p>
                  En cumplimiento de la Ley 25.326 de Protección de Datos Personales de la República Argentina y demás
                  normativa aplicable, se informa:
                </p>
                <div className="space-y-2">
                  <p>
                    <strong>Denominación:</strong> Estudio Jurídico Belmonte - Lucero - Salafia
                  </p>
                  <p>
                    <strong>Dirección:</strong> Colon 165 4° Piso Oficina A, Ciudad, Mendoza, Argentina
                  </p>
                  <p>
                    <strong>Email:</strong> natal00203@gmail.com | belmonteeliana@gmail.com
                  </p>
                  <p>
                    <strong>Teléfono:</strong> +54 261 207 1333 | +54 261 271 2200
                  </p>
                  <p>
                    <strong>Inscripción:</strong> Colegio de Abogados y Procuradores de Mendoza
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-serif">2. Objeto del Sitio Web</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-card-foreground">
                <p>
                  Este sitio web tiene como finalidad proporcionar información sobre los servicios jurídicos ofrecidos
                  por nuestro estudio, así como facilitar el contacto con potenciales clientes.
                </p>
                <p>
                  La información contenida en este sitio web tiene carácter meramente informativo y no constituye
                  asesoramiento jurídico ni establece relación abogado-cliente hasta que se formalice un mandato
                  profesional.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-serif">3. Condiciones de Uso</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-card-foreground">
                <p>El acceso y uso de este sitio web implica la aceptación de las siguientes condiciones:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    El usuario se compromete a utilizar el sitio web de forma lícita y conforme a la legislación
                    vigente.
                  </li>
                  <li>
                    Queda prohibido el uso del sitio web con fines ilícitos o que puedan dañar los derechos e
                    intereses de terceros.
                  </li>
                  <li>
                    El usuario no podrá realizar actividades que puedan dañar, inutilizar o sobrecargar el sitio web.
                  </li>
                  <li>
                    Cualquier información confidencial compartida a través de los formularios de contacto será tratada
                    con la máxima confidencialidad y protegida por el secreto profesional.
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-serif">4. Propiedad Intelectual</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-card-foreground">
                <p>
                  Todos los contenidos de este sitio web (textos, imágenes, diseño gráfico, código fuente, logos,
                  etc.) son propiedad del Estudio Jurídico Belmonte - Lucero - Salafia o de terceros que han
                  autorizado su uso.
                </p>
                <p>
                  Queda prohibida la reproducción, distribución, comunicación pública o transformación de los
                  contenidos sin autorización expresa del titular de los derechos, excepto en los casos permitidos por
                  la legislación vigente.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-serif">5. Responsabilidad</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-card-foreground">
                <p>
                  El estudio se esfuerza por mantener la información del sitio web actualizada y precisa. Sin embargo,
                  no garantiza la ausencia de errores o la disponibilidad continua del sitio.
                </p>
                <p>
                  No nos hacemos responsables de los daños derivados del uso inadecuado del sitio web, ni de los
                  contenidos de sitios web de terceros accesibles a través de enlaces externos.
                </p>
                <p>
                  Las opiniones y publicaciones en el blog son de carácter informativo general y no constituyen
                  asesoramiento legal específico para casos particulares.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-serif">6. Enlaces a Terceros</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-card-foreground">
                <p>
                  Este sitio web puede contener enlaces a sitios web de terceros. El estudio no se responsabiliza del
                  contenido, políticas de privacidad o prácticas de dichos sitios web.
                </p>
                <p>
                  Los enlaces se proporcionan únicamente como referencia y no implican respaldo o recomendación de los
                  contenidos enlazados.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-serif">7. Confidencialidad y Secreto Profesional</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-card-foreground">
                <p>
                  Como estudio jurídico, estamos sujetos al secreto profesional establecido en el Código de Ética
                  Profesional del Colegio de Abogados de Mendoza y la legislación aplicable.
                </p>
                <p>
                  Toda información proporcionada por los clientes o potenciales clientes será tratada con absoluta
                  confidencialidad y únicamente será utilizada para los fines autorizados.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-serif">8. Modificaciones</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-card-foreground">
                <p>
                  El estudio se reserva el derecho de modificar este aviso legal en cualquier momento. Los cambios
                  entrarán en vigor desde su publicación en el sitio web.
                </p>
                <p>
                  Se recomienda revisar periódicamente este aviso legal para estar informado de las actualizaciones.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-serif">9. Legislación Aplicable y Jurisdicción</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-card-foreground">
                <p>
                  Este aviso legal se rige por la legislación argentina. Para cualquier controversia derivada del uso
                  de este sitio web, las partes se someten a los tribunales competentes de la ciudad de Mendoza,
                  Argentina.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-serif">10. Contacto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-card-foreground">
                <p>
                  Para cualquier consulta relacionada con este aviso legal, puede contactarnos a través de:
                </p>
                <div className="space-y-2">
                  <p>
                    <strong>Email:</strong> natal00203@gmail.com
                  </p>
                  <p>
                    <strong>Teléfono:</strong> +54 261 207 1333
                  </p>
                  <p>
                    <strong>Dirección:</strong> Colon 165 4° Piso Oficina A, Ciudad, Mendoza, Argentina
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
