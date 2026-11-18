// Verified resume data for Prashant Priyadarshi
// Written in a direct, human engineer's voice.
// Facts, dates, titles, and institutions are strictly preserved from the resume.

export const resumeData = {
  // Single source of truth for all contact links & external handles
  links: {
    linkedin: "https://www.linkedin.com/in/prashant-priyadarshi-984b68222/",
    github: "https://github.com/Prashant-2818",
    email: "3dprashant057@gmail.com",
    emailMailto: "mailto:3dprashant057@gmail.com",
    phone: "+91 7547047879",
    phoneTel: "tel:+917547047879",
    location: "Gurugram, Haryana",
  },

  personal: {
    name: "Prashant Priyadarshi",
    title: "Generative AI Engineer",
    headline: "I build AI agents that don't make things up.",
    bio: "I'm Prashant, a GenAI engineer at Ethara AI. I work with LangGraph, RAG, and automated evaluations, and I care a lot more about reliable systems than flashy demos.",
    location: "Gurugram, Haryana, 122017",
    phone: "+91 7547047879",
    phoneTel: "tel:+917547047879",
    email: "3dprashant057@gmail.com",
    emailMailto: "mailto:3dprashant057@gmail.com",
    linkedin: "https://www.linkedin.com/in/prashant-priyadarshi-984b68222/",
    github: "https://github.com/Prashant-2818",
    availability: "Open to GenAI & Agentic AI roles (Gurugram or remote)",
  },

  // Creative touch: "Right now" card details
  // TODO: Feel free to edit what you are currently reading or tinkering with here!
  rightNow: {
    location: "Gurugram, India",
    timezone: "Asia/Kolkata",
    workingOn: "LangGraph multi-agent routing with human review checkpoints at Ethara AI",
    learning: "Cross-encoder reranking latency trade-offs on dense vector stores",
    statusText: "Active in the lab · open to chats"
  },

  education: [
    {
      institution: "KIET Group of Institutions",
      degree: "B.Tech in Information Technology",
      score: "CGPA: 8.0",
      duration: "Aug 2021 - Jul 2024",
      location: "Ghaziabad, Uttar Pradesh",
      highlights: "Studied computer science fundamentals, data structures, algorithms, and distributed systems."
    },
    {
      institution: "Indo Danish Tool Room",
      degree: "Diploma in Mechanical Engineering",
      score: "82%",
      duration: "Aug 2017 - Jul 2021",
      location: "Jamshedpur, Jharkhand",
      highlights: "Learned systems thinking, precision manufacturing, and disciplined technical problem-solving."
    }
  ],

  experience: [
    {
      company: "Ethara AI",
      role: "Generative AI Engineer",
      duration: "April 2026 - Present",
      location: "Gurugram, Haryana",
      type: "Full-Time",
      isCurrent: true,
      description: "Building production LLM applications, multi-step agent workflows, and automated evaluation suites.",
      responsibilities: [
        "Built conversational chatbots with LangChain, OpenAI, and Gemini APIs with structured JSON output formatting.",
        "Designed RAG pipelines with custom text chunking, FAISS vector search, semantic reranking, and verified source citations.",
        "Created multi-step agent workflows in LangGraph with conditional routing and human-in-the-loop review checkpoints.",
        "Ran automated evaluation suites measuring factual accuracy, hallucination rate, and retrieval relevance across prompt versions."
      ],
      technologies: ["Python", "LangChain", "LangGraph", "OpenAI API", "Gemini API", "RAG", "FAISS", "ChromaDB", "LLM Evaluation", "Structured JSON"]
    },
    {
      company: "Wipro",
      role: "Project Engineer",
      duration: "September 2025 - April 2026",
      location: "Pune, Maharashtra",
      type: "Full-Time",
      isCurrent: false,
      description: "Supported enterprise application reliability and explored GenAI workflows for technical support operations.",
      responsibilities: [
        "Troubleshot technical support tickets and resolved enterprise application incidents to maintain uptime.",
        "Monitored AWS cloud infrastructure using EC2, IAM access policies, and CloudWatch metrics.",
        "Applied prompt engineering to summarize support tickets and accelerate technical troubleshooting."
      ],
      technologies: ["AWS (EC2, IAM, CloudWatch)", "Python", "Prompt Engineering", "LLM APIs", "Incident Management", "Cloud Monitoring"]
    },
    {
      company: "Aminrup Technologies",
      role: "Full-Stack Developer",
      duration: "July 2024 - August 2025",
      location: "Jamshedpur, Jharkhand",
      type: "Full-Time",
      isCurrent: false,
      description: "Built enterprise ERP features and created my first natural-language assistant for internal users.",
      responsibilities: [
        "Developed ERP modules using ASP.NET, C#, and SQL Server for enterprise process automation.",
        "Built backend services, database queries, and REST APIs for internal application workflows.",
        "Created a natural-language ERP assistant using Python and LangChain to help staff retrieve business records."
      ],
      technologies: ["Python", "LangChain", "LLM APIs", "ASP.NET MVC", "C#", "SQL Server", "REST APIs", "ERP Systems"]
    }
  ],

  projects: [
    {
      id: "talent-intelligence",
      title: "Enterprise Talent Intelligence Assistant",
      tagline: "Parses candidate resumes, spots missing skills, and writes interview questions tailored to the gap.",
      year: "2026",
      technologies: ["Python", "LangGraph", "RAG", "AI Agents", "OpenAI API", "ChromaDB"],
      featured: true,
      category: "Agents & RAG",
      problem: "Screening resumes by hand is tedious, and simple keyword search misses whether a candidate actually knows the concepts or just stuffed buzzwords into their PDF.",
      solution: "I built an AI assistant that reads resumes, pulls out verified technical experience into structured data, spots skill gaps against the job spec, and uses LangGraph to write customized interview questions focusing on those gaps.",
      architecture: [
        { step: "1. Resume Ingestion", detail: "Converts candidate PDFs into clean structured sections using Pydantic schemas." },
        { step: "2. Vector Search", detail: "Matches candidate skills against open roles using ChromaDB embeddings." },
        { step: "3. LangGraph Agent", detail: "Routes through evaluation nodes to score experience and pinpoint skill gaps." },
        { step: "4. Question Generation", detail: "Writes pointed technical questions based on the candidate's actual projects and identified gaps." }
      ],
      keyFeatures: [
        "Structured resume parsing with zero hallucinated candidate history",
        "RAG matching against live job descriptions using vector embeddings",
        "LangGraph state machine with conditional routing and sanity checks",
        "Targeted interview questions based on extracted experience",
        "Clean JSON scoring for recruitment tracking systems"
      ],
      // TODO(prashant): add URL for public repository when available
      github: null,
      // TODO(prashant): add URL for live demo when available
      demo: null,
    },
    {
      id: "contract-intelligence",
      title: "AI Contract & Compliance Intelligence System",
      tagline: "Reads multi-page legal contracts, flags risky clauses, and cites the exact page for every warning.",
      year: "2026",
      technologies: ["Python", "LangChain", "RAG", "FAISS", "LLMs"],
      featured: true,
      category: "Search & Retrieval",
      problem: "Legal agreements run 40+ pages of dense language. Missing an uncapped liability clause or a short termination window can cost a company serious money.",
      solution: "I developed a contract analyzer that splits legal documents cleanly at clause boundaries, indexes them in FAISS, and runs compliance checks. Every flagged risk comes with the exact page and clause number so a human lawyer can verify it in seconds.",
      architecture: [
        { step: "1. Clause-Aware Chunking", detail: "Splits text at clause numbers instead of arbitrary character limits." },
        { step: "2. FAISS Indexing", detail: "Stores dense vector embeddings tagged with exact page and section numbers." },
        { step: "3. Reranked Retrieval", detail: "Pulls the top relevant clauses using semantic search and cross-encoder scoring." },
        { step: "4. Risk Audit Summary", detail: "Synthesizes flagged issues with mandatory page citations." }
      ],
      keyFeatures: [
        "Boundary-aware text chunking preserving legal clause hierarchy",
        "Automatic detection of risky liability and compliance terms",
        "Strict citations tying every finding directly to source page numbers",
        "Fast semantic search using FAISS vector indexing",
        "Executive summaries grouped by risk severity"
      ],
      // TODO(prashant): add URL for public repository when available
      github: null,
      // TODO(prashant): add URL for live demo when available
      demo: null,
    },
    {
      id: "erp-support-assistant",
      title: "AI-Powered ERP Support Assistant",
      tagline: "Lets non-technical warehouse and sales staff ask questions in plain English instead of digging through menus.",
      year: "2025",
      technologies: ["Python", "LangChain", "LLM APIs", "SQL Server", "ASP.NET MVC"],
      featured: true,
      category: "Conversational AI",
      problem: "Enterprise ERPs have hundreds of confusing screens. Employees would constantly file internal support tickets just to locate an inventory number or check order status.",
      solution: "I built a conversational assistant connected to our ERP documentation and APIs. Staff could ask natural questions like 'Where do I find Q3 shipping invoices?' and get step-by-step guidance or direct answers.",
      architecture: [
        { step: "1. Intent Routing", detail: "Determines whether the inquiry is a how-to question or a record lookup." },
        { step: "2. Schema Knowledge", detail: "Pulls relevant ERP documentation to answer navigation questions." },
        { step: "3. Safe Query Execution", detail: "Translates valid requests into read-only queries with permission checks." }
      ],
      keyFeatures: [
        "Plain-English query interface for ERP business data",
        "Step-by-step guidance reducing repetitive IT support tickets",
        "Read-only queries protecting core enterprise database tables",
        "Friendly fallbacks when a user asks for something outside their role"
      ],
      // TODO(prashant): add URL for public repository when available
      github: null,
      // TODO(prashant): add URL for live demo when available
      demo: null,
    }
  ],

  // Skills organized into human-friendly groups
  skills: {
    groups: [
      {
        id: "models",
        name: "Models & prompting",
        skills: ["Large Language Models (LLMs)", "Prompt Engineering", "OpenAI API", "Gemini API", "NLP"]
      },
      {
        id: "agents",
        name: "Agents",
        skills: ["LangGraph", "LangChain", "Tool Calling", "Multi-Agent Workflows", "Human-in-the-Loop"]
      },
      {
        id: "retrieval",
        name: "Search & retrieval",
        skills: ["RAG Pipelines", "FAISS", "ChromaDB", "Embeddings", "Semantic Search", "Context Reranking"]
      },
      {
        id: "code",
        name: "Code & data",
        skills: ["Python", "FastAPI", "SQL", "SQL Server", "C#", "ASP.NET MVC", "Pydantic", "REST APIs"]
      },
      {
        id: "cloud",
        name: "Cloud",
        skills: ["AWS (EC2, IAM, CloudWatch)", "AWS Certified Cloud Practitioner", "Docker", "Git & GitHub", "VS Code"]
      },
      {
        id: "evals",
        name: "Checking the output",
        skills: ["LLM Evaluation", "Hallucination Detection", "Model Comparison", "Structured JSON Outputs", "Source Citations"]
      }
    ]
  },

  certifications: [
    {
      name: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services (AWS)",
      badge: "AWS Certified",
      year: "Active",
      description: "Covers cloud infrastructure, security best practices, EC2 compute, IAM permissions, and CloudWatch monitoring."
    }
  ],

  achievements: [
    {
      title: "2nd place - National Shakespeare Play",
      organization: "National Inter-Collegiate Competition",
      detail: "Competed against 50+ college teams across India. Taught me stage presence, calm under pressure, and how to communicate clearly with a team."
    },
    {
      title: "Vice-Captain - College Cricket Team",
      organization: "Inter-University Sports",
      detail: "Led tactical fielding strategies and helped organize practices under high-pressure competitive games."
    }
  ],

  stats: [
    { label: "Engineering jobs", value: "3", suffix: "orgs", desc: "Ethara AI, Wipro, Aminrup" },
    { label: "B.Tech IT CGPA", value: "8.0", suffix: "/ 10", desc: "KIET Group of Institutions" },
    { label: "Diploma percentage", value: "82", suffix: "%", desc: "Indo Danish Tool Room" },
    { label: "National play rank", value: "2nd", suffix: "place", desc: "Among 50+ competing teams" },
    { label: "Cloud credential", value: "AWS", suffix: "certified", desc: "Cloud Practitioner" }
  ]
};
