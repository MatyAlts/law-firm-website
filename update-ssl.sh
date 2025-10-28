#!/bin/bash

# Script para actualizar certificados SSL

DOMAIN=$(grep "server_name" nginx/nginx.conf | grep -v "_" | awk '{print $2}' | sed 's/;//' | head -1)

if [ -z "$DOMAIN" ]; then
    echo "❌ No se pudo detectar el dominio"
    exit 1
fi

echo "🔄 Actualizando certificados SSL para $DOMAIN..."

# Copiar nuevos certificados
sudo cp /etc/letsencrypt/live/$DOMAIN/fullchain.pem nginx/ssl/cert.pem
sudo cp /etc/letsencrypt/live/$DOMAIN/privkey.pem nginx/ssl/key.pem

# Dar permisos
sudo chmod 644 nginx/ssl/cert.pem
sudo chmod 600 nginx/ssl/key.pem
sudo chown $USER:$USER nginx/ssl/*

# Recargar nginx
docker-compose exec nginx nginx -s reload

echo "✅ Certificados actualizados"
