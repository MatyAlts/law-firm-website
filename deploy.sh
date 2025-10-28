#!/bin/bash

# Script de despliegue para Law Firm Website

echo "🚀 Iniciando despliegue..."

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verificar que existe .env
if [ ! -f .env ]; then
    echo -e "${RED}❌ Error: Archivo .env no encontrado${NC}"
    echo -e "${YELLOW}Copia .env.example a .env y configura las variables${NC}"
    exit 1
fi

# Detener servicios existentes
echo -e "${YELLOW}⏸️  Deteniendo servicios existentes...${NC}"
docker-compose down

# Construir imágenes
echo -e "${YELLOW}🔨 Construyendo imágenes Docker...${NC}"
docker-compose build --no-cache

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Error al construir las imágenes${NC}"
    exit 1
fi

# Iniciar servicios
echo -e "${YELLOW}🚀 Iniciando servicios...${NC}"
docker-compose up -d

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Error al iniciar los servicios${NC}"
    exit 1
fi

# Esperar a que los servicios estén listos
echo -e "${YELLOW}⏳ Esperando a que los servicios estén listos...${NC}"
sleep 10

# Verificar estado de los servicios
echo -e "${YELLOW}📊 Estado de los servicios:${NC}"
docker-compose ps

# Verificar health checks
echo ""
echo -e "${YELLOW}🏥 Verificando health checks...${NC}"

# Frontend
if curl -f -s http://localhost:3000 > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Frontend: OK${NC}"
else
    echo -e "${RED}❌ Frontend: ERROR${NC}"
fi

# Backend
if curl -f -s http://localhost:8080/actuator/health > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Backend: OK${NC}"
else
    echo -e "${RED}❌ Backend: ERROR (puede tardar unos segundos en iniciar)${NC}"
fi

# Nginx
if curl -f -s http://localhost/health > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Nginx: OK${NC}"
else
    echo -e "${RED}❌ Nginx: ERROR${NC}"
fi

echo ""
echo -e "${GREEN}✅ Despliegue completado!${NC}"
echo ""
echo -e "${YELLOW}📝 Accede a tu aplicación en:${NC}"
echo -e "   Frontend: http://localhost"
echo -e "   Admin Panel: http://localhost/admin"
echo -e "   API: http://localhost/api"
echo ""
echo -e "${YELLOW}📋 Ver logs:${NC} docker-compose logs -f"
echo -e "${YELLOW}🛑 Detener:${NC} docker-compose down"
