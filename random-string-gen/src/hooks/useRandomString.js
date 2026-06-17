/**
 * useRandomString.js
 * Custom hook encapsulating all string generation logic,
 * localStorage persistence, and history management.
 *
 * Exports: { length, setLength, options, setOptions,
 *             generated, history, copyStatus,
 *             generateString, handleCopy, clearHistory,
 *             validation, exportTxt }
 */
import { useState, useCallback, useEffect } from 'react';

const POOLS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers:   '0123456789',
  special:   '!@#$%^&*()-_=+[]{}|;:,.<>?',
};

const buildPool = (opts) =>
  Object.entries(opts).filter(([, v]) => v).map(([k]) => POOLS[k]).join('');

const cryptoRand = (len, pool) => {
  if (!pool) return '';
  const arr = new Uint32Array(len);
  try { window.crypto.getRandomValues(arr); } catch { /* fallback */ }
  return Array.from(arr, (v) => pool[v % pool.length]).join('');
};

const LS_HISTORY = 'rf3_history';
const LS_PREFS   = 'rf3_prefs';

const loadHistory = () => {
  try { return JSON.parse(localStorage.getItem(LS_HISTORY) || '[]'); } catch { return []; }
};
const saveHistory = (h) => {
  try { localStorage.setItem(LS_HISTORY, JSON.stringify(h)); } catch {}
};
const loadPrefs = () => {
  try {
    return JSON.parse(localStorage.getItem(LS_PREFS) || 'null') || {
      length: 16,
      options: { uppercase: true, lowercase: true, numbers: true, special: false },
    };
  } catch {
    return { length: 16, options: { uppercase: true, lowercase: true, numbers: true, special: false } };
  }
};
const savePrefs = (prefs) => {
  try { localStorage.setItem(LS_PREFS, JSON.stringify(prefs)); } catch {}
};

export const useRandomString = () => {
  // useEffect: restore preferences from localStorage on mount
  const savedPrefs = loadPrefs();

  const [length,     setLength]     = useState(savedPrefs.length);
  const [options,    setOptions]    = useState(savedPrefs.options);
  const [generated,  setGenerated]  = useState('');
  const [history,    setHistory]    = useState(loadHistory);
  const [copyStatus, setCopyStatus] = useState('idle');
  const [validation, setValidation] = useState('');

  // useEffect: persist preferences whenever they change
  useEffect(() => {
    savePrefs({ length, options });
  }, [length, options]);

  // useCallback: memoized string generator to avoid re-creation on every render
  const generateString = useCallback(() => {
    const pool = buildPool(options);
    if (!pool) {
      setValidation('⚠ Select at least one character type.');
      setGenerated('');
      return;
    }
    setValidation('');
    const str = cryptoRand(length, pool);
    setGenerated(str);
    setHistory((prev) => {
      const next = [{ id: Date.now(), value: str }, ...prev].slice(0, 10);
      saveHistory(next);
      return next;
    });
  }, [length, options]);

  // useEffect: auto-regenerate whenever length or options change
  useEffect(() => {
    generateString();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length, options.uppercase, options.lowercase, options.numbers, options.special]);

  // Copy to clipboard
  const handleCopy = useCallback(async () => {
    if (!generated) return;
    try {
      await navigator.clipboard.writeText(generated);
      setCopyStatus('copied');
      setTimeout(() => setCopyStatus('idle'), 2200);
    } catch { setCopyStatus('error'); setTimeout(() => setCopyStatus('idle'), 2000); }
  }, [generated]);

  // Clear history
  const clearHistory = useCallback(() => {
    setHistory([]); saveHistory([]);
  }, []);

  // Export as .txt file
  const exportTxt = useCallback(() => {
    if (!generated) return;
    const blob = new Blob([generated], { type: 'text/plain' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url; a.download = `string-${Date.now()}.txt`;
    a.click(); URL.revokeObjectURL(url);
  }, [generated]);

  return {
    length, setLength,
    options, setOptions,
    generated,
    history, clearHistory,
    copyStatus, handleCopy,
    validation,
    generateString,
    exportTxt,
  };
};
