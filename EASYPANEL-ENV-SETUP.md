# 🔐 Configuración de Variables de Entorno en EasyPanel

## ⚠️ IMPORTANTE: Error "database is unhealthy"

Si ves el error `dependency failed to start: container law-firm-db is unhealthy`, significa que **PostgreSQL no puede iniciar** porque le faltan las variables de entorno.

---

## 📋 Variables Requeridas en EasyPanel

### **PASO 1: Ve a tu proyecto en EasyPanel**
1. Dashboard → Tu Proyecto → **Environment Variables**

### **PASO 2: Agrega estas variables UNA POR UNA**

```env
DB_USER=lawfirm
DB_PASSWORD=TU_PASSWORD_FUERTE_AQUI
JWT_SECRET=TU_JWT_SECRET_AQUI
NEXT_PUBLIC_API_URL=https://tudominio.com/api
API_BASE_URL=http://backend:8080
FRONTEND_URL=https://tudominio.com
HTTP_PORT=80
HTTPS_PORT=443
NODE_ENV=production
SPRING_PROFILES_ACTIVE=prod
```

---

## 🔑 Generar Contraseñas Seguras

### **Para DB_PASSWORD:**
```bash
# Opción 1: Generador online
https://passwordsgenerator.net/

# Opción 2: PowerShell (Windows)
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 20 | % {[char]$_})

# Opción 3: Manual
Ejemplo: Tr@baj0Legal2025!DB_Secure
```

### **Para JWT_SECRET:**
```bash
# PowerShell (Windows)
$bytes = New-Object byte[] 32
[Security.Cryptography.RNGCryptoServiceProvider]::Create().GetBytes($bytes)
[Convert]::ToBase64String($bytes)

# Bash/Linux
openssl rand -base64 32

# Resultado ejemplo:
x9K2mP8vQ3nL5wR7tY1uI4oP6aS8dF0gH2jK4lZ6xC8=
```

---

## 🌐 URLs según tu dominio

### **Si tu dominio es: abogadosgarcia.com**
```env
NEXT_PUBLIC_API_URL=https://abogadosgarcia.com/api
FRONTEND_URL=https://abogadosgarcia.com
```

### **Si usas subdominio: app.abogadosgarcia.com**
```env
NEXT_PUBLIC_API_URL=https://app.abogadosgarcia.com/api
FRONTEND_URL=https://app.abogadosgarcia.com
```

### **Para testing inicial (sin dominio)**
```env
NEXT_PUBLIC_API_URL=https://tu-proyecto.easypanel.host/api
FRONTEND_URL=https://tu-proyecto.easypanel.host
```

---

## ✅ Ejemplo Completo

```env
# Base de Datos
DB_USER=lawfirm
DB_PASSWORD=Tr@baj0Legal2025!DB_Secure

# JWT Secret (generado con comando)
JWT_SECRET=x9K2mP8vQ3nL5wR7tY1uI4oP6aS8dF0gH2jK4lZ6xC8=

# URLs (reemplaza con tu dominio real)
NEXT_PUBLIC_API_URL=https://belmontelucero.com/api
API_BASE_URL=http://backend:8080
FRONTEND_URL=https://belmontelucero.com

# Puertos
HTTP_PORT=80
HTTPS_PORT=443

# Entorno
NODE_ENV=production
SPRING_PROFILES_ACTIVE=prod
```

---

## 🚀 Después de Configurar Variables

1. **Guarda las variables** en EasyPanel
2. **Redeploy** el proyecto
3. Espera 2-3 minutos (el backend tarda en iniciar)
4. Verifica logs: EasyPanel → Logs → Selecciona `law-firm-db`

---

## 🔍 Verificar que PostgreSQL Funciona

### **En EasyPanel Terminal:**
```bash
# Ver logs de PostgreSQL
docker logs law-firm-db

# Debería mostrar:
# PostgreSQL init process complete; ready for start up.
# database system is ready to accept connections
```

### **Ver logs del backend:**
```bash
docker logs law-firm-backend

# Debería mostrar:
# Started Application in X seconds
# Default admin user created
```

---

## 🆘 Troubleshooting

### **Error: "container law-firm-db is unhealthy"**
✅ **Solución**: Verifica que `DB_PASSWORD` esté configurado en EasyPanel

### **Error: "FATAL: password authentication failed"**
✅ **Solución**: El `DB_PASSWORD` en EasyPanel no coincide con el del backend

### **Error: "Connection refused"**
✅ **Solución**: Espera 2 minutos, PostgreSQL tarda en iniciar

### **Error: "relation users does not exist"**
✅ **Solución**: El backend creará las tablas automáticamente, espera 30 segundos

---

## 📊 Orden de Inicio Correcto

```
1. PostgreSQL (law-firm-db)      ← 10-20 segundos
   ↓ Espera health check
   
2. Backend (law-firm-backend)     ← 30-60 segundos
   ↓ Crea tablas y admin user
   
3. Frontend (law-firm-frontend)   ← 5-10 segundos
   ↓
   
4. Nginx (law-firm-nginx)         ← 2-5 segundos
   ✅ Aplicación lista
```

**Tiempo total estimado**: 1-2 minutos

---

## 🎯 Checklist Final

- [ ] Variables de entorno agregadas en EasyPanel
- [ ] `DB_PASSWORD` diferente a "changeme"
- [ ] `JWT_SECRET` generado con comando seguro (32+ caracteres)
- [ ] URLs actualizadas con tu dominio real
- [ ] Proyecto redesplegado
- [ ] Esperado 2-3 minutos para inicio completo
- [ ] Logs verificados sin errores

---

## 📞 Credenciales de Acceso Inicial

Una vez desplegado correctamente:

**URL Admin:** https://tudominio.com/admin/login

**Credenciales:**
- Email: `natal00203@gmail.com`
- Password: `Mustafa1308`

⚠️ **CAMBIAR CONTRASEÑA INMEDIATAMENTE DESPUÉS DEL PRIMER LOGIN**

---

## 💡 Notas Importantes

1. **Las variables de entorno se aplican EN EL DEPLOY**, no afectan builds previos
2. **PostgreSQL usa volúmenes persistentes**, los datos no se pierden al redeploy
3. **El health check tarda 10 segundos** en validar que PostgreSQL está listo
4. **EasyPanel maneja SSL automáticamente**, no necesitas configurar certificados

---

¿Listo para configurar? Empieza por el **PASO 1** arriba ☝️
