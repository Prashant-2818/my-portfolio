import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Github } from './Icons';
import { resumeData } from '../data/resumeData';
import ProjectModal from './ProjectModal';

// Mini pure SVG abstract diagrams in the ember + paper palette
function TalentDiagram() {
  return (
    <svg width="100%" height="86" viewBox="0 0 240 86" fill="none" className="rounded-3 mb-3" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
      {/* Node 1 */}
      <rect x="20" y="28" width="52" height="30" rx="6" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="46" y="47" textAnchor="middle" fill="var(--text)" fontSize="10" fontFamily="var(--font-mono)">PDF</text>
      {/* Connector */}
      <path d="M72 43H98" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="3 3" />
      {/* Node 2 */}
      <rect x="98" y="24" width="56" height="38" rx="6" fill="var(--accent-subtle)" stroke="var(--accent)" strokeWidth="1.5" />
      <text x="126" y="42" textAnchor="middle" fill="var(--accent)" fontSize="10" fontWeight="bold" fontFamily="var(--font-mono)">LangGraph</text>
      <text x="126" y="53" textAnchor="middle" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)">State Agent</text>
      {/* Connector */}
      <path d="M154 43H180" stroke="var(--accent)" strokeWidth="1.5" />
      {/* Node 3 */}
      <rect x="180" y="28" width="46" height="30" rx="6" fill="var(--highlight)" stroke="rgba(26,24,22,0.15)" strokeWidth="1" />
      <text x="203" y="47" textAnchor="middle" fill="#1A1816" fontSize="9" fontWeight="bold" fontFamily="var(--font-mono)">Q's</text>
    </svg>
  );
}

function ContractDiagram() {
  return (
    <svg width="100%" height="86" viewBox="0 0 240 86" fill="none" className="rounded-3 mb-3" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
      {/* Doc shape */}
      <rect x="25" y="18" width="44" height="50" rx="5" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.5" />
      <line x1="33" y1="28" x2="57" y2="28" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
      <line x1="33" y1="36" x2="61" y2="36" stroke="var(--border)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="33" y1="44" x2="53" y2="44" stroke="var(--border)" strokeWidth="1.5" strokeLinecap="round" />
      {/* Arrow */}
      <path d="M80 43H104" stroke="var(--accent)" strokeWidth="1.5" />
      {/* FAISS Vector index */}
      <circle cx="132" cy="43" r="22" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="132" y="46" textAnchor="middle" fill="var(--accent)" fontSize="10" fontWeight="bold" fontFamily="var(--font-mono)">FAISS</text>
      {/* Arrow */}
      <path d="M160 43H184" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="3 3" />
      {/* Citation tag */}
      <rect x="184" y="30" width="38" height="26" rx="4" fill="var(--highlight)" stroke="rgba(26,24,22,0.1)" />
      <text x="203" y="47" textAnchor="middle" fill="#1A1816" fontSize="9" fontWeight="bold" fontFamily="var(--font-mono)">p. 14</text>
    </svg>
  );
}

function ErpDiagram() {
  return (
    <svg width="100%" height="86" viewBox="0 0 240 86" fill="none" className="rounded-3 mb-3" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
      {/* Chat bubble */}
      <rect x="20" y="24" width="60" height="36" rx="8" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="50" y="46" textAnchor="middle" fill="var(--text)" fontSize="10" fontFamily="var(--font-mono)">"Find Q3"</text>
      {/* Arrow */}
      <path d="M90 43H118" stroke="var(--accent)" strokeWidth="1.5" />
      {/* Router node */}
      <rect x="118" y="26" width="48" height="34" rx="6" fill="var(--accent)" />
      <text x="142" y="47" textAnchor="middle" fill="var(--accent-ink)" fontSize="10" fontWeight="bold" fontFamily="var(--font-mono)">Router</text>
      {/* Arrow */}
      <path d="M174 43H198" stroke="var(--accent)" strokeWidth="1.5" />
      {/* DB icon */}
      <ellipse cx="212" cy="34" rx="14" ry="5" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.2" />
      <path d="M198 34V52C198 55 204 57 212 57C220 57 226 55 226 52V34" fill="none" stroke="var(--border)" strokeWidth="1.2" />
    </svg>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  const diagrams = [
    <TalentDiagram key="talent" />,
    <ContractDiagram key="contract" />,
    <ErpDiagram key="erp" />
  ];

  return (
    <section id="projects" className="section-wrapper">
      <div className="container-custom">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-eyebrow">
            <span>Projects</span>
          </div>
          <h2 className="section-title">Things I've built</h2>
          <p className="section-subtitle">
            A few systems I've put together with LangGraph, vector search, and clean evals.
          </p>
        </div>

        {/* 3 Equal-Height Cards in Grid */}
        <div className="row g-4 align-items-stretch">
          {resumeData.projects.map((project, idx) => (
            <div key={project.id} className="col-12 col-lg-4 d-flex" style={{ minWidth: 0 }}>
              <div className="card-base p-4 w-100 d-flex flex-column justify-content-between overflow-hidden" style={{ minWidth: 0 }}>
                <div>
                  {/* Category & Year */}
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <span className="chip chip-accent font-mono" style={{ fontSize: '11px', padding: '2px 8px' }}>
                      {project.category}
                    </span>
                    <span className="font-mono text-muted" style={{ fontSize: '12px' }}>
                      {project.year}
                    </span>
                  </div>

                  {/* Pure SVG diagram */}
                  <div className="w-100 overflow-hidden" style={{ maxWidth: '100%' }}>
                    {diagrams[idx]}
                  </div>

                  {/* Title */}
                  <h3 className="h5 fw-bold mb-2" style={{ color: 'var(--text)', fontSize: '1.2rem', lineHeight: 1.3 }}>
                    {project.title}
                  </h3>

                  {/* One-line casual hook */}
                  <p className="mb-4" style={{ fontSize: '14.5px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                    {project.tagline}
                  </p>

                  {/* 3-4 Tech Chips */}
                  <div className="d-flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span key={tech} className="chip font-mono" style={{ fontSize: '12px', padding: '3px 8px' }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-3 border-top d-flex align-items-center justify-content-between" style={{ borderColor: 'var(--border)' }}>
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="btn-secondary-custom font-mono"
                    style={{ fontSize: '13px', padding: '7px 14px' }}
                  >
                    <span>View architecture</span>
                    <ArrowUpRight size={14} />
                  </button>

                  {project.github ? (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost-custom p-2 rounded-circle"
                      title="GitHub Repository"
                      aria-label={`${project.title} GitHub repository, opens in a new tab`}
                    >
                      <Github size={16} />
                    </a>
                  ) : (
                    <span
                      className="btn-ghost-custom p-2 rounded-circle"
                      title="Repository link coming soon"
                      aria-label="Repository link coming soon"
                      style={{ opacity: 0.4, cursor: 'not-allowed' }}
                    >
                      <Github size={16} />
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Architecture Modal */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  );
}
