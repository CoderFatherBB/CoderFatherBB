import os
import glob
import chromadb

# Initialize ChromaDB
client = chromadb.PersistentClient(path="./chroma_db")
collection = client.get_or_create_collection(name="portfolio_kb")

def chunk_text(text, chunk_size=1000, overlap=200):
    chunks = []
    start = 0
    while start < len(text):
        end = min(start + chunk_size, len(text))
        chunks.append(text[start:end])
        if end == len(text):
            break
        start += (chunk_size - overlap)
    return chunks

def ingest_files():
    print("Starting ingestion...")
    kb_dir = "knowledge_base"
    
    # Get all markdown files
    md_files = glob.glob(f"{kb_dir}/**/*.md", recursive=True)
    
    if not md_files:
        print(f"No markdown files found in {kb_dir}")
        return

    docs = []
    metadatas = []
    ids = []
    
    global_id = 0
    
    for filepath in md_files:
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
            
        filename = os.path.basename(filepath)
        category = os.path.dirname(filepath).replace(f"{kb_dir}/", "").replace(kb_dir, "general")
        
        # Split text into chunks
        chunks = chunk_text(content)
        
        for i, chunk in enumerate(chunks):
            docs.append(chunk)
            metadatas.append({"source": filename, "category": category})
            ids.append(f"doc_{global_id}")
            global_id += 1
            
    print(f"Found {len(md_files)} files, split into {len(docs)} chunks.")
    
    # Add to ChromaDB
    if docs:
        print("Embedding and storing in ChromaDB... This might take a moment.")
        # Clear existing collection if re-running
        try:
            client.delete_collection(name="portfolio_kb")
            collection = client.create_collection(name="portfolio_kb")
        except:
            pass
            
        collection.add(
            documents=docs,
            metadatas=metadatas,
            ids=ids
        )
        print(f"Successfully ingested {len(docs)} chunks into ChromaDB!")

if __name__ == "__main__":
    ingest_files()
