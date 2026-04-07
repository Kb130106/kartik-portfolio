/**
 * ============================================================================
 * KARTIK BHATIA — FULL-STACK & CYBERSECURITY PORTFOLIO CORE
 * VERSION: 3.2.0 (2026 STABLE)
 * * SECURITY PROTOCOL:
 * - NO innerHTML usage for user-sourced data to prevent XSS.
 * - Strict DOM manipulation via createElement and textContent.
 * - LocalStorage state management for theme persistence.
 * * THEME LOGIC:
 * - DEFAULT: Developer Mode (Retro)
 * - SECONDARY: Hacker Mode (Matrix)
 * ============================================================================
 */

'use strict';

/** * ═════════════════════════════════════════════════════════════════════════════
 * 1. THEME ENGINE & STATE MANAGEMENT
 * ═════════════════════════════════════════════════════════════════════════════
 */

/**
 * Initializes the visual theme based on user history or system default.
 * In this version, the default fallback has been swapped to 'retro' (Developer).
 */
function initTheme() {
    console.log("[SYSTEM] Initializing Theme Engine...");
    // Priority: LocalStorage -> Default ('retro' for Developer view)
    const saved = localStorage.getItem('kb-theme') || 'retro';
    document.documentElement.setAttribute('data-theme', saved);
    updateThemeUI(saved);
}

/**
 * Core toggle function triggered by the UI button.
 * Swaps between 'retro' (clean dev) and 'hacker' (neon/terminal).
 */
window.toggleTheme = function() {
    const curr = document.documentElement.getAttribute('data-theme');
    // Logical flip: Default was hacker, now default is retro (developer).
    const next = curr === 'retro' ? 'hacker' : 'retro';
    
    console.log(`[THEME] Switching from ${curr} to ${next}`);
    
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('kb-theme', next);
    updateThemeUI(next);
};

/**
 * Synchronizes the UI elements with the active theme.
 * Changes button labels and extension names.
 */
function updateThemeUI(theme) {
    const lbl = document.getElementById('theme-label');
    if (lbl) {
        // If current is Developer (Retro), button should offer "HACKER MODE"
        lbl.textContent = theme === 'retro' ? 'HACKER MODE' : 'DEVELOPER MODE';
    }
    
    // Dynamically update Navigation Extensions
    const navTabs = document.querySelectorAll('.nav-tab');
    navTabs.forEach(tab => {
        const target = tab.getAttribute('data-target');
        if (target) {
            const span = tab.querySelector('.tab-label') || tab;
            const base = target.charAt(0).toUpperCase() + target.slice(1);
            if (theme === 'hacker') {
                span.textContent = base === 'Exp' ? 'Experience.dir' : `${base}.exe`;
            } else {
                span.textContent = base === 'Exp' ? 'Experience.ts' : `${base}.js`;
            }
        }
    });
}

/** * ═════════════════════════════════════════════════════════════════════════════
 * 2. CHRONOS — REAL-TIME SYSTEM CLOCK
 * ═════════════════════════════════════════════════════════════════════════════
 */
function initClock() {
    const cl = document.getElementById('hb-clock');
    if (!cl) return;

    function tickClock() {
        const now = new Date();
        const pad = n => String(n).padStart(2, '0');
        const time = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
        cl.textContent = time;
    }

    setInterval(tickClock, 1000);
    tickClock();
}

/** * ═════════════════════════════════════════════════════════════════════════════
 * 3. MATRIX RAIN — BACKGROUND ENGINE
 * ═════════════════════════════════════════════════════════════════════════════
 */
