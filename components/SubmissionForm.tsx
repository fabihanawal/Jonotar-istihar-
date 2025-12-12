import React, { useState, useRef } from 'react';
import { Send, Image as ImageIcon, Mic, X } from 'lucide-react';
import { Button } from './Button';
import { CATEGORIES } from '../constants';
import { Category, PostType } from '../types';

interface SubmissionFormProps {
  onSubmit: (content: string, type: PostType, category: Category, author?: string) => void;
}

export const SubmissionForm: React.FC<SubmissionFormProps> = ({ onSubmit }) => {
  const [activeTab, setActiveTab] = useState<PostType>(PostType.TEXT);
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<Category>(Category.OTHERS);
  const [authorName, setAuthorName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((activeTab === PostType.TEXT && !content.trim()) || 
        (activeTab !== PostType.TEXT && !file)) {
      return;
    }

    setIsSubmitting(true);

    // Simulate upload delay
    setTimeout(() => {
      let finalContent = content;
      if (activeTab === PostType.IMAGE || activeTab === PostType.AUDIO) {
        // Mock URL for demo
        finalContent = file ? URL.createObjectURL(file) : '';
      }

      onSubmit(finalContent, activeTab, category, authorName);
      
      // Reset form
      setContent('');
      setFile(null);
      setAuthorName('');
      setCategory(Category.OTHERS);
      if (fileInputRef.current) fileInputRef.current.value = '';
      setIsSubmitting(false);
      
      alert("আপনার আপলোড সম্পূর্ণ হয়েছে। ধন্যবাদ! নিরাপত্তা ও মান যাচাইয়ের জন্য আপনার ইনপুটটি ওয়ালে প্রদর্শিত হওয়ার জন্য অনুগ্রহ করে ১৫ মিনিট সময় দিন।");
    }, 1500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto border border-emerald-100">
      <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">আপনার আকাঙ্ক্ষা ও মতামত জানান</h2>
      
      {/* Tabs */}
      <div className="flex space-x-2 mb-6 bg-gray-100 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab(PostType.TEXT)}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${activeTab === PostType.TEXT ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
        >
          <span className="flex items-center justify-center gap-2"><Send size={16} /> লিখুন</span>
        </button>
        <button
          onClick={() => setActiveTab(PostType.IMAGE)}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${activeTab === PostType.IMAGE ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
        >
          <span className="flex items-center justify-center gap-2"><ImageIcon size={16} /> ছবি</span>
        </button>
        <button
          onClick={() => setActiveTab(PostType.AUDIO)}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${activeTab === PostType.AUDIO ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
        >
          <span className="flex items-center justify-center gap-2"><Mic size={16} /> অডিও</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Category Select */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">ক্যাটাগরি নির্বাচন করুন</label>
          <select 
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 p-2 border"
          >
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Input Area */}
        {activeTab === PostType.TEXT && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">আপনার মতামত (সর্বোচ্চ ৫০০ শব্দ)</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 p-2 border"
              placeholder="এখানে লিখুন..."
              required
            />
          </div>
        )}

        {(activeTab === PostType.IMAGE || activeTab === PostType.AUDIO) && (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-emerald-500 transition-colors">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept={activeTab === PostType.IMAGE ? "image/png, image/jpeg" : "audio/mp3, audio/wav"}
              className="hidden"
              id="file-upload"
              required
            />
            <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
              {file ? (
                <div className="flex items-center gap-2 text-emerald-600 font-medium">
                   <span>{file.name}</span>
                   <button type="button" onClick={(e) => { e.preventDefault(); setFile(null); }} className="text-red-500"><X size={16}/></button>
                </div>
              ) : (
                <>
                  {activeTab === PostType.IMAGE ? <ImageIcon className="h-10 w-10 text-gray-400 mb-2" /> : <Mic className="h-10 w-10 text-gray-400 mb-2" />}
                  <span className="text-sm text-gray-500">
                    {activeTab === PostType.IMAGE ? 'হাতে লেখা পেজের ছবি আপলোড করুন' : 'আপনার বক্তব্য রেকর্ড করে আপলোড করুন'}
                  </span>
                  <span className="text-xs text-gray-400 mt-1">
                    {activeTab === PostType.IMAGE ? 'JPG, PNG ফরম্যাট' : 'MP3, WAV ফরম্যাট (সর্বোচ্চ ২ মিনিট)'}
                  </span>
                </>
              )}
            </label>
          </div>
        )}

        {/* Name (Optional) */}
        <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">আপনার নাম (ঐচ্ছিক)</label>
           <input
             type="text"
             value={authorName}
             onChange={(e) => setAuthorName(e.target.value)}
             className="w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 p-2 border"
             placeholder="আপনার নাম"
           />
        </div>

        <Button 
          type="submit" 
          disabled={isSubmitting} 
          className="w-full"
        >
          {isSubmitting ? 'আপলোড হচ্ছে...' : 'জমা দিন'}
        </Button>
      </form>
    </div>
  );
};