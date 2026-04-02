// ============================================================
// data.js — Kartik Bhatia Portfolio Data Store
// ============================================================

const portfolioData = {
  hero: {
    name: "Kartik Bhatia",
    role: "Full-Stack .NET Developer & Cybersecurity Follower",
    tagline: "Engineering secure, database-driven architectures and offline-first business solutions.",
    resumeLink: "assets/kartik_bhatia_cv.pdf"
  },
  about: {
    image: "assets/about.jpg.png", 
    bio: "I am a B.Sc. IT student at SRKI in Surat specializing in C#, ASP.NET, and SQL Server. I bridge the gap between complex Data Structures and functional business requirements, from building custom MVC engines to architecting secure booking systems. My approach combines backend stability with modern security practices.",
    email: "Learnkali.kb13@gmail.com",
    phone: "+91 8849531383",
    location: "Surat, Gujarat"
  },
  skills: [
    { category: "Backend & Database", items: ["ASP.NET MVC", "C#", "SQL Server", "ADO.NET", "Entity Framework", "Web Forms"] },
    { category: "Security & DSA", items: ["Data Structures", "Sorting Algorithms", "SHA-256 Hashing", "Identity Auth", "Binary Search"] },
    { category: "Frontend & UI", items: ["HTML5", "CSS3", "JavaScript (ES6+)", "Responsive Design", "Retro UI Engineering"] },
    { category: "Tools & Professional", items: ["Visual Studio", "GitHub", "Digital Marketing", "Meta Ads", "Event Management"] }
  ],
  experience: [
    {
      company: "VIKAS ENTERPRISE",
      role: "Freelance Web Developer",
      date: "March 2026",
      bullets: [
        "Architected 'VLL Pro' ERP using SHA-256 cryptographic hashing to ensure financial data integrity.",
        "Engineered a real-time Cashbook sync engine to automate multi-mode payment reconciliation.",
        "Transitioned business from manual paper ledgers to an immutable digital audit trail."
      ],
      impact: "Reduced daily reconciliation time by 85% and eliminated manual entry errors."
    },
    {
      company: "FASHIONCLUBSTUDIOS",
      role: "Digital Marketing Intern",
      date: "Dec 2025 – Feb 2026",
      bullets: [
        "Executed end-to-end Meta Ads campaigns including A/B testing and pixel tracking.",
        "Analyzed CTR and CPM metrics to optimize budget allocation for social reach.",
        "Created digital assets and managed brand identity across social platforms."
      ],
      impact: "Scaled organic reach to over 100,000 views within the first 30 days."
    },
    {
      company: "OPERATION ZERO BRIBE (ACB & Govt of Gujarat)",
      role: "Core Member",
      date: "2024 – 2025",
      bullets: [
        "Organized government-backed public awareness campaigns at V.T. Choksi Sarvajanik Law College.",
        "Managed communication between college administration and anti-corruption bureau officials.",
        "Authored and submitted official impact reports to government representatives."
      ],
      impact: "Successfully managed a ₹50,000 budget and educated 1,000+ citizens."
    }
  ],
  projects: [
    {
      id: "booking-sys",
      title: "Electronic Booking Management System",
      techStack: ["ASP.NET Web Forms", "SQL Server", "ADO.NET", "C#"],
      description: "Enterprise-level booking system with automated DB seeding, role-based authentication, and a dynamic device inventory managed via DataList and Repeater controls.",
      demoLink: "https://github.com/Kb130106", // Points to GitHub since .aspx requires a server
      githubLink: "https://github.com/Kb130106"
    },
    {
      id: "social-dsa",
      title: "SocialMedia DSA Web Engine",
      techStack: ["ASP.NET MVC", "Custom Stack/Queue", "Bubble Sort"],
      description: "A functional social media simulation showcasing manual DSA implementations: LIFO for undoing deletions, FIFO for notifications, and O(n²) sorting for feeds.",
      demoLink: "https://github.com/Kb130106", // Points to GitHub since .mvc requires a server
      githubLink: "https://github.com/Kb130106"
    },
    {
      id: "vll-pro",
      title: "Legacy Ledger (VLL Pro) & Cashbook",
      techStack: ["Vanilla JS", "LocalStorage", "CryptoJS", "PWA"],
      description: "Security-focused offline accounting suite for retail wholesalers. Features secure PIN entry, SHA-256 data hashing, and JSON-based cloud synchronization.",
      demoLink: "./Cashbook.html", // Works directly in browser as it is pure HTML/JS
      githubLink: "https://github.com/Kb130106"
    }
  ],
  education: [
    { title: "B.Sc. Information Technology", institution: "SRKI — Sarvajanik University", date: "2024 – Current" },
    { title: "11th–12th Commerce",            institution: "S.D. Jain Modern School",     date: "2022 – 2024" },
     { title: "Nursery–10th",            institution: "Delhi Public School",     date: "2010 – 2021" }
  ],
  certifications: [
    { title: "Claude 101 AI Certification",  issuer: "Anthropic Academy", score: "90%", badge: "📑" },
    { title: "Gen AI 101 Specialist",       issuer: "NASSCOM",           score: "A",    badge: "📑" },
    { title: "Digital Marketing Certified", issuer: "Erasmus+ (EU)",     score: "Pass", badge: "🏆" },
    { title: "NDA WIZQUIZ-23 Winner",       issuer: "All India Comp.",   score: "9th",  badge: "🏆" }
  ],
  socials: {
    linkedin: "https://www.linkedin.com/in/kartikbhatia1301",
    github: "https://github.com/Kb130106",
    email: "Learnkali.kb13@gmail.com"
  },
  memojiPaths: [
    "assets/memoji.jpg",
    "assets/memoji2.jpg",
    "assets/memoji3.jpg",
    "assets/memoji4.jpg",
    "assets/memoji5.jpg"
  ]
};
