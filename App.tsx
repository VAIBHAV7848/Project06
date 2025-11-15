import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeFeed from './components/HomeFeed';
import NotesSection from './components/NotesSection';
import DonationBridge from './components/DonationBridge';
import EventsHub from './components/EventsHub';
import CampusMap from './components/CampusMap';
import DoubtSystem from './components/DoubtSystem';
import PYQsSection from './components/PYQsSection';
import StudyRooms from './components/StudyRooms';
import ProfilePage from './components/ProfilePage';
import { View, Post, Note, Doubt, PYQ, StudyRoom, DonationCampaign, Event, Answer, Reward } from './types';
import { INITIAL_POSTS, INITIAL_NOTES, INITIAL_DOUBTS, CURRENT_USER, INITIAL_PYQS, INITIAL_STUDY_ROOMS, INITIAL_CAMPAIGNS, INITIAL_EVENTS, INITIAL_REWARDS } from './constants';

// Helper function to get data from localStorage or fall back to initial data
const usePersistentState = <T,>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [state, setState] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error(error);
    }
  }, [key, state]);

  return [state, setState];
};


const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>(View.Home);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [posts, setPosts] = usePersistentState<Post[]>('kle-posts', INITIAL_POSTS);
  const [notes, setNotes] = usePersistentState<Note[]>('kle-notes', INITIAL_NOTES);
  const [doubts, setDoubts] = usePersistentState<Doubt[]>('kle-doubts', INITIAL_DOUBTS);
  const [pyqs, setPyqs] = usePersistentState<PYQ[]>('kle-pyqs', INITIAL_PYQS);
  const [studyRooms, setStudyRooms] = usePersistentState<StudyRoom[]>('kle-study-rooms', INITIAL_STUDY_ROOMS);
  const [campaigns, setCampaigns] = usePersistentState<DonationCampaign[]>('kle-campaigns', INITIAL_CAMPAIGNS);
  const [events, setEvents] = usePersistentState<Event[]>('kle-events', INITIAL_EVENTS);
  const [rewards, setRewards] = usePersistentState<Reward[]>('kle-rewards', INITIAL_REWARDS);
  const [registeredEventIds, setRegisteredEventIds] = usePersistentState<string[]>('kle-registered-events', []);

  const handleAddReward = (points: number, reason: string) => {
    const newReward: Reward = {
        id: `r${Date.now()}`,
        userId: CURRENT_USER.id,
        points,
        reason,
        timestamp: new Date().toISOString(),
    };
    setRewards(prev => [newReward, ...prev]);
  };

  const handleAddPost = (content: string) => {
    const newPost: Post = {
      id: `p${Date.now()}`,
      author: CURRENT_USER,
      content,
      timestamp: new Date().toLocaleDateString(),
      likedBy: [],
      comments: 0
    };
    setPosts(prevPosts => [newPost, ...prevPosts]);
    handleAddReward(10, "Created a new post");
  };

  const handleLikePost = (postId: string) => {
    setPosts(posts.map(p => {
        if (p.id === postId) {
            const liked = p.likedBy.includes(CURRENT_USER.id);
            const likedBy = liked ? p.likedBy.filter(uid => uid !== CURRENT_USER.id) : [...p.likedBy, CURRENT_USER.id];
            return { ...p, likedBy };
        }
        return p;
    }));
  };

  const handleAddNote = (note: Omit<Note, 'id' | 'uploader' | 'uploadDate' | 'downloads'>) => {
    const newNote: Note = {
      ...note,
      id: `n${Date.now()}`,
      uploader: CURRENT_USER,
      uploadDate: new Date().toISOString().split('T')[0],
      downloads: 0
    };
    setNotes(prevNotes => [newNote, ...prevNotes]);
    handleAddReward(25, `Uploaded note: ${note.title}`);
  };

  const handleAddDoubt = (question: string, subject: string) => {
    const newDoubt: Doubt = {
        id: `d${Date.now()}`,
        asker: CURRENT_USER,
        question,
        subject,
        timestamp: 'Just now',
        isResolved: false,
        answers: []
    };
    setDoubts(prevDoubts => [newDoubt, ...prevDoubts]);
    handleAddReward(5, "Asked a new doubt");
  };

  const handleAddAnswer = (doubtId: string, content: string) => {
      const newAnswer: Answer = {
          id: `a${Date.now()}`,
          author: CURRENT_USER,
          content,
          timestamp: 'Just now',
      };
      setDoubts(doubts.map(d => d.id === doubtId ? { ...d, answers: [...d.answers, newAnswer] } : d));
  };
  
  const handleToggleDoubtStatus = (doubtId: string) => {
      setDoubts(doubts.map(d => d.id === doubtId ? { ...d, isResolved: !d.isResolved } : d));
  };

  const handleToggleStudyRoom = (roomId: string) => {
    setStudyRooms(studyRooms.map(room => {
      if (room.id === roomId) {
        const userInRoom = room.activeUsers.some(user => user.id === CURRENT_USER.id);
        const activeUsers = userInRoom
          ? room.activeUsers.filter(user => user.id !== CURRENT_USER.id)
          : [...room.activeUsers, CURRENT_USER];
        return { ...room, activeUsers };
      }
      return room;
    }));
  };

  const handleRegisterEvent = (eventId: string) => {
    setRegisteredEventIds(prev =>
      prev.includes(eventId)
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    );
  };

  const handleDonate = (campaignId: string, amount: number) => {
    setCampaigns(campaigns.map(c =>
        c.id === campaignId ? { ...c, raised: c.raised + amount } : c
    ));
  };

  const userPoints = useMemo(() => {
    return rewards.filter(r => r.userId === CURRENT_USER.id).reduce((sum, r) => sum + r.points, 0);
  }, [rewards]);
  
  const filteredPosts = posts.filter(p => p.content.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredNotes = notes.filter(n => n.title.toLowerCase().includes(searchQuery.toLowerCase()) || n.subject.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredDoubts = doubts.filter(d => d.question.toLowerCase().includes(searchQuery.toLowerCase()) || d.subject.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredPyqs = pyqs.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.subject.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredRooms = studyRooms.filter(r => r.topic.toLowerCase().includes(searchQuery.toLowerCase()) || r.subject.toLowerCase().includes(searchQuery.toLowerCase()));

  const renderContent = () => {
    const props = {
      [View.Home]: { posts: filteredPosts, currentUser: CURRENT_USER, onAddPost: handleAddPost, onLikePost: handleLikePost },
      [View.Notes]: { notes: filteredNotes, onAddNote: handleAddNote },
      [View.Donations]: { campaigns, onDonate: handleDonate },
      [View.Events]: { events, registeredEventIds, onRegister: handleRegisterEvent },
      [View.Map]: {},
      [View.Doubts]: { doubts: filteredDoubts, onAddDoubt: handleAddDoubt, onAddAnswer: handleAddAnswer, onToggleResolve: handleToggleDoubtStatus },
      [View.PYQs]: { pyqs: filteredPyqs },
      [View.Study]: { rooms: filteredRooms, onToggleRoom: handleToggleStudyRoom },
      [View.Profile]: { currentUser: CURRENT_USER, posts, notes, doubts, rewards },
    };

    switch (activeView) {
      case View.Home: return <HomeFeed {...props[View.Home]} />;
      case View.Notes: return <NotesSection {...props[View.Notes]} />;
      case View.Donations: return <DonationBridge {...props[View.Donations]} />;
      case View.Events: return <EventsHub {...props[View.Events]} />;
      case View.Map: return <CampusMap />;
      case View.Doubts: return <DoubtSystem {...props[View.Doubts]} />;
      case View.PYQs: return <PYQsSection {...props[View.PYQs]} />;
      case View.Study: return <StudyRooms {...props[View.Study]} />;
      case View.Profile: return <ProfilePage {...props[View.Profile]} />;
      default: return <HomeFeed {...props[View.Home]} />;
    }
  };

  return (
    <div className="flex h-screen text-[var(--text-primary)] font-['Exo_2']">
      <div className="tech-grid-bg"></div>
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          userPoints={userPoints} 
          onProfileClick={() => setActiveView(View.Profile)} 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 md:p-8">
          <div key={activeView} className="content-enter">
            {renderContent()}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;