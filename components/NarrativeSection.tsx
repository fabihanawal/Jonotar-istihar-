import React from 'react';
import { Heart, Users, Sun, Shield } from 'lucide-react';

export const NarrativeSection: React.FC = () => {
  return (
    <div className="space-y-12">
      {/* Introduction */}
      <section className="text-center py-10 px-4 bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">আমাদের লক্ষ্য: ইনসাফভিত্তিক সমাজ</h2>
          <p className="text-lg md:text-xl text-emerald-100 max-w-2xl mx-auto">
            আমরা বিশ্বাস করি একটি সুখী, সমৃদ্ধ ও ন্যায়বিচারপূর্ণ বাংলাদেশ গড়ার। যেখানে প্রতিটি নাগরিকের অধিকার সুনিশ্চিত থাকবে।
          </p>
        </div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      </section>

      {/* Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-emerald-500 hover:-translate-y-2 transition-transform duration-300">
          <div className="bg-emerald-100 w-14 h-14 rounded-full flex items-center justify-center mb-6">
            <Users className="text-emerald-600 w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">জনহিতৈষী কর্মকাণ্ড</h3>
          <p className="text-gray-600 leading-relaxed">
            শিক্ষা সহায়তা, স্বাস্থ্যসেবা ও দুর্যোগ ব্যবস্থাপনায় আমাদের নিরলস প্রচেষ্টা। আমরা মানুষের বিপদে পাশে দাঁড়াই সবার আগে।
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-red-500 hover:-translate-y-2 transition-transform duration-300">
          <div className="bg-red-100 w-14 h-14 rounded-full flex items-center justify-center mb-6">
            <Heart className="text-red-600 w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">শহীদদের প্রতি শ্রদ্ধা</h3>
          <p className="text-gray-600 leading-relaxed">
            জুলাই বিপ্লবসহ সকল গণতান্ত্রিক আন্দোলনে যারা জীবন দিয়েছেন, তাদের স্বপ্নকে আমরা লালন করি। তাদের আত্মত্যাগ আমাদের অনুপ্রেরণা।
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-yellow-500 hover:-translate-y-2 transition-transform duration-300">
          <div className="bg-yellow-100 w-14 h-14 rounded-full flex items-center justify-center mb-6">
            <Sun className="text-yellow-600 w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">সোনার বাংলা রূপরেখা</h3>
          <p className="text-gray-600 leading-relaxed">
            দুর্নীতিমুক্ত, ইনসাফপূর্ণ ও অর্থনৈতিকভাবে স্বাবলম্বী বাংলাদেশ গড়ার আমাদের সুনির্দিষ্ট পরিকল্পনা রয়েছে।
          </p>
        </div>
      </div>

      {/* Vision Highlight */}
      <section className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 p-8 md:p-12">
           <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 mb-4">
             <Shield className="w-3 h-3 mr-1"/> ভিশন ২০৩০
           </div>
           <h3 className="text-2xl font-bold text-gray-900 mb-4">আগামীর বাংলাদেশ</h3>
           <ul className="space-y-3">
             <li className="flex items-start">
               <div className="flex-shrink-0 h-6 w-6 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold mt-0.5 mr-3">✓</div>
               <p className="text-gray-600">সকলের জন্য মানসম্মত ও নৈতিক শিক্ষা নিশ্চিত করা।</p>
             </li>
             <li className="flex items-start">
               <div className="flex-shrink-0 h-6 w-6 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold mt-0.5 mr-3">✓</div>
               <p className="text-gray-600">তথ্যপ্রযুক্তি ও আধুনিক কৃষি নির্ভর অর্থনীতি।</p>
             </li>
             <li className="flex items-start">
               <div className="flex-shrink-0 h-6 w-6 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold mt-0.5 mr-3">✓</div>
               <p className="text-gray-600">ন্যায়বিচার নিশ্চিত করে মানুষের জান-মালের নিরাপত্তা বিধান।</p>
             </li>
           </ul>
        </div>
        <div className="md:w-1/2 h-64 md:h-auto bg-gray-200">
          <img src="https://picsum.photos/800/600?grayscale" alt="Vision" className="w-full h-full object-cover" />
        </div>
      </section>
    </div>
  );
};