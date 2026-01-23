# Quick Deployment Guide

## 🚀 Fastest Deployment Options

### Option 1: Vercel (Recommended - 5 minutes)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd deepsync-core-ui
vercel

# Follow prompts, then:
vercel --prod
```

**That's it!** Your app will be live at `https://your-app.vercel.app`

---

### Option 2: Netlify (5 minutes)

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
cd deepsync-core-ui
npm run build
netlify deploy --prod --dir=dist
```

---

### Option 3: Docker (For Kubernetes/Container Platforms)

```bash
# Build image
docker build -t deepsync-core-ui:latest .

# Run locally
docker run -p 8080:80 deepsync-core-ui:latest

# Push to registry
docker tag deepsync-core-ui:latest your-registry/deepsync-core-ui:v1.0.0
docker push your-registry/deepsync-core-ui:v1.0.0
```

---

### Option 4: AWS S3 + CloudFront (Enterprise)

```bash
# Build
npm run build

# Deploy to S3
aws s3 sync dist/ s3://your-bucket-name --delete

# Invalidate CloudFront
aws cloudfront create-invalidation \
  --distribution-id YOUR_DIST_ID \
  --paths "/*"
```

---

## 📋 Pre-Deployment Checklist

- [ ] Run `npm run build` successfully
- [ ] Test with `npm run preview`
- [ ] Set environment variables
- [ ] Configure API endpoints
- [ ] Test all routes work
- [ ] Verify HTTPS/SSL
- [ ] Check mobile responsiveness

---

## 🔧 Environment Variables

Create `.env.production`:

```env
VITE_API_URL=https://api.yourdomain.com
VITE_APP_NAME=Deep Sync
```

Access in code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL
```

---

## 📦 Build Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

---

## 🎯 Recommended Strategy

**For Quick Start:** Use **Vercel** or **Netlify**

**For Production:** 
- Small/Medium: **Vercel** or **Netlify**
- Enterprise: **AWS S3 + CloudFront**
- Container-based: **Docker + Kubernetes**

See `DEPLOYMENT.md` for detailed instructions.
