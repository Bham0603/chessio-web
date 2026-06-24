/* ========================================
   CHESSIO — Main JavaScript
   Ocean Particle System, Scroll Reveals, Interactions
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  initOceanParticles();
  initScrollReveals();
  initNavbar();
  initMobileMenu();
  initSmoothScroll();
});

/* ========================================
   OCEAN PARTICLE / BUBBLE SYSTEM
   ======================================== */
function initOceanParticles() {
  const canvas = document.getElementById('ocean-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let animationId;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 3 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = -(Math.random() * 0.4 + 0.1); // Float upward
      this.opacity = Math.random() * 0.4 + 0.05;
      this.pulse = Math.random() * Math.PI * 2;
      this.pulseSpeed = Math.random() * 0.02 + 0.005;
      // Color variation: white to silver
      const lightness = 70 + Math.random() * 25; // 70-95% range
      this.color = `hsla(0, 0%, ${lightness}%, `;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.pulse += this.pulseSpeed;

      // Gentle wave motion
      this.x += Math.sin(this.pulse) * 0.15;

      // Reset if off screen
      if (this.y < -10) {
        this.y = height + 10;
        this.x = Math.random() * width;
      }
      if (this.x < -10) this.x = width + 10;
      if (this.x > width + 10) this.x = -10;
    }

    draw(ctx) {
      const dynamicOpacity = this.opacity * (0.6 + Math.sin(this.pulse) * 0.4);
      
      // Outer glow
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
      ctx.fillStyle = this.color + (dynamicOpacity * 0.15) + ')';
      ctx.fill();

      // Core
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color + dynamicOpacity + ')';
      ctx.fill();
    }
  }

  function createParticles() {
    const count = Math.min(Math.floor(width * height / 12000), 120);
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }

  // Draw light caustic rays
  let causticPhase = 0;
  function drawCaustics(ctx) {
    causticPhase += 0.003;
    
    for (let i = 0; i < 3; i++) {
      const offset = i * 2.1;
      const x1 = width * (0.2 + 0.3 * Math.sin(causticPhase + offset));
      const y1 = 0;
      const x2 = width * (0.3 + 0.4 * Math.sin(causticPhase * 0.7 + offset));
      const y2 = height;
      
      const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.0)');
      gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.008)');
      gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.012)');
      gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.006)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    
    drawCaustics(ctx);

    particles.forEach(p => {
      p.update();
      p.draw(ctx);
    });

    animationId = requestAnimationFrame(animate);
  }

  resize();
  createParticles();
  animate();

  // Handle resize with debounce
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      resize();
      createParticles();
    }, 200);
  });
}

/* ========================================
   SCROLL REVEAL (Intersection Observer)
   ======================================== */
function initScrollReveals() {
  const revealElements = document.querySelectorAll('.reveal');

  if (!revealElements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Only animate once
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  revealElements.forEach(el => observer.observe(el));
}

/* ========================================
   NAVBAR (Scroll-based transparency)
   ======================================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  let ticking = false;

  function updateNavbar() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateNavbar);
      ticking = true;
    }
  }, { passive: true });
}

/* ========================================
   MOBILE MENU
   ======================================== */
function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    menu.classList.toggle('active');
    btn.classList.toggle('active');
  });

  // Close menu when a link is clicked
  menu.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('active');
      btn.classList.remove('active');
    });
  });
}

/* ========================================
   SMOOTH SCROLL for anchor links
   ======================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}
