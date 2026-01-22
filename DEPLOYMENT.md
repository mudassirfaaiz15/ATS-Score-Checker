# Deployment Guide

This guide will help you deploy your ATS Score Checker application to various hosting platforms.

## 🚀 Quick Deploy Options

### Option 1: Vercel (Recommended - Easiest)

Vercel is the easiest and fastest way to deploy your Vite app.

#### Method A: Deploy via Vercel CLI

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```
   Follow the prompts:
   - Set up and deploy? **Yes**
   - Which scope? (Select your account)
   - Link to existing project? **No**
   - Project name? (Press Enter for default or enter a custom name)
   - Directory? (Press Enter for current directory)
   - Override settings? **No**

4. **Deploy to production**:
   ```bash
   vercel --prod
   ```

#### Method B: Deploy via GitHub (Recommended for Portfolio)

1. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/ats-score-checker.git
   git push -u origin main
   ```

2. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Vite settings
   - Click "Deploy"
   - Your app will be live in ~2 minutes!

3. **Your app URL**: `https://your-project-name.vercel.app`

---

### Option 2: Netlify

#### Method A: Deploy via Netlify CLI

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Login**:
   ```bash
   netlify login
   ```

3. **Deploy**:
   ```bash
   netlify deploy --prod
   ```
   - Create & configure a new site? **Yes**
   - Team: (Select your team)
   - Site name: (Press Enter for random name or enter custom)

#### Method B: Deploy via GitHub

1. **Push to GitHub** (same as Vercel Method B)

2. **Deploy on Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub and select your repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Click "Deploy site"

3. **Your app URL**: `https://your-site-name.netlify.app`

---

### Option 3: GitHub Pages

1. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json** scripts:
   ```json
   "scripts": {
     "build": "vite build",
     "dev": "vite",
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

3. **Update vite.config.ts** - Add base path:
   ```typescript
   export default defineConfig({
     base: '/your-repo-name/', // Replace with your GitHub repo name
     // ... rest of config
   })
   ```

4. **Deploy**:
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages**:
   - Go to your repo → Settings → Pages
   - Source: `gh-pages` branch
   - Your app: `https://YOUR_USERNAME.github.io/your-repo-name/`

---

### Option 4: Render

1. **Push to GitHub** (same as above)

2. **Deploy on Render**:
   - Go to [render.com](https://render.com)
   - Click "New +" → "Static Site"
   - Connect your GitHub repository
   - Settings:
     - Name: Your project name
     - Build Command: `npm run build`
     - Publish Directory: `dist`
   - Click "Create Static Site"

3. **Your app URL**: `https://your-app-name.onrender.com`

---

## 📝 Pre-Deployment Checklist

- [x] Build works locally (`npm run build`)
- [ ] Code is pushed to GitHub (for portfolio showcase)
- [ ] README.md is updated with project description
- [ ] No sensitive data in code
- [ ] All dependencies are in package.json

## 🔧 Troubleshooting

### Build Fails
- Make sure all dependencies are installed: `npm install`
- Check for TypeScript errors: `npm run build`
- Verify Node.js version (18+)

### 404 Errors on Routes
- Make sure you have the redirect/rewrite rules configured (already in `vercel.json` and `netlify.toml`)
- For GitHub Pages, ensure base path is set in `vite.config.ts`

### Assets Not Loading
- Check that all file paths use relative paths
- Verify build output in `dist` folder

## 🌐 Custom Domain (Optional)

### Vercel
1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

### Netlify
1. Go to Site Settings → Domain Management
2. Add custom domain
3. Configure DNS as instructed

## 📊 Recommended for Portfolio

**Best Choice: Vercel via GitHub**
- ✅ Free forever
- ✅ Automatic deployments on git push
- ✅ Custom domain support
- ✅ Fast CDN
- ✅ Easy to showcase in portfolio

---

## Quick Start Commands

```bash
# Build locally
npm run build

# Deploy to Vercel (after installing CLI)
vercel

# Deploy to Netlify (after installing CLI)
netlify deploy --prod
```
