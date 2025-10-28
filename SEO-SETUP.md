# Guía de Configuración SEO y Google Search Console

## 📋 Archivos SEO Creados

### 1. robots.txt
✅ **Ubicación:** `/public/robots.txt`
- Permite la indexación de todo el sitio excepto áreas administrativas
- Bloquea `/admin/`, `/api/`, `/setup-admin/`
- Incluye referencia al sitemap

### 2. sitemap.xml
✅ **Ubicación:** `/app/sitemap.ts`
- Sitemap dinámico generado automáticamente
- Incluye todas las páginas principales
- Genera URLs dinámicas de blog automáticamente
- Se actualiza cada hora para blogs

### 3. manifest.json
✅ **Ubicación:** `/app/manifest.ts`
- Configuración para PWA (Progressive Web App)
- Define nombre, iconos y colores de la aplicación

### 4. Metadatos SEO Mejorados
✅ **Ubicación:** `/app/layout.tsx`
- Open Graph tags completos
- Twitter Card metadata
- Meta keywords relevantes
- Canonical URLs
- Directivas de robots

### 5. JSON-LD Schema.org
✅ **Ubicación:** Integrado en `/app/layout.tsx`
- Schema tipo "LegalService"
- Datos estructurados para Google
- Información de contacto y ubicación
- Horarios de atención
- Servicios ofrecidos

### 6. Open Graph Image
✅ **Ubicación:** `/app/opengraph-image.tsx`
- Imagen dinámica para compartir en redes sociales
- Se genera automáticamente al 1200x630px

## 🔍 Configuración de Google Search Console

### Paso 1: Verificar el dominio

1. Ir a [Google Search Console](https://search.google.com/search-console)
2. Agregar propiedad: `https://www.belmontesalafia.com`
3. Elegir método de verificación

#### Opción A: Verificación por meta tag (RECOMENDADO)

1. Google te dará un código como: `<meta name="google-site-verification" content="XXXXXXXXX" />`
2. Copiar el valor `XXXXXXXXX`
3. Actualizar `/app/layout.tsx` línea con `verification`:

```typescript
verification: {
  google: 'XXXXXXXXX', // Reemplazar con tu código
},
```

#### Opción B: Verificación por archivo HTML

1. Descargar el archivo HTML de verificación
2. Colocarlo en `/public/`
3. Acceder a `https://www.belmontesalafia.com/google-verification-file.html`

#### Opción C: Verificación por DNS

1. Agregar registro TXT en tu proveedor de DNS
2. Valor: el que proporciona Google Search Console

### Paso 2: Enviar sitemap

1. Una vez verificado el dominio
2. En Google Search Console, ir a "Sitemaps"
3. Agregar sitemap: `https://www.belmontesalafia.com/sitemap.xml`
4. Hacer clic en "Enviar"

### Paso 3: Solicitar indexación

1. Ir a "Inspección de URLs"
2. Ingresar: `https://www.belmontesalafia.com`
3. Hacer clic en "Solicitar indexación"
4. Repetir para las páginas principales:
   - `/nosotros`
   - `/areas`
   - `/blog`
   - `/contacto`

## 📊 Google Analytics (Opcional pero recomendado)

### Agregar Google Analytics 4

1. Crear cuenta en [Google Analytics](https://analytics.google.com)
2. Obtener el ID de medición (formato: `G-XXXXXXXXXX`)
3. Instalar el paquete:

```bash
pnpm add @next/third-parties
```

4. Agregar en `/app/layout.tsx`:

```typescript
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        {children}
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />
      </body>
    </html>
  )
}
```

## 🎯 Palabras Clave Principales

El sitio está optimizado para las siguientes búsquedas:

### Locales (Mendoza)
- "abogados Mendoza"
- "estudio jurídico Mendoza"
- "abogado de familia Mendoza"
- "divorcios Mendoza"
- "sucesiones Mendoza"
- "accidentes de tránsito Mendoza"

### Por Especialidad
- "derecho de familia"
- "divorcio contencioso"
- "régimen de visitas"
- "cuota alimentaria"
- "testamentos y sucesiones"
- "reclamo aseguradora accidente"
- "abogado laboral"

### Long-tail
- "como tramitar un divorcio en Mendoza"
- "cuanto cuesta un abogado de familia en Mendoza"
- "mejor estudio jurídico Mendoza"
- "abogado accidentes de tránsito"

## ✅ Checklist de Optimización SEO

### On-Page SEO
- [x] Títulos únicos y descriptivos (H1, H2)
- [x] Meta descriptions atractivas (150-160 caracteres)
- [x] URLs amigables con slugs descriptivos
- [x] Imágenes con atributos alt descriptivos
- [x] Estructura de encabezados jerárquica
- [x] Enlaces internos relevantes
- [x] Contenido original y de calidad
- [x] Velocidad de carga optimizada

### Technical SEO
- [x] robots.txt configurado
- [x] sitemap.xml dinámico
- [x] HTTPS habilitado
- [x] Responsive design (mobile-friendly)
- [x] Structured data (JSON-LD)
- [x] Open Graph tags
- [x] Twitter Card tags
- [x] Canonical URLs
- [x] Lazy loading de imágenes

### Local SEO
- [x] Schema.org LocalBusiness
- [x] Dirección completa en todas las páginas
- [x] Números de teléfono clickeables
- [x] Horarios de atención
- [x] Mapa/enlace a Google Maps
- [ ] Perfil de Google Business (recomendado crear)
- [ ] Reseñas de clientes (considerar agregar)

## 📈 Monitoreo y Métricas

### Google Search Console
Monitorear semanalmente:
- Impresiones y clics
- CTR (Click-Through Rate)
- Posición promedio en resultados
- Páginas con mejor rendimiento
- Errores de indexación
- Problemas de usabilidad móvil

### Herramientas Adicionales Recomendadas

1. **Google PageSpeed Insights**
   - https://pagespeed.web.dev/
   - Verificar velocidad y Core Web Vitals

2. **Google Rich Results Test**
   - https://search.google.com/test/rich-results
   - Validar structured data

3. **Lighthouse (Chrome DevTools)**
   - Auditoría completa de SEO, accesibilidad y rendimiento

## 🚀 Próximos Pasos Recomendados

1. **Contenido de Blog Regular**
   - Publicar 1-2 artículos por semana
   - Temas de actualidad legal
   - Guías prácticas para clientes

2. **Google Business Profile**
   - Crear perfil en Google Maps
   - Solicitar reseñas a clientes satisfechos
   - Publicar actualizaciones regularmente

3. **Enlaces Externos (Backlinks)**
   - Directorios de abogados en Argentina
   - Colegios de abogados
   - Artículos en medios locales

4. **Optimización Continua**
   - Analizar palabras clave con mejor rendimiento
   - Crear contenido basado en búsquedas reales
   - Actualizar páginas con bajo rendimiento

## 📞 Soporte

Si necesitas ayuda adicional con la configuración de Google Search Console o Analytics, consulta la documentación oficial:

- [Google Search Console Help](https://support.google.com/webmasters)
- [Google Analytics Help](https://support.google.com/analytics)
- [Next.js SEO Guide](https://nextjs.org/learn/seo/introduction-to-seo)

---

**Nota:** El código de verificación de Google (`your-google-verification-code`) en `/app/layout.tsx` debe ser reemplazado con el código real que proporcione Google Search Console.
