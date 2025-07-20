import React, { useState } from 'react';
import { Star, Heart, Bookmark, Search, Filter, Calendar, User, TrendingUp } from 'lucide-react';
import { highlights } from '../../data/mockData';
import { useTheme } from '../../context/ThemeContext';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface HighlightsTabProps {
  onNotify: (notification: any) => void;
}

export const HighlightsTab: React.FC<HighlightsTabProps> = ({ onNotify }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [likedHighlights, setLikedHighlights] = useLocalStorage<string[]>('liked-highlights', []);
  const [bookmarkedHighlights, setBookmarkedHighlights] = useLocalStorage<string[]>('bookmarked-highlights', []);
  const { isDark } = useTheme();

  const categories = ['all', 'achievement', 'milestone', 'news', 'feature'];
  
  const filteredHighlights = highlights.filter(highlight => {
    const matchesSearch = highlight.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         highlight.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || highlight.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleLike = (highlightId: string) => {
    setLikedHighlights(prev => {
      if (prev.includes(highlightId)) {
        return prev.filter(id => id !== highlightId);
      } else {
        return [...prev, highlightId];
      }
    });
  };

  const handleBookmark = (highlightId: string) => {
    setBookmarkedHighlights(prev => {
      if (prev.includes(highlightId)) {
        return prev.filter(id => id !== highlightId);
      } else {
        return [...prev, highlightId];
      }
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'achievement': return <TrendingUp className="w-4 h-4" />;
      case 'milestone': return <Star className="w-4 h-4" />;
      case 'news': return <Calendar className="w-4 h-4" />;
      case 'feature': return <Star className="w-4 h-4" />;
      default: return <Star className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'achievement': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'milestone': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
      case 'news': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'feature': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Company Highlights
          </h1>
          <p className={`mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Celebrate achievements, milestones, and exciting news
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className={`px-4 py-2 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <div className="flex items-center space-x-2">
              <Bookmark className="w-4 h-4 text-blue-500" />
              <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {bookmarkedHighlights.length} bookmarked
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 mb-8`}>
        <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search highlights..."
              className={`w-full pl-10 pr-4 py-2 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className={`px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Highlights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredHighlights.map((highlight) => {
          const isLiked = likedHighlights.includes(highlight.id);
          const isBookmarked = bookmarkedHighlights.includes(highlight.id);
          
          return (
            <div
              key={highlight.id}
              className={`${isDark ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl group`}
            >
              <div className="relative overflow-hidden">
                <img
                  src={highlight.image}
                  alt={highlight.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute top-4 left-4">
                  <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(highlight.category)}`}>
                    {getCategoryIcon(highlight.category)}
                    <span className="capitalize">{highlight.category}</span>
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => handleBookmark(highlight.id)}
                    className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 ${
                      isBookmarked
                        ? 'bg-yellow-500 text-white'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className={`flex items-center space-x-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(highlight.date).toLocaleDateString()}</span>
                  </div>
                  <div className={`flex items-center space-x-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    <User className="w-4 h-4" />
                    <span>{highlight.author}</span>
                  </div>
                </div>

                <h3 className={`text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {highlight.title}
                </h3>

                <p className={`text-sm leading-relaxed mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {highlight.description}
                </p>

                <div className="flex items-center justify-between">
                  <button
                    onClick={() => handleLike(highlight.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                      isLiked
                        ? 'bg-red-500 text-white shadow-lg'
                        : isDark ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                    }`}
                  >
                    <Heart className={`w-4 h-4 transition-transform ${isLiked ? 'fill-current scale-110' : ''}`} />
                    <span>{highlight.likes + (isLiked ? 1 : 0)}</span>
                  </button>
                  <button
                    onClick={() => onNotify({
                      type: 'info',
                      title: 'Share Highlight',
                      message: `Sharing "${highlight.title}"`,
                      duration: 2000
                    })}
                    className={`px-4 py-2 rounded-lg border transition-all duration-300 hover:scale-105 ${isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-600 hover:bg-gray-50'}`}
                  >
                    Share
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredHighlights.length === 0 && (
        <div className={`text-center py-12 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          <Star className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium mb-2">No highlights found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};