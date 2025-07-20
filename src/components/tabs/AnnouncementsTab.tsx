import React, { useState } from 'react';
import { Megaphone, Heart, MessageCircle, Search, Filter, Plus, AlertTriangle, Info, CheckCircle } from 'lucide-react';
import { announcements } from '../../data/mockData';
import { useTheme } from '../../context/ThemeContext';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface AnnouncementsTabProps {
  onNotify: (notification: any) => void;
}

export const AnnouncementsTab: React.FC<AnnouncementsTabProps> = ({ onNotify }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [likedAnnouncements, setLikedAnnouncements] = useLocalStorage<string[]>('liked-announcements', []);
  const [readAnnouncements, setReadAnnouncements] = useLocalStorage<string[]>('read-announcements', []);
  const { isDark } = useTheme();

  const priorities = ['all', 'urgent', 'high', 'medium', 'low'];
  const categories = ['all', ...Array.from(new Set(announcements.map(a => a.category)))];
  
  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         announcement.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = priorityFilter === 'all' || announcement.priority === priorityFilter;
    const matchesCategory = categoryFilter === 'all' || announcement.category === categoryFilter;
    return matchesSearch && matchesPriority && matchesCategory;
  });

  const handleLike = (announcementId: string) => {
    setLikedAnnouncements(prev => {
      if (prev.includes(announcementId)) {
        return prev.filter(id => id !== announcementId);
      } else {
        return [...prev, announcementId];
      }
    });
  };

  const handleMarkAsRead = (announcementId: string) => {
    setReadAnnouncements(prev => {
      if (!prev.includes(announcementId)) {
        return [...prev, announcementId];
      }
      return prev;
    });
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent': return <AlertTriangle className="w-4 h-4" />;
      case 'high': return <Info className="w-4 h-4" />;
      case 'medium': return <CheckCircle className="w-4 h-4" />;
      case 'low': return <Info className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      case 'high': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400';
      case 'medium': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'low': return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const unreadCount = announcements.filter(a => !readAnnouncements.includes(a.id)).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Announcements
            {unreadCount > 0 && (
              <span className="ml-3 px-3 py-1 text-sm bg-red-500 text-white rounded-full">
                {unreadCount} new
              </span>
            )}
          </h1>
          <p className={`mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Stay informed with the latest company updates and news
          </p>
        </div>
        <button
          onClick={() => onNotify({
            type: 'info',
            title: 'Create Announcement',
            message: 'Announcement creation form would open here',
            duration: 2000
          })}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          <span>New Announcement</span>
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
              placeholder="Search announcements..."
              className={`w-full pl-10 pr-4 py-2 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
            />
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className={`px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
              >
                {priorities.map(priority => (
                  <option key={priority} value={priority}>
                    {priority === 'all' ? 'All Priorities' : priority.charAt(0).toUpperCase() + priority.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className={`px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Announcements List */}
      <div className="space-y-6">
        {filteredAnnouncements.map((announcement) => {
          const isRead = readAnnouncements.includes(announcement.id);
          const isLiked = likedAnnouncements.includes(announcement.id);
          
          return (
            <div
              key={announcement.id}
              className={`${isDark ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl ${!isRead ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}`}
              onClick={() => handleMarkAsRead(announcement.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={announcement.authorAvatar}
                    alt={announcement.author}
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
                  />
                  <div>
                    <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {announcement.title}
                      {!isRead && (
                        <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full inline-block animate-pulse"></span>
                      )}
                    </h3>
                    <div className={`flex items-center space-x-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      <span>{announcement.author}</span>
                      <span>•</span>
                      <span>{announcement.authorRole}</span>
                      <span>•</span>
                      <span>{new Date(announcement.timestamp).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(announcement.priority)}`}>
                    {getPriorityIcon(announcement.priority)}
                    <span className="capitalize">{announcement.priority}</span>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                    {announcement.category}
                  </div>
                </div>
              </div>

              <p className={`text-lg leading-relaxed mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {announcement.content}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(announcement.id);
                    }}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                      isLiked
                        ? 'bg-red-500 text-white shadow-lg'
                        : isDark ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                    }`}
                  >
                    <Heart className={`w-4 h-4 transition-transform ${isLiked ? 'fill-current scale-110' : ''}`} />
                    <span>{announcement.likes + (isLiked ? 1 : 0)}</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onNotify({
                        type: 'info',
                        title: 'Comments',
                        message: `Viewing comments for "${announcement.title}"`,
                        duration: 2000
                      });
                    }}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${isDark ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{announcement.comments}</span>
                  </button>
                </div>
                {!isRead && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMarkAsRead(announcement.id);
                      onNotify({
                        type: 'success',
                        title: 'Marked as Read',
                        message: 'Announcement marked as read',
                        duration: 2000
                      });
                    }}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 hover:scale-105 text-sm font-medium"
                  >
                    Mark as Read
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredAnnouncements.length === 0 && (
        <div className={`text-center py-12 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          <Megaphone className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium mb-2">No announcements found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};