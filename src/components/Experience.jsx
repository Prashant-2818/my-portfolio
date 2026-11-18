import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { resumeData } from '../data/resumeData';

export default function Experience() {
  const [expandedIndex, setExpandedIndex] = useState(0); // Ethara AI open by default

  const toggleExpand = (idx) => {
    setExpandedIndex(expandedIndex === idx ? -1 : idx);
  };

  return (
    <section id="experience" className="section-wrapper">
      <div className="container-custom">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-eyebrow">
            <span>Career</span>
          </div>
          <h2 className="section-title">Where I've worked</h2>
          <p className="section-subtitle">
            My path from enterprise ERP to cloud support to generative AI.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="position-relative mx-auto" style={{ maxWidth: '860px' }}>
          {/* Subtle Vertical Timeline Track */}
          <div
            className="position-absolute d-none d-sm-block"
            style={{
              top: '20px',
              bottom: '20px',
              left: '7px',
              width: '1px',
              background: 'var(--border)',
              zIndex: 0,
            }}
          />

          <div className="d-flex flex-column gap-4">
            {resumeData.experience.map((exp, idx) => {
              const isExpanded = expandedIndex === idx;

              return (
                <div key={exp.company} className="position-relative ps-sm-4">
                  {/* Timeline dot marker (desktop) */}
                  <div
                    className="position-absolute d-none d-sm-block rounded-circle"
                    style={{
                      top: '26px',
                      left: '4px',
                      width: '7px',
                      height: '7px',
                      background: exp.isCurrent ? 'var(--accent)' : 'var(--text-muted)',
                      boxShadow: exp.isCurrent ? '0 0 0 3px var(--accent-subtle)' : 'none',
                      zIndex: 1,
                    }}
                  />

                  {/* Card */}
                  <div className="card-base p-4">
                    {/* Header Row: Role + Company + Dates on one row */}
                    <div
                      className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2 cursor-pointer"
                      onClick={() => toggleExpand(idx)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div>
                        <div className="d-flex align-items-center gap-2 flex-wrap">
                          <h3 className="h6 fw-bold mb-0" style={{ fontSize: '16.5px', color: 'var(--text)' }}>
                            {exp.role}
                          </h3>
                          <span style={{ color: 'var(--text-muted)' }}>•</span>
                          <span className="fw-semibold" style={{ fontSize: '15px', color: 'var(--accent)' }}>
                            {exp.company}
                          </span>
                          {exp.isCurrent && (
                            <span className="chip chip-highlight" style={{ fontSize: '11px', padding: '1px 8px' }}>
                              Current
                            </span>
                          )}
                        </div>

                        <div className="d-flex align-items-center gap-2 mt-1 font-mono" style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                          <span>{exp.duration}</span>
                          <span>•</span>
                          <span>{exp.location}</span>
                        </div>
                      </div>

                      {/* Expand / Collapse Button */}
                      <button
                        className="btn-ghost-custom p-1 rounded-circle"
                        aria-label={isExpanded ? 'Collapse responsibilities' : 'Expand responsibilities'}
                      >
                        {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </button>
                    </div>

                    {/* Brief description */}
                    <p className="mt-3 mb-0" style={{ fontSize: '14.5px', color: 'var(--text-muted)' }}>
                      {exp.description}
                    </p>

                    {/* Collapsible Bullets */}
                    {isExpanded && (
                      <div className="pt-3 mt-3 border-top" style={{ borderColor: 'var(--border)' }}>
                        <ul className="ps-3 d-flex flex-column gap-2 mb-3" style={{ fontSize: '14.5px', color: 'var(--text)' }}>
                          {exp.responsibilities.map((bullet, bIdx) => (
                            <li key={bIdx} style={{ lineHeight: 1.55 }}>
                              {bullet}
                            </li>
                          ))}
                        </ul>

                        {/* Tech tags as small neutral chips */}
                        <div className="d-flex flex-wrap gap-2 pt-1">
                          {exp.technologies.map((tech) => (
                            <span key={tech} className="chip font-mono" style={{ fontSize: '12px', padding: '3px 8px' }}>
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
