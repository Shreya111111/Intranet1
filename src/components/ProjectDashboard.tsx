import React from 'react';
import { TrendingUp, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { projects } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';

export const ProjectDashboard: React.FC = () => {
  const { isDark } = useTheme();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <TrendingUp className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'overdue': return <AlertTriangle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'completed': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'overdue': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getProgressColor = (progress: number, status: string) => {
    if (status === 'overdue') return 'bg-red-500';
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    return 'bg-yellow-500';
  };

  return (
    <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-6 transition-all duration-300`}>
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg text-white">
          <TrendingUp className="w-5 h-5" />
        </div>
        <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Project Dashboard
        </h2>
      </div>

      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className={`${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'} rounded-xl p-4 transition-all duration-300 hover:shadow-md cursor-pointer group`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className={`font-semibold text-lg group-hover:text-blue-600 transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {project.name}
                </h3>
                <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Due: {new Date(project.deadline).toLocaleDateString()}
                </p>
              </div>
              <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                {getStatusIcon(project.status)}
                <span className="capitalize">{project.status}</span>
              </div>
            </div>

            <div className="mb-3">
              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Progress
                </span>
                <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {project.progress}%
                </span>
              </div>
              <div className={`w-full h-2 ${isDark ? 'bg-gray-600' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                <div
                  className={`h-full ${getProgressColor(project.progress, project.status)} transition-all duration-500 ease-out rounded-full`}
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Assigned to:
              </span>
              <div className="flex items-center space-x-1">
                {project.assignedTo.slice(0, 3).map((member, index) => (
                  <div
                    key={index}
                    className={`w-6 h-6 rounded-full ${isDark ? 'bg-gray-600' : 'bg-blue-100'} flex items-center justify-center text-xs font-medium ${isDark ? 'text-gray-300' : 'text-blue-600'}`}
                  >
                    {member.split(' ').map(n => n[0]).join('')}
                  </div>
                ))}
                {project.assignedTo.length > 3 && (
                  <div className={`w-6 h-6 rounded-full ${isDark ? 'bg-gray-600' : 'bg-gray-100'} flex items-center justify-center text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    +{project.assignedTo.length - 3}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};