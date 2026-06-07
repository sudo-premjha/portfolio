/* ═══════════════════════════════════════════════════
   ADMIN — Local-only · Panel · GitHub Sync
   Admin panel is ONLY active on localhost/127.0.0.1.
   On the public GitHub Pages site it is completely
   invisible — no triggers, no functions exposed.
   ═══════════════════════════════════════════════════ */

const IS_LOCAL = ['localhost', '127.0.0.1', ''].includes(window.location.hostname);

// If not local, do nothing at all — bail out immediately
if (!IS_LOCAL) {
  // Remove any admin UI elements from the DOM entirely
  document.addEventListener('DOMContentLoaded', () => {
    ['loginModal','adminPanel','adminFab','adminTrigger'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.remove();
    });
  });
}

// ── State ─────────────────────────────────────────
let isAdminLoggedIn = false;
let currentData = null;

// ── Elements ──────────────────────────────────────
function el(id) { return document.getElementById(id); }

// ── Login Trigger (local only) ────────────────────
if (IS_LOCAL) {
  document.addEventListener('keydown', e => {
    const cfg = window.CONFIG;
    if (!cfg) return;
    const sc = cfg.ADMIN_SHORTCUT;
    if (e.ctrlKey === sc.ctrlKey && e.shiftKey === sc.shiftKey && e.key.toUpperCase() === sc.key.toUpperCase()) {
      e.preventDefault();
      if (!isAdminLoggedIn) openLoginModal();
      else toggleAdminPanel();
    }
  });
}

// Triple-click hidden trigger in footer
let footerClicks = 0;
document.addEventListener('DOMContentLoaded', () => {
  const trigger = el('adminTrigger');
  if (trigger) {
    trigger.addEventListener('click', () => {
      footerClicks++;
      setTimeout(() => { footerClicks = 0; }, 600);
      if (footerClicks >= 3) {
        footerClicks = 0;
        if (!isAdminLoggedIn) openLoginModal();
        else toggleAdminPanel();
      }
    });
  }

  // Login form
  el('loginBtn')?.addEventListener('click', handleLogin);
  el('adminPassword')?.addEventListener('keydown', e => { if (e.key === 'Enter') handleLogin(); });
  el('loginClose')?.addEventListener('click', closeLoginModal);
  el('loginModal')?.addEventListener('click', e => { if (e.target === el('loginModal')) closeLoginModal(); });

  // Admin panel
  el('adminClose')?.addEventListener('click', () => el('adminPanel').classList.add('hidden'));
  el('adminFab')?.addEventListener('click', toggleAdminPanel);

  // Tabs
  document.querySelectorAll('.admin-tab').forEach(tab => {
    tab.addEventListener('click', () => switchTab(tab.dataset.tab));
  });

  // Actions
  el('addSkillBtn')?.addEventListener('click', addSkill);
  el('addProjectBtn')?.addEventListener('click', addProject);
  el('addCertBtn')?.addEventListener('click', addCert);
  el('saveToGithubBtn')?.addEventListener('click', saveToGitHub);
});

// ── Login ──────────────────────────────────────────
function openLoginModal() {
  el('loginModal').classList.remove('hidden');
  el('loginError').classList.add('hidden');
  el('adminPassword').value = '';
  setTimeout(() => el('adminPassword').focus(), 100);
}

function closeLoginModal() {
  el('loginModal').classList.add('hidden');
}

async function handleLogin() {
  // On localhost — no password needed, you are the owner
  loginSuccess();
}

function loginSuccess() {
  isAdminLoggedIn = true;
  closeLoginModal();
  el('adminFab').classList.remove('hidden');
  el('adminPanel').classList.remove('hidden');

  // Load current data from global (already loaded via data.js script tag)
  currentData = JSON.parse(JSON.stringify(window.PORTFOLIO_DATA));
}

// ── Panel ─────────────────────────────────────────
function toggleAdminPanel() {
  el('adminPanel').classList.toggle('hidden');
}

