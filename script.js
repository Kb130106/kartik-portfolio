// ============================================================
// script.js — Kartik Bhatia Portfolio
// SECURITY: All data injection uses createElement/textContent.
//           NO innerHTML for user-sourced data.
// ============================================================

'use strict';

/* ═══════════════════════════════════════════════════════════════
   THEME
   ═══════════════════════════════════════════════════════════════ */
function initTheme() {
  const saved = localStorage.getItem('kb-theme') || 'hacker';
  document.documentElement.setAttribute('data-theme', saved);
  updateThemeUI(saved);
}

window.toggleTheme = function() {
  const curr = document.documentElement.getAttribute('data-theme');
  const next = curr === 'hacker' ? 'retro' : 'hacker';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('kb-theme', next);
  updateThemeUI(next);
};

function updateThemeUI(theme) {
  const lbl = document.getElementById('theme-label');
  if (lbl) lbl.textContent = theme === 'hacker' ? 'RETRO MODE' : 'HACKER MODE';
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
   Advanced dual-layer crossfade + hover pause + click next
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

  // Auto-cycle every 3 seconds
  _memojiTimer = setInterval(memojiAdvance, 3000);

  // Hover: pause timer, instantly crossfade to next, add glow
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

  // Click to manually cycle
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

  // Preload and swap
  const preload = new Image();
  preload.onload = function () {
    next.src = nextSrc;
    // Crossfade: curr fades out, next fades in
    curr.style.opacity = '0';
    next.style.opacity = '1';
    next.style.zIndex  = '2';
    curr.style.zIndex  = '1';

    setTimeout(function () {
      // After fade completes: reset roles
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
   TERMINAL — DRAMATIC TYPING ANIMATION
   Exact sequence from the spec, with neon glow + glitch classes
   ═══════════════════════════════════════════════════════════════ */
function initTerminal() {
  const container = document.getElementById('tw-body');
  if (!container) return;
  container.textContent = ''; // clear

  const sequence = [
    { text: '> Initializing profile...',          cls: 'tw-prompt'  },
    { text: '> Accessing skill tree...',          cls: 'tw-comment' },
    { text: '> MAIN ROLE: FULL-STACK DEVELOPER',  cls: 'tw-glow'    },
    { text: '> SECONDARY: CYBERSECURITY FOLLOWER', cls: 'tw-glitch'  },
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
        // Typewriter letter-by-letter effect
        const text = item.text;
        let i = 0;
        container.appendChild(span);
        const typer = setInterval(function () {
          span.textContent = text.slice(0, ++i);
          // Re-add glitch/glow class after textContent wipe
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
   SECURE DATA INJECTION — ALL createElement / textContent
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
    
    // INJECT SQUARE PROFILE IMAGE
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
    ico.setAttribute('aria-hidden', 'true');

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
    dot.setAttribute('aria-hidden', 'true');

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
      d.setAttribute('aria-hidden', 'true');
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
      dl.rel    = 'noopener noreferrer';
      links.appendChild(dl);
    }
    if (p.githubLink) {
      const gl = document.createElement('a');
      gl.className = 'pc-link';
      gl.textContent = '🐙 GitHub';
      gl.href   = p.githubLink;
      gl.target = '_blank';
      gl.rel    = 'noopener noreferrer';
      links.appendChild(gl);
    }
    if (!p.demoLink && !p.githubLink) {
      const priv = document.createElement('span');
      priv.className = 'pc-link';
      priv.textContent = '🔒 Private / Offline';
      priv.style.opacity = '0.5';
      priv.style.cursor  = 'default';
      links.appendChild(priv);
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
    ico.setAttribute('aria-hidden', 'true');

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
    badge.setAttribute('aria-hidden', 'true');

    const info = document.createElement('div');
    const ttl  = document.createElement('div');
    ttl.className   = 'edu-title';
    ttl.textContent = c.title || '';
    const issr = document.createElement('div');
    issr.className   = 'edu-inst';
    issr.textContent = c.issuer || '';
    info.appendChild(ttl);
    info.appendChild(issr);

    if (c.score) {
      const scr = document.createElement('div');
      scr.className   = 'cert-score';
      scr.textContent = 'Score: ' + c.score;
      info.appendChild(scr);
    }

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
    { icon: '📍', label: 'Location', value: ab.location,     href: null },
  ];

  items.forEach(function (it) {
    if (!it.value) return;

    const el = document.createElement(it.href ? 'a' : 'div');
    el.className = 'c-item';
    if (it.href && /^(https?:|mailto:|tel:)/.test(it.href)) {
      el.href   = it.href;
      el.target = it.href.startsWith('http') ? '_blank' : '_self';
      el.rel    = 'noopener noreferrer';
    }

    const ico = document.createElement('span');
    ico.className   = 'c-ico';
    ico.textContent = it.icon;
    ico.setAttribute('aria-hidden', 'true');

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
  about:    'Portfolio Explorer — About',
  skills:   'Portfolio Explorer — Skills.dll',
  exp:      'Portfolio Explorer — Experience',
  projects: 'Portfolio Explorer — Projects',
  edu:      'Portfolio Explorer — Education',
  certs:    'Portfolio Explorer — Certifications',
  contact:  'Portfolio Explorer — Contact',
  cv:       'Portfolio Explorer — ATS CV Generator',
};

window.switchTab = function(target) {
  document.querySelectorAll('.section').forEach(function (sec) {
    sec.classList.remove('active');
  });
  
  const sec = document.getElementById('sec-' + target);
  if (sec) sec.classList.add('active');

  document.querySelectorAll('.nav-tab').forEach(function (tab) {
    const isActive = tab.getAttribute('data-target') === target;
    tab.classList.toggle('active', isActive);
    tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });

  const titleEl = document.getElementById('nav-win-title');
  if (titleEl) titleEl.textContent = TAB_TITLES[target] || 'Portfolio Explorer';
};

/* ═══════════════════════════════════════════════════════════════
   CONTACT FORM
   ═══════════════════════════════════════════════════════════════ */
window.sendMessage = async function() {
  const nameEl  = document.getElementById('cf-name');
  const emailEl = document.getElementById('cf-email');
  const phoneEl = document.getElementById('cf-phone');
  const msgEl   = document.getElementById('cf-msg');
  const stat    = document.getElementById('cf-status');

  const name  = nameEl?.value.trim()  || '';
  const email = emailEl?.value.trim() || '';
  const phone = phoneEl?.value.trim() || '';
  const msg   = msgEl?.value.trim()   || '';

  if (!name || !email || !msg) {
    if (stat) {
      stat.textContent = '⚠ Please fill in Name, Email, and Message.';
      stat.style.color = '#ff4444';
    }
    return;
  }

  if (stat) {
    stat.textContent = '⟳ Transmitting...';
    stat.style.color = 'var(--accent)';
  }

  try {
    const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body:    JSON.stringify({ name, email, phone, message: msg }),
    });
    if (res.ok) {
      if (stat) {
        stat.textContent = '✅ Message transmitted successfully!';
        stat.style.color = '#00ff41';
      }
      if (nameEl)  nameEl.value  = '';
      if (emailEl) emailEl.value = '';
      if (phoneEl) phoneEl.value = '';
      if (msgEl)   msgEl.value   = '';
    } else {
      if (stat) {
        stat.textContent = '❌ Transmission failed. Email directly: ' + (portfolioData?.about?.email || '');
        stat.style.color = '#ff4444';
      }
    }
  } catch (_) {
    if (stat) {
      stat.textContent = '❌ Network error. Please email directly.';
      stat.style.color = '#ff4444';
    }
  }
};

/* ═══════════════════════════════════════════════════════════════
   CV MODAL
   ═══════════════════════════════════════════════════════════════ */
window.openCVModal = function() {
  const modal = document.getElementById('cv-modal');
  if (!modal) return;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  const print = document.getElementById('cv-print');
  if (print && !print.dataset.generated) window.genCV();
};

window.closeCVModal = function() {
  const modal = document.getElementById('cv-modal');
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
};

window.handleModalBackdropClick = function(e) {
  if (e.target === document.getElementById('cv-modal')) window.closeCVModal();
};

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') window.closeCVModal();
});

/* ═══════════════════════════════════════════════════════════════
   CV GENERATOR — ATS-Friendly
   ═══════════════════════════════════════════════════════════════ */
window.genCV = function() {
  const printEl = document.getElementById('cv-print');
  if (!printEl) return;

  const d    = (typeof portfolioData !== 'undefined') ? portfolioData : {};
  const hero = d.hero         || {};
  const abt  = d.about         || {};
  const exp  = d.experience    || [];
  const proj = d.projects      || [];
  const edu  = d.education     || [];
  const cert = d.certifications || [];
  const sk   = d.skills        || [];

  const roleVal     = (document.getElementById('cv-role')?.value.trim()   || hero.role || 'Full-Stack Developer');
  const summaryVal  = (document.getElementById('cv-about')?.value.trim()  || abt.bio || '');
  const noteVal     = (document.getElementById('cv-note')?.value.trim()   || '');
  const skillsRaw   = (document.getElementById('cv-skills')?.value.trim() || '');

  let allSkills = [];
  if (skillsRaw) {
    allSkills = skillsRaw.split(',').map(s => s.trim()).filter(Boolean);
  } else {
    sk.forEach(cat => allSkills.push(...(cat.items || [])));
  }

  printEl.textContent = '';
  printEl.dataset.generated = '1';

  function el(tag, cls, text) {
    const e = document.createElement(tag);
    if (cls)  e.className   = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  }

  const hdr = el('div', 'cv-hdr');
  const hdrL = el('div');
  hdrL.appendChild(el('div', 'cv-n', hero.name || 'Kartik Bhatia'));
  hdrL.appendChild(el('div', 'cv-r', roleVal));
  if (noteVal) hdrL.appendChild(el('div', null, noteVal));
  const hdrR = el('div', 'cv-cnt');
  if (abt.email)    hdrR.appendChild(el('div', null, '📧 ' + abt.email));
  if (abt.phone)    hdrR.appendChild(el('div', null, '📞 ' + abt.phone));
  if (abt.location) hdrR.appendChild(el('div', null, '📍 ' + abt.location));
  if (d.socials?.linkedin) hdrR.appendChild(el('div', null, '🔗 ' + d.socials.linkedin.replace('https://','')));
  if (d.socials?.github)   hdrR.appendChild(el('div', null, '🐙 ' + d.socials.github.replace('https://','')));
  hdr.appendChild(hdrL);
  hdr.appendChild(hdrR);
  printEl.appendChild(hdr);

  const cols = el('div', 'cv-2col');
  const leftCol = el('div');

  if (allSkills.length) {
    leftCol.appendChild(el('div', 'cv-st', 'Technical Skills'));
    const langWrap = el('div', 'cv-langs');
    allSkills.forEach(s => langWrap.appendChild(el('span', null, s)));
    leftCol.appendChild(langWrap);
  }

  if (edu.length) {
    leftCol.appendChild(el('div', 'cv-st', 'Education'));
    edu.forEach(function (e) {
      const ei = el('div', 'cv-ei');
      ei.appendChild(el('div', 'cv-es', e.title || ''));
      ei.appendChild(el('div', null, e.institution || ''));
      ei.appendChild(el('div', 'cv-ey', e.date || ''));
      leftCol.appendChild(ei);
    });
  }

  if (cert.length) {
    leftCol.appendChild(el('div', 'cv-st', 'Certifications & Awards'));
    cert.forEach(function (c) {
      const ci = el('div', 'cv-ci', (c.badge||'') + ' ' + (c.title||'') + ' — ' + (c.issuer||'') + (c.score ? ' (' + c.score + ')' : ''));
      leftCol.appendChild(ci);
    });
  }

  const rightCol = el('div');

  if (summaryVal) {
    rightCol.appendChild(el('div', 'cv-st', 'Professional Summary'));
    rightCol.appendChild(el('div', 'cv-para', summaryVal));
  }

  if (exp.length) {
    rightCol.appendChild(el('div', 'cv-st', 'Experience'));
    exp.forEach(function (e) {
      const expi = el('div', 'cv-expi');
      const er   = el('div', 'cv-er');
      er.appendChild(el('div', 'cv-ec', e.company || ''));
      er.appendChild(el('div', 'cv-ed', e.date    || ''));
      expi.appendChild(er);
      expi.appendChild(el('div', 'cv-rl', e.role || ''));
      const ul = el('ul', 'cv-ul');
      (e.bullets || []).forEach(b => ul.appendChild(el('li', null, b)));
      expi.appendChild(ul);
      if (e.impact) expi.appendChild(el('div', 'cv-para', '📊 ' + e.impact));
      rightCol.appendChild(expi);
    });
  }

  if (proj.length) {
    rightCol.appendChild(el('div', 'cv-st', 'Projects'));
    proj.forEach(function (p) {
      const expi = el('div', 'cv-expi');
      expi.appendChild(el('div', 'cv-ec', p.title || ''));
      if (p.techStack?.length) {
        expi.appendChild(el('div', 'cv-rl', p.techStack.join(' · ')));
      }
      expi.appendChild(el('div', 'cv-para', p.description || ''));
      rightCol.appendChild(expi);
    });
  }

  cols.appendChild(leftCol);
  cols.appendChild(rightCol);
  printEl.appendChild(cols);
};

window.printCV = function() {
  const print = document.getElementById('cv-print');
  if (print && !print.dataset.generated) window.genCV();
  window.print();
};

/* ═══════════════════════════════════════════════════════════════
   SCROLL TO TOP
   ═══════════════════════════════════════════════════════════════ */
window.scrollToTop = function() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

/* ═══════════════════════════════════════════════════════════════
   BOOT — DOMContentLoaded
   (Ensures HTML loads completely before JS runs)
   ═══════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', function () {
  initTheme();
  initClock();
  initMatrix();
  injectData();
  initMemojiSwitcher();
  initTerminal();
});