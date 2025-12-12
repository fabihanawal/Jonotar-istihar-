import React, { useState } from 'react';
import { Post, PostStatus, Category, PostType } from '../types';
import { PostCard } from './PostCard';
import { Filter, Layers } from 'lucide-react';

interface PublicWallProps {
  posts: Post[];
  onLike: (id: string) => void;
}

export const PublicWall: React.FC<PublicWallProps> = ({ posts, onLike }) => {
  const [filterCategory, setFilterCategory] = useState<Category | 'ALL'>('ALL');
  const [filterType, setFilterType] = useState<PostType | 'ALL'>('ALL');
  
  const approvedPosts = posts.filter(post => post.status === PostStatus.APPROVED);
  
  const filteredPosts = approvedPosts.filter(post => {
    const matchCategory = filterCategory === 'ALL' || post.category === filterCategory;
    const matchType = filterType === 'ALL' || post.type === filterType;
    return matchCategory && matchType;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-lg shadow-sm gap-4">
        <h2 className="text-2xl font-bold text-gray-800">জনতার ওয়াল</h2>
        
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          {/* Category Filter */}
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <Filter className="text-gray-500 h-5 w-5 flex-shrink-0" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value as Category | 'ALL')}
              className="form-select w-full sm:w-48 rounded-md border-gray-300 text-sm focus:border-emerald-500 focus:ring-emerald-500 border p-2 bg-gray-50"
            >
              <option value="ALL">সকল ক্যাটাগরি</option>
              {Object.values(Category).map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Type Filter */}
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <Layers className="text-gray-500 h-5 w-5 flex-shrink-0" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as PostType | 'ALL')}
              className="form-select w-full sm:w-40 rounded-md border-gray-300 text-sm focus:border-emerald-500 focus:ring-emerald-500 border p-2 bg-gray-50"
            >
              <option value="ALL">সকল মিডিয়া</option>
              <option value={PostType.TEXT}>লেখা (Text)</option>
              <option value={PostType.IMAGE}>ছবি (Image)</option>
              <option value={PostType.AUDIO}>অডিও (Audio)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <PostCard key={post.id} post={post} onLike={onLike} />
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed flex flex-col items-center">
            <Filter className="h-12 w-12 text-gray-300 mb-2" />
            <p>আপনার ফিল্টার অনুযায়ী কোন পোস্ট পাওয়া যায়নি।</p>
          </div>
        )}
      </div>
    </div>
  );
};