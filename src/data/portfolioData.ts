export const personalInfo = {
  name: "Manvendra Singh",
  title: "AI/ML Engineer & Software Developer",
  tagline: "Eager learner passionate about building intelligent systems",
  email: "manvendra9830@gmail.com",
  linkedin: "https://www.linkedin.com/in/manvendra-singh-837874290",
  github: "https://github.com/Manvendra9830",
  resumeLink: "https://drive.google.com/file/d/1jue7PauPcZtsho2MH9rlWBXq1izIjP1g/view?usp=sharing",
  achievementChips: [
    "AI Intern @ Darwix AI",
    "Head of Corporate Relations (T&P Cell)",
    "Ex-Research Intern @ WSAI IIT Madras",
    "CGPA: 8.41",
    "Teaching Assistant – Software Engineering & Mathematics",
    "Luminous Techno-X 2024 Runner-Up",
  ],
};

export const aboutMe = `AI/ML Engineer & Software Developer with hands-on experience building LLM-based systems, scalable backend pipelines, and intelligent applications.

Currently working as an AI Intern at Darwix AI, developing RAG-based systems, automation workflows, and agent-driven solutions.

Experienced in machine learning, deep learning, and full-stack development with a strong focus on real-world problem solving and system design.`;

export const domainFocus = [
  {
    title: "Machine Learning & Deep Learning",
    description: "Neural networks, model training, optimization",
  },
  {
    title: "Software Engineering & Backend Systems",
    description: "APIs, databases, scalable architectures",
  },
  {
    title: "Computer Vision & Geospatial Analysis",
    description: "Image processing, GIS, remote sensing",
  },
  {
    title: "LLMs, NLP & Data Pipelines",
    description: "Transformers, RAG, embeddings, ETL pipelines",
  },
];

export const projects = [
  {
    id: 1,
    title: "Empathy Engine",
    subtitle: "AI Agent System",
    github: "https://github.com/Manvendra9830/Empathy_Engine_DarvixAI.git",
    tech: ["LLMs", "RAG", "LangChain", "Vector Search", "Automation"],
    domains: ["AI/ML", "LLMs"],
    description: "Built AI agent system using LLMs and Retrieval-Augmented Generation. Designed pipelines using embeddings and vector search, implemented prompt engineering for better responses, and developed automation workflows using AI agents and scalable backend logic.",
  },
  {
    id: 2,
    title: "VPR NetVLAD",
    subtitle: "Visual Place Recognition Pipeline",
    github: "https://github.com/Manvendra9830/VPR_NetVLAD.git",
    tech: ["Python", "PyTorch", "NetVLAD", "CNN", "FAISS", "Deep Learning", "Computer Vision"],
    domains: ["AI/ML", "Computer Vision"],
    description: "Scalable image retrieval system. Built a full VPR pipeline using CNN feature extraction + NetVLAD aggregation, optimized FAISS retrieval, and benchmarking on multiple embedding strategies.",
  },
  {
    id: 3,
    title: "ForestCut",
    subtitle: "Temporal Deforestation Detection & Prediction",
    github: "https://github.com/Manvendra9830/Forest-Cut-Temporal-Detection-and-Prediction",
    tech: ["Python", "JavaScript", "GEE", "LSTM", "Deep Learning"],
    domains: ["AI/ML"],
    description: "NDVI-based time-series analysis + LSTM forecasting on Google Earth Engine to detect forest cover loss.",
  },
  {
    id: 4,
    title: "Time Table Generator",
    subtitle: "Flask + Genetic Algorithms",
    github: "https://github.com/Manvendra9830/Time_Table_Generator",
    liveLink: "https://time-table-generator-95m7.onrender.com/",
    tech: ["Python", "Flask", "SQLite", "Genetic Algorithms"],
    domains: ["Web"],
    description: "Genetic algorithm-based scheduling. Automated timetable generator optimizing schedule constraints using a Genetic Algorithm.",
  },
  {
    id: 5,
    title: "Phonation Classification",
    subtitle: "SSL + HuBERT Speech Analysis",
    github: "https://github.com/Manvendra9830/Mini_Project_SSL_Phontation_classify",
    tech: ["Python", "PyTorch", "HuBERT", "Deep Learning"],
    domains: ["AI/ML"],
    description: "Speech classification pipeline achieving 91.23% accuracy using HuBERT embeddings + SVM/MLP/RF classifiers.",
  },
  {
    id: 6,
    title: "Reddit Persona Generator",
    subtitle: "LLM-Based User Profiling",
    github: "https://github.com/Manvendra9830/Reddit_Persona_Maker",
    liveLink: "https://redditpersonamaker.vercel.app/",
    tech: ["Python", "LLMs", "APIs", "Ollama"],
    domains: ["LLMs", "Web"],
    description: "Persona generation using embeddings and prompt engineering. Generated detailed persona reports from Reddit user histories using locally hosted LLMs.",
  },
  {
    id: 7,
    title: "SolarWise",
    subtitle: "AI Energy Management Platform",
    github: "https://github.com/Manvendra9830/Luminous-TechnoX-Techathon-2024",
    tech: ["React", "Flask", "PostgreSQL", "NeonDB"],
    domains: ["Web"],
    description: "Energy optimization platform. Built ToD/ToU energy optimization dashboards, consumption analysis, cost prediction, and user insights.",
  },
  {
    id: 8,
    title: "Naukri Guru",
    subtitle: "AI-Powered Job Automation Platform",
    github: "https://github.com/Manvendra9830/Naurkri_Guru",
    tech: ["Python", "Selenium", "SQLite", "Gemini", "Flask", "Pandas", "BeautifulSoup"],
    domains: ["AI/ML", "Automation"],
    description: "Autonomous AI-driven desktop application that automates LinkedIn job search and Easy Apply, evaluates candidate fit using heuristic scoring, syncs recruiter emails via Gmail IMAP, and sends personalized cold emails using an AI-generated outreach pipeline.",
  },
  {
    id: 9,
    title: "BFSI Voice AI Bot",
    subtitle: "Gold Loan Lead Qualification Agent",
    github: "https://github.com/Manvendra9830/Voice_Bot",
    tech: ["Python", "FastAPI", "Vapi", "Gemini", "Streamlit", "Deepgram"],
    domains: ["AI/ML", "Voice AI"],
    description: "Production-style outbound voice agent for BFSI lead qualification. Handles Gold Loan interest checks, lead qualification, and BFSI-compliant conversations with structured data extraction, analytics dashboard, and call recording management.",
  },
];

