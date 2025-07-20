import React, { useState, useEffect } from 'react';
import { TabNavigation, TabType } from './components/TabNavigation';
import { Header } from './components/Header';
import { GlobalSearch } from './components/GlobalSearch';
import { TeamSpotlight } from './components/TeamSpotlight';
import { QuickAccessPanel } from './components/QuickAccessPanel';
import { LeadershipMessage } from './components/LeadershipMessage';
import { EventsTimeline } from './components/EventsTimeline';
import { MoodTracker } from './components/MoodTracker';
import { ProjectDashboard } from './components/ProjectDashboard';
import { KudosWall } from './components/KudosWall';
import { AxeroPrinciples } from './components/AxeroPrinciples';
import { EventsTab } from './components/tabs/EventsTab';
import { TeamsTab } from './components/tabs/TeamsTab';
import { ResourcesTab } from './components/tabs/ResourcesTab';
import { AnnouncementsTab } from './components/tabs/AnnouncementsTab';
import { HighlightsTab } from './components/tabs/HighlightsTab';
import { GamesTab } from './components/tabs/GamesTab';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { NotificationCenter } from './components/NotificationCenter';
import { useNotifications } from './hooks/useNotifications';

const AppContent: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const { isDark } = useTheme();
  const { notifications, addNotification, removeNotification } = useNotifications();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Add keyboard shortcuts for quick access
  useEffect(() => {
    const handleShortcuts = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) {
        switch (e.key) {
          case 'h':
            e.preventDefault();
            addNotification({
              type: 'info',
              title: 'Opening HR Portal',
              message: 'Launching HR Portal...'
            });
            break;
          case 'i':
            e.preventDefault();
            addNotification({
              type: 'info',
              title: 'Opening IT Help Desk',
              message: 'Launching IT Help Desk...'
            });
            break;
          case 't':
            e.preventDefault();
            addNotification({
              type: 'info',
              title: 'Opening Timesheets',
              message: 'Launching Timesheets...'
            });
            break;
          case 's':
            e.preventDefault();
            addNotification({
              type: 'info',
              title: 'Opening Team Chat',
              message: 'Launching Team Chat...'
            });
            break;
        }
      }
    };

    document.addEventListener('keydown', handleShortcuts);
    return () => document.removeEventListener('keydown', handleShortcuts);
  }, [addNotification]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'events':
        return <EventsTab onNotify={addNotification} />;
      case 'teams':
        return <TeamsTab onNotify={addNotification} />;
      case 'resources':
        return <ResourcesTab onNotify={addNotification} />;
      case 'announcements':
        return <AnnouncementsTab onNotify={addNotification} />;
      case 'highlights':
        return <HighlightsTab onNotify={addNotification} />;
      case 'games':
        return <GamesTab onNotify={addNotification} />;
      default:
        return (
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column */}
              <div className="lg:col-span-4 space-y-8">
                <TeamSpotlight onNotify={addNotification} />
                <QuickAccessPanel onNotify={addNotification} />
                <MoodTracker onNotify={addNotification} />
              </div>

              {/* Center Column */}
              <div className="lg:col-span-5 space-y-8">
                <LeadershipMessage />
                <ProjectDashboard />
                <EventsTimeline />
              </div>

              {/* Right Column */}
              <div className="lg:col-span-3 space-y-8">
                <AxeroPrinciples />
                <KudosWall onNotify={addNotification} />
              </div>
            </div>
          </main>
        );
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Header onSearchOpen={() => setIsSearchOpen(true)} />
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      {renderTabContent()}

      <GlobalSearch 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        onNotify={addNotification}
      />

      <NotificationCenter 
        notifications={notifications}
        onRemove={removeNotification}
      />

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        
        * {
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }
        
        .animate-fade-in {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .animate-slide-in-right {
          animation: slideInRight 0.3s ease-out forwards;
        }
        
        .animate-slide-down {
          animation: slideDown 0.3s ease-out forwards;
        }
        
        .animate-pulse-once {
          animation: pulseOnce 2s ease-out;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulseOnce {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: ${isDark ? '#374151' : '#f1f5f9'};
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: ${isDark ? '#6b7280' : '#cbd5e1'};
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: ${isDark ? '#9ca3af' : '#94a3b8'};
        }
      `}</style>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;