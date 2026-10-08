import os
import json
import asyncio
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from sse_starlette.sse import EventSourceResponse
from groq import Groq
from dotenv import load_dotenv
# import chromadb

# Load environment variables
load_dotenv(dotenv_path=".env.local")

# Initialize FastAPI app
app = FastAPI()

# Add CORS middleware to allow requests from the Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allows both local dev and production Vercel URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# import ingest

# # Initialize ChromaDB client
# try:
#     chroma_client = chromadb.PersistentClient(path="./chroma_db")
#     collection = chroma_client.get_collection(name="portfolio_kb")
#     # Verify it has documents
#     if collection.count() == 0:
#         raise ValueError("Collection exists but is empty.")
# except Exception as e:
#     print(f"Warning: ChromaDB collection not found or empty. Running ingestion automatically... ({e})")
#     ingest.ingest_files()
#     chroma_client = chromadb.PersistentClient(path="./chroma_db")
#     collection = chroma_client.get_collection(name="portfolio_kb")

# Initialize Groq client
# The user specified their model and key in the previous prompt
groq_api_key = os.getenv("GROQ_API_KEY")
if not groq_api_key:
    raise ValueError("GROQ_API_KEY environment variable is not set. Please add it to .env.local")

groq_client = Groq(api_key=groq_api_key)

# Pydantic models for incoming requests
class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[Message]

@app.post("/chat")
async def chat_endpoint(request: ChatRequest):
    # Extract the user's latest query
    latest_message = next((m for m in reversed(request.messages) if m.role == "user"), None)
    query = latest_message.content if latest_message else ""
    
    # 1. Retrieve relevant context from ChromaDB
    # context_chunks = []
    # if collection and query:
    #     results = collection.query(
    #         query_texts=[query],
    #         n_results=5  # Top 5 most relevant chunks
    #     )
    #     if results["documents"] and len(results["documents"]) > 0:
    #         context_chunks = results["documents"][0]

    with open(r"knowledge_base/master_kb.md", "r") as f:
        knowledge_base = f.read()
            
    # context_string = "\n\n---\n\n".join(context_chunks) if context_chunks else "No specific knowledge base context found."
    context_string = knowledge_base

    # 2. Build the prompt
    system_prompt = f"""You are the official digital twin and AI assistant for Bhavin Baldota's portfolio website. 
Your goal is to answer questions about Bhavin's experience, projects, skills, and background.

INSTRUCTIONS:
1. Answer professionally and concisely, in the third person as Bhavin's assistant.
2. Only use the provided context. If a fact is missing, say so rather than inventing it.
3. Use readable Markdown, with tables only when comparing information.
4. Keep each metric attached to its role or project and reported baseline. Do not generalize project accuracy to all systems.
5. Dataset publications are contributions; papers in preparation are not accepted or published.
6. Roles overlap. Do not sum their durations or invent a total years-of-experience figure.
7. Certification providers are only those listed in the context. The certification profile is https://www.linkedin.com/in/bhavin-baldota-103553234/details/certifications/
8. If a question is unrelated, briefly redirect to Bhavin's work.

KNOWLEDGE BASE CONTEXT (Retrieved via RAG):
{context_string}
"""

    # Convert Pydantic messages to Groq format
    groq_messages = [{"role": "system", "content": system_prompt}]
    for msg in request.messages:
        groq_messages.append({"role": msg.role, "content": msg.content})

    # 3. Call Groq API and stream response
    # The user requested 'openai/gpt-oss-120b', which might be a custom proxy. 
    # If it fails, they can change the model string here. We will use their exact python snippet logic.
    def generate_stream():
        try:
            completion = groq_client.chat.completions.create(
                model="openai/gpt-oss-120b",
                messages=groq_messages,
                temperature=1,
                max_completion_tokens=8192,
                top_p=1,
                stream=True
            )
            
            for chunk in completion:
                content = chunk.choices[0].delta.content or ""
                if content:
                    # Next.js ai SDK expects Vercel AI SDK text stream format.
                    # Vercel text stream format sends each chunk prefixed with '0:'
                    # Example: `0:"Hello"`
                    yield f'0:{json.dumps(content)}\n'
        except Exception as e:
            yield f'3:{json.dumps({"error": str(e)})}\n'

    return EventSourceResponse(generate_stream(), headers={"x-vercel-ai-data-stream": "v1"})

@app.get("/")
async def root():
    return {"status": "alive", "message": "CoderFather AI Backend is running."}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
