import Link from "next/link"
import { Scale, Home, Search, FileText, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Scale className="h-20 w-20 text-primary/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl font-bold text-primary">404</span>
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-foreground mb-4">
            Página no encontrada
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Lo sentimos, la página que está buscando no existe o ha sido movida.
          </p>
        </div>

        <Card className="border-border bg-card/50 backdrop-blur">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-6">
              Pero no se preocupe, tenemos muchas otras formas de ayudarle:
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <Link href="/" className="group">
                <Card className="h-full transition-all hover:shadow-md hover:border-primary/50 cursor-pointer">
                  <CardContent className="p-4 flex flex-col items-center text-center gap-3">
                    <div className="rounded-full bg-primary/10 p-3 group-hover:bg-primary/20 transition-colors">
                      <Home className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Inicio</h3>
                      <p className="text-xs text-muted-foreground">Volver al inicio</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/areas" className="group">
                <Card className="h-full transition-all hover:shadow-md hover:border-primary/50 cursor-pointer">
                  <CardContent className="p-4 flex flex-col items-center text-center gap-3">
                    <div className="rounded-full bg-primary/10 p-3 group-hover:bg-primary/20 transition-colors">
                      <Scale className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Áreas de Práctica</h3>
                      <p className="text-xs text-muted-foreground">Nuestros servicios</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/blog" className="group">
                <Card className="h-full transition-all hover:shadow-md hover:border-primary/50 cursor-pointer">
                  <CardContent className="p-4 flex flex-col items-center text-center gap-3">
                    <div className="rounded-full bg-primary/10 p-3 group-hover:bg-primary/20 transition-colors">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Blog</h3>
                      <p className="text-xs text-muted-foreground">Artículos legales</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/contacto" className="group">
                <Card className="h-full transition-all hover:shadow-md hover:border-primary/50 cursor-pointer">
                  <CardContent className="p-4 flex flex-col items-center text-center gap-3">
                    <div className="rounded-full bg-primary/10 p-3 group-hover:bg-primary/20 transition-colors">
                      <Search className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Contacto</h3>
                      <p className="text-xs text-muted-foreground">Consulte su caso</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/" className="flex-1 sm:flex-none">
                <Button variant="default" className="w-full gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Volver al Inicio
                </Button>
              </Link>
              <Link href="/contacto" className="flex-1 sm:flex-none">
                <Button variant="outline" className="w-full gap-2">
                  <Search className="h-4 w-4" />
                  Contactar
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-sm text-muted-foreground">
          <p>¿Necesita ayuda? Llámenos al{" "}
            <a href="tel:+542612071333" className="text-primary hover:underline font-medium">
              +54 261 207 1333
            </a>
          </p>
        </div>
      </div>
    </main>
  )
}
