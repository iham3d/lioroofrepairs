# Server Setup Guide - Post Deployment

## ✅ Deployment Status: SUCCESSFUL

The GitHub Actions workflow has already deployed your code to the server successfully (13 seconds ago).

---

## 🔍 Verify Deployment

SSH into your server and check if files are there:

```bash
ssh lioroofrepairs@95.217.234.68
cd /var/www/vhosts/lioroofrepairs.co.uk/httpdocs
ls -la
```

You should see:
- `package.json`
- `next.config.js`
- `src/` directory
- `prisma/` directory
- `.next/` directory (after build)
- `node_modules/` directory

---

## 📋 What the Deployment Already Did

The GitHub Actions workflow already executed these commands on your server:

1. ✅ Copied all source code to `/var/www/vhosts/lioroofrepairs.co.uk/httpdocs`
2. ✅ Ran `npm ci` (installed dependencies)
3. ✅ Ran `npx prisma generate` (generated Prisma client)
4. ✅ Ran `npx prisma migrate deploy` (ran database migrations)
5. ✅ Ran `npm run build` (built Next.js app)
6. ✅ Started/restarted the app with PM2

---

## 🎯 What You Need to Do Now

### Step 1: Create .env File on Server

SSH into your server:
```bash
ssh lioroofrepairs@95.217.234.68
```

Navigate to the web root:
```bash
cd /var/www/vhosts/lioroofrepairs.co.uk/httpdocs
```

Create the `.env` file:
```bash
nano .env
```

Add these environment variables:
```env
DATABASE_URL="mysql://lioroofuser:I1h%1rSu5@localhost:3306/lioroofrepairs"
NEXTAUTH_SECRET="mS0hgmSSs+a8PnN6wU3GF6jgfaxy006bWZ2oA9QDjtU="
NEXTAUTH_URL="https://lioroofrepairs.co.uk"
ADMIN_EMAIL="admin@lioroofrepairs.co.uk"
ADMIN_PASSWORD="ChangeThisPassword123!"
```

Save and exit (Ctrl+X, then Y, then Enter)

---

### Step 2: Create Admin User

Run the seed script:
```bash
npm run db:seed
```

This will create the admin user in the database.

---

### Step 3: Restart the Application

```bash
pm2 restart lioroofrepairs
```

Or if it's not running:
```bash
pm2 start npm --name "lioroofrepairs" -- start
```

---

### Step 4: Check PM2 Status

```bash
pm2 status
pm2 logs lioroofrepairs
```

This shows if the app is running and any errors.

---

## 🌐 Access Your Website

Once the above steps are complete:

1. **Homepage**: https://lioroofrepairs.co.uk
2. **Admin Login**: https://lioroofrepairs.co.uk/admin/login
   - Email: `admin@lioroofrepairs.co.uk`
   - Password: `ChangeThisPassword123!`

---

## 🔧 Troubleshooting

### If files are missing:

The deployment might have gone to a different directory. Check:
```bash
ls -la /var/www/vhosts/lioroofrepairs.co.uk/
```

Look for directories like:
- `httpdocs/` (most common)
- `public_html/`
- `html/`

### If npm command not found:

The deployment already ran npm commands successfully, but if you need to run them manually:
```bash
export PATH="/var/www/vhosts/lioroofrepairs.co.uk/.nodenv/shims:$PATH"
npm --version
```

### If PM2 not found:

Install PM2 globally:
```bash
npm install -g pm2
```

### Check deployment logs:

Go to GitHub → Actions → Click on the successful workflow run → Click "deploy" job → View the "Deploy to Plesk via SSH" step logs

---

## 📝 Summary

**The deployment already happened successfully!** You just need to:
1. ✅ Create `.env` file on server
2. ✅ Run `npm run db:seed`
3. ✅ Restart PM2
4. ✅ Visit your website

That's it! The code is already there.
