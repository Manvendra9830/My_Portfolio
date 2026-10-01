export const personalInfo = {
  name: "Manvendra Singh",
  title: "AI Engineer",
  tagline: "Building production-oriented Generative AI systems",
  email: "manvendra9830@gmail.com",
  linkedin: "https://www.linkedin.com/in/manvendra-singh-837874290",
  github: "https://github.com/Manvendra9830",
  resumeLink: "https://drive.google.com/file/d/14G0-Qty8J9wv_EQE9NxDeISaCoHCYkZQ/view",
  achievementChips: [
    "AI Intern @ Darwix AI",
    "Ex-Head of Corporate Relations @ T&P Cell",
    "Ex-Research Intern @ WSAI IIT Madras",
    "CGPA: 8.33",
    "Teaching Assistant – Software Engineering & Mathematics",
    "Luminous Techno-X 2024 Runner-Up",
  ],
};

export const aboutMe = `AI Engineer and B.Tech Computer Science graduate (IIIT Raichur, 2026) with hands-on experience building production-oriented Generative AI systems – LLM-powered automation, RAG pipelines, prompt engineering, and vector search.

I have delivered up to 80% reduction in manual effort through AI-driven automation across internship and independent projects. Proficient in Python, FastAPI, LangChain, and vector databases (FAISS, ChromaDB), with additional research experience in deep learning-based image retrieval.`;

export const domainFocus = [
  {
    title: "Generative AI & LLMs",
    description: "RAG, AI Agents, Prompt Engineering, LangChain",
  },
  {
    title: "Machine Learning & Deep Learning",
    description: "PyTorch, Transformers, NLP, Computer Vision",
  },
  {
    title: "Backend & APIs",
    description: "FastAPI, Flask, Django, REST APIs",
  },
  {
    title: "Databases & Vector Stores",
    description: "FAISS, ChromaDB, PostgreSQL, MongoDB",
  },
];

export const projects = [
  {
    id: 1,
    title: "AI Agent Automation System",
    subtitle: "Conversational Analysis Workflows",
    github: "https://github.com/Manvendra9830/Empathy_Engine_DarvixAI.git",
    tech: ["Python", "LLMs", "RAG", "FAISS", "LangChain"],
    domains: ["AI/ML", "LLMs"],
    description: "Developed an AI agent platform with RAG, embeddings, and vector search for workflow automation. Implemented tool-calling and task-orchestration logic to enable conversational analysis workflows.",
  },
  {
    id: 2,
    title: "Naukri Guru",
    subtitle: "AI-Powered Job Automation Platform",
    github: "https://github.com/Manvendra9830/Naurkri_Guru",
    tech: ["Python", "AI Automation", "APIs", "Gemini"],
    domains: ["AI/ML", "Automation"],
    description: "Built an AI job-matching platform analyzing 1,000+ job postings. Automated resume parsing and recommendations, reducing effort by 80%.",
  },
  {
    id: 3,
    title: "Phonation Classification",
    subtitle: "Self-Supervised Learning",
    github: "https://github.com/Manvendra9830/SSL-Phonation-Classification.git",
    tech: ["PyTorch", "HuBERT", "Python", "Deep Learning"],
    domains: ["AI/ML"],
    description: "Built a phonation classification model using self-supervised HuBERT speech embeddings on the IITM Voice Dataset. Achieved 91.23% classification accuracy via transfer learning from pretrained speech representations.",
  },
  {
    id: 4,
    title: "VPR NetVLAD",
    subtitle: "Visual Place Recognition Pipeline",
    github: "https://github.com/Manvendra9830/VPR_NetVLAD.git",
    tech: ["Python", "PyTorch", "NetVLAD", "CNN", "FAISS", "Computer Vision"],
    domains: ["AI/ML", "Computer Vision"],
    description: "Scalable image retrieval system. Built a full VPR pipeline using CNN feature extraction + NetVLAD aggregation, optimized FAISS retrieval, and benchmarking on multiple embedding strategies.",
  },
  {
    id: 5,
    title: "BFSI Voice AI Bot",
    subtitle: "Gold Loan Lead Qualification Agent",
    github: "https://github.com/Manvendra9830/Voice_Bot",
    tech: ["Python", "FastAPI", "Vapi", "Gemini", "Streamlit", "Deepgram"],
    domains: ["AI/ML", "Voice AI"],
    description: "Production-style outbound voice agent for BFSI lead qualification. Handles Gold Loan interest checks, lead qualification, and BFSI-compliant conversations with structured data extraction.",
  },
  {
    id: 6,
    title: "SolarWise",
    subtitle: "AI Energy Management Platform",
    github: "https://github.com/Manvendra9830/Luminous-TechnoX-Techathon-2024",
    tech: ["React", "Flask", "PostgreSQL", "NeonDB"],
    domains: ["Web"],
    description: "Energy optimization platform. Built ToD/ToU energy optimization dashboards, consumption analysis, cost prediction, and user insights.",
  },
];

