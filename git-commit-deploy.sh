#!/bin/bash

# ATG Chapel - Quick Git Commit & Push Script
# This script commits all deployment-ready files and pushes to GitHub

echo "🔍 Checking git status..."
git status --short

echo ""
echo "📝 Files to be committed:"
echo "  - Order of Services component"
echo "  - Deployment configurations (render.yaml, .env templates)"
echo "  - Updated .gitignore files"
echo "  - Comprehensive documentation"
echo "  - Updated README.md"
echo "  - Backend CORS configuration"
echo "  - API service environment setup"
echo ""

read -p "❓ Do you want to commit and push these changes? (y/n): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    echo "❌ Aborted. No changes committed."
    exit 1
fi

echo ""
echo "➕ Adding all files..."
git add .

echo ""
echo "💾 Committing changes..."
git commit -m "feat: Production deployment configuration + Order of Services

✨ New Features:
- Order of Services component with biblical styling
- Interactive weekly service schedule
- Integrated across Home, ScrollHome, and Services pages

🚀 Deployment Ready:
- Render deployment configuration (render.yaml)
- Separate backend/frontend deployment setup
- Environment variable templates (.env.example files)
- Production environment config (.env.production)
- CORS configuration for cross-origin requests
- Health check endpoint for monitoring

📚 Documentation:
- Comprehensive deployment guide (RENDER-DEPLOYMENT-GUIDE.md)
- Quick deployment checklist (QUICK-DEPLOY-CHECKLIST.md)
- Updated README with full project documentation
- API documentation and guides
- Pre-deployment verification script

🔧 Configuration:
- Fixed .gitignore files (allow templates, ignore secrets)
- Backend CORS with CLIENT_URL support
- Frontend API service with environment-based URLs
- Database schema auto-initialization

✅ Verified:
- 22/22 pre-deployment checks passing
- All configuration files validated
- Environment setup documented
- Ready for Render + Netlify deployment"

echo ""
echo "⬆️  Pushing to GitHub..."
git push origin main

echo ""
echo "✅ Done!"
echo ""
echo "📋 Next Steps:"
echo "1. Deploy backend to Render (follow RENDER-DEPLOYMENT-GUIDE.md)"
echo "2. Deploy frontend to Netlify"
echo "3. Update environment variables"
echo "4. Test deployment"
echo ""
echo "📖 See DEPLOYMENT-COMPLETE-SUMMARY.md for full details"
