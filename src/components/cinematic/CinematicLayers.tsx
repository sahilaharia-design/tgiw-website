import { useEffect, useRef } from 'react';

/**
 * CinematicLayers — global environmental systems.
 * Mounted once at App root. Persists across all page navigations.
 *
 * Depth order (z-index):
 *   0  room-ambient     — cross-fading room glow overlay (opacity cross-fade on section entry)
 *   0  canopy-drift     — marigold ceiling gradient, slow CSS oscillation
 *   1  particle-canvas  — slow gold dust ceiling (canvas)
 *   2  petal-canvas     — marigold / saffron drift (canvas)
 *   3  jaali-overlay    — Mughal lattice; translateY(y*0.06) + rotate(y*0.003deg)
 *   4  vignette-breath  — soft breathing edge vignette (CSS animation)
 *  10  celebrate-canvas — fireworks / sparks at emotional moments
 *
 * Respects prefers-reduced-motion: all canvas animation loops are gated.
 */

// Per-room ambient glow — vibrant, saturated, grand wedding energy
const ROOM_GLOWS: Record<string, string> = {
  'entry': [
    'radial-gradient(ellipse 92% 55% at 50% -5%,  oklch(72% 0.22 65  / 0.45) 0%, transparent 52%)',
    'radial-gradient(ellipse 40% 30% at  8% 92%,  oklch(32% 0.22 18  / 0.35) 0%, transparent 55%)',
    'radial-gradient(ellipse 35% 25% at 92% 88%,  oklch(52% 0.28 345 / 0.25) 0%, transparent 55%)',
  ].join(', '),
  'rose-silk': [
    'radial-gradient(ellipse 80% 55% at 70%  8%,  oklch(52% 0.28 345 / 0.45) 0%, transparent 55%)',
    'radial-gradient(ellipse 55% 40% at 18% 80%,  oklch(72% 0.22 65  / 0.28) 0%, transparent 55%)',
  ].join(', '),
  'spotlight': [
    'radial-gradient(ellipse 55% 78% at 50% -14%, oklch(72% 0.22 65  / 0.55) 0%, transparent 55%)',
    'radial-gradient(ellipse 30% 40% at 50%  48%, oklch(76% 0.22 72  / 0.35) 0%, transparent 60%)',
  ].join(', '),
  'parchment': [
    'radial-gradient(ellipse 72% 55% at 18%  0%,  oklch(76% 0.22 72  / 0.40) 0%, transparent 55%)',
    'radial-gradient(ellipse 40% 30% at 85% 85%,  oklch(72% 0.22 65  / 0.20) 0%, transparent 55%)',
  ].join(', '),
  'mystery': [
    'radial-gradient(ellipse 60% 50% at 50%  45%, oklch(30% 0.18 270 / 0.38) 0%, transparent 65%)',
    'radial-gradient(ellipse 80% 40% at 50% -10%, oklch(32% 0.22 18  / 0.25) 0%, transparent 55%)',
  ].join(', '),
  'cohort': [
    'radial-gradient(ellipse 75% 55% at 50%  -5%, oklch(28% 0.14 165 / 0.40) 0%, transparent 58%)',
    'radial-gradient(ellipse 40% 35% at 85%  90%, oklch(72% 0.22 65  / 0.18) 0%, transparent 55%)',
  ].join(', '),
  'collector': [
    'radial-gradient(ellipse 65% 50% at 50%  40%, oklch(74% 0.12 80  / 0.12) 0%, transparent 65%)',
    'radial-gradient(ellipse 80% 40% at 50% -10%, oklch(32% 0.22 18  / 0.28) 0%, transparent 50%)',
  ].join(', '),
  'questions': [
    'radial-gradient(ellipse 65% 40% at 50%  -5%, oklch(76% 0.22 72  / 0.30) 0%, transparent 58%)',
  ].join(', '),
  'guestlist': [
    'radial-gradient(ellipse 68% 50% at 50%   8%, oklch(52% 0.28 345 / 0.28) 0%, transparent 58%)',
    'radial-gradient(ellipse 40% 30% at 15%  85%, oklch(72% 0.22 65  / 0.18) 0%, transparent 55%)',
  ].join(', '),
};

