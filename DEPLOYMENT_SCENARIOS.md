# 🌍 RedUp - Deployment Scenarios

Quick deployment guides for different hosting platforms.

---

## 🟢 Option 1: Netlify (Easiest)

### Method A: Via Web UI
1. Go to [netlify.com](https://netlify.com)
2. Sign up/Login
3. Go to "Sites"
4. Drag & drop the `dist` folder
5. Done! Your app is live

### Method B: Via CLI
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

**Pros**: Free tier, auto HTTPS, fast, simple  
**Cons**: Limited to free tier features

---

## 🟢 Option 2: Vercel

### Method A: Via CLI (Recommended)
```bash
npm install -g vercel
vercel
# Follow the prompts
```

### Method B: Via GitHub
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repo
4. It auto-detects and deploys
5. Auto-deploys on push

**Pros**: Free tier, auto HTTPS, fast, excellent DX  
**Cons**: Limited to free tier

---

## 🟢 Option 3: GitHub Pages (Free!)

### Setup
```bash
# 1. Update vite.config.ts to add base:
# base: '/your-repo-name/'

npm run build

# 2. Create GitHub repo and push
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main

# 3. Go to repo > Settings > Pages
# Set source to "GitHub Actions"
```

### Or use GitHub Actions
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install && npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

**Pros**: Completely free, no limits  
**Cons**: Public repo, GitHub dependency

---

## 🟠 Option 4: Self-Hosted (Your Own Server)

### Prerequisites
- VPS or dedicated server
- SSH access
- Nginx or Apache
- Domain name (optional)

### Setup Nginx
```bash
# 1. Build app
npm run build

# 2. Upload to server
scp -r dist/* user@your-server:/var/www/redup/

# 3. Create nginx config
sudo nano /etc/nginx/sites-available/redup
```

**Nginx Config** (`/etc/nginx/sites-available/redup`):
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/redup;
    index index.html;

    location / {
        try_files $uri /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

**Enable & Restart**:
```bash
sudo ln -s /etc/nginx/sites-available/redup /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

**SSL with Let's Encrypt**:
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

---

## 🟠 Option 5: Self-Hosted (Apache)

### Setup
```bash
# 1. Build app
npm run build

# 2. Upload
scp -r dist/* user@your-server:/var/www/redup/

# 3. Create .htaccess in dist/
touch /var/www/redup/.htaccess
```

**.htaccess** content:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/html "access plus 0 seconds"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
</IfModule>
```

**Enable Modules**:
```bash
sudo a2enmod rewrite
sudo a2enmod expires
sudo systemctl restart apache2
```

---

## 🔵 Option 6: Firebase Hosting

### Setup
```bash
npm install -g firebase-tools
npm run build
firebase login
firebase init hosting
# Select your project
# Set public directory to: dist
firebase deploy
```

**firebase.json**:
```json
{
  "hosting": {
    "public": "dist",
    "rewrites": [{
      "source": "**",
      "destination": "/index.html"
    }]
  }
}
```

**Pros**: Free tier, fast, Firebase integration  
**Cons**: Tied to Firebase ecosystem

---

## 🔵 Option 7: AWS S3 + CloudFront

### Setup
```bash
# 1. Create S3 bucket
aws s3 mb s3://my-redup-app

# 2. Build and upload
npm run build
aws s3 sync dist/ s3://my-redup-app/

# 3. Create CloudFront distribution
# (Use AWS Console for this)
```

**S3 Bucket Policy** (for public access):
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::my-redup-app/*"
    }
  ]
}
```

**CloudFront Behavior**:
- Default Root Object: `index.html`
- Error Pages: 404 → `/index.html`

---

## 🟣 Option 8: Docker

### Dockerfile
```dockerfile
FROM node:18 as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### nginx.conf
```nginx
server {
    listen 80;
    location / {
        root /usr/share/nginx/html;
        index index.html;
        try_files $uri /index.html;
    }
}
```

### Build & Run
```bash
docker build -t redup .
docker run -p 80:80 redup
# Visit http://localhost
```

### Push to Docker Hub
```bash
docker tag redup yourusername/redup
docker push yourusername/redup
```

---

## 🟣 Option 9: Heroku (Static)

### Create Procfile
```
web: npm run preview -- --host 0.0.0.0 --port $PORT
```

### Deploy
```bash
heroku login
heroku create your-app-name
npm run build
git push heroku main
```

**Note**: Heroku is shutting down free tier, not recommended anymore.

---

## 📱 Option 10: Android/iOS App (Cordova/Capacitor)

### Using Capacitor
```bash
npm install @capacitor/core @capacitor/cli
npx cap init redup com.example.redup
npm run build
npx cap add android
npx cap add ios
npx cap sync
npx cap open android  # Build in Android Studio
npx cap open ios      # Build in Xcode
```

---

## 🔄 Continuous Deployment Setup

### GitHub Actions (Netlify)
```yaml
name: Deploy to Netlify
on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install && npm run build
      - uses: nwtgck/actions-netlify@v1.2
        with:
          publish-dir: './dist'
          production-branch: main
          github-token: ${{ secrets.GITHUB_TOKEN }}
          deploy-message: "Deployed from GitHub Actions"
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

### GitHub Actions (Custom Server)
```yaml
name: Deploy to Server
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install && npm run build
      - uses: appleboy/scp-action@master
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME }}
          key: ${{ secrets.SSH_KEY }}
          source: "dist/*"
          target: "/var/www/redup"
```

---

## 🎯 Recommended Setup by Use Case

### 🟢 **For Learning/Testing**
→ Use Netlify Drop (easiest)

### 🟢 **For Personal Project**
→ Use GitHub Pages (free)

### 🟢 **For Production (Small Team)**
→ Use Vercel or Netlify (scale automatically)

### 🟠 **For Production (Enterprise)**
→ Use self-hosted Nginx/Apache (full control)

### 🟠 **For High Traffic**
→ Use AWS S3 + CloudFront (CDN)

### 🔵 **For Google Cloud Integration**
→ Use Firebase Hosting

---

## 📋 Pre-Deployment Checklist

- [ ] Run `npm run build`
- [ ] Test locally with `npm run preview`
- [ ] Check console for errors
- [ ] Verify localStorage works
- [ ] Test on mobile device
- [ ] Test dark mode
- [ ] Test quiz functionality
- [ ] Test login/register
- [ ] Check file sizes
- [ ] Enable HTTPS

---

## 🚀 Quick Deploy Commands

```bash
# Build
npm run build

# Netlify
netlify deploy --prod --dir=dist

# Vercel
vercel --prod

# Firebase
firebase deploy

# Custom Server
scp -r dist/* user@server:/var/www/redup/

# Docker
docker build -t redup . && docker push yourusername/redup
```

---

**Status**: Ready to deploy! 🚀  
**Version**: 2.0  
**Type**: Client-Side SPA
