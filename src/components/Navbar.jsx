import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, ArrowUpRight, Search } from 'lucide-react';

export default function Navbar({ theme, toggleTheme, onOpenCommandPalette }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['about', 'skills', 'experience', 'projects', 'architecture', 'terminal', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: "About", href: '#about', id: 'about' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Simulator', href: '#architecture', id: 'architecture' },
    { label: 'Terminal', href: '#terminal', id: 'terminal' },
  ];

  return (
    <header
      className="fixed-top transition-all"
      style={{
        zIndex: 1000,
        height: 'var(--nav-height)',
        backgroundColor: scrolled ? 'var(--surface)' : 'transparent',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'background-color 0.2s ease, border-color 0.2s ease',
      }}
    >
      <div className="container-custom h-100 d-flex align-items-center justify-content-between">
        {/* Brand */}
        <a
          href="#"
          className="d-flex align-items-center gap-2 text-decoration-none"
          aria-label="Prashant Priyadarshi - Return to top"
        >
          <div
            className="d-flex align-items-center justify-content-center rounded-2"
            style={{
              width: '32px',
              height: '32px',
              background: 'var(--accent)',
              color: 'var(--accent-ink)',
              fontWeight: 800,
              fontSize: '13px',
              fontFamily: 'var(--font-mono)',
            }}
          >
            PP
          </div>
          <span
            className="fw-bold"
            style={{
              fontSize: '15px',
              letterSpacing: '-0.02em',
              color: 'var(--text)',
              fontFamily: 'var(--font-display)',
            }}
          >
            Prashant Priyadarshi
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav
          className="d-none d-lg-flex align-items-center gap-1 p-1 rounded-pill"
          style={{
            background: scrolled ? 'transparent' : 'var(--surface)',
            border: scrolled ? 'none' : '1px solid var(--border)',
          }}
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.label}
                href={link.href}
                className="text-decoration-none px-3 py-1 rounded-pill"
                style={{
                  fontSize: '14px',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? 'var(--text)' : 'var(--text-muted)',
                  background: isActive ? 'var(--surface-2)' : 'transparent',
                  transition: 'all 0.15s ease',
                }}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="d-flex align-items-center gap-2">
          {/* Command Palette Button (desktop) */}
          <button
            onClick={onOpenCommandPalette}
            className="btn-ghost-custom d-none d-md-inline-flex align-items-center gap-2 px-2 py-1 rounded-pill"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              fontSize: '13px',
              color: 'var(--text-muted)',
            }}
            title="Open Command Palette (Cmd + K)"
            aria-label="Open Command Palette"
          >
            <Search size={14} />
            <span>Search</span>
            <kbd
              className="font-mono text-muted px-1 rounded"
              style={{
                fontSize: '10px',
                background: 'var(--surface-2)',
                border: '1px solid var(--border)',
              }}
            >
              ⌘K
            </kbd>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="btn-ghost-custom p-2 rounded-circle"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
            aria-label="Toggle light or dark theme"
            style={{ width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {theme === 'dark' ? (
              <Sun size={17} style={{ color: 'var(--accent)' }} />
            ) : (
              <Moon size={17} style={{ color: 'var(--text-muted)' }} />
            )}
          </button>

          {/* Primary Action Button */}
          <a
            href="#contact"
            className="btn-primary-custom d-none d-sm-inline-flex"
            style={{ padding: '8px 18px', fontSize: '14px' }}
          >
            <span>Say hi</span>
            <ArrowUpRight size={14} />
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn-ghost-custom p-2 d-lg-none rounded-circle"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          className="d-lg-none p-4 card-base mx-3 mt-2 shadow-lg"
          style={{ background: 'var(--surface)' }}
        >
          <div className="d-flex flex-column gap-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-decoration-none py-2"
                style={{
                  color: 'var(--text)',
                  fontSize: '15px',
                  fontWeight: 500,
                  borderBottom: '1px solid var(--border)',
                }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 d-flex flex-column gap-2">
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenCommandPalette(); }}
                className="btn-secondary-custom w-100 justify-content-center"
              >
                <Search size={15} />
                <span>Command Palette (⌘K)</span>
              </button>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-primary-custom w-100 justify-content-center"
              >
                <span>Say hi</span>
                <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
