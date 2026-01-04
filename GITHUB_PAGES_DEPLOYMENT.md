# GitHub Pages Deployment Guide

## What's Been Set Up

Your RedUp application is now configured for GitHub Pages deployment with:

1. ✅ **Base Path Configuration** - `vite.config.ts` updated with `base: "/RedUp-/"`
2. ✅ **GitHub Actions Workflow** - Automatic build and deployment on every push to main
3. ✅ **Build Verified** - Project builds successfully

## Deployment Steps

### 1. Enable GitHub Pages (One-time setup)
1. Go to your GitHub repository: `https://github.com/nnaurahasnaa-stack/RedUp-`
2. Navigate to **Settings → Pages**
3. Under "Build and deployment":
   - **Source**: Select "GitHub Actions"
   - Leave everything else as default
4. Save

### 2. Push to GitHub
```bash
git add .
git commit -m "Setup GitHub Pages deployment"
git push origin main
```

### 3. Monitor Deployment
1. Go to **Actions** tab in your repository
2. Watch the "Deploy to GitHub Pages" workflow run
3. Once complete, your site will be live at: `https://nnaurahasnaa-stack.github.io/RedUp-`

## How It Works

Every time you push to the `main` branch:
1. GitHub Actions automatically runs the workflow
2. Installs dependencies
3. Runs type checks
4. Builds the production bundle
5. Deploys to GitHub Pages

## Access Your Site

Your RedUp application will be live at:
```
https://nnaurahasnaa-stack.github.io/RedUp-
```

## Local Testing Before Deployment

To test the production build locally:
```bash
npm run build
npm run preview
```

Then visit `http://localhost:4173/RedUp-/` (note the `/RedUp-/` path)

## Troubleshooting

### Deployment Failed?
- Check the **Actions** tab for error logs
- Ensure all tests pass: `npm run check`
- Verify the build works: `npm run build`

### Site Shows 404?
- Make sure you're accessing: `https://nnaurahasnaa-stack.github.io/RedUp-/`
- Not: `https://nnaurahasnaa-stack.github.io/RedUp-` (missing trailing slash)
- Clear browser cache

### Pages Not Enabled?
- Go to repository Settings → Pages
- Ensure "GitHub Actions" is selected as the source
- GitHub Actions must be enabled for the repository

## Files Modified

- `.github/workflows/deploy.yml` - New GitHub Actions workflow
- `vite.config.ts` - Added `base: "/RedUp-/"` for correct path routing
