import Link from "next/link"
import { MapPin, Mail, Phone, MessageCircle } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Firm Info */}
          <div>
            <h3 className="text-2xl font-serif font-bold mb-4">Belmonte, Lucero Salafia</h3>
            <p className="text-sm text-secondary-foreground/80 leading-relaxed">Estudio Jurídico</p>
            <p className="text-sm text-secondary-foreground/80 leading-relaxed mt-2">Compromiso, ética y resultados.</p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-serif font-semibold mb-4">Contacto</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <p className="text-sm text-secondary-foreground/80">Mendoza, Argentina</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="flex-shrink-0" />
                <a
                  href="mailto:contacto@blsestudio.com.ar"
                  className="text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                >
                  contacto@blsestudio.com.ar
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="flex-shrink-0" />
                <a
                  href="tel:+542614000000"
                  className="text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                >
                  +54 261 400 0000
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MessageCircle size={18} className="flex-shrink-0" />
                <a
                  href="https://wa.me/5492614000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-lg font-serif font-semibold mb-4">Legal</h4>
            <div className="space-y-2">
              <Link
                href="/aviso-legal"
                className="block text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
              >
                Aviso Legal
              </Link>
              <Link
                href="/politica-privacidad"
                className="block text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
              >
                Política de Privacidad
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-secondary-foreground/20">
          <p className="text-center text-sm text-secondary-foreground/60">
            © {new Date().getFullYear()} Belmonte, Lucero Salafia. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
