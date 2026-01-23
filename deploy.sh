#!/bin/bash

# Deployment script for DeepSync Core UI
# Usage: ./deploy.sh [environment]
# Example: ./deploy.sh production

set -e  # Exit on error

ENVIRONMENT=${1:-production}
BUILD_DIR="dist"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

echo "🚀 Starting deployment for environment: $ENVIRONMENT"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js and npm are installed${NC}"

# Install dependencies
echo -e "${YELLOW}📦 Installing dependencies...${NC}"
npm ci

# Run tests (if you have them)
# echo -e "${YELLOW}🧪 Running tests...${NC}"
# npm test

# Build the application
echo -e "${YELLOW}🔨 Building application...${NC}"
npm run build

# Check if build was successful
if [ ! -d "$BUILD_DIR" ]; then
    echo -e "${RED}❌ Build failed - dist directory not found${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Build successful${NC}"

# Deployment targets (uncomment based on your setup)

# Option 1: AWS S3 + CloudFront
# if [ "$ENVIRONMENT" == "production" ]; then
#     echo -e "${YELLOW}☁️  Deploying to AWS S3...${NC}"
#     aws s3 sync $BUILD_DIR/ s3://your-bucket-name --delete
#     
#     echo -e "${YELLOW}🔄 Invalidating CloudFront cache...${NC}"
#     aws cloudfront create-invalidation \
#         --distribution-id YOUR_DISTRIBUTION_ID \
#         --paths "/*"
#     
#     echo -e "${GREEN}✅ Deployment complete${NC}"
# fi

# Option 2: Docker
# echo -e "${YELLOW}🐳 Building Docker image...${NC}"
# docker build -t deepsync-core-ui:$TIMESTAMP .
# docker tag deepsync-core-ui:$TIMESTAMP deepsync-core-ui:latest
# 
# echo -e "${YELLOW}📤 Pushing to registry...${NC}"
# docker push deepsync-core-ui:$TIMESTAMP
# docker push deepsync-core-ui:latest

# Option 3: Rsync to server
# echo -e "${YELLOW}📤 Deploying to server...${NC}"
# rsync -avz --delete $BUILD_DIR/ user@server:/var/www/deepsync-core-ui/
# ssh user@server "sudo systemctl reload nginx"

# Option 4: Vercel
# echo -e "${YELLOW}☁️  Deploying to Vercel...${NC}"
# vercel --prod

# Option 5: Netlify
# echo -e "${YELLOW}☁️  Deploying to Netlify...${NC}"
# netlify deploy --prod --dir=$BUILD_DIR

echo -e "${GREEN}✅ Deployment script completed${NC}"
echo -e "${YELLOW}⚠️  Remember to configure your deployment target above${NC}"
