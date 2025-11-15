import React, { useState } from 'react';
import { INITIAL_LOCATIONS } from '../constants';
import { MapLocation } from '../types';
import Card from './Card';

const LocationMarker: React.FC<{ location: MapLocation, onClick: (loc: MapLocation) => void }> = ({ location, onClick }) => {
  const markerColor = {
    Department: 'border-cyan-400',
    Hostel: 'border-green-400',
    Canteen: 'border-yellow-400',
    Library: 'border-purple-400',
  }[location.type];

  return (
    <div 
      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
      style={{ top: location.top, left: location.left }}
      onClick={() => onClick(location)}
    >
      <div className="w-6 h-6 rounded-full border-2 bg-black/50 flex items-center justify-center animate-pulse">
        <div className={`w-2 h-2 rounded-full ${markerColor.replace('border-', 'bg-')} transition-transform group-hover:scale-150`}></div>
      </div>
       <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-black/80 text-white text-xs rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        {location.name}
      </div>
    </div>
  );
};

const CampusMap: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);

  const handleMarkerClick = (location: MapLocation) => {
    setSelectedLocation(location);
  };
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-white tracking-wider">CAMPUS NAVIGATION</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 relative w-full aspect-video bg-black/20 rounded-2xl overflow-hidden border border-[var(--border-color)]">
          <img src="https://picsum.photos/seed/map/1200/675" alt="Campus Map" className="w-full h-full object-cover opacity-20" />
          {INITIAL_LOCATIONS.map(loc => <LocationMarker key={loc.id} location={loc} onClick={handleMarkerClick} />)}
           <div className="absolute inset-0 bg-grid-pattern pointer-events-none"></div>
        </div>
        <Card>
          <h2 className="text-lg font-bold mb-4">LOCATION DETAILS</h2>
          {selectedLocation ? (
            <div>
              <h3 className="text-xl font-semibold text-[var(--accent-cyan)]">{selectedLocation.name}</h3>
              <p className="mt-1 text-[var(--text-secondary)]">{selectedLocation.type}</p>
              <p className="mt-4 text-[var(--text-primary)]">
                Detailed information about {selectedLocation.name} would appear here. This could include office hours, contact numbers, or a short description.
              </p>
            </div>
          ) : (
            <p className="text-[var(--text-secondary)]">Select a marker on the map to view details.</p>
          )}
        </Card>
      </div>
    </div>
  );
};

export default CampusMap;