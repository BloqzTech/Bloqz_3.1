#!/bin/bash

# Exit on error
set -e

# Load environment variables
source .env

# Install certbot if not already installed
if ! command -v certbot &> /dev/null; then
    apt-get update
    apt-get install -y certbot python3-certbot-nginx
fi

# Stop nginx temporarily
systemctl stop nginx

# Get SSL certificate
certbot certonly --standalone \
    -d bloqz.xyz \
    -d www.bloqz.xyz \
    -d api.bloqz.xyz \
    --email admin@bloqz.xyz \
    --agree-tos \
    --non-interactive

# Copy certificates to nginx directory
mkdir -p /etc/nginx/ssl
cp /etc/letsencrypt/live/bloqz.xyz/fullchain.pem /etc/nginx/ssl/
cp /etc/letsencrypt/live/bloqz.xyz/privkey.pem /etc/nginx/ssl/

# Set proper permissions
chmod 600 /etc/nginx/ssl/*

# Start nginx
systemctl start nginx

# Setup auto-renewal
cat > /etc/cron.d/certbot-renewal << EOF
0 0 1 * * root certbot renew --quiet --post-hook "systemctl reload nginx"
EOF

echo "SSL certificates have been set up successfully!"
