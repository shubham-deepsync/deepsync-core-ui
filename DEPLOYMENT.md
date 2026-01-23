# Frontend Deployment Strategies

This document outlines various deployment strategies for the DeepSync Core UI application.

## 📦 Build Process

First, create a production build:

```bash
npm run build
```

This creates an optimized `dist/` folder with:
- Minified JavaScript and CSS
- Tree-shaken dependencies
- Optimized assets
- Production-ready code

---

## 🚀 Deployment Options

### 1. **Vercel** (Recommended for React/Vite)

**Pros:**
- Zero-config deployment
- Automatic HTTPS
- Global CDN
- Preview deployments for PRs
- Free tier available

**Steps:**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Or connect GitHub repo for automatic deployments
```

**Configuration (`vercel.json`):**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

**Environment Variables:**
- Set in Vercel dashboard
- Access via `import.meta.env.VITE_API_URL`

---

### 2. **Netlify**

**Pros:**
- Easy GitHub integration
- Free tier
- Form handling
- Serverless functions support

**Steps:**
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

**Configuration (`netlify.toml`):**
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

---

### 3. **AWS S3 + CloudFront**

**Pros:**
- Enterprise-grade
- Highly scalable
- Custom domain support
- Cost-effective for high traffic

**Steps:**

1. **Build the app:**
```bash
npm run build
```

2. **Upload to S3:**
```bash
# Install AWS CLI
aws s3 sync dist/ s3://your-bucket-name --delete

# Or use AWS Console
```

3. **Configure S3 Bucket:**
- Enable static website hosting
- Set index document: `index.html`
- Set error document: `index.html` (for SPA routing)

4. **Set up CloudFront:**
- Create distribution
- Point to S3 bucket
- Configure custom domain
- Set up SSL certificate

**CloudFront Cache Invalidation:**
```bash
aws cloudfront create-invalidation \
  --distribution-id YOUR_DIST_ID \
  --paths "/*"
```

**IAM Policy Example:**
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject"
      ],
      "Resource": "arn:aws:s3:::your-bucket-name/*"
    }
  ]
}
```

---

### 4. **Docker + Container Registry**

**Pros:**
- Consistent environments
- Easy scaling
- Works with Kubernetes
- Version control for deployments

**Dockerfile:**
```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the app
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built files
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

**nginx.conf:**
```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

**Build and Deploy:**
```bash
# Build Docker image
docker build -t deepsync-core-ui:latest .

# Tag for registry
docker tag deepsync-core-ui:latest your-registry/deepsync-core-ui:v1.0.0

# Push to registry
docker push your-registry/deepsync-core-ui:v1.0.0

# Deploy to server/Kubernetes
kubectl apply -f deployment.yaml
```

---

### 5. **Traditional Web Server (Nginx/Apache)**

**Nginx Configuration:**
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    root /var/www/deepsync-core-ui/dist;
    index index.html;

    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

**Deployment Script:**
```bash
#!/bin/bash
# deploy.sh

# Build
npm run build

# Copy to server
rsync -avz --delete dist/ user@server:/var/www/deepsync-core-ui/

# Restart nginx
ssh user@server "sudo systemctl reload nginx"
```

---

### 6. **GitHub Pages**

**Pros:**
- Free hosting
- Easy setup
- Automatic deployments

**Steps:**

1. **Install gh-pages:**
```bash
npm install --save-dev gh-pages
```

2. **Update `package.json`:**
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://yourusername.github.io/deepsync-core-ui"
}
```

3. **Deploy:**
```bash
npm run deploy
```

4. **Update `vite.config.ts`:**
```typescript
export default defineConfig({
  base: '/deepsync-core-ui/', // Your repo name
  // ... rest of config
})
```

---

## 🔄 CI/CD Strategies

### GitHub Actions

**.github/workflows/deploy.yml:**
```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
        env:
          VITE_API_URL: ${{ secrets.VITE_API_URL }}
      
      - name: Deploy to S3
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1
      
      - name: Sync to S3
        run: aws s3 sync dist/ s3://your-bucket-name --delete
      
      - name: Invalidate CloudFront
        run: aws cloudfront create-invalidation --distribution-id ${{ secrets.CLOUDFRONT_DIST_ID }} --paths "/*"
