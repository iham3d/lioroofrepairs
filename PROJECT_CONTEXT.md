# Lio Roof Repairs - Project Context

> **Purpose**: This document provides complete context for AI assistants working on this project in future sessions.

---

## 🎯 Project Overview

**Project Name**: Lio Roof Repairs Website  
**Type**: Full-stack Next.js 16 web application  
**Status**: ✅ **LIVE** at https://lioroofrepairs.co.uk  
**Repository**: https://github.com/iham3d/lioroofrepairs

### Purpose
Professional website for a UK-based roofing company featuring:
- Service showcase
- Project gallery
- Customer reviews
- Contact form with database storage
- Admin dashboard for managing inquiries

---

## 🏗️ Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js | 16.1.1 |
| Language | TypeScript | 5.x |
| Database | MySQL | (Plesk-hosted) |
| ORM | Prisma | 6.19.1 |
| Authentication | NextAuth.js | 5.0.0-beta.30 |
| Styling | Vanilla CSS + CSS Modules | - |
| Deployment | GitHub Actions → Plesk | - |
| Process Manager | PM2 | Latest |
| Web Server | Nginx (Plesk) | - |

---

## 📁 Project Structure

```
lioroofrepairs/
├── .github/workflows/
│   └── deploy.yml              # Automated deployment to Plesk
├── prisma/
│   ├── schema.prisma           # Database schema
│   └── seed.ts                 # Admin user seed script
├── public/
│   └── images/                 # Static assets
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx            # Homepage
│   │   ├── services/page.tsx   # Services page
│   │   ├── gallery/page.tsx    # Gallery page
│   │   ├── reviews/page.tsx    # Reviews page
│   │   ├── contact/page.tsx    # Contact page
│   │   ├── admin/              # Admin pages
│   │   │   ├── login/page.tsx
│   │   │   └── dashboard/page.tsx
│   │   ├── api/                # API routes
│   │   │   ├── contact/route.ts
│   │   │   ├── admin/submissions/
│   │   │   └── auth/[...nextauth]/route.ts
│   │   ├── globals.css         # Global styles & design tokens
│   │   └── layout.tsx          # Root layout
│   ├── components/
│   │   ├── layout/             # Header, Footer
│   │   ├── home/               # HeroSection
│   │   ├── contact/            # ContactForm
│   │   └── admin/              # LoginForm
│   ├── lib/
│   │   ├── auth.ts             # NextAuth config
│   │   ├── prisma.ts           # Prisma client
│   │   └── utils.ts            # Utilities
│   ├── types/
│   │   ├── index.ts            # TypeScript types
│   │   └── next-auth.d.ts      # NextAuth types
│   └── middleware.ts           # Route protection
├── .env.example                # Environment template
├── next.config.js              # Next.js config (standalone build)
├── package.json                # Dependencies
└── README.md                   # Setup instructions
```

---

## 🗄️ Database Schema

### Tables

**users**
- `id` (Int, Primary Key)
- `email` (String, Unique)
- `password` (String, Hashed with bcrypt)
- `name` (String, Optional)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

**contact_submissions**
- `id` (Int, Primary Key)
- `name` (String)
- `email` (String)
- `phone` (String, Optional)
- `message` (Text)
- `status` (Enum: NEW, CONTACTED, COMPLETED)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

**accounts, sessions, verification_tokens** (NextAuth tables)

---

## 🔐 Credentials & Configuration

### Production Database
- **Host**: localhost:3306
- **Database**: `lioroofrepairs`
- **User**: `lioroofuser`
- **Password**: `I1h%1rSu5` (URL-encoded as `I1h%251rSu5` in DATABASE_URL)

### Admin Account
- **Email**: `admin@lioroofrepairs.co.uk`
- **Password**: `ChangeThisPassword123!` (⚠️ Should be changed)

### Environment Variables (.env on server)
```env
DATABASE_URL="mysql://lioroofuser:I1h%251rSu5@localhost:3306/lioroofrepairs"
NEXTAUTH_SECRET="mS0hgmSSs+a8PnN6wU3GF6jgfaxy006bWZ2oA9QDjtU="
NEXTAUTH_URL="https://lioroofrepairs.co.uk"
ADMIN_EMAIL="admin@lioroofrepairs.co.uk"
ADMIN_PASSWORD="ChangeThisPassword123!"
```

### GitHub Secrets (for deployment)
- `DATABASE_URL` - Production database connection
- `NEXTAUTH_SECRET` - Auth secret key
- `NEXTAUTH_URL` - Production URL
- `SSH_PRIVATE_KEY` - SSH key for Plesk deployment
- `PLESK_HOST` - `95.217.234.68`
- `PLESK_USER` - `lioroofrepairs`
- `PLESK_WEB_ROOT` - `/var/www/vhosts/lioroofrepairs.co.uk/httpdocs`

---

## 🚀 Deployment Setup

### Server Configuration
- **Hosting**: Plesk on Ubuntu 22.04
- **Server IP**: 95.217.234.68
- **Node.js**: Version 20 (via nodenv)
- **Process Manager**: PM2
- **Web Server**: Nginx (proxies to Next.js on port 3000)

### Deployment Flow
1. Push code to `main` branch on GitHub
2. GitHub Actions workflow triggers
3. Code is copied to Plesk via SSH
4. Server runs:
   - `npm ci` (install dependencies)
   - `npx prisma generate` (generate Prisma client)
   - `npx prisma migrate deploy` (run migrations)
   - `npm run build` (build Next.js app)
   - `pm2 restart lioroofrepairs` (restart app)

### Nginx Configuration
Located at: `/etc/nginx/plesk.conf.d/vhosts/lioroofrepairs.co.uk.conf`

Proxies all requests to `http://127.0.0.1:3000` (Next.js app)

