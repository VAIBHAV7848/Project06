import React from 'react';
import { CURRENT_USER } from '../constants';
import { RewardIcon } from './Icons';

interface HeaderProps {
    userPoints: number;
    onProfileClick: () => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ userPoints, onProfileClick, searchQuery, setSearchQuery }) => {
  const currentUser = CURRENT_USER;

  return (
    <header className="h-20 w-full flex-shrink-0 flex items-center justify-between px-6 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30 bg-black/20 border-b border-[var(--border-color)]">
      <div className="relative w-full max-w-md">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg className="w-5 h-5 text-[var(--text-secondary)]" viewBox="0 0 24 24" fill="none">
            <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </span>
        <input 
          type="text" 
          className="w-full py-2 pl-10 pr-4 text-[var(--text-primary)] rounded-lg input-high-tech" 
          placeholder="Search..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-4 bg-yellow-500/10 px-3 py-1.5 rounded-full border border-yellow-500/30">
            <RewardIcon />
            <span className="ml-2 text-sm font-bold text-yellow-300 tracking-wider">{userPoints}</span>
        </div>
        <button className="p-2 text-[var(--text-secondary)] rounded-full hover:bg-white/10 hover:text-[var(--accent-cyan)] focus:outline-none">
           <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 17H20L18.5951 15.5951C18.2141 15.2141 18 14.6973 18 14.1585V11C18 8.38757 16.3304 6.16509 14 5.34142V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V5.34142C7.66962 6.16509 6 8.38757 6 11V14.1585C6 14.6973 5.78595 15.2141 5.40493 15.5951L4 17H9M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div 
            className="ml-4 flex items-center cursor-pointer group"
            onClick={onProfileClick}
        >
          <img className="h-10 w-10 rounded-full object-cover transition-all duration-300 group-hover:ring-2 group-hover:ring-[var(--accent-cyan)] shadow-lg" src={currentUser.avatarUrl} alt={currentUser.name} />
          <div className="ml-3 hidden sm:block">
            <p className="text-sm font-medium text-white">{currentUser.name}</p>
            <p className="text-xs text-[var(--text-secondary)]">{currentUser.department}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;