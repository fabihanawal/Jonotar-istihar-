import React from 'react';
import { Post, PostType } from '../types';
import { Heart, Clock, User, Tag } from 'lucide-react';

interface PostCardProps {
  post: Post;
  onLike: (id: string) => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onLike }) => {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('bn-BD', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col h-full">
      <div className="p-4 flex-grow">
        <div className="flex justify-between items-start mb-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
             <Tag size={12} className="mr-1" />
             {post.category}
          </span>
          <div className="flex items-center text-xs text-gray-500">
            <Clock size={12} className="mr-1" />
            {formatDate(post.timestamp)}
          </div>
        </div>

        {post.type === PostType.TEXT && (
          <p className="text-gray-800 text-base leading-relaxed whitespace-pre-wrap">{post.content}</p>
        )}

        {post.type === PostType.IMAGE && (
          <div className="mt-2 rounded-lg overflow-hidden border border-gray-100 bg-gray-50">
            <img 
              src={post.content} 
              alt="User submission" 
              className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500" 
            />
          </div>
        )}

        {post.type === PostType.AUDIO && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg flex flex-col items-center justify-center space-y-2">
            <div className="w-full h-12 bg-emerald-100 rounded-full flex items-center justify-center">
              <span className="text-emerald-700 font-medium text-sm">অডিও প্লেয়ার</span>
            </div>
            <audio controls className="w-full h-8 mt-2" src={post.content} />
          </div>
        )}
      </div>

      <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
        <div className="flex items-center text-sm text-gray-600 font-medium">
          <User size={14} className="mr-2" />
          {post.authorName || 'বেনামী'}
        </div>
        <button 
          onClick={() => onLike(post.id)}
          className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors group"
        >
          <Heart size={18} className={`transition-transform group-hover:scale-110 ${post.likes > 0 ? 'fill-red-500 text-red-500' : ''}`} />
          <span className="text-sm">{post.likes}</span>
        </button>
      </div>
    </div>
  );
};