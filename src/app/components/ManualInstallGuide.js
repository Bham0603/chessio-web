'use client';

import { useState } from 'react';

const steps = [
  {
    id: '01',
    text: (
      <>
        Download the <code className="code-capsule">.zip</code> file from the button below
      </>
    ),
    label: 'DOWNLOAD',
    video: '/videos/step1.mp4',
  },
  {
    id: '02',
    text: (
      <>
        Go to <code className="code-capsule">chrome://extensions</code> in your browser
      </>
    ),
    label: 'EXTENSIONS PAGE',
    video: '/videos/step2.mp4',
  },
  {
    id: '03',
    text: (
      <>
        Enable <code className="code-capsule">Developer Mode</code> — toggle in the top right corner
      </>
    ),
    label: 'DEVELOPER MODE',
    video: '/videos/step3.mp4',
  },
  {
    id: '04',
    text: (
      <>
        Click <code className="code-capsule">Load unpacked</code> and select the unzipped folder
      </>
    ),
    label: 'LOAD UNPACKED',
    video: '/videos/step4.mp4',
  },
];

export default function ManualInstallGuide() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="install-guide" id="install">
      <div className="container">
        <div className="section-header reveal">
          <h2 className="section-title">Get it in <span className="gradient-text">60 seconds.</span></h2>
          <p className="section-subtitle">Not on the Chrome Web Store yet — here&apos;s how to install manually:</p>
        </div>

        <div className="install-layout reveal">
          {/* Left: Step List */}
          <div className="install-steps">
            {steps.map((step, index) => (
              <button
                key={step.id}
                className={`install-step-btn ${index === activeStep ? 'active' : ''}`}
                onClick={() => setActiveStep(index)}
              >
                <span className="step-number">{step.id}</span>
                <span className="step-text">{step.text}</span>
              </button>
            ))}
          </div>

          {/* Right: Media Box */}
          <div className="install-media-box">
            <div className="media-container">
              <video
                key={steps[activeStep].video}
                src={steps[activeStep].video}
                autoPlay
                muted
                loop
                playsInline
                style={{ imageRendering: '-webkit-optimize-contrast' }}
              />
            </div>
            <div className="media-footer">
              <span className="footer-dot"></span>
              STEP {steps[activeStep].id} — {steps[activeStep].label}
            </div>
          </div>
        </div>

        {/* Global CTA */}
        <div className="install-cta-container reveal">
          <a href="https://github.com/Bham0603/chessio/releases/tag/v1.0" target="_blank" rel="noopener noreferrer" className="btn install-cta-btn">
            Download Extension (.zip)
          </a>
          <p className="install-meta">Works on Chrome · Manifest V3 · No account needed</p>
        </div>
      </div>
    </section>
  );
}
