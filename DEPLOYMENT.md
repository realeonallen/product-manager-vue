# GitHub Pages Deployment Guide

This guide explains how to deploy the Product Manager app to GitHub Pages.

## Prerequisites

1. A GitHub account
2. Git installed on your machine
3. Node.js and npm installed

## Steps

### 1. Create a GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Create a repository named `product-manager` (or your preferred name)
3. Make it **public**
4. Do NOT initialize with README/gitignore (we already have them)

### 2. Initialize Git and Push Code

```powershell
cd C:\Users\Leon\Downloads\Django\product-app

# Initialize git
git init
git add .
git commit -m "Initial commit: Product Manager app"

# Add remote (replace YOUR_USERNAME and YOUR_REPO)
git remote add origin https://github.com/YOUR_USERNAME/product-manager.git

# Push to main branch
git branch -M main
git push -u origin main
```

### 3. Build the Project

```powershell
npm run build
```

This creates a `dist/` folder with the production build.

### 4. Configure for GitHub Pages

**Option A: Deploy from main branch /dist folder**

1. Go to your repository on GitHub
2. Settings → Pages
3. Under "Build and deployment", select:
   - Source: **Deploy from a branch**
   - Branch: **main**, folder: **/dist**
4. Click Save

The site will be available at `https://YOUR_USERNAME.github.io/product-manager`

**Option B: Use GitHub Actions (Recommended)**

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

Push this file and GitHub will automatically build and deploy on each push to main.

### 5. Update Vite Config (if repo is NOT named after your username)

If your repo is at `github.com/YOUR_USERNAME/product-manager`, add to `vite.config.js`:

```js
export default defineConfig({
  base: '/product-manager/',  // Change to your repo name
  plugins: [vue()],
  ...
})
```

Then rebuild:
```powershell
npm run build
git add .
git commit -m "Update base path for GitHub Pages"
git push
```

### 6. Verify Deployment

1. Visit `https://YOUR_USERNAME.github.io/product-manager`
2. Test login with credentials: `kminchelle` / `0lelplR`
3. Navigate through products

## Troubleshooting

- **Blank page?** – Check browser console for errors; may need to update `base` in `vite.config.js`
- **API errors?** – DummyJSON API must be accessible from your network
- **Not updating?** – GitHub Pages may cache; clear browser cache and try incognito mode

## Tips

- Commit often and write clear commit messages
- Test locally with `npm run dev` before pushing
- GitHub Pages builds may take 1-2 minutes after push
