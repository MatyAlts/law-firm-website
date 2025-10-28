# 📦 Configuración de Docker Completa

## ✅ Archivos Creados

Tu proyecto ahora incluye toda la configuración necesaria para desplegar en Docker:

### 🐳 Docker Configuration
- ✅ `docker-compose.yml` - Orquestación completa de servicios
- ✅ `Dockerfile.frontend` - Imagen optimizada de Next.js
- ✅ `Dockerfile.backend` - Imagen de Spring Boot
- ✅ `.dockerignore` - Optimización de build

### 🌐 Nginx & Proxy
- ✅ `nginx/nginx.conf` - Configuración completa con:
  - Reverse proxy para frontend y backend
  - SSL/TLS support
  - Gzip compression
  - Static file caching
  - Rate limiting
  - Security headers

### 🔐 Configuración & Seguridad
- ✅ `.env.example` - Template de variables
- ✅ `.env.production` - Template para producción
- ✅ `backend/src/main/resources/db/init.sql` - Inicialización de BD

### 🚀 Scripts de Despliegue
- ✅ `deploy.sh` - Script de despliegue para Linux/Mac
- ✅ `deploy.bat` - Script de despliegue para Windows
- ✅ `backup.sh` - Backup automático de PostgreSQL
- ✅ `setup-ssl.sh` - Configuración automática de SSL
- ✅ `update-ssl.sh` - Actualización de certificados

### 📚 Documentación
- ✅ `README.deployment.md` - Guía completa de despliegue
- ✅ `EASYPANEL.md` - Guía específica para EasyPanel
- ✅ `DOCKER.md` - Documentación de Docker
- ✅ `QUICKSTART.md` - Inicio rápido (5 minutos)

### ⚙️ Configuración de Proyecto
- ✅ `next.config.mjs` - Actualizado con output standalone
- ✅ `.gitignore` - Actualizado para excluir archivos sensibles

---

## 🎯 Próximos Pasos

### 1. Configurar Variables de Entorno
```bash
cp .env.example .env
nano .env  # Editar con tus valores
```

