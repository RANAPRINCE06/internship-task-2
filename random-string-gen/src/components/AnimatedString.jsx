/**
 * AnimatedString.jsx
 * Scramble-reveal animation for the generated string.
 * Characters are revealed one by one with a scramble effect using useEffect.
 */
import { useState, useEffect, useRef } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

const AnimatedString = ({ value }) => {
  const [display, setDisplay] = useState(value);
  const prevRef = useRef(value);
  const rafRef  = useRef(null);

  useEffect(() => {
    if (!value) { setDisplay(''); return; }
    if (prevRef.current === value) return;
    prevRef.current = value;

    let frame = 0;
    const totalFrames = value.length * 3;

    const animate = () => {
      frame++;
      const revealedCount = Math.floor((frame / totalFrames) * value.length);
      const scrambled = value
        .split('')
        .map((ch, i) => {
          if (i < revealedCount) return ch;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join('');
      setDisplay(scrambled);
      if (frame < totalFrames) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setDisplay(value);
      }
    };

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(animate);

    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [value]);

  if (!display) return null;

  return (
    <span style={{ letterSpacing: '0.06em', lineHeight: 1.9, wordBreak: 'break-all' }}>
      {display.split('').map((ch, i) => (
        <span
          key={i}
          className="animated-string-char"
          style={{
            color: i < (prevRef.current === value ? value.length : 0) ? 'inherit' : '#a78bfa',
            transition: 'color 0.1s',
          }}
        >
          {ch}
        </span>
      ))}
    </span>
  );
};

export default AnimatedString;
