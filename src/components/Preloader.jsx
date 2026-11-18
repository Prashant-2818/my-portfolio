import React, { useEffect, useState } from 'react';

export default function Preloader({ onComplete }) {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // 1.2s total presentation time
    const timer = setTimeout(() => {
      setIsClosing(true);
      setTimeout(() => {
        onComplete();
      }, 500);
    }, 1100);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className="preloader-curtain"
      style={{
        transform: isClosing ? 'translateY(-100%)' : 'translateY(0)',
        opacity: isClosing ? 0.95 : 1,
      }}
    >
      <div className="d-flex flex-column align-items-center gap-3">
        {/* Monogram drawing container */}
        <div
          className="d-flex align-items-center justify-content-center rounded-3 p-3"
          style={{
            width: '68px',
            height: '68px',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          <svg width="42" height="42" viewBox="0 0 48 48" fill="none">
            <path
              d="M12 38V10H24C28.4183 10 32 13.5817 32 18C32 22.4183 28.4183 26 24 26H12"
              stroke="var(--accent)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                strokeDasharray: 90,
                strokeDashoffset: isClosing ? 0 : 0,
                animation: 'draw-path 0.9s ease-out forwards',
              }}
            />
          </svg>
        </div>

        <div className="d-flex align-items-center gap-2 font-mono" style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
          <span className="status-dot"></span>
          <span>Prashant Priyadarshi</span>
        </div>
      </div>

      <style>{`
        @keyframes draw-path {
          from { stroke-dashoffset: 90; }
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
}
