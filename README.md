# 🕊️ ATG Chapel Machakos - Full-Stack Church Application

> **Where Divinity Meets Humanity**

Modern, full-stack church management application built with React, Node.js, and PostgreSQL. Features event management, newsletter subscriptions, prayer requests, contact forms, and a beautiful spiritual UI.

---

## 🌟 Features

### Frontend (React + Vite)
- ✨ **Spiritual UI**: Beautiful animations with Framer Motion and AOS
- 📅 **Order of Services**: Interactive weekly service schedule
- 🎉 **Events Management**: Browse and view upcoming church events
- 📧 **Newsletter**: Subscription with email confirmations
- 🙏 **Prayer Requests**: Submit and manage prayer requests
- 📞 **Contact Form**: Direct communication with church staff
- 📖 **Bible Integration**: Scripture references and spiritual content
- 📱 **Fully Responsive**: Mobile-first design with Tailwind CSS

### Backend (Node.js + Express)
- 🔐 **Admin Authentication**: Secure event management
- 📊 **PostgreSQL Database**: Neon DB with automatic schema initialization
- 📧 **Email System**: Nodemailer integration with SMTP
- 🖼️ **Image Uploads**: Multer-based file management
- ⏰ **Auto Cleanup**: Scheduled cleanup of expired events
- 🔒 **CORS Protection**: Production-ready security
- 💾 **RESTful API**: Clean, documented endpoints

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL database (Neon DB recommended)
- Gmail account (for SMTP)

### Local Development

#### 1. Clone & Install
```bash
git clone <repository-url>
cd chrch-app

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

#### 2. Configure Environment

**Server (.env)**
```bash
cd server
cp .env.example .env
# Edit .env with your credentials
```

Required variables:
```bash
PORT=5000
DATABASE_URL=postgresql://...
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
RECEIVING_EMAIL=admin@atgchapel.org
ADMIN_EMAIL=admin@atgchapel.org
```

**Client (.env)**
```bash
cd client
cp .env.example .env
```

Default (for local dev):
```bash
VITE_API_URL=http://localhost:5000
```

#### 3. Run Development Servers

**Terminal 1 - Backend:**
```bash
cd server
npm run dev     # Uses nodemon for auto-restart
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev     # Vite dev server with HMR
```

Open http://localhost:5173 (or the port Vite displays)

---

## 📋 Project Structure

```
chrch-app/
├── client/                      # Frontend (React + Vite)
│   ├── public/                  # Static assets
│   │   └── assets/             # Images, CSS, JS
│   ├── src/
│   │   ├── components/         # React components
│   │   │   ├── OrderOfServices.jsx
│   │   │   ├── EventsSection.jsx
│   │   │   ├── FloatingHub.jsx
│   │   │   └── ...
│   │   ├── pages/              # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Events.jsx
│   │   │   ├── Services.jsx
│   │   │   └── ...
│   │   ├── services/           # API integration
│   │   │   └── api.js
│   │   ├── utils/              # Helper functions
│   │   ├── App.jsx             # Main app component
│   │   └── main.jsx            # Entry point
│   ├── .env.example            # Environment template
│   ├── .env.production         # Production config
│   ├── vite.config.js          # Vite configuration
│   ├── tailwind.config.js      # Tailwind CSS config
│   └── package.json
│
├── server/                      # Backend (Node.js + Express)
│   ├── db/                     # Database utilities
│   │   ├── config.js           # DB connection
│   │   ├── schema.sql          # Database schema
│   │   └── utils.js            # DB helper functions
│   ├── routes/                 # API routes
│   │   ├── events.js           # Events CRUD
│   │   └── upload.js           # File uploads
│   ├── .env.example            # Environment template
│   ├── render.yaml             # Render deployment config
│   ├── server.js               # Main server file
│   ├── setup-admin.js          # Admin setup script
│   └── package.json
│
├── RENDER-DEPLOYMENT-GUIDE.md  # Complete deployment guide
├── QUICK-DEPLOY-CHECKLIST.md  # Quick deployment reference
├── DEPLOYMENT-READY.md         # Deployment summary
├── verify-deployment.sh        # Pre-deployment checks
└── README.md                   # This file
```

---

## 🎯 API Endpoints

### Public Endpoints
```
GET    /api/health              # Health check
GET    /api/events              # Get all events
GET    /api/events/:id          # Get single event
POST   /api/newsletter          # Newsletter subscription
POST   /api/prayer-request      # Submit prayer request
POST   /api/contact             # Contact form
```

### Admin Endpoints (require adminEmail)
```
POST   /api/events              # Create event
PUT    /api/events/:id          # Update event
DELETE /api/events/:id          # Delete event
POST   /api/upload/single       # Upload single image
POST   /api/upload/multiple     # Upload multiple images
DELETE /api/upload/delete       # Delete image
```

---

## 🔐 Environment Variables

### Server Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NODE_ENV` | Environment (production/development) | Yes |
| `PORT` | Server port (default: 5000) | No |
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `CLIENT_URL` | Frontend URL for CORS | Yes (prod) |
| `SMTP_HOST` | SMTP server host | Yes |
| `SMTP_PORT` | SMTP server port | Yes |
| `SMTP_USER` | SMTP username/email | Yes |
| `SMTP_PASS` | SMTP password/app password | Yes |
| `RECEIVING_EMAIL` | Admin notification email | Yes |
| `ADMIN_EMAIL` | Authorized admin email | Yes |

