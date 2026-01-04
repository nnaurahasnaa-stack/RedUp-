# 📚 RedUp Documentation Index

Complete documentation for the converted client-side application.

---

## 🎯 Start Here

### For First-Time Users
1. **[README_QUICK_START.md](README_QUICK_START.md)** - Quick start guide
   - Installation
   - Development commands
   - How to deploy
   - FAQ

### For Deployment
1. **[DEPLOYMENT_SCENARIOS.md](DEPLOYMENT_SCENARIOS.md)** - Deployment guides
   - 10 deployment options
   - Step-by-step instructions
   - Recommended setups

2. **[EXPORT_GUIDE.md](EXPORT_GUIDE.md)** - Detailed export guide
   - Export instructions
   - Self-hosting guides
   - Data management
   - Customization

---

## 📖 Detailed Documentation

### Understanding the Conversion
- **[CONVERSION_SUMMARY.md](CONVERSION_SUMMARY.md)**
  - What changed
  - How it works now
  - Security notes
  - Testing checklist

- **[CONVERSION_CHECKLIST.md](CONVERSION_CHECKLIST.md)**
  - Complete checklist of changes
  - Phase-by-phase breakdown
  - Success criteria ✅

### Development Documentation
- **[client/requirements.md](client/requirements.md)**
  - Package notes
  - Tailwind configuration

---

## 🛠️ Tools & Scripts

### export.sh
Interactive export menu script:
```bash
./export.sh
```

Options:
1. Build Production
2. Preview Build Locally
3. Export to ZIP file
4. Show Export Guide
5. Clean & Rebuild
6. Exit

### server-static.js
Local static file server for testing:
```bash
node server-static.js
# Accesses http://localhost:3000
```

---

## 📂 Project Structure

```
RedUp-/
├── 📖 Documentation
│   ├── README_QUICK_START.md        ← Start here
│   ├── EXPORT_GUIDE.md              ← How to export/deploy
│   ├── DEPLOYMENT_SCENARIOS.md      ← 10 deployment options
│   ├── CONVERSION_SUMMARY.md        ← What changed
│   ├── CONVERSION_CHECKLIST.md      ← Completion checklist
│   └── DOCUMENTATION_INDEX.md       ← This file
│
├── 🎯 Source Code
│   ├── client/                      ← React app
│   │   ├── src/
│   │   │   ├── components/          ← UI components
│   │   │   ├── pages/              ← Page components
│   │   │   ├── hooks/              ← React hooks (use-auth, use-content)
│   │   │   ├── lib/
│   │   │   │   └── data.ts         ← LocalStorage & data management
│   │   │   └── App.tsx             ← Main app
│   │   └── index.html              ← HTML entry point
│   │
│   └── shared/                      ← Shared types
│       ├── routes.ts               ← API definitions (no longer used)
│       └── schema.ts               ← Database schemas
│
├── 🔧 Configuration
│   ├── package.json                ← Dependencies & scripts
│   ├── vite.config.ts              ← Build configuration
│   ├── tsconfig.json               ← TypeScript configuration
│   ├── tailwind.config.ts          ← Tailwind CSS
│   └── postcss.config.js           ← PostCSS
│
├── 📦 Build Output
│   └── dist/                        ← Production build (ready to deploy)
│       ├── index.html
│       ├── assets/
│       │   ├── *.js                ← JavaScript bundles
│       │   └── *.css               ← CSS bundles
│       └── favicon.png
│
├── 🛠️ Scripts
│   ├── export.sh                    ← Export helper script
│   ├── server-static.js            ← Local testing server
│   └── script/build.ts             ← (removed - no longer needed)
│
└── 📚 Assets
    └── attached_assets/            ← Images & files
```

---

## 🚀 Quick Command Reference

### Development
```bash
npm install         # Install dependencies
npm run dev         # Start dev server (http://localhost:5173)
npm run check       # Check TypeScript
```

### Building
```bash
npm run build       # Build for production
npm run preview     # Preview built app locally
```

### Export & Deploy
```bash
./export.sh         # Interactive export menu
npm run build && npm run preview  # Test build
node server-static.js             # Run local server
```

---

## 📋 Feature Documentation

### Authentication
- **Location**: `client/src/hooks/use-auth.ts`
- **Storage**: LocalStorage (`redup_users`, `redup_current_user`)
- **Demo Account**: username: `demo`, password: `demo123`
- **Features**: Login, Register, Logout, Password verification

### Content (Questions & Articles)
- **Location**: `client/src/lib/data.ts`
- **Questions**: 20 questions about anemia
- **Articles**: 4 educational articles
- **Customization**: Edit arrays in data.ts and rebuild

### Data Persistence
- **Storage**: Browser's LocalStorage
- **Keys**: `redup_users`, `redup_current_user`, `redup_quiz_scores`
- **Backup**: Export via browser console
- **Restore**: Paste JSON into localStorage

### Quiz & Scoring
- **Location**: `client/src/pages/quiz.tsx`
- **Scoring**: Auto-calculated on submission
- **Persistence**: Stored in `redup_quiz_scores`
- **Dashboard**: Shows statistics and history

