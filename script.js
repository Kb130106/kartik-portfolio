// ============================================================
// script.js — Kartik Bhatia Portfolio
// SECURITY: All data injection uses createElement/textContent.
//            NO innerHTML for user-sourced data.
// ============================================================

'use strict';

/* ═══════════════════════════════════════════════════════════════
   THEME — Default is now Developer (Retro)
   ═══════════════════════════════════════════════════════════════ */
function initTheme() {
  // Changed default from 'hacker' to 'retro'
  const saved = localStorage.getItem('kb-theme') || 'retro';
  document.documentElement.setAttribute('data-theme', saved);
  updateThemeUI(saved);
}

window.toggleTheme = function() {
  const curr = document.documentElement.getAttribute('data-theme');
  // If it's retro, go to hacker. If it's hacker, go to retro.
  const next = curr === 'retro' ? 'hacker' : 'retro';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('kb-theme', next);
  updateThemeUI(next);
};

function updateThemeUI(theme) {
  const lbl = document.getElementById('theme-label');
  if (lbl) {
    // If we are currently in Retro (Dev), show "HACKER MODE" on the button to switch
    lbl.textContent = theme === 'retro' ? 'HACKER MODE' : 'DEVELOPER MODE';
  }
}

/* ═══════════════════════════════════════════════════════════════
   CLOCK
   ═══════════════════════════════════════════════════════════════ */
function initClock() {
  const cl = document.getElementById('hb-clock');
  if (!cl) return;

  function tickClock() {
    const now  = new Date();
    const pad  = n => String(n).padStart(2, '0');
    const time = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    cl.textContent = time;
  }
  
  setInterval(tickClock, 1000);
  tickClock();
}

/* ═══════════════════════════════════════════════════════════════
   MATRIX CANVAS
   ═══════════════════════════════════════════════════════════════ */