function switchTab(name) {
  document.querySelectorAll('.admin-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === name));
  document.querySelectorAll('.admin-content').forEach(c => c.classList.add('hidden'));
  el('tab-' + name)?.classList.remove('hidden');
}

// ── Add Skill ─────────────────────────────────────
function addSkill() {
  if (!currentData) return showMsg('Data not loaded yet. Refresh.', 'error');
  const catSel = el('skillCategory').value;
  const newCat = el('newCategory').value.trim();
  const skillName = el('newSkillName').value.trim();
  if (!skillName) return showMsg('Enter a skill name.', 'error');

  const category = newCat || catSel;
  if (newCat) currentData.skills[newCat] = currentData.skills[newCat] || [];
  if (!currentData.skills[category]) currentData.skills[category] = [];
  if (currentData.skills[category].includes(skillName)) return showMsg('Skill already exists.', 'error');

  currentData.skills[category].push(skillName);
  el('newSkillName').value = '';
  el('newCategory').value = '';
  window.refreshPortfolio && window.refreshPortfolio(currentData);
  showMsg(`✓ Added "${skillName}" to ${category}`, 'success');
}

// ── Add Project ───────────────────────────────────
function addProject() {
  if (!currentData) return showMsg('Data not loaded yet.', 'error');
  const name = el('projName').value.trim();
  const tag = el('projTag').value.trim();
  const desc = el('projDesc').value.trim();
  const tech = el('projTech').value.split(',').map(t => t.trim()).filter(Boolean);
  const h1 = el('projH1').value.trim();
  const h2 = el('projH2').value.trim();

  if (!name || !desc) return showMsg('Name and description are required.', 'error');

  currentData.projects.push({
    name, tag: tag || 'Cloud',
    description: desc,
    highlights: [h1, h2].filter(Boolean),
    tech
  });

  ['projName','projTag','projDesc','projTech','projH1','projH2'].forEach(id => { el(id).value = ''; });
  window.refreshPortfolio && window.refreshPortfolio(currentData);
  showMsg(`✓ Project "${name}" added!`, 'success');
}

// ── Add Cert ──────────────────────────────────────
function addCert() {
  if (!currentData) return showMsg('Data not loaded yet.', 'error');
  const name = el('certName').value.trim();
  const code = el('certCode').value.trim();
  const issuer = el('certIssuer').value.trim();
  const earned = el('certEarned').value.trim();
  const url = el('certUrl').value.trim();

  if (!name || !issuer) return showMsg('Name and issuer are required.', 'error');

  currentData.certifications.push({ name, code, issuer, earned, verifyUrl: url });
  ['certName','certCode','certIssuer','certEarned','certUrl'].forEach(id => { el(id).value = ''; });
  window.refreshPortfolio && window.refreshPortfolio(currentData);
  showMsg(`✓ Certification "${name}" added!`, 'success');
}

// ── GitHub Save ───────────────────────────────────
async function saveToGitHub() {
  const token = el('githubToken').value.trim();
  if (!token) return showSyncStatus('Enter your GitHub Personal Access Token.', 'error');
  if (!currentData) return showSyncStatus('No data to save.', 'error');

  const { GITHUB_USERNAME: user, GITHUB_REPO: repo, GITHUB_BRANCH: branch } = window.CONFIG;
  if (!user || user === 'your-github-username') return showSyncStatus('Update config.js with your GitHub username and repo name.', 'error');

  showSyncStatus('⏳ Saving to GitHub...', 'loading');
  el('saveToGithubBtn').disabled = true;

  try {
    const apiUrl = `https://api.github.com/repos/${user}/${repo}/contents/data.js`;

    // Get current file SHA
    const getRes = await fetch(apiUrl, {
      headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/vnd.github.v3+json' }
    });

    if (!getRes.ok) throw new Error(`GitHub API error: ${getRes.status} ${getRes.statusText}`);
    const fileInfo = await getRes.json();
    const sha = fileInfo.sha;

    // Encode as data.js format
    const jsContent = 'window.PORTFOLIO_DATA = ' + JSON.stringify(currentData, null, 2) + ';\n';
    const content = btoa(unescape(encodeURIComponent(jsContent)));

    // Commit
    const putRes = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: `Portfolio update via admin panel`,
        content,
        sha,
        branch: branch || 'main'
      })
    });

    if (!putRes.ok) {
      const err = await putRes.json();
      throw new Error(err.message || putRes.statusText);
    }

    // Store token in session for convenience
    sessionStorage.setItem('gh_token', token);
    showSyncStatus('✅ Saved to GitHub successfully! Changes will be live in ~30 seconds.', 'success');
  } catch (err) {
    showSyncStatus('❌ Error: ' + err.message, 'error');
  } finally {
    el('saveToGithubBtn').disabled = false;
  }
}

// ── Helpers ───────────────────────────────────────
function showMsg(msg, type) {
  const el_ = el('adminMsg');
  el_.textContent = msg;
  el_.className = 'admin-msg ' + type;
  el_.classList.remove('hidden');
  setTimeout(() => el_.classList.add('hidden'), 3000);
}

function showSyncStatus(msg, type) {
  const el_ = el('syncStatus');
  el_.textContent = msg;
  el_.className = 'sync-status ' + type;
  el_.classList.remove('hidden');
}

// Restore token from session if available
document.addEventListener('DOMContentLoaded', () => {
  const saved = sessionStorage.getItem('gh_token');
  if (saved) {
    const inp = el('githubToken');
    if (inp) inp.value = saved;
  }
});
