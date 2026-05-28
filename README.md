# Family Tree App — Deployment Guide

## Files to upload
- `index.html` — the app itself
- `manifest.json` — PWA metadata
- `sw.js` — service worker (handles offline use + updates)
- `icon-192.png` — app icon
- `icon-512.png` — app icon (large)

---

## Hosting on GitHub Pages (free, permanent, auto-updates)

### First time setup

1. Go to **github.com** and create a free account (or sign in)
2. Click **New repository** (the green button)
3. Name it `family-tree` — keep it Public — click **Create repository**
4. Click **uploading an existing file**
5. Drag all 5 files above into the upload area
6. Click **Commit changes**
7. Go to **Settings → Pages** (left sidebar)
8. Under "Source", select **main** branch and click **Save**
9. After ~60 seconds, your app is live at:
   `https://YOUR-USERNAME.github.io/family-tree`

Share that link with your beta testers. On iPhone, they open it in Safari and tap
**Share → Add to Home Screen** to install it as an app.

---

## Pushing an update

1. Go to your repository on github.com
2. Click `index.html`
3. Click the **pencil icon** (Edit) — or click **...** then **Upload file** to replace it
4. Upload your new `index.html`
5. Click **Commit changes**

The next time testers open the app, they'll see a small **"Update available — Refresh"**
toast at the bottom. One tap and they're on the new version.
**Their data is stored locally on their device and is never affected by updates.**

---

## Telling which version someone is on

In `sw.js`, the first line is:
```
const CACHE_VERSION = 'ft-v1';
```
Change `ft-v1` to `ft-v2`, `ft-v3` etc. each time you deploy. This guarantees the
old cached version is replaced and the update toast appears.

---

## Notes for testers
- Works fully **offline** after the first load
- All data is **private and local** — nothing is sent anywhere
- To back up data: open the app → **Data** tab → **Export**
- To move data to a new phone: Export on old phone, Import on new phone
