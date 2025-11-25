# 🚀 Quick Deployment Checklist

Follow these steps to submit your project to AlienSoft Technologies.

## Step 1: Install Dependencies

```powershell
cd C:\Users\Leon\Downloads\Django\product-app
npm install
npm run dev
```

**Test the app at `http://localhost:5173`**
- Login with: `kminchelle` / `0lelplR`
- Navigate through products
- Test add, view, and delete functionality

Press `Ctrl+C` to stop the dev server.

---

## Step 2: Create GitHub Repository

1. Go to https://github.com/new
2. **Repository name:** `product-manager` (or your preferred name)
3. **Visibility:** PUBLIC
4. **Do NOT** initialize with README/gitignore
5. Click "Create repository"

---

## Step 3: Initialize Git & Push Code

```powershell
cd C:\Users\Leon\Downloads\Django\product-app

# Initialize git
git init

# Stage all files
git add .

# Create initial commit
git commit -m "Initial commit: Product Manager app with Vue 3, Tailwind, Pinia"

# Add remote origin (REPLACE YOUR_USERNAME with your actual GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/product-manager.git

# Rename branch to main (if not already)
git branch -M main

# Push to GitHub
git push -u origin main
```

**Verify:** Check GitHub repo - all files should be there

---

## Step 4: Build & Deploy

### Option A: GitHub Pages with /dist (Simple)

```powershell
# Build production version
npm run build

# This creates a 'dist' folder - commit it
git add dist
git commit -m "Build: Add production distribution"
git push
```

Then on GitHub:
1. Go to **Settings → Pages**
2. Under "Build and deployment":
   - Source: **Deploy from a branch**
   - Branch: **main**
   - Folder: **/dist**
3. Click **Save**
4. Wait 1-2 minutes
5. Site available at: `https://YOUR_USERNAME.github.io/product-manager`

### Option B: GitHub Actions (Automatic)

GitHub Actions workflow is already configured in `.github/workflows/deploy.yml`

```powershell
# Just push to main - it auto-builds and deploys!
git push origin main
```

Then:
1. Go to **Settings → Pages**
2. Under "Build and deployment":
   - Source: **GitHub Actions**
3. Site will deploy automatically on every push

---

## Step 5: Verify Deployment

1. Wait for GitHub Pages to build (check **Actions** tab)
2. Visit `https://YOUR_USERNAME.github.io/product-manager`
3. Test login, browse products, add/delete functionality
4. Confirm all features work

---

## Step 6: Submit

Email **hr@aliensoft.co.ke** with:

**Subject:** Frontend Technical Test Submission - Product Manager App

**Body:**
```
Hello,

Please find my submission for the Frontend Technical Test below:

GitHub Repository: https://github.com/YOUR_USERNAME/product-manager
Deployed App: https://YOUR_USERNAME.github.io/product-manager

The app includes:
- Vue 3 with Composition API
- Pinia state management
- Tailwind CSS styling (primary color: #000080)
- Vue Router with route guards
- DummyJSON API integration
- All 4 required pages (Login, Products, ProductView, AddProduct)
- GitHub Pages deployment

Test credentials:
- Username: kminchelle
- Password: 0lelplR

Thank you for considering my application for the Frontend Developer Intern position.

Best regards,
[Your Name]
```

**Deadline:** November 25, 2025, 2:00 PM (Africa/Nairobi time)

---

## ⚠️ Troubleshooting

### `npm` not found
- Install Node.js: https://nodejs.org
- Or run `setup-windows.bat`

### `git` not found
- Install Git: https://git-scm.com/download/win

### Port 5173 already in use
- Edit `vite.config.js` and change port
- Or kill existing process: `Get-Process node | Stop-Process`

### GitHub Pages not updating
- Check **Actions** tab for build errors
- Clear browser cache or try incognito mode
- Ensure `dist` folder is committed

### Blank page after deploy
- Update `base` path in `vite.config.js`:
  ```js
  export default defineConfig({
    base: '/product-manager/',  // Change to your repo name
    ...
  })
  ```
- Rebuild: `npm run build`
- Commit and push again

---

## 📞 Support

If you encounter issues:
1. Check **DEPLOYMENT.md** for detailed instructions
2. Check GitHub **Actions** tab for build errors
3. Review **README.md** for setup requirements
4. Verify Node.js version: `node -v` (should be 18+)

---

## ✅ Final Checklist Before Submitting

- [ ] All 4 pages working (Login, Products, ProductView, AddProduct)
- [ ] Login works with `kminchelle` / `0lelplR`
- [ ] Search filters products
- [ ] Can add new product
- [ ] Can view product details
- [ ] Can delete product
- [ ] Logout works
- [ ] Can refresh page without losing session
- [ ] App deployed to GitHub Pages
- [ ] All files pushed to GitHub
- [ ] README.md explains how to run locally
- [ ] Code is clean and well-organized
- [ ] Ready to submit email with GitHub & deployment links

---

**Good luck with your submission! 🎉**

