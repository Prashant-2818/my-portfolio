import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  RotateCcw, 
  Maximize2, 
  Minimize2
} from 'lucide-react';
import { sendMessageToAssistant } from '../services/chatService';
import { resumeData } from '../data/resumeData';

export default function Chatbot({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: `👋 **Hi! I'm Prashant's portfolio assistant**, grounded in his verified resume.\n\nAsk me about his **LangGraph agents**, **RAG pipelines**, experience at **Ethara AI**, or **AWS certification**!`,
      time: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  
  const scrollContainerRef = useRef(null);

  // 3 Clickable Suggestion Chips under the chatbot input
  const bottomSuggestions = [
    "What are his core LangGraph skills?",
    "Tell me about the Talent Intelligence project",
    "How can I reach or hire Prashant?"
  ];

  // Safe inner-scroll ONLY when new messages arrive (never scrolls the window!)
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [messages, streamingText, isTyping]);

  const handleSend = async (textToSend) => {
    const query = (textToSend || inputText).trim();
    if (!query || isTyping) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);
    setStreamingText('');

    try {
      const finalReply = await sendMessageToAssistant(
        query,
        messages,
        (currentStream) => {
          setStreamingText(currentStream);
        }
      );

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'assistant',
          text: finalReply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-err-${Date.now()}`,
          sender: 'assistant',
          text: `Hmm, something broke. Email me directly instead at **${resumeData.personal.email}** or call **+91 ${resumeData.personal.phone}**!`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsTyping(false);
      setStreamingText('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const resetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'assistant',
        text: `Conversation cleared. Ask me anything about Prashant's engineering experience or technical stack.`,
        time: 'Just now'
      }
    ]);
  };

  const formatText = (content) => {
    return content.split('\n').map((line, idx) => {
      let formatted = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      formatted = formatted.replace(/`([^`]+)`/g, '<code class="font-mono text-accent">$1</code>');
      formatted = formatted.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer" class="text-accent text-decoration-underline">$1</a>');

      if (line.startsWith('- ') || line.startsWith('• ')) {
        return (
          <li key={idx} className="ms-3 mb-1" dangerouslySetInnerHTML={{ __html: formatted.substring(2) }} />
        );
      }
      if (line.trim() === '') {
        return <div key={idx} style={{ height: '4px' }} />;
      }
      return <div key={idx} className="mb-1" dangerouslySetInnerHTML={{ __html: formatted }} />;
    });
  };

  if (!isOpen) return null;

  return (
    <div
      className="position-fixed d-flex flex-column"
      style={{
        bottom: '24px',
        right: '24px',
        width: isExpanded ? 'min(860px, 94vw)' : 'min(420px, 92vw)',
        height: isExpanded ? '84vh' : '560px',
        zIndex: 1060,
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-lg)',
        overflow: 'hidden',
      }}
      role="dialog"
      aria-label="Prashant AI Assistant"
    >
      {/* Header */}
      <div
        className="d-flex align-items-center justify-content-between p-3 border-bottom"
        style={{ background: 'var(--surface-2)', borderColor: 'var(--border)' }}
      >
        <div className="d-flex align-items-center gap-2">
          <div
            className="d-flex align-items-center justify-content-center rounded-2"
            style={{
              width: '32px',
              height: '32px',
              background: 'var(--accent)',
              color: 'var(--accent-ink)',
            }}
          >
            <Bot size={18} />
          </div>
          <div>
            <div className="d-flex align-items-center gap-2">
              <span className="fw-bold font-display" style={{ fontSize: '15px', color: 'var(--text)' }}>
                Prashant AI
              </span>
              <span className="chip chip-highlight font-mono" style={{ fontSize: '10px', padding: '1px 6px' }}>
                RAG Grounded
              </span>
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Ask me anything about Prashant's work
            </div>
          </div>
        </div>

        <div className="d-flex align-items-center gap-1">
          <button
            onClick={resetChat}
            className="btn-ghost-custom p-1 rounded-circle"
            title="Reset Chat"
            aria-label="Reset chat conversation"
          >
            <RotateCcw size={15} />
          </button>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="btn-ghost-custom p-1 rounded-circle d-none d-md-inline-block"
            title={isExpanded ? "Collapse" : "Expand"}
            aria-label="Toggle expanded window"
          >
            {isExpanded ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
          </button>

          <button
            onClick={onClose}
            className="btn-ghost-custom p-1 rounded-circle"
            title="Close Assistant"
            aria-label="Close assistant"
          >
            <X size={17} />
          </button>
        </div>
      </div>

      {/* Message List (Internal scroll only!) */}
      <div
        ref={scrollContainerRef}
        className="flex-grow-1 p-3 overflow-y-auto d-flex flex-column gap-3"
        style={{ fontSize: '14.5px', background: 'var(--surface)' }}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`d-flex flex-column ${
              msg.sender === 'user' ? 'align-items-end' : 'align-items-start'
            }`}
          >
            <div
              className="p-3 rounded-3"
              style={{
                maxWidth: '85%',
                background:
                  msg.sender === 'user'
                    ? 'var(--accent)'
                    : 'var(--surface-2)',
                border:
                  msg.sender === 'user'
                    ? '1px solid transparent'
                    : '1px solid var(--border)',
                color: msg.sender === 'user' ? 'var(--accent-ink)' : 'var(--text)',
              }}
            >
              {formatText(msg.text)}
            </div>
            <span className="font-mono mt-1 px-1" style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>
              {msg.time}
            </span>
          </div>
        ))}

        {/* Streaming text */}
        {streamingText && (
          <div className="d-flex flex-column align-items-start">
            <div
              className="p-3 rounded-3"
              style={{
                maxWidth: '85%',
                background: 'var(--surface-2)',
                border: '1px solid var(--accent)',
                color: 'var(--text)',
              }}
            >
              {formatText(streamingText)}
              <span className="ms-1 font-mono text-accent animate-pulse">▋</span>
            </div>
          </div>
        )}

        {/* Typing State */}
        {isTyping && !streamingText && (
          <div className="d-flex align-items-center gap-2 p-2 font-mono" style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            <span className="status-dot"></span>
            <span>Checking verified resume facts...</span>
          </div>
        )}
      </div>

      {/* Input Field */}
      <div
        className="p-3 border-top d-flex align-items-center gap-2"
        style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a question about Prashant's work..."
          disabled={isTyping}
          className="form-control bg-transparent border-0 p-0 shadow-none"
          style={{ fontSize: '14.5px', color: 'var(--text)', outline: 'none' }}
          aria-label="Message input"
        />
        <button
          onClick={() => handleSend()}
          disabled={isTyping || !inputText.trim()}
          className="btn-primary-custom p-2 rounded-circle"
          style={{ width: '36px', height: '36px', justifyContent: 'center' }}
          title="Send"
          aria-label="Send message"
        >
          <Send size={15} />
        </button>
      </div>

      {/* "Things people can ask my AI" suggestion row */}
      <div
        className="px-3 py-2 border-top d-flex gap-2 overflow-x-auto"
        style={{ background: 'var(--surface-2)', borderColor: 'var(--border)', whiteSpace: 'nowrap' }}
      >
        <span className="font-mono text-muted align-self-center" style={{ fontSize: '11px' }}>
          Suggestions:
        </span>
        {bottomSuggestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            disabled={isTyping}
            className="chip font-mono"
            style={{ fontSize: '12px', padding: '2px 8px', cursor: 'pointer', flexShrink: 0 }}
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}
