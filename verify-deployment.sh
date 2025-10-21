#!/bin/bash

# ATG Chapel - Pre-Deployment Checklist Script
# Run this before deploying to catch common issues

echo "🔍 ATG Chapel - Pre-Deployment Verification"
echo "==========================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Counters
ERRORS=0
WARNINGS=0
SUCCESS=0

# Function to check file exists
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} $2"
        ((SUCCESS++))
    else
        echo -e "${RED}✗${NC} $2"
        ((ERRORS++))
    fi
}

# Function to check directory exists
check_dir() {
    if [ -d "$1" ]; then
        echo -e "${GREEN}✓${NC} $2"
        ((SUCCESS++))
    else
        echo -e "${RED}✗${NC} $2"
        ((ERRORS++))
    fi
}

# Function to warn about file
warn_file() {
    if [ -f "$1" ]; then
        echo -e "${YELLOW}⚠${NC} $2"
        ((WARNINGS++))
    else
        echo -e "${GREEN}✓${NC} $2"
        ((SUCCESS++))
    fi
}

echo "📁 Checking Project Structure..."
echo "-----------------------------------"
check_dir "server" "Server directory exists"
check_dir "client" "Client directory exists"
check_file "server/package.json" "Server package.json exists"
check_file "client/package.json" "Client package.json exists"
check_file "server/server.js" "Server main file exists"
check_file "client/vite.config.js" "Client Vite config exists"
echo ""

echo "🔐 Checking Environment Files..."
echo "-----------------------------------"
check_file "server/.env.example" "Server .env.example exists"
check_file "client/.env.example" "Client .env.example exists"
check_file "client/.env.production" "Client .env.production exists"
warn_file "server/.env" "Server .env should NOT be committed (ignored)"
warn_file "client/.env" "Client .env should NOT be committed (ignored)"
echo ""

echo "📋 Checking Deployment Configs..."
echo "-----------------------------------"
check_file "server/render.yaml" "Render config exists"
check_file "RENDER-DEPLOYMENT-GUIDE.md" "Deployment guide exists"
check_file "QUICK-DEPLOY-CHECKLIST.md" "Quick checklist exists"
echo ""

echo "🔍 Checking .gitignore Files..."
echo "-----------------------------------"
check_file "server/.gitignore" "Server .gitignore exists"
check_file "client/.gitignore" "Client .gitignore exists"

# Check if .env is ignored
if grep -q "^\.env$" server/.gitignore; then
    echo -e "${GREEN}✓${NC} Server .gitignore properly ignores .env"
    ((SUCCESS++))
else
    echo -e "${RED}✗${NC} Server .gitignore missing .env entry"
    ((ERRORS++))
fi

if grep -q "^\.env$" client/.gitignore; then
    echo -e "${GREEN}✓${NC} Client .gitignore properly ignores .env"
    ((SUCCESS++))
else
    echo -e "${RED}✗${NC} Client .gitignore missing .env entry"
    ((ERRORS++))
fi
echo ""

echo "📦 Checking Dependencies..."
echo "-----------------------------------"
cd server
if [ -f "package-lock.json" ] || [ -f "pnpm-lock.yaml" ]; then
    echo -e "${GREEN}✓${NC} Server has lock file"
    ((SUCCESS++))
else
    echo -e "${YELLOW}⚠${NC} Server missing lock file (run npm install)"
    ((WARNINGS++))
fi
cd ..

cd client
if [ -f "package-lock.json" ] || [ -f "pnpm-lock.yaml" ]; then
    echo -e "${GREEN}✓${NC} Client has lock file"
    ((SUCCESS++))
else
    echo -e "${YELLOW}⚠${NC} Client missing lock file (run npm install)"
    ((WARNINGS++))
fi
cd ..
echo ""

echo "🔧 Checking Server Configuration..."
echo "-----------------------------------"
if grep -q "cors" server/server.js; then
    echo -e "${GREEN}✓${NC} CORS configured in server"
    ((SUCCESS++))
else
    echo -e "${RED}✗${NC} CORS not found in server"
    ((ERRORS++))
fi

if grep -q "dotenv" server/server.js; then
    echo -e "${GREEN}✓${NC} dotenv configured"
    ((SUCCESS++))
else
    echo -e "${RED}✗${NC} dotenv not configured"
    ((ERRORS++))
fi
echo ""

echo "🎨 Checking Client Configuration..."
echo "-----------------------------------"
if grep -q "VITE_API_URL" client/.env.production; then
    echo -e "${GREEN}✓${NC} VITE_API_URL configured in .env.production"
    ((SUCCESS++))
else
    echo -e "${RED}✗${NC} VITE_API_URL missing in .env.production"
    ((ERRORS++))
fi

if grep -q "import.meta.env.VITE_API_URL" client/src/services/api.js; then
    echo -e "${GREEN}✓${NC} API service uses environment variable"
    ((SUCCESS++))
else
    echo -e "${YELLOW}⚠${NC} API service may not use environment variable"
    ((WARNINGS++))
fi
echo ""

echo "==========================================="
echo "📊 Summary:"
echo "-----------------------------------"
echo -e "${GREEN}✓ Success: $SUCCESS${NC}"
echo -e "${YELLOW}⚠ Warnings: $WARNINGS${NC}"
echo -e "${RED}✗ Errors: $ERRORS${NC}"
echo ""

if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}🎉 Ready for deployment!${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Commit and push to GitHub: git push origin main"
    echo "2. Follow RENDER-DEPLOYMENT-GUIDE.md"
    echo "3. Deploy backend to Render"
    echo "4. Deploy frontend to Netlify"
    exit 0
else
    echo -e "${RED}❌ Please fix errors before deploying${NC}"
    echo ""
    echo "Check RENDER-DEPLOYMENT-GUIDE.md for help"
    exit 1
fi
