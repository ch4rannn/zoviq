# Deploying ZOVIQ to Cloudflare Pages

Your site is already configured and builds successfully.
Follow these steps to deploy it live.

---

## Option 1: Deploy via CLI (Fastest — One Command)

### Step 1: Install Wrangler (Cloudflare's CLI)

```bash
npm install -g wrangler
```

### Step 2: Login to Cloudflare

```bash
wrangler login
```

This will open your browser. Log in with your Cloudflare account (create one at [dash.cloudflare.com](https://dash.cloudflare.com) if you don't have one — it's free).

### Step 3: Deploy!

```bash
npm run deploy
```

That's it! This will:
1. Build the site (`npm run build`)
2. Upload the `out/` folder to Cloudflare Pages
3. Give you a live URL like `https://zoviq.pages.dev`

### Subsequent Deployments

Every time you make changes, just run `npm run deploy` again!

---

## Option 2: Deploy via GitHub (Auto-Deploy on Push)

This is better for long-term because every `git push` automatically deploys.

### Step 1: Push Code to GitHub

1. Create a new repository on [github.com](https://github.com)
2. Run these commands in your project folder:

```bash
git init
git add .
git commit -m "Initial ZOVIQ build"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/zoviq.git
git push -u origin main
```

### Step 2: Connect to Cloudflare Pages

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com)
2. Click **Workers & Pages** in the left sidebar
3. Click **Create** → **Pages** → **Connect to Git**
4. Select your `zoviq` repository
5. Set the build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `out`
   - **Node.js version:** `20`
6. Click **Save and Deploy**

Cloudflare will build and deploy your site. You'll get a URL like `https://zoviq.pages.dev`.

### Step 3: Add Custom Domain (Optional)

1. In Cloudflare Pages → your project → **Custom domains**
2. Click **Set up a custom domain**
3. Enter your domain (e.g., `zoviq.in` or `www.zoviq.in`)
4. Follow the DNS instructions

---

## What Was Configured

The following changes were made to make the project Cloudflare-ready:

| File | Change | Why |
|---|---|---|
| `next.config.ts` | Added `output: "export"` | Generates static HTML/CSS/JS (no Node.js server needed) |
| `next.config.ts` | Added `images: { unoptimized: true }` | Cloudflare Pages can't run the Next.js Image Optimization server |
| `next.config.ts` | Added `trailingSlash: true` | Helps Cloudflare Pages resolve routes correctly |
| `app/search/page.tsx` | Converted to client component | Server-side `redirect()` doesn't work with static export |
| `package.json` | Added `deploy` script | One-command deployment via `npm run deploy` |
| Dynamic routes | Added `generateStaticParams` | Required for static export to know which pages to pre-render |

---

## Build Output

The production build generates a static `out/` folder:
- **169 files** total
- **6.18 MB** size
- Pre-rendered pages: 28 (homepage, shop, products, collections, admin, etc.)

This folder is what gets uploaded to Cloudflare Pages.

---

## Troubleshooting

**"Build failed — Cannot find module"**
→ Run `npm install` before `npm run build`.

**Images not loading after deploy**
→ Make sure all images are in the `public/images/` folder. Cloudflare serves everything in `public/` as static files.

**404 on page refresh**
→ The `trailingSlash: true` config should fix this. If it persists, add a `_redirects` file in `public/`:
```
/*    /index.html   200
```

**Custom domain not working**
→ DNS propagation can take up to 24 hours. Check your DNS settings in the Cloudflare dashboard.
