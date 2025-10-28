#!/bin/bash

# Script de backup de la base de datos

BACKUP_DIR="./backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/lawfirm_backup_$TIMESTAMP.sql"

# Crear directorio de backups si no existe
mkdir -p $BACKUP_DIR

echo "🗄️  Creando backup de la base de datos..."

# Realizar backup
docker exec law-firm-db pg_dump -U lawfirm lawfirm > $BACKUP_FILE

if [ $? -eq 0 ]; then
    echo "✅ Backup creado exitosamente: $BACKUP_FILE"
    
    # Comprimir backup
    gzip $BACKUP_FILE
    echo "📦 Backup comprimido: $BACKUP_FILE.gz"
    
    # Eliminar backups antiguos (mantener últimos 7 días)
    find $BACKUP_DIR -name "*.sql.gz" -mtime +7 -delete
    echo "🧹 Backups antiguos eliminados"
else
    echo "❌ Error al crear backup"
    exit 1
fi
