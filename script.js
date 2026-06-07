/* ═══════════════════════════════════════════════════
   MAIN SCRIPT — reads from window.PORTFOLIO_DATA
   Works on file://, localhost, and GitHub Pages
   ═══════════════════════════════════════════════════ */

const D = window.PORTFOLIO_DATA;

const SKILL_ICONS = {
  'Cloud Platforms': '☁️',
  'Containerization & Orchestration': '🐳',
  'Infrastructure as Code': '📦',
  'CI/CD & GitOps': '🔄',
  'Monitoring & Observability': '📊',
  'Security & Secrets': '🔐',
  'AI/ML Infrastructure': '🤖',
  'Databases & Messaging': '🗄️',
  'Scripting & Automation': '⚡',
  'Networking & CDN': '🌐'
};

const TICKER_ITEMS = [
  'AWS EKS','Kubernetes','Terraform','Docker','Helm','Jenkins','ArgoCD',
  'Prometheus','Grafana','HashiCorp Vault','Azure DevOps','GitHub Actions',
  'AWS Bedrock','OpenSearch','Istio','Ansible','Python','Bash','Kafka','RKE2'
];

const TERMINAL_LINES = [
  { type: 'prompt', text: 'kubectl get pods -n production' },
  { type: 'out', text: '50+ microservices  <span class="t-ok">Running</span>  99.9% uptime' },
  { type: 'blank' },
  { type: 'prompt', text: 'terraform apply --auto-approve' },
  { type: 'out', text: 'Plan: 23 to add, 5 to change' },
  { type: 'out', text: '<span class="t-ok">✓</span> <span class="t-cyan">$20K/yr</span> cost saved' },
  { type: 'blank' },
  { type: 'prompt', text: 'aws eks list-clusters --region ap-south-1' },
  { type: 'out', text: 'prod-cluster  <span class="t-blue">EKS v1.29</span>  <span class="t-ok">ACTIVE</span>' },
  { type: 'blank' },
  { type: 'prompt', text: 'helm upgrade --install app ./charts' },
  { type: 'out', text: 'Release "app" upgraded — <span class="t-ok">0 downtime</span>' },
  { type: 'blank' },
  { type: 'prompt-active', text: '' }
];

document.addEventListener('DOMContentLoaded', () => {
  renderHero();
  renderStats();
  renderAbout();
  renderSkills();
  renderExperience();
  renderProjects();
  renderCerts();
  renderContact();
  renderFooter();
  renderTicker();
  initParticles();
  initTypewriter();
  initTerminal();
  initScrollProgress();
  initNavHighlight();
  initReveal();
  populateAdminDropdown();
});

// ── HERO ──────────────────────────────────────────
function renderHero() {
  document.title = `${D.personal.name} — ${D.personal.title}`;
  document.getElementById('heroName').innerHTML =
    D.personal.name.split(' ').map((w,i) =>
      i === 0 ? w : `<span>${w}</span>`
    ).join(' ');
  document.getElementById('heroTitleStatic').textContent = D.personal.title;
  document.getElementById('heroLoc').textContent = '📍 ' + D.personal.location;
  document.getElementById('badgeText').textContent = D.personal.availability;

  const socials = document.getElementById('heroSocials');
  [
    { icon: '💼', label: 'LinkedIn', url: D.personal.linkedin },
    { icon: '🐙', label: 'GitHub',   url: D.personal.github },
    { icon: '✉️', label: 'Email',    url: 'mailto:' + D.personal.email }
  ].forEach(s => {
    const a = document.createElement('a');
    a.href = s.url; a.target = '_blank'; a.rel = 'noopener';
    a.className = 'social-link';
    a.innerHTML = `<span>${s.icon}</span><span>${s.label}</span>`;
    socials.appendChild(a);
  });
}

// ── TYPEWRITER ────────────────────────────────────
function initTypewriter() {
  const el = document.getElementById('heroType');
  const titles = D.personal.titleAlternates || [];
  if (!titles.length) return;
  let i = 0, j = 0, del = false;
  function tick() {
    const w = titles[i % titles.length];
    el.textContent = del ? w.slice(0, j--) : w.slice(0, j++);
    let d = del ? 55 : 95;
    if (!del && j > w.length)  { d = 1800; del = true; }
    else if (del && j < 0)     { del = false; j = 0; i++; d = 350; }
    setTimeout(tick, d);
  }
  setTimeout(tick, 1400);
}

