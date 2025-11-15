import React from 'react';
import Card from './Card';
import { Event } from '../types';

const EventCard: React.FC<{ event: Event; isRegistered: boolean; onRegister: (eventId: string) => void; }> = ({ event, isRegistered, onRegister }) => (
  <Card className="overflow-hidden" padding="p-0">
    <div className="relative">
      <img className="h-48 w-full object-cover" src={event.imageUrl} alt={event.title} />
      <div 
        className="absolute top-4 -left-1 bg-cyan-500 text-black text-xs font-bold px-4 py-1"
        style={{clipPath: 'polygon(0% 0%, 100% 0%, 90% 100%, 0% 100%)'}}
      >
        {event.type}
      </div>
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold text-white transition-colors">{event.title}</h3>
      <p className="mt-2 text-sm text-[var(--text-secondary)]">{event.organizer}</p>
      <div className="mt-4 flex items-center text-[var(--text-primary)]">
        <svg className="w-5 h-5 mr-2 text-[var(--accent-cyan)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
        <span>{event.date}</span>
      </div>
       <div className="mt-2 flex items-center text-[var(--text-primary)]">
        <svg className="w-5 h-5 mr-2 text-[var(--accent-cyan)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
        <span>{event.location}</span>
      </div>
      <button 
        onClick={() => onRegister(event.id)}
        className={`mt-6 w-full ${
          isRegistered
            ? 'btn-solid-cyan'
            : 'btn-base btn-primary'
        }`}
      >
        {isRegistered ? '✓ Registered' : 'Register Now'}
      </button>
    </div>
  </Card>
);

interface EventsHubProps {
    events: Event[];
    registeredEventIds: string[];
    onRegister: (eventId: string) => void;
}

const EventsHub: React.FC<EventsHubProps> = ({ events, registeredEventIds, onRegister }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-white tracking-wider">EVENTS & COMMUNITY HUB</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map(event => (
            <EventCard 
                key={event.id} 
                event={event} 
                isRegistered={registeredEventIds.includes(event.id)}
                onRegister={onRegister}
            />
        ))}
      </div>
    </div>
  );
};

export default EventsHub;