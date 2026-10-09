// Sources: supplied CVs, verified portfolio links, and Bhavin’s direct corrections.
export const PROFILE = {
  name: "Bhavin Baldota", role: "Lead Software Engineer · GenAI", location: "Pune, India",
  email: "bhavinbaldota16@gmail.com", phone: "+91 7755934707", phoneHref: "+917755934707",
  github: "https://github.com/CoderFatherBB", linkedin: "https://www.linkedin.com/in/bhavin-baldota-103553234/",
  resume: "/resumes/Bhavin_Baldota_CV_ATS.pdf",
  venture: "Co-founder · AIoT Tech",
  motto: "Researching the unseen, creating the unthinkable.",
  introduction: "From applied machine learning to generative AI and intelligent agents, I turn research ideas into production applications.",
  summary: "I connect research, development, and deployment across machine learning, computer vision, and generative AI. At Persistent Systems, I architected 5+ enterprise GenAI systems supporting 10,000+ daily queries and semantic search across 50,000+ documents. Previously, I independently delivered 14 production AI/ML systems at Provilac. My research includes audio localization at DRDO and contributions to two Elsevier Data in Brief datasets.",
  transcript: "Hi, I'm Bhavin Baldota. I research, develop, and deploy AI systems, from machine learning and computer vision to generative AI and intelligent agents. I turn research ideas into real-world applications. Welcome to my portfolio.",
};
export const NAV = ["About", "Skills", "Work", "Research", "Experience", "Achievements", "Contact"];
export const SKILL_GROUPS = [
  { name: "Languages", skills: ["Python", "SQL", "JavaScript"] },
  { name: "GenAI & agents", skills: ["LangChain", "LangGraph", "MCP", "OpenAI API", "Groq", "Ollama", "Fine-tuning", "Prompt engineering", "Agentic AI"] },
  { name: "Retrieval", skills: ["ChromaDB", "FAISS", "Hybrid search", "Embeddings", "Semantic search"] },
  { name: "Machine learning", skills: ["PyTorch", "TensorFlow", "scikit-learn", "Hugging Face", "OpenCV", "Deep learning", "Reinforcement learning"] },
  { name: "Backend & cloud", skills: ["FastAPI", "Flask", "Firebase", "REST APIs", "AWS", "Docker", "Git / GitHub", "CI/CD"] },
  { name: "Evaluation", skills: ["LLMOps", "Evaluation pipelines", "Guardrails", "Hallucination mitigation", "Cost optimization"] },
];
export const PROJECTS = [
  { id: "deliveriq", title: "DeliverIQ", kicker: "Delivery intelligence", description: "A nine-module AI/ML suite connecting route optimization, demand forecasting, anomaly detection, and computer-vision package tracking.", features: ["9 interconnected AI/ML modules", "RAG for delivery questions", "90%+ retrieval accuracy", "Paper in preparation for IEEE Access"], tech: ["Python", "PyTorch", "FastAPI", "LangChain", "ChromaDB", "OpenCV"], github: "", diagram: [{"title": "Delivery records", "detail": "Bring together the delivery data used by the suite."}, {"title": "Nine AI/ML modules", "detail": "Run the relevant forecasting, routing, anomaly, and vision modules."}, {"title": "Route, demand & package insights", "detail": "Combine route optimization, demand forecasts, and package-tracking signals."}, {"title": "Delivery knowledge retrieval", "detail": "Retrieve relevant delivery information for RAG questions."}, {"title": "Operational insights", "detail": "Present the combined signals and grounded answers for delivery decisions."}] },
  { id: "rag", title: "Document intelligence", kicker: "Enterprise RAG", description: "A production retrieval pipeline combining recursive chunking, hybrid search, and metadata filtering to ground answers in enterprise documents.", features: ["Recursive document chunking", "Hybrid retrieval + metadata filters", "70% less retrieval time", "90%+ answer accuracy"], tech: ["Python", "LangChain", "ChromaDB", "FAISS", "FastAPI", "OpenAI API"], github: "", diagram: [{"title": "Enterprise documents", "detail": "Start with the document corpus and its metadata."}, {"title": "Recursive chunking", "detail": "Break documents into retrievable passages."}, {"title": "Embeddings & vector index", "detail": "Represent passages for semantic search using the retrieval stack."}, {"title": "Hybrid search & metadata filters", "detail": "Find relevant passages with semantic/keyword retrieval and document filters."}, {"title": "Retrieved context", "detail": "Supply the selected evidence to the answer-generation step."}, {"title": "Grounded answer", "detail": "Return a document-grounded answer; evaluate retrieval and answer quality."}] },
  { id: "agents", title: "Agents that collaborate", kicker: "Multi-agent orchestration", description: "A multi-agent framework with tool calling, persistent memory, and reflection loops for multi-step business workflows.", features: ["Tool-calling orchestration", "Persistent conversational memory", "60% faster completion vs. single-agent baseline", "500+ daily sessions"], tech: ["Python", "LangGraph", "LangChain", "MCP", "FastAPI", "ChromaDB"], github: "", diagram: [{"title": "Request & conversation memory", "detail": "Interpret the request alongside persistent conversation context."}, {"title": "Multi-agent planning", "detail": "Coordinate the steps needed for the business workflow."}, {"title": "Tool calling", "detail": "Use the relevant tools to carry out those steps."}, {"title": "Reflection & evaluation", "detail": "Review the intermediate results and refine the workflow where needed."}, {"title": "Workflow result", "detail": "Return the outcome and preserve relevant conversational memory."}] },
  { id: "crop", title: "Crop Doctor", kicker: "Applied computer vision", description: "Deep learning for agricultural disease detection, connecting university research with an applied crop-diagnosis project.", features: ["Plant disease classification", "Image-based model development", "Training and evaluation", "Coconut and sugarcane research"], tech: ["Python", "TensorFlow", "OpenCV", "Deep learning"], github: "https://github.com/CoderFatherBB/Crop-Doctor-Final-Year-Project-", diagram: [{"title": "Plant images", "detail": "Start with images for agricultural disease classification."}, {"title": "Image preparation", "detail": "Prepare the image inputs for model development."}, {"title": "Deep-learning model", "detail": "Train the TensorFlow classification model on the prepared data."}, {"title": "Training & evaluation", "detail": "Evaluate the model before using it for classification."}, {"title": "Disease classification", "detail": "Use the trained model to classify the supplied plant image."}] },
];
export const RESEARCH = [
  { title: "Coconut tree disease dataset", publication: "Elsevier · Data in Brief", detail: "Contributed to model development, the training pipeline, and evaluation for plant-disease classification.", link: "https://www.sciencedirect.com/science/article/pii/S2352340923007692" },
  { title: "Natural pothole dataset", publication: "Elsevier · Data in Brief", detail: "Contributed to computer-vision model training and dataset curation for natural potholes formed by abrasion and cavitation.", link: "https://www.sciencedirect.com/science/article/pii/S2352340924008370" },
];
export const EXPERIENCE = [
  { id: "provilac-software", employment: "Full-time", date: "Jun 2020–2023", role: "Software Developer", place: "Provilac", detail: "Built customer-facing and logistics applications, including subscription ordering, delivery scheduling, real-time tracking, and internal route-management tools. Supported 10,000+ active users, reduced operational errors by 40%, and improved load times by approximately 50%.", kind: "Engineering" },
  { id: "btech", employment: "Full-time", date: "2021–2025", role: "B.Tech · AI & Data Science", place: "Vishwakarma University", detail: "CGPA 9.01/10. Ranked second in the department. Perfect 10.0/10 in semesters seven and eight.", kind: "Education" },
  { id: "university-research", date: "2022–2024", role: "Research & Development Intern", place: "Vishwakarma University", detail: "Developed and evaluated disease- and defect-detection models across five domains, achieving 90%+ accuracy in each domain and contributing to two published datasets.", kind: "Research" },
  { id: "drdo", date: "Jul–Dec 2024", role: "Research Intern · AI/ML", place: "DRDO", detail: "Developed deep learning for audio perception and sound-source localization, achieving 92% localization accuracy in multi-channel environments.", kind: "Research" },
  { id: "provilac-ai", date: "Nov 2024–Aug 2025", role: "AI & ML Engineer", place: "Provilac", detail: "Independently designed, developed, and deployed 14 production AI/ML systems spanning logistics, computer vision, SaaS, and GenAI. Improved process automation efficiency by 30%.", kind: "Engineering" },
  { id: "mit-wpu", date: "Apr–Dec 2025", role: "Expert Collaborator", place: "MIT World Peace University", detail: "Delivered GenAI and LLM workshops, mentored hackathon teams, and co-developed research proposals with faculty.", kind: "Mentoring" },
  { id: "persistent", date: "Sep 2025–Present", role: "Lead Software Engineer · GenAI", place: "Persistent Systems", detail: "Architected 5+ enterprise GenAI systems handling 10,000+ daily queries, with 99.5% uptime. Reduced hallucinations by 35% and inference costs by 25%; LangGraph workflows reduced manual workflow time by 60%. Mentors three junior engineers.", kind: "Engineering" },
];
export const CERTIFICATIONS = [
  { name: "Artificial Intelligence Pro", issuer: "TCS iON", detail: "Certified" },
  { name: "Deep Learning · GenAI · LLMOps · AWS · Computer Vision", issuer: "Coursera · DeepLearning.AI · LinkedIn Learning", detail: "60+ certifications across these fields" },
];
export const ACHIEVEMENTS = [
  { value: "9.01", label: "B.Tech CGPA", detail: "Out of 10 · Vishwakarma University" },
  { value: "2nd", label: "Department rank", detail: "Artificial Intelligence & Data Science" },
  { value: "14", label: "Production AI/ML systems", detail: "Independently delivered at Provilac" },
  { value: "60+", label: "Certifications", detail: "Across AI, GenAI, cloud, and computer vision" },
  { value: "24+", label: "AI/ML repositories", detail: "End-to-end projects on GitHub" },
];
