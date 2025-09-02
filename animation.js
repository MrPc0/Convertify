const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Create floating circles
class Circle {
  constructor(x, y, radius, color, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.speedX = speedX;
    this.speedY = speedY;
  }

  draw() {
    const gradient = ctx.createRadialGradient(this.x, this.y, this.radius * 0.2, this.x, this.y, this.radius);
    gradient.addColorStop(0, this.color);
    gradient.addColorStop(1, "transparent");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Bounce off edges
    if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) this.speedX *= -1;
    if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) this.speedY *= -1;

    this.draw();
  }
}

// Generate random circles
const colors = ["rgba(255, 0, 149, 0.62)", "rgba(0,200,255,0.5)", "rgba(0, 26, 255, 0.5)", "rgba(255, 0, 0, 0.5)"];
const circles = [];

for (let i = 0; i < 8; i++) {
  const radius = Math.random() * 200 + 100;
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  const color = colors[Math.floor(Math.random() * colors.length)];
  const speedX = (Math.random() - 2) * 0.7;
  const speedY = (Math.random() - 1) * 0.7;
  circles.push(new Circle(x, y, radius, color, speedX, speedY));
}

// Animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  circles.forEach(circle => circle.update());
  requestAnimationFrame(animate);
}

animate();
