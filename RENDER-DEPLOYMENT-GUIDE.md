# 🚀 Render Deployment Guide - ATG Chapel Application

## Overview
This guide will walk you through deploying the ATG Chapel application on Render with separate deployments for the backend (server) and frontend (client).

---

## 📋 Prerequisites

1. **GitHub Account** with the repository pushed
2. **Render Account** (free tier available at https://render.com)
3. **PostgreSQL Database** (Neon DB already configured)
4. **Gmail Account** with App Password for SMTP

---

## 🗄️ Part 1: Backend (Server) Deployment

### Step 1: Create New Web Service

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `atg-chapel-api` (or your preferred name)
   - **Region**: Choose closest to you (e.g., Oregon)
   - **Branch**: `main`
   - **Root Directory**: `server`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

### Step 2: Configure Environment Variables

In the Render dashboard, go to **Environment** tab and add these variables:

```bash
NODE_ENV=production
PORT=5000

# Database (Your existing Neon DB)
DATABASE_URL=postgresql://neondb_owner:npg_JFB6SNn8uezj@ep-dawn-snow-adrw7o21-pooler.c-2.us-east-1.aws.neon.tech/atg_db?sslmode=require&channel_binding=require

# CORS - Add your frontend URL after deploying client
CLIENT_URL=https://your-frontend-app.netlify.app

# SMTP Configuration (Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password

# Admin Configuration
RECEIVING_EMAIL=admin@atgchapel.org
ADMIN_EMAIL=admin@atgchapel.org
```

**Important Notes:**
- For Gmail SMTP, you need an **App Password**, not your regular password
- Enable 2-Factor Authentication on your Google account
- Generate App Password: https://myaccount.google.com/apppasswords
- Update `CLIENT_URL` after deploying the frontend

### Step 3: Deploy

1. Click **"Create Web Service"**
2. Wait for the build to complete (5-10 minutes)
3. Your backend will be available at: `https://atg-chapel-api.onrender.com`
4. Test the health endpoint: `https://your-app.onrender.com/api/health`

---

## 🎨 Part 2: Frontend (Client) Deployment

You have two options for deploying the frontend:

### Option A: Netlify (Recommended - Easier)

#### Step 1: Prepare the Client

1. Update `.env.production` with your backend URL:
```bash
VITE_API_URL=https://atg-chapel-api.onrender.com
```

2. Test the build locally:
```bash
cd client
npm run build
```

#### Step 2: Deploy to Netlify

**Via Netlify UI:**
1. Go to [Netlify](https://app.netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect your GitHub repository
4. Configure:
   - **Base directory**: `client`
   - **Build command**: `npm run build`
   - **Publish directory**: `client/dist`
   - **Environment variables**: Add `VITE_API_URL` with your backend URL

**Via Netlify CLI:**
```bash
cd client
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

### Option B: Render Static Site

#### Step 1: Create Static Site

1. In Render Dashboard, click **"New +"** → **"Static Site"**
2. Connect your repository
3. Configure:
   - **Name**: `atg-chapel-client`
   - **Branch**: `main`
   - **Root Directory**: `client`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

#### Step 2: Add Environment Variable

Add environment variable:
```bash
VITE_API_URL=https://atg-chapel-api.onrender.com
```

#### Step 3: Deploy

Click **"Create Static Site"** and wait for deployment.

---

## 🔄 Part 3: Connect Frontend and Backend

### Update Backend CORS

1. Go to your backend service on Render
2. Add/Update environment variable:
```bash
CLIENT_URL=https://your-frontend-app.netlify.app
```
3. The backend will automatically restart

### Verify API Connection

1. Open your deployed frontend
2. Try the contact form or newsletter subscription
3. Check browser console for any CORS errors
4. Verify emails are being sent

---

## 🔐 Part 4: Database Verification

Your Neon PostgreSQL database is already configured. Verify it's working:

1. Check Render backend logs:
```
📊 Database connected and initialized
```

2. Test events API:
```
https://your-backend.onrender.com/api/events
```

3. If you need to re-initialize:
```bash
# SSH into Render or run locally
npm run setup
```

---

## 📧 Part 5: Email Configuration

### Gmail Setup (Recommended)

1. **Enable 2-Factor Authentication**:
   - Go to Google Account → Security
   - Enable 2-Step Verification

2. **Generate App Password**:
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (Custom name)"
   - Name it "ATG Chapel Server"
   - Copy the 16-character password

3. **Add to Render Environment Variables**:
   ```bash
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=abcd efgh ijkl mnop  # 16-char app password
   RECEIVING_EMAIL=admin@atgchapel.org
   ```

### Alternative: SendGrid, Mailgun, etc.

Update SMTP settings accordingly:
```bash
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
```

---

## ✅ Part 6: Testing Checklist

### Backend Tests
- [ ] Health check: `/api/health`
- [ ] Events API: `/api/events`
- [ ] Database connection logs show success
- [ ] No error messages in Render logs

### Frontend Tests
- [ ] Site loads without errors
- [ ] Images and assets load correctly
- [ ] Navigation works properly
- [ ] Order of Services displays correctly

### Integration Tests
- [ ] Newsletter subscription works
- [ ] Contact form sends emails
- [ ] Prayer requests are submitted
- [ ] Admin can create/edit events
- [ ] Images upload successfully

---

## 🐛 Troubleshooting

### CORS Errors
```
Access to fetch at 'https://backend.onrender.com/api/...' from origin 'https://frontend.app' has been blocked by CORS
```

**Solution**: 
- Verify `CLIENT_URL` is set in backend environment variables
- Make sure it matches your frontend URL exactly (no trailing slash)
- Restart the backend service

### Database Connection Errors
```
Error: connect ECONNREFUSED
```

**Solution**:
- Verify `DATABASE_URL` is correct in Render environment
- Check Neon DB is active (check dashboard)
- Ensure `sslmode=require` is in the connection string

### Email Not Sending
```
Error: Invalid login: 535-5.7.8 Username and Password not accepted
```

**Solution**:
- Use App Password, not regular Gmail password
- Verify 2FA is enabled on Google account
- Check SMTP credentials are correct
- Try regenerating App Password

### Build Failures

**Backend Build Fails**:
```bash
# Check package.json dependencies
# Ensure Node version is compatible (v18+ recommended)
```

**Frontend Build Fails**:
```bash
# Verify all dependencies install
cd client
npm ci
npm run build
```

### Free Tier Limitations

Render Free Tier:
- Services spin down after 15 minutes of inactivity
- First request after spin-down takes 30-60 seconds
- 750 hours/month free

**Solutions**:
- Upgrade to paid plan for always-on service
- Use external uptime monitor (UptimeRobot) to ping every 14 minutes
- Accept the cold start delay

---

## 🔄 Part 7: Continuous Deployment

### Auto-Deploy on Git Push

Both Render and Netlify support automatic deployments:

1. **Push to GitHub**:
```bash
git add .
git commit -m "Update feature"
git push origin main
```

2. **Automatic Build**:
   - Render/Netlify detects the push
   - Automatically builds and deploys
   - Usually takes 3-5 minutes

### Manual Deploy

**Render**:
- Go to service → Click "Manual Deploy" → Select branch

**Netlify**:
```bash
cd client
netlify deploy --prod
```

---

## 📊 Part 8: Monitoring & Logs

### View Logs

**Render**:
- Dashboard → Your Service → **Logs** tab
- Real-time streaming logs
- Shows errors, warnings, and info

**Netlify**:
- Site → **Deploys** tab
- Build logs and deploy logs
- Function logs (if using)

### Health Monitoring

Set up monitoring:
1. Use built-in health checks (Render has this)
2. External: [UptimeRobot](https://uptimerobot.com) (free)
3. Monitor endpoint: `https://your-api.onrender.com/api/health`

---

## 🔐 Part 9: Security Best Practices

### Environment Variables
- ✅ Never commit `.env` files
- ✅ Use `.env.example` as template
- ✅ Rotate SMTP passwords periodically
- ✅ Use strong database passwords

### Database
- ✅ Use SSL connections (sslmode=require)
- ✅ Keep DATABASE_URL secret
- ✅ Regular backups (Neon has automatic backups)

### API Security
- ✅ CORS properly configured
- ✅ Admin email verification
- ✅ Rate limiting (consider adding)

---

## 📱 Part 10: Custom Domain (Optional)

### Backend Custom Domain

1. In Render Dashboard → Service → **Settings**
2. Click **"Add Custom Domain"**
3. Add: `api.atgchapel.org`
4. Update DNS records:
   ```
   Type: CNAME
   Name: api
   Value: your-app.onrender.com
   ```

### Frontend Custom Domain

**Netlify**:
1. Site Settings → **Domain Management**
2. Click **"Add custom domain"**
3. Add: `atgchapel.org`
4. Follow DNS configuration instructions

**Render Static Site**:
1. Settings → **Custom Domain**
2. Add domain and configure DNS

### Update Environment Variables

After adding custom domains:
```bash
# Backend
CLIENT_URL=https://atgchapel.org

# Frontend
VITE_API_URL=https://api.atgchapel.org
```

---

## 🎯 Quick Reference

### Important URLs (Update after deployment)

```bash
# Backend API
Production: https://atg-chapel-api.onrender.com
Health Check: https://atg-chapel-api.onrender.com/api/health

# Frontend
Production: https://your-app.netlify.app
or: https://your-app.onrender.com

# Database
Neon Dashboard: https://console.neon.tech
Connection: Already configured in DATABASE_URL
```

### Key Files

```
server/
├── .env                 # Local environment (not committed)
├── .env.example        # Template for environment variables
├── render.yaml         # Render deployment config
└── package.json        # Dependencies and scripts

client/
├── .env.production     # Production API URL
├── .env.example        # Template
├── vite.config.js     # Vite configuration
└── package.json       # Dependencies and scripts
```

### Common Commands

```bash
# Local Development
npm run dev              # Start development server

# Build
npm run build           # Build for production
npm start               # Start production server

# Deploy
git push origin main    # Trigger auto-deploy
netlify deploy --prod   # Manual Netlify deploy
```

---

## 🆘 Support Resources

- **Render Docs**: https://render.com/docs
- **Netlify Docs**: https://docs.netlify.com
- **Neon Docs**: https://neon.tech/docs
- **Vite Docs**: https://vitejs.dev
- **Gmail App Passwords**: https://support.google.com/accounts/answer/185833

---

## ✅ Deployment Checklist

### Before Deployment
- [ ] All code committed to GitHub
- [ ] Environment variables documented
- [ ] Database credentials ready
- [ ] SMTP credentials configured
- [ ] Build tested locally

### Backend Deployment
- [ ] Render service created
- [ ] Environment variables added
- [ ] Database connected
- [ ] Health check passes
- [ ] Logs show no errors

### Frontend Deployment
- [ ] Client service created
- [ ] API URL configured
- [ ] Build succeeds
- [ ] Site loads correctly
- [ ] Assets load properly

### Final Verification
- [ ] Forms submit successfully
- [ ] Emails are received
- [ ] Events display correctly
- [ ] Admin functions work
- [ ] No console errors
- [ ] Mobile responsive

### Post-Deployment
- [ ] Update CLIENT_URL in backend
- [ ] Monitor logs for errors
- [ ] Test all features
- [ ] Set up monitoring
- [ ] Document URLs

---

**Deployment Status**: Ready for Render ✅
**Estimated Time**: 30-45 minutes
**Cost**: Free tier available for both services

Good luck with your deployment! 🚀
