# Prem Jha — Portfolio

Professional DevOps portfolio with a built-in admin panel for adding skills, projects, and certifications — all saved directly to GitHub.

---

## Setup

### 1. Create a GitHub Repo
Create a new public repo (e.g. `portfolio`) on your GitHub account.

### 2. Update `config.js`
```js
GITHUB_USERNAME: 'gigglebytes-devops',   // your GitHub username
GITHUB_REPO: 'portfolio',                // your repo name
GITHUB_BRANCH: 'main',
```

### 3. Set Your Admin Password
1. Open `index.html` in a browser
2. Open DevTools Console (F12)
3. Run: `generateHash('your-password-here')`
4. Copy the printed hash
5. Paste it into `config.js` → `ADMIN_PASS_HASH`

### 4. Deploy to GitHub Pages
```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/gigglebytes-devops/portfolio.git
git push -u origin main
```
Then go to: **Settings → Pages → Source → main branch** → Save

Your site will be live at: `https://gigglebytes-devops.github.io/portfolio`

---

## Admin Usage

### Login
Press **Ctrl + Shift + A** anywhere on the site (or triple-click the bottom-right corner of the footer).

Enter your admin password → the admin panel slides in from the right.

### Adding Content
- **Add Skill** — Pick a category (or create new) and type the skill name
- **Add Project** — Fill in name, tag, description, tech stack, and highlights
- **Add Cert** — Fill in certification details and verify URL

### Saving to GitHub
1. Go to the **GitHub Sync** tab in the admin panel
2. Enter your GitHub Personal Access Token (PAT)
   - Create one at: GitHub → Settings → Developer Settings → Personal Access Tokens → Tokens (classic)
   - Required scope: `repo`
3. Click **Save to GitHub**
4. Changes go live on GitHub Pages in ~30 seconds

> Your PAT is stored only in your browser session (cleared when you close the tab). It is never committed to the repo.

---

## File Structure
```
portfolio/
├── index.html      Main page
├── style.css       All styles
├── script.js       Data rendering + animations
├── admin.js        Login + admin panel + GitHub API
├── data.json       All portfolio content (edit this directly or via admin)
├── config.js       GitHub config + password hash
└── README.md       This file
```

---

## Customization
All content lives in `data.json`. You can edit it directly or use the admin panel.
To change colors, edit the CSS variables at the top of `style.css`.
