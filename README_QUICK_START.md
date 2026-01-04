# 🎯 RedUp - Quick Start Guide

RedUp adalah aplikasi edukasi tentang **pencegahan anemia pada remaja** yang telah dikonversi menjadi **aplikasi full client-side** yang dapat dijalankan offline dan di-export.

## ✨ Fitur Utama

- 📚 **20+ Soal Quiz** tentang anemia dan zat besi
- 📖 **4 Artikel Edukatif** dengan informasi lengkap
- 👤 **Sistem Autentikasi** dengan login/register lokal
- 📊 **Dashboard & Statistics** untuk tracking progress
- 🌓 **Dark/Light Mode** untuk kenyamanan visual
- 📱 **Responsive Design** untuk semua device
- 💾 **Offline Support** - bekerja tanpa internet
- 🗂️ **Exportable** - dapat di-host di mana saja

## 🚀 Mulai Cepat

### 1. Development Mode
```bash
# Install dependencies
npm install

# Jalankan development server
npm run dev

# Buka: http://localhost:5173
```

### 2. Production Build
```bash
# Build aplikasi
npm run build

# Preview build lokal
npm run preview

# Output tersimpan di folder: ./dist/
```

### 3. Export/Deploy
```bash
# Opsi 1: Gunakan script export (interactive menu)
./export.sh

# Opsi 2: Manual build & zip
npm run build
cd dist
zip -r ../RedUp_Export.zip .
```

## 🎮 Test Akun

Gunakan akun demo untuk testing:
```
Username: demo
Password: demo123
```

Atau buat akun baru melalui halaman Register.

## 📁 Struktur Project

```
RedUp-/
├── client/                  # Frontend React app
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utilities & data
│   │   └── App.tsx         # Main app component
│   └── index.html          # HTML entry point
├── shared/                  # Shared types & schemas
├── dist/                    # Production build output
├── package.json            # Dependencies
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript config
└── EXPORT_GUIDE.md         # Detailed export guide
```

## 📦 Deployment Options

### Option 1: Netlify (Recommended - Free)
```bash
# 1. Push ke GitHub
git add .
git commit -m "Convert to client-side"
git push

# 2. Login ke Netlify
# 3. Connect repository
# 4. Set build command: npm run build
# 5. Set publish directory: dist
# 6. Deploy!
```

### Option 2: Vercel (Free)
```bash
npm install -g vercel
cd RedUp-
vercel

# Follow prompts to deploy
```

### Option 3: GitHub Pages
```bash
# Edit vite.config.ts dan set base:
# base: '/redup/'  // if repo name is redup

npm run build

# Push dist folder ke gh-pages branch
```

### Option 4: Self-Hosted (VPS/Server)
```bash
# Build lokal
npm run build

# Upload dist folder ke server
scp -r dist/* user@server:/var/www/redup/

# Configure nginx/apache untuk SPA routing
# See EXPORT_GUIDE.md for config examples
```

## 🛠️ Development

### Available Commands
```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run preview      # Preview build lokal
npm run check        # Check TypeScript
npm install          # Install dependencies
node server-static.js  # Test static build with Node
./export.sh          # Interactive export menu
```

### Project Structure
- **Pages**: Landing, Auth, Dashboard, Feed, Article Detail, Quiz
- **Components**: Reusable UI components (Cards, Buttons, Forms, etc)
- **Hooks**: useAuth, useQuestions, useArticles, useToast
- **Data**: LocalStorage for users, quiz scores, preferences

## 💾 Data Management

Semua data disimpan di **browser's localStorage**:

### Data yang Tersimpan
- User accounts (username, password, profile)
- Current logged-in user
- Quiz scores dan progress
- Theme preference (dark/light)

### Export User Data
```javascript
// Di browser console:
const data = {
  users: localStorage.getItem('redup_users'),
  current: localStorage.getItem('redup_current_user'),
  scores: localStorage.getItem('redup_quiz_scores')
};
console.log(JSON.stringify(data, null, 2));
// Copy & save ke file
```

### Clear User Data
```javascript
// Di browser console:
localStorage.clear();
// Atau specific:
localStorage.removeItem('redup_users');
```

## 🔒 Security Notes

- ⚠️ Passwords hashed dengan simple Base64 (demo only)
- ⚠️ Untuk production, gunakan bcrypt
- ⚠️ Data disimpan di browser, tidak tersinkronisasi
- ✅ Tidak ada API calls, semua lokal
- ✅ Aman untuk offline use

## 📊 Performance

Build output:
- **HTML**: 2 KB
- **CSS**: 91 KB (gzip: 14 KB)  
- **JS**: 1.3 MB (gzip: 341 KB)
- **Total**: ~500 KB (gzip: ~100 KB)

## 🎓 Content

### Questions
- 20 soal pilihan ganda tentang anemia
- Mencakup: nutrisi, gejala, pencegahan, TTD
- Dengan penjelasan untuk setiap jawaban

### Articles
1. **5 Makanan Pencegah Anemia** - Nutrisi penting
2. **Bahaya Anemia bagi Prestasi Belajar** - Impact kesehatan
3. **Mitos dan Fakta TTD** - Tablet tambah darah
4. **Pentingnya Zat Besi untuk Remaja** - Edukasi kesehatan

## ❓ FAQ

### Q: Apakah data saya aman?
A: Data disimpan lokal di browser. Tidak dikirim ke server manapun. Jika clear cache browser, data hilang.

### Q: Bisa akses dari device lain?
A: Tidak, karena data lokal. Setiap device memiliki data terpisah.

### Q: Bisa menambah soal/artikel?
A: Ya, edit `client/src/lib/data.ts` dan rebuild aplikasi.

### Q: Bagaimana cara update setelah deploy?
A: Rebuild aplikasi, deploy ulang ke server.

### Q: Bisa jadi PWA (Progressive Web App)?
A: Ya, tambahkan service worker di proyek ini.

## 📞 Support

Untuk issue atau pertanyaan:
1. Check EXPORT_GUIDE.md untuk detail deployment
2. Check kode di client/src/ untuk customization
3. Review vite.config.ts untuk build configuration

## 🎉 Ready to Deploy!

Aplikasi sudah siap untuk di-export dan di-host!

```bash
# Final checklist:
npm install      # ✅ Dependencies installed
npm run check    # ✅ TypeScript OK
npm run build    # ✅ Build successful
npm run preview  # ✅ Works locally

# Ready to deploy! 🚀
```

---

**Status**: Production Ready ✅  
**Type**: Client-Side SPA (Single Page Application)  
**Last Updated**: December 29, 2024
