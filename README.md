# Lio Roof Repairs Website

Modern, production-ready website for Lio Roof Repairs built with Next.js 14, MySQL, and automated deployment to Plesk.

## 🚀 Features

- **Modern Tech Stack**: Next.js 14 (App Router), TypeScript, Prisma ORM, NextAuth.js
- **Contact Form**: Validated form with spam prevention and database storage
- **Admin Dashboard**: Secure dashboard to manage contact submissions
- **Automated Deployment**: GitHub Actions workflow for seamless Plesk deployment
- **SEO Optimized**: Server-side rendering, meta tags, and semantic HTML
- **Responsive Design**: Mobile-first design with professional aesthetics
- **Premium UI**: CSS custom properties for easy theme customization

## 📋 Prerequisites

- Node.js 18+ installed
- MySQL database (available in Plesk)
- Plesk hosting with SSH access
- GitHub repository

## 🛠️ Local Development Setup

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/lioroofrepairs.git
cd lioroofrepairs
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your local database credentials:

```env
DATABASE_URL="mysql://username:password@localhost:3306/lioroofrepairs"
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
ADMIN_EMAIL="admin@lioroofrepairs.co.uk"
ADMIN_PASSWORD="ChangeThisPassword123!"
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### 4. Setup database

Generate Prisma client and push schema to database:

```bash
npm run db:generate
npm run db:push
```

Seed the database with initial admin user:

```bash
npm run db:seed
```

### 5. Run development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### 6. Login to admin dashboard

- URL: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- Email: `admin@lioroofrepairs.co.uk`
- Password: `ChangeThisPassword123!`

**⚠️ IMPORTANT: Change the admin password after first login!**

## 🚢 Production Deployment (Plesk)

### Prerequisites

1. **Create MySQL Database in Plesk**
   - Login to Plesk
   - Go to Databases → Add Database
   - Note the database name, username, and password

2. **Enable Node.js in Plesk**
   - Ensure Node.js 18+ is enabled for your domain
   - Set document root to your web root directory

3. **Setup SSH Access**
   - Ensure SSH access is enabled in Plesk
   - Generate SSH key pair if needed

### GitHub Secrets Configuration

Add the following secrets to your GitHub repository (Settings → Secrets and variables → Actions):

| Secret Name | Description | Example |
|------------|-------------|---------|
| `DATABASE_URL` | Production MySQL connection string | `mysql://user:pass@localhost:3306/dbname` |
| `NEXTAUTH_SECRET` | Authentication secret (generate with openssl) | `your-generated-secret` |
| `NEXTAUTH_URL` | Production domain URL | `https://lioroofrepairs.co.uk` |
| `SSH_PRIVATE_KEY` | SSH private key for deployment | `-----BEGIN RSA PRIVATE KEY-----...` |
| `PLESK_HOST` | Plesk server hostname | `your-server.com` |
| `PLESK_USER` | SSH username | `your-username` |
| `PLESK_WEB_ROOT` | Web root path on server | `/var/www/vhosts/lioroofrepairs.co.uk/httpdocs` |

### Deployment Process

1. **Push to main branch**:
   ```bash
   git add .
   git commit -m "Deploy to production"
   git push origin main
   ```

2. **GitHub Actions will automatically**:
   - Install dependencies
   - Build Next.js application
   - Deploy to Plesk via SSH
   - Run database migrations
   - Restart application with PM2

3. **Monitor deployment**:
   - Go to GitHub → Actions tab
   - View deployment logs

### Post-Deployment

1. **Verify deployment**:
   - Visit https://lioroofrepairs.co.uk
   - Test contact form submission
   - Login to admin dashboard

2. **Create admin user** (if seed didn't run):
   ```bash
   ssh user@your-server.com
   cd /path/to/web/root
   npm run db:seed
   ```

3. **Change default admin password**:
   - Login to admin dashboard
   - Update password immediately

## 📁 Project Structure

```
lioroofrepairs/
├── .github/workflows/      # GitHub Actions deployment
├── prisma/                 # Database schema and migrations
├── public/                 # Static assets (images, fonts)
├── src/
│   ├── app/               # Next.js pages (App Router)
│   │   ├── admin/         # Admin dashboard pages
│   │   ├── api/           # API routes
│   │   ├── contact/       # Contact page
│   │   ├── gallery/       # Gallery page
│   │   ├── reviews/       # Reviews page
│   │   ├── services/      # Services page
│   │   ├── layout.tsx     # Root layout
│   │   ├── page.tsx       # Homepage
│   │   └── globals.css    # Global styles
│   ├── components/        # React components
│   │   ├── admin/         # Admin components
│   │   ├── contact/       # Contact form
│   │   ├── home/          # Homepage components
│   │   └── layout/        # Header, Footer
│   ├── lib/               # Utilities and configurations
│   │   ├── auth.ts        # NextAuth config
│   │   ├── prisma.ts      # Prisma client
│   │   └── utils.ts       # Helper functions
│   ├── styles/            # CSS modules
│   └── types/             # TypeScript types
├── .env.example           # Environment variables template
├── next.config.js         # Next.js configuration
├── package.json           # Dependencies and scripts
└── README.md              # This file
```

## 🎨 Customization

### Theme Colors

Edit CSS custom properties in `src/app/globals.css`:

```css
:root {
  --color-primary: hsl(210, 90%, 48%);    /* Main brand color */
  --color-accent: hsl(25, 95%, 53%);      /* Accent color */
  /* ... more colors */
}
```

### Adding Gallery Images

1. Place images in `/public/images/gallery/`
2. Update gallery page to load images dynamically
3. Recommended format: WebP or JPEG, optimized for web

### Static Reviews

Edit reviews in `src/app/reviews/page.tsx`:

```typescript
const reviews = [
  {
    name: 'Customer Name',
    location: 'City',
    rating: 5,
    comment: 'Review text...',
    date: '2024-01-15',
  },
  // Add more reviews
];
```

### Upgrading to Google Reviews API

1. Get Google Places API key
2. Update `src/app/reviews/page.tsx` to fetch from API
3. Add API key to environment variables

## 📊 Database Management

### View database

```bash
npx prisma studio
```

### Create migration

```bash
npx prisma migrate dev --name migration_name
```

### Reset database

```bash
npx prisma migrate reset
```

## 🔒 Security

- ✅ Honeypot spam prevention on contact form
- ✅ Rate limiting (3 requests per hour per IP)
- ✅ NextAuth.js for secure authentication
- ✅ Password hashing with bcrypt
- ✅ Protected admin routes with middleware
- ✅ Environment variables for sensitive data

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run type-check` | TypeScript type checking |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:push` | Push schema to database |
| `npm run db:seed` | Seed database with admin user |

## 🐛 Troubleshooting

### Build errors

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Database connection issues

- Verify `DATABASE_URL` in `.env.local`
- Ensure MySQL server is running
- Check database credentials

### Deployment fails

- Check GitHub Actions logs
- Verify all GitHub Secrets are set correctly
- Ensure SSH access to Plesk is working
- Check Plesk error logs

## 📞 Support

For issues or questions:
- Email: info@lioroofrepairs.co.uk
- Phone: 0800 123 4567

## 📄 License

© 2024 Lio Roof Repairs. All rights reserved.
