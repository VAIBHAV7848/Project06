import React from 'react';
import { View } from '../types';
import { HomeIcon, NotesIcon, DonateIcon, EventsIcon, MapIcon, DoubtsIcon, PYQsIcon, StudyIcon } from './Icons';

interface SidebarProps {
  activeView: View;
  setActiveView: (view: View) => void;
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: View;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`relative flex items-center w-full px-4 py-3 transition-colors duration-300 rounded-lg group ${
      isActive
        ? 'text-white'
        : 'text-[var(--text-secondary)] hover:text-white'
    }`}
  >
    {isActive && (
      <div className="absolute inset-0 bg-white/5 rounded-lg -z-10"></div>
    )}
    <div className={`absolute left-0 h-full w-1 transition-all duration-300 rounded-r-full ${isActive ? 'bg-cyan-400' : 'bg-transparent'}`}></div>
    <div className={`absolute left-2 text-cyan-400 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}>[</div>
    <div className={`absolute right-2 text-cyan-400 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}>]</div>
    
    <div className={`transition-transform duration-300 ${isActive ? 'scale-110 text-cyan-400' : 'group-hover:text-white'}`}>{icon}</div>
    <span className="mx-4 font-medium hidden md:inline">{label}</span>
  </button>
);

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
  const navItems = [
    { icon: <HomeIcon />, label: View.Home },
    { icon: <NotesIcon />, label: View.Notes },
    { icon: <PYQsIcon />, label: View.PYQs },
    { icon: <DoubtsIcon />, label: View.Doubts },
    { icon: <StudyIcon />, label: View.Study },
    { icon: <EventsIcon />, label: View.Events },
    { icon: <MapIcon />, label: View.Map },
    { icon: <DonateIcon />, label: View.Donations },
  ];

  return (
    <aside className="flex flex-col w-20 md:w-64 h-full p-4 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30 bg-black/20 border-r border-white/10">
       <div className="flex items-center justify-center md:justify-start px-2 mb-6">
         <div className="w-10 h-10 bg-cyan-500/20 border border-cyan-500 rounded-full flex items-center justify-center text-cyan-300 font-bold text-xl shadow-[0_0_20px_rgba(34,211,238,0.4)]">K</div>
         <h2 className="text-xl font-bold text-white ml-3 hidden md:block" style={{textShadow: '0 0 8px rgba(34,211,238,0.7)'}}>KLE Connect</h2>
       </div>

      <div className="flex flex-col justify-between flex-1 mt-4">
        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              isActive={activeView === item.label}
              onClick={() => setActiveView(item.label)}
            />
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;