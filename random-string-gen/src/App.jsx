/**
 * App.jsx — RandomForge v3.0
 * Root component. Manages theme state via useState + useEffect (localStorage).
 * All string-generation state lives in the useRandomString custom hook.
 *
 * useState:  theme ('dark' | 'light')
 * useEffect: apply data-theme to <html>, persist to localStorage
 * useCallback: toggleTheme
 */
import { useState, useEffect, useCallback } from 'react';
import './App.css';

import { useRandomString }  from './hooks/useRandomString';
import BackgroundEffects    from './components/BackgroundEffects';
import FloatingParticles    from './components/FloatingParticles';
import Header               from './components/Header';
import StringGenerator      from './components/StringGenerator';
import Controls             from './components/Controls';
import StrengthMeter        from './components/StrengthMeter';
import History              from './components/History';

const LS_THEME  = 'rf3_theme';
const loadTheme = () => localStorage.getItem(LS_THEME) || 'dark';

const App = () => {
  /* ── useState: theme ─────────────────────────────────────── */
  const [theme, setTheme] = useState(loadTheme);

  /* ── useEffect: apply theme to <html> + persist ──────────── */
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(LS_THEME, theme);
  }, [theme]);

  /* ── useCallback: toggle theme ───────────────────────────── */
  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  }, []);

  /* ── All string logic from custom hook ───────────────────── */
  const {
    length, setLength,
    options, setOptions,
    generated,
    history, clearHistory,
    copyStatus, handleCopy,
    validation,
    generateString,
    exportTxt,
  } = useRandomString();

  return (
    <div className="app-wrapper" data-theme={theme}>
      {/* Fixed animated background */}
      <BackgroundEffects />
      <FloatingParticles />

      {/* Header */}
      <Header theme={theme} onToggle={toggleTheme} />

      <main className="main-content" role="main" id="main-content" style={{ position: 'relative', zIndex: 1 }}>
        {/* Hero */}
        <div className="page-hero anim-fade-up">
          <h1 className="page-hero-title">Generate Secure Strings</h1>
          <p className="page-hero-sub">
            Cryptographically strong random strings — instantly.
          </p>
          <div className="page-hero-chips">
            {['useState', 'useCallback', 'useEffect', 'Crypto API', 'localStorage'].map((c) => (
              <span key={c} className="hero-chip">{c}</span>
            ))}
          </div>
        </div>

        {/* Dashboard */}
        <div className="dashboard-grid">
          {/* Left */}
          <div className="dashboard-left">
            <StringGenerator
              generated={generated}
              validation={validation}
              copyStatus={copyStatus}
              onGenerate={generateString}
              onCopy={handleCopy}
              onExport={exportTxt}
            />
            <Controls
              length={length}
              setLength={setLength}
              options={options}
              setOptions={setOptions}
            />
          </div>

          {/* Right */}
          <div className="dashboard-right">
            <StrengthMeter generatedString={generated} options={options} />
            <History history={history} onClear={clearHistory} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
