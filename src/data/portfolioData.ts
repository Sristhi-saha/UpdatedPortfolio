export interface Project {
  id: string;
  title: string;
  category: 'AI & Machine Learning' | '3D Web & Creative' | 'Full-Stack & Systems';
  description: string;
  longDescription: string;
  tech: string[];
  metrics: string;
  liveUrl: string;
  githubUrl: string;
  gradient: string;
  featured: boolean;
  modelType: 'torus' | 'icosahedron' | 'dodecahedron' | 'sphere';
}

export interface SkillCategory {
  title: string;
  description: string;
  icon: string;
  skills: { name: string; level: number; tags: string }[];
}

export interface Experience {
  period: string;
  role: string;
  company: string;
  location: string;
  highlights: string[];
  technologies: string[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  cgpa: string;
  highlights: string[];
}

export const PORTFOLIO_DATA = {
  profile: {
    name: "Sristhi Saha",
    alias: "sristhi.dev",
    title: "Frontend Developer & Full-Stack AI Engineer",
    tagline: "Crafting scalable full-stack platforms, high-performance React/Next.js interfaces, and autonomous agentic AI architectures.",
    location: "India (Available for Remote & Global Opportunities)",
    status: "Open to Full-Time SDE & Frontend Opportunities",
    phone: "+91 74390 72758",
    email: "Shyamalsaha558@gmail.com",
    stats: [
      { label: "DSA Solved", value: "220+" },
      { label: "BCA CGPA", value: "9.5" },
      // { label: "Public Repos", value: "26+" },
    ],
    socials: {
      github: "https://github.com/Sristhi-saha",
      linkedin: "https://linkedin.com/in/sristhi-saha",
      leetcode: "https://leetcode.com/u/SristhiSaha",
      geeksforgeeks: "https://geeksforgeeks.org/user/sristhi_saha",
      email: "Shyamalsaha558@gmail.com",
      phone: "+91 74390 72758",
    },
    resumeUrl: "/Sristhi_Saha_Resume.pdf",
    resumeDriveUrl: "", // Optional: Paste your Google Drive / Cloud link here
  },

  education: {
    institution: "Chandannagar Institute of Management and Technology",
    degree: "Bachelor of Computer Application (BCA)",
    period: "2023 – 2027",
    cgpa: "8.5 / 10.0",
    highlights: [
      "Focused coursework in Data Structures & Algorithms, OOP, Operating Systems, Computer Networks, and DBMS.",
      "Consistently maintained an 8.5/10.0 CGPA.",
      "Active participant in technical symposiums, hackathons, and science innovation fests.",
    ],
  } as Education,

  projects: [
    {
      id: "zyra-ai",
      title: "Zyra AI – Autonomous Agentic Platform",
      category: "AI & Machine Learning",
      description: "Enterprise-grade autonomous agentic AI platform engineered with a Modular Monolith, Hexagonal Architecture, and event-driven RabbitMQ messaging.",
      longDescription: "Architected high-throughput backend APIs using NestJS, TypeScript, PostgreSQL, and Drizzle ORM with Redis caching for sub-millisecond data retrieval. Spearheaded RAG retrieval pipelines, LLM agent orchestration using LangChain & LangGraph, vector embeddings via Pinecone/Weaviate, and real-time streaming via WebSockets and Server-Sent Events (SSE). Collaborated in a 5-member agile squad on system design, database modeling, and containerized Docker deployments.",
      tech: ["NestJS", "TypeScript", "Next.js", "PostgreSQL", "Drizzle ORM", "Redis", "RabbitMQ", "LangChain", "LangGraph", "Docker", "WebSockets"],
      metrics: "Modular Monolith • Hexagonal Arch • 5-Member Team",
      liveUrl: "",
      githubUrl: "https://github.com/Sristhi-saha/Zyra-AI",
      gradient: "from-purple-500 to-indigo-600",
      featured: true,
      modelType: "icosahedron",
    },
    {
      id: "mockmate-ai",
      title: "MockMate AI – Smart Interview Simulator",
      category: "AI & Machine Learning",
      description: "Full-stack AI-driven mock interview simulator that generates tailored questions and real-time performance evaluation via Gemini AI API.",
      longDescription: "Engineered with the MERN stack (MongoDB, Express.js, React.js, Node.js). Integrates Google Gemini AI API to parse user resumes and dynamically generate context-aware technical and behavioral interview questions tailored to target roles. Developed an AI scoring pipeline providing actionable instant feedback, coupled with an interactive Recharts telemetry dashboard visualizing scoring progression across multiple mock sessions.",
      tech: ["MongoDB", "Express.js", "React.js", "Node.js", "Gemini AI API", "Recharts", "Tailwind CSS"],
      metrics: "Resume Parsing • Real-time AI Scoring • Recharts Telemetry",
      liveUrl: "https://mockmate-ai.vercel.app",
      githubUrl: "https://github.com/Sristhi-saha/MockMate_AI",
      gradient: "from-cyan-500 to-blue-600",
      featured: true,
      modelType: "torus",
    },
    {
      id: "apple-clone",
      title: "Apple iPhone 15 Pro – 3D Web Experience",
      category: "3D Web & Creative",
      description: "Interactive 3D product showcase recreating the Apple iPhone 15 Pro experience with Three.js WebGL models, dynamic materials, and GSAP ScrollTrigger.",
      longDescription: "Engineered a high-fidelity 3D web experience with React Three Fiber, Three.js, and GSAP. Features smooth scroll-driven 3D camera animations, interactive titanium finish color switchers, dynamic scale transforms, and fluid micro-interactions tailored for high-conversion e-commerce showcases.",
      tech: ["Three.js", "React Three Fiber", "GSAP", "ScrollTrigger", "React.js", "Tailwind CSS"],
      metrics: "60 FPS WebGL • GSAP Choreography • 3D Model Rendering",
      liveUrl: "",
      githubUrl: "https://github.com/Sristhi-saha/APPLE_WEBSITE_CLONE",
      gradient: "from-amber-500 to-indigo-600",
      featured: true,
      modelType: "sphere",
    },
    {
      id: "serum-site",
      title: "Serum Studio – Animated Web Experience",
      category: "3D Web & Creative",
      description: "Award-winning creative portfolio experience engineered with GSAP, ScrollTrigger, canvas image sequence scrubbing, and physics-based transitions.",
      longDescription: "Built an immersive digital agency experience featuring smooth inertial scrolling, canvas-rendered image sequences synchronized with scroll progress, custom cursor magnetic physics, and typographic split-text reveals.",
      tech: ["GSAP", "ScrollTrigger", "JavaScript", "HTML5 Canvas", "Tailwind CSS"],
      metrics: "Scrubbed Canvas Sequences • Inertial Scroll • Physics Transitions",
      liveUrl: "",
      githubUrl: "https://github.com/Sristhi-saha/Serum_Animated_site",
      gradient: "from-emerald-500 to-cyan-500",
      featured: true,
      modelType: "dodecahedron",
    },
    {
      id: "aduarchive",
      title: "AduArchive – Academic Review & Plagiarism Guard",
      category: "Full-Stack & Systems",
      description: "Full-stack MERN academic platform featuring role-based access control, Gemini AI plagiarism detection, and student/faculty support bot.",
      longDescription: "Designed RESTful APIs and complex MongoDB aggregation pipelines powering an authenticated multi-user review and rating system. Integrated Gemini AI API for automated academic plagiarism inspection and an intelligent 24/7 conversational support chatbot. Built with a responsive, mobile-first React.js and Tailwind CSS frontend deployed to live production.",
      tech: ["MongoDB", "Express.js", "React.js", "Node.js", "Gemini AI API", "Tailwind CSS", "RESTful APIs"],
      metrics: "Production Deployed • Aggregation Pipelines • AI Plagiarism Guard",
      liveUrl: "https://aduarchive.vercel.app",
      githubUrl: "https://github.com/Sristhi-saha/AduArchive",
      gradient: "from-emerald-400 to-cyan-500",
      featured: true,
      modelType: "dodecahedron",
    },
    {
      id: "black5-creatives",
      title: "PhoneCase & wallart Agency",
      category: "Full-Stack & Systems",
      description: "Live production website for Black5 Creatives digital agency delivering client acquisition, case studies, and responsive design systems.",
      longDescription: "Engineered and deployed the live official website for Black5 Creatives (black5creatives.in). Optimized for sub-second first contentful paint (FCP), 100/100 mobile accessibility, responsive design systems, and seamless lead generation workflows.",
      tech: ["React.js", "Tailwind CSS", "JavaScript", "SEO & OpenGraph", "Vercel"],
      metrics: "Live In Production • Sub-second FCP • High-conversion UX",
      liveUrl: "https://black5creatives.in/",
      githubUrl: "https://github.com/Sristhi-saha/Black5_Creatives",
      gradient: "from-indigo-600 to-purple-600",
      featured: true,
      modelType: "torus",
    },
    {
      id: "chat-app",
      title: "Socket.IO Real-Time Chat Engine",
      category: "Full-Stack & Systems",
      description: "Bi-directional real-time messaging application with room management, live presence tracking, typing indicators, and message persistence.",
      longDescription: "Engineered with Node.js, Express, Socket.io, and React. Handles concurrent WebSocket connections, room channels, JWT authenticated session handshakes, and responsive desktop/mobile chat views.",
      tech: ["Socket.io", "React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
      metrics: "Real-time WebSockets • Sub-10ms Latency • Room Channels",
      liveUrl: "",
      githubUrl: "https://github.com/Sristhi-saha/Chat-Application",
      gradient: "from-cyan-500 to-blue-600",
      featured: false,
      modelType: "sphere",
    },
    // ,
    {
      id: "e-commerce-app",
      title: "Full-Stack MERN E-Commerce Platform",
      category: "Full-Stack & Systems",
      description: "Comprehensive online shopping system with product search, filtering, Redux Toolkit cart state, user profiles, and order management.",
      longDescription: "Engineered a full-featured MERN e-commerce application with secure admin dashboard, inventory management, user authentication, customer reviews, and responsive mobile-optimized checkout workflows.",
      tech: ["MongoDB", "Express.js", "React.js", "Node.js", "Redux Toolkit", "Tailwind CSS"],
      metrics: "Redux State • Admin Dashboard • Order Fulfillment",
      liveUrl: "",
      githubUrl: "https://github.com/Sristhi-saha/E_Commerce_App",
      gradient: "from-blue-600 to-indigo-600",
      featured: false,
      modelType: "torus",
    },
   
  ] as Project[],

  skillCategories: [
    {
      title: "Frontend Engineering & UI/UX",
      description: "Pixel-perfect, accessible, mobile-first web applications with cutting-edge React architectures.",
      icon: "Code2",
      skills: [
        { name: "React.js & Next.js", level: 95, tags: "Lazy Loading, Code Splitting, SSR" },
        { name: "JavaScript & TypeScript", level: 92, tags: "ES6+, Type Safety, Generics" },
        { name: "Tailwind CSS & Bootstrap", level: 94, tags: "Responsive, Dark Mode, Animations" },
        { name: "Framer Motion & GSAP", level: 88, tags: "Physics Transitions, Scroll Effects" },
        { name: "Redux & State Architecture", level: 86, tags: "Global State, Action Dispatch" },
        { name: "HTML5, CSS3 & WCAG", level: 96, tags: "Accessibility Standards, Semantic UI" },
      ],
    },
    {
      title: "Backend, APIs & Distributed Architecture",
      description: "Modular Monoliths, event-driven microservices, and low-latency API layers.",
      icon: "Cpu",
      skills: [
        { name: "Node.js & Express.js", level: 92, tags: "RESTful APIs, Middlewares, MERN" },
        { name: "NestJS & Microservices", level: 88, tags: "Hexagonal Arch, Modular Monolith" },
        { name: "RabbitMQ & Event-Driven", level: 85, tags: "Message Queues, Async Exchange" },
        { name: "WebSockets & SSE", level: 89, tags: "Real-time Bi-directional Data" },
        { name: "JWT Auth & Security", level: 91, tags: "Role-Based Access Control (RBAC)" },
      ],
    },
    {
      title: "Databases, Cloud & AI Systems",
      description: "Robust data pipelines, caching tiers, vector stores, and generative AI integrations.",
      icon: "Boxes",
      skills: [
        { name: "MongoDB & Mongoose", level: 93, tags: "Aggregation Pipelines, Schemas" },
        { name: "PostgreSQL & MySQL", level: 89, tags: "Relational Modeling, Indexing" },
        { name: "Redis Caching", level: 87, tags: "In-Memory Store, Sub-ms Latency" },
        { name: "Gemini AI API & Prompt Eng", level: 94, tags: "LLM Inference, Structured Output" },
        { name: "LangChain, LangGraph & RAG", level: 86, tags: "Vector Search, Agentic Workflows" },
        { name: "Docker, Git & Postman", level: 90, tags: "Containerization, CI/CD, API Testing" },
      ],
    },
  ] as SkillCategory[],

  languages: ["JavaScript", "TypeScript", "C", "C++", "Java"],

  csFundamentals: [
    "Object-Oriented Programming (OOP)",
    "Data Structures & Algorithms (DSA)",
    "Operating Systems",
    "Computer Networks",
    "Database Management Systems (DBMS)",
  ],

  experiences: [
    {
      period: "July 2025 — PRESENT",
      role: "Frontend Developer",
      company: "Orbital Webworks",
      location: "Remote, India",
      highlights: [
        "Developed and optimized live web applications using React.js and Next.js, significantly improving page load speed by leveraging lazy loading, code splitting, and image optimization techniques.",
        "Built and maintained responsive, mobile-first websites using WordPress and custom React components, ensuring cross-browser compatibility and strict WCAG accessibility standards.",
        "Collaborated closely with UI/UX designers and backend engineers to deliver pixel-perfect, accessible, and high-conversion web interfaces.",
        "Constructed reusable, cross-browser compatible UI component libraries ensuring seamless user experiences across mobile, tablet, and desktop devices.",
      ],
      technologies: ["React.js", "Next.js", "Tailwind CSS", "WordPress", "JavaScript", "WCAG"],
    },
  ] as Experience[],

  achievements: [
    {
      title: "Competitive Programming (120+ Solved)",
      description: "Solved 120+ Data Structures & Algorithm problems across LeetCode and GeeksforGeeks, demonstrating strong analytical and problem-solving fundamentals.",
      icon: "Trophy",
    },
    {
      title: "Science Fest Innovation Participant",
      description: "Participated in the Science Fest at Abacus Institute of Management and Technology, showcasing technical innovation, collaborative problem-solving, and system design.",
      icon: "Award",
    },
    {
      title: "College Hackathon Team Lead",
      description: "Spearheaded and coordinated a 4-member developer squad in an intensive college hackathon, directing sprint task allocation, architecture development, and the final keynote presentation.",
      icon: "Users",
    },
  ],
};
