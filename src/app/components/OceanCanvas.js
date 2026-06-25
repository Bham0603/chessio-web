'use client';

import { useEffect, useRef } from 'react';

export default function OceanCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    let animationId;
    let causticPhase = 0;

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
        this.speedY = -(Math.random() * 0.4 + 0.1);
        this.opacity = Math.random() * 0.4 + 0.05;
        this.pulse = Math.random() * Math.PI * 2;
        this.pulseSpeed = Math.random() * 0.02 + 0.005;
        const lightness = 70 + Math.random() * 25;
        this.color = `hsla(0, 0%, ${lightness}%, `;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.pulse += this.pulseSpeed;
        this.x += Math.sin(this.pulse) * 0.15;

        if (this.y < -10) {
          this.y = height + 10;
          this.x = Math.random() * width;
        }
        if (this.x < -10) this.x = width + 10;
        if (this.x > width + 10) this.x = -10;
      }

      draw(ctx) {
        const dynamicOpacity = this.opacity * (0.6 + Math.sin(this.pulse) * 0.4);

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = this.color + (dynamicOpacity * 0.15) + ')';
        ctx.fill();

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

    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resize();
        createParticles();
      }, 200);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  return <canvas ref={canvasRef} id="ocean-canvas" />;
}
