import React from 'react';

export const BackgroundGlow: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Soft blurred glowing primary circle drifting */}
      <div
        className="absolute -top-32 -left-32 w-96 h-96 md:w-[600px] md:h-[600px] rounded-full filter blur-[120px] opacity-40 animate-glow-1"
        style={{ backgroundColor: 'var(--color-primary)' }}
      />
      {/* Soft blurred glowing secondary circle drifting */}
      <div
        className="absolute top-1/3 -right-32 w-80 h-80 md:w-[500px] md:h-[500px] rounded-full filter blur-[130px] opacity-35 animate-glow-2"
        style={{ backgroundColor: 'var(--color-secondary)' }}
      />
      {/* Subtle bottom accent glow */}
      <div
        className="absolute -bottom-40 left-1/4 w-96 h-96 md:w-[700px] md:h-[700px] rounded-full filter blur-[150px] opacity-25 animate-glow-1"
        style={{ backgroundColor: 'var(--color-primary-light)' }}
      />
      {/* Fine subtle noise overlay texture */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:24px_24px] opacity-70" />
    </div>
  );
};
