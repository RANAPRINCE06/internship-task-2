/**
 * BackgroundEffects.jsx
 * Full-screen animated background: orbs, star field, grid overlay, wireframe cubes.
 * Stays fixed behind all content in both Light and Dark themes.
 */
import { useMemo } from 'react';

const ORBS = [
  { id: 1, w: 600, h: 600, color: '#6c63ff', style: { top: '-200px', left: '-200px' }, dur: '14s' },
  { id: 2, w: 500, h: 500, color: '#ec4899', style: { bottom: '-150px', right: '-100px' }, dur: '18s', delay: '-6s' },
  { id: 3, w: 350, h: 350, color: '#06b6d4', style: { top: '40%', left: '50%', transform: 'translateX(-50%)' }, dur: '11s', delay: '-3s' },
  { id: 4, w: 300, h: 300, color: '#a855f7', style: { top: '20%', right: '10%' }, dur: '16s', delay: '-8s' },
];

const rand = (a, b) => Math.random() * (b - a) + a;

const STARS = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  left: `${rand(0, 100)}%`,
  top:  `${rand(0, 100)}%`,
  size: rand(1, 3),
  op:   rand(0.2, 0.7),
  sd:   `${rand(2, 5)}s`,
  del:  `${rand(0, 4)}s`,
}));

const CUBE_CONFIGS = [
  { id: 1, size: 80,  style: { top: '15%',  left: '8%'  }, cr: '22s' },
  { id: 2, size: 50,  style: { top: '65%',  left: '5%'  }, cr: '30s' },
  { id: 3, size: 100, style: { top: '10%',  right: '6%' }, cr: '18s' },
  { id: 4, size: 60,  style: { bottom: '20%', right: '10%' }, cr: '25s' },
];

const Cube = ({ size, style, cr }) => {
  const half = size / 2;
  const faces = useMemo(() => [
    { transform: `rotateY(0deg) translateZ(${half}px)`,   w: size, h: size },
    { transform: `rotateY(180deg) translateZ(${half}px)`, w: size, h: size },
    { transform: `rotateX(90deg) translateZ(${half}px)`,  w: size, h: size },
    { transform: `rotateX(-90deg) translateZ(${half}px)`, w: size, h: size },
    { transform: `rotateY(90deg) translateZ(${half}px)`,  w: size, h: size },
    { transform: `rotateY(-90deg) translateZ(${half}px)`, w: size, h: size },
  ], [size, half]);

  return (
    <div
      className="cube-wrapper"
      style={{ ...style, width: size, height: size, '--cr': cr }}
    >
      {faces.map((f, i) => (
        <div
          key={i}
          className="cube-face"
          style={{ width: f.w, height: f.h, transform: f.transform,
            marginLeft: -half, marginTop: -half }}
        />
      ))}
    </div>
  );
};

const BackgroundEffects = () => (
  <div className="bg-scene" aria-hidden="true">
    {/* Floating orbs */}
    {ORBS.map((o) => (
      <div
        key={o.id}
        className="bg-orb"
        style={{
          width: o.w, height: o.h, background: o.color,
          ...o.style, '--dur': o.dur,
          animationDelay: o.delay || '0s',
        }}
      />
    ))}

    {/* Star field */}
    <div className="star-field">
      {STARS.map((s) => (
        <div
          key={s.id}
          className="star"
          style={{
            left: s.left, top: s.top,
            width: s.size, height: s.size,
            '--op': s.op, '--sd': s.sd, '--del': s.del,
          }}
        />
      ))}
    </div>

    {/* Grid overlay */}
    <div className="grid-overlay" />

    {/* Wireframe cubes */}
    {CUBE_CONFIGS.map((c) => (
      <Cube key={c.id} size={c.size} style={c.style} cr={c.cr} />
    ))}
  </div>
);

export default BackgroundEffects;
