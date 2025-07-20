import React, { useState } from 'react';
import { FolderOpen, Download, Star, Search, Filter, FileText, Wrench, Layout, BookOpen, ExternalLink } from 'lucide-react';
import { resources } from '../../data/mockData';
import { useTheme } from '../../context/ThemeContext';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface ResourcesTabProps {
  onNotify: (notification: any) => void;
}

export const ResourcesTab: React.FC<ResourcesTabProps> = ({ onNotify }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'downloads' | 'rating' | 'updated'>('name');
  const [bookmarkedResources, setBookmarkedResources] = useLocalStorage<string[]>('bookmarked-resources', []);
  const { isDark } = useTheme();

  const categories = ['all', 'document', 'tool', 'template', 'guide'];
  
  const filteredResources = resources
    .filter(resource => {
      const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = categoryFilter === 'all' || resource.category === categoryFilter;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'downloads': return b.downloadCount - a.downloadCount;
        case 'rating': return b.rating - a.rating;
        case 'updated': return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
        default: return a.title.localeCompare(b.title);
      }
    });

  const handleDownload = (resourceId: string, resourceTitle: string) => {
    onNotify({
      type: 'success',
      title: 'Download Started',
      message: `Downloading "${resourceTitle}"`,
      duration: 3000
    });
  };

  const handleBookmark = (resourceId: string) => {
    setBookmarkedResources(prev => {
      if (prev.includes(resourceId)) {
        return prev.filter(id => id !== resourceId);
      } else {
        return [...prev, resourceId];
      }
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'document': return <FileText className="w-5 h-5" />;
      case 'tool': return <Wrench className="w-5 h-5" />;
      case 'template': return <Layout className="w-5 h-5" />;
      case 'guide': return <BookOpen className="w-5 h-5" />;
      default: return <FolderOpen className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'document': return 'from-blue-500 to-blue-600';
      case 'tool': return 'from-green-500 to-green-600';
      case 'template': return 'from-purple-500 to-purple-600';
      case 'guide': return 'from-orange-500 to-orange-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Resource Library
          </h1>
          <p className={`mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Access documents, tools, templates, and guides
          </p>
        </div>
        <button
          onClick={() => onNotify({
            type: 'info',
            title: 'Upload Resource',
            message: 'Resource upload form would open here',
            duration: 2000
          })}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 hover:scale-105"
        >
          <FolderOpen className="w-4 h-4" />
          <span>Upload Resource</span>
        </button>
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
              placeholder="Search resources..."
              className={`w-full pl-10 pr-4 py-2 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
            />
          </div>
          <div className="flex items-center space-x-4">
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
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className={`px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
            >
              <option value="name">Sort by Name</option>
              <option value="downloads">Sort by Downloads</option>
              <option value="rating">Sort by Rating</option>
              <option value="updated">Sort by Updated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => (
          <div
            key={resource.id}
            className={`${isDark ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} rounded-xl shadow-lg p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl group`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 bg-gradient-to-br ${getCategoryColor(resource.category)} rounded-lg text-white group-hover:scale-110 transition-transform`}>
                {getCategoryIcon(resource.category)}
              </div>
              <button
                onClick={() => handleBookmark(resource.id)}
                className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                  bookmarkedResources.includes(resource.id)
                    ? 'text-yellow-500'
                    : isDark ? 'text-gray-400 hover:text-yellow-500' : 'text-gray-500 hover:text-yellow-500'
                }`}
              >
                <Star className={`w-5 h-5 ${bookmarkedResources.includes(resource.id) ? 'fill-current' : ''}`} />
              </button>
            </div>

            <h3 className={`text-lg font-bold mb-2 group-hover:text-blue-600 transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {resource.title}
            </h3>

            <p className={`text-sm mb-4 line-clamp-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {resource.description}
            </p>

            <div className="flex items-center space-x-1 mb-3">
              {renderStars(resource.rating)}
              <span className={`text-sm ml-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                ({resource.rating})
              </span>
            </div>

            <div className={`flex items-center justify-between text-xs mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              <span>{resource.downloadCount} downloads</span>
              {resource.fileSize && <span>{resource.fileSize}</span>}
              <span>Updated {new Date(resource.lastUpdated).toLocaleDateString()}</span>
            </div>

            <div className="flex flex-wrap gap-1 mb-4">
              {resource.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className={`px-2 py-1 text-xs rounded-full ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}
                >
                  {tag}
                </span>
              ))}
              {resource.tags.length > 3 && (
                <span className={`px-2 py-1 text-xs rounded-full ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                  +{resource.tags.length - 3}
                </span>
              )}
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => handleDownload(resource.id, resource.title)}
                className="flex-1 flex items-center justify-center space-x-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all duration-300 hover:scale-105 font-medium"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
              <button
                onClick={() => onNotify({
                  type: 'info',
                  title: 'Resource Preview',
                  message: `Previewing "${resource.title}"`,
                  duration: 2000
                })}
                className={`px-4 py-2 rounded-lg border transition-all duration-300 hover:scale-105 ${isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-600 hover:bg-gray-50'}`}
              >
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className={`text-center py-12 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          <FolderOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium mb-2">No resources found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};