#!/bin/bash

# Script de verificación SEO post-deployment
# Uso: ./verify-seo.sh

DOMAIN="https://www.belmontesalafia.com"
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "🔍 Verificando configuración SEO..."
echo "=================================="
echo ""

# Función para verificar URL
check_url() {
    local url=$1
    local name=$2
    
    echo -n "Verificando $name... "
    
    status_code=$(curl -s -o /dev/null -w "%{http_code}" "$url")
    
    if [ "$status_code" -eq 200 ]; then
        echo -e "${GREEN}✓ OK${NC} (HTTP $status_code)"
        return 0
    else
        echo -e "${RED}✗ FAIL${NC} (HTTP $status_code)"
        return 1
    fi
}

# Verificar robots.txt
check_url "$DOMAIN/robots.txt" "robots.txt"

# Verificar sitemap.xml
check_url "$DOMAIN/sitemap.xml" "sitemap.xml"

# Verificar manifest.json
check_url "$DOMAIN/manifest.json" "manifest.json"

# Verificar páginas principales
echo ""
echo "Verificando páginas principales..."
echo "-----------------------------------"

check_url "$DOMAIN/" "Página de inicio"
check_url "$DOMAIN/nosotros" "Nosotros"
check_url "$DOMAIN/areas" "Áreas de práctica"
check_url "$DOMAIN/blog" "Blog"
check_url "$DOMAIN/contacto" "Contacto"
check_url "$DOMAIN/aviso-legal" "Aviso Legal"
check_url "$DOMAIN/politica-privacidad" "Política de Privacidad"

echo ""
echo "=================================="
echo "Verificación completada."
echo ""
echo -e "${YELLOW}Próximos pasos:${NC}"
echo "1. Verificar el contenido de $DOMAIN/robots.txt"
echo "2. Verificar el contenido de $DOMAIN/sitemap.xml"
echo "3. Configurar Google Search Console"
echo "4. Enviar sitemap a Google"
echo ""
echo "Ver SEO-SETUP.md para instrucciones detalladas."
