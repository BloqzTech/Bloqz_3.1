#!/bin/bash

# Exit on error
set -e

# Load environment variables
source .env.production

# Build the application
echo "Building application..."
npm run build

# Build and push Docker images
echo "Building and pushing Docker images..."
docker-compose build
docker-compose push

# Deploy to production server
echo "Deploying to production..."
ssh $DEPLOY_USER@$DEPLOY_HOST << 'ENDSSH'
  cd /opt/bloqz
  
  # Pull latest images
  docker-compose pull
  
  # Update SSL certificates if needed
  if [ -f "/etc/letsencrypt/live/bloqz.xyz/fullchain.pem" ]; then
    cp /etc/letsencrypt/live/bloqz.xyz/fullchain.pem ./ssl/
    cp /etc/letsencrypt/live/bloqz.xyz/privkey.pem ./ssl/
  fi
  
  # Restart services
  docker-compose down
  docker-compose up -d
  
  # Verify deployment
  docker-compose ps
  
  # Check logs for errors
  docker-compose logs --tail=100
ENDSSH

# Run health checks
echo "Running health checks..."
curl -f https://bloqz.xyz/health
curl -f https://api.bloqz.xyz/health

echo "Deployment completed successfully!"
