import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: string;
  showDivider?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', padding = 'p-6', showDivider = false }) => {
  return (
    <div className={`
      bg-clip-padding backdrop-filter backdrop-blur-md 
      bg-[var(--glass-bg)] 
      border border-[var(--border-color)] 
      rounded-2xl 
      transition-all duration-300 
      hover:border-[var(--border-hover)]
      hover:-translate-y-1
      hover:shadow-[0_0_25px_rgba(56,189,248,0.2)]
      holographic-corners
      ${className}
    `}>
      {showDivider ? (
        <div className="relative">
          <div className={padding}>
            {children}
          </div>
          <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[var(--accent-cyan)] to-transparent opacity-30"></div>
        </div>
      ) : (
        <div className={padding}>
          {children}
        </div>
      )}
    </div>
  );
};

export default Card;