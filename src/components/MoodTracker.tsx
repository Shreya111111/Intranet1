import React, { useState } from 'react';
import { Smile, Meh, Frown, BarChart3, TrendingUp, Calendar } from 'lucide-react';
import { MoodType } from '../types';
import { useTheme } from '../context/ThemeContext';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface MoodTrackerProps {
  onNotify: (notification: any) => void;
}

export const MoodTracker: React.FC<MoodTrackerProps> = ({ onNotify }) => {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [moodHistory, setMoodHistory] = useLocalStorage<Record<string, MoodType>>('mood-history', {});
  const [showHistory, setShowHistory] = useState(false);
  const { isDark } = useTheme();

  const moods = [
    { 
      type: 'happy' as MoodType, 
      icon: <Smile className="w-8 h-8" />, 
      label: 'Happy', 
      color: 'bg-green-500',
      description: 'Feeling great and energized!'
    },
    { 
      type: 'okay' as MoodType, 
      icon: <Meh className="w-8 h-8" />, 
      label: 'Okay', 
      color: 'bg-yellow-500',
      description: 'Doing alright, nothing special'
    },
    { 
      type: 'stressed' as MoodType, 
      icon: <Frown className="w-8 h-8" />, 
      label: 'Stressed', 
      color: 'bg-red-500',
      description: 'Could use some support'
    }
  ];

  const today = new Date().toISOString().split('T')[0];
  const todaysMood = moodHistory[today];

  const handleMoodSelect = (mood: MoodType) => {
    setSelectedMood(mood);
    setHasSubmitted(true);
    
    // Store in mood history
    setMoodHistory(prev => ({ ...prev, [today]: mood }));
    
    // Show notification
    onNotify({
      type: 'success',
      title: 'Mood recorded!',
      message: `Thanks for sharing how you're feeling today.`,
      duration: 3000
    });
    
    // Reset after animation
    setTimeout(() => {
      setHasSubmitted(false);
      setSelectedMood(null);
    }, 2000);
  };

  const getMoodStats = () => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    });
    
    const moodCounts = { happy: 0, okay: 0, stressed: 0 };
    last7Days.forEach(date => {
      const mood = moodHistory[date];
      if (mood) moodCounts[mood]++;
    });
    
    return moodCounts;
  };

  const moodStats = getMoodStats();

  return (
    <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-6 transition-all duration-300`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg text-white">
            <BarChart3 className="w-5 h-5" />
          </div>
          <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Daily Check-in
          </h2>
        </div>
        <button
          onClick={() => setShowHistory(!showHistory)}
          className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700 text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'} transition-colors`}
        >
          <TrendingUp className="w-4 h-4" />
        </button>
      </div>

      {todaysMood && !hasSubmitted && (
        <div className={`mb-4 p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-blue-50'} border-l-4 border-blue-500`}>
          <div className="flex items-center space-x-2">
            <div className={`w-6 h-6 ${moods.find(m => m.type === todaysMood)?.color} rounded-full flex items-center justify-center`}>
              {moods.find(m => m.type === todaysMood)?.icon && 
                React.cloneElement(moods.find(m => m.type === todaysMood)!.icon, { className: 'w-4 h-4 text-white' })
              }
            </div>
            <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-blue-800'}`}>
              You're feeling <strong>{todaysMood}</strong> today
            </span>
          </div>
        </div>
      )}

      <div className={`text-center mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
        <p className="text-lg font-medium mb-2">
          {todaysMood ? 'Update how you\'re feeling?' : 'How are you feeling today?'}
        </p>
        <p className="text-sm">Your wellbeing matters to us</p>
      </div>

      {!hasSubmitted ? (
        <div className="grid grid-cols-3 gap-4">
          {moods.map((mood) => (
            <button
              key={mood.type}
              onClick={() => handleMoodSelect(mood.type)}
              className={`p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg group ${
                todaysMood === mood.type 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' 
                  : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'
              } ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'}`}
            >
              <div className={`w-16 h-16 mx-auto ${mood.color} rounded-full flex items-center justify-center text-white mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12`}>
                {mood.icon}
              </div>
              <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {mood.label}
              </div>
              <div className={`text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {mood.description}
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full text-white mb-4 animate-pulse">
            <Smile className="w-8 h-8" />
          </div>
          <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Thanks for sharing!
          </h3>
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Your mood has been recorded for today.
          </p>
        </div>
      )}

      {showHistory && (
        <div className={`mt-6 p-4 ${isDark ? 'bg-gray-700' : 'bg-gray-50'} rounded-xl`}>
          <h4 className={`font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Last 7 Days
          </h4>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className={`p-2 rounded-lg ${isDark ? 'bg-green-900/30' : 'bg-green-100'}`}>
              <div className="text-green-600 font-bold text-lg">{moodStats.happy}</div>
              <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Happy</div>
            </div>
            <div className={`p-2 rounded-lg ${isDark ? 'bg-yellow-900/30' : 'bg-yellow-100'}`}>
              <div className="text-yellow-600 font-bold text-lg">{moodStats.okay}</div>
              <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Okay</div>
            </div>
            <div className={`p-2 rounded-lg ${isDark ? 'bg-red-900/30' : 'bg-red-100'}`}>
              <div className="text-red-600 font-bold text-lg">{moodStats.stressed}</div>
              <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Stressed</div>
            </div>
          </div>
        </div>
      )}

      <div className={`mt-6 p-4 ${isDark ? 'bg-gray-700' : 'bg-blue-50'} rounded-xl`}>
        <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-blue-800'}`}>
          💡 <strong>Tip:</strong> Regular check-ins help us create a better work environment for everyone.
        </p>
      </div>
    </div>
  );
};