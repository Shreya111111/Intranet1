import React, { useState, useEffect, useRef } from 'react';
import { Search, Users, FileText, Wrench, Calendar, Clock, TrendingUp } from 'lucide-react';
import { searchItems } from '../data/mockData';
import { SearchItem } from '../types';
import { useTheme } from '../context/ThemeContext';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onNotify: (notification: any) => void;
}

export const GlobalSearch: React.FC<GlobalSearchProps> = ({ isOpen, onClose, onNotify }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useLocalStorage<string[]>('recent-searches', []);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { isDark } = useTheme();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.length > 0) {
      setIsLoading(true);
      // Simulate search delay for realism
      const searchTimeout = setTimeout(() => {
      const filtered = searchItems.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
      setSelectedIndex(0);
        setIsLoading(false);
      }, 300);
      
      return () => clearTimeout(searchTimeout);
    } else {
      setResults([]);
      setIsLoading(false);
    }
  }, [query]);

  const handleSelect = (item: SearchItem) => {
    // Add to recent searches
    const newRecentSearches = [item.title, ...recentSearches.filter(s => s !== item.title)].slice(0, 5);
    setRecentSearches(newRecentSearches);
    
    // Show notification
    onNotify({
      type: 'success',
      title: 'Opening...',
      message: `Navigating to ${item.title}`,
      duration: 2000
    });
    
    onClose();
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      handleSelect(results[selectedIndex]);
    }
  };

  const getIcon = (type: SearchItem['type']) => {
    switch (type) {
      case 'person': return <Users className="w-4 h-4" />;
      case 'document': return <FileText className="w-4 h-4" />;
      case 'tool': return <Wrench className="w-4 h-4" />;
      case 'event': return <Calendar className="w-4 h-4" />;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-32">
      <div className={`w-full max-w-2xl mx-4 ${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 transform scale-100`}>
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search for people, documents, tools, or events..."
              className={`w-full pl-12 pr-4 py-4 ${isDark ? 'bg-gray-700 text-white placeholder-gray-400' : 'bg-gray-50 text-gray-900 placeholder-gray-500'} rounded-xl border-none outline-none text-lg`}
            />
            {isLoading && (
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
              </div>
            )}
          </div>
        </div>

        {query === '' && recentSearches.length > 0 && (
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className={`text-sm font-medium mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Recent Searches
            </h3>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => setQuery(search)}
                  className={`px-3 py-1 text-sm rounded-full ${isDark ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'} transition-colors`}
                >
                  <Clock className="w-3 h-3 inline mr-1" />
                  {search}
                </button>
              ))}
            </div>
          </div>
        )}

        {results.length > 0 && (
          <div className="max-h-96 overflow-y-auto">
            {results.map((item, index) => (
              <div
                key={item.id}
                className={`p-4 flex items-center space-x-3 cursor-pointer transition-colors ${
                  index === selectedIndex
                    ? isDark ? 'bg-gray-700' : 'bg-blue-50'
                    : isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                }`}
                onClick={() => {
                  handleSelect(item);
                }}
              >
                <div className={`p-2 rounded-lg ${
                  item.type === 'person' ? 'bg-blue-100 text-blue-600' :
                  item.type === 'document' ? 'bg-green-100 text-green-600' :
                  item.type === 'tool' ? 'bg-purple-100 text-purple-600' :
                  'bg-orange-100 text-orange-600'
                } ${isDark ? 'bg-opacity-20' : ''}`}>
                  {getIcon(item.type)}
                </div>
                <div className="flex-1">
                  <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {item.title}
                  </div>
                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {item.category}
                  </div>
                </div>
                <div className={`text-xs px-2 py-1 rounded-full ${
                  item.type === 'person' ? 'bg-blue-100 text-blue-700' :
                  item.type === 'document' ? 'bg-green-100 text-green-700' :
                  item.type === 'tool' ? 'bg-purple-100 text-purple-700' :
                  'bg-orange-100 text-orange-700'
                } ${isDark ? 'bg-opacity-20' : ''}`}>
                  {item.type}
                </div>
              </div>
            ))}
          </div>
        )}

        {query && results.length === 0 && !isLoading && (
          <div className="p-8 text-center">
            <div className={`text-lg font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              No results found
            </div>
            <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
              Try a different search term
            </div>
          </div>
        )}

        {query === '' && recentSearches.length === 0 && (
          <div className="p-8 text-center">
            <div className={`text-lg font-medium mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Quick Actions
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setQuery('team')}
                className={`p-3 rounded-lg ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors text-left`}
              >
                <Users className="w-5 h-5 mb-2 text-blue-500" />
                <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Find People</div>
              </button>
              <button
                onClick={() => setQuery('project')}
                className={`p-3 rounded-lg ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors text-left`}
              >
                <TrendingUp className="w-5 h-5 mb-2 text-green-500" />
                <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>View Projects</div>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};