// ── TERMINAL ANIMATION ────────────────────────────
function initTerminal() {
  const body = document.getElementById('terminalBody');
  if (!body) return;
  let lineIdx = 0;

  function typeNextLine() {
    if (lineIdx >= TERMINAL_LINES.length) {
      // Restart after pause
      setTimeout(() => { body.innerHTML = ''; lineIdx = 0; typeNextLine(); }, 3000);
      return;
    }
    const line = TERMINAL_LINES[lineIdx++];

    if (line.type === 'blank') {
      body.innerHTML += '<br>';
      setTimeout(typeNextLine, 120);
      return;
    }
    if (line.type === 'prompt-active') {
      body.innerHTML += `<div><span class="t-prompt">❯</span> <span class="t-cursor"></span></div>`;
      body.scrollTop = body.scrollHeight;
      return;
    }
    if (line.type === 'out') {
      const div = document.createElement('div');
      div.className = 't-out';
      div.innerHTML = '  ' + line.text;
      body.appendChild(div);
      body.scrollTop = body.scrollHeight;
      setTimeout(typeNextLine, 180);
      return;
    }

    // Type prompt character by character
    const div = document.createElement('div');
    body.appendChild(div);
    let c = 0;
    function typeChar() {
      if (c <= line.text.length) {
        div.innerHTML = `<span class="t-prompt">❯</span> <span class="t-cmd">${line.text.slice(0,c)}</span><span class="t-cursor"></span>`;
        body.scrollTop = body.scrollHeight;
        c++;
        setTimeout(typeChar, 48);
      } else {
        div.innerHTML = `<span class="t-prompt">❯</span> <span class="t-cmd">${line.text}</span>`;
        setTimeout(typeNextLine, 220);
      }
    }
    typeChar();
  }

  setTimeout(typeNextLine, 800);
}

// ── TICKER ────────────────────────────────────────
function renderTicker() {
  const track = document.getElementById('tickerTrack');
  if (!track) return;
  const all = [...TICKER_ITEMS, ...TICKER_ITEMS]; // duplicate for seamless loop
  track.innerHTML = all.map(t =>
    `<span class="ticker-item"><span class="t-dot">◆</span>${t}</span>`
  ).join('');
}

// ── PARTICLES ─────────────────────────────────────
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  for (let i = 0; i < 22; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.cssText = `
      left:${Math.random()*100}%;
      top:${Math.random()*100}%;
      width:${Math.random()*2+1}px;
      height:${Math.random()*2+1}px;
      opacity:${Math.random()*.5+.1};
      animation-duration:${Math.random()*15+10}s;
      animation-delay:${Math.random()*10}s;
    `;
    container.appendChild(p);
  }
}

// ── STATS ─────────────────────────────────────────
function renderStats() {
  const grid = document.getElementById('statsGrid');
  grid.innerHTML = D.stats.map(s => `
    <div class="stat-item">
      <span class="stat-icon">${s.icon || '📊'}</span>
      <div class="stat-value" data-target="${s.value}" data-pre="${s.prefix||''}" data-suf="${s.suffix||''}">
        ${s.prefix||''}0${s.suffix||''}
      </div>
      <div class="stat-label">${s.label}</div>
    </div>
  `).join('');
}

