# Plesk Web Server Configuration for Next.js

## Problem
The Next.js app is running on PM2 (port 3000) but the web server isn't configured to proxy requests to it.

## Solution: Configure Nginx/Apache Proxy

### Step 1: Find Out What Port Next.js is Running On

SSH into your server and run:
```bash
pm2 logs lioroofrepairs --lines 20
```

Look for a line like: `ready - started server on 0.0.0.0:3000`

### Step 2: Configure Plesk to Proxy to Next.js

**Option A: Via Plesk Panel (Recommended)**

1. Login to Plesk panel
2. Go to **Websites & Domains** → **lioroofrepairs.co.uk**
3. Click **Apache & nginx Settings**
4. In the **Additional nginx directives** section, add:

```nginx
location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;
}
```

5. Click **OK** to save
6. The web server will restart automatically

**Option B: Via SSH (Advanced)**

If you have root access, you can edit the nginx config directly:

```bash
# Find the nginx config file
ls /etc/nginx/plesk.conf.d/vhosts/

# Edit the config for your domain
sudo nano /etc/nginx/plesk.conf.d/vhosts/lioroofrepairs.co.uk.conf
```

Add the proxy configuration and restart nginx:
```bash
sudo systemctl restart nginx
```

### Step 3: Verify Next.js is Running

SSH into your server:
```bash
ssh lioroofrepairs@95.217.234.68
cd /var/www/vhosts/lioroofrepairs.co.uk/httpdocs
pm2 status
pm2 logs lioroofrepairs --lines 50
```

You should see:
- PM2 status: `online`
- Logs showing: `ready - started server on 0.0.0.0:3000`

### Step 4: Test the Site

After configuring the proxy, visit:
- https://lioroofrepairs.co.uk
- https://lioroofrepairs.co.uk/admin/login

---

## Alternative: Use Plesk Node.js Support

Plesk has built-in Node.js support that can handle this automatically:

1. Login to Plesk
2. Go to **Websites & Domains** → **lioroofrepairs.co.uk**
3. Click **Node.js**
4. Enable Node.js
5. Set:
   - **Application mode**: Production
   - **Application root**: `/var/www/vhosts/lioroofrepairs.co.uk/httpdocs`
   - **Application startup file**: `node_modules/next/dist/bin/next`
   - **Custom environment variables**: Add your .env variables here

6. Click **Enable Node.js**

This will automatically configure the proxy and start your app.

---

## Troubleshooting

### Check if Next.js is actually running:
```bash
curl http://localhost:3000
```

If this returns HTML, Next.js is running and you just need to configure the proxy.

### Check PM2 logs for errors:
```bash
pm2 logs lioroofrepairs --err --lines 100
```

### Restart PM2 if needed:
```bash
pm2 restart lioroofrepairs
pm2 logs lioroofrepairs
```

### Check what's listening on port 3000:
```bash
sudo netstat -tlnp | grep :3000
```

---

## Quick Fix Commands

Run these in SSH to verify everything:

```bash
# Check PM2 status
pm2 status

# Check if Next.js is responding locally
curl -I http://localhost:3000

# View recent logs
pm2 logs lioroofrepairs --lines 50

# Restart if needed
pm2 restart lioroofrepairs
```

Then configure the Nginx proxy in Plesk panel as described above.
