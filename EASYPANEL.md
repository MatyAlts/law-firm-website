# 🚀 Guía de Despliegue en EasyPanel

## 📋 Requisitos

- Cuenta en EasyPanel
- Repositorio de GitHub/GitLab con tu código
- Dominio configurado (opcional pero recomendado)

## 🔧 Pasos para Desplegar en EasyPanel

### 1. Preparar el Repositorio

Asegúrate de que tu repositorio contenga todos estos archivos:
- `docker-compose.yml`
- `Dockerfile.frontend`
- `Dockerfile.backend`
- `nginx/nginx.conf`
- `.env.example`

### 2. Crear Proyecto en EasyPanel

1. Accede a tu panel de EasyPanel
2. Crea un nuevo proyecto
3. Selecciona "Deploy from Git"
4. Conecta tu repositorio

### 3. Configurar Variables de Entorno

En EasyPanel, ve a la configuración del proyecto y agrega estas variables:

```
DB_USER=lawfirm
DB_PASSWORD=<genera-una-contraseña-fuerte>
JWT_SECRET=<genera-una-clave-de-256-bits>
NEXT_PUBLIC_API_URL=https://tudominio.com/api
API_BASE_URL=http://backend:8080
FRONTEND_URL=https://tudominio.com
HTTP_PORT=80
HTTPS_PORT=443
NODE_ENV=production
SPRING_PROFILES_ACTIVE=prod
```

**⚠️ IMPORTANTE:** 
- Cambia `tudominio.com` por tu dominio real
- Genera contraseñas y secretos fuertes
- Nunca uses las contraseñas de ejemplo en producción

### 4. Configurar Docker Compose

EasyPanel soporta docker-compose nativamente. Solo necesitas:

1. Asegurarte de que `docker-compose.yml` está en la raíz
2. EasyPanel detectará automáticamente los servicios
3. Configurará los puertos y networking

### 5. Configurar Dominio

1. En EasyPanel, ve a la sección de dominios
2. Agrega tu dominio
3. EasyPanel configurará automáticamente:
   - Certificado SSL con Let's Encrypt
   - Proxy inverso a tu aplicación
   - Redirección HTTP → HTTPS

### 6. Desplegar

1. Haz push de tus cambios al repositorio
2. EasyPanel detectará los cambios automáticamente
3. Construirá y desplegará tu aplicación

## 🔒 Configuración de SSL en EasyPanel

EasyPanel maneja SSL automáticamente:
- Obtiene certificados de Let's Encrypt
- Renueva certificados automáticamente
- Configura redirección HTTPS

No necesitas configurar nginx manualmente para SSL.

## 📊 Monitoreo

EasyPanel proporciona:
- Dashboard con métricas de CPU/RAM
- Logs en tiempo real
- Health checks automáticos
- Alertas por email

### Ver Logs

```bash
# En EasyPanel, ve a la sección de Logs
# O usa CLI:
easypanel logs <nombre-proyecto>
```

## 🔄 Actualizaciones

### Automáticas (recomendado)

1. Configura webhook de GitHub/GitLab en EasyPanel
2. Cada push a main/master desplegará automáticamente

### Manual

1. En EasyPanel, ve a tu proyecto
2. Click en "Redeploy"
3. Selecciona "Rebuild" si hay cambios en Dockerfile

## 🗄️ Backups

### Base de Datos

EasyPanel puede hacer backups automáticos:

1. Ve a la configuración del servicio PostgreSQL
2. Activa backups automáticos
3. Configura frecuencia (diario recomendado)

### Manual

```bash
# Desde EasyPanel terminal
easypanel exec <proyecto> postgres -- pg_dump -U lawfirm lawfirm > backup.sql
```

## 🚨 Troubleshooting

### Aplicación no inicia

1. Revisa logs: EasyPanel → Logs
2. Verifica variables de entorno
3. Asegúrate de que docker-compose.yml es válido

### Error 502

1. Verifica que todos los servicios están corriendo
2. Revisa health checks
3. Espera unos minutos (el backend puede tardar en iniciar)

### Base de datos no conecta

1. Verifica credenciales en variables de entorno
2. Asegúrate de que el servicio postgres está corriendo
3. Revisa logs del backend

## 📈 Optimización

### Cache

EasyPanel incluye cache de imágenes Docker:
- Builds más rápidos
- Menos uso de bandwidth
- Deploy más eficiente

### Escalado

Para escalar tu aplicación:

1. Ve a configuración del servicio
2. Ajusta recursos (CPU/RAM)
3. Configura réplicas si es necesario

## 🔐 Seguridad

### Checklist

- [x] Variables de entorno configuradas
- [x] SSL habilitado
- [x] Contraseñas fuertes
- [x] Backups configurados
- [x] Health checks activos
- [ ] Firewall configurado (si aplica)
- [ ] Rate limiting en nginx
- [ ] Monitoreo de logs

## 📞 Soporte

- Documentación: https://easypanel.io/docs
- Discord: https://easypanel.io/discord
- Documentación del proyecto: Ver README.deployment.md

## 🎉 Deploy Exitoso

Tu aplicación debería estar disponible en:
- https://tudominio.com - Frontend
- https://tudominio.com/admin - Panel de administración
- https://tudominio.com/api - API Backend

### Primer Acceso

1. Ve a https://tudominio.com/admin/login
2. Usuario: `admin@lawfirm.com`
3. Contraseña: `changeme123`
4. **¡CAMBIA LA CONTRASEÑA INMEDIATAMENTE!**

## 📝 Notas Adicionales

- EasyPanel maneja automáticamente el networking entre contenedores
- Los volúmenes persisten entre deploys
- Las variables de entorno se pueden modificar sin rebuild
- Los logs se mantienen por 7 días por defecto
