/* GoldenFX — Interactive scroll effects & lightning canvas */

// ── Navbar scroll ──────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ── Canvas lightning / particles ──────────────────────────
const canvas = document.getElementById('bg-canvas');
const ctx    = canvas.getContext('2d');

let W, H, particles = [], bolts = [];
let scrollProgress = 0;

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

// Particles
class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x  = Math.random() * W;
    this.y  = Math.random() * H;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = -(Math.random() * 0.4 + 0.1);
    this.alpha = Math.random() * 0.6 + 0.1;
    this.size  = Math.random() * 2 + 0.5;
    this.gold  = Math.random() > 0.4;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 0.002;
    if (this.alpha <= 0 || this.y < -10) this.reset();
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle   = this.gold ? '#FFD700' : '#ffffff';
    ctx.shadowColor = this.gold ? '#FFD700' : '#ffffff';
    ctx.shadowBlur  = this.gold ? 8 : 4;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

for (let i = 0; i < 120; i++) particles.push(new Particle());

// Lightning bolts
class LightningBolt {
  constructor() { this.spawn(); }
  spawn() {
    this.x     = Math.random() * W;
    this.alive = 0;
    this.life  = 18 + Math.floor(Math.random() * 20);
    this.segs  = this.buildSegs();
  }
  buildSegs() {
    const segs = [];
    let cx = this.x, cy = 0;
    const steps = 8 + Math.floor(Math.random() * 6);
    for (let i = 0; i < steps; i++) {
      const nx = cx + (Math.random() - 0.5) * 80;
      const ny = cy + (H / steps);
      segs.push({ x1: cx, y1: cy, x2: nx, y2: ny });
      cx = nx; cy = ny;
    }
    return segs;
  }
  update() { this.alive++; if (this.alive >= this.life) this.spawn(); }
  draw() {
    const alpha = 1 - this.alive / this.life;
    ctx.save();
    ctx.globalAlpha = alpha * 0.85;
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth   = 1.5;
    ctx.shadowColor = '#FFD700';
    ctx.shadowBlur  = 18;
    ctx.beginPath();
    this.segs.forEach((s, i) => {
      if (i === 0) ctx.moveTo(s.x1, s.y1);
      ctx.lineTo(s.x2, s.y2);
    });
    ctx.stroke();
    // bright core
    ctx.globalAlpha = alpha * 0.5;
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth   = 0.5;
    ctx.shadowBlur  = 6;
    ctx.stroke();
    ctx.restore();
  }
}

// Only show bolts after a little scroll
let boltSpawnTimer = 0;

// ── Scroll progress ────────────────────────────────────────
window.addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress = Math.min(window.scrollY / max, 1);
});

// ── Main loop ──────────────────────────────────────────────
function loop() {
  ctx.clearRect(0, 0, W, H);

  // Spawn bolts based on scroll depth (more bolts as you scroll)
  const maxBolts = Math.floor(scrollProgress * 6);
  if (bolts.length < maxBolts) {
    boltSpawnTimer++;
    if (boltSpawnTimer % 20 === 0) bolts.push(new LightningBolt());
  } else if (bolts.length > maxBolts) {
    bolts.pop();
  }

  // Golden overlay tint — intensifies on scroll
  if (scrollProgress > 0.05) {
    const tintAlpha = scrollProgress * 0.06;
    ctx.save();
    ctx.globalAlpha = tintAlpha;
    const grad = ctx.createLinearGradient(0, 0, W, H);
    grad.addColorStop(0, '#FFD700');
    grad.addColorStop(1, '#B8960C');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);
    ctx.restore();
  }

  particles.forEach(p => { p.update(); p.draw(); });
  bolts.forEach(b    => { b.update(); b.draw(); });

  requestAnimationFrame(loop);
}
loop();

// ── Scroll-reveal for sections ─────────────────────────────
const revealEls = document.querySelectorAll(
  '.section-title, .section-label, .about-text, .about-graphic, .work-card, .social-card, .contact-sub'
);
revealEls.forEach(el => el.classList.add('reveal'));

const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => io.observe(el));

// ── Stagger work cards ─────────────────────────────────────
document.querySelectorAll('.work-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.08}s`;
});

// ── Count-up stats ─────────────────────────────────────────
function countUp(el, target, duration = 1200) {
  const start = performance.now();
  function tick(now) {
    const t = Math.min((now - start) / duration, 1);
    el.textContent = Math.floor(t * target);
    if (t < 1) requestAnimationFrame(tick);
    else el.textContent = target;
  }
  requestAnimationFrame(tick);
}

const statEls = document.querySelectorAll('.stat-num');
const statIO  = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      countUp(e.target, parseInt(e.target.dataset.target));
      statIO.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
statEls.forEach(el => statIO.observe(el));
