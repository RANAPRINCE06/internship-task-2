/**
 * FloatingParticles.jsx
 * Renders subtle floating particles with parallax movement tied to mouse position.
 * Uses useEffect + mousemove listener.
 */
import { useEffect, useRef, useMemo } from 'react';

const rand = (a, b) => Math.random() * (b - a) + a;

const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  left:   `${rand(5, 95)}%`,
  top:    `${rand(5, 95)}%`,
  size:   rand(3, 8),
  color:  ['#6c63ff','#a855f7','#ec4899','#06b6d4','#3b82f6'][Math.floor(rand(0,5))],
  op:     rand(0.25, 0.55),
  pd:     `${rand(12, 28)}s`,
  del:    `${rand(0, 10)}s`,
  tx:     `${rand(-60, 60)}px`,
  ty:     `${rand(-60, 60)}px`,
  speed:  rand(0.01, 0.04),
}));

const FloatingParticles = () => {
  const containerRef = useRef(null);

  // useEffect: parallax movement on mouse move
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      const cx = window.innerWidth  / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;

      container.querySelectorAll('[data-speed]').forEach((el) => {
        const speed = parseFloat(el.dataset.speed);
        el.style.transform = `translate(${dx * speed * 60}px, ${dy * speed * 60}px)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}
      aria-hidden="true"
    >
      {PARTICLES.map((p) => (
        <div
          key={p.id}
          data-speed={p.speed}
          className="particle"
          style={{
            left: p.left, top: p.top,
            width: p.size, height: p.size,
            background: p.color,
            '--op': p.op, '--pd': p.pd, '--del': p.del,
            '--tx': p.tx, '--ty': p.ty,
            transition: 'transform 0.8s cubic-bezier(0.4,0,0.2,1)',
          }}
        />
      ))}
    </div>
  );
};

export default FloatingParticles;
