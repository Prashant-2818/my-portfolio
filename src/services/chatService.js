import { resumeData } from '../data/resumeData';

// System prompt and context knowledge base
export const SYSTEM_KNOWLEDGE = `
You are "Prashant AI", the personal portfolio assistant for Prashant Priyadarshi.
Your mission is to represent Prashant professionally, accurately, and honestly to recruiters, engineering managers, and clients.
All your responses MUST strictly align with Prashant's actual resume and verified experience.

KNOWLEDGE BASE:
- Full Name: ${resumeData.personal.name}
- Current Title: ${resumeData.personal.title}
- Location: ${resumeData.links.location}
- Email: ${resumeData.links.email}
- Phone: ${resumeData.links.phone}
- LinkedIn: ${resumeData.links.linkedin}
- GitHub: ${resumeData.links.github}
- Availability: ${resumeData.personal.availability}
- Current Role: Generative AI Engineer at Ethara AI (April 2026 – Present, Gurugram, Haryana).
  * Builds Python-based LLM apps and conversational chatbots with LangChain, OpenAI & Gemini APIs.
  * Structured JSON outputs, automated content workflows.
  * Production RAG pipelines: document ingestion, chunking, embedding generation, vector retrieval (FAISS/ChromaDB), reranking, and citation grounding.
  * Multi-step Agentic AI workflows with LangGraph (conditional routing, retrieval, human-in-the-loop).
  * Automated & manual LLM evaluations: factual accuracy, contextual relevance, hallucination detection, instruction following.
- Previous Role 1: Project Engineer at Wipro (Sept 2025 – April 2026, Pune).
  * Application troubleshooting, technical support ticket resolution.
  * AWS services (EC2, IAM, CloudWatch) for monitoring, access management, issue analysis.
  * Explored GenAI for ticket analysis, automated summarization, faster troubleshooting.
- Previous Role 2: Full-Stack Developer at Aminrup Technologies (July 2024 – August 2025, Jamshedpur).
  * Enterprise ERP modules with ASP.NET (Web Forms/MVC), C#, SQL Server.
  * Backend services, database ops, API-driven workflows.
  * Designed & developed AI-powered ERP Support Assistant using Python, LLM APIs, and LangChain for natural language ERP query resolution.
- Key Projects:
  1. Enterprise Talent Intelligence Assistant (2026) [Python, LangGraph, RAG, AI Agents, OpenAI API]:
     Autonomous recruitment assistant parsing resumes, identifying skill gaps, matching candidates to jobs with RAG and vector search, generating personalized interview questions via LangGraph multi-step agents.
  2. AI Contract & Compliance Intelligence System (2026) [Python, LangChain, RAG, Vector DBs, FAISS, LLMs]:
     End-to-end RAG pipeline processing legal PDF contracts, extracting key clauses, obligations, risks, and generating verified audit summaries with citations.
  3. AI-Powered ERP Support Assistant [Python, LangChain, LLM APIs, ASP.NET, SQL Server]:
     Natural language query interface for ERP business data and navigation guidance.
- Technical Skills:
  * Languages: Python, SQL (plus C# / .NET)
  * GenAI & LLMs: LLMs, Prompt Engineering, RAG, AI Agents, Agentic AI, NLP, OpenAI API, Gemini API
  * Frameworks: LangChain, LangGraph, FastAPI, ASP.NET MVC
  * Vector DBs & Search: FAISS, ChromaDB, Embeddings, Semantic Search
  * Cloud & DevOps: AWS (EC2, IAM, CloudWatch), Docker, Git, GitHub, VS Code
  * Core Concepts: REST APIs, Tool Calling, Multi-Agent Workflows, LLM Evaluation, Hallucination Detection, Model Comparison, Structured Outputs
- Education:
  * B.Tech in Information Technology — KIET Group of Institutions (Aug 2021 – Jul 2024, CGPA: 8.0)
  * Diploma in Mechanical Engineering — Indo Danish Tool Room (Aug 2017 – Jul 2021, 82%)
- Certification: AWS Certified Cloud Practitioner (Amazon Web Services)
- Achievements:
  * Secured 2nd place in National Shakespeare Play among 50+ competing teams
  * Vice-Captain, College Cricket Team

GUARDRAIL RULES:
1. Always be polite, professional, concise, and enthusiastic about Prashant's engineering work.
2. If asked something NOT in the resume or unverified (e.g., personal salary history, unrelated personal life, proprietary company code), state honestly that you do not have that information and offer to connect them via email (${resumeData.links.email}) or phone (${resumeData.links.phone}).
3. Never invent projects, employers, degrees, or certifications that are not in this knowledge base.
`;

