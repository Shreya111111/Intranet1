import React from 'react';
import { Home, Calendar, Users, FolderOpen, Megaphone, Star, Gamepad2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export type TabType = 'dashboard' | 'events' | 'teams' | 'resources' | 'announcements' | 'highlights' | 'games';

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const tabs = [
  { id: 'dashboard' as TabType, label: 'Dashboard', icon: Home },
  { id: 'events' as TabType, label: 'Events', icon: Calendar },
  { id: 'teams' as TabType, label: 'Teams', icon: Users },
  { id: 'resources' as TabType, label: 'Resources', icon: FolderOpen },
  { id: 'announcements' as TabType, label: 'Announcements', icon: Megaphone },
  { id: 'highlights' as TabType, label: 'Highlights', icon: Star },
  { id: 'games' as TabType, label: 'Games', icon: Gamepad2 }
];

export const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  const { isDark } = useTheme();

  return (
    <nav className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b sticky top-16 z-30 backdrop-blur-sm`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-all duration-300 hover:scale-105 whitespace-nowrap ${
                  isActive
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : `border-transparent ${isDark ? 'text-gray-400 hover:text-gray-300 hover:border-gray-600' : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'}`
                }`}
              >
                <Icon className={`w-4 h-4 transition-transform ${isActive ? 'scale-110' : ''}`} />
                <span>{tab.label}</span>
                {tab.id === 'announcements' && (
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};