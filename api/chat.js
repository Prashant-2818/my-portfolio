// api/chat.js
// Vercel Serverless Function (Node.js runtime, ESM)
// Grounded AI assistant for Prashant Priyadarshi's portfolio

// In-memory rate limiting map: ip -> { count, resetTime }
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 20;

const SYSTEM_PROMPT = `
You are "Prashant AI", the official portfolio assistant for Prashant Priyadarshi.
Always represent Prashant accurately, professionally, and honestly strictly using his verified resume:

RESUME SUMMARY:
- Name: Prashant Priyadarshi
- Location: Gurugram, Haryana, 122017
- Email: 3dprashant057@gmail.com | Phone: +91 7547047879
- LinkedIn: https://www.linkedin.com/in/prashant-priyadarshi-984b68222/
- GitHub: https://github.com/Prashant-2818
- Current Role: Generative AI Engineer at Ethara AI (April 2026 – Present, Gurugram, Haryana).
  * Python-based LLM apps and conversational chatbots with LangChain, OpenAI & Gemini APIs.
  * Structured JSON outputs, automated content workflows.
  * Production RAG pipelines: document ingestion, text chunking, embedding generation, vector retrieval (FAISS/ChromaDB), reranking, and source citations.
  * Multi-step Agentic AI workflows with LangGraph (conditional routing, retrieval, human-in-the-loop).
  * Automated & manual LLM evaluations: factual accuracy, contextual relevance, hallucination detection, instruction following.
- Previous Role 1: Project Engineer at Wipro (Sept 2025 – April 2026, Pune).
  * Application troubleshooting, technical support ticket resolution, AWS infrastructure (EC2, IAM, CloudWatch).
  * Explored GenAI for ticket analysis, automated summarization, faster troubleshooting.
- Previous Role 2: Full-Stack Developer at Aminrup Technologies (July 2024 – August 2025, Jamshedpur).
  * Enterprise ERP modules with ASP.NET (Web Forms/MVC), C#, SQL Server.
  * Backend services, database operations, API-driven workflows.
  * Designed & developed AI-powered ERP Support Assistant using Python, LLM APIs, and LangChain for natural language ERP query resolution.
- Key Projects:
  1. Enterprise Talent Intelligence Assistant (2026) [Python, LangGraph, RAG, AI Agents, OpenAI API]
  2. AI Contract & Compliance Intelligence System (2026) [Python, LangChain, RAG, Vector DBs, FAISS, LLMs]
  3. AI-Powered ERP Support Assistant [Python, LangChain, LLM APIs, ASP.NET, SQL Server]
- Technical Skills:
  * Languages: Python, SQL, C#
  * GenAI & LLMs: LLMs, Prompt Engineering, RAG, AI Agents, Agentic AI, NLP, OpenAI API, Gemini API
  * Frameworks: LangChain, LangGraph, FastAPI, ASP.NET MVC
  * Vector DBs & Search: FAISS, ChromaDB, Embeddings, Semantic Search
  * Cloud & Infrastructure: AWS (EC2, IAM, CloudWatch) - AWS Certified Cloud Practitioner
  * Developer Tools: Git, GitHub, Docker, VS Code
  * Core Engineering: Tool Calling, Multi-Agent Workflows, LLM Evaluation, Hallucination Detection, Model Comparison, Structured JSON Outputs
- Education:
  * B.Tech in Information Technology: KIET Group of Institutions (Aug 2021 – Jul 2024, CGPA: 8.0)
  * Diploma in Mechanical Engineering: Indo Danish Tool Room (Aug 2017 – Jul 2021, 82%)
- Certification: AWS Certified Cloud Practitioner
- Achievements:
  * 2nd Place in National Shakespeare Play among 50+ competing teams
  * Vice-Captain, College Cricket Team

RULES:
1. Speak in a concise, direct, human tone. Never use marketing buzzwords like "cutting-edge" or "delve".
2. If asked about something NOT in this resume, politely state that you do not have that information and provide his contact details (3dprashant057@gmail.com). Never invent qualifications or projects.
`;

export default async function handler(req, res) {
  // CORS & Security headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  // Rate Limiting by IP
  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || '127.0.0.1';
  const now = Date.now();
  const clientData = rateLimitMap.get(ip) || { count: 0, resetTime: now + RATE_LIMIT_WINDOW_MS };

  if (now > clientData.resetTime) {
    clientData.count = 0;
    clientData.resetTime = now + RATE_LIMIT_WINDOW_MS;
  }

  clientData.count += 1;
  rateLimitMap.set(ip, clientData);

  // Periodic cleanup of stale rate-limit keys (prevent memory leak)
  if (rateLimitMap.size > 1000) {
    for (const [key, value] of rateLimitMap.entries()) {
      if (now > value.resetTime) rateLimitMap.delete(key);
    }
  }

  if (clientData.count > MAX_REQUESTS_PER_WINDOW) {
    return res.status(429).json({
      error: 'Rate limit exceeded. Please wait a minute before sending another query.'
    });
  }

  // Validate Body
  const { message, history = [] } = req.body || {};

  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ error: 'A valid non-empty message string is required.' });
  }

  const cleanMessage = message.trim();
  if (cleanMessage.length > 500) {
    return res.status(400).json({ error: 'Message exceeds the maximum limit of 500 characters.' });
  }

  const safeHistory = Array.isArray(history) ? history.slice(-10) : [];

  const geminiKey = process.env.GEMINI_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;

  // 1. Google Gemini API Call (Primary if key provided)
  if (geminiKey) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [{ text: `${SYSTEM_PROMPT}\n\nUser Question: ${cleanMessage}` }]
              }
            ]
          })
        }
      );

      if (response.ok) {
        const data = await response.json();
        const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (reply) {
          return res.status(200).json({ reply, source: 'gemini-api' });
        }
      }
    } catch (err) {
      console.warn('Gemini API call failed, falling back:', err?.message);
    }
  }

  // 2. OpenAI API Call (Secondary if key provided)
  if (openaiKey) {
    try {
      const messages = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...safeHistory.map((h) => ({
          role: h.sender === 'user' ? 'user' : 'assistant',
          content: String(h.text || '').slice(0, 300)
        })),
        { role: 'user', content: cleanMessage }
      ];

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openaiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages,
          temperature: 0.3
        })
      });

      if (response.ok) {
        const data = await response.json();
        const reply = data?.choices?.[0]?.message?.content;
        if (reply) {
          return res.status(200).json({ reply, source: 'openai-api' });
        }
      }
    } catch (err) {
      console.warn('OpenAI API call failed, falling back:', err?.message);
    }
  }

  // 3. Fallback response when no API key is set or services are offline
  return res.status(200).json({
    reply: `👋 **Prashant AI Assistant Active**\n\nPrashant Priyadarshi is a **Generative AI Engineer** at **Ethara AI**, building **LangGraph multi-agent systems**, production **RAG pipelines**, and **LLM evaluations**.\n\nHe holds a **B.Tech in IT (8.0 CGPA)** from KIET Group of Institutions, is an **AWS Certified Cloud Practitioner**, and previously worked at **Wipro** (Project Engineer) and **Aminrup Technologies** (Full-Stack Developer).\n\nFeel free to explore his projects above or reach him directly at **3dprashant057@gmail.com**! *(Note: Live Gemini/OpenAI API is unconfigured; running in grounded portfolio mode).*`,
    source: 'fallback-rag'
  });
}
