import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SubmissionForm } from './components/SubmissionForm';
import { PublicWall } from './components/PublicWall';
import { NarrativeSection } from './components/NarrativeSection';
import { AdminDashboard } from './components/AdminDashboard';
import { Post, PostType, Category, PostStatus } from './types';
import { INITIAL_POSTS } from './constants';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);

  // Handle new post submission
  const handlePostSubmit = (content: string, type: PostType, category: Category, author?: string) => {
    const newPost: Post = {
      id: uuidv4(), // In real app, uuid or db id
      type,
      content,
      category,
      status: PostStatus.PENDING, // Default pending
      timestamp: Date.now(),
      likes: 0,
      authorName: author
    };
    
    // In a real app, this would be an API call
    setPosts(prev => [newPost, ...prev]);
  };

  // Handle post like
  const handleLike = (id: string) => {
    setPosts(prev => prev.map(post => 
      post.id === id ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  // Handle admin status update
  const handleStatusUpdate = (id: string, status: PostStatus) => {
    setPosts(prev => prev.map(post => 
      post.id === id ? { ...post, status } : post
    ));
  };

  // Handle banning an author
  const handleBanAuthor = (authorName: string) => {
    if (!authorName) return;
    if (window.confirm(`Are you sure you want to ban "${authorName}"? All their posts will be removed.`)) {
      setPosts(prev => prev.filter(post => post.authorName !== authorName));
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return (
          <div className="space-y-16 pb-16">
            <Hero onCtaClick={() => setCurrentView('wall')} />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="submission-section">
              <SubmissionForm onSubmit={handlePostSubmit} />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="public-wall-section">
               <PublicWall posts={posts} onLike={handleLike} />
            </div>

            <div className="bg-emerald-50 py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <NarrativeSection />
              </div>
            </div>
          </div>
        );
      case 'wall':
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
             <div className="mb-8">
               <SubmissionForm onSubmit={handlePostSubmit} />
             </div>
             <PublicWall posts={posts} onLike={handleLike} />
          </div>
        );
      case 'narrative':
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <NarrativeSection />
          </div>
        );
      case 'admin':
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <AdminDashboard 
              posts={posts} 
              onUpdateStatus={handleStatusUpdate} 
              onBanAuthor={handleBanAuthor}
            />
          </div>
        );
      default:
        return <div>Not Found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar currentView={currentView} onChangeView={setCurrentView} />
      {renderContent()}
      
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="mb-4 text-emerald-400 font-bold text-xl">জনতার ইশতেহার</p>
          <p className="text-gray-400">© ২০২৪ সর্বস্বত্ব সংরক্ষিত। ইনসাফ ও মানবতার সেবায়।</p>
        </div>
      </footer>
    </div>
  );
}

export default App;