import React, { useState, useMemo } from 'react';
import Card from './Card';
import { User, Post, Note, Doubt, Reward } from '../types';
import { HeartIconSolid } from './Icons';

interface ProfilePageProps {
  currentUser: User;
  posts: Post[];
  notes: Note[];
  doubts: Doubt[];
  rewards: Reward[];
}

const ProfilePage: React.FC<ProfilePageProps> = ({ currentUser, posts, notes, doubts, rewards }) => {
  const [activeTab, setActiveTab] = useState<'posts' | 'notes' | 'doubts'>('posts');

  const userPosts = useMemo(() => posts.filter(p => p.author.id === currentUser.id), [posts, currentUser.id]);
  const userNotes = useMemo(() => notes.filter(n => n.uploader.id === currentUser.id), [notes, currentUser.id]);
  const userDoubts = useMemo(() => doubts.filter(d => d.asker.id === currentUser.id), [doubts, currentUser.id]);
  const totalPoints = useMemo(() => rewards.filter(r => r.userId === currentUser.id).reduce((sum, r) => sum + r.points, 0), [rewards, currentUser.id]);


  const renderContent = () => {
    switch(activeTab) {
        case 'posts':
            return userPosts.length > 0 ? (
                <div className="space-y-4">
                    {userPosts.map(post => (
                        <Card key={post.id} padding="p-4">
                            <p className="text-[var(--text-primary)]">{post.content}</p>
                            <div className="flex items-center space-x-4 text-sm text-[var(--text-secondary)] mt-2">
                                <span>{post.timestamp}</span>
                                <span className="flex items-center text-red-500"><HeartIconSolid /> <span className="ml-1 text-[var(--text-secondary)]">{post.likedBy.length}</span></span>
                            </div>
                        </Card>
                    ))}
                </div>
            ) : <p className="text-center text-[var(--text-secondary)] py-8">No posts found.</p>;
        case 'notes':
             return userNotes.length > 0 ? (
                <div className="space-y-4">
                    {userNotes.map(note => (
                        <Card key={note.id} padding="p-4">
                            <h3 className="font-bold text-[var(--accent-blue)]">{note.title}</h3>
                            <p className="text-sm text-[var(--text-secondary)]">{note.subject} &bull; {note.downloads} downloads</p>
                        </Card>
                    ))}
                </div>
            ) : <p className="text-center text-[var(--text-secondary)] py-8">No notes uploaded.</p>;
        case 'doubts':
             return userDoubts.length > 0 ? (
                <div className="space-y-4">
                    {userDoubts.map(doubt => (
                        <Card key={doubt.id} padding="p-4">
                            <p className="font-medium text-[var(--text-primary)]">{doubt.question}</p>
                             <p className="text-sm text-[var(--text-secondary)]">{doubt.subject} &bull; {doubt.answers.length} answers</p>
                        </Card>
                    ))}
                </div>
            ) : <p className="text-center text-[var(--text-secondary)] py-8">No doubts asked.</p>;
        default:
            return null;
    }
  }

  const TabButton: React.FC<{tab: 'posts' | 'notes' | 'doubts'; label: string; count: number}> = ({tab, label, count}) => (
      <button
        onClick={() => setActiveTab(tab)}
        className={`px-4 py-2 text-sm font-medium rounded-md transition-all relative ${activeTab === tab ? 'text-white' : 'text-[var(--text-secondary)] hover:text-white'}`}
      >
        {label} <span className="bg-black/20 text-xs font-bold px-2 py-0.5 rounded-full ml-1">{count}</span>
        {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--accent-cyan)] shadow-[0_0_8px_var(--accent-cyan)]"></div>}
      </button>
  );


  return (
    <div className="max-w-4xl mx-auto">
      <Card className="mb-8">
        <div className="flex items-center">
          <div className="relative">
            <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-24 h-24 rounded-full object-cover" />
             <div className="absolute inset-0 rounded-full ring-4 ring-[var(--accent-blue)] ring-offset-4 ring-offset-[var(--bg-dark-navy)] animate-pulse"></div>
          </div>
          <div className="ml-8">
            <h1 className="text-3xl font-bold">{currentUser.name}</h1>
            <p className="text-[var(--text-secondary)]">{currentUser.department}</p>
            <div className="mt-2 text-lg font-bold text-yellow-400">{totalPoints} Points</div>
          </div>
        </div>
      </Card>
      
      <Card padding="p-0">
         <div className="p-2 border-b border-[var(--border-color)] flex space-x-2">
            <TabButton tab="posts" label="My Posts" count={userPosts.length} />
            <TabButton tab="notes" label="My Notes" count={userNotes.length} />
            <TabButton tab="doubts" label="My Doubts" count={userDoubts.length} />
         </div>
         <div className="p-4">
            {renderContent()}
         </div>
      </Card>
    </div>
  );
};

export default ProfilePage;