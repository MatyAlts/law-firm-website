# ⚡ Quick Start - Docker Deployment

## 🚀 Despliegue Rápido (5 minutos)

### 1. Preparación
```bash
# Clonar el repositorio
git clone <tu-repo>
cd law-firm-website

# Copiar variables de entorno
cp .env.example .env

# Editar variables (IMPORTANTE!)
nano .env  # Linux/Mac
# o
notepad .env  # Windows
```

### 2. Configurar Variables
Edita `.env` y cambia:
- `DB_PASSWORD` - Contraseña fuerte para PostgreSQL
- `JWT_SECRET` - Clave secreta de 256 bits
- `FRONTEND_URL` - Tu dominio (ej: https://tudominio.com)
- `NEXT_PUBLIC_API_URL` - URL de API (ej: https://tudominio.com/api)

### 3. Desplegar
```bash
# Linux/Mac
chmod +x deploy.sh
./deploy.sh

# Windows
deploy.bat
```

### 4. Verificar
```bash
# Ver servicios corriendo
docker-compose ps

# Ver logs
docker-compose logs -f
```

### 5. Acceder
- Frontend: http://localhost
- Admin: http://localhost/admin
- API: http://localhost/api

**Credenciales por defecto:**
- Usuario: `admin@lawfirm.com`
- Password: `changeme123`

⚠️ **CAMBIA LA CONTRASEÑA INMEDIATAMENTE**

---

## 📱 Despliegue en EasyPanel

### 1. En EasyPanel
1. Crear nuevo proyecto → "Deploy from Git"
2. Conectar tu repositorio
3. EasyPanel detectará automáticamente `docker-compose.yml`

### 2. Variables de Entorno
Agregar en EasyPanel → Settings → Environment:
```
DB_PASSWORD=<contraseña-fuerte>
JWT_SECRET=<secreto-256-bits>
FRONTEND_URL=https://tudominio.com
NEXT_PUBLIC_API_URL=https://tudominio.com/api
```

### 3. Dominio
1. EasyPanel → Domains
2. Agregar dominio
3. SSL automático con Let's Encrypt ✅

### 4. Deploy
¡Listo! EasyPanel desplegará automáticamente.

---

## 🔧 Comandos Útiles

```bash
# Ver logs en vivo
docker-compose logs -f

# Reiniciar un servicio
docker-compose restart backend

# Detener todo
docker-compose down

# Backup de BD
./backup.sh

# Actualizar código
git pull && docker-compose up -d --build
```

---

## 🆘 Problemas Comunes

### Error: Puerto ya en uso
```bash
# Ver qué está usando el puerto
sudo lsof -i :80
# Detener el servicio o cambiar puerto en .env
```

### Error: No conecta a la BD
```bash
# Verificar que postgres esté corriendo
docker-compose ps
# Ver logs
docker-compose logs postgres
# Esperar 30 segundos para que inicie
```

### Error 502 Bad Gateway
```bash
# Esperar que el backend inicie (puede tardar 1-2 min)
docker-compose logs backend
```

---

## 📚 Más Información

- **Guía Completa**: `README.deployment.md`
- **EasyPanel**: `EASYPANEL.md`
- **Docker**: `DOCKER.md`

---

## ✅ Checklist Final

- [ ] Variables configuradas en `.env`
- [ ] Servicios corriendo: `docker-compose ps`
- [ ] Frontend accesible: http://localhost
- [ ] Admin accesible: http://localhost/admin
- [ ] API respondiendo: http://localhost/api/blogs
- [ ] Contraseña de admin cambiada
- [ ] SSL configurado (producción)
- [ ] Backups configurados

---

**¿Todo funcionando?** 🎉
Tu sitio está listo en http://localhost (o tu dominio)
