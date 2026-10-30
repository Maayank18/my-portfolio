/* ═══════════════════════════════════════════════════════════════════
   mock.js  —  Single source of truth for all portfolio data
   ═══════════════════════════════════════════════════════════════════ */

/* ─── PERSONAL INFO ─────────────────────────────────────────────── */
export const personalInfo = {
  name:      "Mayank Garg",
  firstName: "Mayank",
  headline:  "Building High-Impact Systems.",
  subtitle:  "AI Software Engineer · Backend Systems Architect · Ex-Research Intern @ IIT Ropar",
  bio:       "AI Software Engineer & Backend Architect (Ex-Research Intern at IIT Ropar). I engineer high-performance distributed backends, real-time MERN & WebSocket architectures, and low-latency Voice AI & autonomous agent pipelines—translating complex algorithmic challenges into robust, production-ready systems.",

  // Hero media
  media: {
    type:     "video",
    sources:  [
      { src: "/part1.mp4",  type: "video/mp4"  },
    ],
    poster:   "/hero-poster.jpg",
    playOnce: "load",
  },

  portrait:  "/hero-poster.jpg",

  // ── Contact ──────────────────────────────────────────────────────
  email:    "gargmayank1805@gmail.com",
  github:   "https://github.com/Maayank18",
  linkedin: "https://www.linkedin.com/in/mayank-garg-120a77214/",
  resume:   "#",
};

/* ─── FILTER TABS ────────────────────────────────────────────────── */
export const filterCategories = [
  "All",
  "Generative AI",
  "Full Stack",
  "AI Engineering",
  "Frontend",
];

/* ─── PROJECTS ───────────────────────────────────────────────────── */
export const projects = [
  {
    id:          1,
    title:       "FloatGPT",
    shortDesc:   "Ambient floating AI desktop assistant with screen awareness, voice control, and autonomous planning.",
    description: "FloatGPT is a native floating AI desktop assistant for Windows featuring an interactive ambient orb summoned via global hotkey (Ctrl+Shift+Space). It integrates real-time window and screen awareness, voice and Hinglish conversational capability, system actions (app launch, memory status, active-window typing), autonomous goal planning, and document intelligence.",
    category:    "Generative AI",
    techStack:   ["Electron", "React", "TypeScript", "Node.js", "Gemini API", "Tailwind CSS"],
    thumbnail:   "/FloatGPT.png",
    liveUrl:     "https://floatgpt.vercel.app/",
    sourceUrl:   "https://github.com/Maayank18/FloatGPT",
  },
  {
    id:          2,
    title:       "CodeArena 1v1",
    shortDesc:   "Real-time 1v1 competitive coding battles with live 60fps algorithm visualizer and matchmaking.",
    description: "CodeArena 1v1 is a real-time competitive coding arena where developers battle head-to-head solving algorithmic challenges. Features live ELO-ranked matchmaking, an interactive 60fps algorithm visualizer engine, WebSockets code synchronization, and an admin control center built from scratch.",
    category:    "Full Stack",
    techStack:   ["React", "Node.js", "Express", "Socket.io", "MongoDB", "Tailwind CSS"],
    thumbnail:   "/CodeArena.png",
    liveUrl:     "https://code-arena-1v1.vercel.app/dashboard",
    sourceUrl:   "https://github.com/Maayank18",
  },
  {
    id:          3,
    title:       "Dig",
    shortDesc:   "Automated AI research pipeline discovering, grounding, and organizing event sponsors & speakers.",
    description: "Dig is an automated intelligence pipeline that crawls and researches the web for hackathon and conference sponsors, speakers, and leads. Translates natural language into multi-step web searches, extracts verifiable facts with source citations, enriches with verified contacts (LinkedIn, GitHub, Hunter.io emails), tracks outreach states, and drafts customized outreach pitches.",
    category:    "Full Stack",
    techStack:   ["React", "TypeScript", "Node.js", "Express", "SQLite", "Tavily AI", "Groq API"],
    thumbnail:   "/Dig.png",
    liveUrl:     "https://dig-ai.vercel.app/",
    sourceUrl:   "https://github.com/Maayank18",
  },
  {
    id:          4,
    title:       "AuraOS",
    shortDesc:   "Biology-first mental health & somatic triage platform for executive function recovery.",
    description: "AuraOS is a biology-first mental health and somatic triage platform designed for moments when executive function hits zero. Acoustically detects distress and vocal cadence, somatically regulates through interactive physics, and clinically triages using LangChain AI workflows and guardian clinical reporting.",
    category:    "AI Engineering",
    techStack:   ["React", "Electron", "Node.js", "Express", "LangChain", "Gemini Flash", "Tailwind CSS"],
    thumbnail:   "/AuraOS.png",
    liveUrl:     "https://github.com/Maayank18/Aura-OS",
    sourceUrl:   "https://github.com/Maayank18/Aura-OS",
  },
  {
    id:          5,
    title:       "AI-Code-Reviewer Extension",
    shortDesc:   "In-editor AI code reviewer delivering instant static analysis and one-click in-place fixes.",
    description: "An AI-powered developer tool and VS Code extension that reviews code in real time using the Gemini API. Automatically scans files or folders for bugs, security vulnerabilities, and code smell, delivering contextual suggestions with one-click in-place corrections directly in your editor.",
    category:    "Generative AI",
    techStack:   ["TypeScript", "VS Code API", "Node.js", "Gemini API", "AST Parser", "REST APIs"],
    thumbnail:   "/AI-code-reviewer.png",
    liveUrl:     "https://github.com/Maayank18/CodeReviewerPro",
    sourceUrl:   "https://github.com/Maayank18/CodeReviewerPro",
  },
  {
    id:          6,
    title:       "Particle Animator",
    shortDesc:   "Gesture-controlled interactive particle simulation powered by computer vision and MediaPipe.",
    description: "A real-time gesture-controlled particle animation system that tracks hand landmarks and motion using MediaPipe. User finger pinches, palms, and spatial gestures dynamically influence physical forces, gravitational fields, and visual particle vortexes in real-time.",
    category:    "Frontend",
    techStack:   ["React", "MediaPipe", "HTML5 Canvas", "Tailwind CSS", "Framer Motion"],
    thumbnail:   "/ParticleAnimator.png",
    liveUrl:     "https://github.com/Maayank18/ParticleAnimator",
    sourceUrl:   "https://github.com/Maayank18/ParticleAnimator",
  },
];

