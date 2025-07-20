import React, { useEffect, useRef } from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { events } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';

export const EventsTimeline: React.FC = () => {
  const { isDark } = useTheme();
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const timelineItems = timelineRef.current?.querySelectorAll('.timeline-item');
    timelineItems?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  const getEventIcon = (type: string) => {
    const iconClass = "w-4 h-4";
    switch (type) {
      case 'meeting': return <Calendar className={iconClass} />;
      case 'lunch': return <Clock className={iconClass} />;
      case 'hackathon': return <Calendar className={iconClass} />;
      case 'holiday': return <Calendar className={iconClass} />;
      default: return <Calendar className={iconClass} />;
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
    <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-6 transition-all duration-300`}>
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg text-white">
          <Calendar className="w-5 h-5" />
        </div>
        <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Upcoming Events
        </h2>
      </div>

      <div ref={timelineRef} className="space-y-4">
        {events.map((event, index) => (
          <div
            key={event.id}
            className={`timeline-item flex items-start space-x-4 opacity-0 transform translate-y-4 transition-all duration-500`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-br ${getEventColor(event.type)} rounded-full flex items-center justify-center text-white shadow-lg`}>
              {getEventIcon(event.type)}
            </div>
            
            <div className={`flex-1 ${isDark ? 'bg-gray-700' : 'bg-gray-50'} rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer group`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className={`font-semibold text-lg group-hover:text-blue-600 transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {event.title}
                  </h3>
                  <div className={`flex items-center space-x-4 mt-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{event.time}</span>
                    </div>
                    {event.location && (
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className={`text-xs px-3 py-1 rounded-full ${
                  event.type === 'meeting' ? 'bg-blue-100 text-blue-700' :
                  event.type === 'lunch' ? 'bg-green-100 text-green-700' :
                  event.type === 'hackathon' ? 'bg-purple-100 text-purple-700' :
                  'bg-orange-100 text-orange-700'
                } ${isDark ? 'bg-opacity-20' : ''} capitalize`}>
                  {event.type}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};