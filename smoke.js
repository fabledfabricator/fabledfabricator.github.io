
const canvas = document.createElement('canvas');
canvas.id = 'smoke-canvas';
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function createParticle() {
  return {
    x: Math.random() * canvas.width,
    y: canvas.height + Math.random() * 100,
    radius: Math.random() * 30 + 20,
    opacity: Math.random() * 0.1 + 0.05,
    speed: Math.random() * 0.5 + 0.2
  };
}

function updateParticles() {
  if (particles.length < 50) {
    particles.push(createParticle());
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.y -= p.speed;
    p.x += Math.sin(p.y / 20) * 0.5;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
    ctx.fill();

    if (p.y + p.radius < 0) {
      particles.splice(i, 1);
    }
  }

  requestAnimationFrame(updateParticles);
}

updateParticles();
