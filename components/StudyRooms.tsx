import React from 'react';
import Card from './Card';
import { StudyRoom } from '../types';
import { CURRENT_USER } from '../constants';

const StudyRoomCard: React.FC<{ room: StudyRoom, onToggle: (roomId: string) => void }> = ({ room, onToggle }) => {
    const isUserInRoom = room.activeUsers.some(user => user.id === CURRENT_USER.id);

    return (
        <Card>
            <h3 className="text-xl font-bold text-green-400">{room.topic}</h3>
            <p className="text-sm font-medium text-[var(--text-secondary)] mt-1">{room.subject}</p>
            <div className="mt-4">
                <p className="text-sm font-semibold text-[var(--text-primary)]">ACTIVE USERS ({room.activeUsers.length}):</p>
                <div className="flex -space-x-2 overflow-hidden mt-2 min-h-[32px]">
                    {room.activeUsers.slice(0, 7).map(user => (
                        <img
                            key={user.id}
                            className="inline-block h-8 w-8 rounded-full ring-2 ring-black/50"
                            src={user.avatarUrl}
                            alt={user.name}
                            title={user.name}
                        />
                    ))}
                     {room.activeUsers.length > 7 && 
                        <span className="flex items-center justify-center h-8 w-8 rounded-full bg-slate-700 text-xs font-medium text-slate-300 ring-2 ring-black/50">
                           +{room.activeUsers.length - 7}
                        </span>
                     }
                </div>
            </div>
            <button 
                onClick={() => onToggle(room.id)}
                className={`mt-6 w-full btn-base ${
                    isUserInRoom ? 'btn-red' : 'btn-green'
                }`}
            >
                {isUserInRoom ? 'Leave Room' : 'Join Room'}
            </button>
        </Card>
    );
}

interface StudyRoomsProps {
    rooms: StudyRoom[];
    onToggleRoom: (roomId: string) => void;
}

const StudyRooms: React.FC<StudyRoomsProps> = ({ rooms, onToggleRoom }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-white tracking-wider">GROUP STUDY ROOMS</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {rooms.map(room => <StudyRoomCard key={room.id} room={room} onToggle={onToggleRoom} />)}
      </div>
    </div>
  );
};

export default StudyRooms;