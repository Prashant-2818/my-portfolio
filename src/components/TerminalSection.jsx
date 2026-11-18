import React, { useState, useRef, useEffect } from 'react';
import { Copy, Check, CornerDownLeft } from 'lucide-react';
import { resumeData } from '../data/resumeData';

export default function TerminalSection() {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([]);
  const [hasTypedWelcome, setHasTypedWelcome] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const terminalRef = useRef(null);
  const scrollContainerRef = useRef(null);

  const commandChips = ['help', 'skills', 'projects', 'exp', 'coffee', 'sudo hire'];

  // Auto-type welcome message ONLY when terminal enters viewport via IntersectionObserver
  useEffect(() => {
    const el = terminalRef.current;
    if (!el || hasTypedWelcome) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasTypedWelcome) {
          setHasTypedWelcome(true);
          setHistory([
            { type: 'system', text: 'Prashant Priyadarshi Shell v2.6.0 (interactive CLI)' },
            { type: 'system', text: 'Type "help" to see available commands or click a chip below.' }
          ]);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasTypedWelcome]);

  // Safe inner-scroll ONLY when user adds commands (never scrolls the window!)
  const safeInnerScroll = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  };

  const handleCommand = (cmd) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    const newHistory = [...history, { type: 'user', text: `$ ${trimmed}` }];
    const commandLower = trimmed.toLowerCase();

    switch (commandLower) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: `COMMANDS:
  help          : Show this cheat sheet
  whoami        : Quick background
  skills        : Things I build with
  projects      : What I've shipped
  exp           : Work history
  certs         : AWS certification info
  contact       : Email, phone, location
  coffee        : Grab a warm brew
  sudo hire     : Fast-track recruitment
  clear         : Clear screen`
        });
        break;

      case 'whoami':
        newHistory.push({
          type: 'output',
          text: `Prashant Priyadarshi
Role: Generative AI Engineer at Ethara AI
Location: Gurugram, Haryana
Education: B.Tech in IT (8.0 CGPA) | AWS Certified Cloud Practitioner
Focus: LangGraph multi-agent workflows, RAG, and automated evaluations.`
        });
        break;

      case 'skills':
        newHistory.push({
          type: 'output',
          text: `STACK:
• Models: OpenAI, Gemini, prompt engineering, NLP
• Agents: LangGraph, LangChain, tool calling, human-in-the-loop
• Retrieval: FAISS, ChromaDB, embeddings, semantic reranking
• Code: Python, FastAPI, SQL, C#, Pydantic
• Cloud: AWS (EC2, IAM, CloudWatch), Docker, Git
• Evals: Hallucination detection, factual faithfulness, structured JSON`
        });
        break;

      case 'projects':
        newHistory.push({
          type: 'output',
          text: `PROJECTS:
1. Enterprise Talent Intelligence Assistant (2026)
   LangGraph + RAG candidate resume parsing and targeted interview questions.

2. AI Contract & Compliance Intelligence System (2026)
   LangChain + FAISS legal document analysis with strict page citations.

3. AI-Powered ERP Support Assistant (2025)
   Natural-language query interface for enterprise ERP users.`
        });
        break;

      case 'exp':
      case 'experience':
        newHistory.push({
          type: 'output',
          text: `CAREER:
• Ethara AI (April 2026 - Present): GenAI Engineer building LangGraph agents and evals.
• Wipro (Sept 2025 - April 2026): Project Engineer handling AWS cloud operations and ticket summarization.
• Aminrup Technologies (July 2024 - Aug 2025): Full-Stack Dev writing C#/SQL and an ERP AI assistant.`
        });
        break;

      case 'certs':
      case 'certifications':
        newHistory.push({
          type: 'output',
          text: `CREDENTIALS:
• AWS Certified Cloud Practitioner (Amazon Web Services)`
        });
        break;

      case 'contact':
        newHistory.push({
          type: 'output',
          text: `GET IN TOUCH:
• Email: ${resumeData.links.email}
• Phone: ${resumeData.links.phone}
• Location: ${resumeData.links.location}
• LinkedIn: ${resumeData.links.linkedin}
• GitHub: ${resumeData.links.github}`
        });
        break;

      case 'coffee':
        newHistory.push({
          type: 'output',
          text: `☕ Here's a freshly brewed cup of black coffee. Ready to talk LangGraph evals whenever you are!`
        });
        break;

      case 'sudo hire':
        newHistory.push({
          type: 'output',
          text: `🎉 Root access granted!
Prashant Priyadarshi is open to GenAI Engineer and Agentic AI roles.
Send an email to ${resumeData.links.email} to schedule an interview!`
        });
        break;

      case 'rm -rf':
      case 'rm -rf /':
        newHistory.push({
          type: 'error',
          text: `Nice try! Permission denied: you can't delete my portfolio.`
        });
        break;

      case 'hello':
      case 'hi':
        newHistory.push({
          type: 'output',
          text: `Hey there! Feel free to run "skills", "projects", or "contact".`
        });
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      default:
        newHistory.push({
          type: 'error',
          text: `Unknown command: "${trimmed}". Type "help" to see available options.`
        });
    }

    setHistory(newHistory);
    setInputVal('');
    setTimeout(safeInnerScroll, 30);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    }
  };

  const copyTerminal = () => {
    const textToCopy = history.map(h => h.text).join('\n');
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="terminal" ref={terminalRef} className="section-wrapper">
      <div className="container-custom">
        {/* Header */}
        <div className="section-header">
          <div className="section-eyebrow">
            <span>Terminal</span>
          </div>
          <h2 className="section-title">Poke around my terminal</h2>
          <p className="section-subtitle">
            If you prefer a keyboard over scrolling, run a few commands here.
          </p>
        </div>

        {/* Terminal Window with adaptive dark/light styling */}
        <div
          className="card-base mx-auto overflow-hidden"
          style={{
            maxWidth: '860px',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
          }}
        >
          {/* Top Window Chrome */}
          <div
            className="d-flex align-items-center justify-content-between px-3 py-2 border-bottom"
            style={{
              background: 'var(--surface-2)',
              borderColor: 'var(--border)'
            }}
          >
            <div className="d-flex align-items-center gap-2">
              <span className="rounded-circle" style={{ width: '10px', height: '10px', background: '#EF4444', display: 'inline-block' }}></span>
              <span className="rounded-circle" style={{ width: '10px', height: '10px', background: '#F59E0B', display: 'inline-block' }}></span>
              <span className="rounded-circle" style={{ width: '10px', height: '10px', background: '#10B981', display: 'inline-block' }}></span>
              <span className="ms-2 font-mono" style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                prashant@agentic-core:~
              </span>
            </div>

            <button
              onClick={copyTerminal}
              className="btn-ghost-custom p-1 rounded-circle"
              title="Copy session output"
              aria-label="Copy session output"
            >
              {copied ? <Check size={14} style={{ color: 'var(--accent)' }} /> : <Copy size={14} />}
            </button>
          </div>

          {/* Console Output Area with 14px readable font & inner scroll only */}
          <div
            ref={scrollContainerRef}
            className="p-4 font-mono overflow-y-auto"
            style={{
              maxHeight: '320px',
              minHeight: '220px',
              fontSize: '14px',
              lineHeight: 1.65,
              background: 'var(--surface)',
              color: 'var(--text)',
            }}
          >
            {history.map((item, idx) => (
              <div
                key={idx}
                className="mb-2"
                style={{
                  color:
                    item.type === 'user'
                      ? 'var(--accent)'
                      : item.type === 'error'
                      ? '#EF4444'
                      : item.type === 'system'
                      ? 'var(--text-muted)'
                      : 'var(--text)',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {item.text}
              </div>
            ))}
          </div>

          {/* Autocomplete chips */}
          <div
            className="px-4 py-2 border-top d-flex flex-wrap align-items-center gap-2"
            style={{ background: 'var(--surface-2)', borderColor: 'var(--border)' }}
          >
            <span className="font-mono text-muted" style={{ fontSize: '12px' }}>Try running:</span>
            {commandChips.map((chip) => (
              <button
                key={chip}
                onClick={() => handleCommand(chip)}
                className="chip font-mono"
                style={{ fontSize: '12px', padding: '2px 8px', cursor: 'pointer' }}
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input Bar (Notice: NO autoFocus!) */}
          <div
            className="px-4 py-3 border-top d-flex align-items-center gap-2"
            style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
          >
            <span className="font-mono fw-bold" style={{ color: 'var(--accent)' }}>$</span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type command ('help', 'skills', 'projects', 'sudo hire')..."
              className="form-control bg-transparent border-0 font-mono p-0 shadow-none"
              style={{
                fontSize: '14px',
                color: 'var(--text)',
                outline: 'none',
              }}
              aria-label="Terminal command input"
            />
            <button
              onClick={() => handleCommand(inputVal)}
              className="btn-ghost-custom p-1 rounded"
              title="Execute"
              aria-label="Execute command"
            >
              <CornerDownLeft size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