function animateCounters() {
  document.querySelectorAll('.stat-value[data-target]').forEach(el => {
    const target = parseFloat(el.dataset.target);
    const pre = el.dataset.pre || '', suf = el.dataset.suf || '';
    const dec = target % 1 !== 0;
    const dur = 2000, start = performance.now();
    function update(now) {
      const prog = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - prog, 4);
      el.textContent = pre + (dec ? (target*ease).toFixed(1) : Math.floor(target*ease)) + suf;
      if (prog < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
    el.removeAttribute('data-target');
  });
}

// ── ABOUT ─────────────────────────────────────────
function renderAbout() {
  document.getElementById('aboutSummary').textContent = D.personal.summary;
  const cur = D.experience.find(e => e.current) || D.experience[0];
  document.getElementById('quickCompany').textContent = cur.company;
  document.getElementById('quickLocation').textContent = D.personal.location;
  const emailEl = document.getElementById('quickEmail');
  emailEl.textContent = D.personal.email;
  emailEl.href = 'mailto:' + D.personal.email;
  const phoneEl = document.getElementById('quickPhone');
  phoneEl.textContent = D.personal.phone;
  phoneEl.href = 'tel:' + D.personal.phone.replace(/\s/g,'');

  const tags = ['AWS', 'Azure', 'GCP', 'Kubernetes', 'Terraform', 'DevSecOps', 'CI/CD', 'GitOps'];
  document.getElementById('aboutTags').innerHTML =
    tags.map(t => `<span class="atag">${t}</span>`).join('');
}

// ── SKILLS ────────────────────────────────────────
function renderSkills() {
  const grid = document.getElementById('skillsGrid');
  grid.innerHTML = Object.entries(D.skills).map(([cat, tags]) => `
    <div class="skill-card reveal">
      <div class="skill-cat-head">
        <span class="skill-cat-icon">${SKILL_ICONS[cat] || '🔧'}</span>
        <span class="skill-cat-name">${cat}</span>
      </div>
      <div class="skill-tags">
        ${tags.map(t => `<span class="skill-tag">${t}</span>`).join('')}
      </div>
    </div>
  `).join('');
  initReveal();
}

// ── EXPERIENCE ────────────────────────────────────
function renderExperience() {
  const tl = document.getElementById('timeline');
  tl.innerHTML = D.experience.map((job, idx) => {
    const bc = job.current ? 'badge-current' : (job.type === 'Freelance' ? 'badge-freelance' : 'badge-fulltime');
    const bt = job.current ? '● Current' : job.type;
    const vis = job.highlights.slice(0, 4);
    const hid = job.highlights.slice(4);
    return `
    <div class="timeline-item reveal ${job.current ? 'current' : ''}">
      <div class="timeline-dot"></div>
      <div class="timeline-card">
        <div class="tl-head">
          <span class="tl-company">${job.company}</span>
          <span class="tl-badge ${bc}">${bt}</span>
        </div>
        <div class="tl-meta">
          <span class="tl-role">${job.role}</span>
          <span class="tl-period">📅 ${job.period}</span>
          <span class="tl-loc">📍 ${job.location}</span>
        </div>
        <ul class="tl-highlights">
          ${vis.map(h => `<li>${h}</li>`).join('')}
          ${hid.length ? `
          <div class="exp-extra hidden" id="extra-${idx}">
            ${hid.map(h => `<li>${h}</li>`).join('')}
          </div>
          <button class="tl-toggle" onclick="toggleExp(${idx},this)">
            Show ${hid.length} more ▾
          </button>` : ''}
        </ul>
      </div>
    </div>`;
  }).join('');
  initReveal();
}

window.toggleExp = function(idx, btn) {
  const el = document.getElementById('extra-' + idx);
  const open = !el.classList.contains('hidden');
  el.classList.toggle('hidden', open);
  btn.textContent = open ? `Show ${el.querySelectorAll('li').length} more ▾` : 'Show less ▴';
};

// ── PROJECTS ──────────────────────────────────────
function renderProjects() {
  const grid = document.getElementById('projectsGrid');
  grid.innerHTML = D.projects.map((p, i) => `
    <div class="project-card reveal">
      <span class="proj-num">0${i+1}</span>
      <div class="proj-body">
        <div class="proj-head">
          <span class="proj-name">${p.name}</span>
          <span class="proj-tag">⚡ ${p.tag}</span>
        </div>
        <p class="proj-desc">${p.description}</p>
        <ul class="proj-highlights">
          ${p.highlights.map(h => `<li>${h}</li>`).join('')}
        </ul>
      </div>
      <div class="proj-footer">
        ${p.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
      </div>
    </div>
  `).join('');
  initReveal();
}

// ── CERTIFICATIONS ────────────────────────────────
function renderCerts() {
  const ICONS = { Microsoft:'🪟', Couchbase:'🗄️', AWS:'☁️', Google:'🔷', HashiCorp:'🔐' };
  const grid = document.getElementById('certsGrid');
  grid.innerHTML = D.certifications.map(c => {
    const icon = Object.entries(ICONS).find(([k]) => c.issuer.includes(k))?.[1] || '🏅';
    return `
    <div class="cert-card reveal">
      <div class="cert-icon-wrap">${icon}</div>
      <div class="cert-info">
        <div class="cert-name">${c.name}${c.code?` <span class="cert-code">(${c.code})</span>`:''}</div>
        <div class="cert-issuer">${c.issuer}</div>
        ${c.earned?`<div class="cert-earned">Earned: ${c.earned}</div>`:''}
        ${c.verifyUrl?`<a href="${c.verifyUrl}" target="_blank" rel="noopener" class="cert-verify">✓ Verify Credential</a>`:''}
      </div>
    </div>`;
  }).join('');
  initReveal();
}

// ── CONTACT ───────────────────────────────────────
function renderContact() {
  const p = D.personal;
  const items = [
    { icon:'✉️', label:'Email Me', sub: p.email, url:'mailto:'+p.email },
    { icon:'💼', label:'LinkedIn', sub:'Connect with me', url: p.linkedin },
    { icon:'🐙', label:'GitHub',   sub:'See my code', url: p.github },
    { icon:'📞', label:'WhatsApp / Call', sub: p.phone, url:'tel:'+p.phone.replace(/\s/g,'') }
  ];
  document.getElementById('contactLinks').innerHTML = items.map(i => `
    <a href="${i.url}" class="contact-link" target="_blank" rel="noopener">
      <span class="cl-icon">${i.icon}</span>
      <span class="cl-text">
        <span class="cl-label">${i.label}</span>
        <span class="cl-sub">${i.sub}</span>
      </span>
    </a>
  `).join('');
}

// ── FOOTER ────────────────────────────────────────
function renderFooter() {
  document.getElementById('footerText').textContent =
    `${D.personal.name} · DevOps & Cloud Engineer · © ${new Date().getFullYear()}`;
}

// ── SCROLL PROGRESS ───────────────────────────────
function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    const max = document.body.scrollHeight - window.innerHeight;
    bar.style.width = (window.scrollY / max * 100) + '%';
    nav.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });
}

