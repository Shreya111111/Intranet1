import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Gift, Calendar, Heart, Award, Cake } from 'lucide-react';
import { teamMembers } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';
import { useConfetti } from '../hooks/useConfetti';

interface TeamSpotlightProps {
  onNotify: (notification: any) => void;
}

export const TeamSpotlight: React.FC<TeamSpotlightProps> = ({ onNotify }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [likes, setLikes] = useState<Record<string, number>>({});
  const { isDark } = useTheme();
  const { triggerConfetti } = useConfetti();

  const spotlightData = [
    {
      type: 'employee-of-month',
      title: 'Employee of the Month',
      member: teamMembers[0],
      icon: <Award className="w-6 h-6" />,
      description: 'Outstanding performance in Q4 2024'
    },
    {
      type: 'new-hire',
      title: 'Welcome New Team Member',
      member: teamMembers[2],
      icon: <Gift className="w-6 h-6" />,
      description: 'Joined our Design team this month'
    },
    {
      type: 'anniversary',
      title: 'Work Anniversary',
      member: teamMembers[1],
      icon: <Cake className="w-6 h-6" />,
      description: '3 years with the company!'
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % spotlightData.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [spotlightData.length, isAutoPlaying]);

  const currentSpotlight = spotlightData[currentIndex];

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    triggerConfetti(e.currentTarget);
    
    // Add like
    const spotlightId = currentSpotlight.type;
    setLikes(prev => ({ ...prev, [spotlightId]: (prev[spotlightId] || 0) + 1 }));
    
    onNotify({
      type: 'success',
      title: 'Kudos sent!',
      message: `You appreciated ${currentSpotlight.member.name}`,
      duration: 3000
    });
  };

  const handleNavigation = (direction: 'prev' | 'next') => {
    setIsAutoPlaying(false);
    if (direction === 'prev') {
      setCurrentIndex(prev => prev === 0 ? spotlightData.length - 1 : prev - 1);
    } else {
      setCurrentIndex(prev => (prev + 1) % spotlightData.length);
    }
    
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-6 transition-all duration-300`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Team Spotlight
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={() => handleNavigation('prev')}
            className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700 text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'} transition-colors`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleNavigation('next')}
            className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700 text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'} transition-colors`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`p-2 rounded-lg ${isAutoPlaying ? 'bg-blue-500 text-white' : isDark ? 'hover:bg-gray-700 text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'} transition-colors`}
            title={isAutoPlaying ? 'Pause slideshow' : 'Resume slideshow'}
          >
            {isAutoPlaying ? '⏸️' : '▶️'}
          </button>
        </div>
      </div>

      <div
        className={`relative overflow-hidden rounded-xl ${isDark ? 'bg-gradient-to-br from-blue-900/50 to-purple-900/50' : 'bg-gradient-to-br from-blue-50 to-purple-50'} p-6 cursor-pointer transition-transform hover:scale-105`}
        onClick={handleCardClick}
      >
        <div className="flex items-center space-x-4">
          <div className={`p-3 rounded-full ${currentSpotlight.type === 'employee-of-month' ? 'bg-yellow-100 text-yellow-600' : currentSpotlight.type === 'new-hire' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'} ${isDark ? 'bg-opacity-20' : ''}`}>
            {currentSpotlight.icon}
          </div>
          <div className="flex-1">
            <h3 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {currentSpotlight.title}
            </h3>
            <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {currentSpotlight.description}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4 mt-4">
          <img
            src={currentSpotlight.member.avatar}
            alt={currentSpotlight.member.name}
            className="w-16 h-16 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg"
          />
          <div>
            <h4 className={`font-bold text-xl ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {currentSpotlight.member.name}
            </h4>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {currentSpotlight.member.role}
            </p>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {currentSpotlight.member.department}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCardClick(e);
              }}
              className={`flex items-center space-x-1 px-3 py-1 rounded-full ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-50'} transition-colors shadow-sm`}
            >
              <Heart className="w-4 h-4 text-red-500" />
              <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {likes[currentSpotlight.type] || 0}
              </span>
            </button>
            <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Click to appreciate!
            </span>
          </div>
          
          <div className="flex space-x-1">
          {spotlightData.map((_, index) => (
            <div
              key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(index);
                  setIsAutoPlaying(false);
                  setTimeout(() => setIsAutoPlaying(true), 10000);
                }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-blue-500 w-6' : isDark ? 'bg-gray-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
        </div>
      </div>
    </div>
  );
};