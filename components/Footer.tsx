import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 w-full py-4 px-6 border-t-2 border-[var(--accent-cyan)]/30 bg-gradient-to-r from-black/60 via-black/50 to-black/60 backdrop-blur-xl flex-shrink-0 z-50">
      <div className="flex items-center justify-center">
        <div className="flex items-center gap-3 px-6 py-3 rounded-lg bg-[var(--glass-bg)] border-2 border-[var(--accent-cyan)]/40 hover:border-[var(--accent-cyan)] transition-all duration-300 group shadow-lg shadow-[var(--accent-cyan)]/20 hover:shadow-[var(--accent-cyan)]/40">
          <span className="text-sm text-[var(--text-primary)] font-semibold">Created by</span>
          <span className="font-bold text-[var(--accent-cyan)] tracking-wider text-lg group-hover:text-white transition-colors drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">Vaibhav</span>
          <svg className="w-5 h-5 text-[var(--accent-cyan)] group-hover:scale-110 transition-transform drop-shadow-[0_0_6px_rgba(34,211,238,1)]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
          </svg>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

