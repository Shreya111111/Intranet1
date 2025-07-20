import React from 'react';
import { Search, Bell, Settings, User } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  onSearchOpen: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearchOpen }) => {
  const { isDark } = useTheme();

  return (
    <header className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b transition-all duration-300 sticky top-0 z-40 backdrop-blur-sm`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <div>
                <h1 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Axero Intranet
                </h1>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Welcome back!
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={onSearchOpen}
              className={`flex items-center space-x-2 px-4 py-2 ${isDark ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'} rounded-lg transition-all duration-300 hover:scale-105`}
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">Search</span>
              <kbd className={`px-2 py-1 text-xs ${isDark ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-500'} rounded`}>
                ⌘K
              </kbd>
            </button>

            <button className={`p-3 rounded-xl ${isDark ? 'hover:bg-gray-700 text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'} transition-all duration-300 hover:scale-105 relative`}>
              <Bell className="w-5 h-5" />
              <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></div>
            </button>

            <ThemeToggle />

            <button className={`p-3 rounded-xl ${isDark ? 'hover:bg-gray-700 text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'} transition-all duration-300 hover:scale-105`}>
              <Settings className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3">
              <img
                src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop"
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};