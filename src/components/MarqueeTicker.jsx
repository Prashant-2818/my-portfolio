import React from 'react';

export default function MarqueeTicker() {
  const items = [
    "LangGraph Multi-Agent Workflows",
    "FAISS Vector Retrieval",
    "ChromaDB",
    "Automated LLM Evaluations",
    "FastAPI",
    "OpenAI API",
    "Gemini API",
    "Docker",
    "AWS Certified",
    "Pydantic Structured JSON",
    "Semantic Reranking",
    "Python & SQL"
  ];

  return (
    <div className="marquee-container" aria-hidden="true">
      <div className="marquee-content">
        {/* Render twice for continuous loop */}
        {[...items, ...items].map((item, idx) => (
          <div key={idx} className="d-inline-flex align-items-center gap-3">
            <span
              className="font-mono text-uppercase"
              style={{
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '0.06em',
                color: 'var(--text-muted)',
              }}
            >
              {item}
            </span>
            <span style={{ color: 'var(--accent)', fontSize: '10px' }}>✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
