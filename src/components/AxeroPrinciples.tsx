import React, { useState, useEffect } from 'react';
import { Lightbulb, ChevronLeft, ChevronRight } from 'lucide-react';
import { axeroPrinciples } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';

export const AxeroPrinciples: React.FC = () => {
  const [currentPrinciple, setCurrentPrinciple] = useState(0);
  const { isDark } = useTheme();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPrinciple(prev => (prev + 1) % axeroPrinciples.length);
    }, 10000);

    return () => clearInterval(timer);
  }, []);

  const nextPrinciple = () => {
    setCurrentPrinciple(prev => (prev + 1) % axeroPrinciples.length);
  };

  const prevPrinciple = () => {
    setCurrentPrinciple(prev => prev === 0 ? axeroPrinciples.length - 1 : prev - 1);
  };

  return (
    <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-6 transition-all duration-300`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg text-white">
            <Lightbulb className="w-5 h-5" />
          </div>
          <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Principle of the Day
          </h2>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={prevPrinciple}
            className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700 text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'} transition-colors`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextPrinciple}
            className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700 text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'} transition-colors`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className={`${isDark ? 'bg-gradient-to-br from-amber-900/30 to-orange-900/30' : 'bg-gradient-to-br from-amber-50 to-orange-50'} rounded-xl p-6 relative overflow-hidden`}>
        <div className="absolute top-4 right-4 text-amber-300 opacity-30">
          <Lightbulb className="w-12 h-12" />
        </div>
        
        <div className="relative z-10">
          <div className={`text-lg font-medium leading-relaxed ${isDark ? 'text-white' : 'text-gray-800'}`}>
            {axeroPrinciples[currentPrinciple]}
          </div>
          
          <div className="flex items-center justify-between mt-6">
            <div className={`text-sm font-semibold ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>
              Axero Principle #{currentPrinciple + 1}
            </div>
            <div className="flex space-x-1">
              {axeroPrinciples.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentPrinciple ? 'bg-amber-500 w-6' : isDark ? 'bg-gray-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};