import React, { useState } from 'react';
import { Play, RotateCcw, CheckCircle2 } from 'lucide-react';

export default function AgentWorkflowVisualizer() {
  const [activeStep, setActiveStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const steps = [
    {
      id: 'ingest',
      name: '1. Ingest & Validate',
      plainNote: 'Takes the raw input and confirms it has the fields the downstream agent expects.',
      x: 60,
      y: 50,
      json: '{\n  "input_type": "candidate_profile",\n  "status": "valid_schema"\n}'
    },
    {
      id: 'retrieve',
      name: '2. Vector RAG Search',
      plainNote: 'Pulls the top 4 semantic chunks from FAISS and runs cross-encoder reranking.',
      x: 180,
      y: 50,
      json: '{\n  "chunks_retrieved": 4,\n  "rerank_score": 0.94,\n  "sources": ["p. 3", "p. 7"]\n}'
    },
    {
      id: 'agent',
      name: '3. LangGraph Router',
      plainNote: 'The state graph checks extracted competencies against the role requirements.',
      x: 300,
      y: 50,
      json: '{\n  "agent_node": "gap_analyzer",\n  "branch": "verified",\n  "needs_retry": false\n}'
    },
    {
      id: 'eval',
      name: '4. Hallucination Check',
      plainNote: 'Runs an automated eval to verify the agent did not invent any qualifications.',
      x: 420,
      y: 50,
      json: '{\n  "hallucination_detected": false,\n  "factual_faithfulness": 0.99\n}'
    },
    {
      id: 'output',
      name: '5. Clean JSON Output',
      plainNote: 'Serializes the verified question set and score into a strict Pydantic payload.',
      x: 540,
      y: 50,
      json: '{\n  "code": 200,\n  "decision": "PASSED",\n  "questions_generated": 5\n}'
    }
  ];

  const runSimulation = () => {
    setIsRunning(true);
    let step = 0;
    setActiveStep(0);
    const interval = setInterval(() => {
      step++;
      if (step < steps.length) {
        setActiveStep(step);
      } else {
        clearInterval(interval);
        setIsRunning(false);
      }
    }, 850);
  };

  return (
    <section id="architecture" className="section-wrapper">
      <div className="container-custom">
        {/* Section Header */}
        <div className="section-header d-flex flex-column flex-md-row md:align-items-end justify-content-between gap-4">
          <div>
            <div className="section-eyebrow">
              <span>Interactive simulator</span>
            </div>
            <h2 className="section-title">See how an agent thinks</h2>
            <p className="section-subtitle mb-0">
              Click Run to watch a LangGraph state graph route inputs, retrieve context, and verify claims.
            </p>
          </div>

          <div className="d-flex align-items-center gap-2 align-self-start align-self-md-auto">
            <button
              onClick={runSimulation}
              disabled={isRunning}
              className="btn-primary-custom"
              style={{ padding: '8px 20px', fontSize: '13.5px' }}
            >
              <Play size={14} />
              <span>{isRunning ? 'Running flow...' : 'Run simulation'}</span>
            </button>

            <button
              onClick={() => { setIsRunning(false); setActiveStep(0); }}
              className="btn-ghost-custom p-2 rounded-circle"
              title="Reset"
              aria-label="Reset simulation"
            >
              <RotateCcw size={15} />
            </button>
          </div>
        </div>

        {/* Simulator Workbench */}
        <div className="card-base p-3 p-md-5 overflow-hidden" style={{ minWidth: 0 }}>
          {/* Interactive SVG Node Graph */}
          <div className="mb-4 p-2 p-md-3 rounded-3 overflow-x-auto" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', WebkitOverflowScrolling: 'touch' }}>
            <div style={{ minWidth: '480px' }}>
              <svg
                viewBox="0 0 600 110"
                width="100%"
                height="100%"
                style={{ maxHeight: '130px', display: 'block' }}
              >
              {/* Connecting baseline path */}
              <line x1="60" y1="50" x2="540" y2="50" stroke="var(--border)" strokeWidth="3" />

              {/* Active progress path */}
              <line
                x1="60"
                y1="50"
                x2={steps[activeStep].x}
                y2="50"
                stroke="var(--accent)"
                strokeWidth="3.5"
                strokeLinecap="round"
                style={{ transition: 'x2 0.4s ease' }}
              />

              {/* Feedback Loop curve showing LangGraph cyclic capability */}
              <path
                d="M 420 50 C 420 95, 300 95, 300 56"
                fill="none"
                stroke="var(--border)"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
              <text x="360" y="94" textAnchor="middle" fill="var(--text-muted)" fontSize="8.5" fontFamily="var(--font-mono)">
                Retry loop on eval failure
              </text>

              {/* Animated Traveling Dot */}
              {isRunning && (
                <circle
                  cx={steps[activeStep].x}
                  cy="50"
                  r="7"
                  fill="var(--highlight)"
                  stroke="var(--accent)"
                  strokeWidth="2"
                />
              )}

              {/* Draw Nodes */}
              {steps.map((st, idx) => {
                const isActive = activeStep === idx;
                const isPast = activeStep > idx;

                return (
                  <g key={st.id} onClick={() => setActiveStep(idx)} style={{ cursor: 'pointer' }}>
                    <circle
                      cx={st.x}
                      cy={st.y}
                      r={isActive ? "18" : "14"}
                      fill={isActive ? "var(--accent)" : isPast ? "var(--surface)" : "var(--surface)"}
                      stroke={isActive ? "var(--accent)" : isPast ? "var(--accent)" : "var(--border)"}
                      strokeWidth={isActive ? "3" : "2"}
                      style={{ transition: 'all 0.25s ease' }}
                    />
                    <text
                      x={st.x}
                      y={st.y + 4.5}
                      textAnchor="middle"
                      fill={isActive ? "var(--accent-ink)" : isPast ? "var(--accent)" : "var(--text-muted)"}
                      fontSize="11"
                      fontWeight="bold"
                      fontFamily="var(--font-mono)"
                    >
                      {idx + 1}
                    </text>
                    <text
                      x={st.x}
                      y={st.y - 24}
                      textAnchor="middle"
                      fill={isActive ? "var(--accent)" : "var(--text-muted)"}
                      fontSize="9.5"
                      fontWeight={isActive ? "bold" : "normal"}
                      fontFamily="var(--font-mono)"
                    >
                      {st.name.split('. ')[1]}
                    </text>
                  </g>
                );
              })}
            </svg>
            </div>
          </div>

          {/* Stepper Details */}
          <div className="p-4 rounded-3" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
            <div className="row gy-3 align-items-center">
              <div className="col-md-7">
                <div className="font-mono mb-1" style={{ fontSize: '12px', color: 'var(--accent)' }}>
                  STAGE 0{activeStep + 1} OF 05
                </div>
                <h3 className="h5 fw-bold mb-2" style={{ color: 'var(--text)' }}>
                  {steps[activeStep].name}
                </h3>
                <p className="mb-0" style={{ fontSize: '15px', color: 'var(--text)', lineHeight: 1.6 }}>
                  {steps[activeStep].plainNote}
                </p>
              </div>

              <div className="col-md-5">
                <div className="font-mono mb-1 text-muted" style={{ fontSize: '11px' }}>
                  STATE DICTIONARY PAYLOAD:
                </div>
                <pre
                  className="p-3 rounded-3 font-mono m-0"
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    fontSize: '12.5px',
                    color: 'var(--text)',
                    lineHeight: 1.5,
                  }}
                >
                  <code>{steps[activeStep].json}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
