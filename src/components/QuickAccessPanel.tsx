import React from 'react';
import { Users, HelpCircle, Clock, MessageSquare, ExternalLink, Zap } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface QuickAccessPanelProps {
  onNotify: (notification: any) => void;
}

const tools = [
  {
    id: 'hr',
    name: 'HR Portal',
    icon: <Users className="w-8 h-8" />,
    color: 'from-blue-500 to-blue-600',
    description: 'Benefits, policies, and more',
    shortcut: '⌘+H'
  },
  {
    id: 'helpdesk',
    name: 'IT Help Desk',
    icon: <HelpCircle className="w-8 h-8" />,
    color: 'from-green-500 to-green-600',
    description: 'Technical support',
    shortcut: '⌘+I'
  },
  {
    id: 'timesheets',
    name: 'Timesheets',
    icon: <Clock className="w-8 h-8" />,
    color: 'from-purple-500 to-purple-600',
    description: 'Log your hours',
    shortcut: '⌘+T'
  },
  {
    id: 'slack',
    name: 'Team Chat',
    icon: <MessageSquare className="w-8 h-8" />,
    color: 'from-orange-500 to-orange-600',
    description: 'Join conversations',
    shortcut: '⌘+S'
  }
];

export const QuickAccessPanel: React.FC<QuickAccessPanelProps> = ({ onNotify }) => {
  const { isDark } = useTheme();

  const handleToolClick = (tool: typeof tools[0]) => {
    onNotify({
      type: 'info',
      title: `Opening ${tool.name}`,
      message: `Launching ${tool.description.toLowerCase()}...`,
      duration: 2000
    });
  };

  return (
    <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-6 transition-all duration-300`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Quick Access
        </h2>
        <div className="flex items-center space-x-1 text-xs text-gray-500">
          <Zap className="w-3 h-3" />
          <span>Keyboard shortcuts</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {tools.map((tool) => (
          <div
            key={tool.id}
            onClick={() => handleToolClick(tool)}
            className={`relative group cursor-pointer rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
          >
            <div className={`bg-gradient-to-br ${tool.color} p-6 text-white relative overflow-hidden`}>
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-white opacity-10 rounded-full group-hover:scale-150 group-hover:rotate-180 transition-all duration-500" />
              
              <div className="relative z-10">
                <div className="mb-3 group-hover:scale-110 transition-transform duration-300">
                  {tool.icon}
                </div>
                <h3 className="font-bold text-lg mb-1">{tool.name}</h3>
                <p className="text-sm opacity-90">{tool.description}</p>
                <div className="mt-2 text-xs opacity-75 font-mono">
                  {tool.shortcut}
                </div>
              </div>

              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                <ExternalLink className="w-4 h-4" />
              </div>
              
              {/* Animated pulse effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300">
                <div className="absolute inset-0 bg-white animate-pulse rounded-xl"></div>
              </div>
            </div>
            
            <div className={`absolute inset-0 border-2 border-transparent group-hover:border-white/30 rounded-xl transition-all duration-300`} />
          </div>
        ))}
      </div>
      
      <div className={`mt-4 p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'} text-center`}>
        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          💡 Use keyboard shortcuts for instant access
        </p>
      </div>
    </div>
  );
};