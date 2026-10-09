import os
import json
import asyncio
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from pathlib import Path
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
    portfolio_context: Optional[str] = None

@app.post("/chat")
async def chat_endpoint(request: ChatRequest):
    knowledge_dir = Path(__file__).resolve().parent / "knowledge_base"
    rules = json.loads((knowledge_dir / "assistant_rules.json").read_text(encoding="utf-8"))
    verified_facts = (knowledge_dir / "master_kb.md").read_text(encoding="utf-8")
    system_prompt = request.portfolio_context or "\n\n".join(rules) + "\n\nVERIFIED PROFILE FACTS:\n" + verified_facts
    groq_messages = [{"role": "system", "content": system_prompt}]
    for msg in request.messages:
        # The proxy supplies the authoritative context separately. Prior assistant
        # replies remain history and must never replace the verified role records.
        if msg.role in ("user", "assistant") and msg.content.strip():
            groq_messages.append({"role": msg.role, "content": msg.content})

    # 3. Call Groq API and stream response
    # The user requested 'openai/gpt-oss-120b', which might be a custom proxy. 
    # If it fails, they can change the model string here. We will use their exact python snippet logic.
    def generate_stream():
        try:
            completion = groq_client.chat.completions.create(
                model="openai/gpt-oss-120b",
                messages=groq_messages,
                temperature=0.2,
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
