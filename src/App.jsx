import React, { useState, useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MarqueeTicker from './components/MarqueeTicker';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import { Bot } from 'lucide-react';

// Lazy-loaded components for optimal initial bundle performance
const AgentWorkflowVisualizer = lazy(() => import('./components/AgentWorkflowVisualizer'));
const TerminalSection = lazy(() => import('./components/TerminalSection'));
const Chatbot = lazy(() => import('./components/Chatbot'));
const ResumeModal = lazy(() => import('./components/ResumeModal'));
const CommandPalette = lazy(() => import('./components/CommandPalette'));

export default function App() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('prashant_editorial_theme');
    if (saved) return saved;
    // Default to light warm paper theme as requested
    return 'light';
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isCmdOpen, setIsCmdOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Prevent scroll jumping on mount & refresh
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  // Theme attribute management
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('prashant_editorial_theme', theme);
  }, [theme]);

  // Window scroll progress indicator
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        setScrollProgress((totalScroll / windowHeight) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handlePreloaderComplete = () => {
    setIsLoading(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className="position-relative" style={{ minHeight: '100vh', backgroundColor: 'var(--bg)' }}>
      {/* 2px Scroll progress bar at top of window */}
      <div id="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      {/* 1.2s Monogram Preloader */}
      {isLoading && (
        <Preloader onComplete={handlePreloaderComplete} />
      )}

      {/* Navigation */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenCommandPalette={() => setIsCmdOpen(true)}
      />

      {/* Main Content Sections */}
      <main id="main-content">
        <Hero
          openResumeModal={() => setIsResumeOpen(true)}
        />

        {/* Marquee Ticker between Hero and About */}
        <MarqueeTicker />

        <About />

        <Skills />

        <Experience />

        <Projects />

        <Suspense fallback={<div className="container-custom py-5" style={{ minHeight: '380px' }} />}>
          <AgentWorkflowVisualizer />
        </Suspense>

        <Suspense fallback={<div className="container-custom py-5" style={{ minHeight: '380px' }} />}>
          <TerminalSection />
        </Suspense>

        <Contact openResumeModal={() => setIsResumeOpen(true)} />
      </main>

      {/* Footer */}
      <Footer openResumeModal={() => setIsResumeOpen(true)} />

      {/* Full Resume Modal */}
      {isResumeOpen && (
        <Suspense fallback={null}>
          <ResumeModal
            isOpen={isResumeOpen}
            onClose={() => setIsResumeOpen(false)}
          />
        </Suspense>
      )}

      {/* Command Palette (Cmd + K) */}
      {isCmdOpen && (
        <Suspense fallback={null}>
          <CommandPalette
            isOpen={isCmdOpen}
            onClose={() => setIsCmdOpen(false)}
            onOpenChatbot={() => setIsChatOpen(true)}
            onOpenResume={() => setIsResumeOpen(true)}
            onToggleTheme={toggleTheme}
            theme={theme}
          />
        </Suspense>
      )}

      {/* Floating AI Assistant Drawer */}
      {isChatOpen && (
        <Suspense fallback={null}>
          <Chatbot
            isOpen={isChatOpen}
            onClose={() => setIsChatOpen(false)}
          />
        </Suspense>
      )}

      {/* Small, Tasteful Floating Assistant Trigger Pill */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="position-fixed d-flex align-items-center gap-2 p-2 pe-3 card-base"
          style={{
            bottom: '24px',
            right: '24px',
            zIndex: 1040,
            borderRadius: 'var(--radius-pill)',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-md)',
            background: 'var(--surface)',
            cursor: 'pointer',
          }}
          title="Ask Prashant AI (or press ⌘K)"
          aria-label="Open AI Assistant"
        >
          <div
            className="d-flex align-items-center justify-content-center rounded-circle"
            style={{
              width: '32px',
              height: '32px',
              background: 'var(--accent)',
              color: 'var(--accent-ink)',
            }}
          >
            <Bot size={17} />
          </div>
          <div className="d-flex align-items-center gap-2 font-mono" style={{ fontSize: '13px' }}>
            <span className="status-dot"></span>
            <span className="fw-semibold" style={{ color: 'var(--text)' }}>AI Assistant</span>
          </div>
        </button>
      )}
    </div>
  );
}
