export type Point = {
  x: number;
  y: number;
};

export type ChapterEntry = {
  title: string;
  meta?: string;
  description: string;
  tags?: string[];
};

export type ChapterSection = {
  title: string;
  entries: ChapterEntry[];
};

export type DiscoveryZone = {
  id: string;
  label: string;
  mapLabel: string;
  eyebrow: string;
  description: string;
  facts: string[];
  position: Point;
  symbol: string;
  chapterTitle: string;
  chapterIntro: string;
  chapterStats: Array<{ value: string; label: string }>;
  chapterSections: ChapterSection[];
};

export const discoveryZones: DiscoveryZone[] = [
  {
    id: "origin",
    label: "Origin Terminal",
    mapLabel: "ORIGIN",
    eyebrow: "Profile fragment 01 · Identity",
    description: "Bhavin Baldota is a Lead Software Engineer in GenAI/ML at Persistent Systems with a B.Tech in Artificial Intelligence.",
    facts: [
      "Lead Software Engineer (GenAI/ML) · Persistent Systems",
      "B.Tech in Artificial Intelligence · 9.01 CGPA",
      "Generative AI · multi-agent systems · RAG · computer vision",
    ],
    position: { x: 155, y: 170 },
    symbol: "BB",
    chapterTitle: "Bhavin, at the source",
    chapterIntro: "An AI systems engineer focused on turning research ideas into useful, production-ready software—especially across Generative AI, retrieval, agents, and computer vision.",
    chapterStats: [
      { value: "GenAI/ML", label: "Current engineering focus" },
      { value: "9.01", label: "B.Tech CGPA" },
      { value: "60+", label: "Technical certifications" },
    ],
    chapterSections: [
      {
        title: "Current mission",
        entries: [
          {
            title: "Lead Software Engineer (GenAI/ML)",
            meta: "Persistent Systems · Sep 2025 – Present",
            description: "Building enterprise-scale Generative AI and multi-agent systems for intelligent analytics, business automation, and conversational data access.",
            tags: ["Generative AI", "Multi-agent systems", "RAG", "Computer vision"],
          },
        ],
      },
      {
        title: "Academic foundation",
        entries: [
          {
            title: "B.Tech, Artificial Intelligence",
            meta: "Vishwakarma University · Jun 2021 – Jun 2025 · 9.01 CGPA",
            description: "Focused on deep learning, machine learning, Generative AI, computer vision, and natural language processing.",
          },
          {
            title: "High School, Science",
            meta: "Mahaveer Jr. College · Jun 2019 – May 2021 · 89.88%",
            description: "Built the mathematics and science foundation behind later AI and engineering work.",
          },
        ],
      },
    ],
  },
  {
    id: "career",
    label: "Career Mainframe",
    mapLabel: "CAREER",
    eyebrow: "Profile fragment 02 · Experience",
    description: "Five roles trace a path from university R&D and defence audio research to applied ML and enterprise GenAI engineering.",
    facts: [
      "Persistent Systems · Lead Software Engineer (GenAI/ML)",
      "Text-to-SQL conversational AI and multi-agent workflows",
      "Five roles across enterprise, research, defence, and applied ML",
    ],
    position: { x: 570, y: 145 },
    symbol: "05",
    chapterTitle: "Professional field log",
    chapterIntro: "A chronological view of the roles, responsibilities, and real-world AI systems behind the career fragment.",
    chapterStats: [
      { value: "05", label: "Professional roles" },
      { value: "2023", label: "Career timeline begins" },
      { value: "GenAI", label: "Current specialization" },
    ],
    chapterSections: [
      {
        title: "Experience timeline",
        entries: [
          {
            title: "Lead Software Engineer (GenAI/ML)",
            meta: "Persistent Systems · Sep 2025 – Present · Full-time | Hybrid",
            description: "Enterprise Generative AI, Text-to-SQL conversational access, multi-agent orchestration, dynamic Python visualizations, and FastAPI microservices.",
            tags: ["Python", "FastAPI", "LLMs", "SQL", "RAG", "Docker"],
          },
          {
            title: "Expert Collaborator & AI Mentor",
            meta: "MIT World Peace University · Apr 2025 – Dec 2025 · Freelance | Hybrid",
            description: "Applied AI/ML proof-of-concepts, end-to-end model pipelines, research experimentation, and production-focused optimization.",
            tags: ["TensorFlow", "PyTorch", "OpenCV", "NLP"],
          },
          {
            title: "AI / ML Engineer",
            meta: "Provilac Milk · Nov 2024 – Aug 2025 · Full-time | On-site",
            description: "GPS proximity validation, route analysis, delivery object detection, and architecture for an LLM/RAG customer-support chatbot.",
            tags: ["YOLO", "OpenCV", "FastAPI", "LangChain", "Vector databases"],
          },
          {
            title: "Research Intern",
            meta: "DRDO, Ministry of Defence · Jul 2024 – Dec 2024 · Internship | Hybrid",
            description: "Audio-source identification, direction estimation, signal preprocessing, spectrogram analysis, and deep-learning research for intelligent sensing.",
            tags: ["Audio signal processing", "TensorFlow", "PyTorch", "NumPy"],
          },
          {
            title: "Research and Development Intern",
            meta: "Vishwakarma University · Jul 2023 – Jan 2024 · Internship | Hybrid",
            description: "Disease detection, predictive analytics, data preparation, ML/DL model training, evaluation, and research documentation.",
            tags: ["Scikit-learn", "Deep learning", "Data analytics"],
          },
        ],
      },
    ],
  },
  {
    id: "research",
    label: "Research Archive",
    mapLabel: "RESEARCH",
    eyebrow: "Profile fragment 03 · Publications",
    description: "Two Elsevier dataset publications contribute 9,790 annotated images for pothole detection and coconut-tree disease classification.",
    facts: [
      "2 Elsevier dataset publications",
      "3,992 natural-pothole images annotated with YOLO",
      "5,798 coconut-tree images across five disease categories",
    ],
    position: { x: 1080, y: 170 },
    symbol: "02",
    chapterTitle: "Research archive",
    chapterIntro: "The publication fragment contains exactly two peer-reviewed datasets, each built for practical machine-learning research.",
    chapterStats: [
      { value: "02", label: "Published datasets" },
      { value: "9,790", label: "Total images" },
      { value: "Elsevier", label: "Publisher" },
    ],
    chapterSections: [
      {
        title: "Published datasets",
        entries: [
          {
            title: "Exploring the natural pothole dataset generated by the abrasion and cavitation effects of river water on rocks",
            meta: "Elsevier Inc · Aug 24, 2024",
            description: "A collection of 3,992 high-resolution images documenting natural potholes in river environments, rigorously annotated using the YOLO object-detection framework.",
            tags: ["Computer vision", "YOLO", "Object detection", "Dataset"],
          },
          {
            title: "Coconut (Cocos nucifera) tree disease dataset: A dataset for disease detection and classification for machine learning applications",
            meta: "Elsevier Inc · Oct 15, 2023",
            description: "A dataset of 5,798 images across five disease categories for machine-learning-based disease detection and classification in coconut trees.",
            tags: ["Disease classification", "Plant pathology", "Machine learning", "Dataset"],
          },
        ],
      },
    ],
  },
  {
    id: "projects",
    label: "Project Workshop",
    mapLabel: "PROJECTS",
    eyebrow: "Profile fragment 04 · Projects",
    description: "Six featured repositories cover NLP, delivery intelligence, offline OCR, reinforcement learning, ML implementations, and crop diagnosis.",
    facts: [
      "6 featured project repositories",
      "NLP, OCR, logistics, computer vision, ML, and reinforcement learning",
      "Projects built with Python, FastAPI, PyTorch, TensorFlow, and OpenCV",
    ],
    position: { x: 270, y: 565 },
    symbol: "06",
    chapterTitle: "Project workshop",
    chapterIntro: "A precise inventory of the six featured builds represented by this fragment—without mixing in unrelated work.",
    chapterStats: [
      { value: "06", label: "Featured repositories" },
      { value: "AI/ML", label: "Primary domain" },
      { value: "GitHub", label: "Project archive" },
    ],
    chapterSections: [
      {
        title: "Featured builds",
        entries: [
          {
            title: "NLP Bank Complaints",
            description: "Natural-language-processing model for categorizing and analyzing banking complaints.",
            tags: ["NLP", "Machine learning", "Data science"],
          },
          {
            title: "Delivery Intelligence System",
            description: "AI-driven logistics routing with proximity-fraud prevention and computer-vision delivery checks.",
            tags: ["FastAPI", "OpenCV", "MongoDB"],
          },
          {
            title: "Offline OCR & Summary",
            description: "A fully offline pipeline for handwritten-text extraction and Transformer-based summarization.",
            tags: ["PyTorch", "Hugging Face", "Flask"],
          },
          {
            title: "Deep Reinforcement Learning",
            description: "Agents for Lunar Landing, pole balancing, and automated Mario gameplay.",
            tags: ["Reinforcement learning", "PyTorch", "Python"],
          },
          {
            title: "Machine Learning Implementations",
            description: "Practical implementations of machine-learning models, algorithms, and predictive workflows.",
            tags: ["Scikit-learn", "Python", "Predictive modeling"],
          },
          {
            title: "Crop Doctor",
            description: "A mobile-edge deep-learning assistant for diagnosing diseases across multiple crops.",
            tags: ["TensorFlow", "Keras", "Deep learning"],
          },
        ],
      },
    ],
  },
  {
    id: "systems",
    label: "Systems Reactor",
    mapLabel: "STACK",
    eyebrow: "Profile fragment 05 · Technical stack",
    description: "The stack fragment groups the technologies actually used across Bhavin's listed experience and projects.",
    facts: [
      "GenAI: LLMs, RAG, LangChain, and multi-agent systems",
      "Backend and data: Python, FastAPI, SQL, PostgreSQL, Docker",
      "ML and vision: PyTorch, TensorFlow, OpenCV, YOLO, Scikit-learn",
    ],
    position: { x: 735, y: 545 },
    symbol: "AI",
    chapterTitle: "Systems and skills reactor",
    chapterIntro: "A capability map assembled only from the technologies named in the experience, education, and project records.",
    chapterStats: [
      { value: "04", label: "Capability groups" },
      { value: "Full-stack", label: "AI delivery scope" },
      { value: "Production", label: "Engineering orientation" },
    ],
    chapterSections: [
      {
        title: "Capability map",
        entries: [
          {
            title: "Generative AI and orchestration",
            description: "Conversational AI, retrieval, agent coordination, prompt engineering, and database-aware context injection.",
            tags: ["LLMs", "RAG", "LangChain", "Multi-agent systems", "Vector databases"],
          },
          {
            title: "Backend and data systems",
            description: "API-first services, asynchronous communication, database access, and containerized delivery.",
            tags: ["Python", "FastAPI", "REST APIs", "SQL", "PostgreSQL", "Docker"],
          },
          {
            title: "Machine learning and vision",
            description: "Model development, object detection, image classification, model evaluation, and intelligent sensing.",
            tags: ["PyTorch", "TensorFlow", "OpenCV", "YOLO", "Scikit-learn", "Keras"],
          },
          {
            title: "Data and signal workflows",
            description: "Data preprocessing, analytics, numerical computing, audio features, and spectrogram-based experimentation.",
            tags: ["Pandas", "NumPy", "Data analytics", "Audio signal processing", "Spectrogram analysis"],
          },
        ],
      },
    ],
  },
];
