import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield } from "lucide-react"

export default function PoliticaPrivacidadPage() {
  return (
    <main className="py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <Shield className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-foreground mb-4">
              Política de Privacidad
            </h1>
            <p className="text-muted-foreground">Última actualización: Octubre 2025</p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-serif">1. Responsable del Tratamiento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-card-foreground">
                <p>
                  En cumplimiento de la Ley 25.326 de Protección de Datos Personales de la República Argentina,
                  informamos:
                </p>
                <div className="space-y-2">
                  <p>
                    <strong>Responsable:</strong> Estudio Jurídico Belmonte - Lucero - Salafia
                  </p>
                  <p>
                    <strong>Domicilio:</strong> Colon 165 4° Piso Oficina A, Ciudad, Mendoza, Argentina
                  </p>
                  <p>
                    <strong>Email:</strong> natal00203@gmail.com
                  </p>
                  <p>
                    <strong>Finalidad:</strong> Prestación de servicios jurídicos y atención de consultas
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-serif">2. Datos Personales Recopilados</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-card-foreground">
                <p>Recopilamos los siguientes tipos de datos personales:</p>
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold mb-2">Datos de Contacto:</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Nombre completo</li>
                      <li>Dirección de email</li>
                      <li>Número de teléfono</li>
                      <li>Dirección postal (cuando sea relevante para el caso)</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Datos de Navegación:</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Dirección IP</li>
                      <li>Tipo de navegador</li>
                      <li>Páginas visitadas</li>
                      <li>Fecha y hora de acceso</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Datos Profesionales (cuando aplique):</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Información relacionada con la consulta jurídica</li>
                      <li>Documentación aportada para el caso</li>
                      <li>Historial de comunicaciones</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-serif">3. Finalidad del Tratamiento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-card-foreground">
                <p>Los datos personales recopilados serán utilizados para:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Responder a consultas y solicitudes de información sobre nuestros servicios jurídicos</li>
                  <li>Gestionar y prestar los servicios profesionales contratados</li>
                  <li>Enviar comunicaciones relacionadas con el servicio contratado</li>
                  <li>Cumplir con obligaciones legales y profesionales</li>
                  <li>Mantener registros para cumplimiento normativo del ejercicio profesional</li>
                  <li>
                    Enviar información de interés jurídico (newsletters, actualizaciones legales) solo con
                    consentimiento previo
                  </li>
                  <li>Mejorar la calidad de nuestros servicios y la experiencia del usuario en el sitio web</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-serif">4. Base Legal del Tratamiento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-card-foreground">
                <p>El tratamiento de sus datos personales se basa en:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Consentimiento:</strong> Al utilizar nuestros formularios de contacto o solicitar nuestros
                    servicios
                  </li>
                  <li>
                    <strong>Ejecución contractual:</strong> Para la prestación de servicios jurídicos solicitados
                  </li>
                  <li>
                    <strong>Obligación legal:</strong> Cumplimiento de normativas del Colegio de Abogados y
                    legislación vigente
                  </li>
                  <li>
                    <strong>Interés legítimo:</strong> Mejora de nuestros servicios y comunicaciones profesionales
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-serif">5. Conservación de Datos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-card-foreground">
                <p>Los datos personales serán conservados durante:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Consultas sin contratación:</strong> Hasta 2 años desde el último contacto, salvo que se
                    solicite su eliminación
                  </li>
                  <li>
                    <strong>Servicios contratados:</strong> Durante la prestación del servicio y posteriormente según
                    obligaciones legales y profesionales (mínimo 5 años conforme a la normativa del Colegio de
                    Abogados)
                  </li>
                  <li>
                    <strong>Obligaciones legales:</strong> El tiempo establecido por la legislación aplicable
                  </li>
                </ul>
                <p className="mt-4">
                  Transcurridos estos plazos, los datos serán eliminados o anonimizados, salvo que exista una
                  obligación legal de conservación o el titular haya otorgado su consentimiento para un plazo mayor.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-serif">6. Destinatarios de los Datos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-card-foreground">
                <p>Sus datos personales podrán ser comunicados a:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Autoridades judiciales:</strong> Cuando sea requerido por ley o en el ejercicio de la
                    defensa legal
                  </li>
                  <li>
                    <strong>Colegio de Abogados:</strong> Para cumplimiento de obligaciones profesionales
                  </li>
                  <li>
                    <strong>Proveedores de servicios:</strong> Empresas que nos asisten en la prestación de servicios
                    (hosting, email, etc.) bajo estrictos acuerdos de confidencialidad
                  </li>
                  <li>
                    <strong>Peritos y profesionales colaboradores:</strong> Cuando sea necesario para la adecuada
                    prestación del servicio jurídico
                  </li>
                </ul>
                <p className="mt-4">
                  En ningún caso se cederán datos a terceros con fines comerciales sin su consentimiento expreso.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-serif">7. Derechos del Titular</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-card-foreground">
                <p>Conforme a la Ley 25.326, usted tiene derecho a:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Acceso:</strong> Conocer qué datos personales tenemos sobre usted
                  </li>
                  <li>
                    <strong>Rectificación:</strong> Solicitar la corrección de datos inexactos o incompletos
                  </li>
                  <li>
                    <strong>Supresión:</strong> Solicitar la eliminación de sus datos cuando ya no sean necesarios
                  </li>
                  <li>
                    <strong>Oposición:</strong> Oponerse al tratamiento de sus datos en determinadas circunstancias
                  </li>
                  <li>
                    <strong>Portabilidad:</strong> Recibir sus datos en formato estructurado y de uso común
                  </li>
                  <li>
                    <strong>Revocación del consentimiento:</strong> Retirar el consentimiento otorgado en cualquier
                    momento
                  </li>
                </ul>
                <p className="mt-4">
                  Para ejercer estos derechos, puede enviarnos un email a{" "}
                  <a href="mailto:natal00203@gmail.com" className="text-primary hover:underline">
                    natal00203@gmail.com
                  </a>{" "}
                  o comunicarse a nuestras oficinas.
                </p>
                <p>
                  También tiene derecho a presentar una reclamación ante la Agencia de Acceso a la Información Pública
                  (AAIP) si considera que sus derechos han sido vulnerados.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-serif">8. Medidas de Seguridad</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-card-foreground">
                <p>Implementamos medidas técnicas y organizativas para proteger sus datos personales:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Cifrado de conexiones (SSL/TLS)</li>
                  <li>Acceso restringido a datos personales por personal autorizado</li>
                  <li>Sistemas de backup y recuperación de datos</li>
                  <li>Políticas de confidencialidad para todo nuestro personal</li>
                  <li>Revisión periódica de nuestras medidas de seguridad</li>
                  <li>Cumplimiento del secreto profesional establecido para abogados</li>
                </ul>
                <p className="mt-4">
                  Sin embargo, ningún sistema de seguridad es completamente infalible. Nos comprometemos a notificar
                  cualquier incidente de seguridad que pueda afectar sus datos personales.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-serif">9. Cookies y Tecnologías Similares</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-card-foreground">
                <p>Nuestro sitio web puede utilizar cookies para:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Mejorar la experiencia de navegación</li>
                  <li>Analizar el tráfico del sitio web</li>
                  <li>Recordar preferencias del usuario</li>
                </ul>
                <p className="mt-4">
                  Puede configurar su navegador para rechazar cookies, aunque esto puede afectar la funcionalidad del
                  sitio web.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-serif">10. Transferencias Internacionales</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-card-foreground">
                <p>
                  Algunos de nuestros proveedores de servicios (hosting, email) pueden estar ubicados fuera de
                  Argentina. En estos casos, nos aseguramos de que cumplan con estándares adecuados de protección de
                  datos y de que existan garantías suficientes para la transferencia internacional de datos.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-serif">11. Menores de Edad</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-card-foreground">
                <p>
                  Nuestros servicios están dirigidos a personas mayores de 18 años. No recopilamos intencionadamente
                  datos de menores de edad. En casos que involucren menores, los datos serán tratados por sus
                  representantes legales conforme a la legislación aplicable.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-serif">12. Modificaciones a la Política de Privacidad</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-card-foreground">
                <p>
                  Nos reservamos el derecho de modificar esta política de privacidad en cualquier momento. Las
                  modificaciones entrarán en vigor desde su publicación en el sitio web. Se notificarán cambios
                  significativos a través de email a nuestros clientes actuales.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-serif">13. Contacto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-card-foreground">
                <p>Para cualquier consulta sobre esta política de privacidad o el tratamiento de sus datos:</p>
                <div className="space-y-2 mt-4">
                  <p>
                    <strong>Email:</strong>{" "}
                    <a href="mailto:natal00203@gmail.com" className="text-primary hover:underline">
                      natal00203@gmail.com
                    </a>
                  </p>
                  <p>
                    <strong>Teléfono:</strong>{" "}
                    <a href="tel:+542612071333" className="text-primary hover:underline">
                      +54 261 207 1333
                    </a>
                  </p>
                  <p>
                    <strong>Dirección:</strong> Colon 165 4° Piso Oficina A, Ciudad, Mendoza, Argentina
                  </p>
                  <p>
                    <strong>Horario de atención:</strong> Lunes a Viernes de 9:00 a 20:00 hs
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
