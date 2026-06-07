const CONFIG = {
  // ─── GitHub Settings ───────────────────────────────────────────────────────
  // Replace with your GitHub username and repo name after creating the repo
  GITHUB_USERNAME: 'sudo-premjha',
  GITHUB_REPO: 'portfolio',
  GITHUB_BRANCH: 'main',

  // ─── Admin Access ──────────────────────────────────────────────────────────
  // Admin panel is ONLY available when running locally (localhost).
  // On the public GitHub Pages site it is completely hidden — no password needed.
  // To use admin: open the folder with "npx serve ." or just open index.html locally.

  // ─── Admin Login Trigger ───────────────────────────────────────────────────
  // Press this keyboard shortcut to open the admin login panel
  // Default: Ctrl + Shift + A
  ADMIN_SHORTCUT: { ctrlKey: true, shiftKey: true, key: 'A' }
};
