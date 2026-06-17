/**
 * StrengthMeter.jsx — Strength bars + stat chips (no framer-motion).
 */
import { useMemo } from 'react';
import { TbShieldOff, TbShield, TbShieldCheck, TbLock, TbBolt } from 'react-icons/tb';

const LEVELS = {
  none:   { label: 'No String',    desc: 'Generate a string to analyse',     bars: 0, cls: 'none',   Icon: TbShieldOff,   color: '#475569' },
  weak:   { label: 'Weak',         desc: 'Short or low character variety',    bars: 1, cls: 'weak',   Icon: TbShieldOff,   color: '#ef4444' },
  medium: { label: 'Medium',       desc: 'Decent — add more variety',         bars: 2, cls: 'medium', Icon: TbShield,      color: '#f59e0b' },
  strong: { label: 'Strong 🔥',    desc: 'High entropy — very hard to crack', bars: 3, cls: 'strong', Icon: TbShieldCheck, color: '#10b981' },
};

const calcStrength = (str, opts) => {
  if (!str) return 'none';
  const types = Object.values(opts).filter(Boolean).length;
  const len   = str.length;
  if (len >= 20 && types >= 3) return 'strong';
  if (len >= 12 && types >= 2) return 'medium';
  if (len >=  6 && types >= 1) return 'medium';
  return 'weak';
};

const StrengthMeter = ({ generatedString, options }) => {
  const level = useMemo(() => calcStrength(generatedString, options), [generatedString, options]);
  const cfg   = LEVELS[level];
  const { Icon } = cfg;

  const stats = useMemo(() => {
    const s = generatedString;
    if (!s) return null;
    const types   = Object.values(options).filter(Boolean).length;
    const poolEst = types * 20;
    return {
      len:     s.length,
      entropy: Math.round(s.length * Math.log2(poolEst || 1)),
      upper:   (s.match(/[A-Z]/g) || []).length,
      lower:   (s.match(/[a-z]/g) || []).length,
      nums:    (s.match(/[0-9]/g) || []).length,
      special: (s.match(/[^a-zA-Z0-9]/g) || []).length,
    };
  }, [generatedString, options]);

  return (
    <div className="strength-card glass-card anim-fade-left" style={{ animationDelay: '0.15s' }}>
      <p className="section-label">Strength Analysis</p>

      <div className="strength-display">
        <div className={`strength-icon-wrap ${cfg.cls}`}>
          <Icon size={26} color={cfg.color} />
        </div>
        <div>
          <div className={`strength-label ${cfg.cls}`}>{cfg.label}</div>
          <div className="strength-desc">{cfg.desc}</div>
        </div>
      </div>

      <div className="strength-bars" role="meter" aria-label={`Strength: ${cfg.label}`} aria-valuenow={cfg.bars} aria-valuemin={0} aria-valuemax={3}>
        {[1, 2, 3].map((n) => (
          <div key={n} className={`strength-bar ${n <= cfg.bars ? `filled ${cfg.cls}` : ''}`} />
        ))}
      </div>

      <div className="strength-stats">
        {[
          { label: 'Length',        value: stats?.len,     icon: <TbLock size={9} style={{ marginRight: 3 }} /> },
          { label: 'Entropy ~bits', value: stats?.entropy, icon: <TbBolt size={9} style={{ marginRight: 3 }} /> },
          { label: 'Uppercase',     value: stats?.upper },
          { label: 'Lowercase',     value: stats?.lower },
          { label: 'Numbers',       value: stats?.nums },
          { label: 'Special',       value: stats?.special },
        ].map(({ label, value, icon }) => (
          <div key={label} className="stat-chip">
            <div className="stat-chip-label">{icon}{label}</div>
            <div className="stat-chip-value">{value ?? '—'}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StrengthMeter;
