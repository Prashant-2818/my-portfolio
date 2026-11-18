import React, { useEffect, useRef } from 'react';
import { 
  X, 
  Workflow, 
  ArrowUpRight 
} from 'lucide-react';
import { Github } from './Icons';

export default function ProjectModal({ project, onClose }) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const prevActive = document.activeElement;
    modalRef.current?.focus();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      prevActive?.focus();
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-project-title">
      <div
        ref={modalRef}
        tabIndex={-1}
        className="card-base p-4 p-md-5 position-relative overflow-y-auto"
        style={{
          maxWidth: '820px',
          width: '100%',
          maxHeight: '90vh',
          background: 'var(--surface)',
          borderColor: 'var(--border-hover)',
          boxShadow: 'var(--shadow-lg)',
          outline: 'none',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="btn-ghost-custom position-absolute top-0 end-0 m-3 p-2 rounded-circle"
          aria-label="Close project modal"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="mb-4 pe-4">
          <div className="d-flex align-items-center gap-2 mb-2">
            <span className="chip chip-accent font-mono" style={{ fontSize: '11px', padding: '2px 8px' }}>
              {project.category}
            </span>
            <span className="font-mono text-muted" style={{ fontSize: '12px' }}>
              {project.year}
            </span>
          </div>

          <h2 id="modal-project-title" className="h3 fw-bold mb-1" style={{ color: 'var(--text)' }}>
            {project.title}
          </h2>
          <p className="mb-0" style={{ fontSize: '15px', color: 'var(--text-muted)' }}>
            {project.tagline}
          </p>
        </div>

        {/* Problem & What I Built in Plain Language */}
        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <div className="p-3 rounded-3 h-100" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
              <div className="fw-semibold mb-2 font-mono" style={{ fontSize: '12px', color: 'var(--accent)' }}>
                THE HEADACHE:
              </div>
              <p className="mb-0" style={{ fontSize: '14px', color: 'var(--text)', lineHeight: 1.6 }}>
                {project.problem}
              </p>
            </div>
          </div>

          <div className="col-md-6">
            <div className="p-3 rounded-3 h-100" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
              <div className="fw-semibold mb-2 font-mono" style={{ fontSize: '12px', color: 'var(--accent)' }}>
                WHAT I BUILT:
              </div>
              <p className="mb-0" style={{ fontSize: '14px', color: 'var(--text)', lineHeight: 1.6 }}>
                {project.solution}
              </p>
            </div>
          </div>
        </div>

        {/* Pipeline Steps */}
        <div className="mb-4">
          <div className="d-flex align-items-center gap-2 mb-3">
            <Workflow size={17} style={{ color: 'var(--accent)' }} />
            <h3 className="h6 fw-bold mb-0 font-mono" style={{ fontSize: '13px', color: 'var(--text)' }}>
              HOW THE PIPELINE WORKS
            </h3>
          </div>

          <div className="d-flex flex-column gap-2">
            {project.architecture.map((arch, idx) => (
              <div
                key={idx}
                className="p-3 rounded-3 d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2"
                style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}
              >
                <div className="d-flex align-items-center gap-2">
                  <span
                    className="d-inline-flex align-items-center justify-content-center rounded-circle font-mono fw-bold"
                    style={{
                      width: '22px',
                      height: '22px',
                      background: 'var(--accent)',
                      color: 'var(--accent-ink)',
                      fontSize: '11px',
                    }}
                  >
                    {idx + 1}
                  </span>
                  <span className="fw-semibold" style={{ fontSize: '14px', color: 'var(--text)' }}>
                    {arch.step}
                  </span>
                </div>
                <span className="font-mono" style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  {arch.detail}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-4">
          <h3 className="h6 fw-bold mb-2 font-mono" style={{ fontSize: '12px', color: 'var(--text-subtle)' }}>
            KEY ENGINEERING DECISIONS:
          </h3>
          <ul className="ps-3 d-flex flex-column gap-1 mb-0" style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
            {project.keyFeatures.map((feat, fIdx) => (
              <li key={fIdx}>{feat}</li>
            ))}
          </ul>
        </div>

        {/* Tech Stack */}
        <div className="mb-4">
          <h3 className="h6 fw-bold mb-2 font-mono" style={{ fontSize: '12px', color: 'var(--text-subtle)' }}>
            STACK:
          </h3>
          <div className="d-flex flex-wrap gap-2">
            {project.technologies.map((t) => (
              <span key={t} className="chip font-mono" style={{ fontSize: '12px' }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 pt-3 border-top" style={{ borderColor: 'var(--border)' }}>
          <span className="font-mono text-muted" style={{ fontSize: '12px' }}>
            Built and verified by Prashant
          </span>

          <div className="d-flex align-items-center gap-2">
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} GitHub repository, opens in a new tab`}
                className="btn-secondary-custom font-mono"
                style={{ fontSize: '13px', padding: '8px 16px' }}
              >
                <Github size={15} />
                <span>Repository</span>
              </a>
            ) : (
              <button
                type="button"
                disabled
                title="Repository link coming soon"
                className="btn-secondary-custom font-mono"
                style={{ fontSize: '13px', padding: '8px 16px', opacity: 0.5, cursor: 'not-allowed' }}
              >
                <Github size={15} />
                <span>Repo coming soon</span>
              </button>
            )}

            {project.demo ? (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} live demo, opens in a new tab`}
                className="btn-primary-custom font-mono"
                style={{ fontSize: '13px', padding: '8px 16px' }}
              >
                <span>Live demo</span>
                <ArrowUpRight size={14} />
              </a>
            ) : (
              <button
                type="button"
                disabled
                title="Live demo link coming soon"
                className="btn-secondary-custom font-mono"
                style={{ fontSize: '13px', padding: '8px 16px', opacity: 0.5, cursor: 'not-allowed' }}
              >
                <span>Demo coming soon</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
