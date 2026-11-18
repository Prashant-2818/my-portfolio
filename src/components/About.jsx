import React, { useState, useEffect } from 'react';
import { 
  Cloud, 
  GraduationCap, 
  Trophy, 
  ShieldCheck, 
  Code2, 
  Clock, 
  MapPin, 
  BookOpen 
} from 'lucide-react';
import { resumeData } from '../data/resumeData';

export default function About() {
  const { education, certifications, achievements, stats, rightNow } = resumeData;
  const [timeString, setTimeString] = useState('');

  // Live clock for Gurugram (Asia/Kolkata timezone)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      setTimeString(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="section-wrapper">
      <div className="container-custom">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-eyebrow">
            <span>About me</span>
          </div>
          <h2 className="section-title">Who's behind this</h2>
          <p className="section-subtitle">
            A quick rundown of how I got into building agents.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="row g-4">
          {/* Main Story Narrative Card (8 cols) */}
          <div className="col-lg-8">
            <div className="card-base p-4 p-md-5 h-100 d-flex flex-column justify-content-between">
              <div>
                <h3 className="h4 fw-bold mb-3" style={{ color: 'var(--text)' }}>
                  From factory floors to cloud tickets to generative AI
                </h3>

                <p className="mb-3" style={{ fontSize: '16.5px', color: 'var(--text)' }}>
                  I studied mechanical engineering in Jamshedpur before moving into computer science at KIET. That background made me care a lot about systems that have to work under real-world constraints.
                </p>

                <p className="mb-3" style={{ fontSize: '16.5px', color: 'var(--text-muted)' }}>
                  I started writing C# and SQL Server for enterprise ERP modules at Aminrup, where I built my first natural-language assistant to help non-technical users query business data. Then at Wipro, I spent time in cloud operations on AWS: monitoring EC2, managing IAM roles, and using prompt engineering to summarize technical tickets so support engineers could resolve incidents faster.
                </p>

                <p className="mb-4" style={{ fontSize: '16.5px', color: 'var(--text-muted)' }}>
                  Today at Ethara AI, I spend my days building multi-step agents in LangGraph, optimizing vector search with FAISS, and writing evaluation suites that catch hallucinations before users do. When I'm not writing Python, I play college cricket and perform on stage.
                </p>

                {/* Specific Real Things Done */}
                <div className="row g-3 pt-2">
                  <div className="col-sm-6">
                    <div className="p-3 card-subtle h-100">
                      <div className="d-flex align-items-center gap-2 mb-1 fw-semibold" style={{ fontSize: '14.5px', color: 'var(--text)' }}>
                        <ShieldCheck size={16} style={{ color: 'var(--accent)' }} />
                        <span>Hallucination checks</span>
                      </div>
                      <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                        Automated assertions that compare claims directly against retrieved chunks, so the model can't guess when context is missing.
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="p-3 card-subtle h-100">
                      <div className="d-flex align-items-center gap-2 mb-1 fw-semibold" style={{ fontSize: '14.5px', color: 'var(--text)' }}>
                        <Code2 size={16} style={{ color: 'var(--accent)' }} />
                        <span>Structured JSON outputs</span>
                      </div>
                      <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                        Pydantic models and strict schemas so downstream APIs receive clean, predictable payloads without parsing errors.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: "Right now" card + Stats (4 cols) */}
          <div className="col-lg-4 d-flex flex-column gap-4">
            {/* "Right Now" Card */}
            <div className="card-base p-4" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
              <div className="d-flex align-items-center justify-content-between mb-3">
                <span className="chip chip-highlight" style={{ fontSize: '11px', padding: '2px 8px' }}>
                  RIGHT NOW
                </span>
                <span className="d-inline-flex align-items-center gap-1 font-mono text-muted" style={{ fontSize: '12px' }}>
                  <Clock size={13} />
                  <span>{timeString || '12:00 PM IST'}</span>
                </span>
              </div>

              <div className="d-flex flex-column gap-2 mb-3" style={{ fontSize: '13.5px' }}>
                <div>
                  <div className="font-mono text-muted" style={{ fontSize: '11px' }}>WORKING ON:</div>
                  <div className="fw-semibold" style={{ color: 'var(--text)' }}>{rightNow.workingOn}</div>
                </div>
                <div>
                  <div className="font-mono text-muted" style={{ fontSize: '11px' }}>LEARNING:</div>
                  <div style={{ color: 'var(--text-muted)' }}>{rightNow.learning}</div>
                </div>
                <div className="d-flex align-items-center gap-1 font-mono text-muted pt-1" style={{ fontSize: '12px' }}>
                  <MapPin size={13} />
                  <span>{rightNow.location}</span>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="row g-3">
              {stats.slice(0, 4).map((stat, idx) => (
                <div key={idx} className="col-6">
                  <div className="card-base p-3 text-center h-100">
                    <div className="font-display fw-bold" style={{ fontSize: '1.9rem', color: 'var(--text)', lineHeight: 1.1 }}>
                      {stat.value}
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}> {stat.suffix}</span>
                    </div>
                    <div className="fw-semibold mt-1" style={{ fontSize: '13px', color: 'var(--text)' }}>
                      {stat.label}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      {stat.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Certification Row */}
          <div className="col-lg-7">
            <div className="card-base p-4 h-100">
              <div className="d-flex align-items-center gap-2 mb-3">
                <GraduationCap size={18} style={{ color: 'var(--accent)' }} />
                <h4 className="fw-bold mb-0" style={{ fontSize: '16px', color: 'var(--text)' }}>
                  Education
                </h4>
              </div>

              <div className="d-flex flex-column gap-3">
                {education.map((edu, idx) => (
                  <div key={idx} className="p-3 card-subtle">
                    <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-1 mb-1">
                      <div className="fw-semibold" style={{ fontSize: '14.5px', color: 'var(--text)' }}>
                        {edu.degree}
                      </div>
                      <span className="chip font-mono" style={{ fontSize: '11px', padding: '2px 8px' }}>
                        {edu.duration}
                      </span>
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                      {edu.institution} - {edu.location}
                    </div>
                    <div className="d-flex align-items-center justify-content-between mt-2 pt-2 border-top" style={{ borderColor: 'var(--border)' }}>
                      <span style={{ fontSize: '12px', color: 'var(--text-subtle)' }}>Result:</span>
                      <span className="font-mono fw-semibold" style={{ fontSize: '13px', color: 'var(--text)' }}>
                        {edu.score}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Certification & Achievements */}
          <div className="col-lg-5">
            <div className="card-base p-4 h-100 d-flex flex-column justify-content-between gap-3">
              {/* AWS Cert */}
              {certifications.map((cert, index) => (
                <div key={index} className="p-3 card-subtle">
                  <div className="d-flex align-items-center justify-content-between mb-1">
                    <span className="chip chip-accent" style={{ fontSize: '11px', padding: '2px 8px' }}>
                      CERTIFIED
                    </span>
                    <span className="font-mono text-muted" style={{ fontSize: '12px' }}>
                      AWS
                    </span>
                  </div>
                  <div className="fw-bold mb-1" style={{ fontSize: '15px', color: 'var(--text)' }}>
                    {cert.name}
                  </div>
                  <div style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>
                    {cert.description}
                  </div>
                </div>
              ))}

              {/* Theater & Sports */}
              <div className="p-3 card-subtle">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <Trophy size={16} style={{ color: 'var(--accent)' }} />
                  <span className="fw-bold" style={{ fontSize: '14px', color: 'var(--text)' }}>Outside of tech</span>
                </div>
                <div className="d-flex flex-column gap-2" style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                  <div>
                    <strong style={{ color: 'var(--text)' }}>National Shakespeare Play:</strong> 2nd place among 50+ college teams.
                  </div>
                  <div>
                    <strong style={{ color: 'var(--text)' }}>College Cricket Team:</strong> Vice-Captain, leading on-field match strategy.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
