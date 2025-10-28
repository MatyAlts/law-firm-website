@echo off
REM Script de despliegue para Windows

echo 🚀 Iniciando despliegue...

REM Verificar que existe .env
if not exist .env (
    echo ❌ Error: Archivo .env no encontrado
    echo Copia .env.example a .env y configura las variables
    exit /b 1
)

REM Detener servicios existentes
echo ⏸️  Deteniendo servicios existentes...
docker-compose -f docker-compose.yml -f docker-compose.local.yml down

REM Construir imágenes
echo 🔨 Construyendo imágenes Docker...
docker-compose -f docker-compose.yml -f docker-compose.local.yml build --no-cache

if errorlevel 1 (
    echo ❌ Error al construir las imágenes
    exit /b 1
)

REM Iniciar servicios
echo 🚀 Iniciando servicios...
docker-compose -f docker-compose.yml -f docker-compose.local.yml up -d

if errorlevel 1 (
    echo ❌ Error al iniciar los servicios
    exit /b 1
)

REM Esperar a que los servicios estén listos
echo ⏳ Esperando a que los servicios estén listos...
timeout /t 10 /nobreak >nul

REM Verificar estado de los servicios
echo 📊 Estado de los servicios:
docker-compose -f docker-compose.yml -f docker-compose.local.yml ps

echo.
echo ✅ Despliegue completado!
echo.
echo 📝 Accede a tu aplicación en:
echo    Frontend: http://localhost
echo    Admin Panel: http://localhost/admin
echo    API: http://localhost/api
echo.
echo 📋 Ver logs: docker-compose -f docker-compose.yml -f docker-compose.local.yml logs -f
echo 🛑 Detener: docker-compose -f docker-compose.yml -f docker-compose.local.yml down

pause
