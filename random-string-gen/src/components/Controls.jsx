/**
 * Controls.jsx — Slider + character type toggle grid (no framer-motion).
 */
import { useCallback } from 'react';
import { TbLetterCaseUpper, TbLetterCaseLower, TbNumbers, TbAt } from 'react-icons/tb';

const TOGGLES = [
  { key: 'uppercase', label: 'Uppercase', sample: 'A – Z', Icon: TbLetterCaseUpper, color: '#a78bfa', bg: 'rgba(167,139,250,0.18)', itemColor: '#a78bfa' },
  { key: 'lowercase', label: 'Lowercase', sample: 'a – z', Icon: TbLetterCaseLower, color: '#38bdf8', bg: 'rgba(56,189,248,0.18)',  itemColor: '#38bdf8' },
  { key: 'numbers',   label: 'Numbers',   sample: '0 – 9', Icon: TbNumbers,          color: '#34d399', bg: 'rgba(52,211,153,0.18)',  itemColor: '#34d399' },
  { key: 'special',   label: 'Special',   sample: '!@#$%', Icon: TbAt,               color: '#fb923c', bg: 'rgba(251,146,60,0.18)',  itemColor: '#fb923c' },
];

const Controls = ({ length, setLength, options, setOptions }) => {
  const pct = `${((length - 1) / 49) * 100}%`;

  const handleToggle = useCallback(
    (key) => setOptions((p) => ({ ...p, [key]: !p[key] })),
    [setOptions]
  );

  return (
    <div className="controls-card glass-card anim-fade-up" style={{ animationDelay: '0.1s' }}>
      {/* Slider */}
      <div className="slider-section">
        <p className="section-label">String Length</p>
        <div className="slider-header">
          <span className="slider-label">Characters</span>
          <span className="slider-value-badge">{length}</span>
        </div>
        <input
          id="length-slider" type="range" min={1} max={50}
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="range-slider"
          style={{ '--pct': pct }}
          aria-label="String length" aria-valuemin={1} aria-valuemax={50} aria-valuenow={length}
        />
        <div className="slider-marks">
          {[1, 10, 20, 30, 40, 50].map((m) => (
            <span key={m} className="slider-mark">{m}</span>
          ))}
        </div>
      </div>

      {/* Toggles */}
      <p className="section-label">Character Types</p>
      <div className="toggles-grid">
        {TOGGLES.map(({ key, label, sample, Icon, color, bg, itemColor }) => {
          const isOn = options[key];
          return (
            <div
              key={key}
              className={`toggle-item ${isOn ? 'active' : ''}`}
              style={{ '--item-color': itemColor }}
              onClick={() => handleToggle(key)}
              role="switch" aria-checked={isOn} tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleToggle(key)}
            >
              <div className="toggle-inner">
                <div className="toggle-icon-wrap" style={{ background: bg }}>
                  <Icon color={color} size={17} />
                </div>
                <div>
                  <div className="toggle-label">{label}</div>
                  <div className="toggle-sample">{sample}</div>
                </div>
              </div>
              <label className="toggle-switch" htmlFor={`chk-${key}`} onClick={(e) => e.stopPropagation()}>
                <input
                  id={`chk-${key}`} type="checkbox" checked={isOn}
                  onChange={() => handleToggle(key)} aria-label={`Include ${label}`}
                />
                <span className="toggle-track" />
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Controls;
