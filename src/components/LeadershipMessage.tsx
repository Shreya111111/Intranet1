import React, { useState, useEffect } from 'react';
import { Quote } from 'lucide-react';
import { leadershipMessages } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';

export const LeadershipMessage: React.FC = () => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const { isDark } = useTheme();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % leadershipMessages.length);
    }, 8000);

    return () => clearInterval(timer);
  }, []);

  const message = leadershipMessages[currentMessage];

  return (
    <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-6 transition-all duration-300`}>
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg text-white">
          <Quote className="w-5 h-5" />
        </div>
        <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Leadership Corner
        </h2>
      </div>

      <div className={`${isDark ? 'bg-gradient-to-br from-indigo-900/30 to-purple-900/30' : 'bg-gradient-to-br from-indigo-50 to-purple-50'} rounded-xl p-6 relative overflow-hidden`}>
        <div className="absolute top-4 left-4 text-indigo-300 opacity-30">
          <Quote className="w-8 h-8" />
        </div>
        
        <div className="relative z-10">
          <p className={`text-lg font-medium mb-4 leading-relaxed ${isDark ? 'text-white' : 'text-gray-800'}`}>
            "{message.message}"
          </p>
          
          <div className="flex items-center space-x-3">
            <img
              src={message.avatar}
              alt={message.author}
              className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-lg"
            />
            <div>
              <div className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {message.author}
              </div>
              <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {message.role}
              </div>
            </div>
            <div className="flex-1" />
            <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {new Date(message.timestamp).toLocaleDateString()}
            </div>
          </div>
        </div>

        <div className="flex space-x-1 mt-4 justify-center">
          {leadershipMessages.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentMessage ? 'bg-indigo-500 w-6' : isDark ? 'bg-gray-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};