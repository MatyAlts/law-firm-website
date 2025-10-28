# Configuración de Seguridad - Admin Panel

## Credenciales del Primer Administrador

### ⚠️ IMPORTANTE: Seguridad de Credenciales

Las credenciales del administrador inicial **YA NO están en el código fuente**. Ahora se configuran mediante variables de entorno, lo cual es mucho más seguro.

### Configuración en Producción (EasyPanel)

1. **En EasyPanel**, ve a tu aplicación y configura las siguientes variables de entorno:

```bash
INITIAL_ADMIN_EMAIL=tu-email@example.com
INITIAL_ADMIN_PASSWORD=TuContraseñaSegura123!
INITIAL_ADMIN_ROLE=superadmin
```

2. **Después del primer despliegue:**
   - El sistema creará automáticamente el primer admin con estas credenciales
   - Inicia sesión en `/admin/login`
   - Ve a `/admin/users`
   - **Cambia inmediatamente tu contraseña** usando el formulario "Cambiar Contraseña"
   - Opcionalmente, **elimina las variables** `INITIAL_ADMIN_EMAIL` y `INITIAL_ADMIN_PASSWORD` de EasyPanel

### Configuración en Desarrollo Local

1. Copia `.env.example` a `.env`:
```bash
cp .env.example .env
```

2. Edita `.env` y configura:
```bash
INITIAL_ADMIN_EMAIL=tu-email@example.com
INITIAL_ADMIN_PASSWORD=TuContraseñaLocal123
INITIAL_ADMIN_ROLE=superadmin
```

3. El `.env` está en `.gitignore` - **nunca lo subas a GitHub**

## Funcionalidades del Panel de Administración

### 1. Cambiar Contraseña
- Ve a `/admin/users`
- Usa el formulario "Cambiar Contraseña"
- Necesitas tu contraseña actual
- La nueva contraseña debe tener mínimo 8 caracteres

### 2. Crear Nuevos Administradores
- Ve a `/admin/users`
- Usa el formulario "Agregar Nuevo Admin"
- Puedes crear admins con diferentes roles:
  - **Editor**: Solo puede gestionar contenido (blogs)
  - **Admin**: Puede gestionar contenido y usuarios
  - **Super Admin**: Acceso completo (solo superadmins pueden crear otros superadmins)

### 3. Ver Administradores Existentes
- Lista todos los administradores del sistema
- Muestra email y rol de cada uno

## Mejores Prácticas de Seguridad

1. ✅ **Nunca subas el archivo `.env` a GitHub**
2. ✅ **Cambia la contraseña del admin inicial inmediatamente después del primer login**
3. ✅ **Usa contraseñas fuertes** (mínimo 8 caracteres, con mayúsculas, minúsculas, números y símbolos)
4. ✅ **Elimina las variables `INITIAL_ADMIN_*` del .env de producción** después de crear el primer admin
5. ✅ **Revisa periódicamente la lista de administradores** en `/admin/users`
6. ✅ **No compartas credenciales** - crea cuentas individuales para cada administrador

## Flujo Recomendado para Nuevo Despliegue

1. **Primera vez (EasyPanel)**:
   ```
   1. Configura INITIAL_ADMIN_EMAIL y INITIAL_ADMIN_PASSWORD en variables de entorno
   2. Despliega la aplicación
   3. El sistema crea el primer admin automáticamente
   4. Inicia sesión en /admin/login
   5. Ve a /admin/users y cambia tu contraseña
   6. (Opcional) Elimina las variables INITIAL_ADMIN_* de EasyPanel
   ```

2. **Agregar más administradores**:
   ```
   1. Inicia sesión como superadmin
   2. Ve a /admin/users
   3. Usa el formulario "Agregar Nuevo Admin"
   4. Los nuevos admins deben cambiar su contraseña en el primer login
   ```

## Solución de Problemas

### No puedo iniciar sesión
- Verifica que las variables de entorno estén configuradas correctamente
- Revisa los logs del backend para ver si el admin fue creado
- Si es necesario, elimina el volumen de PostgreSQL y vuelve a desplegar

### Olvidé mi contraseña
- Contacta a otro superadmin para que te restablezca la contraseña
- O reconfigura las variables `INITIAL_ADMIN_*` en EasyPanel y redespliega (esto actualizará la contraseña del admin con ese email)

### ¿Puedo tener múltiples superadmins?
- Sí, cualquier superadmin puede crear otros superadmins desde `/admin/users`
