@echo off
REM Build script with admin privileges for Windows
REM This fixes EPERM symlink errors

echo ======================================
echo   Building with Admin Privileges
echo ======================================
echo.

REM Check if running as admin
net session >nul 2>&1
if %errorLevel% == 0 (
    echo [OK] Running as Administrator
    echo.
    pnpm run build
) else (
    echo [!] Not running as Administrator
    echo [i] Requesting admin privileges...
    echo.
    powershell -Command "Start-Process cmd -Verb RunAs -ArgumentList '/c cd /d %CD% && pnpm run build && pause'"
)

pause
