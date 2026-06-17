/**
 * Header.jsx — Sticky glassmorphism nav with animated brand + theme toggle.
 */
import keybankLogo from '../assets/keybank-logo.png';
import ThemeToggle from './ThemeToggle';

const Header = ({ theme, onToggle }) => (
  <header className="header anim-slide-down" role="banner">
    <div className="header-inner">
      <div className="header-brand">
        <img
          src={keybankLogo}
          alt="KeyBank Logo"
          style={{ height: '40px', width: 'auto', objectFit: 'contain', borderRadius: '6px' }}
        />
        <div>
          <div className="header-title">RandomForge</div>
          <div className="header-subtitle">String &amp; Password Generator</div>
        </div>
      </div>
      <div className="header-right">
        <ThemeToggle theme={theme} onToggle={onToggle} />
      </div>
    </div>
  </header>
);

export default Header;
