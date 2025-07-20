import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Users, Plus, Filter, Search } from 'lucide-react';
import { events } from '../../data/mockData';
import { useTheme } from '../../context/ThemeContext';

interface EventsTabProps {
  onNotify: (notification: any) => void;
}

export const EventsTab: React.FC<EventsTabProps> = ({ onNotify }) => {
  const [filter, setFilter] = useState<'all' | 'meeting' | 'lunch' | 'hackathon' | 'holiday'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const { isDark } = useTheme();

  const filteredEvents = events.filter(event => {
    const matchesFilter = filter === 'all' || event.type === filter;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleRSVP = (eventId: string, eventTitle: string) => {
    onNotify({
      type: 'success',
      title: 'RSVP Confirmed!',
      message: `You're registered for "${eventTitle}"`,
      duration: 3000
    });
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'meeting': return <Calendar className="w-5 h-5" />;
      case 'lunch': return <Users className="w-5 h-5" />;
      case 'hackathon': return <Calendar className="w-5 h-5" />;
      case 'holiday': return <Calendar className="w-5 h-5" />;
      default: return <Calendar className="w-5 h-5" />;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'from-blue-500 to-blue-600';
      case 'lunch': return 'from-green-500 to-green-600';
      case 'hackathon': return 'from-purple-500 to-purple-600';
      case 'holiday': return 'from-orange-500 to-orange-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Events & Calendar
          </h1>
          <p className={`mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Stay up to date with company events and activities
          </p>
        </div>
        <button
          onClick={() => onNotify({
            type: 'info',
            title: 'Create Event',
            message: 'Event creation form would open here',
            duration: 2000
          })}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          <span>Create Event</span>
        </button>
      </div>

      {/* Filters and Search */}
      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 mb-8`}>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search events..."
                className={`pl-10 pr-4 py-2 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className={`px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
              >
                <option value="all">All Events</option>
                <option value="meeting">Meetings</option>
                <option value="lunch">Team Lunches</option>
                <option value="hackathon">Hackathons</option>
                <option value="holiday">Holidays</option>
              </select>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-blue-500 text-white' : isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              List
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-3 py-2 rounded-lg transition-all ${viewMode === 'calendar' ? 'bg-blue-500 text-white' : isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              Calendar
            </button>
          </div>
        </div>
      </div>

      {/* Events List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className={`${isDark ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} rounded-xl shadow-lg p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer group`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 bg-gradient-to-br ${getEventColor(event.type)} rounded-lg text-white group-hover:scale-110 transition-transform`}>
                {getEventIcon(event.type)}
              </div>
              <div className={`text-xs px-3 py-1 rounded-full capitalize ${
                event.type === 'meeting' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                event.type === 'lunch' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                event.type === 'hackathon' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' :
                'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
              }`}>
                {event.type}
              </div>
            </div>

            <h3 className={`text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {event.title}
            </h3>

            <div className={`space-y-2 mb-4 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(event.date).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{event.time}</span>
              </div>
              {event.location && (
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>{event.location}</span>
                </div>
              )}
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => handleRSVP(event.id, event.title)}
                className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all duration-300 hover:scale-105 font-medium"
              >
                RSVP
              </button>
              <button
                onClick={() => onNotify({
                  type: 'info',
                  title: 'Event Details',
                  message: `Viewing details for "${event.title}"`,
                  duration: 2000
                })}
                className={`px-4 py-2 rounded-lg border transition-all duration-300 hover:scale-105 ${isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-600 hover:bg-gray-50'}`}
              >
                Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className={`text-center py-12 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          <Calendar className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium mb-2">No events found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};