export default function CinematicLayers() {
  const particleRef = useRef<HTMLCanvasElement>(null);
  const petalRef    = useRef<HTMLCanvasElement>(null);
  const celebRef    = useRef<HTMLCanvasElement>(null);
  const jaaliRef    = useRef<HTMLDivElement>(null);
  const ambientRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pCanvas = particleRef.current!;
    const fCanvas = petalRef.current!;
    const cCanvas = celebRef.current!;
    const jaali   = jaaliRef.current!;
    const ambient = ambientRef.current!;
    if (!pCanvas || !fCanvas || !cCanvas || !jaali || !ambient) return;

    // ── REDUCED MOTION GATE ─────────────────────────────────────
    // Canvas animation loops are skipped. CSS transitions/animations still run.
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const pCtx = pCanvas.getContext('2d')!;
    const fCtx = fCanvas.getContext('2d')!;
    const cCtx = cCanvas.getContext('2d')!;

    let W = 0, H = 0;
    const rafs: number[] = [];

    function resize() {
      W = window.innerWidth;
      H = window.innerHeight;
      pCanvas.width = fCanvas.width = cCanvas.width = W;
      pCanvas.height = fCanvas.height = cCanvas.height = H;
    }
    resize();

    // ── SCROLL: parallax at multiple speeds ─────────────────────
    // jaali:   translateY(y * 0.06) + rotate(y * 0.003deg) — slightly faster than particles
    // ambient: translateY(y * 0.02)                         — mid-speed gradient drift
    let scrollTicking = false;
    function onScroll() {
      if (!scrollTicking) {
        requestAnimationFrame(() => {
          const y = window.scrollY;
          // Jaali: translate + subtle rotate (angle shifts slightly between sections)
          jaali.style.transform = `translateY(${y * 0.06}px) rotate(${y * 0.003}deg)`;
          // Ambient glow: slower parallax (feels deeper / farther away)
          ambient.style.transform = `translateY(${y * 0.02}px)`;
          // CSS variable for any component that wants scroll position
          document.documentElement.style.setProperty('--scroll-y', `${y}px`);
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });

    // ── ROOM AMBIENT CROSS-FADE ─────────────────────────────────
    // Fade out → swap gradient → fade in. CSS opacity transition handles the curve.
    let crossFadeTimer: ReturnType<typeof setTimeout>;
    let currentRoom = '';
    function transitionRoom(room: string) {
      const glow = ROOM_GLOWS[room];
      if (!glow || room === currentRoom) return;
      currentRoom = room;
      clearTimeout(crossFadeTimer);
      ambient.style.opacity = '0';
      crossFadeTimer = setTimeout(() => {
        ambient.style.background = glow;
        ambient.style.opacity = '1';
      }, 480); // Change background after opacity reaches ~0
    }

    // ── SECTION ROOM LIGHTING ───────────────────────────────────
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        // Find the most-intersecting visible room
        let maxRatio = 0;
        let activeRoom = '';
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            activeRoom = (entry.target as HTMLElement).dataset.room ?? '';
          }
        }
        if (activeRoom) transitionRoom(activeRoom);
      },
      { threshold: [0.2, 0.4, 0.6] }
    );
    // Observe after a tick so Home.tsx sections have mounted
    const observeTimer = setTimeout(() => {
      document.querySelectorAll('[data-room]').forEach(el => sectionObserver.observe(el));
    }, 150);

    if (reducedMotion) {
      // Still wire up room lighting + celebrations at reduced fidelity
      (window as any)._celebrate     = () => {};
      (window as any)._distantFireworks = () => {};
      return () => {
        clearTimeout(crossFadeTimer);
        clearTimeout(observeTimer);
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', resize);
        sectionObserver.disconnect();
        delete (window as any)._celebrate;
        delete (window as any)._distantFireworks;
      };
    }

    // ── INITIAL CELEBRATION: fireworks burst on page load ───────
    if (!reducedMotion) {
      setTimeout(() => distantFireworks(1.1), 1800);
    }

    // ── GOLD PARTICLE SYSTEM ────────────────────────────────────
    // Vivid marigold + saffron + hot pink + classic gold mix
    const GOLD_COLORS = [
      '#FF8C00', // vivid marigold orange
      '#FFD700', // bright gold
      '#FFA500', // saffron
      '#FF6B00', // deep saffron
      '#C9A84C', // classic antique gold
      '#FF1493', // hot pink / magenta
      '#FF4500', // orange-red
      '#DFC07A', // warm gold
    ];

    interface Particle {
      x: number; y: number; r: number;
      vy: number; vx: number;
      alpha: number; color: string;
      tw: number; tws: number;
    }

    function makeParticle(): Particle {
      return {
        x: Math.random() * W,
        y: Math.random() * H + H,
        r: Math.random() * 1.6 + 0.3,
        vy: -(Math.random() * 0.42 + 0.10),
        vx: (Math.random() - 0.5) * 0.28,
        alpha: Math.random() * 0.45 + 0.06,
        color: GOLD_COLORS[Math.floor(Math.random() * GOLD_COLORS.length)],
        tw: Math.random() * Math.PI * 2,
        tws: Math.random() * 0.014 + 0.004,
      };
    }

    let particles: Particle[] = Array.from({ length: 55 }, () => {
      const p = makeParticle(); p.y = Math.random() * H; return p;
    });

    function drawParticles() {
      pCtx.clearRect(0, 0, W, H);
      for (const p of particles) {
        p.y += p.vy; p.x += p.vx; p.tw += p.tws;
        // Particles concentrate more in upper 60% (canopy effect)
        const yFade = p.y < H * 0.6 ? 1.0 : Math.max(0, 1 - (p.y - H * 0.6) / (H * 0.4));
        const a = p.alpha * (0.60 + 0.40 * Math.sin(p.tw)) * yFade;
        pCtx.globalAlpha = a;
        pCtx.fillStyle = p.color;
        pCtx.beginPath();
        pCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        pCtx.fill();
        if (p.y < -10)    { Object.assign(p, makeParticle()); p.y = H + 10; }
        if (p.x < -10)    p.x = W + 10;
        if (p.x > W + 10) p.x = -10;
      }
      pCtx.globalAlpha = 1;
      rafs.push(requestAnimationFrame(drawParticles));
    }
    drawParticles();

    // ── PETAL SYSTEM ────────────────────────────────────────────
    // Vibrant wedding petals: marigold, saffron, hot pink, crimson, gold-yellow
    const PETAL_COLORS = [
      { r:255, g:140, b:0   }, // vivid marigold orange
      { r:255, g:80,  b:30  }, // bright saffron
      { r:220, g:20,  b:100 }, // hot pink / magenta
      { r:200, g:0,   b:40  }, // deep crimson rose
      { r:255, g:200, b:0   }, // bright gold-yellow
      { r:255, g:100, b:0   }, // deep saffron
    ];

    interface Petal {
      x: number; y: number; size: number; angle: number; spin: number;
      vy: number; vx: number; sway: number; swaySpeed: number; swayAmt: number;
      alpha: number; r: number; g: number; b: number;
    }

    function makePetal(): Petal {
      const c = PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)];
      return {
        x: Math.random() * W,
        y: Math.random() * H * 1.6 - H * 0.3,
        size: Math.random() * 6 + 3,
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.012,
        vy: Math.random() * 0.32 + 0.10,
        vx: (Math.random() - 0.5) * 0.20,
        sway: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.007 + 0.003,
        swayAmt: Math.random() * 0.5 + 0.2,
        alpha: Math.random() * 0.16 + 0.04,
        r: c.r, g: c.g, b: c.b,
      };
    }

    let petals: Petal[] = Array.from({ length: 26 }, makePetal);

    function drawPetals() {
      fCtx.clearRect(0, 0, W, H);
      for (const p of petals) {
        p.y += p.vy;
        p.sway += p.swaySpeed;
        p.x += p.vx + Math.sin(p.sway) * p.swayAmt;
        p.angle += p.spin;
        fCtx.save();
        fCtx.translate(p.x, p.y);
        fCtx.rotate(p.angle);
        fCtx.globalAlpha = p.alpha;
        fCtx.fillStyle = `rgb(${p.r},${p.g},${p.b})`;
        fCtx.beginPath();
        fCtx.ellipse(0, 0, p.size * 0.38, p.size, 0, 0, Math.PI * 2);
        fCtx.fill();
        fCtx.restore();
        if (p.y > H + 20) { Object.assign(p, makePetal()); p.y = -20; p.x = Math.random() * W; }
      }
      rafs.push(requestAnimationFrame(drawPetals));
    }
    drawPetals();

    // ── CELEBRATION + DISTANT FIREWORKS SYSTEM ──────────────────
    const CONFETTI_COLORS = [
      '#FF8C00', // marigold
      '#FFD700', // gold
      '#FF1493', // hot pink
      '#DC143C', // crimson
      '#FF6B00', // saffron
      '#C9A84C', // antique gold
      '#FF4500', // orange-red
      '#F0D890', // pale gold
      '#FF69B4', // rose pink
    ];

    interface CelebParticle {
      type: 'confetti' | 'spark' | 'firework' | 'bloom';
      x: number; y: number; vx: number; vy: number; gravity: number;
      size?: number; rot?: number; rotV?: number; isRect?: boolean;
      len?: number; r?: number;
      color: string; alpha: number; fade: number;
    }

    let celebParticles: CelebParticle[] = [];
    let celebActive = false;
    let celebRaf = 0;

    function burst(ox: number, oy: number, intensity = 1) {
      const count = Math.floor(40 * intensity);
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 7 * intensity + 2;
        celebParticles.push({
          type: 'confetti',
          x: ox, y: oy,
          vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed - 4,
          gravity: 0.18,
          size: Math.random() * 5 + 2,
          rot: Math.random() * Math.PI * 2,
          rotV: (Math.random() - 0.5) * 0.2,
          color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
          alpha: 1, fade: Math.random() * 0.012 + 0.006,
          isRect: Math.random() > 0.4,
        });
      }
      for (let i = 0; i < Math.floor(16 * intensity); i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 3;
        celebParticles.push({
          type: 'spark',
          x: ox, y: oy,
          vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed - 2,
          gravity: 0.12,
          len: Math.random() * 18 + 8,
          color: CONFETTI_COLORS[Math.floor(Math.random() * 3)],
          alpha: 1, fade: Math.random() * 0.018 + 0.010,
        });
      }
      if (!celebActive) { celebActive = true; celebLoop(); }
    }

    /** Distant fireworks — elegant arcing trails from lower screen to upper */
    function distantFireworks(intensity = 1) {
      const sites = Math.floor(3 * intensity) + 2;
      for (let s = 0; s < sites; s++) {
        setTimeout(() => {
          // Arc from lower third, burst in upper 8–25%
          const lx = W * (0.2 + Math.random() * 0.6);
          const ly = H * (0.52 + Math.random() * 0.28);
          const bx = lx + (Math.random() - 0.5) * 200;
          const by = H * (0.08 + Math.random() * 0.22);

          // Trailing sparks along the trajectory
          for (let i = 0; i < 10; i++) {
            const t = i / 10;
            celebParticles.push({
              type: 'spark',
              x: lx + (bx - lx) * t,
              y: ly + (by - ly) * t,
              vx: 0, vy: -0.3,
              gravity: 0,
              len: 14,
              color: '#DFC07A',
              alpha: 0.4 + t * 0.5,
              fade: 0.022,
            });
          }

          // Radial bloom flash at burst point
          celebParticles.push({
            type: 'bloom',
            x: bx, y: by,
            vx: 0, vy: 0, gravity: 0,
            r: 0,
            color: CONFETTI_COLORS[Math.floor(Math.random() * 3)],
            alpha: 0.65, fade: 0.016,
          });

          // Gold spark trails radiating — near-weightless (gravity: 0.05)
          for (let i = 0; i < Math.floor(24 * intensity); i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 3.5 + 1.5;
            celebParticles.push({
              type: 'spark',
              x: bx, y: by,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed - 1.2,
              gravity: 0.05, // near-weightless — drifts elegantly
              len: Math.random() * 26 + 10,
              color: CONFETTI_COLORS[Math.floor(Math.random() * 4)],
              alpha: 0.80, fade: 0.010 + Math.random() * 0.008,
            });
          }

          if (!celebActive) { celebActive = true; celebLoop(); }
        }, s * 190);
      }
    }

    function celebLoop() {
      cCtx.clearRect(0, 0, W, H);
      celebParticles = celebParticles.filter(p => p.alpha > 0.01);

      for (const p of celebParticles) {
        p.vy += p.gravity;
        p.x += p.vx; p.y += p.vy;
        p.alpha -= p.fade;

        if (p.type === 'confetti') {
          p.rot! += p.rotV!;
          cCtx.save();
          cCtx.globalAlpha = Math.max(0, p.alpha);
          cCtx.fillStyle = p.color;
          cCtx.translate(p.x, p.y);
          cCtx.rotate(p.rot!);
          if (p.isRect) cCtx.fillRect(-p.size! / 2, -p.size! / 2, p.size!, p.size! * 0.5);
          else { cCtx.beginPath(); cCtx.arc(0, 0, p.size! * 0.45, 0, Math.PI * 2); cCtx.fill(); }
          cCtx.restore();
        } else if (p.type === 'spark') {
          const nx = p.x - p.vx * 0.75;
          const ny = p.y - p.vy * 0.75;
          cCtx.beginPath(); cCtx.moveTo(nx, ny); cCtx.lineTo(p.x, p.y);
          cCtx.strokeStyle = p.color;
          cCtx.globalAlpha = Math.max(0, p.alpha);
          cCtx.lineWidth = 1.3;
          cCtx.stroke();
        } else if (p.type === 'bloom') {
          p.r = (p.r || 0) + 2.8;
          const grad = cCtx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r!);
          grad.addColorStop(0, p.color + 'bb');
          grad.addColorStop(1, p.color + '00');
          cCtx.globalAlpha = Math.max(0, p.alpha);
          cCtx.beginPath();
          cCtx.arc(p.x, p.y, p.r!, 0, Math.PI * 2);
          cCtx.fillStyle = grad;
          cCtx.fill();
        }
      }
      cCtx.globalAlpha = 1;

      if (celebParticles.length > 0) {
        celebRaf = requestAnimationFrame(celebLoop);
      } else {
        celebActive = false;
        cCtx.clearRect(0, 0, W, H);
      }
    }

    // ── GLOBAL CELEBRATION API ──────────────────────────────────
    (window as any)._celebrate = function(el: Element | null, intensity?: number) {
      if (el) {
        const rect = el.getBoundingClientRect();
        burst(rect.left + rect.width / 2, rect.top + rect.height / 2, intensity ?? 1);
      } else {
        burst(W / 2, H * 0.4, intensity ?? 1);
      }
    };
    (window as any)._distantFireworks = (intensity?: number) => distantFireworks(intensity ?? 1);

    // Delegated click celebration — wire up CTAs without needing per-component wiring
    function handleClick(e: MouseEvent) {
      const target = (e.target as Element).closest('.btn-primary, .btn-ghost, .cta, .cta-ghost');
      if (target) (window as any)._celebrate(target, 1.0);
    }
    function handleSubmit(e: SubmitEvent) {
      setTimeout(() => (window as any)._celebrate(e.target as Element, 1.3), 200);
    }
    document.addEventListener('click', handleClick, { passive: true });
    document.addEventListener('submit', handleSubmit as EventListener, { passive: true });

    window.addEventListener('resize', resize);

    return () => {
      rafs.forEach(id => cancelAnimationFrame(id));
      cancelAnimationFrame(celebRaf);
      clearTimeout(crossFadeTimer);
      clearTimeout(observeTimer);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', resize);
      document.removeEventListener('click', handleClick);
      document.removeEventListener('submit', handleSubmit as EventListener);
      sectionObserver.disconnect();
      delete (window as any)._celebrate;
      delete (window as any)._distantFireworks;
    };
  }, []);

  return (
    <>
      {/* ── ROOM AMBIENT GLOW — cross-fades between sections ── */}
      <div
        ref={ambientRef}
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          // Initial warm ivory entry glow
          background: 'radial-gradient(ellipse 90% 55% at 50% -5%, oklch(74% 0.13 80 / 0.15) 0%, transparent 55%)',
          opacity: 1,
          // CSS transition handles the cross-fade between rooms
          transition: 'opacity 0.48s cubic-bezier(0.22,1,0.36,1)',
          willChange: 'opacity, transform',
        }}
      />

      {/* ── MARIGOLD CANOPY CEILING — persistent drift ── */}
      <div
        aria-hidden
        className="canopy-drift"
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          background: 'radial-gradient(ellipse 85% 32% at 50% -8%, oklch(74% 0.13 80 / 0.10) 0%, transparent 60%)',
          willChange: 'transform, opacity',
        }}
      />

      {/* ── GOLD DUST PARTICLES — slowest layer ── */}
      <canvas
        ref={particleRef}
        aria-hidden
        style={{
          position: 'fixed', inset: 0, pointerEvents: 'none',
          zIndex: 1, opacity: 0.55, width: '100%', height: '100%',
          willChange: 'transform',
        }}
      />

      {/* ── MARIGOLD PETALS ── */}
      <canvas
        ref={petalRef}
        aria-hidden
        style={{
          position: 'fixed', inset: 0, pointerEvents: 'none',
          zIndex: 2, opacity: 0.70, width: '100%', height: '100%',
          willChange: 'transform',
        }}
      />

      {/* ── MUGHAL JAALI LATTICE — parallaxes + slight rotate ── */}
      <div ref={jaaliRef} className="jaali-overlay" aria-hidden />

      {/* ── VIGNETTE BREATH ── */}
      <div className="vignette-breath" aria-hidden />

      {/* ── CELEBRATION CANVAS — topmost ── */}
      <canvas
        ref={celebRef}
        aria-hidden
        style={{
          position: 'fixed', inset: 0, pointerEvents: 'none',
          zIndex: 10, opacity: 1, width: '100%', height: '100%',
        }}
      />
    </>
  );
}