// ── NAV HIGHLIGHT ─────────────────────────────────
function initNavHighlight() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
        const a = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
        if (a) a.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  document.querySelectorAll('section[id]').forEach(s => obs.observe(s));

  const hbg = document.getElementById('hamburger');
  const nl  = document.getElementById('navLinks');
  hbg.addEventListener('click', () => { hbg.classList.toggle('open'); nl.classList.toggle('open'); });
  nl.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    hbg.classList.remove('open'); nl.classList.remove('open');
  }));
}

// ── REVEAL ON SCROLL ──────────────────────────────
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal,.reveal-l,.reveal-r').forEach(el => {
    if (!el.classList.contains('visible')) obs.observe(el);
  });

  // Stats counter trigger
  const statsObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { animateCounters(); statsObs.disconnect(); } });
  }, { threshold: 0.3 });
  const s = document.getElementById('stats');
  if (s) statsObs.observe(s);
}

// ── ADMIN DROPDOWN ────────────────────────────────
function populateAdminDropdown() {
  const sel = document.getElementById('skillCategory');
  if (!sel) return;
  sel.innerHTML = Object.keys(D.skills).map(k => `<option value="${k}">${k}</option>`).join('');
}

// ── GLOBAL REFRESH (called by admin.js) ───────────
window.refreshPortfolio = function(newData) {
  Object.assign(window.PORTFOLIO_DATA, newData);
  document.getElementById('skillsGrid').innerHTML = '';
  document.getElementById('timeline').innerHTML = '';
  document.getElementById('projectsGrid').innerHTML = '';
  document.getElementById('certsGrid').innerHTML = '';
  renderSkills(); renderExperience(); renderProjects(); renderCerts();
  populateAdminDropdown();
};