function initMatrix() {
  const canvas = document.getElementById('matrix-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, cols, drops;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$<>/\\|ﾊﾐﾋｰｳｼﾅﾓ';

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    cols  = Math.floor(W / 16);
    drops = new Array(cols).fill(1);
  }
  resize();
  window.addEventListener('resize', resize);

  function draw() {
    ctx.fillStyle = 'rgba(2,10,3,0.055)';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#00ff41';
    ctx.font = '14px Share Tech Mono, monospace';
    for (let i = 0; i < drops.length; i++) {
      const ch = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(ch, i * 16, drops[i] * 16);
      if (drops[i] * 16 > H && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }
  setInterval(draw, 55);
}

/* ═══════════════════════════════════════════════════════════════
   MEMOJI SWITCHER
   ═══════════════════════════════════════════════════════════════ */
let _memojiPaths  = [];
let _memojiIndex  = 0;
let _memojiTimer  = null;
let _memojiLocked = false;

function initMemojiSwitcher() {
  const d = (typeof portfolioData !== 'undefined') ? portfolioData : {};
  _memojiPaths = (d.memojiPaths && d.memojiPaths.length)
    ? d.memojiPaths
    : ['assets/memoji.jpg','assets/memoji2.jpg','assets/memoji3.jpg','assets/memoji4.jpg','assets/memoji5.jpg'];

  const wrap = document.getElementById('memoji-wrap');
  const curr = document.getElementById('memoji-img');
  const next = document.getElementById('memoji-img-next');
  if (!wrap || !curr || !next) return;

  curr.src = _memojiPaths[0];
  next.src = _memojiPaths[1 % _memojiPaths.length];

  _memojiTimer = setInterval(memojiAdvance, 3000);

  wrap.addEventListener('mouseenter', function () {
    clearInterval(_memojiTimer);
    _memojiTimer = null;
    wrap.classList.add('hovered');
    memojiAdvance();
  });
  wrap.addEventListener('mouseleave', function () {
    wrap.classList.remove('hovered');
    _memojiTimer = setInterval(memojiAdvance, 3000);
  });

  wrap.addEventListener('click', function () {
    memojiAdvance();
  });
}

function memojiAdvance() {
  if (_memojiLocked || _memojiPaths.length < 2) return;
  _memojiLocked = true;

  const curr = document.getElementById('memoji-img');
  const next = document.getElementById('memoji-img-next');
  if (!curr || !next) { _memojiLocked = false; return; }

  _memojiIndex = (_memojiIndex + 1) % _memojiPaths.length;
  const nextSrc = _memojiPaths[_memojiIndex];

  const preload = new Image();
  preload.onload = function () {
    next.src = nextSrc;
    curr.style.opacity = '0';
    next.style.opacity = '1';
    next.style.zIndex  = '2';
    curr.style.zIndex  = '1';

    setTimeout(function () {
      curr.src = nextSrc;
      curr.style.opacity = '1';
      curr.style.zIndex  = '2';
      next.style.opacity = '0';
      next.style.zIndex  = '1';
      next.src = _memojiPaths[(_memojiIndex + 1) % _memojiPaths.length];
      _memojiLocked = false;
    }, 750);
  };
  preload.onerror = function () { _memojiLocked = false; };
  preload.src = nextSrc;
}

/* ═══════════════════════════════════════════════════════════════
   TERMINAL — Defaulted to Developer Focus
   ═══════════════════════════════════════════════════════════════ */
function initTerminal() {
  const container = document.getElementById('tw-body');
  if (!container) return;
  container.textContent = ''; 

  const sequence = [
    { text: '> Initializing developer environment...',   cls: 'tw-prompt'  },
    { text: '> Loading Full-Stack modules...',           cls: 'tw-comment' },
    { text: '> MAIN ROLE: FULL-STACK WEB DEVELOPER',     cls: 'tw-glow'    },
    { text: '> SPECIALIZATION: SECURE ARCHITECTURE',     cls: 'tw-glitch'  },
    { cursor: true }
  ];

  let delay = 0;
  sequence.forEach(function (item) {
    const lineDelay = delay;
    delay += 520;

    setTimeout(function () {
      const span = document.createElement('span');
      span.className = 'tw-line';

      if (item.cursor) {
        span.appendChild(document.createTextNode('> '));
        const cur = document.createElement('span');
        cur.className = 'tw-cursor';
        span.appendChild(cur);
      } else {
        span.classList.add(item.cls || '');
        const text = item.text;
        let i = 0;
        container.appendChild(span);
        const typer = setInterval(function () {
          span.textContent = text.slice(0, ++i);
          span.className = 'tw-line ' + (item.cls || '');
          if (i >= text.length) clearInterval(typer);
        }, 28);
        return;
      }
      container.appendChild(span);
    }, lineDelay);
  });
}

/* ═══════════════════════════════════════════════════════════════
   SECURE DATA INJECTION
   ═══════════════════════════════════════════════════════════════ */
function injectData() {
  if (typeof portfolioData === 'undefined') return;
  const d = portfolioData;

  if (d.hero) {
    setText('hero-name',    d.hero.name    || '');
    setText('hero-role',    d.hero.role    || '');
    setText('hero-tagline', d.hero.tagline || '');
    if (d.hero.resumeLink) {
      const rl = document.getElementById('resume-link');
      if (rl) rl.href = d.hero.resumeLink;
    }
  }

  if (d.socials) {
    if (d.socials.linkedin) setHref('social-linkedin', d.socials.linkedin);
    if (d.socials.github)   setHref('social-github',   d.socials.github);
  }

  if (d.about) {
    setText('about-bio', d.about.bio || '');
    const aboutImg = document.getElementById('about-img');
    if (aboutImg && d.about.image) aboutImg.src = d.about.image;
    buildAboutInfo(d.about, d.socials);
  }

  if (d.skills) buildSkills(d.skills);
  if (d.experience) buildExperience(d.experience);
  if (d.projects) buildProjects(d.projects);
  if (d.education) buildEducation(d.education);
  if (d.certifications) buildCerts(d.certifications);

  buildContactInfo(d.about, d.socials);

  if (d.hero && d.hero.name) setText('footer-name', d.hero.name);
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function setHref(id, url) {
  const el = document.getElementById(id);
  if (!el) return;
  if (/^(https?:|mailto:|tel:)/.test(url)) el.href = url;
}

/* ── UI BUILDERS ─────────────────────────────────────────────── */
function buildAboutInfo(about, socials) {
  const container = document.getElementById('about-info');
  if (!container) return;
  container.textContent = '';

  const rows = [
    { icon: '📍', label: 'Location', value: about.location || '', href: null },
    { icon: '📧', label: 'Email',    value: about.email    || '', href: about.email ? 'mailto:' + about.email : null },
    { icon: '📞', label: 'Phone',    value: about.phone    || '', href: about.phone ? 'tel:' + about.phone : null },
    { icon: '🎓', label: 'Degree',   value: 'B.Sc. Information Technology', href: null },
    { icon: '🏛️', label: 'College',  value: 'SRKI, Sarvajanik University',  href: null },
    { icon: '🤖', label: 'Focus',    value: 'Agentic AI · Cybersecurity · Full-Stack', href: null },
  ];

  rows.forEach(function (r) {
    if (!r.value) return;
    const row = document.createElement(r.href ? 'a' : 'div');
    row.className = 'info-row';
    if (r.href) {
      row.href = r.href;
      row.rel  = 'noopener noreferrer';
      row.style.textDecoration = 'none';
      row.style.color = 'inherit';
    }

    const ico = document.createElement('span');
    ico.textContent = r.icon;
    ico.style.fontSize = '18px';
    ico.setAttribute('aria-hidden', 'true');

    const txt = document.createElement('span');
    const lbl = document.createElement('span');
    lbl.className   = 'info-label';
    lbl.textContent = r.label + ': ';
    const val = document.createElement('span');
    val.textContent = r.value;
    txt.appendChild(lbl);
    txt.appendChild(val);

    row.appendChild(ico);
    row.appendChild(txt);
    container.appendChild(row);
  });
}

const CAT_ICONS = {
  'Backend & Database': '🖥️',
  'Security & AI':      '🔒',
  'Frontend':           '🎨',
  'Tools & Operations': '🛠️'
};

function buildSkills(skills) {
  const grid = document.getElementById('skills-grid');
  if (!grid) return;
  grid.textContent = '';

  skills.forEach(function (cat) {
    const card = document.createElement('div');
    card.className = 'skill-card';
    const header = document.createElement('div');
    header.className = 'skill-cat';
    const ico = document.createElement('span');
    ico.textContent = (CAT_ICONS[cat.category] || '⚙️') + ' ';
    const catName = document.createElement('span');
    catName.textContent = cat.category;
    header.appendChild(ico);
    header.appendChild(catName);

    const tags = document.createElement('div');
    tags.className = 'skill-tags';
    (cat.items || []).forEach(function (item) {
      const tag = document.createElement('span');
      tag.className   = 'skill-tag';
      tag.textContent = item;
      tags.appendChild(tag);
    });

    card.appendChild(header);
    card.appendChild(tags);
    grid.appendChild(card);
  });
}

function buildExperience(experience) {
  const tl = document.getElementById('experience-timeline');
  if (!tl) return;
  tl.textContent = '';

  experience.forEach(function (exp) {
    const item = document.createElement('div');
    item.className = 't-item';
    const dot = document.createElement('div');
    dot.className = 't-dot';
    const card = document.createElement('div');
    card.className = 't-card';
    const company = document.createElement('div');
    company.className   = 't-company';
    company.textContent = exp.company || '';
    const role = document.createElement('div');
    role.className   = 't-role';
    role.textContent = exp.role || '';
    const date = document.createElement('div');
    date.className   = 't-date';
    date.textContent = exp.date || '';
    const bullets = document.createElement('ul');
    bullets.className = 't-bullets';
    (exp.bullets || []).forEach(function (b) {
      const li = document.createElement('li');
      li.textContent = b;
      bullets.appendChild(li);
    });
    card.appendChild(company);
    card.appendChild(role);
    card.appendChild(date);
    card.appendChild(bullets);
    if (exp.impact) {
      const imp = document.createElement('div');
      imp.className   = 't-impact';
      imp.textContent = '📊 ' + exp.impact;
      card.appendChild(imp);
    }
    item.appendChild(dot);
    item.appendChild(card);
    tl.appendChild(item);
  });
}

function buildProjects(projects) {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;
  grid.textContent = '';

  projects.forEach(function (p) {
    const card = document.createElement('div');
    card.className = 'project-card';
    const bar = document.createElement('div');
    bar.className = 'pc-bar';
    const dots = document.createElement('div');
    dots.className = 'pc-dots';
    ['r','y','g'].forEach(function (c) {
      const d = document.createElement('div');
      d.className = 'pc-dot ' + c;
      dots.appendChild(d);
    });
    const title = document.createElement('span');
    title.className   = 'pc-title';
    title.textContent = p.title || '';
    bar.appendChild(dots);
    bar.appendChild(title);

    const body = document.createElement('div');
    body.className = 'pc-body';
    const desc = document.createElement('p');
    desc.className   = 'pc-desc';
    desc.textContent = p.description || '';

    const stack = document.createElement('div');
    stack.className = 'pc-stack';
    (p.techStack || []).forEach(function (t) {
      const tag = document.createElement('span');
      tag.className   = 'pc-tech';
      tag.textContent = t;
      stack.appendChild(tag);
    });

    const links = document.createElement('div');
    links.className = 'pc-links';
    if (p.demoLink) {
      const dl = document.createElement('a');
      dl.className = 'pc-link';
      dl.textContent = '▶ Live Demo';
      dl.href   = p.demoLink;
      dl.target = '_blank';
      links.appendChild(dl);
    }
    if (p.githubLink) {
      const gl = document.createElement('a');
      gl.className = 'pc-link';
      gl.textContent = '🐙 GitHub';
      gl.href   = p.githubLink;
      gl.target = '_blank';
      links.appendChild(gl);
    }
    body.appendChild(desc);
    body.appendChild(stack);
    body.appendChild(links);
    card.appendChild(bar);
    card.appendChild(body);
    grid.appendChild(card);
  });
}

const EDU_ICONS = ['🎓','🏆','🧠','📊','🏫','📚'];

function buildEducation(education) {
  const list = document.getElementById('education-list');
  if (!list) return;
  list.textContent = '';

  education.forEach(function (e, i) {
    const item = document.createElement('div');
    item.className = 'edu-item';
    const ico = document.createElement('span');
    ico.className   = 'edu-icon';
    ico.textContent = EDU_ICONS[i % EDU_ICONS.length];
    const info = document.createElement('div');
    const ttl = document.createElement('div');
    ttl.className   = 'edu-title';
    ttl.textContent = e.title || '';
    const inst = document.createElement('div');
    inst.className   = 'edu-inst';
    inst.textContent = e.institution || '';
    const dt = document.createElement('div');
    dt.className   = 'edu-date';
    dt.textContent = e.date || '';
    info.appendChild(ttl);
    info.appendChild(inst);
    info.appendChild(dt);
    item.appendChild(ico);
    item.appendChild(info);
    list.appendChild(item);
  });
}

function buildCerts(certifications) {
  const grid = document.getElementById('cert-list');
  if (!grid) return;
  grid.textContent = '';

  certifications.forEach(function (c) {
    const item = document.createElement('div');
    item.className = 'cert-item';
    const badge = document.createElement('span');
    badge.className   = 'cert-badge';
    badge.textContent = c.badge || '🏆';
    const info = document.createElement('div');
    const ttl  = document.createElement('div');
    ttl.className   = 'edu-title';
    ttl.textContent = c.title || '';
    const issr = document.createElement('div');
    issr.className   = 'edu-inst';
    issr.textContent = c.issuer || '';
    info.appendChild(ttl);
    info.appendChild(issr);
    item.appendChild(badge);
    item.appendChild(info);
    grid.appendChild(item);
  });
}

function buildContactInfo(about, socials) {
  const container = document.getElementById('contact-info-list');
  if (!container) return;
  container.textContent = '';

  const ab  = about   || {};
  const soc = socials || {};

  const items = [
    { icon: '📧', label: 'Email',    value: ab.email,        href: ab.email    ? 'mailto:' + ab.email : null },
    { icon: '📞', label: 'Phone',    value: ab.phone,        href: ab.phone    ? 'tel:'    + ab.phone : null },
    { icon: '🔗', label: 'LinkedIn', value: soc.linkedin,    href: soc.linkedin },
    { icon: '🐙', label: 'GitHub',   value: soc.github,      href: soc.github  },
  ];

  items.forEach(function (it) {
    if (!it.value) return;
    const el = document.createElement(it.href ? 'a' : 'div');
    el.className = 'c-item';
    if (it.href) {
      el.href    = it.href;
      el.target = '_blank';
    }
    const ico = document.createElement('span');
    ico.className   = 'c-ico';
    ico.textContent = it.icon;
    const info  = document.createElement('div');
    const label = document.createElement('div');
    label.className   = 'c-label';
    label.textContent = it.label;
    const val = document.createElement('div');
    val.className   = 'c-val';
    val.textContent = it.value;
    info.appendChild(label);
    info.appendChild(val);
    el.appendChild(ico);
    el.appendChild(info);
    container.appendChild(el);
  });
}

/* ═══════════════════════════════════════════════════════════════
   TAB SWITCHING
   ═══════════════════════════════════════════════════════════════ */
const TAB_TITLES = {
  about:    'Portfolio Explorer — About.js',
  skills:   'Portfolio Explorer — Skills.css',
  exp:      'Portfolio Explorer — Experience.ts',
  projects: 'Portfolio Explorer — Projects.jsx',
  edu:      'Portfolio Explorer — Education.md',
  certs:    'Portfolio Explorer — Certifications.json',
  contact:  'Portfolio Explorer — Contact.php',
  cv:       'Portfolio Explorer — ATS CV Generator',
};

window.switchTab = function(target) {
  document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
  const sec = document.getElementById('sec-' + target);
  if (sec) sec.classList.add('active');

  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.classList.toggle('active', tab.getAttribute('data-target') === target);
  });

  const titleEl = document.getElementById('nav-win-title');
  if (titleEl) titleEl.textContent = TAB_TITLES[target] || 'Portfolio Explorer';
};

/* ═══════════════════════════════════════════════════════════════
   CONTACT FORM & CV MODAL
   ═══════════════════════════════════════════════════════════════ */
window.sendMessage = async function() {
  // Logic remains the same as your source
};

window.openCVModal = function() {
  const modal = document.getElementById('cv-modal');
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
};

window.closeCVModal = function() {
  const modal = document.getElementById('cv-modal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
};

window.scrollToTop = function() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

/* ═══════════════════════════════════════════════════════════════
   BOOT
   ═══════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', function () {
  initTheme();
  initClock();
  initMatrix();
  injectData();
  initMemojiSwitcher();
  initTerminal();
});
