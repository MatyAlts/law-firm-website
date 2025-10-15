# Law firm website

*Automatically synced with your [v0.app](https://v0.app) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/matias-torres-projects-e97d8146/v0-law-firm-website)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/projects/JWelCWwnlkO)

## Overview

This repository will stay in sync with your deployed chats on [v0.app](https://v0.app).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.app](https://v0.app).

## Variables de entorno

El proyecto utiliza variables de entorno tanto para el frontend de Next.js como para el backend de Spring Boot. Puedes usar el archivo [`.env.example`](.env.example) como referencia y copiarlo a un archivo `.env` o `.env.local` según tu preferencia:

```bash
cp .env.example .env.local
```

Las variables incluidas son:

- `NEXT_PUBLIC_API_BASE_URL`: URL base del backend que consume el frontend. Por defecto apunta a `http://localhost:8080/api`.
- `NEXT_PUBLIC_SITE_URL`: URL pública del sitio, utilizada para redirecciones en el panel administrativo.
- `APP_JWT_SECRET`: clave secreta utilizada por el backend para firmar y validar JWT. Debe ser una cadena segura de al menos 32 caracteres.
- `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`: credenciales sugeridas para la base de datos local de PostgreSQL. Puedes ajustarlas según tu configuración.

## Backend en Java

El proyecto incluye un backend desarrollado con Spring Boot en el directorio [`backend/`](backend/). Para ejecutarlo necesitas una base de datos PostgreSQL local y Java 17.

1. Crea una base de datos llamada `lawfirm` y actualiza las credenciales en [`backend/src/main/resources/application.yml`](backend/src/main/resources/application.yml).
2. Establece una variable de entorno `APP_JWT_SECRET` con una cadena segura de al menos 32 caracteres (puedes reutilizar la definida en tu `.env`).
3. Desde la carpeta `backend/` ejecuta:

   ```bash
   mvn spring-boot:run
   ```

También puedes iniciar el backend con `pnpm backend`, que ejecuta el comando anterior.

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
