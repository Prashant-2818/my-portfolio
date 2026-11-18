import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Download, 
  Check, 
  ArrowUpRight 
} from 'lucide-react';
import { Github, Linkedin } from './Icons';
import { resumeData } from '../data/resumeData';

export default function Contact({ openResumeModal }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <section id="contact" className="section-wrapper">
      <div className="container-custom">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-eyebrow">
            <span>Contact</span>
          </div>
          <h2 className="section-title">Say hi</h2>
          <p className="section-subtitle">
            Whether you have an agentic AI role or want to talk RAG evals, my inbox is open.
          </p>
        </div>

        {/* Two-Column Layout */}
        <div className="row gy-4 align-items-stretch">
          {/* Left Column: Direct Coordinates */}
          <div className="col-lg-5">
            <div className="card-base p-4 p-md-5 h-100 d-flex flex-column justify-content-between">
              <div>
                <h3 className="h5 fw-bold mb-3" style={{ color: 'var(--text)' }}>
                  Reach out directly
                </h3>
                <p className="mb-4" style={{ fontSize: '15px', color: 'var(--text-muted)' }}>
                  I'm based in Gurugram, India and open to local, hybrid, or remote positions.
                </p>

                {/* Simple Icon Rows */}
                <div className="d-flex flex-column gap-3 mb-4">
                  {/* Email */}
                  <div className="d-flex align-items-center gap-3">
                    <div
                      className="d-flex align-items-center justify-content-center rounded-2"
                      style={{ width: '36px', height: '36px', background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--accent)' }}
                    >
                      <Mail size={18} />
                    </div>
                    <div>
                      <div className="font-mono" style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>EMAIL</div>
                      <a
                        href={resumeData.links.emailMailto}
                        className="fw-semibold text-decoration-none"
                        style={{ fontSize: '14.5px', color: 'var(--text)' }}
                      >
                        {resumeData.links.email}
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="d-flex align-items-center gap-3">
                    <div
                      className="d-flex align-items-center justify-content-center rounded-2"
                      style={{ width: '36px', height: '36px', background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--accent)' }}
                    >
                      <Phone size={18} />
                    </div>
                    <div>
                      <div className="font-mono" style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>PHONE</div>
                      <a
                        href={resumeData.links.phoneTel}
                        className="fw-semibold text-decoration-none font-mono"
                        style={{ fontSize: '14.5px', color: 'var(--text)' }}
                      >
                        {resumeData.links.phone}
                      </a>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="d-flex align-items-center gap-3">
                    <div
                      className="d-flex align-items-center justify-content-center rounded-2"
                      style={{ width: '36px', height: '36px', background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--accent)' }}
                    >
                      <MapPin size={18} />
                    </div>
                    <div>
                      <div className="font-mono" style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>LOCATION</div>
                      <div className="fw-semibold" style={{ fontSize: '14.5px', color: 'var(--text)' }}>
                        {resumeData.links.location}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="d-flex align-items-center gap-2 pt-2">
                  <a
                    href={resumeData.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Prashant's GitHub profile, opens in a new tab"
                    className="btn-secondary-custom font-mono"
                    style={{ fontSize: '13px', padding: '7px 14px' }}
                  >
                    <Github size={15} />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={resumeData.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Prashant's LinkedIn profile, opens in a new tab"
                    className="btn-secondary-custom font-mono"
                    style={{ fontSize: '13px', padding: '7px 14px' }}
                  >
                    <Linkedin size={15} />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>

              {/* Resume download box */}
              <div className="p-3 card-subtle mt-4 d-flex align-items-center justify-content-between">
                <div>
                  <div className="fw-semibold" style={{ fontSize: '14px', color: 'var(--text)' }}>
                    Need a clean PDF?
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    Full verified curriculum vitae
                  </div>
                </div>
                <button
                  onClick={openResumeModal}
                  className="btn-primary-custom"
                  style={{ fontSize: '13px', padding: '7px 14px' }}
                >
                  <Download size={14} />
                  <span>Resume</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="col-lg-7">
            <div className="card-base p-4 p-md-5 h-100">
              <h3 className="h5 fw-bold mb-3" style={{ color: 'var(--text)' }}>
                Send a note
              </h3>

              {submitted ? (
                <div className="py-5 text-center">
                  <div
                    className="d-inline-flex p-3 rounded-circle mb-3"
                    style={{ background: 'var(--highlight)', color: '#1A1816' }}
                  >
                    <Check size={36} />
                  </div>
                  <h4 className="fw-bold mb-2" style={{ fontSize: '19px', color: 'var(--text)' }}>
                    Message sent. I'll reply soon.
                  </h4>
                  <p className="mb-4 mx-auto" style={{ maxWidth: '420px', fontSize: '14.5px', color: 'var(--text-muted)' }}>
                    Thanks for reaching out! Your message was transmitted. I usually respond within a business day.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="btn-secondary-custom font-mono"
                    style={{ fontSize: '13px' }}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label htmlFor="contact-name" className="form-label font-mono" style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                        YOUR NAME *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Alex"
                        className="form-input-custom"
                      />
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="contact-email" className="form-label font-mono" style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                        YOUR EMAIL *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="alex@example.com"
                        className="form-input-custom"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="form-label font-mono" style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      SUBJECT
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g. GenAI role discussion"
                      className="form-input-custom"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="form-label font-mono" style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      MESSAGE *
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Hi Prashant, let's connect about..."
                      className="form-input-custom"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary-custom w-100 justify-content-center"
                      style={{ padding: '12px' }}
                    >
                      {loading ? (
                        <span>Sending message...</span>
                      ) : (
                        <>
                          <span>Send note</span>
                          <Send size={15} />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
