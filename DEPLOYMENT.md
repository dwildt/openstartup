# Deployment Guide

## Local Deployment to GitHub Pages

This project is configured for local deployment using the `gh-pages` package.

### Prerequisites

1. Make sure you have push access to the repository
2. Ensure you're authenticated with GitHub (use GitHub CLI or git credentials)
3. All changes should be committed to the main branch

### Authentication Setup

If you get permission errors, you have a few options:

**Option 1: Use GitHub CLI (Recommended)**
```bash
# Install GitHub CLI if not already installed
# macOS: brew install gh
# Windows: scoop install gh

# Authenticate
gh auth login

# Deploy
npm run deploy
```

**Option 2: Use Personal Access Token**
1. Go to GitHub > Settings > Developer settings > Personal access tokens
2. Create a token with `repo` permissions
3. Use it when prompted during deployment

### Deploy Steps

1. **Build and Deploy in one command:**
   ```bash
   npm run deploy
   ```

   This will:
   - Run `npm run build` (predeploy hook)
   - Generate production build with correct GitHub Pages paths
   - Push the `dist/` folder to the `gh-pages` branch
   - GitHub Pages will automatically serve from the `gh-pages` branch

2. **Manual steps (if needed):**
   ```bash
   # Build the project
   npm run build

   # Deploy to gh-pages branch
   npm run deploy
   ```

### GitHub Pages Settings

Make sure your repository settings are configured:

1. Go to your repository on GitHub
2. Settings > Pages
3. Source: Deploy from a branch
4. Branch: `gh-pages` / `/ (root)`
5. Save

### URLs

- **Local Development**: http://localhost:3001/
- **GitHub Pages**: https://dwildt.github.io/openstartup/

### Troubleshooting

If deployment fails:
1. Make sure you're authenticated with GitHub (`gh auth status`)
2. Check that you have write access to the repository
3. Ensure the `gh-pages` branch exists and is properly configured