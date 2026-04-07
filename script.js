/**
 * ============================================================
 * script.js — KARTIK BHATIA PORTFOLIO (v2.0.0)
 * * FEATURES:
 * 1. Adaptive Theme Engine (Default: Developer/Retro)
 * 2. High-Performance Matrix/Particle Canvas
 * 3. Reactive Data Injection (SECURE)
 * 4. ATS-Optimized Resume Generator
 * 5. Interactive Terminal Experience
 * 6. Memoji Crossfade System
 * ============================================================
 */

'use strict';

/* ═══════════════════════════════════════════════════════════════
   1. GLOBAL STATE & CONFIGURATION
   ═══════════════════════════════════════════════════════════════ */
const CONFIG = {
    DEFAULT_THEME: 'retro', // Developer Mode
    HACKER_THEME: 'hacker',
    TYPING_SPEED: 30,
    CLOCK_INTERVAL: 1000,
    MATRIX_SPEED: 55,
    MEMOJI_INTERVAL: 3000
};

/* ═══════════════════════════════════════════════════════════════
   2. THEME ENGINE (DEVELOPER-FIRST LOGIC)
   ═══════════════════════════════════════════════════════════════ */
function initTheme() {
    // Priority: LocalStorage -> Default Config
    const savedTheme = localStorage.getItem('kb-portfolio-theme') || CONFIG.DEFAULT_THEME;
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeUI(savedTheme);
}

window.toggleTheme = function() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const nextTheme = currentTheme === CONFIG.DEFAULT_THEME ? CONFIG.HACKER_THEME : CONFIG.DEFAULT_THEME;
    
    // Apply Transition Effect
    document.body.classList.add('theme-transitioning');
    
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('kb-portfolio-theme', nextTheme);
    updateThemeUI(nextTheme);
    
    setTimeout(() => {
        document.body.classList.remove('theme-transitioning');
    }, 500);
};

function updateThemeUI(theme) {
    const label = document.getElementById('theme-label');
    const icon = document.getElementById('theme-icon');
    
    if (label) {
        // If current is Developer (Retro), show "HACKER MODE" as the target
        label.textContent = theme === 'retro' ? 'HACKER MODE' : 'DEVELOPER MODE';
    }
    
    // Custom Logic for changing Title extensions dynamically
    const navTabs = document.querySelectorAll('.nav-tab');
    navTabs.forEach(tab => {
        const target = tab.getAttribute('data-target');
        if (!target) return;
        
        const name = target.charAt(0).toUpperCase() + target.slice(1);
        if (theme === 'hacker') {
            tab.querySelector('.tab-text').textContent = `${name}.exe`;
        } else {
            tab.querySelector('.tab-text').textContent = `${name}.js`;
        }
    });
}

/* ═══════════════════════════════════════════════════════════════
   3. CANVAS SYSTEM (MATRIX RAIN)
   ═══════════════════════════════════════════════════════════════ */