### PM2 Process
- **Name**: `lioroofrepairs`
- **Command**: `npm start`
- **Auto-restart**: Enabled
- **Startup script**: Configured

---

## 🎨 Design System

### Color Palette
```css
--color-primary: hsl(210, 90%, 48%);      /* Blue */
--color-primary-dark: hsl(210, 90%, 38%);
--color-accent: hsl(25, 95%, 53%);        /* Orange */
--color-accent-dark: hsl(25, 95%, 43%);
--color-neutral-50: hsl(0, 0%, 98%);
--color-neutral-900: hsl(0, 0%, 10%);
```

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800

### Breakpoints
```css
--breakpoint-mobile: 480px;
--breakpoint-tablet: 768px;
--breakpoint-desktop: 1024px;
--breakpoint-wide: 1280px;
```

---

## 📝 Current Features

### Public Pages
1. **Homepage** (`/`)
   - Hero section with gradient background
   - Services overview grid (6 services)
   - Trust badges (15+ years, 500+ projects, 100% satisfaction)
   - Call-to-action section

2. **Services** (`/services`)
   - Roof Repairs
   - New Roof Installations
   - Roof Maintenance
   - Emergency Repairs
   - Guttering Services
   - Fascias & Soffits

3. **Gallery** (`/gallery`)
   - Placeholder grid structure (ready for images)

4. **Reviews** (`/reviews`)
   - Static JSON reviews (6 sample reviews)
   - Star rating display
   - Average rating calculation

5. **Contact** (`/contact`)
   - Validated form (React Hook Form + Zod)
   - Spam prevention (honeypot field)
   - Rate limiting (3 requests/hour per IP)
   - Contact information sidebar

### Admin Features
1. **Login** (`/admin/login`)
   - NextAuth credentials authentication
   - Protected with middleware

2. **Dashboard** (`/admin/dashboard`)
   - View all contact submissions
   - Search and filter functionality
   - Update submission status (New/Contacted/Completed)
   - Color-coded status badges

---

## 🔧 Common Commands

### Local Development
```bash
npm install                  # Install dependencies
npm run dev                  # Start dev server (http://localhost:3000)
npm run build                # Build for production
npm start                    # Start production server
npm run db:generate          # Generate Prisma client
npm run db:push              # Push schema to database
npm run db:seed              # Seed admin user
```

### Server (SSH: lioroofrepairs@95.217.234.68)
```bash
cd /var/www/vhosts/lioroofrepairs.co.uk/httpdocs
pm2 status                   # Check app status
pm2 logs lioroofrepairs      # View logs
pm2 restart lioroofrepairs   # Restart app
pm2 save                     # Save PM2 config
npm run db:seed              # Create admin user (first time only)
```

---

## 🐛 Known Issues & Limitations

1. **Gallery**: Uses placeholder structure, needs real project images
2. **Reviews**: Static JSON data, should integrate Google Reviews API
3. **Admin Password**: Default password should be changed
4. **Nginx Config**: May be overwritten by Plesk updates (need to reapply)
5. **UI**: Minimal design, needs enhancement (animations, effects, modern design)

---

## 🎯 Planned Improvements (Phase 2)

### High Priority
- [ ] Enhance UI with modern animations and effects
- [ ] Integrate Google Reviews API
- [ ] Add real project images to gallery
- [ ] Implement lightbox for gallery
- [ ] Add before/after image sliders for services
- [ ] Improve mobile responsiveness

### Medium Priority
- [ ] Add FAQ section
- [ ] Implement contact form email notifications
- [ ] Add Google Maps integration
- [ ] Create service process timeline
- [ ] Add pricing information
- [ ] Implement dark mode

### Low Priority
- [ ] Add blog/news section
- [ ] Implement customer portal
- [ ] Add live chat widget
- [ ] Create promotional banners
- [ ] Add multi-language support

---

## 📚 Important Files to Review

When working on this project, always review:

1. **[README.md](file:///Users/Ham3d/Liofloorrepair/lioroofrepairs/README.md)** - Setup instructions
2. **[.github/workflows/deploy.yml](file:///Users/Ham3d/Liofloorrepair/lioroofrepairs/.github/workflows/deploy.yml)** - Deployment workflow
3. **[prisma/schema.prisma](file:///Users/Ham3d/Liofloorrepair/lioroofrepairs/prisma/schema.prisma)** - Database schema
4. **[src/app/globals.css](file:///Users/Ham3d/Liofloorrepair/lioroofrepairs/src/app/globals.css)** - Design system
5. **[next.config.js](file:///Users/Ham3d/Liofloorrepair/lioroofrepairs/next.config.js)** - Next.js configuration

---

## 🔗 Useful Links

- **Live Site**: https://lioroofrepairs.co.uk
- **Admin Dashboard**: https://lioroofrepairs.co.uk/admin/login
- **GitHub Repository**: https://github.com/iham3d/lioroofrepairs
- **GitHub Actions**: https://github.com/iham3d/lioroofrepairs/actions

---

## 📞 Support & Maintenance

### Troubleshooting

**Site not loading?**
1. Check PM2 status: `pm2 status`
2. Check logs: `pm2 logs lioroofrepairs`
3. Restart: `pm2 restart lioroofrepairs`

**Database connection failed?**
1. Verify `.env` file exists on server
2. Check password is URL-encoded (`%` → `%25`)
3. Test connection: `npx prisma db push`

**Deployment failed?**
1. Check GitHub Actions logs
2. Verify all GitHub Secrets are set
3. SSH into server and check disk space: `df -h`

---

**Last Updated**: 2026-01-12  
**Project Status**: Production (Live)  
**Next Session Focus**: UI Enhancement & Google Reviews Integration
