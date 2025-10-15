# Law firm website

*Automatically synced with your [v0.app](https://v0.app) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/matias-torres-projects-e97d8146/v0-law-firm-website)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/projects/JWelCWwnlkO)

## Overview

This repository will stay in sync with your deployed chats on [v0.app](https://v0.app).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.app](https://v0.app).

## Variables de entorno

El proyecto utiliza variables de entorno tanto para el frontend de Next.js como para el backend en Java. Puedes usar el archivo [`.env.example`](.env.example) como referencia y copiarlo a un archivo `.env` o `.env.local` según tu preferencia:

```bash
cp .env.example .env.local
```

Las variables incluidas son:

- `NEXT_PUBLIC_API_BASE_URL`: URL base del backend que consume el frontend. Por defecto apunta a `http://localhost:8080/api`.
- `NEXT_PUBLIC_SITE_URL`: URL pública del sitio, utilizada para redirecciones en el panel administrativo.
- `APP_JWT_SECRET`: clave secreta utilizada por el backend para firmar y validar JWT. Debe ser una cadena segura de al menos 32 caracteres.
- `APP_JWT_EXPIRATION_MINUTES`: duración del token JWT en minutos. Valor sugerido: `60`.
- `BACKEND_SERVER_PORT`: puerto en el que se ejecuta el servidor Java (por defecto `8080`).
- `BACKEND_DB_HOST`, `BACKEND_DB_PORT`, `BACKEND_DB_NAME`, `BACKEND_DB_USER`, `BACKEND_DB_PASSWORD`: configuración de conexión a PostgreSQL.
- `BACKEND_ADMIN_DEFAULT_EMAIL`, `BACKEND_ADMIN_DEFAULT_PASSWORD`: credenciales del usuario administrador que se crea automáticamente al iniciar el backend por primera vez.

## Backend en Java puro

El backend reside en [`backend/`](backend/) y está implementado únicamente con el JDK 17 y el cliente de línea de comandos `psql`. No depende de Maven ni de bibliotecas externas, por lo que solo necesitas tener disponibles:

- Java 17 (`javac` y `java`).
- PostgreSQL en ejecución y el comando `psql` accesible en tu `PATH`.

Para preparar la base de datos puedes ejecutar, con un usuario con privilegios de superusuario:

```sql
CREATE DATABASE lawfirm;
CREATE USER lawfirm WITH PASSWORD 'lawfirm';
GRANT ALL PRIVILEGES ON DATABASE lawfirm TO lawfirm;
```

Asegúrate de ajustar los valores en tu archivo `.env` si utilizas credenciales distintas.

Con la base de datos lista, inicia el backend con:

```bash
pnpm backend
```

El script `pnpm backend` compila los fuentes con `javac` y levanta el servidor Java en el puerto configurado (8080 por defecto). También puedes ejecutarlo manualmente con `./backend/run.sh`.

> ℹ️ La primera vez que se inicia el backend se crea automáticamente un usuario administrador usando las variables `BACKEND_ADMIN_DEFAULT_EMAIL` y `BACKEND_ADMIN_DEFAULT_PASSWORD`.

El backend expone los endpoints bajo `http://localhost:8080/api`. El frontend espera que esta URL se configure en la variable `NEXT_PUBLIC_API_BASE_URL` (por defecto apunta a `http://localhost:8080/api`).

## Deployment

Your project is live at:

**[https://vercel.com/matias-torres-projects-e97d8146/v0-law-firm-website](https://vercel.com/matias-torres-projects-e97d8146/v0-law-firm-website)**

## Build your app

Continue building your app on:

**[https://v0.app/chat/projects/JWelCWwnlkO](https://v0.app/chat/projects/JWelCWwnlkO)**

## How It Works

1. Create and modify your project using [v0.app](https://v0.app)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository
