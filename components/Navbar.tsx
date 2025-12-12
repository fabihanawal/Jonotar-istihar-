import React from 'react';
import { Menu, X } from 'lucide-react';
import { NavItem } from '../types';

interface NavbarProps {
  currentView: string;
  onChangeView: (view: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onChangeView }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems: NavItem[] = [
    { label: 'হোম', id: 'home' },
    { label: 'জনতার ওয়াল', id: 'wall' },
    { label: 'আমাদের কাজ', id: 'narrative' },
    { label: 'এডমিন', id: 'admin' },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button onClick={() => onChangeView('home')} className="flex-shrink-0 flex items-center cursor-pointer">
              <span className="text-2xl font-bold text-emerald-600">জনতার ইশতেহার</span>
            </button>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onChangeView(item.id)}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentView === item.id
                    ? 'text-emerald-700 bg-emerald-50'
                    : 'text-gray-700 hover:text-emerald-600 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-gray-100 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onChangeView(item.id);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                  currentView === item.id
                    ? 'text-emerald-700 bg-emerald-50'
                    : 'text-gray-700 hover:text-emerald-600 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};