import React, { useState } from 'react';
import Card from './Card';
import { Post, User } from '../types';
import { HeartIconOutline, HeartIconSolid } from './Icons';
import { CURRENT_USER } from '../constants';

const PostCard: React.FC<{ post: Post, onLike: (postId: string) => void }> = ({ post, onLike }) => {
    const isLiked = post.likedBy.includes(CURRENT_USER.id);
    
    return (
      <Card className="mb-6">
        <div className="flex items-start">
          <img className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-slate-700" src={post.author.avatarUrl} alt={post.author.name} />
          <div className="w-full">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-white">{post.author.name}</p>
                <p className="text-sm text-[var(--text-secondary)]">{post.timestamp}</p>
              </div>
              <button className="text-[var(--text-secondary)] hover:text-white">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path></svg>
              </button>
            </div>
            <p className="mt-3 text-[var(--text-primary)] whitespace-pre-wrap">{post.content}</p>
            <div className="mt-4 flex items-center space-x-6 text-[var(--text-secondary)]">
              <button onClick={() => onLike(post.id)} className={`flex items-center space-x-2 hover:text-red-500 transition-colors ${isLiked ? 'text-red-500' : ''}`}>
                {isLiked ? <HeartIconSolid /> : <HeartIconOutline />}
                <span>{post.likedBy.length}</span>
              </button>
              <button className="flex items-center space-x-2 hover:text-[var(--accent-cyan)]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 5.523-4.477 10-10 10S1 17.523 1 12 5.477 2 11 2s10 4.477 10 10z"></path></svg>
                <span>{post.comments}</span>
              </button>
            </div>
          </div>
        </div>
      </Card>
    );
};

interface HomeFeedProps {
    posts: Post[];
    currentUser: User;
    onAddPost: (content: string) => void;
    onLikePost: (postId: string) => void;
}

const HomeFeed: React.FC<HomeFeedProps> = ({ posts, currentUser, onAddPost, onLikePost }) => {
  const [postContent, setPostContent] = useState('');

  const handlePost = () => {
      if(postContent.trim()) {
          onAddPost(postContent);
          setPostContent('');
      }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-white tracking-wider">HOME FEED</h1>
      <Card className="mb-6">
        <div className="flex items-start">
          <img className="w-12 h-12 rounded-full object-cover mr-4" src={currentUser.avatarUrl} alt={currentUser.name} />
          <textarea 
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            className="w-full p-3 text-[var(--text-primary)] rounded-lg input-high-tech" 
            rows={3} 
            placeholder={`Interface with the network, ${currentUser.name.split(' ')[0]}...`}
          ></textarea>
        </div>
        <div className="flex justify-end mt-4">
          <button onClick={handlePost} className="btn-base btn-primary">Broadcast</button>
        </div>
      </Card>
      
      <div>
        {posts.map(post => <PostCard key={post.id} post={post} onLike={onLikePost} />)}
      </div>
    </div>
  );
};

export default HomeFeed;