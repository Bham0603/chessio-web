'use client';

import { useEffect, useCallback } from 'react';
import OceanCanvas from './components/OceanCanvas';
import ProductShowcase from './components/ProductShowcase';

export default function Home() {
  // --- Scroll Reveal ---
  const initScrollReveals = useCallback(() => {
    const revealElements = document.querySelectorAll('.reveal');
    if (!revealElements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // --- Navbar scroll effect ---
  const initNavbar = useCallback(() => {
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

    const handler = () => {
      if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // --- Mobile menu ---
  const initMobileMenu = useCallback(() => {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    if (!btn || !menu) return;

    const toggleMenu = () => {
      menu.classList.toggle('active');
      btn.classList.toggle('active');
    };

    btn.addEventListener('click', toggleMenu);

    const links = menu.querySelectorAll('.mobile-link');
    const closeMenu = () => {
      menu.classList.remove('active');
      btn.classList.remove('active');
    };
    links.forEach((link) => link.addEventListener('click', closeMenu));

    return () => {
      btn.removeEventListener('click', toggleMenu);
      links.forEach((link) => link.removeEventListener('click', closeMenu));
    };
  }, []);

  // --- Smooth scroll ---
  const initSmoothScroll = useCallback(() => {
    const handler = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    };

    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  useEffect(() => {
    const cleanups = [
      initScrollReveals(),
      initNavbar(),
      initMobileMenu(),
      initSmoothScroll(),
    ];
    return () => cleanups.forEach((fn) => fn && fn());
  }, [initScrollReveals, initNavbar, initMobileMenu, initSmoothScroll]);

  return (
    <>
      {/* Animated Background */}
      <OceanCanvas />
      <div className="ocean-overlay"></div>

      {/* Navigation */}
      <nav className="navbar" id="navbar">
        <div className="nav-container">
          <a href="#" className="nav-logo">
            <svg className="logo-icon" viewBox="0 0 40 40" width="36" height="36">
              <defs>
                <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#ffffff' }} />
                  <stop offset="100%" style={{ stopColor: '#a1a1aa' }} />
                </linearGradient>
              </defs>
              <circle cx="20" cy="20" r="18" fill="url(#logoGrad)" opacity="0.2" />
              <text x="20" y="26" textAnchor="middle" fill="url(#logoGrad)" fontSize="20" fontWeight="800">♞</text>
            </svg>
            <span>Chessio</span>
          </a>
          <div className="nav-links">
            <a href="#features" className="nav-link">Features</a>
            <a href="#showcase" className="nav-link">Preview</a>
            <a href="#how-it-works" className="nav-link">How It Works</a>
            <a href="#download" className="nav-cta">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download
            </a>
          </div>
          <button className="mobile-menu-btn" id="mobile-menu-btn" aria-label="Toggle menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className="mobile-menu" id="mobile-menu">
        <a href="#features" className="mobile-link">Features</a>
        <a href="#showcase" className="mobile-link">Preview</a>
        <a href="#how-it-works" className="mobile-link">How It Works</a>
        <a href="#download" className="mobile-link cta">Download</a>
      </div>

      {/* ===== HERO SECTION ===== */}
      <section className="hero" id="hero">
        <div className="hero-content">
          <div className="hero-badge reveal">
            <span className="badge-dot"></span>
            <span>Chrome Extension · Manifest V3</span>
          </div>
          <h1 className="hero-title reveal">
            Your <span className="gradient-text">AI Chess</span><br />Companion
          </h1>
          <p className="hero-subtitle reveal">
            Real-time Stockfish 18 analysis directly overlaid on your live games on{' '}
            <strong>Chess.com</strong> and <strong>Lichess</strong>. 100% offline, powered by WebAssembly —
            no servers, no latency, full privacy.
          </p>
          <div className="hero-actions reveal">
            <a href="#download" className="btn btn-primary btn-glow">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download for Chrome
            </a>
            <a href="#features" className="btn btn-glass">
              Explore Features
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </a>
          </div>
          <div className="hero-stats reveal">
            <div className="stat">
              <span className="stat-value">3600</span>
              <span className="stat-label">Max Elo</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <span className="stat-value">100%</span>
              <span className="stat-label">Offline</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <span className="stat-value">0ms</span>
              <span className="stat-label">Server Latency</span>
            </div>
          </div>
        </div>
        <div className="hero-visual reveal">
          <div className="hero-image-frame">
            <div className="frame-glow"></div>
            <img
              src="/images/screenshot-3.png"
              alt="Chessio live game analysis showing best moves, evaluation bar, and move arrows on Chess.com"
              loading="eager"
              style={{
                imageRendering: '-webkit-optimize-contrast',
                transform: 'translateZ(0)',
              }}
            />
          </div>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section className="features" id="features">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-tag">Core Features</span>
            <h2 className="section-title">Everything You Need to<br /><span className="gradient-text">Master Your Game</span></h2>
            <p className="section-subtitle">Powered by Stockfish 18 Lite running natively in your browser via WebAssembly</p>
          </div>
          <div className="features-grid">
            {/* Feature 1 */}
            <div className="feature-card glass-card reveal" style={{ '--icon-color': '#e4e4e7' }}>
              <div className="feature-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18" /><path d="M3 15h18" /><path d="M9 3v18" /><path d="M15 3v18" />
                </svg>
              </div>
              <h3 className="feature-title">Live Board Scraping</h3>
              <p className="feature-desc">Automatically reads piece positions directly from the webpage DOM and reconstructs the game state (FEN) in real-time. Zero manual input required.</p>
            </div>
            {/* Feature 2 */}
            <div className="feature-card glass-card reveal" style={{ '--icon-color': '#d4d4d8' }}>
              <div className="feature-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" />
                </svg>
              </div>
              <h3 className="feature-title">100% Offline Engine</h3>
              <p className="feature-desc">Runs a bundled Stockfish 18 Lite engine via WebWorker and WebAssembly. No network latency, no external servers, full privacy guaranteed.</p>
            </div>
            {/* Feature 3 */}
            <div className="feature-card glass-card reveal" style={{ '--icon-color': '#c4c4cc' }}>
              <div className="feature-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 1v4" /><path d="M12 19v4" /><path d="M4.22 4.22l2.83 2.83" /><path d="M16.95 16.95l2.83 2.83" />
                  <path d="M1 12h4" /><path d="M19 12h4" /><path d="M4.22 19.78l2.83-2.83" /><path d="M16.95 7.05l2.83-2.83" />
                </svg>
              </div>
              <h3 className="feature-title">Adjustable Strength</h3>
              <p className="feature-desc">Dial the engine from beginner level (~250 Elo) up to maximum power (3600 Elo). Get suggestions that match any rating level.</p>
            </div>
            {/* Feature 4 */}
            <div className="feature-card glass-card reveal" style={{ '--icon-color': '#e4e4e7' }}>
              <div className="feature-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
                </svg>
              </div>
              <h3 className="feature-title">Top 3 Moves Visualized</h3>
              <p className="feature-desc">Displays the top three best continuations as color-coded SVG arrows directly on the board: 🟢 Best, 🟡 2nd Best, 🟠 3rd Best.</p>
            </div>
            {/* Feature 5 */}
            <div className="feature-card glass-card reveal" style={{ '--icon-color': '#d4d4d8' }}>
              <div className="feature-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="4" height="18" rx="1" />
                  <path d="M6 12h4" /><path d="M14 12h4" />
                  <rect x="18" y="3" width="4" height="18" rx="1" />
                </svg>
              </div>
              <h3 className="feature-title">Evaluation Bar</h3>
              <p className="feature-desc">Features an animated vertical bar showing the real-time advantage between White and Black. Instantly see who&apos;s winning and by how much.</p>
            </div>
            {/* Feature 6 */}
            <div className="feature-card glass-card reveal" style={{ '--icon-color': '#c4c4cc' }}>
              <div className="feature-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="2" />
                  <rect x="6" y="6" width="12" height="12" rx="1" />
                  <path d="M2 12h4" /><path d="M18 12h4" /><path d="M12 2v4" /><path d="M12 18v4" />
                </svg>
              </div>
              <h3 className="feature-title">Live Mini-Board</h3>
              <p className="feature-desc">A fully synchronized miniature board overlay mirroring the real game with automatic orientation detection. Always in sync, always ready.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRODUCT SHOWCASE ===== */}
      <section className="showcase" id="showcase">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-tag">In Action</span>
            <h2 className="section-title">See Chessio <span className="gradient-text">In Action</span></h2>
            <p className="section-subtitle">Real screenshots from live Chess.com sessions showing the extension&apos;s powerful overlay</p>
          </div>
          <div className="showcase-gallery">
            {/* Screenshot 1 */}
            <div className="showcase-item reveal">
              <ProductShowcase
                imageSrc="/images/screenshot-1.png"
                altText="Chessio ELO strength selector dropdown with options from ~250 to Max rating"
              />
              <div className="showcase-caption">
                <h3>Adjustable Engine Strength</h3>
                <p>Choose from ~250 Elo to Maximum power. The dropdown lets you select the exact strength level that matches your training goals.</p>
              </div>
            </div>
            {/* Screenshot 2 */}
            <div className="showcase-item reveal">
              <ProductShowcase
                imageSrc="/images/screenshot-2.png"
                altText="Chessio search depth selector showing depth levels from D10 to D24"
              />
              <div className="showcase-caption">
                <h3>Configurable Search Depth</h3>
                <p>Fine-tune analysis depth from D10 to D24. Balance between lightning-fast suggestions and deeper, more accurate calculations.</p>
              </div>
            </div>
            {/* Screenshot 3 */}
            <div className="showcase-item showcase-item-large reveal">
              <ProductShowcase
                imageSrc="/images/screenshot-3.png"
                altText="Full Chessio interface showing live game analysis with evaluation bar, move arrows, and top 3 move suggestions"
              />
              <div className="showcase-caption">
                <h3>Complete Live Analysis</h3>
                <p>The full Chessio panel showing real-time evaluation, move arrows on the board, top 3 engine lines with scores, and the synchronized mini-board — all in one sleek overlay.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="how-it-works" id="how-it-works">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-tag">Architecture</span>
            <h2 className="section-title">How It <span className="gradient-text">Works</span></h2>
            <p className="section-subtitle">Four seamlessly integrated components working together inside your browser</p>
          </div>
          <div className="timeline">
            {/* Step 1 */}
            <div className="timeline-item reveal">
              <div className="timeline-marker">
                <span className="timeline-number">1</span>
                <div className="timeline-line"></div>
              </div>
              <div className="timeline-content glass-card">
                <div className="timeline-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                </div>
                <h3>Content Script</h3>
                <p>Runs directly on the chess page. Scrapes the board to build a FEN string, listens for board changes using MutationObservers, and renders the Shadow DOM UI panel.</p>
              </div>
            </div>
            {/* Step 2 */}
            <div className="timeline-item reveal">
              <div className="timeline-marker">
                <span className="timeline-number">2</span>
                <div className="timeline-line"></div>
              </div>
              <div className="timeline-content glass-card">
                <div className="timeline-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                </div>
                <h3>Background Service Worker</h3>
                <p>Acts as a message router, reliably transmitting data between the webpage content script and the offscreen engine document via Chrome messaging APIs.</p>
              </div>
            </div>
            {/* Step 3 */}
            <div className="timeline-item reveal">
              <div className="timeline-marker">
                <span className="timeline-number">3</span>
                <div className="timeline-line"></div>
              </div>
              <div className="timeline-content glass-card">
                <div className="timeline-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="4" y="4" width="16" height="16" rx="2" />
                    <rect x="9" y="9" width="6" height="6" />
                    <path d="M15 2v2" /><path d="M15 20v2" /><path d="M2 15h2" /><path d="M2 9h2" />
                    <path d="M20 15h2" /><path d="M20 9h2" /><path d="M9 2v2" /><path d="M9 20v2" />
                  </svg>
                </div>
                <h3>Offscreen Engine</h3>
                <p>Hosts the WebWorker and WebAssembly Stockfish engine. Processes the FEN via UCI protocol and calculates the best PV lines, scores, and depths.</p>
              </div>
            </div>
            {/* Step 4 */}
            <div className="timeline-item reveal">
              <div className="timeline-marker">
                <span className="timeline-number">4</span>
              </div>
              <div className="timeline-content glass-card">
                <div className="timeline-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                  </svg>
                </div>
                <h3>UI Updates</h3>
                <p>Results are instantly routed back to update the evaluation bar, move text, colored arrows on the board, and the mini-board — all within the isolated Shadow DOM.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MORE FEATURES ===== */}
      <section className="more-features" id="more-features">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-tag">And More</span>
            <h2 className="section-title">Packed with <span className="gradient-text">Smart Features</span></h2>
          </div>
          <div className="more-features-grid">
            <div className="mini-feature glass-card reveal">
              <div className="mini-feature-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <div>
                <h4>&quot;My Moves Only&quot; Filter</h4>
                <p>Only analyzes when it&apos;s your turn. Keeps the opponent&apos;s best moves hidden for a more realistic training experience.</p>
              </div>
            </div>
            <div className="mini-feature glass-card reveal">
              <div className="mini-feature-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <polyline points="17 1 21 5 17 9" /><path d="M3 11V9a4 4 0 0 1 4-4h14" />
                  <polyline points="7 23 3 19 7 15" /><path d="M21 13v2a4 4 0 0 1-4 4H3" />
                </svg>
              </div>
              <div>
                <h4>Manual Board Flip</h4>
                <p>Easily override auto-detected board orientation with a quick toggle if the extension guesses wrong.</p>
              </div>
            </div>
            <div className="mini-feature glass-card reveal">
              <div className="mini-feature-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 9l7 7 7-7" /><rect x="3" y="3" width="18" height="18" rx="2" />
                </svg>
              </div>
              <div>
                <h4>Draggable Panel</h4>
                <p>The fully isolated Shadow DOM panel can be dragged anywhere on screen. Styles never conflict with the host site.</p>
              </div>
            </div>
            <div className="mini-feature glass-card reveal">
              <div className="mini-feature-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M6 8h.01" /><path d="M10 8h.01" /><path d="M14 8h.01" /><path d="M18 8h.01" />
                  <path d="M8 12h.01" /><path d="M12 12h.01" /><path d="M16 12h.01" /><path d="M7 16h10" />
                </svg>
              </div>
              <div>
                <h4>Keyboard Shortcut</h4>
                <p>Quickly toggle the entire panel on and off using <kbd>Ctrl + Shift + A</kbd>. Instant access, instant hide.</p>
              </div>
            </div>
            <div className="mini-feature glass-card reveal">
              <div className="mini-feature-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /><path d="M11 8v6" /><path d="M8 11h6" />
                </svg>
              </div>
              <div>
                <h4>Adjustable Search Depth</h4>
                <p>Control the engine&apos;s search depth from D10 to D24. Balance analysis speed with calculation accuracy.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== DOWNLOAD / CTA SECTION ===== */}
      <section className="cta-section" id="download">
        <div className="container">
          <div className="cta-box glass-card reveal">
            <div className="cta-glow"></div>
            <div className="cta-content">
              <h2 className="cta-title">Ready to Elevate<br />Your Chess Game?</h2>
              <p className="cta-subtitle">Download Chessio and get instant Stockfish analysis on every move. Free, offline, and privacy-first.</p>
              <div className="cta-actions">
                <a href="#download" className="btn btn-primary btn-glow btn-large">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download for Chrome
                </a>
              </div>
              <div className="cta-platforms">
                <span className="platform-tag">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2a10 10 0 0 1 0 20" fill="rgba(255,255,255,0.3)" />
                  </svg>
                  Chess.com
                </span>
                <span className="platform-tag">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 12l3 3 5-5" stroke="rgba(255,255,255,0.5)" strokeWidth="2" fill="none" />
                  </svg>
                  Lichess
                </span>
                <span className="platform-tag">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="4" y="4" width="16" height="16" rx="2" />
                    <rect x="9" y="9" width="6" height="6" />
                  </svg>
                  Manifest V3
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <svg className="logo-icon" viewBox="0 0 40 40" width="28" height="28">
                <defs>
                  <linearGradient id="footerLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#ffffff' }} />
                    <stop offset="100%" style={{ stopColor: '#a1a1aa' }} />
                  </linearGradient>
                </defs>
                <circle cx="20" cy="20" r="18" fill="url(#footerLogoGrad)" opacity="0.2" />
                <text x="20" y="26" textAnchor="middle" fill="url(#footerLogoGrad)" fontSize="20" fontWeight="800">♞</text>
              </svg>
              <span>Chessio</span>
            </div>
            <div className="footer-disclaimer">
              <p><strong>Disclaimer:</strong> For educational, training, and research purposes only. Using a chess engine during rated online games violates the Terms of Service of Chess.com, Lichess, and other platforms. This tool is designed for use against bots, analyzing unrated games, and personal study.</p>
            </div>
            <div className="footer-bottom">
              <p>&copy; 2026 Chessio. Built with ♞ and ☕</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
