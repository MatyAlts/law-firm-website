# 🚀 Guía de Despliegue - Law Firm Website

## 📋 Requisitos Previos

- Docker y Docker Compose instalados
- Dominio apuntando a tu servidor (para SSL)
- Puertos 80 y 443 abiertos en el firewall

## 🛠️ Configuración Inicial

### 1. Clonar el repositorio

```bash
git clone <tu-repositorio>
cd law-firm-website
```

### 2. Configurar variables de entorno

```bash
# Copiar el archivo de ejemplo
cp .env.example .env

# Editar con tus valores
nano .env
```

**Variables importantes a cambiar:**
- `DB_PASSWORD`: Contraseña segura para PostgreSQL
- `JWT_SECRET`: Clave secreta para JWT (mínimo 256 bits)
- `FRONTEND_URL`: URL de tu dominio (ej: https://tudominio.com)
- `NEXT_PUBLIC_API_URL`: URL pública de tu API (ej: https://tudominio.com/api)

### 3. Configurar Next.js para producción

Edita `next.config.mjs` y agrega:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: false,
    remotePatterns: [],
  },
}

export default nextConfig
```

### 4. Crear archivo de inicialización de base de datos

Crea `backend/src/main/resources/db/init.sql`:

```sql
-- Este archivo se ejecuta al crear la base de datos
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'ADMIN',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS blog_posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    summary TEXT,
    content TEXT,
    author_id INTEGER REFERENCES users(id),
    author_name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_blog_slug ON blog_posts(slug);
CREATE INDEX idx_blog_created ON blog_posts(created_at DESC);
```

## 🐳 Despliegue con Docker

### Construcción y despliegue

```bash
# Construir las imágenes
docker-compose build

# Iniciar los servicios
docker-compose up -d

# Ver los logs
docker-compose logs -f
```

### Verificar el estado

```bash
# Ver servicios corriendo
docker-compose ps

# Ver logs de un servicio específico
docker-compose logs frontend
docker-compose logs backend
docker-compose logs nginx
```

## 🔧 Comandos Útiles

### Gestión de contenedores

```bash
# Detener servicios
docker-compose stop

# Reiniciar servicios
docker-compose restart

# Detener y eliminar contenedores
docker-compose down

# Eliminar todo (incluyendo volúmenes)
docker-compose down -v
```

### Logs y debugging

```bash
# Ver logs en tiempo real
docker-compose logs -f

# Ver logs de las últimas 100 líneas
docker-compose logs --tail=100

# Acceder a un contenedor
docker exec -it law-firm-frontend sh
docker exec -it law-firm-backend sh
```

### Base de datos

```bash
# Conectarse a PostgreSQL
docker exec -it law-firm-db psql -U lawfirm -d lawfirm

# Hacer backup
docker exec law-firm-db pg_dump -U lawfirm lawfirm > backup.sql

# Restaurar backup
cat backup.sql | docker exec -i law-firm-db psql -U lawfirm lawfirm
```

## 🔒 Configuración SSL (HTTPS)

### Opción 1: Let's Encrypt con Certbot

```bash
# Instalar certbot
sudo apt-get update
sudo apt-get install certbot

# Obtener certificado
sudo certbot certonly --standalone -d tudominio.com -d www.tudominio.com

# Copiar certificados
sudo cp /etc/letsencrypt/live/tudominio.com/fullchain.pem nginx/ssl/cert.pem
sudo cp /etc/letsencrypt/live/tudominio.com/privkey.pem nginx/ssl/key.pem
```

### Opción 2: Certificado manual

Coloca tus certificados en:
- `nginx/ssl/cert.pem` - Certificado público
- `nginx/ssl/key.pem` - Clave privada

### Activar HTTPS en Nginx

Edita `nginx/nginx.conf` y descomenta la sección HTTPS (líneas marcadas).

```bash
# Reiniciar nginx
docker-compose restart nginx
```

## 📊 Monitoreo

### Health Checks

```bash
# Frontend
curl http://localhost:3000

# Backend
curl http://localhost:8080/actuator/health

# Nginx
curl http://localhost/health
```

### Métricas de recursos

```bash
# Ver uso de recursos
docker stats

# Ver uso de disco de volúmenes
docker system df -v
```

## 🔄 Actualización de la Aplicación

```bash
# 1. Obtener últimos cambios
git pull origin main

# 2. Reconstruir las imágenes
docker-compose build --no-cache

# 3. Reiniciar servicios
docker-compose up -d

# 4. Verificar logs
docker-compose logs -f
```

## 🚨 Solución de Problemas

### Frontend no se conecta al backend

1. Verificar variables de entorno en `.env`
2. Revisar logs: `docker-compose logs frontend backend`
3. Verificar que los servicios estén en la misma red

### Base de datos no inicia

1. Verificar permisos del volumen: `docker volume inspect law-firm-website_postgres_data`
2. Revisar logs: `docker-compose logs postgres`
3. Eliminar volumen corrupto: `docker-compose down -v` y reiniciar

### Error 502 Bad Gateway

1. Verificar que frontend/backend estén corriendo: `docker-compose ps`
2. Revisar logs de nginx: `docker-compose logs nginx`
3. Verificar health checks de los servicios

### Error de permisos

```bash
# Dar permisos correctos a carpetas
sudo chown -R $USER:$USER .
chmod -R 755 nginx/
```

## 📁 Estructura de Archivos

```
law-firm-website/
├── docker-compose.yml       # Orquestación de servicios
├── Dockerfile.frontend      # Frontend Next.js
├── Dockerfile.backend       # Backend Spring Boot
├── .dockerignore           # Archivos ignorados por Docker
├── .env                    # Variables de entorno (no commitear)
├── .env.example            # Ejemplo de variables
├── nginx/
│   ├── nginx.conf          # Configuración de Nginx
│   └── ssl/                # Certificados SSL (no commitear)
└── backend/
    └── src/main/resources/db/
        └── init.sql        # Script de inicialización de DB
```

## 🔐 Seguridad

### Checklist de seguridad

- [ ] Cambiar todas las contraseñas por defecto
- [ ] Configurar JWT_SECRET fuerte (mínimo 256 bits)
- [ ] Habilitar HTTPS con certificado válido
- [ ] Configurar firewall (solo puertos 80, 443, 22)
- [ ] Mantener Docker y servicios actualizados
- [ ] Hacer backups regulares de la base de datos
- [ ] Revisar logs regularmente
- [ ] Limitar intentos de login en el backend

### Backups automáticos

Crea un cron job para backups diarios:

```bash
# Editar crontab
crontab -e

# Agregar (backup diario a las 2 AM)
0 2 * * * docker exec law-firm-db pg_dump -U lawfirm lawfirm > /backups/lawfirm-$(date +\%Y\%m\%d).sql
```

## 📞 Soporte

Para problemas o preguntas:
1. Revisar logs: `docker-compose logs`
2. Verificar documentación de Docker y servicios
3. Contactar al equipo de desarrollo

## 🎉 ¡Listo!

Tu aplicación debería estar corriendo en:
- **Frontend**: http://tudominio.com
- **Backend API**: http://tudominio.com/api
- **Admin Panel**: http://tudominio.com/admin