### Client Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_API_URL` | Backend API URL | Yes |

---

## 🚀 Deployment

### Render Deployment (Recommended)

The application is configured for deployment on Render with separate services:
- **Backend**: Render Web Service
- **Frontend**: Netlify or Render Static Site
- **Database**: Neon PostgreSQL (already configured)

#### Quick Deploy Steps:

1. **Verify Deployment Readiness**
   ```bash
   ./verify-deployment.sh
   ```

2. **Deploy Backend to Render**
   - See `RENDER-DEPLOYMENT-GUIDE.md` for detailed steps
   - Configure environment variables
   - Deploy and note the URL

3. **Deploy Frontend**
   - Update `client/.env.production` with backend URL
   - Deploy to Netlify or Render
   - See deployment guide for options

4. **Update CORS**
   - Add frontend URL to backend `CLIENT_URL` variable
   - Backend will auto-restart

#### Deployment Documentation:
- 📖 **Full Guide**: `RENDER-DEPLOYMENT-GUIDE.md`
- ⚡ **Quick Reference**: `QUICK-DEPLOY-CHECKLIST.md`
- ✅ **Ready Status**: `DEPLOYMENT-READY.md`

---

## 🔧 Scripts

### Server Scripts
```bash
npm start              # Start production server
npm run dev            # Start development server (nodemon)
npm run setup          # Setup admin user
```

### Client Scripts
```bash
npm run dev            # Start Vite dev server
npm run build          # Build for production
npm run preview        # Preview production build
npm run lint           # Run ESLint
```

---

## 📧 Email Configuration

### Gmail Setup (Recommended)

1. **Enable 2-Factor Authentication**
   - Go to Google Account → Security
   - Enable 2-Step Verification

2. **Generate App Password**
   - Visit: https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (Custom name)"
   - Copy the 16-character password

3. **Configure in .env**
   ```bash
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=abcd efgh ijkl mnop  # 16-char app password
   ```

---

## 🗄️ Database

### Neon PostgreSQL

The application uses Neon PostgreSQL (serverless Postgres):
- Auto-scaling and serverless
- Free tier: 0.5 GB storage
- Automatic backups
- SSL connections required

### Schema

Main tables:
- `events`: Church events with details
- Automatic timestamps and UUID IDs
- JSON support for flexible data

### Initialization

Database schema is automatically initialized on server startup:
```bash
npm start  # Auto-runs schema initialization
```

Manual setup:
```bash
npm run setup  # Initialize and create admin
```

---

## 🎨 Frontend Tech Stack

- **Framework**: React 18+
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + Custom CSS
- **Animations**: Framer Motion + AOS
- **UI Components**: Bootstrap 5
- **Icons**: Bootstrap Icons
- **HTTP Client**: Axios
- **Routing**: React Router DOM
- **Carousel**: Swiper
- **Lightbox**: GLightbox

---

## 🔒 Backend Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express 5
- **Database**: PostgreSQL (Neon)
- **ORM/Client**: pg (node-postgres)
- **Email**: Nodemailer
- **File Uploads**: Multer
- **Scheduling**: node-cron
- **Security**: CORS
- **Environment**: dotenv

---

## 🧪 Testing

### Manual Testing Checklist

**Frontend:**
- [ ] Homepage loads correctly
- [ ] Order of Services displays and is interactive
- [ ] Events page shows all events
- [ ] Newsletter subscription works
- [ ] Contact form submits
- [ ] Prayer request form works
- [ ] Navigation works on all pages
- [ ] Mobile responsive design

**Backend:**
- [ ] Health check returns OK
- [ ] Events API returns data
- [ ] Admin can create events
- [ ] Images upload successfully
- [ ] Emails are sent
- [ ] Database cleanup runs

---

## 🐛 Troubleshooting

### Common Issues

**CORS Error:**
```
Access to fetch has been blocked by CORS policy
```
**Solution:** Verify `CLIENT_URL` matches your frontend URL exactly

**Database Connection Error:**
```
Error: connect ECONNREFUSED
```
**Solution:** Check `DATABASE_URL` and ensure Neon DB is active

**Email Not Sending:**
```
Error: Invalid login
```
**Solution:** Use Gmail App Password, not regular password

**Build Errors:**
```
Module not found
```
**Solution:** Delete `node_modules` and `package-lock.json`, run `npm install`

---

## 📱 Contact Information

**ATG Chapel Machakos**
- 📍 Mwatu Wa Ngoma Rd, MKS KFA Building, Machakos
- 📞 +254 714 888 016
- 📧 atgmksinfo@gmail.com

---

## 📄 License

For church and community use. Contact ATG Chapel Machakos for permissions beyond this scope.

---

## 🙏 Acknowledgments

Built with love for the ATG Chapel Machakos community.

**"Not giving up meeting together, as some are in the habit of doing, but encouraging one another." - Hebrews 10:25**

---

## 🔗 Quick Links

- [Deployment Guide](RENDER-DEPLOYMENT-GUIDE.md)
- [Quick Deploy Checklist](QUICK-DEPLOY-CHECKLIST.md)
- [Deployment Status](DEPLOYMENT-READY.md)
- [Order of Services Docs](ORDER-OF-SERVICES-COMPLETE.md)

---

**Status**: ✅ Production Ready
**Version**: 1.0.0
**Last Updated**: October 2025
