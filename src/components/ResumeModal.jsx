import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Printer, 
  Copy, 
  Check, 
  FileText 
} from 'lucide-react';
import { resumeData } from '../data/resumeData';

export default function ResumeModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    modalRef.current?.focus();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const copyPlaintext = () => {
    const text = `
PRASHANT PRIYADARSHI
Gurugram, Haryana, 122017 | Phone: ${resumeData.links.phone} | Email: ${resumeData.links.email}
LinkedIn: ${resumeData.links.linkedin} | GitHub: ${resumeData.links.github}

EDUCATION:
- KIET Group of Institutions (Aug 2021 – Jul 2024)
  B.Tech in Information Technology — CGPA: 8.0 | Ghaziabad, UP
- Indo Danish Tool Room (Aug 2017 – Jul 2021)
  Diploma in Mechanical Engineering — 82% | Jamshedpur, Jharkhand

EXPERIENCE:
- Ethara AI (April 2026 – Present) | Generative AI Engineer | Gurugram, Haryana
  • Developed Python-based LLM applications and conversational chatbots using LangChain, integrating OpenAI and Gemini APIs for context-aware response generation, structured JSON outputs, and automated content-generation workflows.
  • Built RAG pipelines involving document ingestion, text chunking, embedding generation, vector-based semantic retrieval, and reranking, integrating retrieved context into LLM responses with source citations. Developed multi-step Agentic AI workflows using LangGraph with conditional routing, retrieval, decision-making, and human-in-the-loop mechanisms.
  • Conducted manual and automated LLM evaluations across factual accuracy, contextual relevance, hallucination detection, retrieval quality, instruction-following, and response formatting; compared model outputs and refined prompts and workflows to improve response quality and reliability.

- Wipro (September 2025 – April 2026) | Project Engineer | Pune, Maharashtra
  • Handled technical support tickets, troubleshooting application issues and assisting with incident resolution to maintain system reliability.
  • Worked with AWS services (EC2, IAM, CloudWatch) for infrastructure monitoring, access management, and issue analysis.
  • Explored Generative AI implementation using LLM APIs and Prompt Engineering to simplify technical ticket analysis, automate issue summarization, and support faster troubleshooting.

- Aminrup Technologies (July 2024 – August 2025) | Full-Stack Developer | Jamshedpur, Jharkhand
  • Developed and customized enterprise ERP modules using ASP.NET (Web Forms/MVC), C#, and SQL Server to support process automation.
  • Designed backend services, database operations, and API-driven workflows enabling communication between application components.
  • Designed and developed an AI-powered ERP Support Assistant using Python, LLM APIs, and LangChain to help users retrieve business information, navigate ERP workflows, and resolve queries through natural language.

PROJECTS:
- Enterprise Talent Intelligence Assistant (2026) | Python, LangGraph, RAG, AI Agents, OpenAI API
- AI Contract and Compliance Intelligence System (2026) | Python, LangChain, RAG, Vector Databases, LLMs

TECHNICAL SKILLS:
Programming: Python, SQL
GenAI & LLMs: Large Language Models (LLMs), Prompt Engineering, RAG, AI Agents, Agentic AI, NLP, OpenAI API, Gemini API
Frameworks: LangChain, LangGraph, FastAPI
Vector DBs: FAISS, ChromaDB, Embeddings, Semantic Search
Cloud & Infra: AWS (EC2, IAM, CloudWatch) - AWS Certified Cloud Practitioner
Developer Tools: Git, GitHub, Docker, VS Code

CERTIFICATIONS:
AWS Certified Cloud Practitioner — Amazon Web Services

ACHIEVEMENTS:
- Secured 2nd place in National Shakespeare Play among 50+ competing teams
- Vice-Captain, College Cricket Team
    `;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="resume-title">
      <div
        ref={modalRef}
        tabIndex={-1}
        className="card-base p-4 p-md-5 position-relative overflow-y-auto"
        style={{
          maxWidth: '880px',
          width: '100%',
          maxHeight: '92vh',
          background: 'var(--surface)',
          outline: 'none',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="d-flex align-items-center justify-content-between pb-3 mb-4 border-bottom" style={{ borderColor: 'var(--border)' }}>
          <div className="d-flex align-items-center gap-2">
            <FileText size={18} className="text-accent" />
            <h2 id="resume-title" className="h6 fw-bold mb-0 font-mono" style={{ color: 'var(--text)' }}>
              Curriculum Vitae — Prashant Priyadarshi
            </h2>
          </div>

          <div className="d-flex align-items-center gap-2">
            <button
              onClick={copyPlaintext}
              className="btn-secondary-custom font-mono"
              style={{ fontSize: '13px', padding: '6px 14px' }}
            >
              {copied ? <Check size={14} className="text-success" /> : <Copy size={14} />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="btn-primary-custom font-mono"
              style={{ fontSize: '13px', padding: '6px 14px' }}
            >
              <Printer size={14} />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="btn-ghost-custom p-1 rounded-circle"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Printable Resume Body - Clean & high contrast in both themes */}
        <div
          id="printable-resume"
          className="p-4 p-md-5 rounded-3"
          style={{
            background: 'var(--surface-2)',
            border: '1px solid var(--border)',
            color: 'var(--text)',
            lineHeight: 1.6,
            fontSize: '14px',
          }}
        >
          {/* Header */}
          <div className="text-center pb-3 mb-4 border-bottom" style={{ borderColor: 'var(--border)' }}>
            <h1 className="h3 fw-bold mb-1" style={{ color: 'var(--text)', letterSpacing: '-0.02em' }}>
              PRASHANT PRIYADARSHI
            </h1>
            <div style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
              {resumeData.links.location}, 122017 • {resumeData.links.phone} • {resumeData.links.email}
            </div>
            <div className="d-flex justify-content-center gap-3 font-mono mt-2" style={{ fontSize: '12px' }}>
              <a
                href={resumeData.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Prashant's LinkedIn profile, opens in a new tab"
                style={{ color: 'var(--accent)' }}
              >
                LinkedIn
              </a>
              <span>•</span>
              <a
                href={resumeData.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Prashant's GitHub profile, opens in a new tab"
                style={{ color: 'var(--accent)' }}
              >
                GitHub
              </a>
            </div>
          </div>

          {/* Education */}
          <div className="mb-4">
            <h3 className="fw-bold font-mono text-uppercase mb-2 pb-1 border-bottom" style={{ fontSize: '13px', color: 'var(--accent)', borderColor: 'var(--border)' }}>
              Education
            </h3>
            <div className="mb-2">
              <div className="d-flex justify-content-between fw-semibold">
                <span>KIET Group of Institutions</span>
                <span className="font-mono text-muted" style={{ fontSize: '12px' }}>Aug 2021 – Jul 2024</span>
              </div>
              <div className="d-flex justify-content-between" style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                <span>Bachelor of Technology in Information Technology — CGPA: 8.0</span>
                <span>Ghaziabad, Uttar Pradesh</span>
              </div>
            </div>

            <div>
              <div className="d-flex justify-content-between fw-semibold">
                <span>Indo Danish Tool Room</span>
                <span className="font-mono text-muted" style={{ fontSize: '12px' }}>Aug 2017 – Jul 2021</span>
              </div>
              <div className="d-flex justify-content-between" style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                <span>Diploma in Mechanical Engineering — Percentage: 82%</span>
                <span>Jamshedpur, Jharkhand</span>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className="mb-4">
            <h3 className="fw-bold font-mono text-uppercase mb-2 pb-1 border-bottom" style={{ fontSize: '13px', color: 'var(--accent)', borderColor: 'var(--border)' }}>
              Experience
            </h3>

            {/* Ethara AI */}
            <div className="mb-3">
              <div className="d-flex justify-content-between fw-semibold">
                <span>Ethara AI</span>
                <span className="font-mono text-accent" style={{ fontSize: '12px' }}>April 2026 – Present</span>
              </div>
              <div className="d-flex justify-content-between mb-2" style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                <em>Generative AI Engineer</em>
                <span>Gurugram, Haryana</span>
              </div>
              <ul className="ps-3 mb-0" style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                <li className="mb-1">
                  Developed Python-based LLM applications and conversational chatbots using LangChain, integrating OpenAI and Gemini APIs for context-aware response generation, structured JSON outputs, and automated content-generation workflows.
                </li>
                <li className="mb-1">
                  Built RAG pipelines involving document ingestion, text chunking, embedding generation, vector-based semantic retrieval, and reranking, integrating retrieved context into LLM responses with source citations. Developed multi-step Agentic AI workflows using LangGraph with conditional routing, retrieval, decision-making, and human-in-the-loop mechanisms.
                </li>
                <li>
                  Conducted manual and automated LLM evaluations across factual accuracy, contextual relevance, hallucination detection, retrieval quality, instruction-following, and response formatting; compared model outputs and refined prompts and workflows to improve response quality and reliability.
                </li>
              </ul>
            </div>

            {/* Wipro */}
            <div className="mb-3">
              <div className="d-flex justify-content-between fw-semibold">
                <span>Wipro</span>
                <span className="font-mono text-muted" style={{ fontSize: '12px' }}>Sept 2025 – April 2026</span>
              </div>
              <div className="d-flex justify-content-between mb-2" style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                <em>Project Engineer</em>
                <span>Pune, Maharashtra</span>
              </div>
              <ul className="ps-3 mb-0" style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                <li className="mb-1">
                  Handled technical support tickets, troubleshooting application issues and assisting with incident resolution to maintain system reliability.
                </li>
                <li className="mb-1">
                  Worked with AWS services (EC2, IAM, CloudWatch) for infrastructure monitoring, access management, and issue analysis.
                </li>
                <li>
                  Explored Generative AI implementation using LLM APIs and Prompt Engineering to simplify technical ticket analysis, automate issue summarization, and support faster troubleshooting.
                </li>
              </ul>
            </div>

            {/* Aminrup */}
            <div>
              <div className="d-flex justify-content-between fw-semibold">
                <span>Aminrup Technologies</span>
                <span className="font-mono text-muted" style={{ fontSize: '12px' }}>July 2024 – August 2025</span>
              </div>
              <div className="d-flex justify-content-between mb-2" style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                <em>Full-Stack Developer</em>
                <span>Jamshedpur, Jharkhand</span>
              </div>
              <ul className="ps-3 mb-0" style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                <li className="mb-1">
                  Developed and customized enterprise ERP modules using ASP.NET (Web Forms/MVC), C#, and SQL Server to support process automation.
                </li>
                <li className="mb-1">
                  Designed backend services, database operations, and API-driven workflows enabling communication between application components.
                </li>
                <li>
                  Designed and developed an AI-powered ERP Support Assistant using Python, LLM APIs, and LangChain to help users retrieve business information, navigate ERP workflows, and resolve queries through natural language.
                </li>
              </ul>
            </div>
          </div>

          {/* Projects */}
          <div className="mb-4">
            <h3 className="fw-bold font-mono text-uppercase mb-2 pb-1 border-bottom" style={{ fontSize: '13px', color: 'var(--accent)', borderColor: 'var(--border)' }}>
              Projects
            </h3>
            <div className="mb-3">
              <div className="d-flex justify-content-between fw-semibold">
                <span>Enterprise Talent Intelligence Assistant</span>
                <span className="font-mono text-muted" style={{ fontSize: '12px' }}>2026</span>
              </div>
              <div className="font-mono mb-1" style={{ fontSize: '12px', color: 'var(--accent)' }}>
                Python, LangGraph, RAG, AI Agents, OpenAI API
              </div>
              <ul className="ps-3 mb-0" style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                <li className="mb-1">
                  Developed an AI-powered recruitment assistant using Python and OpenAI API to analyze candidate resumes, extract skills and experience, identify skill gaps, and generate contextual candidate insights for automated recruitment assistance.
                </li>
                <li>
                  Implemented RAG-based document retrieval using embeddings and vector search, orchestrating multi-step AI agent workflows with LangGraph to support candidate-job matching, suitability analysis, and personalized interview question generation.
                </li>
              </ul>
            </div>

            <div>
              <div className="d-flex justify-content-between fw-semibold">
                <span>AI Contract and Compliance Intelligence System</span>
                <span className="font-mono text-muted" style={{ fontSize: '12px' }}>2026</span>
              </div>
              <div className="font-mono mb-1" style={{ fontSize: '12px', color: 'var(--accent)' }}>
                Python, LangChain, RAG, Vector Databases, LLMs
              </div>
              <ul className="ps-3 mb-0" style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                <li className="mb-1">
                  Developed an AI-powered contract intelligence system using Python and LangChain to process PDF and document-based contracts, extracting key clauses, contractual obligations, compliance requirements, and potential risks through LLM-based analysis.
                </li>
                <li>
                  Implemented an end-to-end RAG pipeline involving document ingestion, text chunking, embeddings, vector-based semantic search, and contextual retrieval to generate relevant contract summaries and support automated compliance analysis.
                </li>
              </ul>
            </div>
          </div>

          {/* Technical Skills */}
          <div className="mb-4">
            <h3 className="fw-bold font-mono text-uppercase mb-2 pb-1 border-bottom" style={{ fontSize: '13px', color: 'var(--accent)', borderColor: 'var(--border)' }}>
              Technical Skills
            </h3>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              <p className="mb-1"><strong style={{ color: 'var(--text)' }}>Languages:</strong> Python, SQL</p>
              <p className="mb-1"><strong style={{ color: 'var(--text)' }}>Generative AI &amp; LLMs:</strong> Large Language Models (LLMs), Prompt Engineering, RAG, AI Agents, Agentic AI, NLP, OpenAI API, Gemini API</p>
              <p className="mb-1"><strong style={{ color: 'var(--text)' }}>Frameworks:</strong> LangChain, LangGraph, FastAPI</p>
              <p className="mb-1"><strong style={{ color: 'var(--text)' }}>Vector Databases &amp; Search:</strong> FAISS, ChromaDB, Embeddings, Semantic Search</p>
              <p className="mb-1"><strong style={{ color: 'var(--text)' }}>Cloud &amp; Infrastructure:</strong> AWS (EC2, IAM, CloudWatch)</p>
              <p className="mb-1"><strong style={{ color: 'var(--text)' }}>Developer Tools:</strong> Git, GitHub, Docker, VS Code</p>
              <p className="mb-0"><strong style={{ color: 'var(--text)' }}>Core Concepts:</strong> REST APIs, Tool Calling, Multi-Agent Workflows, LLM Evaluation, Hallucination Detection, Model Comparison, Structured Outputs</p>
            </div>
          </div>

          {/* Certifications & Achievements */}
          <div>
            <h3 className="fw-bold font-mono text-uppercase mb-2 pb-1 border-bottom" style={{ fontSize: '13px', color: 'var(--accent)', borderColor: 'var(--border)' }}>
              Certifications &amp; Achievements
            </h3>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              <p className="mb-1">• <strong style={{ color: 'var(--text)' }}>AWS Certified Cloud Practitioner</strong> — Amazon Web Services</p>
              <p className="mb-0">• <strong style={{ color: 'var(--text)' }}>Achievements:</strong> Secured 2nd place in National Shakespeare Play among 50+ competing teams; Vice-Captain, College Cricket Team.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