**⚠️ IMPORTANTE - Cambiar estos valores:**
- `DB_PASSWORD` - Contraseña fuerte para PostgreSQL
- `JWT_SECRET` - Clave de 256 bits (genera con `openssl rand -base64 32`)
- `FRONTEND_URL` - Tu dominio (ej: https://tudominio.com)
- `NEXT_PUBLIC_API_URL` - URL de tu API (ej: https://tudominio.com/api)

### 2. Desplegar Localmente (Testing)
```bash
# Linux/Mac
chmod +x deploy.sh
./deploy.sh

# Windows
deploy.bat
```

### 3. Verificar que Todo Funciona
```bash
# Ver servicios
docker-compose ps

# Ver logs
docker-compose logs -f

# Probar endpoints
curl http://localhost           # Frontend
curl http://localhost/api/blogs # Backend
curl http://localhost/health    # Health check
```

### 4. Acceder a la Aplicación
- **Frontend**: http://localhost
- **Admin Panel**: http://localhost/admin
- **API**: http://localhost/api

**Credenciales de admin:**
- Email: `admin@lawfirm.com`
- Password: `changeme123`

⚠️ **CAMBIAR LA CONTRASEÑA INMEDIATAMENTE**

---

## 🌍 Despliegue en Producción

### Opción A: EasyPanel (Recomendado)

1. **Sube tu código a GitHub/GitLab**
```bash
git add .
git commit -m "Add Docker configuration"
git push origin main
```

2. **En EasyPanel:**
   - Crear nuevo proyecto
   - Conectar repositorio
   - Configurar variables de entorno
   - ¡Deploy automático!

📖 Ver `EASYPANEL.md` para guía detallada

### Opción B: Servidor Propio

1. **En tu servidor:**
```bash
git clone <tu-repo>
cd law-firm-website
cp .env.example .env
nano .env  # Configurar variables
./deploy.sh
```

2. **Configurar dominio y SSL:**
```bash
./setup-ssl.sh tudominio.com tu@email.com
```

📖 Ver `README.deployment.md` para guía detallada

---

## 📊 Arquitectura Desplegada

```
                    Internet
                       ↓
              [Puerto 80/443]
                       ↓
                   ┌────────┐
                   │ Nginx  │ ← Reverse Proxy, SSL, Cache
                   └────────┘
                       ↓
           ┌───────────┴───────────┐
           ↓                       ↓
    ┌──────────┐           ┌──────────┐
    │ Next.js  │           │  Spring  │
    │ Frontend │           │  Backend │
    │ :3000    │           │  :8080   │
    └──────────┘           └────┬─────┘
                                ↓
                         ┌─────────────┐
                         │ PostgreSQL  │
                         │   :5432     │
                         └─────────────┘
```

---

## 🔧 Comandos Útiles

### Gestión Básica
```bash
# Iniciar todos los servicios
docker-compose up -d

# Ver logs en tiempo real
docker-compose logs -f

# Detener servicios
docker-compose stop

# Reiniciar un servicio
docker-compose restart backend

# Detener y eliminar todo
docker-compose down
```

### Mantenimiento
```bash
# Backup de base de datos
./backup.sh

# Ver uso de recursos
docker stats

# Limpiar imágenes antiguas
docker system prune -a
```

### Debugging
```bash
# Acceder a un contenedor
docker exec -it law-firm-frontend sh
docker exec -it law-firm-backend sh
docker exec -it law-firm-db psql -U lawfirm

# Ver logs de un servicio
docker-compose logs backend --tail=100
```

---

## 🔒 Checklist de Seguridad

Antes de ir a producción, verifica:

- [ ] Todas las contraseñas cambiadas (DB, JWT, Admin)
- [ ] Variables de entorno configuradas correctamente
- [ ] SSL/HTTPS habilitado
- [ ] Firewall configurado (solo puertos 80, 443, 22)
- [ ] Backups automáticos configurados
- [ ] Rate limiting activado en nginx
- [ ] Health checks funcionando
- [ ] Logs monitoreados
- [ ] Dominio apuntando al servidor
- [ ] Credenciales de admin cambiadas después del primer login

---

## 📚 Documentación por Caso de Uso

- **Despliegue rápido (5 min)**: `QUICKSTART.md`
- **Despliegue en EasyPanel**: `EASYPANEL.md`
- **Despliegue en servidor propio**: `README.deployment.md`
- **Referencia Docker completa**: `DOCKER.md`

---

## 🆘 Troubleshooting Común

### "Puerto ya en uso"
```bash
# Ver qué está usando el puerto 80
sudo lsof -i :80
# Detener el servicio o cambiar HTTP_PORT en .env
```

### "Error al conectar con la base de datos"
```bash
# Verificar que postgres esté corriendo
docker-compose ps
# Ver logs
docker-compose logs postgres
# Esperar 30 segundos para que inicie completamente
```

### "502 Bad Gateway"
```bash
# El backend puede tardar 1-2 minutos en iniciar
docker-compose logs backend
# Verificar health check
curl http://localhost:8080/actuator/health
```

### "Error de permisos"
```bash
# En Linux/Mac
sudo chown -R $USER:$USER .
chmod +x deploy.sh backup.sh setup-ssl.sh
```

---

## 🎉 ¡Todo Listo!

Tu aplicación está completamente dockerizada y lista para desplegar.

### Testing Local
```bash
./deploy.sh  # o deploy.bat en Windows
```

### Producción
1. Sube a GitHub
2. Despliega en EasyPanel o tu servidor
3. Configura dominio y SSL
4. ¡Listo para producción! 🚀

---

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs: `docker-compose logs -f`
2. Consulta la documentación específica
3. Verifica el checklist de seguridad
4. Contacta al equipo de desarrollo

---

**Documentación creada**: Octubre 2025
**Versión**: 1.0.0
**Estado**: ✅ Lista para producción
