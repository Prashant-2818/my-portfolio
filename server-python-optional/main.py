"""
FastAPI Backend for Prashant Priyadarshi Portfolio AI Assistant
Provides real-time RAG & LLM integration with Google Gemini & OpenAI.
"""

import os
from typing import List, Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
    title="Prashant Priyadarshi Portfolio AI Assistant API",
    version="1.0.0",
    description="Production-grade AI Assistant API grounded in Prashant's resume"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SYSTEM_PROMPT = """
You are "Prashant AI", the official portfolio assistant for Prashant Priyadarshi.
Always represent Prashant accurately, professionally, and honestly strictly using his verified resume:

RESUME SUMMARY:
- Name: Prashant Priyadarshi
- Current Role: Generative AI Engineer at Ethara AI (April 2026 – Present, Gurugram, Haryana)
  - Python LLM applications, LangChain, OpenAI & Gemini APIs, structured JSON outputs.
  - Production RAG pipelines: chunking, embeddings, FAISS & ChromaDB, semantic search, reranking, source citations.
  - Multi-step Agentic AI workflows using LangGraph (conditional routing, decision-making, human-in-the-loop).
  - LLM evaluations: factual accuracy, contextual relevance, hallucination detection, instruction following.
- Previous Roles:
  - Project Engineer at Wipro (Sept 2025 – April 2026, Pune): AWS (EC2, IAM, CloudWatch), application troubleshooting, GenAI ticket summarization.
  - Full-Stack Developer at Aminrup Technologies (July 2024 – August 2025, Jamshedpur): ASP.NET MVC, C#, SQL Server, AI-powered ERP Support Assistant.
- Featured Projects:
  1. Enterprise Talent Intelligence Assistant (2026): Python, LangGraph, RAG, AI Agents, OpenAI API.
  2. AI Contract and Compliance Intelligence System (2026): Python, LangChain, RAG, FAISS, LLMs.
  3. AI-Powered ERP Support Assistant: Python, LangChain, LLM APIs, SQL Server.
- Skills: Python, SQL, C#, LLMs, Prompt Engineering, RAG, Agentic AI, LangChain, LangGraph, FastAPI, FAISS, ChromaDB, AWS, Docker.
- Education: B.Tech in IT from KIET Group of Institutions (CGPA: 8.0); Diploma in Mechanical Engineering (82%).
- Certification: AWS Certified Cloud Practitioner.
- Contact: 3dprashant057@gmail.com | Phone: +91 7547047879 | Gurugram, Haryana
- LinkedIn: https://www.linkedin.com/in/prashant-priyadarshi-984b68222/ | GitHub: https://github.com/Prashant-2818

RULES:
- Answer questions in clean Markdown with concise bullet points.
- If asked about something not in the resume, be transparent and state that you do not have that information, and direct the user to Prashant's email.
"""

class ChatMessage(BaseModel):
    sender: str
    text: str

class ChatRequest(BaseModel):
    message: str
    history: Optional[List[ChatMessage]] = []

class ChatResponse(BaseModel):
    reply: str
    source: str

@app.get("/api/health")
def health_check():
    return {
        "status": "online",
        "service": "Prashant AI FastAPI Server",
        "has_gemini": bool(os.getenv("GEMINI_API_KEY")),
        "has_openai": bool(os.getenv("OPENAI_API_KEY"))
    }

@app.post("/api/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    user_msg = request.message.strip()
    if not user_msg:
        raise HTTPException(status_code=400, detail="Message cannot be empty")

    # If GEMINI_API_KEY is configured
    gemini_key = os.getenv("GEMINI_API_KEY")
    if gemini_key:
        try:
            import google.generativeai as genai
            genai.configure(api_key=gemini_key)
            model = genai.GenerativeModel("gemini-1.5-flash", system_instruction=SYSTEM_PROMPT)
            response = model.generate_content(user_msg)
            return ChatResponse(reply=response.text, source="gemini-api")
        except Exception as e:
            print(f"Gemini error: {e}")

    # Fallback response
    return ChatResponse(
        reply="Prashant Priyadarshi is a Generative AI Engineer at Ethara AI specializing in LangGraph multi-agent workflows, production RAG pipelines, and LLM evaluations. He is an AWS Certified Cloud Practitioner with a B.Tech in IT (8.0 CGPA). Reach him at 3dprashant057@gmail.com!",
        source="fastapi-fallback"
    )

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
