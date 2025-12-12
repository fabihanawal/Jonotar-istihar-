import React, { useState } from 'react';
import { Post, PostStatus, Category } from '../types';
import { Button } from './Button';
import { generateManifestoSummary } from '../services/geminiService';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Check, X, AlertCircle, FileText, Loader2, Ban } from 'lucide-react';

interface AdminDashboardProps {
  posts: Post[];
  onUpdateStatus: (id: string, status: PostStatus) => void;
  onBanAuthor?: (authorName: string) => void;
}

const COLORS = ['#059669', '#10B981', '#34D399', '#6EE7B7', '#A7F3D0', '#D1FAE5', '#ECFDF5', '#F0FDFA'];

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ posts, onUpdateStatus, onBanAuthor }) => {
  const [activeTab, setActiveTab] = useState<'MODERATION' | 'ANALYTICS' | 'MANIFESTO'>('MODERATION');
  const [manifesto, setManifesto] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  const pendingPosts = posts.filter(p => p.status === PostStatus.PENDING);

  // Analytics Data Prep
  const categoryData = Object.values(Category).map(cat => ({
    name: cat,
    value: posts.filter(p => p.category === cat).length
  }));

  const statusData = [
    { name: 'Approved', value: posts.filter(p => p.status === PostStatus.APPROVED).length },
    { name: 'Pending', value: posts.filter(p => p.status === PostStatus.PENDING).length },
    { name: 'Rejected', value: posts.filter(p => p.status === PostStatus.REJECTED).length },
  ];

  const handleGenerateManifesto = async () => {
    setIsGenerating(true);
    const result = await generateManifestoSummary(posts);
    setManifesto(result);
    setIsGenerating(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 min-h-[600px]">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-800">এডমিন ড্যাশবোর্ড</h2>
        <div className="flex space-x-2 mt-4 sm:mt-0">
          <Button 
            variant={activeTab === 'MODERATION' ? 'primary' : 'outline'} 
            onClick={() => setActiveTab('MODERATION')}
            size="sm"
          >
            মডারেশন ({pendingPosts.length})
          </Button>
          <Button 
            variant={activeTab === 'ANALYTICS' ? 'primary' : 'outline'} 
            onClick={() => setActiveTab('ANALYTICS')}
             size="sm"
          >
            এনালিটিক্স
          </Button>
          <Button 
            variant={activeTab === 'MANIFESTO' ? 'primary' : 'outline'} 
            onClick={() => setActiveTab('MANIFESTO')}
             size="sm"
          >
            AI ইশতেহার
          </Button>
        </div>
      </div>

      {activeTab === 'MODERATION' && (
        <div className="space-y-4">
          {pendingPosts.length === 0 ? (
             <div className="text-center py-10 text-gray-500">
               <Check className="mx-auto h-12 w-12 text-emerald-200 mb-2" />
               কোন পেন্ডিং পোস্ট নেই। সব ক্লিয়ার!
             </div>
          ) : (
            pendingPosts.map(post => (
              <div key={post.id} className="border border-gray-200 rounded-lg p-4 flex flex-col md:flex-row gap-4 items-start md:items-center bg-gray-50">
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold bg-gray-200 px-2 py-1 rounded">{post.category}</span>
                    <span className="text-xs text-gray-500">{post.type}</span>
                    <span className="text-xs text-gray-500">{new Date(post.timestamp).toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-gray-800 mb-2">
                    {post.type === 'TEXT' ? post.content : `[Media Content: ${post.type}]`}
                  </p>
                  {post.type === 'IMAGE' && <img src={post.content} alt="Preview" className="h-20 w-auto rounded border" />}
                  <p className="text-xs text-gray-500">Author: {post.authorName || 'Anonymous'}</p>
                </div>
                <div className="flex gap-2 min-w-[160px]">
                  <Button 
                    variant="primary" 
                    size="sm" 
                    onClick={() => onUpdateStatus(post.id, PostStatus.APPROVED)}
                    className="bg-emerald-600 hover:bg-emerald-700 p-2"
                    title="Approve"
                  >
                    <Check size={16} />
                  </Button>
                  <Button 
                    variant="danger" 
                    size="sm" 
                    onClick={() => onUpdateStatus(post.id, PostStatus.REJECTED)}
                    className="bg-orange-500 hover:bg-orange-600 p-2"
                    title="Reject"
                  >
                    <X size={16} />
                  </Button>
                  {onBanAuthor && post.authorName && (
                    <Button 
                      variant="danger"
                      size="sm"
                      onClick={() => onBanAuthor(post.authorName!)}
                      className="bg-red-600 hover:bg-red-700 p-2"
                      title={`Ban ${post.authorName}`}
                    >
                      <Ban size={16} />
                    </Button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'ANALYTICS' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="h-80 bg-white p-4 rounded-lg border">
            <h3 className="text-lg font-semibold mb-4 text-center">ক্যাটাগরি ভিত্তিক চাহিদা</h3>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({name, percent}) => percent > 0 ? `${name} ${(percent * 100).toFixed(0)}%` : ''}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="h-80 bg-white p-4 rounded-lg border">
            <h3 className="text-lg font-semibold mb-4 text-center">পোস্ট স্ট্যাটাস</h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {activeTab === 'MANIFESTO' && (
        <div className="bg-slate-50 p-6 rounded-lg min-h-[400px]">
          <div className="flex justify-between items-center mb-6">
             <div className="flex items-center gap-2">
                <FileText className="text-emerald-600" />
                <h3 className="text-lg font-bold">AI জেনারেটেড ইশতেহার খসড়া</h3>
             </div>
             <Button onClick={handleGenerateManifesto} disabled={isGenerating}>
               {isGenerating ? <><Loader2 className="animate-spin mr-2 h-4 w-4"/> তৈরি হচ্ছে...</> : 'ইশতেহার তৈরি করুন'}
             </Button>
          </div>
          
          <div className="bg-white border p-6 rounded-lg shadow-sm whitespace-pre-wrap leading-7 text-gray-800">
            {manifesto ? manifesto : (
              <div className="text-center text-gray-400 py-12">
                এখনও কোন ইশতেহার তৈরি করা হয়নি। 'ইশতেহার তৈরি করুন' বাটনে ক্লিক করুন।
                <p className="text-xs mt-2">এটি অনুমোদিত পোস্টগুলো বিশ্লেষণ করে স্বয়ংক্রিয়ভাবে তৈরি হবে।</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};