function initMatrix() {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height, columns, drops;
    
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$<>|ﾊﾐﾋｰｳｼﾅﾓ';

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        columns = Math.floor(width / 18);
        drops = new Array(columns).fill(1);
    }

    function draw() {
        // Create fading effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, width, height);

        // Set color based on theme
        const currentTheme = document.documentElement.getAttribute('data-theme');
        ctx.fillStyle = currentTheme === 'hacker' ? '#00ff41' : '#3a86ff'; 
        ctx.font = '15px "JetBrains Mono", monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * 18, drops[i] * 18);

            if (drops[i] * 18 > height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    window.addEventListener('resize', resize);
    resize();
    setInterval(draw, CONFIG.MATRIX_SPEED);
}

/* ═══════════════════════════════════════════════════════════════
   4. TERMINAL EMULATOR (TYPEWRITER)
   ═══════════════════════════════════════════════════════════════ */
function initTerminal() {
    const terminalBody = document.getElementById('tw-body');
    if (!terminalBody) return;

    terminalBody.textContent = ''; // Clear existing

    const script = [
        { text: '> Initializing kernel...', type: 'info' },
        { text: '> Loading Developer_Profile.json...', type: 'info' },
        { text: '> Status: FULL-STACK ARCHITECT READY', type: 'success' },
        { text: '> Secondary: CYBERSECURITY RESEARCHER', type: 'glitch' },
        { text: '> Locating assets in Adajan, Surat...', type: 'info' },
        { text: '> System Operational.', type: 'prompt' }
    ];

    let overallDelay = 0;

    script.forEach((line, index) => {
        setTimeout(() => {
            const lineElement = document.createElement('div');
            lineElement.className = `terminal-line line-${line.type}`;
            terminalBody.appendChild(lineElement);

            let charIndex = 0;
            const interval = setInterval(() => {
                lineElement.textContent = line.text.slice(0, charIndex++);
                if (charIndex > line.text.length) {
                    clearInterval(interval);
                    // Add blinker to last line
                    if (index === script.length - 1) {
                        const blinker = document.createElement('span');
                        blinker.className = 'terminal-cursor';
                        lineElement.appendChild(blinker);
                    }
                }
                terminalBody.scrollTop = terminalBody.scrollHeight;
            }, CONFIG.TYPING_SPEED);

        }, overallDelay);
        overallDelay += line.text.length * CONFIG.TYPING_SPEED + 400;
    });
}

/* ═══════════════════════════════════════════════════════════════
   5. ATS RESUME GENERATOR
   ═══════════════════════════════════════════════════════════════ */
window.genCV = function() {
    const printArea = document.getElementById('cv-print');
    if (!printArea) return;

    const data = (typeof portfolioData !== 'undefined') ? portfolioData : {};
    printArea.innerHTML = ''; // Clear
    printArea.dataset.generated = '1';

    // 1. Header Section
    const header = document.createElement('section');
    header.className = 'cv-header-ats';
    header.innerHTML = `
        <h1 class="cv-name">${data.hero?.name || 'Kartik Bhatia'}</h1>
        <p class="cv-contact">
            Surat, India | ${data.about?.email || ''} | LinkedIn: /in/kartikbhatia1301
        </p>
    `;
    printArea.appendChild(header);

    // 2. Summary
    const summary = document.createElement('section');
    summary.innerHTML = `
        <h2 class="cv-section-title">Professional Summary</h2>
        <p class="cv-text">${data.about?.bio || ''}</p>
    `;
    printArea.appendChild(summary);

    // 3. Experience
    const experience = document.createElement('section');
    experience.innerHTML = `<h2 class="cv-section-title">Work Experience</h2>`;
    
    if (data.experience) {
        data.experience.forEach(exp => {
            const expDiv = document.createElement('div');
            expDiv.className = 'cv-item';
            expDiv.innerHTML = `
                <div class="cv-flex">
                    <strong>${exp.company}</strong>
                    <span>${exp.date}</span>
                </div>
                <div class="cv-role">${exp.role}</div>
                <ul class="cv-list">
                    ${(exp.bullets || []).map(b => `<li>${b}</li>`).join('')}
                </ul>
            `;
            experience.appendChild(expDiv);
        });
    }
    printArea.appendChild(experience);

    // 4. Projects
    const projects = document.createElement('section');
    projects.innerHTML = `<h2 class="cv-section-title">Key Projects</h2>`;
    if (data.projects) {
        data.projects.forEach(proj => {
            const projDiv = document.createElement('div');
            projDiv.className = 'cv-item';
            projDiv.innerHTML = `
                <strong>${proj.title}</strong> — <em>${proj.techStack.join(', ')}</em>
                <p>${proj.description}</p>
            `;
            projects.appendChild(projDiv);
        });
    }
    printArea.appendChild(projects);
};

/* ═══════════════════════════════════════════════════════════════
   6. CORE UTILITIES & UI BUILDERS
   ═══════════════════════════════════════════════════════════════ */
function initClock() {
    const clockElement = document.getElementById('hb-clock');
    if (!clockElement) return;

    setInterval(() => {
        const now = new Date();
        clockElement.textContent = now.toLocaleTimeString('en-GB', { hour12: false });
    }, CONFIG.CLOCK_INTERVAL);
}

window.switchTab = function(target) {
    // Update Section Visibility
    document.querySelectorAll('.section').forEach(sec => {
        sec.classList.toggle('active', sec.id === `sec-${target}`);
    });

    // Update Tab Active State
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.toggle('active', tab.getAttribute('data-target') === target);
    });

    // Update Window Title
    const winTitle = document.getElementById('nav-win-title');
    if (winTitle) {
        const titles = {
            about: 'Portfolio Explorer — About.js',
            skills: 'Portfolio Explorer — Skills.css',
            projects: 'Portfolio Explorer — Projects.jsx',
            exp: 'Portfolio Explorer — Experience.ts',
            contact: 'Portfolio Explorer — Contact.php'
        };
        winTitle.textContent = titles[target] || 'Portfolio Explorer';
    }
};

/* ═══════════════════════════════════════════════════════════════
   7. MODAL MANAGEMENT
   ═══════════════════════════════════════════════════════════════ */
window.openCVModal = function() {
    const modal = document.getElementById('cv-modal');
    if (modal) {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
        if (!document.getElementById('cv-print').dataset.generated) {
            window.genCV();
        }
    }
};

window.closeCVModal = function() {
    const modal = document.getElementById('cv-modal');
    if (modal) {
        modal.classList.remove('open');
        document.body.style.overflow = 'auto';
    }
};

/* ═══════════════════════════════════════════════════════════════
   8. BOOTSTRAP INITIALIZATION
   ═══════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
    console.log('KARTIK PORTFOLIO ENGINE: Booting...');
    
    // 1. Systems
    initTheme();
    initClock();
    initMatrix();
    
    // 2. Data
    if (typeof injectData === 'function') {
        injectData(); // From your existing data injection script
    }

    // 3. Visuals
    initTerminal();
    
    if (typeof initMemojiSwitcher === 'function') {
        initMemojiSwitcher();
    }

    // Handle Scroll
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.bottom-nav');
        if (nav) {
            nav.classList.toggle('nav-scrolled', window.scrollY > 50);
        }
    });

    console.log('KARTIK PORTFOLIO ENGINE: Online.');
});
