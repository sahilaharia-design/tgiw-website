import { useEffect, useRef } from 'react';

/**
 * CinematicLayers — global environmental systems.
 * Mounted once at App root. Persists across all page navigations.
 *
 * Layers (z-index order):
 *  1  particle-canvas  — slow gold dust ceiling
 *  2  petal-canvas     — marigold / saffron drift
 *  3  jaali-overlay    — Mughal lattice, parallaxes at 6% scroll speed
 *  4  vignette-breath  — soft breathing edge vignette
 * 10  celebrate-canvas — fireworks / sparks at emotional moments
 */
export default function CinematicLayers() {
  const particleRef  = useRef<HTMLCanvasElement>(null);
  const petalRef     = useRef<HTMLCanvasElement>(null);
  const celebRef     = useRef<HTMLCanvasElement>(null);
  const jaaliRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pCanvas = particleRef.current!;
    const fCanvas = petalRef.current!;
    const cCanvas = celebRef.current!;
    const jaali   = jaaliRef.current!;
    if (!pCanvas || !fCanvas || !cCanvas || !jaali) return;

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

    // ── SCROLL: jaali parallax + CSS --scroll-y ──────────────
    let scrollTicking = false;
    function onScroll() {
      if (!scrollTicking) {
        requestAnimationFrame(() => {
          const y = window.scrollY;
          jaali.style.transform = `translateY(${y * 0.06}px)`;
          document.documentElement.style.setProperty('--scroll-y', `${y}px`);
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });

    // ── GOLD PARTICLE SYSTEM ──────────────────────────────────
    const GOLD_COLORS = ['#C9A84C','#DFC07A','#B8922A','#E8D08A','#D4B060','#F0E0A0'];
    let particleCount = 60;

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
        alpha: Math.random() * 0.50 + 0.08,
        color: GOLD_COLORS[Math.floor(Math.random() * GOLD_COLORS.length)],
        tw: Math.random() * Math.PI * 2,
        tws: Math.random() * 0.014 + 0.004,
      };
    }

    let particles: Particle[] = Array.from({ length: particleCount }, () => {
      const p = makeParticle(); p.y = Math.random() * H; return p;
    });

    function drawParticles() {
      pCtx.clearRect(0, 0, W, H);
      for (const p of particles) {
        p.y += p.vy; p.x += p.vx; p.tw += p.tws;
        const a = p.alpha * (0.65 + 0.35 * Math.sin(p.tw));
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

    // ── PETAL SYSTEM ──────────────────────────────────────────
    const PETAL_COLORS = [
      { r:220, g:155, b:60 },
      { r:210, g:120, b:80 },
      { r:215, g:165, b:120 },
      { r:200, g:140, b:70 },
      { r:225, g:180, b:90 },
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
        vy: Math.random() * 0.35 + 0.12,
        vx: (Math.random() - 0.5) * 0.22,
        sway: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.008 + 0.003,
        swayAmt: Math.random() * 0.5 + 0.2,
        alpha: Math.random() * 0.18 + 0.04,
        r: c.r, g: c.g, b: c.b,
      };
    }

    let petals: Petal[] = Array.from({ length: 28 }, makePetal);

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

    // ── CELEBRATION + DISTANT FIREWORKS SYSTEM ────────────────
    const CONFETTI_COLORS = [
      '#C9A84C','#DFC07A','#E8C080','#D4907A','#E8D5C4',
      '#B8922A','#F0D890','#C87060',
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
      const count = Math.floor(45 * intensity);
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
      for (let i = 0; i < Math.floor(18 * intensity); i++) {
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

    /** Distant fireworks — elegant arcing trails from upper screen edges */
    function distantFireworks(intensity = 1) {
      const launchSites = Math.floor(3 * intensity) + 2;
      for (let s = 0; s < launchSites; s++) {
        const delay = s * 180;
        setTimeout(() => {
          // Launch point from lower third, arc upward
          const lx = W * (0.2 + Math.random() * 0.6);
          const ly = H * (0.5 + Math.random() * 0.3);
          // Burst point in upper third
          const bx = lx + (Math.random() - 0.5) * 180;
          const by = H * (0.08 + Math.random() * 0.25);

          // Trailing spark up to burst
          for (let i = 0; i < 8; i++) {
            const t = i / 8;
            celebParticles.push({
              type: 'spark',
              x: lx + (bx - lx) * t,
              y: ly + (by - ly) * t,
              vx: 0, vy: -0.3,
              gravity: 0,
              len: 12,
              color: '#DFC07A',
              alpha: 0.5 + t * 0.4,
              fade: 0.025,
            });
          }

          // Radial bloom flash at burst point
          celebParticles.push({
            type: 'bloom',
            x: bx, y: by,
            vx: 0, vy: 0, gravity: 0,
            r: 0,
            color: CONFETTI_COLORS[Math.floor(Math.random() * 3)],
            alpha: 0.7, fade: 0.018,
          });

          // Gold spark trails radiating outward from burst
          for (let i = 0; i < Math.floor(22 * intensity); i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 3.5 + 1.5;
            celebParticles.push({
              type: 'spark',
              x: bx, y: by,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed - 1,
              gravity: 0.05,
              len: Math.random() * 24 + 10,
              color: CONFETTI_COLORS[Math.floor(Math.random() * 4)],
              alpha: 0.85, fade: 0.012 + Math.random() * 0.008,
            });
          }

          if (!celebActive) { celebActive = true; celebLoop(); }
        }, delay);
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
          const nx = p.x - p.vx * 0.7;
          const ny = p.y - p.vy * 0.7;
          cCtx.beginPath(); cCtx.moveTo(nx, ny); cCtx.lineTo(p.x, p.y);
          cCtx.strokeStyle = p.color;
          cCtx.globalAlpha = Math.max(0, p.alpha);
          cCtx.lineWidth = 1.4;
          cCtx.stroke();
        } else if (p.type === 'bloom') {
          p.r = (p.r || 0) + 2.5;
          const grad = cCtx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r!);
          grad.addColorStop(0, p.color + 'cc');
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

    // Expose global APIs
    (window as any)._celebrate = function(el: Element | null, intensity?: number) {
      if (el) {
        const r = el.getBoundingClientRect();
        burst(r.left + r.width / 2, r.top + r.height / 2, intensity || 1);
      } else {
        burst(W / 2, H * 0.4, intensity || 1);
      }
    };
    (window as any)._distantFireworks = (intensity?: number) => distantFireworks(intensity || 1);

    // Wire up existing CTAs and forms (delegated, survives re-renders)
    function handleClick(e: MouseEvent) {
      const target = (e.target as Element).closest('.btn-primary, .btn-ghost, .cta, .cta-ghost');
      if (target) (window as any)._celebrate(target, 1.1);
    }
    function handleSubmit(e: SubmitEvent) {
      setTimeout(() => (window as any)._celebrate(e.target as Element, 1.4), 200);
    }
    document.addEventListener('click', handleClick, { passive: true });
    document.addEventListener('submit', handleSubmit as EventListener, { passive: true });

    // ── SECTION ROOM LIGHTING ─────────────────────────────────
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const room = (entry.target as HTMLElement).dataset.room;
            if (room) {
              document.documentElement.dataset.currentRoom = room;
            }
          }
        }
      },
      { threshold: 0.3 }
    );
    document.querySelectorAll('[data-room]').forEach(el => sectionObserver.observe(el));

    // ── RESIZE ────────────────────────────────────────────────
    window.addEventListener('resize', resize);

    return () => {
      rafs.forEach(id => cancelAnimationFrame(id));
      cancelAnimationFrame(celebRaf);
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
      {/* Gold dust particles — slowest layer */}
      <canvas
        ref={particleRef}
        style={{
          position: 'fixed', inset: 0, pointerEvents: 'none',
          zIndex: 1, opacity: 0.5, width: '100%', height: '100%',
        }}
        aria-hidden
      />
      {/* Marigold petals */}
      <canvas
        ref={petalRef}
        style={{
          position: 'fixed', inset: 0, pointerEvents: 'none',
          zIndex: 2, opacity: 0.65, width: '100%', height: '100%',
        }}
        aria-hidden
      />
      {/* Mughal jaali lattice — parallaxes independently */}
      <div ref={jaaliRef} className="jaali-overlay" aria-hidden />
      {/* Vignette breathing */}
      <div className="vignette-breath" aria-hidden />
      {/* Celebration / fireworks — topmost */}
      <canvas
        ref={celebRef}
        style={{
          position: 'fixed', inset: 0, pointerEvents: 'none',
          zIndex: 10, opacity: 1, width: '100%', height: '100%',
        }}
        aria-hidden
      />
    </>
  );
}
