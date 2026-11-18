import React, { useState } from 'react';
import { resumeData } from '../data/resumeData';

export default function Skills() {
  const [activeTab, setActiveTab] = useState('all');

  const groups = resumeData.skills.groups;

  const tabs = [
    { id: 'all', label: 'All' },
    ...groups.map(g => ({ id: g.id, label: g.name }))
  ];

  const visibleGroups = activeTab === 'all'
    ? groups
    : groups.filter(g => g.id === activeTab);

  return (
    <section id="skills" className="section-wrapper">
      <div className="container-custom">
        {/* Section Header */}
        <div className="section-header d-flex flex-column flex-md-row md:align-items-end justify-content-between gap-4">
          <div>
            <div className="section-eyebrow">
              <span>Stack</span>
            </div>
            <h2 className="section-title">What I work with</h2>
            <p className="section-subtitle mb-0">
              Tools and frameworks I use every week, without the fake percentage bars.
            </p>
          </div>

          {/* Segmented Control Filter */}
          <div className="segmented-control align-self-start align-self-md-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`segmented-control-btn ${activeTab === tab.id ? 'active' : ''}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 6 Grouped Cards Grid */}
        <div className="row g-4">
          {visibleGroups.map((group) => (
            <div key={group.id} className="col-12 col-md-6 col-lg-4">
              <div className="card-base p-4 h-100 d-flex flex-column justify-content-between">
                <div>
                  {/* Group Title */}
                  <h3 className="h6 fw-bold mb-3" style={{ fontSize: '16px', color: 'var(--text)' }}>
                    {group.name}
                  </h3>

                  {/* Clean Skill Chips */}
                  <div className="d-flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span key={skill} className="chip">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