/* ─── SKILLS ─────────────────────────────────────────────────────── */
export const skillCategories = [
  {
    title: "Backend Engineering",
    icon:  "Server",
    color: "#00d4ff",
    skills: [
      { name: "Node.js & Express.js",        icon: "Server",        level: 96 },
      { name: "TypeScript Backend Arch",     icon: "FileCode",      level: 75 },
      { name: "MongoDB & Aggregations",      icon: "Database",      level: 95 },
      { name: "Backend Algorithms & Logic",  icon: "Binary",        level: 93 },
      { name: "WebSockets & Socket.io",      icon: "Radio",         level: 92 },
      { name: "RESTful APIs & Middleware",   icon: "Cpu",           level: 94 },
      { name: "Redis Caching & Queues",      icon: "HardDrive",     level: 90 },
      { name: "JWT Auth & Security (RBAC)",  icon: "ShieldCheck",   level: 92 },
    ],
  },
  {
    title: "AI Engineering & Agents",
    icon:  "Bot",
    color: "#f5ff40",
    skills: [
      { name: "Autonomous Agents",     icon: "Bot",           level: 94 },
      { name: "LangChain & LangGraph", icon: "Workflow",      level: 92 },
      { name: "RAG & Vector Pipelines",icon: "Search",       level: 93 },
      { name: "Gemini & OpenAI APIs",  icon: "Brain",         level: 95 },
      { name: "Tool & Function Calling",icon: "Wand2",       level: 91 },
      { name: "Claude API & Anthropic",icon: "Sparkles",     level: 90 },
      { name: "Groq LPU Fast Inference",icon: "Zap",          level: 92 },
      { name: "VectorDB (Pinecone/Chroma)", icon: "Layers",   level: 89 },
    ],
  },
  {
    title: "Voice AI & Multimodal",
    icon:  "AudioWaveform",
    color: "#ff3cac",
    skills: [
      { name: "Edge-TTS (Speech Synth)",icon: "AudioWaveform",level: 94 },
      { name: "Whisper & WhisperFlow", icon: "Mic",          level: 92 },
      { name: "Realtime Audio Streams",icon: "Radio",        level: 89 },
      { name: "Voice Activity Detect (VAD)",icon: "Activity",level: 88 },
      { name: "WebRTC Audio Channels", icon: "Network",      level: 86 },
      { name: "Multimodal Vision + Audio",icon: "Sliders",   level: 90 },
    ],
  },
  {
    title: "AI Coding Agents & IDEs",
    icon:  "Terminal",
    color: "#38e8ff",
    skills: [
      { name: "Cursor AI",             icon: "Terminal",      level: 96 },
      { name: "Claude (Anthropic)",    icon: "Sparkles",      level: 95 },
      { name: "Google Antigravity",    icon: "Atom",          level: 94 },
      { name: "GitHub Copilot",        icon: "Github",        level: 92 },
      { name: "Codex & LLM Code Gen",  icon: "Code",          level: 90 },
      { name: "Ollama / Local Models", icon: "Cpu",           level: 88 },
    ],
  },
  {
    title: "Core Software Engineering",
    icon:  "Binary",
    color: "#a855f7",
    skills: [
      { name: "System Design & Architecture", icon: "Layers",    level: 92 },
      { name: "Object-Oriented Programming (OOP)", icon: "Box",  level: 94 },
      { name: "Database Management (DBMS)",   icon: "Database",  level: 92 },
      { name: "Operating Systems (OS)",       icon: "Cpu",       level: 90 },
      { name: "Data Structures & Algos",      icon: "Binary",    level: 93 },
      { name: "SDLC & Agile Methodologies",   icon: "Workflow",  level: 91 },
      { name: "Computer Networks & Protocols",icon: "Network",   level: 89 },
      { name: "Git & Version Control",        icon: "GitBranch", level: 94 },
    ],
  },
  {
    title: "Frontend & Systems UI",
    icon:  "Atom",
    color: "#4ade80",
    skills: [
      { name: "React 19 & Next.js",    icon: "Atom",          level: 88 },
      { name: "TypeScript",            icon: "FileCode",      level: 75 },
      { name: "Tailwind CSS",          icon: "Wind",          level: 87 },
      { name: "HTML5 Canvas 2D/Physics",icon: "Activity",    level: 83 },
      { name: "Framer Motion & UX",    icon: "Sparkles",      level: 84 },
      { name: "Vite Bundling",         icon: "Zap",           level: 85 },
    ],
  },
];

/* ─── SOCIAL LINKS ───────────────────────────────────────────────── */
export const socialLinks = [
  { name: "GitHub",   url: "https://github.com/Maayank18",                       icon: "Github"   },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/mayank-garg-120a77214/", icon: "Linkedin" },
  { name: "Email",    url: "mailto:gargmayank1805@gmail.com",                    icon: "Mail"     },
];
