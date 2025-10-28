#!/bin/bash

# Script para configurar SSL con Let's Encrypt

DOMAIN=$1
EMAIL=$2

if [ -z "$DOMAIN" ] || [ -z "$EMAIL" ]; then
    echo "Uso: ./setup-ssl.sh tudominio.com tu@email.com"
    exit 1
fi

echo "🔒 Configurando SSL para $DOMAIN..."

# Detener nginx temporalmente
docker-compose stop nginx

# Instalar certbot si no existe
if ! command -v certbot &> /dev/null; then
    echo "📦 Instalando certbot..."
    sudo apt-get update
    sudo apt-get install -y certbot
fi

# Obtener certificado
echo "📜 Obteniendo certificado SSL..."
sudo certbot certonly --standalone \
    -d $DOMAIN \
    -d www.$DOMAIN \
    --email $EMAIL \
    --agree-tos \
    --non-interactive

if [ $? -eq 0 ]; then
    echo "✅ Certificado obtenido exitosamente"
    
    # Crear directorio ssl si no existe
    mkdir -p nginx/ssl
    
    # Copiar certificados
    sudo cp /etc/letsencrypt/live/$DOMAIN/fullchain.pem nginx/ssl/cert.pem
    sudo cp /etc/letsencrypt/live/$DOMAIN/privkey.pem nginx/ssl/key.pem
    
    # Dar permisos correctos
    sudo chmod 644 nginx/ssl/cert.pem
    sudo chmod 600 nginx/ssl/key.pem
    sudo chown $USER:$USER nginx/ssl/*
    
    echo "📝 Certificados copiados a nginx/ssl/"
    
    # Actualizar nginx.conf para usar HTTPS
    echo "⚙️  Activando HTTPS en nginx..."
    sed -i 's/# return 301 https/return 301 https/g' nginx/nginx.conf
    sed -i 's/# server {/server {/g' nginx/nginx.conf
    sed -i 's/# listen 443/listen 443/g' nginx/nginx.conf
    
    # Reiniciar nginx
    docker-compose up -d nginx
    
    echo ""
    echo "✅ SSL configurado exitosamente!"
    echo ""
    echo "🌐 Tu sitio ahora está disponible en:"
    echo "   https://$DOMAIN"
    echo "   https://www.$DOMAIN"
    echo ""
    echo "🔄 Renovación automática:"
    echo "   Agrega esto al crontab (crontab -e):"
    echo "   0 0 1 * * certbot renew --quiet && ./update-ssl.sh"
    
else
    echo "❌ Error al obtener certificado"
    docker-compose up -d nginx
    exit 1
fi