export const experience = [
  {
    title: "AI Intern",
    company: "Darwix AI",
    period: "March 2026 – Present",
    points: [
      "Developing LLM-based applications using RAG and vector search",
      "Building AI-driven automation workflows using agents",
      "Designing scalable backend pipelines and API integrations",
    ],
  },
  {
    title: "Research Intern",
    company: "Wadhwani School of Data Science and AI, IIT Madras",
    period: "May 2025 – Nov 2025",
    points: [
      "Built scalable visual place recognition pipeline using PyTorch",
      "Implemented FAISS-based vector search for large-scale retrieval",
      "Optimized models using pruning and quantization",
    ],
  },
  {
    title: "Head of Corporate Relations",
    company: "Training & Placement Cell, IIIT Raichur",
    period: "Jan 2025 – Present",
    points: [
      "Led corporate outreach and partnerships",
      "Coordinated placement drives, hackathons, and events",
    ],
  },
  {
    title: "Teaching Assistant",
    company: "Software Engineering & Mathematics",
    period: "Jun 2024 – Dec 2024",
    points: [
      "Assisted in Software Engineering and Mathematics courses",
    ],
  },
];

export const skills = {
  technical: {
    "Programming": ["Python", "C", "C++", "JavaScript", "PHP"],
    "Web & Frameworks": ["React.js", "Flask", "Django", "REST APIs", "Tailwind CSS"],
    "Machine Learning & AI": ["Supervised & Unsupervised Learning", "Feature Engineering", "Model Evaluation", "PyTorch", "TensorFlow"],
    "NLP & LLMs": ["Transformers", "Embeddings", "Prompt Engineering", "RAG", "LangChain", "LLM Applications"],
    "ML Engineering & MLOps": ["Data Pipelines", "FAISS", "Model Optimization (Quantization, Pruning)", "Experiment Tracking", "Model Deployment"],
    "Backend & Systems": ["API Design", "Authentication", "Caching", "State Management", "Microservices Basics"],
    "Databases": ["PostgreSQL", "MySQL", "SQLite", "Neon DB"],
    "Tools": ["Git", "GitHub", "VS Code", "Docker (Beginner)", "Grafana", "Ollama"],
    "CS Fundamentals": ["DSA", "OOP", "OS", "DBMS", "System Design Basics"],
  },
  nonTechnical: ["Leadership", "Communication", "Teamwork", "Teaching", "Event Coordination"],
};

export const education = [
  {
    institution: "IIIT Raichur",
    degree: "B.Tech CSE",
    period: "2022 – 2026",
    score: "CGPA: 8.41/10",
  },
  {
    institution: "Green Valley High School",
    degree: "Intermediate (12th)",
    period: "2020 – 2021",
    score: "92%",
  },
];

export const certificates = [
  {
    title: "Kaggle 5-Day Generative AI Course",
    link: "https://drive.google.com/file/d/1BEUcfvmS8lht7TTuRwNwDZ4pw_iojr1Q/view",
  },
  {
    title: "Luminous Techno-X 2024 — First Runner Up",
    link: "https://drive.google.com/file/d/1eG_t_4uf8SE-S0pdJcJYWW6LVtRHFt30",
  },
  {
    title: "Goldman Sachs — Crack Leaked Password Program",
    link: "https://drive.google.com/file/d/1XIWRDVMoogkQYrCTfSlhuYy1-Tt-VBAx/view?usp=sharing",
  },
  {
    title: "Teaching Assistant Certificate (SE & Maths)",
    link: "https://drive.google.com/file/d/1Hg0mGXReJb122G6IyHqd2CxpCvKXTUtA/view?usp=sharing",
  },
];
