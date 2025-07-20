import React, { useState } from 'react';
import { Heart, MessageCircle, Plus, Send, X, Sparkles } from 'lucide-react';
import { kudosMessages } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface KudosWallProps {
  onNotify: (notification: any) => void;
}

export const KudosWall: React.FC<KudosWallProps> = ({ onNotify }) => {
  const [showNewKudos, setShowNewKudos] = useState(false);
  const [newKudos, setNewKudos] = useState({ to: '', message: '' });
  const [likedMessages, setLikedMessages] = useLocalStorage<string[]>('liked-kudos', []);
  const [customKudos, setCustomKudos] = useLocalStorage<any[]>('custom-kudos', []);
  const { isDark } = useTheme();

  const allKudos = [...kudosMessages, ...customKudos];

  const handleLike = (messageId: string) => {
    setLikedMessages(prev => {
      if (prev.includes(messageId)) {
        return prev.filter(id => id !== messageId);
      } else {
        return [...prev, messageId];
      }
    });
  };

  const handleSubmitKudos = () => {
    if (newKudos.to && newKudos.message) {
      const newKudosMessage = {
        id: Date.now().toString(),
        from: 'You',
        to: newKudos.to,
        message: newKudos.message,
        timestamp: new Date().toISOString(),
        likes: 0,
        isNew: true
      };
      
      setCustomKudos(prev => [newKudosMessage, ...prev]);
      
      onNotify({
        type: 'success',
        title: 'Kudos sent! 🎉',
        message: `Your appreciation for ${newKudos.to} has been shared`,
        duration: 4000
      });
      
      setNewKudos({ to: '', message: '' });
      setShowNewKudos(false);
    }
  };

  const quickKudosTemplates = [
    "Great job on the project!",
    "Thanks for your help today!",
    "Amazing teamwork!",
    "Your creativity is inspiring!"
  ];
  return (
    <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-6 transition-all duration-300`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg text-white">
            <Heart className="w-5 h-5" />
          </div>
          <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Kudos Wall
          </h2>
        </div>
        <button
          onClick={() => setShowNewKudos(!showNewKudos)}
          className={`flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 ${showNewKudos ? 'rotate-45' : ''}`}
        >
          {showNewKudos ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          <span>Give Kudos</span>
        </button>
      </div>

      {showNewKudos && (
        <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-50'} rounded-xl p-4 mb-6 transition-all duration-300 animate-slide-down`}>
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Give kudos to:
              </label>
              <input
                type="text"
                value={newKudos.to}
                onChange={(e) => setNewKudos(prev => ({ ...prev, to: e.target.value }))}
                placeholder="Team member name"
                className={`w-full px-4 py-2 rounded-lg border ${isDark ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'} focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Your message:
              </label>
              <textarea
                value={newKudos.message}
                onChange={(e) => setNewKudos(prev => ({ ...prev, message: e.target.value }))}
                placeholder="What do you want to recognize them for?"
                rows={3}
                className={`w-full px-4 py-2 rounded-lg border ${isDark ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'} focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all resize-none`}
              />
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Quick templates:
              </label>
              <div className="flex flex-wrap gap-2">
                {quickKudosTemplates.map((template, index) => (
                  <button
                    key={index}
                    onClick={() => setNewKudos(prev => ({ ...prev, message: template }))}
                    className={`px-3 py-1 text-sm rounded-full ${isDark ? 'bg-gray-600 hover:bg-gray-500 text-gray-300' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'} transition-colors`}
                  >
                    {template}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={handleSubmitKudos}
                disabled={!newKudos.to || !newKudos.message}
                className="flex items-center space-x-2 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105"
              >
                <Sparkles className="w-4 h-4" />
                <span>Send Kudos</span>
              </button>
              <button
                onClick={() => setShowNewKudos(false)}
                className={`px-4 py-2 ${isDark ? 'bg-gray-600 hover:bg-gray-500 text-gray-300' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'} rounded-lg transition-all duration-300`}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {allKudos.map((kudos) => (
          <div
            key={kudos.id}
            className={`${isDark ? 'bg-gradient-to-br from-pink-900/30 to-rose-900/30' : 'bg-gradient-to-br from-pink-50 to-rose-50'} rounded-xl p-4 border-l-4 border-pink-500 transition-all duration-300 hover:shadow-md ${kudos.isNew ? 'animate-pulse-once' : ''}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {kudos.from} → {kudos.to}
                  {kudos.isNew && (
                    <span className="ml-2 px-2 py-1 text-xs bg-pink-500 text-white rounded-full">
                      New!
                    </span>
                  )}
                </div>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {new Date(kudos.timestamp).toLocaleDateString()}
                </div>
              </div>
            </div>
            
            <p className={`mb-3 leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {kudos.message}
            </p>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleLike(kudos.id)}
                className={`flex items-center space-x-2 px-3 py-1 rounded-full transition-all duration-300 hover:scale-105 ${
                  likedMessages.includes(kudos.id)
                    ? 'bg-pink-500 text-white shadow-lg'
                    : isDark ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                }`}
              >
                <Heart className={`w-4 h-4 transition-transform ${likedMessages.includes(kudos.id) ? 'fill-current scale-110' : ''}`} />
                <span className="text-sm">
                  {(kudos.likes || 0) + (likedMessages.includes(kudos.id) ? 1 : 0)}
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};