export const experience = [
  {
    title: "AI Intern",
    company: "Darwix AI",
    period: "Mar 2026 – Jul 2026",
    points: [
      "Engineered conversational AI systems using LLMs, RAG, embeddings, vector databases, and prompt engineering for business automation workflows.",
      "Designed FastAPI-based AI pipelines and real-time call analytics workflows, reducing manual intervention by 70%.",
      "Audited a combined RAG and transcript-analysis quality intelligence dashboard, identifying data pipeline gaps and producing a prioritized fix plan.",
    ],
  },
  {
    title: "Research Intern",
    company: "Wadhwani School of Data Science and AI, IIT Madras",
    period: "May 2025 – Nov 2025",
    points: [
      "Developed a Visual Place Recognition pipeline using NetVLAD and PyTorch for large-scale image retrieval tasks.",
      "Improved efficiency through pruning and quantization while achieving 85.37% Recall@1 on benchmark datasets.",
    ],
  },
  {
    title: "Head of Corporate Relations",
    company: "T&P Cell, IIIT Raichur",
    period: "Jan 2025 – Jan 2026",
    points: [
      "Partnered with 100+ companies for internships, placements, and hackathons.",
      "Managed recruitment operations for 3 student batches.",
    ],
  },
  {
    title: "Teaching Assistant",
    company: "Software Engineering & Mathematics",
    period: "Jun 2024 – Dec 2024",
    points: [
      "Served as Teaching Assistant for Software Engineering and Mathematics courses, supporting 100+ students through academic mentoring sessions.",
    ],
  },
];

export const skills = {
  technical: {
    "Programming": ["Python", "C++", "JavaScript", "TypeScript", "SQL"],
    "Generative AI & LLMs": ["LLMs", "RAG", "AI Agents", "Prompt Engineering", "LangChain", "LangGraph", "OpenAI API", "Gemini API", "Hugging Face", "Embeddings", "Function Calling"],
    "Machine Learning & Deep Learning": ["PyTorch", "TensorFlow", "Scikit-learn", "Transformers", "NLP", "Computer Vision"],
    "Backend & APIs": ["FastAPI", "Flask", "Django", "REST APIs", "API Integration"],
    "Databases & Vector Stores": ["PostgreSQL", "MongoDB", "FAISS", "ChromaDB", "Vector Databases"],
    "Deployment & DevOps": ["Docker", "Model Deployment", "Linux", "Git", "GitHub"],
    "Tools & Learning": ["Postman", "Ollama", "Langsmith"],
  },
  nonTechnical: ["Leadership", "Communication", "Teamwork", "Teaching", "Event Coordination"],
};

export const education = [
  {
    institution: "Indian Institute of Information Technology Raichur",
    degree: "Bachelor of Technology (Computer Science & Engineering)",
    period: "Aug 2022 – May 2026",
    score: "CGPA: 8.33",
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
    title: "Kaggle 5-Day Generative AI Intensive Course",
    link: "https://drive.google.com/file/d/1Rn9izRjTrfE2SLCiLg348BRx89GuOudS/view?usp=sharing",
  },
  {
    title: "Luminous Techno-X Hackathon 2024 — First Runner-up",
    link: "https://drive.google.com/file/d/1CNeAMPSe82-RGQMISgACEkdHeWZMt7qL/view?usp=sharing",
  },
  {
    title: "Teaching Assistant Certificate (SE & Maths)",
    link: "https://drive.google.com/file/d/1pKsJk7jlKgKd0mme13LpoO7ioP183Yxy/view?usp=sharing",
  },
];
