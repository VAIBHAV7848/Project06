import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-3 px-6 border-t border-[var(--border-color)] bg-gradient-to-r from-black/30 via-black/20 to-black/30 backdrop-blur-md flex-shrink-0">
      <div className="flex items-center justify-center">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--glass-bg)] border border-[var(--border-color)] hover:border-[var(--accent-cyan)] transition-all duration-300 group">
          <span className="text-xs text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">Created by</span>
          <span className="font-bold text-[var(--accent-cyan)] tracking-wider text-sm group-hover:text-white transition-colors">Vaibhav</span>
          <svg className="w-4 h-4 text-[var(--accent-cyan)] group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" opacity="0.8"/>
          </svg>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

