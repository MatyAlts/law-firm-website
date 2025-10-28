# Law Firm Website - Docker Configuration

Este directorio contiene toda la configuración necesaria para dockerizar y desplegar la aplicación completa.

## 📁 Archivos Incluidos

- `docker-compose.yml` - Orquestación de todos los servicios
- `Dockerfile.frontend` - Imagen de Next.js
- `Dockerfile.backend` - Imagen de Spring Boot
- `nginx/nginx.conf` - Configuración de Nginx con SSL
- `.env.example` - Variables de entorno de ejemplo
- `deploy.sh` / `deploy.bat` - Scripts de despliegue automático
- `backup.sh` - Script de backup de base de datos
- `setup-ssl.sh` - Configuración automática de SSL
- `README.deployment.md` - Guía completa de despliegue
- `EASYPANEL.md` - Guía específica para EasyPanel

## 🚀 Quick Start

### Desarrollo Local

```bash
# 1. Copiar variables de entorno
cp .env.example .env

# 2. Editar .env con tus valores
nano .env

# 3. Iniciar servicios
docker-compose up -d

# 4. Ver logs
docker-compose logs -f
```

### Producción

```bash
# Linux/Mac
chmod +x deploy.sh
./deploy.sh

# Windows
deploy.bat
```

## 🏗️ Arquitectura

```
┌─────────────┐
│   Internet  │
└──────┬──────┘
       │
┌──────▼──────┐
│    Nginx    │ (Puerto 80/443)
│   Reverse   │
│    Proxy    │
└──────┬──────┘
       │
       ├──────────────┬────────────────┐
       │              │                │
┌──────▼──────┐ ┌────▼─────┐   ┌─────▼────┐
│  Next.js    │ │  Spring  │   │PostgreSQL│
│  Frontend   │ │  Backend │   │ Database │
│  (Port 3000)│ │(Port 8080)│   │(Port 5432)│
└─────────────┘ └──────────┘   └──────────┘
```

## 🔧 Servicios

### Frontend (Next.js)
- **Puerto**: 3000 (interno)
- **Tecnología**: Next.js 15, React 19
- **Build**: Standalone output para producción

### Backend (Spring Boot)
- **Puerto**: 8080 (interno)
- **Tecnología**: Java 17, Spring Boot 3.2
- **Base de datos**: PostgreSQL con JPA

### Base de Datos (PostgreSQL)
- **Puerto**: 5432 (interno)
- **Versión**: 16-alpine
- **Persistencia**: Volumen Docker

### Proxy (Nginx)
- **Puertos**: 80 (HTTP), 443 (HTTPS)
- **Funciones**:
  - Reverse proxy
  - SSL termination
  - Static file caching
  - Rate limiting
  - Compression

## 🌐 URLs de Acceso

- **Frontend**: http://localhost o https://tudominio.com
- **Admin Panel**: http://localhost/admin
- **API Backend**: http://localhost/api
- **Health Check**: http://localhost/health

## 🔐 Seguridad

### Variables Sensibles

Cambia estas variables en `.env`:
```bash
DB_PASSWORD=<contraseña-fuerte-aquí>
JWT_SECRET=<secreto-de-256-bits>
```

### SSL/TLS

Para habilitar HTTPS:
```bash
./setup-ssl.sh tudominio.com tu@email.com
```

## 📊 Monitoreo

### Ver logs en tiempo real
```bash
docker-compose logs -f
```

### Ver logs de un servicio específico
```bash
docker-compose logs -f frontend
docker-compose logs -f backend
docker-compose logs -f postgres
docker-compose logs -f nginx
```

### Estado de los servicios
```bash
docker-compose ps
```

### Uso de recursos
```bash
docker stats
```

## 🗄️ Backups

### Backup manual
```bash
./backup.sh
```

### Backup automático (cron)
```bash
# Editar crontab
crontab -e

# Agregar (backup diario a las 2 AM)
0 2 * * * cd /ruta/a/tu/proyecto && ./backup.sh
```

### Restaurar backup
```bash
# Descomprimir
gunzip backups/lawfirm_backup_20250127.sql.gz

# Restaurar
cat backups/lawfirm_backup_20250127.sql | docker exec -i law-firm-db psql -U lawfirm lawfirm
```

## 🔄 Actualizaciones

### Update de código
```bash
git pull origin main
docker-compose build --no-cache
docker-compose up -d
```

### Update de imágenes base
```bash
docker-compose pull
docker-compose up -d
```

## 🛠️ Troubleshooting

### Limpiar todo y empezar de nuevo
```bash
docker-compose down -v
docker-compose up -d --build
```

### Ver logs de errores
```bash
docker-compose logs --tail=50 | grep -i error
```

### Acceder a un contenedor
```bash
docker exec -it law-firm-frontend sh
docker exec -it law-firm-backend sh
docker exec -it law-firm-db psql -U lawfirm
```

### Problemas de permisos
```bash
sudo chown -R $USER:$USER .
chmod -R 755 nginx/
```

## 📚 Documentación Adicional

- **Despliegue General**: `README.deployment.md`
- **EasyPanel**: `EASYPANEL.md`
- **Backend API**: `backend/README.md`
- **Frontend**: `README.md`

## ✅ Checklist Pre-Producción

- [ ] Variables de entorno configuradas
- [ ] Contraseñas cambiadas
- [ ] SSL configurado
- [ ] Backups automáticos configurados
- [ ] Dominio configurado y apuntando al servidor
- [ ] Firewall configurado (puertos 80, 443, 22)
- [ ] Monitoring/logging configurado
- [ ] Rate limiting ajustado
- [ ] Credenciales de admin cambiadas

## 🆘 Soporte

Para problemas o preguntas:
1. Revisar logs: `docker-compose logs`
2. Consultar documentación
3. Verificar issues en GitHub
4. Contactar al equipo de desarrollo

---

**Última actualización**: Octubre 2025
**Versión**: 1.0.0
