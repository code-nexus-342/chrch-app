# 🚀 Quick Deployment Checklist

## Backend (Server) - Render

### 1. Create Web Service
- [ ] Go to https://dashboard.render.com
- [ ] New + → Web Service
- [ ] Connect GitHub repo
- [ ] Root Directory: `server`
- [ ] Build Command: `npm install`
- [ ] Start Command: `npm start`

### 2. Environment Variables
```bash
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://... (your Neon DB URL)
CLIENT_URL=https://your-frontend.netlify.app
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
RECEIVING_EMAIL=admin@atgchapel.org
ADMIN_EMAIL=admin@atgchapel.org
```

### 3. Verify
- [ ] Service deployed successfully
- [ ] Visit: `https://your-backend.onrender.com/api/health`
- [ ] Should return: `{"status":"ok","message":"ATG Chapel API is running"}`

---

## Frontend (Client) - Netlify

### 1. Update Environment
- [ ] Create `client/.env.production`:
```bash
VITE_API_URL=https://your-backend.onrender.com
```

### 2. Deploy to Netlify
- [ ] Go to https://app.netlify.com
- [ ] New site from Git
- [ ] Connect GitHub repo
- [ ] Base directory: `client`
- [ ] Build command: `npm run build`
- [ ] Publish directory: `dist`
- [ ] Add environment variable: `VITE_API_URL`

### 3. Verify
- [ ] Site loads without errors
- [ ] Check browser console (should be no errors)
- [ ] Test contact form

---

## Final Steps

### 1. Update Backend CORS
- [ ] Go to Render backend service
- [ ] Update `CLIENT_URL` with your Netlify URL
- [ ] Service will auto-restart

### 2. Test Everything
- [ ] Newsletter subscription
- [ ] Contact form
- [ ] Prayer requests
- [ ] Events display
- [ ] Admin login
- [ ] Image uploads

---

## 📝 Your Deployment URLs

```
Backend API: https://_____________________.onrender.com
Frontend:    https://_____________________.netlify.app
Database:    Neon (already configured)
```

---

## 🆘 Quick Troubleshooting

**CORS Error?**
→ Check `CLIENT_URL` matches frontend URL exactly

**Email not sending?**
→ Use Gmail App Password, not regular password

**Database error?**
→ Verify `DATABASE_URL` in Render environment

**Build fails?**
→ Check logs in Render/Netlify dashboard

---

## 📚 Full Guide
See `RENDER-DEPLOYMENT-GUIDE.md` for detailed instructions.
