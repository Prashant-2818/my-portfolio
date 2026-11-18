import React from 'react';
import { ArrowUp } from 'lucide-react';
import { Github, Linkedin } from './Icons';
import { resumeData } from '../data/resumeData';

export default function Footer({ openResumeModal }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className="py-5 border-top overflow-hidden"
      style={{
        background: 'var(--surface)',
        borderColor: 'var(--border)'
      }}
    >
      <div className="container-custom">
        {/* Oversized Wordmark that reveals on scroll */}
        <div className="text-center py-4 user-select-none opacity-50 mb-3 overflow-hidden" style={{ pointerEvents: 'none', maxWidth: '100%' }}>
          <span
            className="font-display fw-bold text-uppercase d-block"
            style={{
              fontSize: 'clamp(1.8rem, 7.5vw, 6.5rem)',
              letterSpacing: '-0.03em',
              lineHeight: 1,
              color: 'var(--text-subtle)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            Prashant Priyadarshi
          </span>
        </div>

        {/* Minimal Navigation & Links Row */}
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 font-mono pt-3 border-top" style={{ borderColor: 'var(--border)', fontSize: '13px', color: 'var(--text-muted)' }}>
          <div className="d-flex align-items-center gap-2">
            <span style={{ color: 'var(--text)' }} className="fw-semibold">
              Prashant Priyadarshi
            </span>
            <span>•</span>
            <span>GenAI Engineer at Ethara AI</span>
          </div>

          <div className="d-flex align-items-center gap-3">
            <a
              href={resumeData.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost-custom p-1 rounded"
              title="GitHub"
              aria-label="Prashant's GitHub profile, opens in a new tab"
            >
              <Github size={15} />
            </a>
            <a
              href={resumeData.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost-custom p-1 rounded"
              title="LinkedIn"
              aria-label="Prashant's LinkedIn profile, opens in a new tab"
            >
              <Linkedin size={15} />
            </a>
            <button
              onClick={openResumeModal}
              className="btn-ghost-custom p-1 font-mono"
              style={{ fontSize: '13px' }}
            >
              Resume
            </button>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="btn-ghost-custom p-1 d-inline-flex align-items-center gap-1 font-mono"
              style={{ fontSize: '13px', color: 'var(--accent)' }}
              aria-label="Back to top"
            >
              <span>Back to top</span>
              <ArrowUp size={13} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
