# 🚀 Quick Start: Deploy SEO

## 1️⃣ Commit y Push (2 minutos)

```bash
# Agregar todos los archivos SEO
git add .

# Commit con mensaje descriptivo
git commit -m "feat: Add complete SEO configuration

- robots.txt for search engine crawlers
- Dynamic sitemap.xml with blog posts
- Enhanced metadata for all pages
- Schema.org structured data (LegalService)
- Open Graph and Twitter Card tags
- PWA manifest
- Documentation and verification scripts"

# Push a repositorio
git push origin main
```

## 2️⃣ Rebuild en EasyPanel (1 minuto)

1. Ir a EasyPanel
2. Seleccionar tu aplicación
3. Click en **"Rebuild"**
4. Esperar a que termine (2-3 minutos)

## 3️⃣ Verificar Deployment (1 minuto)

Abrir estas URLs en tu navegador:

✅ **robots.txt**
```
https://www.belmontesalafia.com/robots.txt
```
Debe mostrar:
```
User-agent: *
Allow: /
Disallow: /admin/
...
```

✅ **sitemap.xml**
```
https://www.belmontesalafia.com/sitemap.xml
```
Debe mostrar XML con todas las páginas

✅ **Página principal**
```
https://www.belmontesalafia.com/
```
- Click derecho → Ver código fuente
- Buscar: `<script type="application/ld+json"`
- Debe aparecer el JSON-LD con datos del estudio

## 4️⃣ Google Search Console (10 minutos)

### Paso A: Crear Cuenta
1. Ir a: https://search.google.com/search-console
2. Click en **"Agregar Propiedad"**
3. Seleccionar: **"Prefijo de URL"**
4. Ingresar: `https://www.belmontesalafia.com`

### Paso B: Verificar Dominio
1. Google te mostrará varias opciones
2. Seleccionar: **"Etiqueta HTML"**
3. Copiar el código: `<meta name="google-site-verification" content="XXXXXXXXXXX" />`

### Paso C: Agregar Código de Verificación
1. Abrir: `app/layout.tsx`
2. Buscar línea 54:
```typescript
verification: {
  google: 'your-google-verification-code', // ← AQUÍ
},
```
3. Reemplazar `your-google-verification-code` con tu código
4. Commit + Push + Rebuild
5. Volver a Google Search Console
6. Click en **"Verificar"**

### Paso D: Enviar Sitemap
1. En Google Search Console, ir a **"Sitemaps"** (menú izquierdo)
2. En el campo, escribir: `sitemap.xml`
3. Click en **"Enviar"**
4. Estado debe cambiar a: ✅ **"Correcto"**

## 5️⃣ Solicitar Indexación (5 minutos)

Para cada página importante:

1. En Search Console, ir a: **"Inspección de URLs"**
2. Pegar la URL completa
3. Click en **"Solicitar indexación"**

URLs prioritarias:
```
https://www.belmontesalafia.com/
https://www.belmontesalafia.com/nosotros
https://www.belmontesalafia.com/areas
https://www.belmontesalafia.com/blog
https://www.belmontesalafia.com/contacto
```

## ⏱️ Tiempos de Espera

- ✅ **Deploy:** Inmediato (3-5 min)
- ✅ **Verificación Search Console:** Inmediato
- ⏳ **Indexación inicial:** 24-48 horas
- ⏳ **Aparecer en búsquedas:** 3-7 días
- ⏳ **Posicionamiento:** 2-4 semanas

## 📊 Monitoreo (Diario)

### Primeros 7 días
Revisar en Google Search Console:
- **Coverage:** ¿Se están indexando las páginas?
- **Sitemaps:** ¿Estado "Correcto"?
- **Errores:** ¿Hay problemas?

### Después de 7 días
- **Performance:** Impresiones y clics
- **Queries:** ¿Para qué búsquedas aparece el sitio?
- **Pages:** ¿Qué páginas tienen más tráfico?

## 🎯 Resultados Esperados

### Semana 1
- ✅ Sitio verificado en Search Console
- ✅ Sitemap enviado
- ✅ Primeras páginas indexadas

### Semana 2-4
- 📈 Aparece en búsquedas de marca: "belmonte lucero salafia"
- 📊 100-500 impresiones
- 👆 5-20 clics

### Mes 2-3
- 📈 Aparece en búsquedas genéricas: "abogados mendoza"
- 📊 1,000-5,000 impresiones
- 👆 50-100 clics
- 📞 10-20 consultas por mes

## ⚡ Script de Verificación Rápida

Después del deploy, ejecutar:

**Windows:**
```bash
verify-seo.bat
```

**Linux/Mac:**
```bash
chmod +x verify-seo.sh
./verify-seo.sh
```

Esto verificará automáticamente:
- ✅ robots.txt (HTTP 200)
- ✅ sitemap.xml (HTTP 200)
- ✅ Todas las páginas principales

## 🆘 Problemas Comunes

### ❌ robots.txt devuelve 404
**Solución:**
1. Verificar que `/public/robots.txt` existe
2. Hacer rebuild en EasyPanel
3. Limpiar caché del navegador

### ❌ sitemap.xml está vacío
**Solución:**
1. Verificar que `/api/blogs` funciona
2. En caso necesario, el sitemap tiene páginas hardcodeadas
3. Los blogs se agregan dinámicamente

### ❌ Google no puede verificar
**Solución:**
1. Verificar que el código esté exacto en `layout.tsx`
2. Hacer rebuild
3. Esperar 5 minutos
4. Intentar verificar de nuevo
5. Si falla, usar método alternativo (DNS o archivo HTML)

## 📚 Documentación Completa

Para más detalles:
- **SEO-README.md** → Resumen ejecutivo completo
- **SEO-SETUP.md** → Guía detallada de configuración
- **SEO-CHECKLIST.md** → Checklist de verificación paso a paso

## ✅ Checklist Final

Antes de terminar, verificar:

- [ ] Commit y push realizados
- [ ] Rebuild completado en EasyPanel
- [ ] `/robots.txt` accesible y correcto
- [ ] `/sitemap.xml` accesible con todas las URLs
- [ ] Search Console verificado
- [ ] Sitemap enviado a Google
- [ ] Indexación solicitada para páginas principales

---

**¡Listo!** 🎉

Tu sitio ahora está completamente optimizado para SEO y será indexado por Google en los próximos días.
