# 🔧 Configuración de Puertos en EasyPanel

## ⚠️ Error: "port is already allocated"

Este error ocurre porque **EasyPanel ya tiene su propio proxy reverso** que usa los puertos 80 y 443.

---

## ✅ Solución Implementada

He cambiado el `docker-compose.yml` para usar `expose` en lugar de `ports`:

```yaml
nginx:
  expose:
    - "80"  # Expone internamente, no externamente
```

Esto permite que:
- ✅ Nginx funcione internamente
- ✅ EasyPanel lo detecte automáticamente
- ✅ EasyPanel lo exponga a través de su proxy

---

## 🌐 Configurar Dominio en EasyPanel

### **Opción 1: Dominio Personalizado (Recomendado)**

1. **En EasyPanel** → Tu Proyecto → **Domains**
2. Click en **"Add Domain"**
3. Ingresa tu dominio: `tudominio.com`
4. Selecciona el servicio: **nginx** (el reverse proxy)
5. EasyPanel configurará automáticamente:
   - ✅ Certificado SSL (Let's Encrypt)
   - ✅ Redirección HTTP → HTTPS
   - ✅ Proxy a tu contenedor nginx

### **Configuración DNS (en tu proveedor de dominio):**

```
Tipo: A
Nombre: @
Valor: [IP de tu servidor EasyPanel]

Tipo: CNAME
Nombre: www
Valor: tudominio.com
```

---

### **Opción 2: Subdominio de EasyPanel (Testing)**

Si no tienes dominio aún:

1. EasyPanel → Domains → **"Use EasyPanel Subdomain"**
2. Elige: `tu-proyecto.easypanel.host`
3. SSL se configura automáticamente
4. Accede inmediatamente

---

## 🔌 Configuración de Puertos en EasyPanel

### **Para el servicio Nginx:**

1. EasyPanel → Tu Proyecto → Servicios → **nginx**
2. **Port Mapping:**
   - Container Port: `80`
   - Protocolo: `HTTP`
3. **Enable Public Access**: ✅ ON

EasyPanel automáticamente:
- Asignará un puerto externo dinámico
- Configurará el proxy reverso
- Manejará SSL/TLS

---

## 📋 Estructura de Routing

```
Internet (tudominio.com)
         ↓
    EasyPanel Proxy (80/443)
    ├── SSL Termination
    └── Reverse Proxy
         ↓
    law-firm-nginx (puerto interno 80)
    ├── /api/* → backend:8080
    └── /* → frontend:3000
```

---

## 🚀 Después de Configurar

### **1. Verificar que todo funciona:**

```bash
# En EasyPanel Terminal
docker ps

# Deberías ver:
# law-firm-db       (healthy)
# law-firm-backend  (healthy)
# law-firm-frontend (running)
# law-firm-nginx    (running)
```

### **2. Acceder a tu aplicación:**

- **Frontend**: `https://tudominio.com`
- **Admin**: `https://tudominio.com/admin`
- **API**: `https://tudominio.com/api/blogs`

### **3. Verificar SSL:**

```bash
curl -I https://tudominio.com

# Debería mostrar:
# HTTP/2 200
# server: nginx
```

---

## 🔍 Variables de Entorno Actualizadas

Ahora que tienes dominio, actualiza en EasyPanel:

```env
NEXT_PUBLIC_API_URL=https://tudominio.com/api
FRONTEND_URL=https://tudominio.com
```

Después de cambiarlas:
1. **Save**
2. **Redeploy** (solo frontend necesita rebuild)

---

## 🆘 Troubleshooting

### **"502 Bad Gateway"**
- ✅ Espera 1-2 minutos (backend tarda en iniciar)
- ✅ Verifica logs: `docker logs law-firm-backend`

### **"Connection refused"**
- ✅ Verifica que nginx esté corriendo: `docker ps`
- ✅ Revisa configuración de dominio en EasyPanel

### **"SSL certificate error"**
- ✅ Espera 2-3 minutos (Let's Encrypt tarda en emitir)
- ✅ Verifica que el DNS esté propagado: `nslookup tudominio.com`

### **Frontend carga pero API no responde**
- ✅ Actualiza `NEXT_PUBLIC_API_URL` con tu dominio real
- ✅ Redeploy solo el frontend

---

## 📊 Checklist de Deployment Completo

- [ ] Variables de entorno configuradas en EasyPanel
- [ ] Puerto 80 usando `expose` en lugar de `ports`
- [ ] Dominio agregado en EasyPanel
- [ ] DNS configurado (A record apuntando a EasyPanel)
- [ ] SSL automático habilitado
- [ ] Todos los contenedores corriendo (docker ps)
- [ ] Frontend accesible en tu dominio
- [ ] Admin accesible en /admin
- [ ] API respondiendo en /api

---

## 🎯 Próximo Paso

Después de hacer **commit y push** de los cambios:

```bash
git add docker-compose.yml
git commit -m "Fix: Use expose instead of ports for EasyPanel compatibility"
git push origin main
```

**En EasyPanel:**
1. Espera el auto-deploy (o redeploy manualmente)
2. Ve a **Domains** → **Add Domain**
3. Configura tu dominio
4. ¡Listo! 🎉

---

## 💡 Nota Importante

- **EasyPanel maneja SSL automáticamente**, no necesitas configurar certificados
- **No expongas puertos 80/443 directamente** en docker-compose cuando uses EasyPanel
- **El proxy de EasyPanel** es el punto de entrada único para todo el tráfico

---

¿Todo claro? Haz el commit y configura tu dominio en EasyPanel! 🚀
