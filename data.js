// ============================================================
// data.js — Kartik Bhatia Portfolio Data Store
// ============================================================

const portfolioData = {
  hero: {
    name: "Kartik Bhatia",
    role: "Full-Stack .NET Developer",
    tagline: "Building secure, scalable accounting architectures and offline-first business solutions.",
    resumeLink: "assets/kartik_bhatia_cv.pdf"
  },
  about: {
    image: "assets/about.jpg", // Square profile image for the About section
    bio: "I am a B.Sc. IT student at SRKI in Surat with a strong focus on building scalable web applications. My expertise lies in C#, ASP.NET MVC, and offline-first Javascript applications. I specialize in engineering functional, secure financial ledgers and business management solutions.",
    email: "Learnkali.kb13@gmail.com",
    phone: "+91 8849531383",
    location: "Surat, Gujarat"
  },
  skills: [
    { category: "Backend & Database",  items: ["ASP.NET MVC", "C#", "Python", "SQL Server", "Vanilla JS", "LocalStorage DB"] },
    { category: "Security & AI",       items: ["Cybersecurity Principles", "Local LLMs", "Prompt Engineering", "SHA-256 Hashing"] },
    { category: "Frontend",            items: ["HTML5", "CSS3", "Responsive Design", "PWA Architecture"] },
    { category: "Tools & Operations",  items: ["Visual Studio", "Event Management", "Budget Allocation", "Meta Ads"] }
  ],
  experience: [
    {
      company: "VIKAS ENTERPRISE",
      role: "Offline Web Application Developer — Freelance",
      date: "March 2026",
      bullets: [
        "Problem: Manual Rozmel paper ledgers were error-prone, lacked an audit trail, and delayed multi-payment reconciliation.",
        "Solution: Architected VLL Pro ERP with SHA-256 cryptographic hashing. Built CASHBOOK with a smart sync engine for multi-mode payments.",
        "Impact: Eliminated errors, reduced daily reconciliation from hours to minutes, and created an immutable financial audit trail."
      ],
      impact: "Eliminated manual reconciliation errors; audit trail now immutable."
    },
    {
      company: "FASHIONCLUBSTUDIOS",
      role: "Digital Marketing Intern (Paid)",
      date: "Dec 2025 – Feb 2026",
      bullets: [
        "Problem: No Meta Ads funnel, zero targeting strategy, and minimal social reach.",
        "Solution: Built end-to-end FB & IG ad campaigns with A/B testing, audience segmentation, and CPM/CTR optimization.",
        "Impact: Scaled brand presence to achieve 100,000+ organic views in 30 days."
      ],
      impact: "100K+ organic views in 30 days across social platforms."
    },
    {
      company: "OPERATION ZERO BRIBE (ACB & Govt. of Gujarat)",
      role: "Core Member — Public Awareness Campaign",
      date: "2024–2025",
      bullets: [
        "Secured institutional partnership by directly pitching to the Principal.",
        "Authored official post-event impact report for V.T. Choksi Law College.",
        "Impact: Managed ₹50K budget, reaching 1,000+ citizens with verified government documentation."
      ],
      impact: "₹50K budget managed · 1,000+ citizens reached."
    }
  ],
  projects: [
    {
      id: "vll-pro",
      title: "Vikas Legacy Ledger (VLL Pro) & Cashbook",
      techStack: ["HTML5", "Vanilla JS", "LocalStorage DB", "SHA-256"],
      description: "Offline-first financial ledger applications with PIN authentication and JSON data synchronization. Built specifically to handle Rozmel and multi-mode payment reconciliation.",
      demoLink: "/assets/projects/Cashbook.html", // Links directly to your hosted local file
      githubLink: "" // Kept blank to protect business proprietary code
    },
    {
      id: "booking-sys",
      title: "Enterprise Booking Management System",
      techStack: ["ASP.NET", "SQL Server", "C#", "Role-Based Auth"],
      description: "Full-stack booking system featuring a highly normalized DB schema, secure role-based authentication, and production-ready secure lifecycle management.",
      demoLink: "",
      githubLink: "https://github.com/yourusername/booking-system" // Put your github link here
    },
    {
      id: "social-dsa",
      title: "SocialMedia DSA Web Engine",
      techStack: ["C# MVC", "Data Structures", "TimSort", "LocalDB"],
      description: "A web application demonstrating core DSA concepts (Stack, Queue, Hash Tables, Binary Search) functioning seamlessly within a live MVC environment.",
      demoLink: "https://yourusername.github.io/social-dsa/", // Link if hosted
      githubLink: "https://github.com/yourusername/social-dsa" // Github link
    }
  ],
  education: [
    { title: "B.Sc. Information Technology", institution: "SRKI — Sarvajanik University", date: "2024 – Current" },
    { title: "Claude 101 Certification",      institution: "Anthropic Academy",           date: "March 2026" },
    { title: "Gen AI 101",                    institution: "NASSCOM",                     date: "2025" },
    { title: "Digital Marketing",             institution: "Erasmus+ (EU)",               date: "2025" },
    { title: "11th–12th Commerce",            institution: "S.D. Jain Modern School",     date: "2022–2024" }
  ],
  certifications: [
    { title: "Claude 101",      issuer: "Anthropic Academy",    score: "90%",           badge: "🤖" },
    { title: "Gen AI 101",      issuer: "NASSCOM",              score: "",              badge: "🧠" },
    { title: "Digital Marketing", issuer: "Erasmus+ (EU)",      score: "",              badge: "📊" },
    { title: "NDA WIZQUIZ-23",  issuer: "All India Competition", score: "State Rank 9th", badge: "🏆" }
  ],
  socials: {
    linkedin: "https://www.linkedin.com/in/yourprofile", // UPDATE THIS
    github: "https://github.com/yourusername",           // UPDATE THIS
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