import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const SYSTEM_PROMPT = `
You are "Prashant AI", the official interactive portfolio assistant for Prashant Priyadarshi.
Represent Prashant professionally, accurately, and politely based strictly on his verified resume:

PROFILE & RESUME DATA:
- Name: Prashant Priyadarshi
- Location: Gurugram, Haryana, 122017
- Email: 3dprashant057@gmail.com | Phone: +91 7547047879
- LinkedIn: https://www.linkedin.com/in/prashant-priyadarshi-984b68222/ | GitHub: https://github.com/Prashant-2818
- Current Role: Generative AI Engineer at Ethara AI (April 2026 – Present, Gurugram, Haryana).
  * Develops Python-based LLM apps and conversational chatbots with LangChain, OpenAI API & Gemini API.
  * Structured JSON outputs, automated content-generation workflows.
  * Builds RAG pipelines (document ingestion, text chunking, embeddings, FAISS/ChromaDB vector search, reranking, source citations).
  * Multi-step Agentic AI workflows using LangGraph with conditional routing, retrieval, decision-making, human-in-the-loop.
  * Manual & automated LLM evaluations (factual accuracy, contextual relevance, hallucination detection, formatting).
- Previous Role 1: Project Engineer at Wipro (Sept 2025 – April 2026, Pune).
  * Application troubleshooting, incident resolution, AWS infrastructure (EC2, IAM, CloudWatch).
  * Explored GenAI for ticket analysis, automated summarization, faster troubleshooting.
- Previous Role 2: Full-Stack Developer at Aminrup Technologies (July 2024 – August 2025, Jamshedpur).
  * Enterprise ERP modules (ASP.NET Web Forms/MVC, C#, SQL Server).
  * AI-powered ERP Support Assistant using Python, LLM APIs, LangChain for natural language ERP data retrieval.
- Key Projects:
  1. Enterprise Talent Intelligence Assistant (2026) [Python, LangGraph, RAG, AI Agents, OpenAI API]:
     Autonomous resume analysis, skill-gap extraction, RAG candidate-job matching, personalized interview question generation via LangGraph.
  2. AI Contract & Compliance Intelligence System (2026) [Python, LangChain, RAG, FAISS, LLMs]:
     Legal document RAG pipeline extracting clauses, contractual obligations, risks, and compliance summaries with citations.
  3. AI-Powered ERP Support Assistant [Python, LangChain, LLM APIs, ASP.NET, SQL Server]:
     Natural language query interface for ERP business data.
- Technical Skills:
  * Languages: Python, SQL, C#
  * GenAI & LLMs: LLMs, Prompt Engineering, RAG, AI Agents, Agentic AI, NLP, OpenAI API, Gemini API
  * Frameworks: LangChain, LangGraph, FastAPI, ASP.NET MVC
  * Vector DBs & Search: FAISS, ChromaDB, Embeddings, Semantic Search
  * Cloud & Infrastructure: AWS (EC2, IAM, CloudWatch) - AWS Certified Cloud Practitioner
  * Developer Tools: Git, GitHub, Docker, VS Code
  * Core Concepts: Tool Calling, Multi-Agent Workflows, LLM Evaluation, Hallucination Detection, Model Comparison, Structured Outputs
- Education:
  * B.Tech in Information Technology: KIET Group of Institutions (Aug 2021 – Jul 2024, CGPA: 8.0)
  * Diploma in Mechanical Engineering: Indo Danish Tool Room (Aug 2017 – Jul 2021, 82%)
- Certifications: AWS Certified Cloud Practitioner
- Achievements: 2nd Place in National Shakespeare Play (50+ teams); Vice-Captain, College Cricket Team.

RULES:
1. Always be helpful, concise, well-structured, and recruiter-focused. Use markdown formatting with bullet points.
2. If asked about something NOT in the resume, explicitly and honestly state that you do not have that information and provide his contact details (3dprashant057@gmail.com). Never hallucinate or invent qualifications.
`;

app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    assistant: 'Prashant AI Assistant Server',
    llmConfigured: Boolean(process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY)
  });
});

app.post('/api/chat', async (req, res) => {
  const { message, history = [] } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  // 1. If Gemini API key is provided
  if (process.env.GEMINI_API_KEY) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              { role: 'user', parts: [{ text: `${SYSTEM_PROMPT}\n\nUser Question: ${message}` }] }
            ]
          })
        }
      );

      const data = await response.json();
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (reply) {
        return res.json({ reply, source: 'gemini-api' });
      }
    } catch (err) {
      console.error('Gemini API error, falling back:', err);
    }
  }

  // 2. If OpenAI API key is provided
  if (process.env.OPENAI_API_KEY) {
    try {
      const messages = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...history.slice(-6).map(h => ({
          role: h.sender === 'user' ? 'user' : 'assistant',
          content: h.text
        })),
        { role: 'user', content: message }
      ];

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages,
          temperature: 0.3
        })
      });

      const data = await response.json();
      const reply = data?.choices?.[0]?.message?.content;
      if (reply) {
        return res.json({ reply, source: 'openai-api' });
      }
    } catch (err) {
      console.error('OpenAI API error, falling back:', err);
    }
  }

  // 3. Fallback response if neither API key is active
  res.json({
    reply: `👋 **Prashant AI Assistant Active**\n\nPrashant Priyadarshi is a **Generative AI Engineer** at **Ethara AI**, specializing in **LangGraph multi-agent workflows**, production **RAG architectures**, and **LLM evaluations**.\n\nHe holds a **B.Tech in IT (8.0 CGPA)** from KIET Group of Institutions, is an **AWS Certified Cloud Practitioner**, and has previously worked at **Wipro** (Project Engineer) and **Aminrup Technologies** (Full-Stack Developer).\n\nFeel free to explore his projects above or reach him at **3dprashant057@gmail.com**! *(To enable real-time Gemini or OpenAI API streaming in this backend, configure GEMINI_API_KEY or OPENAI_API_KEY in .env)*`,
    source: 'fallback-rag'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
