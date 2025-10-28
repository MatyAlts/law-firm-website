@echo off
REM Script de verificación SEO post-deployment para Windows
REM Uso: verify-seo.bat

set DOMAIN=https://www.belmontesalafia.com

echo ==============================================
echo   Verificacion de configuracion SEO
echo ==============================================
echo.

echo Verificando archivos SEO principales...
echo ----------------------------------------------
echo.

echo [1/3] Verificando robots.txt...
curl -s -o nul -w "Status: %%{http_code}\n" %DOMAIN%/robots.txt
echo.

echo [2/3] Verificando sitemap.xml...
curl -s -o nul -w "Status: %%{http_code}\n" %DOMAIN%/sitemap.xml
echo.

echo [3/3] Verificando manifest.json...
curl -s -o nul -w "Status: %%{http_code}\n" %DOMAIN%/manifest.json
echo.

echo Verificando paginas principales...
echo ----------------------------------------------
echo.

echo [1/7] Pagina de inicio...
curl -s -o nul -w "Status: %%{http_code}\n" %DOMAIN%/
echo.

echo [2/7] Nosotros...
curl -s -o nul -w "Status: %%{http_code}\n" %DOMAIN%/nosotros
echo.

echo [3/7] Areas de practica...
curl -s -o nul -w "Status: %%{http_code}\n" %DOMAIN%/areas
echo.

echo [4/7] Blog...
curl -s -o nul -w "Status: %%{http_code}\n" %DOMAIN%/blog
echo.

echo [5/7] Contacto...
curl -s -o nul -w "Status: %%{http_code}\n" %DOMAIN%/contacto
echo.

echo [6/7] Aviso Legal...
curl -s -o nul -w "Status: %%{http_code}\n" %DOMAIN%/aviso-legal
echo.

echo [7/7] Politica de Privacidad...
curl -s -o nul -w "Status: %%{http_code}\n" %DOMAIN%/politica-privacidad
echo.

echo ==============================================
echo   Verificacion completada
echo ==============================================
echo.
echo PROXIMOS PASOS:
echo.
echo 1. Verificar manualmente:
echo    - %DOMAIN%/robots.txt
echo    - %DOMAIN%/sitemap.xml
echo.
echo 2. Configurar Google Search Console
echo    - https://search.google.com/search-console
echo.
echo 3. Enviar sitemap a Google
echo.
echo Ver SEO-SETUP.md para instrucciones detalladas.
echo.

pause
