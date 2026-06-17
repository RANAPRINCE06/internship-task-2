/**
 * StringGenerator.jsx
 * Main card: generated string output with scramble animation,
 * copy/export/regenerate/generate buttons.
 * 3D card tilt driven by mouse position via useCallback + useRef.
 */
import { useRef, useCallback } from 'react';
import {
  TbWand, TbRefresh, TbCopy, TbCheck, TbAlertCircle, TbHash, TbDownload,
} from 'react-icons/tb';
import AnimatedString from './AnimatedString';

const StringGenerator = ({ generated, validation, copyStatus, onGenerate, onCopy, onExport }) => {
  const cardRef   = useRef(null);
  const hasCopied = copyStatus === 'copied';

  /* 3D tilt on mouse move */
  const handleMouseMove = useCallback((e) => {
    const el = cardRef.current; if (!el) return;
    const r  = el.getBoundingClientRect();
    const x  = (e.clientX - r.left) / r.width  - 0.5;
    const y  = (e.clientY - r.top)  / r.height - 0.5;
    el.style.transform = `perspective(1000px) rotateX(${(-y * 8).toFixed(2)}deg) rotateY(${(x * 10).toFixed(2)}deg)`;
    el.style.transition = 'transform 60ms linear';
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    cardRef.current.style.transition = 'transform 400ms cubic-bezier(0.4,0,0.2,1)';
  }, []);

  return (
    <div
      ref={cardRef}
      className="generator-card glass-card anim-fade-up"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <p className="section-label">Generated String</p>

      <div
        id="generated-output"
        className={`output-box ${generated ? 'has-string' : ''}`}
        aria-live="polite"
        aria-label="Generated string output"
        role="region"
      >
        {generated
          ? <AnimatedString value={generated} />
          : <span className="placeholder-text">Hit "Generate" to create your string…</span>}
        <div className="glow-line" />
      </div>

      {/* Meta */}
      <div className="output-meta">
        <span className="char-count">
          <TbHash size={13} />
          <span className="char-count-value">{generated.length}</span>
          characters
        </span>
        {hasCopied && (
          <span className="copy-toast" role="status">
            <TbCheck size={14} /> Copied!
          </span>
        )}
      </div>

      {/* Validation */}
      {validation && (
        <div className="validation-error" role="alert">
          <TbAlertCircle size={16} /> {validation}
        </div>
      )}

      {/* Buttons */}
      <div className="action-buttons">
        <button id="generate-btn" className="btn btn-primary btn-hover-lift" onClick={onGenerate} aria-label="Generate">
          <TbWand size={16} /> Generate
        </button>
        <button id="regenerate-btn" className="btn btn-secondary btn-hover-lift" onClick={onGenerate} aria-label="Regenerate">
          <TbRefresh size={16} /> Regenerate
        </button>
        <button
          id="copy-btn"
          className={`btn ${hasCopied ? 'btn-accent' : 'btn-secondary'} btn-hover-lift`}
          onClick={onCopy}
          disabled={!generated}
          aria-label="Copy"
        >
          {hasCopied ? <TbCheck size={16} /> : <TbCopy size={16} />}
          {hasCopied ? 'Copied!' : 'Copy'}
        </button>
        <button id="export-btn" className="btn btn-emerald btn-hover-lift" onClick={onExport} disabled={!generated} aria-label="Export TXT">
          <TbDownload size={16} /> Export .txt
        </button>
      </div>
    </div>
  );
};

export default StringGenerator;
