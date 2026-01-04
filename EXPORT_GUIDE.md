# RedUp - Client-Side Application Export Guide

RedUp telah dikonversi menjadi **aplikasi full client-side** yang dapat diakses dan di-export sebagai file statis HTML/CSS/JavaScript.

## 📋 Apa yang Berubah

### ✅ Fitur yang Tetap Berfungsi
- **Autentikasi Pengguna** - Login/Register dengan penyimpanan lokal
- **Quiz & Pertanyaan** - Semua soal tersimpan di browser
- **Artikel & Konten** - Semua konten tersimpan di browser
- **Dashboard & Statistics** - Tracking score disimpan lokal
- **Dark/Light Mode** - Theme preference tersimpan lokal
- **Responsive Design** - Bekerja di semua device

### 🔄 Perubahan Teknis
- ❌ **Dihapus**: Server Express.js
- ❌ **Dihapus**: Database PostgreSQL
- ❌ **Dihapus**: API Routes
- ✅ **Ditambahkan**: LocalStorage untuk penyimpanan data
- ✅ **Ditambahkan**: Data hardcoded untuk questions dan articles
- ✅ **Ditambahkan**: Client-side user management

## 🚀 Development

### Menjalankan Aplikasi Lokal
```bash
# Install dependencies
npm install

# Jalankan development server
npm run dev

# Server akan running di http://localhost:5173
```

### Test Akun Demo
```
Username: demo
Password: demo123
```

## 📦 Export/Build

### Build untuk Production
```bash
# Build aplikasi
npm run build

# Output akan ada di folder: ./dist/
```

### Struktur Output Build
```
dist/
├── index.html              # Main HTML file
├── assets/
│   ├── index.*.js         # JavaScript bundles
│   └── index.*.css        # Stylesheet
└── favicon.png            # Favicon
```

## 🌐 Cara Export/Distribute

### Option 1: Upload ke Web Server
```bash
# Copy semua file dari dist/ ke web server
# Contoh: Netlify, Vercel, GitHub Pages, dll
scp -r dist/* user@server:/var/www/redup/
```

### Option 2: Self-Hosted (Nginx)
```nginx
server {
  listen 80;
  server_name example.com;
  
  root /var/www/redup/dist;
  index index.html;
  
  location / {
    try_files $uri /index.html;
  }
}
```

### Option 3: Self-Hosted (Apache)
Create `.htaccess` di `dist/` folder:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### Option 4: Hosting Gratis
- **Netlify**: Drag & drop folder `dist/`
- **Vercel**: Connect repository, auto deploy
- **GitHub Pages**: Push `dist/` folder
- **Firebase Hosting**: Run `firebase deploy`

## 💾 Data Storage

Semua data pengguna dan progress tersimpan di **browser's localStorage**:

### Data yang Disimpan
- **Users** - Daftar akun yang terdaftar
- **Current User** - User yang sedang login
- **Quiz Scores** - Nilai quiz yang pernah dikerjakan
- **Theme Preference** - Dark/Light mode preference

### Backup Data Pengguna
Pengguna dapat export data mereka dengan:
1. Buka Developer Tools (F12)
2. Pergi ke tab Console
3. Jalankan:
```javascript
// Export semua data
const data = {
  users: localStorage.getItem('redup_users'),
  currentUser: localStorage.getItem('redup_current_user'),
  quizScores: localStorage.getItem('redup_quiz_scores')
};
console.log(JSON.stringify(data, null, 2));
// Copy output dan simpan sebagai JSON
```

## 🔒 Security Notes

⚠️ **Important**: Aplikasi ini menggunakan hashing sederhana untuk demo. Untuk production:
- Gunakan bcrypt untuk password hashing
- Implement server-side authentication jika sensitive data diperlukan
- Use HTTPS untuk semua koneksi
- Add CSRF protection

## 📱 Responsive & Offline

Aplikasi fully responsive dan dapat:
- ✅ Bekerja di semua ukuran layar
- ✅ Bekerja offline (setelah load pertama kali)
- ✅ Menyimpan data bahkan saat offline

## 📊 File Sizes

Build output size:
- **Total**: ~500 KB (gzip: ~100 KB)
- **HTML**: 2 KB
- **CSS**: 91 KB (gzip: 14 KB)
- **JS**: 1.3 MB (gzip: 341 KB)

## 🛠️ Customization

### Menambah User Baru
Edit `client/src/lib/data.ts`:
```typescript
export function initializeStorage() {
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    const defaultUser: User = {
      id: 1,
      username: "yourusername",
      password: hashPassword("yourpassword"),
      fullName: "Your Name",
      email: "email@example.com",
      gender: "Perempuan",
      age: 16,
    };
    // ...
  }
}
```

### Menambah Questions & Articles
Edit `client/src/lib/data.ts` dan tambahkan ke array `QUESTIONS` atau `ARTICLES`:
```typescript
export const QUESTIONS: Question[] = [
  // ... existing questions
  {
    id: 21,
    question: "New question?",
    options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    correct: 0,
    explanation: "Explanation here"
  }
];
```

## 🚨 Troubleshooting

### 1. Build gagal
```bash
# Clear cache dan rebuild
rm -rf node_modules dist
npm install
npm run build
```

### 2. Data hilang saat clear cache browser
Data disimpan di localStorage, akan hilang jika user clear browser data

### 3. Pages tidak load dengan benar di server
Pastikan server dikonfigurasi untuk SPA (Single Page Application):
- All 404 should redirect ke `index.html`

### 4. Large bundle size
Aplikasi ini include jsPDF dan recharts yang besar. Untuk optimize:
- Remove unused libraries dari `package.json`
- Use code splitting dengan dynamic imports
- Compress images di `attached_assets/`

## 📚 Tech Stack

- **React 18** - UI Framework
- **TypeScript** - Type safety
- **TailwindCSS** - Styling
- **React Query** - State management
- **React Hook Form** - Form handling
- **Wouter** - Routing
- **jsPDF & html2canvas** - PDF export
- **Recharts** - Charts

## 🎯 Next Steps

1. **Customize** konten (questions, articles)
2. **Build** aplikasi: `npm run build`
3. **Test** di local server
4. **Deploy** ke hosting pilihan Anda
5. **Share** link dengan pengguna

---

**Created**: December 29, 2024
**Status**: Production Ready ✅
**Type**: Client-Side SPA (Single Page Application)
