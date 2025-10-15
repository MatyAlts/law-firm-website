# Law firm website

*Automatically synced with your [v0.app](https://v0.app) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/matias-torres-projects-e97d8146/v0-law-firm-website)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/projects/JWelCWwnlkO)

## Overview

This repository will stay in sync with your deployed chats on [v0.app](https://v0.app).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.app](https://v0.app).

## Backend en Java

El proyecto incluye un backend desarrollado con Spring Boot en el directorio [`backend/`](backend/). Para ejecutarlo necesitas una base de datos PostgreSQL local y Java 17.

1. Crea una base de datos llamada `lawfirm` y actualiza las credenciales en [`backend/src/main/resources/application.yml`](backend/src/main/resources/application.yml).
2. Establece una variable de entorno `APP_JWT_SECRET` con una cadena segura de al menos 32 caracteres.
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
