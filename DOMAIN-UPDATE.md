# Actualización de Dominio - belmontesalafia.com

## Variables de Entorno a Actualizar en EasyPanel

Después de cambiar el dominio DNS a `belmontesalafia.com`, debes actualizar las siguientes variables de entorno en EasyPanel:

### 1. Variables del Frontend (servicio frontend)

```bash
NEXT_PUBLIC_API_URL=https://belmontesalafia.com/api
NODE_ENV=production
```

### 2. Variables del Backend (servicio backend)

```bash
APP_CORS_ALLOWED_ORIGINS=https://belmontesalafia.com
FRONTEND_URL=https://belmontesalafia.com
JWT_SECRET=x9K2mP8vQ3nL5wR7tY1uI4oP6aS8dF0gH2jK4lZ6xC8=
SPRING_JPA_HIBERNATE_DDL_AUTO=update
SPRING_JPA_SHOW_SQL=false

# Initial Admin Credentials (si aún los necesitas)
INITIAL_ADMIN_EMAIL=natal00203@gmail.com
INITIAL_ADMIN_PASSWORD=tu_contraseña_segura
INITIAL_ADMIN_ROLE=superadmin
```

### 3. Variables de Base de Datos (servicio postgres)

```bash
POSTGRES_DB=lawfirm
POSTGRES_USER=lawfirm
POSTGRES_PASSWORD=Tr@baj0Legal2025!PostgreSQL_Secure
PGDATA=/var/lib/postgresql/data/pgdata
```

### 4. Configuración del Dominio en EasyPanel

1. Ve a la configuración de tu aplicación en EasyPanel
2. En la sección de **Domains**, asegúrate de tener configurado:
   - `belmontesalafia.com`
   - `www.belmontesalafia.com` (opcional)
3. Verifica que el certificado SSL esté activo (Let's Encrypt)

## Pasos para Aplicar los Cambios

1. **Actualizar las variables de entorno** en cada servicio de EasyPanel
2. **Rebuild** de los servicios (o restart si solo cambiaste variables)
3. Esperar a que el certificado SSL se genere automáticamente
4. Verificar que el sitio carga correctamente en `https://belmontesalafia.com`

## Verificación

Después de aplicar los cambios, prueba:

- ✅ Acceder a `https://belmontesalafia.com`
- ✅ Iniciar sesión en `/admin/login`
- ✅ Crear/editar/eliminar blogs
- ✅ Cambiar contraseña en `/admin/users`
- ✅ Crear nuevos administradores
- ✅ Formulario de contacto

## Problemas Comunes

### Error 404 en `/api/admin/change-password`
- Verifica que `NEXT_PUBLIC_API_URL` esté configurada correctamente
- Debe ser: `https://belmontesalafia.com/api` o `https://belmontesalafia.com`

### Error 401 Unauthorized
- Verifica que `APP_CORS_ALLOWED_ORIGINS` incluya el nuevo dominio
- Debe ser: `https://belmontesalafia.com`

### Error de CORS
- Verifica que `FRONTEND_URL` esté actualizada
- Debe ser: `https://belmontesalafia.com`

## Rollback (Si algo falla)

Si necesitas volver al dominio anterior temporalmente:

```bash
# Frontend
NEXT_PUBLIC_API_URL=https://belmontelucero-app-web.326kz3.easypanel.host/api

# Backend  
APP_CORS_ALLOWED_ORIGINS=https://belmontelucero-app-web.326kz3.easypanel.host
FRONTEND_URL=https://belmontelucero-app-web.326kz3.easypanel.host
```

Luego rebuild de los servicios.