function initMatrix() {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let W, H, cols, drops;
    // Including Katakana and standard alphanumeric for authentic feel
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$<>/\\|ﾊﾐﾋｰｳｼﾅﾓ';

    function resize() {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
        cols = Math.floor(W / 16);
        drops = new Array(cols).fill(1);
    }
    
    resize();
    window.addEventListener('resize', resize);

    function draw() {
        // Fade effect to create trails
        ctx.fillStyle = 'rgba(2, 10, 3, 0.055)';
        ctx.fillRect(0, 0, W, H);
        
        // Matrix Green highlight
        ctx.fillStyle = '#00ff41';
        ctx.font = '14px Share Tech Mono, monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const ch = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(ch, i * 16, drops[i] * 16);
            
            // Randomly reset drop to top after it passes screen height
            if (drops[i] * 16 > H && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 55);
}

/** * ═════════════════════════════════════════════════════════════════════════════
 * 4. MEMOJI CROSSFADE SYSTEM
 * ═════════════════════════════════════════════════════════════════════════════
 */
let _memojiPaths = [];
let _memojiIndex = 0;
let _memojiTimer = null;
let _memojiLocked = false;

function initMemojiSwitcher() {
    const d = (typeof portfolioData !== 'undefined') ? portfolioData : {};
    _memojiPaths = (d.memojiPaths && d.memojiPaths.length) ?
        d.memojiPaths :
        ['assets/memoji.jpg', 'assets/memoji2.jpg', 'assets/memoji3.jpg', 'assets/memoji4.jpg', 'assets/memoji5.jpg'];

    const wrap = document.getElementById('memoji-wrap');
    const curr = document.getElementById('memoji-img');
    const next = document.getElementById('memoji-img-next');
    
    if (!wrap || !curr || !next) return;

    curr.src = _memojiPaths[0];
    next.src = _memojiPaths[1 % _memojiPaths.length];

    _memojiTimer = setInterval(memojiAdvance, 3000);

    wrap.addEventListener('mouseenter', function() {
        clearInterval(_memojiTimer);
        _memojiTimer = null;
        wrap.classList.add('hovered');
        memojiAdvance();
    });
    
    wrap.addEventListener('mouseleave', function() {
        wrap.classList.remove('hovered');
        _memojiTimer = setInterval(memojiAdvance, 3000);
    });

    wrap.addEventListener('click', memojiAdvance);
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
    preload.onload = function() {
        next.src = nextSrc;
        curr.style.opacity = '0';
        next.style.opacity = '1';
        next.style.zIndex = '2';
        curr.style.zIndex = '1';

        setTimeout(function() {
            curr.src = nextSrc;
            curr.style.opacity = '1';
            curr.style.zIndex = '2';
            next.style.opacity = '0';
            next.style.zIndex = '1';
            next.src = _memojiPaths[(_memojiIndex + 1) % _memojiPaths.length];
            _memojiLocked = false;
        }, 750);
    };
    preload.onerror = () => { _memojiLocked = false; };
    preload.src = nextSrc;
}

/** * ═════════════════════════════════════════════════════════════════════════════
 * 5. TERMINAL SEQUENCE — ADAPTIVE NARRATIVE
 * ═════════════════════════════════════════════════════════════════════════════
 */
function initTerminal() {
    const container = document.getElementById('tw-body');
    if (!container) return;
    container.textContent = ''; 

    // Narrative focus: Primary is Web Development, Secondary is Cyber
    const sequence = [
        { text: '> Initiating developer workspace...', cls: 'tw-prompt' },
        { text: '> Loading secure backend modules...', cls: 'tw-comment' },
        { text: '> ROLE: FULL-STACK DEVELOPER (WEB)', cls: 'tw-glow' },
        { text: '> INTEREST: CYBERSECURITY AUDITOR', cls: 'tw-glitch' },
        { cursor: true }
    ];

    let delay = 0;
    sequence.forEach(function(item) {
        const lineDelay = delay;
        delay += 520;

        setTimeout(function() {
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
                const typer = setInterval(function() {
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

/** * ═════════════════════════════════════════════════════════════════════════════
 * 6. DATA INJECTION — CORE PORTFOLIO ENGINE
 * ═════════════════════════════════════════════════════════════════════════════
 */
function injectData() {
    console.log("[DATA] Injecting portfolio content...");
    if (typeof portfolioData === 'undefined') {
        console.error("[ERROR] portfolioData is not defined in portfolioData.js");
        return;
    }
    const d = portfolioData;

    // Direct Download Button Handling
    const dlLink = document.getElementById('resume-link');
    if (dlLink && d.hero && d.hero.resumeLink) {
        dlLink.href = d.hero.resumeLink;
        // Verify path if it's local
        console.log(`[FILE] Resume path set to: ${d.hero.resumeLink}`);
    }

    if (d.hero) {
        setText('hero-name', d.hero.name || '');
        setText('hero-role', d.hero.role || '');
        setText('hero-tagline', d.hero.tagline || '');
    }

    if (d.socials) {
        if (d.socials.linkedin) setHref('social-linkedin', d.socials.linkedin);
        if (d.socials.github) setHref('social-github', d.socials.github);
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

/** * ═════════════════════════════════════════════════════════════════════════════
 * 7. UI BUILDERS — SECURE DOM CONSTRUCTION
 * ═════════════════════════════════════════════════════════════════════════════
 */
function buildAboutInfo(about, socials) {
    const container = document.getElementById('about-info');
    if (!container) return;
    container.textContent = '';

    const rows = [
        { icon: '📍', label: 'Location', value: about.location || '', href: null },
        { icon: '📧', label: 'Email', value: about.email || '', href: about.email ? 'mailto:' + about.email : null },
        { icon: '📞', label: 'Phone', value: about.phone || '', href: about.phone ? 'tel:' + about.phone : null },
        { icon: '🎓', label: 'Degree', value: 'B.Sc. Information Technology', href: null },
        { icon: '🏛️', label: 'College', value: 'SRKI, Sarvajanik University', href: null },
        { icon: '🤖', label: 'Focus', value: 'Full-Stack · Agentic AI · Cyber', href: null },
    ];

    rows.forEach(function(r) {
        if (!r.value) return;
        const row = document.createElement(r.href ? 'a' : 'div');
        row.className = 'info-row';
        if (r.href) {
            row.href = r.href;
            row.rel = 'noopener noreferrer';
        }

        const ico = document.createElement('span');
        ico.textContent = r.icon;
        ico.style.fontSize = '18px';

        const txt = document.createElement('span');
        const lbl = document.createElement('span');
        lbl.className = 'info-label';
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

function buildSkills(skills) {
    const grid = document.getElementById('skills-grid');
    if (!grid) return;
    grid.textContent = '';
    const CAT_ICONS = { 'Backend & Database': '🖥️', 'Security & AI': '🔒', 'Frontend': '🎨', 'Tools & Operations': '🛠️' };

    skills.forEach(function(cat) {
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
        (cat.items || []).forEach(function(item) {
            const tag = document.createElement('span');
            tag.className = 'skill-tag';
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

    experience.forEach(function(exp) {
        const item = document.createElement('div');
        item.className = 't-item';
        const card = document.createElement('div');
        card.className = 't-card';

        const company = document.createElement('div');
        company.className = 't-company';
        company.textContent = exp.company || '';

        const role = document.createElement('div');
        role.className = 't-role';
        role.textContent = exp.role || '';

        const date = document.createElement('div');
        date.className = 't-date';
        date.textContent = exp.date || '';

        const bullets = document.createElement('ul');
        bullets.className = 't-bullets';
        (exp.bullets || []).forEach(function(b) {
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
            imp.className = 't-impact';
            imp.textContent = '📊 ' + exp.impact;
            card.appendChild(imp);
        }

        item.appendChild(card);
        tl.appendChild(item);
    });
}

function buildProjects(projects) {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;
    grid.textContent = '';

    projects.forEach(function(p) {
        const card = document.createElement('div');
        card.className = 'project-card';
        const bar = document.createElement('div');
        bar.className = 'pc-bar';
        const title = document.createElement('span');
        title.className = 'pc-title';
        title.textContent = p.title || '';
        bar.appendChild(title);

        const body = document.createElement('div');
        body.className = 'pc-body';
        const desc = document.createElement('p');
        desc.className = 'pc-desc';
        desc.textContent = p.description || '';

        const stack = document.createElement('div');
        stack.className = 'pc-stack';
        (p.techStack || []).forEach(function(t) {
            const tag = document.createElement('span');
            tag.className = 'pc-tech';
            tag.textContent = t;
            stack.appendChild(tag);
        });

        const links = document.createElement('div');
        links.className = 'pc-links';
        if (p.demoLink) {
            const dl = document.createElement('a');
            dl.className = 'pc-link';
            dl.textContent = '▶ Live Demo';
            dl.href = p.demoLink;
            dl.target = '_blank';
            links.appendChild(dl);
        }
        if (p.githubLink) {
            const gl = document.createElement('a');
            gl.className = 'pc-link';
            gl.textContent = '🐙 GitHub';
            gl.href = p.githubLink;
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

function buildEducation(education) {
    const list = document.getElementById('education-list');
    if (!list) return;
    list.textContent = '';
    education.forEach(function(e) {
        const item = document.createElement('div');
        item.className = 'edu-item';
        item.innerHTML = `<div class="edu-title">${e.title}</div><div class="edu-inst">${e.institution}</div><div class="edu-date">${e.date}</div>`;
        list.appendChild(item);
    });
}

function buildCerts(certifications) {
    const grid = document.getElementById('cert-list');
    if (!grid) return;
    grid.textContent = '';
    certifications.forEach(function(c) {
        const item = document.createElement('div');
        item.className = 'cert-item';
        item.innerHTML = `<span class="cert-badge">${c.badge || '🏆'}</span><div><div class="edu-title">${c.title}</div><div class="edu-inst">${c.issuer}</div></div>`;
        grid.appendChild(item);
    });
}

function buildContactInfo(about, socials) {
    const container = document.getElementById('contact-info-list');
    if (!container) return;
    container.textContent = '';
    const items = [
        { icon: '📧', label: 'Email', value: about.email, href: about.email ? 'mailto:' + about.email : null },
        { icon: '🔗', label: 'LinkedIn', value: socials.linkedin, href: socials.linkedin },
        { icon: '🐙', label: 'GitHub', value: socials.github, href: socials.github },
        { icon: '📍', label: 'Location', value: about.location, href: null }
    ];

    items.forEach(function(it) {
        if (!it.value) return;
        const el = document.createElement(it.href ? 'a' : 'div');
        el.className = 'c-item';
        if (it.href) { el.href = it.href; el.target = '_blank'; }
        el.innerHTML = `<span class="c-ico">${it.icon}</span><div><div class="c-label">${it.label}</div><div class="c-val">${it.value}</div></div>`;
        container.appendChild(el);
    });
}

/** * ═════════════════════════════════════════════════════════════════════════════
 * 8. ATS CV GENERATOR — THE CORE ASSET
 * ═════════════════════════════════════════════════════════════════════════════
 */

/**
 * Dynamically constructs a print-ready, ATS-friendly CV from portfolioData.
 */
window.genCV = function() {
    console.log("[ATS] Generating Resume Preview...");
    const printEl = document.getElementById('cv-print');
    if (!printEl) return;

    const d = (typeof portfolioData !== 'undefined') ? portfolioData : {};
    const hero = d.hero || {};
    const abt = d.about || {};
    const exp = d.experience || [];
    const proj = d.projects || [];
    const edu = d.education || [];
    const sk = d.skills || [];

    printEl.textContent = ''; // Clear existing
    printEl.dataset.generated = '1';

    function createEl(tag, cls, text) {
        const e = document.createElement(tag);
        if (cls) e.className = cls;
        if (text) e.textContent = text;
        return e;
    }

    // Header Section
    const hdr = createEl('div', 'cv-hdr');
    const hdrL = createEl('div');
    hdrL.appendChild(createEl('div', 'cv-n', hero.name || 'Kartik Bhatia'));
    hdrL.appendChild(createEl('div', 'cv-r', 'Full-Stack Developer | Cybersecurity Enthusiast'));
    
    const hdrR = createEl('div', 'cv-cnt');
    if (abt.email) hdrR.appendChild(createEl('div', null, `📧 ${abt.email}`));
    if (abt.location) hdrR.appendChild(createEl('div', null, `📍 ${abt.location}`));
    if (d.socials?.github) hdrR.appendChild(createEl('div', null, `🐙 ${d.socials.github.replace('https://', '')}`));

    hdr.appendChild(hdrL);
    hdr.appendChild(hdrR);
    printEl.appendChild(hdr);

    // Summary
    printEl.appendChild(createEl('div', 'cv-st', 'Professional Summary'));
    printEl.appendChild(createEl('div', 'cv-para', abt.bio || 'Developer focused on web technologies and security.'));

    // Experience
    if (exp.length > 0) {
        printEl.appendChild(createEl('div', 'cv-st', 'Experience'));
        exp.forEach(e => {
            const expi = createEl('div', 'cv-expi');
            expi.innerHTML = `<div class="cv-ec"><strong>${e.company}</strong> | ${e.date}</div><div class="cv-rl">${e.role}</div>`;
            const ul = createEl('ul', 'cv-ul');
            (e.bullets || []).forEach(b => {
                const li = createEl('li');
                li.textContent = b;
                ul.appendChild(li);
            });
            expi.appendChild(ul);
            printEl.appendChild(expi);
        });
    }

    // Skills
    printEl.appendChild(createEl('div', 'cv-st', 'Technical Skills'));
    const skillList = [];
    sk.forEach(cat => skillList.push(...(cat.items || [])));
    printEl.appendChild(createEl('div', 'cv-para', skillList.join(' · ')));

    // Education
    if (edu.length > 0) {
        printEl.appendChild(createEl('div', 'cv-st', 'Education'));
        edu.forEach(e => {
            const edi = createEl('div', 'cv-expi');
            edi.innerHTML = `<div class="cv-ec"><strong>${e.institution}</strong></div><div>${e.title} | ${e.date}</div>`;
            printEl.appendChild(edi);
        });
    }
};

window.printCV = function() {
    const print = document.getElementById('cv-print');
    if (print && !print.dataset.generated) window.genCV();
    window.print();
};

/** * ═════════════════════════════════════════════════════════════════════════════
 * 9. NAVIGATION & TAB LOGIC
 * ═════════════════════════════════════════════════════════════════════════════
 */
const TAB_TITLES = {
    about: 'Portfolio Explorer — About.js',
    skills: 'Portfolio Explorer — Skills.css',
    exp: 'Portfolio Explorer — Experience.ts',
    projects: 'Portfolio Explorer — Projects.jsx',
    edu: 'Portfolio Explorer — Education.md',
    certs: 'Portfolio Explorer — Certifications.json',
    contact: 'Portfolio Explorer — Contact.php',
    cv: 'Portfolio Explorer — ATS CV Generator'
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
    
    // Auto-scroll on mobile to content
    if (window.innerWidth < 768) {
        const main = document.querySelector('main');
        if (main) main.scrollIntoView({ behavior: 'smooth' });
    }
};

/** * ═════════════════════════════════════════════════════════════════════════════
 * 10. SYSTEM MODALS & INTERACTION
 * ═════════════════════════════════════════════════════════════════════════════
 */
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
    if (modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    }
};

window.scrollToTop = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

/** * ═════════════════════════════════════════════════════════════════════════════
 * 11. BOOT LOADER — ENTRY POINT
 * ═════════════════════════════════════════════════════════════════════════════
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log("[BOOT] Initializing Portfolio Systems...");
    initTheme();      // Start Theme Engine (Default: Retro/Dev)
    initClock();      // Start Chronos
    initMatrix();     // Start Visual Engine
    injectData();     // Inject Portfolio Content & Setup Download Links
    initMemojiSwitcher(); // Load Avatar System
    initTerminal();   // Start Narrative Terminal
    console.log("[BOOT] All systems operational.");
});

// Final System Check for direct download mapping
window.addEventListener('load', () => {
    const btn = document.getElementById('resume-link');
    if (btn && (!btn.href || btn.href.includes('#'))) {
        console.warn("[SYSTEM] Resume Download link not found. Ensure portfolioData.hero.resumeLink is set.");
    }
});
