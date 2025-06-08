# Deployment Guide

This guide explains how to deploy the Rago Meditation Server to various environments.

## Prerequisites

- Docker and Docker Compose installed
- Access to a cloud provider (AWS, GCP, Azure, etc.)
- Domain name (optional but recommended)
- SSL/TLS certificates (can be obtained via Let's Encrypt)

## Environment Variables

Create a `.env.production` file with your production configuration:

```env
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb://mongodb:27017/meditation_prod
JWT_SECRET=your_secure_jwt_secret
JWT_ACCESS_EXPIRATION_MINUTES=15
JWT_REFRESH_EXPIRATION_DAYS=30
REDIS_URL=redis://redis:6379
CORS_ORIGIN=https://your-frontend-domain.com
```

## Docker Deployment

### 1. Build the Docker Image

```bash
docker-compose -f docker-compose.prod.yml build
```

### 2. Start the Services

```bash
docker-compose -f docker-compose.prod.yml up -d
```

### 3. View Logs

```bash
docker-compose -f docker-compose.prod.yml logs -f
```

## Kubernetes Deployment

### 1. Create Kubernetes Secrets

```bash
kubectl create secret generic meditation-secrets \
  --from-literal=jwt-secret=your_secure_jwt_secret \
  --from-literal=mongodb-uri=mongodb://mongodb:27017/meditation_prod
```

### 2. Deploy MongoDB

```bash
kubectl apply -f k8s/mongodb/
```

### 3. Deploy Redis

```bash
kubectl apply -f k8s/redis/
```

### 4. Deploy the Application

```bash
kubectl apply -f k8s/app/
```

## Environment Setup

### Production

1. **Server Requirements**
   - 2+ vCPUs
   - 4GB+ RAM
   - 20GB+ disk space
   - Ubuntu 20.04/22.04 LTS

2. **Security**
   - Configure firewall (UFW)
   - Set up SSH key authentication
   - Disable root login
   - Enable automatic security updates

3. **Monitoring**
   - Set up PM2 for process management
   - Configure log rotation
   - Set up monitoring (e.g., PM2 monitoring, New Relic, Datadog)

## CI/CD Pipeline

The project includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that automates the deployment process:

1. **On push to `main` branch**
   - Run tests
   - Build Docker image
   - Push to container registry
   - Deploy to staging

2. **On tag creation (v*)**
   - Run tests
   - Build production Docker image
   - Push to container registry
   - Deploy to production

## Database Management

### Backups

```bash
# Create backup
mongodump --uri=$MONGODB_URI --archive=backup-$(date +%Y%m%d).archive

# Restore from backup
mongorestore --uri=$MONGODB_URI --archive=backup-20230608.archive
```

### Migrations

Use `migrate-mongo` for database migrations:

```bash
# Create a new migration
npx migrate-mongo create add_user_preferences

# Run pending migrations
npx migrate-mongo up

# Revert the last migration
npx migrate-mongo down
```

## Scaling

### Horizontal Scaling

1. **Application**
   - Use a load balancer (Nginx, HAProxy)
   - Scale application instances
   - Configure session management

2. **Database**
   - Set up replica sets
   - Enable sharding for large datasets
   - Configure read preferences

### Caching

1. **Redis**
   - Cache frequently accessed data
   - Implement rate limiting
   - Use for session storage

## Monitoring and Logging

### Application Logs

```bash
# View logs
docker-compose -f docker-compose.prod.yml logs -f

# View logs in Kubernetes
kubectl logs -f deployment/meditation-app
```

### Metrics

- **Node.js Metrics**: Prometheus and Grafana
- **Database Metrics**: MongoDB Atlas or Ops Manager
- **Infrastructure Metrics**: Cloud provider monitoring

## Disaster Recovery

1. **Backup Strategy**
   - Daily database backups
   - Regular volume snapshots
   - Off-site backup storage

2. **Recovery Plan**
   - Document recovery procedures
   - Regular recovery testing
   - Keep backup credentials secure

## Security Best Practices

1. **Docker Security**
   - Use non-root users in containers
   - Scan images for vulnerabilities
   - Keep images updated

2. **Kubernetes Security**
   - Enable RBAC
   - Use network policies
   - Enable pod security policies

3. **Application Security**
   - Regular dependency updates
   - Security headers
   - Rate limiting
   - Input validation

## Troubleshooting

### Common Issues

1. **Connection Refused**
   - Check if the service is running
   - Verify network policies
   - Check firewall settings

2. **High CPU/Memory Usage**
   - Check for memory leaks
   - Optimize database queries
   - Scale resources

3. **Failed Deployments**
   - Check container logs
   - Verify environment variables
   - Check resource limits

## Rollback Procedure

### Kubernetes

```bash
# Rollback to previous deployment
kubectl rollout undo deployment/meditation-app

# Check rollout status
kubectl rollout status deployment/meditation-app
```

### Docker Compose

```bash
# Revert to previous image
docker-compose -f docker-compose.prod.yml pull
docker-compose -f docker-compose.prod.yml up -d
```

## Maintenance

### Scheduled Maintenance

1. **Database Maintenance**
   - Regular index optimization
   - Data cleanup
   - Performance tuning

2. **Application Maintenance**
   - Dependency updates
   - Security patches
   - Performance optimization

### Upgrade Procedure

1. **Backup**
   - Database backup
   - Configuration backup
   - Volume snapshots

2. **Deploy New Version**
   - Update Docker images
   - Apply database migrations
   - Verify functionality

3. **Rollback Plan**
   - Document rollback steps
   - Test rollback procedure
   - Keep previous versions available