---

## 🎯 Common Tasks

### Add New Questions
Edit `client/src/lib/data.ts`:
```typescript
export const QUESTIONS: Question[] = [
  // ... existing
  {
    id: 21,
    question: "Your question?",
    options: ["A", "B", "C", "D"],
    correct: 0,
    explanation: "Your explanation"
  }
];
```

### Add New Articles
Edit `client/src/lib/data.ts`:
```typescript
export const ARTICLES: Article[] = [
  // ... existing
  {
    id: 5,
    title: "Article Title",
    excerpt: "Short description",
    content: "Full content...",
    category: "Category",
    imageUrl: "image-url"
  }
];
```

### Change Demo Account
Edit `client/src/lib/data.ts` in `initializeStorage()`:
```typescript
const defaultUser: User = {
  id: 1,
  username: "newusername",
  password: hashPassword("newpassword"),
  // ... other fields
};
```

### Customize Styling
- **CSS**: `client/src/index.css`
- **Tailwind**: `tailwind.config.ts`
- **Theme**: `client/src/components/theme-provider.tsx`

### Deploy to Netlify
```bash
npm run build
# Drag dist/ to Netlify
```

### Deploy to Vercel
```bash
npm run build
vercel --prod
```

### Deploy to Custom Server
```bash
npm run build
scp -r dist/* user@server:/var/www/redup/
# Configure server for SPA routing
```

---

## 🔍 Understanding the Code

### Main App Flow
1. **App.tsx** - Initializes theme, routes
2. **Router** - Handles page navigation (wouter)
3. **Pages** - Display content
4. **Hooks** - Manage state (useAuth, useContent)
5. **Components** - Reusable UI elements

### Authentication Flow
1. User submits form → `auth-page.tsx`
2. Hook calls `use-auth.ts`
3. `use-auth.ts` checks localStorage
4. If valid → Set current user in localStorage
5. Query cache updated → Pages re-render

### Data Flow
1. App mounts → `initializeStorage()`
2. Default user created if needed
3. Current user loaded from localStorage
4. Pages query data from hooks
5. Hooks return embedded data

### Build Process
1. TypeScript compiled to JS
2. React components bundled
3. CSS processed with Tailwind
4. Assets optimized
5. SPA HTML + JS + CSS generated
6. Output in `dist/` folder

---

## 📊 Statistics

| Metric | Value |
|--------|-------|
| Total Questions | 20 |
| Total Articles | 4 |
| Bundle Size | 1.4 MB |
| Gzipped Size | ~100 KB |
| Build Time | ~8s |
| Dev Server | ~450ms startup |
| Component Count | 30+ |
| Supported Browsers | All modern browsers |

---

## ✅ Verification Checklist

Before deploying, verify:
- [ ] `npm run check` passes ✅
- [ ] `npm run build` completes ✅
- [ ] `npm run preview` works ✅
- [ ] Login/Register works
- [ ] Quiz functionality works
- [ ] Articles load correctly
- [ ] Dark mode toggles
- [ ] Responsive on mobile
- [ ] LocalStorage persists data
- [ ] No console errors

---

## 🆘 Troubleshooting

### Build Fails
```bash
rm -rf node_modules dist
npm install
npm run build
```

### Dev Server Won't Start
```bash
npm install
npm run dev
```

### Data Lost
- LocalStorage was cleared
- Use browser DevTools to restore from backup
- See EXPORT_GUIDE.md for backup/restore

### Deployment Not Working
- Check SPA routing configuration
- Ensure all 404s redirect to index.html
- Check file permissions on server
- Review DEPLOYMENT_SCENARIOS.md

### Questions/Articles Not Showing
- Check `client/src/lib/data.ts`
- Verify arrays are populated
- Rebuild with `npm run build`

---

## 📞 Getting Help

1. **Check Documentation**
   - Start with README_QUICK_START.md
   - Check DEPLOYMENT_SCENARIOS.md for your platform
   - Review EXPORT_GUIDE.md for detailed help

2. **Check Code**
   - Review inline comments in source files
   - Check TypeScript types for guidance
   - Look at component props in ui/ folder

3. **Debug Issues**
   - Check browser console (F12)
   - Check localStorage in DevTools
   - Review build output for errors
   - Enable verbose logging

---

## 📝 Glossary

- **SPA** - Single Page Application
- **Build** - Compile source to dist/
- **Vite** - Build tool & dev server
- **TypeScript** - JavaScript with types
- **React Query** - State management for async data
- **Tailwind** - Utility-first CSS framework
- **LocalStorage** - Browser data persistence
- **Wouter** - Lightweight routing library

---

## 🎉 You're Ready!

Everything you need to deploy RedUp:
1. ✅ Source code (client-side only)
2. ✅ Build system (Vite)
3. ✅ Documentation (comprehensive)
4. ✅ Export tools (scripts)
5. ✅ Deployment guides (10 options)

**Pick a deployment option and deploy!** 🚀

---

**Last Updated**: December 29, 2024  
**Status**: ✅ Complete & Production Ready
