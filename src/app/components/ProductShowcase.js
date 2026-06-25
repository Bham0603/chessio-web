'use client';

export default function ProductShowcase({ imageSrc, altText }) {
  return (
    <div className="product-showcase group">
      {/* Gradient glow behind the frame */}
      <div className="showcase-glow-ring"></div>

      {/* Glass frame — transparency only on background, never element opacity */}
      <div className="showcase-glass-frame">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt={altText}
          className="showcase-sharp-img"
          style={{
            imageRendering: '-webkit-optimize-contrast',
            transform: 'translateZ(0)',
          }}
        />
      </div>
    </div>
  );
}