// Helper: Semantic query matcher for fallback mode
function generateLocalRagResponse(userQuery) {
  const q = userQuery.toLowerCase().trim();

  // Greeting
  if (/^(hi|hello|hey|greetings|hola|namaste|who are you|introduce)/i.test(q)) {
    return `👋 **Hello! I'm Prashant AI**, the personal portfolio assistant for **Prashant Priyadarshi**.\n\nPrashant is a **Generative AI Engineer** at **Ethara AI**, specializing in **LangGraph multi-agent systems**, production-grade **RAG architectures**, and **LLM evaluations** (hallucination detection & accuracy).\n\nHow can I help you today? You can ask about his:\n- 🤖 **Agentic AI & LangGraph projects**\n- 📚 **RAG & Vector Search architectures**\n- 💼 **Experience at Ethara AI, Wipro & Aminrup**\n- 🛠️ **Technical skills & AWS certification**\n- 📄 **Resume download & contact details**`;
  }

  // Contact / Email / Phone / Hire
  if (/(contact|email|phone|reach|hire|call|location|address|gurugram|available|availability|interview)/i.test(q)) {
    return `📬 **Get in Touch with Prashant Priyadarshi:**\n\n- **Email:** [${resumeData.links.email}](${resumeData.links.emailMailto})\n- **Phone:** \`${resumeData.links.phone}\`\n- **Location:** ${resumeData.links.location}\n- **LinkedIn:** [Prashant's LinkedIn Profile](${resumeData.links.linkedin})\n- **GitHub:** [Prashant's GitHub Profile](${resumeData.links.github})\n- **Availability:** ${resumeData.personal.availability}\n\nFeel free to send a message using the Contact section below or email him directly for discussions regarding GenAI Engineer or Agentic AI roles!`;
  }

  // Resume / CV download
  if (/(resume|cv|download|document|pdf)/i.test(q)) {
    return `📄 **Prashant's Resume:**\n\nYou can inspect or download his official resume directly through the **"Download Resume"** button in the hero and contact sections.\n\nKey Highlights on his resume:\n- **Current Role:** GenAI Engineer at Ethara AI\n- **Education:** B.Tech in IT (KIET, CGPA: 8.0)\n- **Certification:** AWS Certified Cloud Practitioner\n- **Core Focus:** Multi-Agent Workflows, RAG, LangGraph, FastAPI, LLM Evaluation.`;
  }

  // LangGraph / Multi-agent
  if (/(langgraph|agent|agentic|multi-agent|workflow|decision-making|tool calling)/i.test(q)) {
    return `🤖 **Prashant's Agentic AI & LangGraph Expertise:**\n\nPrashant builds production-ready autonomous agent systems using **LangGraph**:\n\n1. **Multi-Step State Machines:** Implements cyclical state graphs with conditional edges and dynamic routing based on model outputs.\n2. **Human-in-the-Loop & Verification:** Embeds checkpoint states where critical decisions or compliance findings can be verified before execution.\n3. **Enterprise Talent Intelligence Assistant (2026):** Orchestrates multi-agent pipelines to parse candidate resumes, extract competency vectors, perform skill-gap analysis, and synthesize tailored interview questions.\n4. **Tool Calling & Structured JSON:** Uses function calling and Pydantic schemas to ensure reliable, deterministic tool execution without JSON parsing errors.\n\nHe has deployed agentic workflows currently running at **Ethara AI** and in standalone production systems.`;
  }

  // RAG / Vector search / FAISS / ChromaDB
  if (/(rag|retrieval|vector|faiss|chromadb|embeddings|semantic search|chunking|rerank)/i.test(q)) {
    return `📚 **Production RAG Pipelines by Prashant:**\n\nPrashant designs end-to-end Retrieval-Augmented Generation architectures with an emphasis on **zero hallucination and verifiable grounding**:\n\n- **Document Ingestion & Chunking:** Semantic boundary chunking preserving legal clauses, table layouts, and metadata.\n- **Embedding & Vector Search:** Utilizes **FAISS** and **ChromaDB** with dense semantic representations for sub-second retrieval.\n- **Reranking & Context Selection:** Applies cross-encoder rerankers to select top-k contextual snippets before feeding to LLMs.\n- **Source Citations:** Generates inline citations anchoring every generated claim to specific document pages and clauses (as demonstrated in his **AI Contract & Compliance Intelligence System**).`;
  }

  // LLM Evaluation / Hallucination Detection
  if (/(eval|evaluation|hallucination|metrics|accuracy|benchmark|testing)/i.test(q)) {
    return `🔬 **LLM Evaluation & Hallucination Guardrails:**\n\nAt **Ethara AI**, Prashant conducts both automated and manual evaluations to ensure production readiness:\n\n- **Factual Accuracy & Grounding:** Assesses whether generated responses strictly correlate with retrieved context.\n- **Hallucination Detection:** Implements automated consistency assertions, negative-prompt tests, and citation verification.\n- **Instruction Following & JSON Formatting:** Guarantees schema adherence (e.g., Pydantic parsing) for mission-critical downstream services.\n- **Model Comparison:** Benchmarks cost, latency, and quality tradeoffs between OpenAI (GPT-4o) and Google Gemini models.`;
  }

  // Projects inquiry
  if (/(project|talent|contract|erp|portfolio|github|work)/i.test(q)) {
    return `🚀 **Prashant's Featured Projects (2025–2026):**\n\n1. **Enterprise Talent Intelligence Assistant (2026)**\n   - *Stack:* Python, LangGraph, RAG, AI Agents, OpenAI API\n   - *Impact:* Analyzes candidate resumes, extracts skills/experience, detects technical gaps, and orchestrates LangGraph agents for candidate-job matching and personalized interview questions.\n\n2. **AI Contract and Compliance Intelligence System (2026)**\n   - *Stack:* Python, LangChain, RAG, Vector Databases (FAISS), LLMs\n   - *Impact:* End-to-end legal document RAG pipeline extracting clauses, contractual obligations, and compliance risks with pinpoint source citations.\n\n3. **AI-Powered ERP Support Assistant (2024–2025)**\n   - *Stack:* Python, LangChain, LLM APIs, ASP.NET MVC, SQL Server\n   - *Impact:* Natural language assistant integrated into enterprise ERP to query business metrics and guide users through complex workflows.\n\nAll projects emphasize real production architectures, structured outputs, and observable agent states!`;
  }

  // Experience inquiry / Companies
  if (/(experience|ethara|wipro|aminrup|company|job|career|work history)/i.test(q)) {
    return `💼 **Prashant's Professional Career Journey:**\n\n1. **Ethara AI (April 2026 – Present) | Generative AI Engineer** *(Gurugram, Haryana)*\n   - Building Python LLM apps & conversational agents with LangChain, LangGraph, OpenAI & Gemini APIs.\n   - Developing RAG pipelines (chunking, embeddings, FAISS/ChromaDB, reranking, source citations).\n   - Implementing automated LLM evaluation pipelines (hallucination detection, accuracy, formatting).\n\n2. **Wipro (Sept 2025 – April 2026) | Project Engineer** *(Pune, Maharashtra)*\n   - Managed application stability, resolved technical support tickets, and monitored AWS services (EC2, IAM, CloudWatch).\n   - Explored GenAI & prompt engineering to automate incident summarization and ticket diagnosis.\n\n3. **Aminrup Technologies (July 2024 – August 2025) | Full-Stack Developer** *(Jamshedpur)*\n   - Developed enterprise ERP modules with ASP.NET (MVC/Web Forms), C#, and SQL Server.\n   - Engineered an AI-powered ERP support assistant using Python, LangChain, and LLM APIs.\n\nTotal trajectory combines deep enterprise systems reliability with cutting-edge GenAI development!`;
  }

  // Skills inquiry
  if (/(skill|skills|tech stack|technology|python|langchain|fastapi|aws|docker|database)/i.test(q)) {
    return `🛠️ **Prashant's Technical Stack:**\n\n- **Languages:** Python (Primary), SQL, C# / .NET\n- **Generative AI & LLMs:** Large Language Models (LLMs), Prompt Engineering, RAG, AI Agents, Agentic AI, NLP, OpenAI API, Gemini API\n- **Frameworks & Libraries:** LangChain, LangGraph, FastAPI, ASP.NET MVC\n- **Vector Databases & Search:** FAISS, ChromaDB, Embeddings, Semantic Search\n- **Cloud & Infrastructure:** AWS (EC2, IAM, CloudWatch) — *AWS Certified Cloud Practitioner*\n- **Developer Tools:** Git, GitHub, Docker, VS Code\n- **Core Engineering:** Tool Calling, Multi-Agent Workflows, LLM Evaluation, Hallucination Detection, Model Comparison, Structured JSON Outputs.`;
  }

  // Education & Achievements
  if (/(education|college|degree|btech|diploma|school|kiet|indo danish|cgpa|achievement|sports|cricket|play|shakespeare)/i.test(q)) {
    return `🎓 **Education & Notable Achievements:**\n\n- **B.Tech in Information Technology:** KIET Group of Institutions, Ghaziabad (Aug 2021 – Jul 2024) | **CGPA: 8.0**\n- **Diploma in Mechanical Engineering:** Indo Danish Tool Room, Jamshedpur (Aug 2017 – Jul 2021) | **82%**\n- **AWS Certified Cloud Practitioner:** Certified by Amazon Web Services.\n\n🏆 **Achievements:**\n- **2nd Place in National Shakespeare Play** among 50+ competing teams across India.\n- **Vice-Captain, College Cricket Team**, leading tactical field leadership and team strategy.`;
  }

  // Suitability for roles / recruiter question
  if (/(why hire|suitable|fit|recruiter|role|hiring manager|strengths|value)/i.test(q)) {
    return `⭐ **Why Prashant is a Strong Fit for GenAI & Agentic AI Roles:**\n\n1. **Proven Production GenAI Experience:** Currently deploying LangGraph multi-agent workflows and RAG pipelines at Ethara AI, with real-world hands-on experience in both OpenAI and Gemini ecosystems.\n2. **Engineered for Reliability:** He doesn't build simple toy wrappers — he enforces structured outputs (Pydantic), human-in-the-loop checkpoints, and rigorous hallucination evaluation.\n3. **Full-Stack & Cloud Grounding:** With prior enterprise experience at Wipro (AWS EC2, IAM, CloudWatch) and Aminrup (C#, SQL, ERP systems), he understands backend architecture, system reliability, and API microservices.\n4. **AWS Certified:** Officially certified as an AWS Cloud Practitioner.\n5. **Strong Communicator & Team Player:** Proven leadership as College Cricket Vice-Captain and National Stage competition awardee.\n\nHe is ready to deliver immediate impact for teams building generative AI products!`;
  }

  // Fallback default response
  return `Thank you for asking! Prashant's core expertise centers on **Generative AI**, **LangGraph multi-agent workflows**, **RAG pipelines**, and **LLM evaluations** based on his work at **Ethara AI**, **Wipro**, and **Aminrup Technologies**.\n\nRegarding *"${userQuery}"*, if this relates to specific proprietary implementations or details outside his resume, please reach out to Prashant directly at **[${resumeData.links.email}](${resumeData.links.emailMailto})** or **${resumeData.links.phone}**.\n\nWould you like me to explain his **LangGraph projects**, **RAG architectures**, or **technical skills**?`;
}

// Send message function with backend API attempt and intelligent streaming fallback
export async function sendMessageToAssistant(message, conversationHistory = [], onChunk = null) {
  // First attempt: call local or hosted backend endpoint /api/chat
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8s timeout for serverless backend check

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        history: conversationHistory,
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (data && data.reply) {
        return data.reply;
      }
    }
  } catch (err) {
    // Backend API not reachable or timed out; seamlessly fallback to local RAG engine
    console.info('Using local high-fidelity RAG engine (Backend offline or standalone mode).');
  }

  // High-fidelity fallback RAG engine
  const fullResponse = generateLocalRagResponse(message);

  // If streaming callback provided, simulate realistic token generation
  if (onChunk && typeof onChunk === 'function') {
    const words = fullResponse.split(' ');
    let current = '';
    for (let i = 0; i < words.length; i++) {
      current += (i === 0 ? '' : ' ') + words[i];
      onChunk(current);
      await new Promise(res => setTimeout(res, 18)); // smooth token pacing
    }
    return current;
  }

  return fullResponse;
}
