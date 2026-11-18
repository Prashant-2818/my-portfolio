import React, { useState } from 'react';
import { 
  ArrowRight, 
  Download, 
  Terminal, 
  Layers, 
  BrainCircuit, 
  ShieldCheck, 
  Activity, 
  Play,
  ArrowUpRight
} from 'lucide-react';
import { resumeData } from '../data/resumeData';

export default function Hero({ openResumeModal }) {
  const [activeStep, setActiveStep] = useState(1);
  const [isSimulating, setIsSimulating] = useState(false);

  const simulatePipeline = () => {
    setIsSimulating(true);
    let step = 0;
    const interval = setInterval(() => {
      step = (step + 1) % 4;
      setActiveStep(step);
    }, 700);

    setTimeout(() => {
      clearInterval(interval);
      setIsSimulating(false);
    }, 2800);
  };

  const agentSteps = [
    { title: "Query Ingestion", desc: "Intent classification & Pydantic schema guard", icon: Terminal },
    { title: "Vector Search", desc: "FAISS index lookup & semantic reranking", icon: Layers },
    { title: "LangGraph Router", desc: "Multi-agent state transitions & tool execution", icon: BrainCircuit },
    { title: "Verification Guard", desc: "Context grounding assertion & JSON output", icon: ShieldCheck },
  ];

  return (
    <section className="section-wrapper d-flex align-items-center" style={{ minHeight: '88vh', paddingTop: '112px' }}>
      <div className="container-custom w-100">
        <div className="row align-items-center gy-5">
          {/* Left Column: Headline, Bio & CTAs */}
          <div className="col-lg-7">
            {/* Status Pill */}
            <div className="mb-3 d-inline-flex align-items-center gap-2 chip" style={{ background: 'var(--surface)', borderColor: 'var(--border)', maxWidth: '100%', whiteSpace: 'normal', textAlign: 'left', lineHeight: 1.4 }}>
              <span className="status-dot flex-shrink-0"></span>
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)' }}>
                {resumeData.personal.availability}
              </span>
            </div>

            {/* Headline with Signature Instrument Serif & Lime Marker Highlight */}
            <h1 className="mb-3" style={{ maxWidth: '18ch', lineHeight: 1.15, wordBreak: 'break-word', overflowWrap: 'break-word' }}>
              I build AI agents that{' '}
              <span className="marker-highlight">
                <span className="font-serif-italic" style={{ fontSize: '1.08em', color: 'var(--text)' }}>
                  don't make things up
                </span>
              </span>.
            </h1>

            {/* Subtitle in plain human engineer voice */}
            <p className="section-subtitle mb-4">
              I'm Prashant, a GenAI engineer at <strong>Ethara AI</strong>. I work with LangGraph, RAG, and automated evaluations, and I like boring, reliable systems more than flashy demos.
            </p>

            {/* Two Primary CTAs */}
            <div className="d-flex flex-wrap align-items-center gap-3 mb-3">
              <a href="#projects" className="btn-primary-custom">
                <span>Explore my work</span>
                <ArrowRight size={16} />
              </a>

              <button onClick={openResumeModal} className="btn-secondary-custom">
                <Download size={16} />
                <span>Grab my resume</span>
              </button>
            </div>

            {/* Tertiary Quiet Links */}
            <div className="d-flex align-items-center gap-3 pt-2 font-mono" style={{ fontSize: '13.5px' }}>
              <a
                href="#terminal"
                className="btn-ghost-custom p-0 text-decoration-none d-inline-flex align-items-center gap-1"
                style={{ color: 'var(--text-muted)' }}
              >
                <span>Poke around the terminal</span>
                <ArrowRight size={13} />
              </a>
              <span style={{ color: 'var(--border)' }}>•</span>
              <a
                href="#contact"
                className="btn-ghost-custom p-0 text-decoration-none d-inline-flex align-items-center gap-1"
                style={{ color: 'var(--accent)' }}
              >
                <span>Say hi</span>
                <ArrowUpRight size={13} />
              </a>
            </div>
          </div>

          {/* Right Column: Clean Telemetry Card & Circular Stamp Badge */}
          <div className="col-lg-5 position-relative">
            {/* Rotating Circular Text Stamp Badge */}
            <div
              className="position-absolute d-none d-xl-block"
              style={{
                top: '-24px',
                right: '-24px',
                zIndex: 2,
                pointerEvents: 'none',
              }}
            >
              <svg className="stamp-badge" width="90" height="90" viewBox="0 0 100 100">
                <path
                  id="circlePath"
                  d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                  fill="none"
                />
                <text fill="var(--text-muted)" fontSize="9.5" fontFamily="var(--font-mono)" letterSpacing="2.5">
                  <textPath href="#circlePath" startOffset="0%">
                    OPEN TO WORK • GURUGRAM •
                  </textPath>
                </text>
              </svg>
            </div>

            {/* Telemetry Card */}
            <div className="card-base p-4">
              {/* Header with Simulated Demo tag */}
              <div className="d-flex align-items-center justify-content-between pb-3 mb-3 border-bottom" style={{ borderColor: 'var(--border)' }}>
                <div className="d-flex align-items-center gap-2">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-2"
                    style={{ width: '28px', height: '28px', background: 'var(--accent-subtle)', color: 'var(--accent)' }}
                  >
                    <Activity size={16} />
                  </div>
                  <div>
                    <div className="fw-bold font-mono" style={{ fontSize: '13px', color: 'var(--text)' }}>
                      AGENT_ORCHESTRATOR
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      LangGraph State Flow
                    </div>
                  </div>
                </div>

                <span className="chip font-mono" style={{ fontSize: '11px', padding: '3px 8px' }}>
                  Simulated demo
                </span>
              </div>

              {/* Step Sequence */}
              <div className="d-flex flex-column gap-2 mb-3">
                {agentSteps.map((step, idx) => {
                  const Icon = step.icon;
                  const isActive = activeStep === idx;
                  return (
                    <div
                      key={step.title}
                      onClick={() => setActiveStep(idx)}
                      className="p-3 rounded-3 d-flex align-items-center justify-content-between cursor-pointer transition-all"
                      style={{
                        cursor: 'pointer',
                        background: isActive ? 'var(--surface-2)' : 'transparent',
                        border: isActive ? '1px solid var(--accent)' : '1px solid transparent',
                      }}
                    >
                      <div className="d-flex align-items-center gap-3">
                        <div
                          className="d-flex align-items-center justify-content-center rounded-2"
                          style={{
                            width: '28px',
                            height: '28px',
                            background: isActive ? 'var(--accent)' : 'var(--surface-2)',
                            color: isActive ? 'var(--accent-ink)' : 'var(--text-muted)',
                            transition: 'all 0.15s ease',
                          }}
                        >
                          <Icon size={14} />
                        </div>
                        <div>
                          <div className="fw-semibold" style={{ fontSize: '14px', color: isActive ? 'var(--text)' : 'var(--text-muted)' }}>
                            {step.title}
                          </div>
                          <div style={{ fontSize: '12px', color: 'var(--text-subtle)' }}>
                            {step.desc}
                          </div>
                        </div>
                      </div>

                      <span className="font-mono text-muted" style={{ fontSize: '11px' }}>
                        0{idx + 1}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Technical Spec Strip */}
              <div
                className="p-3 rounded-3 mb-3 d-flex justify-content-between font-mono"
                style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', fontSize: '12px' }}
              >
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Framework: </span>
                  <span className="fw-semibold" style={{ color: 'var(--text)' }}>LangGraph + FastAPI</span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Outputs: </span>
                  <span className="fw-semibold" style={{ color: 'var(--text)' }}>Strict JSON</span>
                </div>
              </div>

              {/* Test Button */}
              <button
                onClick={simulatePipeline}
                disabled={isSimulating}
                className="btn-secondary-custom w-100 justify-content-center"
                style={{ fontSize: '13px', padding: '9px 16px' }}
              >
                <Play size={14} className={isSimulating ? 'text-accent' : ''} />
                <span>{isSimulating ? 'Stepping through agent...' : 'Run Pipeline Step'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
