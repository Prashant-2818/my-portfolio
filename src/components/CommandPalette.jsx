import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Bot, 
  FileText, 
  Sun, 
  Moon, 
  Mail, 
  ArrowUpRight, 
  X,
  Code,
  Layers,
  Briefcase,
  Terminal,
  Activity,
  Copy,
  Check
} from 'lucide-react';
import { resumeData } from '../data/resumeData';

export default function CommandPalette({ isOpen, onClose, onOpenChatbot, onOpenResume, onToggleTheme, theme }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const inputRef = useRef(null);

  const actions = [
    {
      id: 'chat',
      title: 'Ask Prashant AI Assistant',
      desc: 'Chat with my grounded portfolio agent',
      icon: Bot,
      run: () => { onClose(); onOpenChatbot(); }
    },
    {
      id: 'resume',
      title: 'Download Resume (PDF)',
      desc: 'View and print full verified curriculum vitae',
      icon: FileText,
      run: () => { onClose(); onOpenResume(); }
    },
    {
      id: 'theme',
      title: `Toggle Theme (Current: ${theme})`,
      desc: 'Switch between warm paper light and charcoal dark',
      icon: theme === 'dark' ? Sun : Moon,
      run: () => { onToggleTheme(); }
    },
    {
      id: 'copy-email',
      title: 'Copy Email Address',
      desc: resumeData.links.email,
      icon: copiedEmail ? Check : Copy,
      run: () => {
        navigator.clipboard.writeText(resumeData.links.email);
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      }
    },
    {
      id: 'sec-about',
      title: "Jump to Who's Behind This",
      desc: 'Background and career story',
      icon: ArrowUpRight,
      run: () => { onClose(); window.location.hash = '#about'; }
    },
    {
      id: 'sec-skills',
      title: 'Jump to What I Work With',
      desc: 'Tools and technical frameworks',
      icon: Code,
      run: () => { onClose(); window.location.hash = '#skills'; }
    },
    {
      id: 'sec-exp',
      title: "Jump to Where I've Worked",
      desc: 'Work experience at Ethara AI, Wipro & Aminrup',
      icon: Briefcase,
      run: () => { onClose(); window.location.hash = '#experience'; }
    },
    {
      id: 'sec-projects',
      title: 'Jump to Things I\'ve Built',
      desc: 'Agent and RAG featured projects',
      icon: Layers,
      run: () => { onClose(); window.location.hash = '#projects'; }
    },
    {
      id: 'sec-simulator',
      title: 'Jump to Agent Pipeline Simulator',
      desc: 'Interactive LangGraph state machine',
      icon: Activity,
      run: () => { onClose(); window.location.hash = '#architecture'; }
    },
    {
      id: 'sec-terminal',
      title: 'Jump to Developer Terminal',
      desc: 'Interactive CLI shell',
      icon: Terminal,
      run: () => { onClose(); window.location.hash = '#terminal'; }
    },
    {
      id: 'sec-contact',
      title: 'Jump to Say Hi',
      desc: 'Send a note or direct contact info',
      icon: Mail,
      run: () => { onClose(); window.location.hash = '#contact'; }
    }
  ];

  const filtered = actions.filter((a) =>
    a.title.toLowerCase().includes(query.toLowerCase()) ||
    a.desc.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(false); // will be handled by parent
      }
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          filtered[selectedIndex].run();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filtered, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="card-base p-0 w-100 overflow-hidden"
        style={{
          maxWidth: '580px',
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-lg)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="d-flex align-items-center gap-3 px-4 py-3 border-bottom" style={{ borderColor: 'var(--border)' }}>
          <Search size={18} style={{ color: 'var(--text-muted)' }} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
            placeholder="Type a command or jump to a section..."
            className="form-control bg-transparent border-0 p-0 shadow-none"
            style={{
              fontSize: '15px',
              color: 'var(--text)',
              fontFamily: 'var(--font-body)',
              outline: 'none',
            }}
          />
          <button
            onClick={onClose}
            className="btn-ghost-custom p-1 rounded-circle"
            aria-label="Close command palette"
          >
            <X size={16} />
          </button>
        </div>

        {/* Action List */}
        <div className="p-2 overflow-y-auto" style={{ maxHeight: '380px' }}>
          {filtered.length === 0 ? (
            <div className="p-4 text-center" style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
              No matching commands. Try "about", "projects", or "resume".
            </div>
          ) : (
            filtered.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = selectedIndex === idx;

              return (
                <div
                  key={item.id}
                  onClick={item.run}
                  className="p-3 rounded-3 d-flex align-items-center justify-content-between cursor-pointer transition-all"
                  style={{
                    cursor: 'pointer',
                    background: isSelected ? 'var(--surface-2)' : 'transparent',
                    border: isSelected ? '1px solid var(--border)' : '1px solid transparent',
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                >
                  <div className="d-flex align-items-center gap-3">
                    <div
                      className="d-flex align-items-center justify-content-center rounded-2"
                      style={{
                        width: '32px',
                        height: '32px',
                        background: isSelected ? 'var(--accent)' : 'var(--surface-2)',
                        color: isSelected ? 'var(--accent-ink)' : 'var(--accent)',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <Icon size={16} />
                    </div>
                    <div>
                      <div className="fw-semibold" style={{ fontSize: '14px', color: 'var(--text)' }}>
                        {item.title}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                        {item.desc}
                      </div>
                    </div>
                  </div>

                  <span className="font-mono text-muted d-none d-sm-inline" style={{ fontSize: '11px' }}>
                    ↵ Enter
                  </span>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div
          className="px-4 py-2 border-top d-flex align-items-center justify-content-between font-mono"
          style={{ background: 'var(--surface-2)', borderColor: 'var(--border)', fontSize: '12px', color: 'var(--text-muted)' }}
        >
          <span>Use ↑↓ arrows to navigate</span>
          <span>Esc to exit</span>
        </div>
      </div>
    </div>
  );
}
