/**
 * ThemeToggle.jsx — Animated pill toggle (CSS transitions only).
 */
import { TbSun, TbMoon } from 'react-icons/tb';

const ThemeToggle = ({ theme, onToggle }) => {
  const isDark = theme === 'dark';
  return (
    <button
      id="theme-toggle-btn"
      className="theme-toggle"
      onClick={onToggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span className="theme-toggle-knob">
        {isDark ? <TbMoon size={13} color="#fff" /> : <TbSun size={13} color="#fff" />}
      </span>
    </button>
  );
};

export default ThemeToggle;
