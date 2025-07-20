import React, { useState } from 'react';
import { Users, Mail, Calendar, MapPin, Search, Filter, UserPlus } from 'lucide-react';
import { teamMembers } from '../../data/mockData';
import { useTheme } from '../../context/ThemeContext';

interface TeamsTabProps {
  onNotify: (notification: any) => void;
}

export const TeamsTab: React.FC<TeamsTabProps> = ({ onNotify }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const { isDark } = useTheme();

  const departments = ['all', ...Array.from(new Set(teamMembers.map(member => member.department)))];
  
  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || member.department === departmentFilter;
    return matchesSearch && matchesDepartment;
  });

  const handleConnect = (memberName: string) => {
    onNotify({
      type: 'success',
      title: 'Connection Request Sent!',
      message: `Your request to connect with ${memberName} has been sent`,
      duration: 3000
    });
  };

  const handleMessage = (memberName: string) => {
    onNotify({
      type: 'info',
      title: 'Opening Chat',
      message: `Starting conversation with ${memberName}`,
      duration: 2000
    });
  };

  const getDepartmentColor = (department: string) => {
    switch (department) {
      case 'Engineering': return 'from-blue-500 to-blue-600';
      case 'Product': return 'from-green-500 to-green-600';
      case 'Design': return 'from-purple-500 to-purple-600';
      case 'Marketing': return 'from-pink-500 to-pink-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getWorkAnniversary = (startDate: string) => {
    const start = new Date(startDate);
    const now = new Date();
    const years = now.getFullYear() - start.getFullYear();
    const months = now.getMonth() - start.getMonth();
    
    if (years > 0) {
      return `${years} year${years > 1 ? 's' : ''}`;
    } else if (months > 0) {
      return `${months} month${months > 1 ? 's' : ''}`;
    } else {
      return 'New hire';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Team Directory
          </h1>
          <p className={`mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Connect with your colleagues and explore team structure
          </p>
        </div>
        <button
          onClick={() => onNotify({
            type: 'info',
            title: 'Invite Team Member',
            message: 'Team invitation form would open here',
            duration: 2000
          })}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 hover:scale-105"
        >
          <UserPlus className="w-4 h-4" />
          <span>Invite Member</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 mb-8`}>
        <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search team members..."
              className={`w-full pl-10 pr-4 py-2 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className={`px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>
                  {dept === 'all' ? 'All Departments' : dept}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            className={`${isDark ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} rounded-xl shadow-lg p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer group`}
            onClick={() => setSelectedMember(selectedMember === member.id ? null : member.id)}
          >
            <div className="text-center mb-4">
              <div className="relative inline-block">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-20 h-20 rounded-full object-cover mx-auto border-4 border-white dark:border-gray-700 shadow-lg group-hover:scale-110 transition-transform"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-gray-700"></div>
              </div>
            </div>

            <div className="text-center mb-4">
              <h3 className={`text-lg font-bold mb-1 group-hover:text-blue-600 transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {member.name}
              </h3>
              <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {member.role}
              </p>
              <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-2 bg-gradient-to-r ${getDepartmentColor(member.department)} text-white`}>
                {member.department}
              </div>
            </div>

            <div className={`text-xs space-y-2 mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              <div className="flex items-center justify-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span>{getWorkAnniversary(member.startDate)} with us</span>
              </div>
            </div>

            {selectedMember === member.id && (
              <div className="space-y-3 animate-slide-down">
                <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div className="flex items-center space-x-2 text-sm">
                    <Mail className="w-4 h-4" />
                    <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>{member.email}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMessage(member.name);
                    }}
                    className="flex-1 bg-blue-500 text-white py-2 px-3 rounded-lg hover:bg-blue-600 transition-all duration-300 hover:scale-105 text-sm font-medium"
                  >
                    Message
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleConnect(member.name);
                    }}
                    className={`flex-1 py-2 px-3 rounded-lg border transition-all duration-300 hover:scale-105 text-sm font-medium ${isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-600 hover:bg-gray-50'}`}
                  >
                    Connect
                  </button>
                </div>
              </div>
            )}

            {selectedMember !== member.id && (
              <div className="flex space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMessage(member.name);
                  }}
                  className="flex-1 bg-blue-500 text-white py-2 px-3 rounded-lg hover:bg-blue-600 transition-all duration-300 hover:scale-105 text-sm font-medium"
                >
                  Message
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleConnect(member.name);
                  }}
                  className={`flex-1 py-2 px-3 rounded-lg border transition-all duration-300 hover:scale-105 text-sm font-medium ${isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-600 hover:bg-gray-50'}`}
                >
                  Connect
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredMembers.length === 0 && (
        <div className={`text-center py-12 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium mb-2">No team members found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};