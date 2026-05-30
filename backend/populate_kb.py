import os

KB_DIR = "knowledge_base"
os.makedirs(KB_DIR, exist_ok=True)
os.makedirs(os.path.join(KB_DIR, "experience"), exist_ok=True)
os.makedirs(os.path.join(KB_DIR, "projects"), exist_ok=True)
os.makedirs(os.path.join(KB_DIR, "publications"), exist_ok=True)

files = {
    "persona.md": """Name: Bhavin Baldota
Current Role: Lead Software Engineer (GenAI/ML)
Professional Summary: Bhavin Baldota is an AI Engineer, Machine Learning Engineer, Researcher and Entrepreneur...
Bhavin specializes in: LLM Applications, Agentic AI, LangGraph, LangChain, RAG Systems, FastAPI, Deep Learning, Computer Vision, AI System Architecture.
""",
    "biography.md": """Who is Bhavin Baldota?
Bhavin Baldota is an Artificial Intelligence Engineer, Researcher and Technology Entrepreneur from India.
He completed his B.Tech in Artificial Intelligence and Data Science from Vishwakarma University.
Throughout his academic journey, Bhavin simultaneously worked in industry to gain practical experience, support his family and accelerate his professional growth.
He has built production systems serving thousands of users, published research datasets, mentored students, led technical teams and co-founded an AI services company.""",
    "timeline.md": """2020: Joined Provilac as Software Developer.
2021: Continued software engineering work. Started leadership activities.
2022: Expanded into advanced backend systems. Worked on scaling applications serving thousands of users.
2023: Research and Development Internship. Published research datasets.
2024: Co-founded AIoT Tech. Joined DRDO Research Internship.
2025: Joined Persistent Systems. Built production AI solutions.
2026: Lead Software Engineer. Focused on enterprise AI architecture, LLMOps, Agentic AI.""",
    "interview_faq.md": """Q: How were you working while pursuing a full-time degree?
A: While pursuing a full-time B.Tech in AI and DS, I intentionally chose to work in industry alongside my studies.
Reasons: 1. To gain real-world experience early. 2. To contribute financially and support my family. 3. To accelerate learning through practical exposure.
I treated education and industry as complementary paths.""",
    "experience/persistent_systems.md": """Role: Lead Software Engineer (GenAI/ML) at Persistent Systems (2025-Present)
Built 14 production AI systems. Worked on Enterprise AI, Agentic AI, LLMOps, Multi-Agent Systems, AI Platform Architecture.""",
    "experience/aiot_tech.md": """Role: Co-Founder at AIoT Tech (2024)
Focus: AI consulting, AI solutions, Computer Vision, Generative AI, Enterprise Automation.
Worked on client-focused AI projects across multiple industries.""",
    "experience/drdo_research.md": """Role: Research Intern at DRDO (2024)
Research Area: Audio Perception and Localization.
Objectives: Sound source localization, signal processing, defence-oriented AI systems.""",
    "projects/text_to_sql.md": """# Enterprise Text-to-SQL System
## Background
Business stakeholders often depend on data analysts and engineers for simple database queries. This dependency creates delays.
## Objective
Enable non-technical users to query enterprise databases using natural language.
## Architecture
User Query -> Intent Analysis -> Schema Retrieval -> Prompt Construction -> SQL Generation -> Validation -> Execution -> Response Formatting
## Challenges
Schema ambiguity. Join generation. Hallucinated columns. SQL injection protection. Large database structures.
## Solution
Introduced schema grounding and query validation before execution.
## Impact
Reduced dependency on technical teams and democratized access to business data.""",
    "projects/delivery_intelligence.md": """# Delivery Intelligence System
## Overview
A logistics intelligence platform combining GPS analytics, computer vision and operational intelligence.
## Objective
Improve delivery reliability, reduce fraud, optimize operations.
## Components
1. GPS Proximity Validation
2. Route Intelligence
3. Distance Tracking
4. Computer Vision Validation
## Technology
Python, FastAPI, OpenCV, YOLO, GPS Analytics, Pandas
## Impact
Improved accountability, reduced delivery disputes, enhanced operational visibility.""",
    "projects/langgraph_agent.md": """# LangGraph Agentic Platform
One of Bhavin’s most technically advanced systems.
Features: Tool orchestration, dynamic parameter extraction, context management, autonomous workflow execution.
Supported operations: Pause subscription, Resume subscription, Modify order, Remove order, Raise ticket, Create subscription.
Bhavin designed a LangGraph-based multi-tool orchestration architecture that performed dynamic parameter extraction, identified missing information, asked follow-up questions, and invoked backend APIs only after validation.""",
    "projects/crop_doctor.md": """# Crop Doctor
## Domain
Agricultural AI
## Objective
Provide AI-powered disease diagnosis from images.
Supported Research Areas: Sugarcane Disease Detection, Coconut Disease Detection.
Models: CNN, ResNet50, MobileNetV2. Performance: Achieved up to 94% F1 Score.
## Business Value
Early disease detection enables faster intervention and improved crop yield.""",
    "publications/coconut_dataset.md": """# Coconut Tree Disease Dataset
Research dataset supporting automated disease detection systems.""",
    "publications/pothole_dataset.md": """# Natural Pothole Dataset
Dataset created to support computer vision research for road safety and infrastructure monitoring."""
}

for filename, content in files.items():
    filepath = os.path.join(KB_DIR, filename)
    with open(filepath, "w") as f:
        f.write(content)

print(f"Created {len(files)} knowledge base files.")