```

### GitLab CI/CD

**.gitlab-ci.yml:**
```yaml
stages:
  - build
  - deploy

build:
  stage: build
  image: node:18
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - dist/
    expire_in: 1 hour

deploy:
  stage: deploy
  image: alpine:latest
  script:
    - apk add --no-cache aws-cli
    - aws s3 sync dist/ s3://your-bucket-name --delete
    - aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_DIST_ID --paths "/*"
  only:
    - main
```

---

## 🔐 Environment Configuration

### Environment Variables

Create `.env.production`:
```env
VITE_API_URL=https://api.yourdomain.com
VITE_APP_NAME=Deep Sync
VITE_ENABLE_ANALYTICS=true
```

Access in code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL
```

**Important:** Only variables prefixed with `VITE_` are exposed to the client.

---

## 📊 Performance Optimization

### 1. **Code Splitting**
Already handled by Vite automatically.

### 2. **Lazy Loading Routes**
```typescript
import { lazy, Suspense } from 'react'

const Intelligence = lazy(() => import('./pages/Intelligence/Intelligence'))

<Suspense fallback={<div>Loading...</div>}>
  <Intelligence />
</Suspense>
```

### 3. **Asset Optimization**
- Images: Use WebP format
- Fonts: Preload critical fonts
- Bundle analysis: `npm run build -- --analyze`

---

## 🧪 Pre-Deployment Checklist

- [ ] Run `npm run build` successfully
- [ ] Test production build locally: `npm run preview`
- [ ] Verify all environment variables are set
- [ ] Check API endpoints are correct
- [ ] Test routing (all pages accessible)
- [ ] Verify HTTPS is enabled
- [ ] Check browser console for errors
- [ ] Test on multiple browsers
- [ ] Verify mobile responsiveness
- [ ] Check loading performance
- [ ] Set up error tracking (Sentry, etc.)
- [ ] Configure analytics
- [ ] Set up monitoring/alerts

---

## 🚨 Rollback Strategy

### Quick Rollback Options:

1. **Vercel/Netlify:** Use dashboard to revert to previous deployment
2. **S3:** Keep previous version in separate folder, swap on rollback
3. **Docker:** Tag previous image, redeploy
4. **Git:** Revert commit and redeploy

### Rollback Script:
```bash
#!/bin/bash
# rollback.sh

PREVIOUS_VERSION=$1

# Restore previous build
aws s3 sync s3://your-bucket-name/versions/$PREVIOUS_VERSION/ s3://your-bucket-name/ --delete

# Invalidate cache
aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_DIST_ID --paths "/*"
```

---

## 📈 Monitoring & Analytics

### Recommended Tools:
- **Error Tracking:** Sentry
- **Analytics:** Google Analytics, Plausible
- **Performance:** Lighthouse CI, WebPageTest
- **Uptime:** Pingdom, UptimeRobot

### Setup Example (Sentry):
```typescript
// src/main.tsx
import * as Sentry from "@sentry/react"

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE,
  tracesSampleRate: 1.0,
})
```

---

## 💰 Cost Comparison

| Platform | Free Tier | Paid Tier | Best For |
|----------|-----------|-----------|----------|
| Vercel | 100GB bandwidth | $20/month | Small to medium apps |
| Netlify | 100GB bandwidth | $19/month | Small to medium apps |
| AWS S3+CF | Pay per use | ~$1-5/month | Enterprise, high traffic |
| GitHub Pages | Unlimited | Free | Open source projects |
| Docker/K8s | Self-hosted | Infrastructure costs | Enterprise, full control |

---

## 🎯 Recommended Strategy

**For Development/Staging:**
- Use **Vercel** or **Netlify** for quick deployments

**For Production:**
- **Small to Medium:** Vercel or Netlify
- **Enterprise/High Traffic:** AWS S3 + CloudFront
- **Full Control:** Docker + Kubernetes

**Hybrid Approach:**
- Use Vercel for preview deployments (PRs)
- Use AWS for production with custom domain

---

## 📝 Next Steps

1. Choose your deployment platform
2. Set up CI/CD pipeline
3. Configure environment variables
4. Set up monitoring
5. Create deployment documentation for your team
6. Test deployment process
7. Schedule regular security updates
