/* GoldenFX — Canvas + scroll effects */

// ── Navbar ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ── Canvas ──
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

class Particle {
  constructor() { this.reset(true); }
  reset(init) {
    this.x     = Math.random() * W;
    this.y     = init ? Math.random() * H : H + 5;
    this.vx    = (Math.random() - 0.5) * 0.35;
    this.vy    = -(Math.random() * 0.5 + 0.15);
    this.alpha = Math.random() * 0.5 + 0.1;
    this.size  = Math.random() * 1.8 + 0.4;
    this.gold  = Math.random() > 0.35;
  }
  update() {
    this.x += this.vx; this.y += this.vy; this.alpha -= 0.0018;
    if (this.alpha <= 0 || this.y < -10) this.reset(false);
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle   = this.gold ? '#FFD700' : '#ffffff';
    ctx.shadowColor = this.gold ? '#FFD700' : '#fffbe0';
    ctx.shadowBlur  = this.gold ? 10 : 5;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

for (let i = 0; i < 140; i++) particles.push(new Particle());

class LightningBolt {
  constructor() { this.spawn(); }
  spawn() {
    this.x    = Math.random() * W;
    this.age  = 0;
    this.life = 16 + Math.floor(Math.random() * 22);
    this.segs = this.build();
  }
  build() {
    const segs = []; let cx = this.x, cy = 0;
    const steps = 7 + Math.floor(Math.random() * 7);
    for (let i = 0; i < steps; i++) {
      const nx = cx + (Math.random() - 0.5) * 90;
      const ny = cy + H / steps;
      segs.push({ x1: cx, y1: cy, x2: nx, y2: ny });
      cx = nx; cy = ny;
    }
    return segs;
  }
  update() { this.age++; if (this.age >= this.life) this.spawn(); }
  draw() {
    const a = 1 - this.age / this.life;
    ctx.save();
    ctx.globalAlpha = a * 0.9;
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth   = 1.8;
    ctx.shadowColor = '#FFD700';
    ctx.shadowBlur  = 20;
    ctx.beginPath();
    this.segs.forEach((s, i) => { i === 0 ? ctx.moveTo(s.x1,s.y1) : null; ctx.lineTo(s.x2,s.y2); });
    ctx.stroke();
    ctx.globalAlpha = a * 0.45;
    ctx.strokeStyle = '#fff';
    ctx.lineWidth   = 0.5;
    ctx.shadowBlur  = 4;
    ctx.stroke();
    ctx.restore();
  }
}

window.addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  scrollProgress = Math.min(window.scrollY / max, 1);
});

let boltTimer = 0;
function loop() {
  ctx.clearRect(0, 0, W, H);

  const want = Math.floor(scrollProgress * 7);
  boltTimer++;
  if (bolts.length < want && boltTimer % 18 === 0) bolts.push(new LightningBolt());
  if (bolts.length > want) bolts.pop();

  if (scrollProgress > 0.04) {
    ctx.save();
    ctx.globalAlpha = scrollProgress * 0.055;
    const g = ctx.createLinearGradient(0, 0, W, H);
    g.addColorStop(0, '#FFD700'); g.addColorStop(1, '#B8960C');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
    ctx.restore();
  }

  particles.forEach(p => { p.update(); p.draw(); });
  bolts.forEach(b    => { b.update(); b.draw(); });
  requestAnimationFrame(loop);
}
loop();

// ── Scroll reveal ──
const revealEls = document.querySelectorAll(
  '.section-title,.section-label,.about-left,.about-right,.work-card,.service-card,.social-card,.contact-sub'
);
revealEls.forEach(el => { if (!el.classList.contains('reveal')) el.classList.add('reveal'); });

const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// stagger cards
document.querySelectorAll('.work-card').forEach((c, i)  => c.style.transitionDelay = `${i*0.07}s`);
document.querySelectorAll('.service-card').forEach((c,i) => c.style.transitionDelay = `${i*0.07}s`);

// ── Count-up ──
function countUp(el, target) {
  const start = performance.now();
  const dur   = 1300;
  (function tick(now) {
    const t = Math.min((now - start) / dur, 1);
    el.textContent = Math.floor(t * target);
    if (t < 1) requestAnimationFrame(tick); else el.textContent = target;
  })(performance.now());
}
const statIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { countUp(e.target, +e.target.dataset.target); statIO.unobserve(e.target); }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-num').forEach(el => statIO.observe(el));
