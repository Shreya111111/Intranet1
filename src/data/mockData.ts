import { TeamMember, SearchItem, Event, Project, KudosMessage, LeadershipMessage } from '../types';
import { Announcement, Resource, Highlight, GameScore, Quiz } from '../types';

export const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'Senior Developer',
    department: 'Engineering',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    email: 'sarah.chen@company.com',
    startDate: '2022-01-15'
  },
  {
    id: '2',
    name: 'Marcus Rodriguez',
    role: 'Product Manager',
    department: 'Product',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    email: 'marcus.rodriguez@company.com',
    startDate: '2021-08-22'
  },
  {
    id: '3',
    name: 'Emma Thompson',
    role: 'UX Designer',
    department: 'Design',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    email: 'emma.thompson@company.com',
    startDate: '2024-12-01'
  },
  {
    id: '4',
    name: 'David Kim',
    role: 'DevOps Engineer',
    department: 'Engineering',
    avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    email: 'david.kim@company.com',
    startDate: '2023-03-10'
  }
];

export const searchItems: SearchItem[] = [
  { id: '1', title: 'Sarah Chen', type: 'person', category: 'Engineering' },
  { id: '2', title: 'Marcus Rodriguez', type: 'person', category: 'Product' },
  { id: '3', title: 'Employee Handbook', type: 'document', category: 'HR' },
  { id: '4', title: 'API Documentation', type: 'document', category: 'Engineering' },
  { id: '5', title: 'HR Portal', type: 'tool', category: 'HR' },
  { id: '6', title: 'IT Help Desk', type: 'tool', category: 'IT' },
  { id: '7', title: 'Team Standup', type: 'event', category: 'Engineering' },
  { id: '8', title: 'Holiday Party', type: 'event', category: 'Company' }
];

export const events: Event[] = [
  {
    id: '1',
    title: 'Engineering Standup',
    date: '2025-01-08',
    time: '9:00 AM',
    type: 'meeting',
    location: 'Conference Room A'
  },
  {
    id: '2',
    title: 'Team Lunch',
    date: '2025-01-10',
    time: '12:00 PM',
    type: 'lunch',
    location: 'Main Cafeteria'
  },
  {
    id: '3',
    title: 'Winter Hackathon',
    date: '2025-01-15',
    time: '10:00 AM',
    type: 'hackathon',
    location: 'Innovation Lab'
  },
  {
    id: '4',
    title: 'MLK Day',
    date: '2025-01-20',
    time: 'All Day',
    type: 'holiday'
  }
];

export const projects: Project[] = [
  {
    id: '1',
    name: 'Customer Portal v2.0',
    progress: 75,
    status: 'active',
    deadline: '2025-01-25',
    assignedTo: ['Sarah Chen', 'David Kim']
  },
  {
    id: '2',
    name: 'Mobile App Redesign',
    progress: 45,
    status: 'active',
    deadline: '2025-02-15',
    assignedTo: ['Emma Thompson', 'Marcus Rodriguez']
  },
  {
    id: '3',
    name: 'API Security Audit',
    progress: 90,
    status: 'overdue',
    deadline: '2025-01-05',
    assignedTo: ['David Kim']
  }
];

export const kudosMessages: KudosMessage[] = [
  {
    id: '1',
    from: 'Marcus Rodriguez',
    to: 'Sarah Chen',
    message: 'Amazing work on the new authentication system! The code is clean and well-documented.',
    timestamp: '2025-01-07T10:30:00Z',
    likes: 8
  },
  {
    id: '2',
    from: 'Emma Thompson',
    to: 'David Kim',
    message: 'Thanks for helping me set up the development environment so quickly!',
    timestamp: '2025-01-07T14:15:00Z',
    likes: 5
  },
  {
    id: '3',
    from: 'Sarah Chen',
    to: 'Emma Thompson',
    message: 'Love the new design mockups - they perfectly capture our brand vision!',
    timestamp: '2025-01-06T16:45:00Z',
    likes: 12
  }
];

export const leadershipMessages: LeadershipMessage[] = [
  {
    id: '1',
    author: 'Jennifer Walsh',
    role: 'CEO',
    message: 'Excited to announce our Q4 results exceeded expectations! Thank you all for your incredible dedication.',
    timestamp: '2025-01-07T09:00:00Z',
    avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  },
  {
    id: '2',
    author: 'Michael Chen',
    role: 'CTO',
    message: 'Remember: Innovation happens when we challenge assumptions and think differently.',
    timestamp: '2025-01-06T15:30:00Z',
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  }
];

export const axeroPrinciples = [
  "Be Customer-Obsessed: Every decision should benefit our customers first.",
  "Own It: Take responsibility for your work and see it through to completion.",
  "Think Big: Don't be afraid to propose bold ideas and innovative solutions.",
  "Deliver Results: Focus on outcomes that drive meaningful business impact.",
  "Stay Curious: Never stop learning and questioning how we can improve."
];

export const announcements: Announcement[] = [
  {
    id: '1',
    title: 'Q1 All-Hands Meeting - January 25th',
    content: 'Join us for our quarterly all-hands meeting where we\'ll review Q4 achievements, discuss Q1 goals, and unveil exciting new initiatives. Lunch will be provided!',
    author: 'Jennifer Walsh',
    authorRole: 'CEO',
    authorAvatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    timestamp: '2025-01-07T09:00:00Z',
    priority: 'high',
    category: 'Company',
    likes: 24,
    comments: 8,
    isRead: false
  },
  {
    id: '2',
    title: 'New Health & Wellness Benefits Available',
    content: 'We\'re excited to announce expanded health benefits including mental health support, gym memberships, and flexible wellness stipends. Check your HR portal for details.',
    author: 'Maria Rodriguez',
    authorRole: 'HR Director',
    authorAvatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    timestamp: '2025-01-06T14:30:00Z',
    priority: 'medium',
    category: 'Benefits',
    likes: 18,
    comments: 12,
    isRead: true
  },
  {
    id: '3',
    title: 'Security Update Required - Action Needed',
    content: 'Please update your passwords and enable 2FA by January 15th. IT will be available for assistance. This is mandatory for all employees.',
    author: 'David Kim',
    authorRole: 'IT Security',
    authorAvatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    timestamp: '2025-01-05T11:15:00Z',
    priority: 'urgent',
    category: 'Security',
    likes: 5,
    comments: 3,
    isRead: false
  }
];

export const resources: Resource[] = [
  {
    id: '1',
    title: 'Employee Handbook 2025',
    description: 'Complete guide to company policies, procedures, and benefits',
    category: 'document',
    url: '#',
    downloadCount: 156,
    rating: 4.8,
    tags: ['HR', 'Policies', 'Benefits'],
    lastUpdated: '2025-01-01',
    fileSize: '2.4 MB',
    thumbnail: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
  },
  {
    id: '2',
    title: 'Project Management Template',
    description: 'Standardized template for project planning and tracking',
    category: 'template',
    url: '#',
    downloadCount: 89,
    rating: 4.6,
    tags: ['Project Management', 'Templates', 'Planning'],
    lastUpdated: '2024-12-15',
    fileSize: '1.2 MB'
  },
  {
    id: '3',
    title: 'Design System Guidelines',
    description: 'Complete design system with components, colors, and typography',
    category: 'guide',
    url: '#',
    downloadCount: 234,
    rating: 4.9,
    tags: ['Design', 'UI/UX', 'Guidelines'],
    lastUpdated: '2024-12-20',
    fileSize: '5.1 MB'
  },
  {
    id: '4',
    title: 'Slack Integration Tool',
    description: 'Custom tool for enhanced Slack workflows and automation',
    category: 'tool',
    url: '#',
    downloadCount: 67,
    rating: 4.3,
    tags: ['Slack', 'Automation', 'Productivity'],
    lastUpdated: '2024-12-10'
  }
];

export const highlights: Highlight[] = [
  {
    id: '1',
    title: 'Record-Breaking Q4 Performance',
    description: 'Our team exceeded all quarterly targets, achieving 125% of our revenue goals and launching 3 major product features.',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    category: 'achievement',
    date: '2025-01-05',
    author: 'Leadership Team',
    likes: 42,
    isBookmarked: false
  },
  {
    id: '2',
    title: 'New Office Space Opening',
    description: 'Exciting news! Our new downtown office will open in March, featuring modern workspaces and collaboration areas.',
    image: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    category: 'news',
    date: '2025-01-03',
    author: 'Facilities Team',
    likes: 28,
    isBookmarked: true
  },
  {
    id: '3',
    title: '1000+ Customers Milestone',
    description: 'We\'ve officially reached over 1000 active customers! Thank you to everyone who made this possible.',
    image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    category: 'milestone',
    date: '2024-12-28',
    author: 'Sales Team',
    likes: 56,
    isBookmarked: false
  }
];

export const gameScores: GameScore[] = [
  {
    id: '1',
    playerName: 'Sarah Chen',
    score: 2850,
    game: 'Company Trivia',
    timestamp: '2025-01-07T15:30:00Z',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  },
  {
    id: '2',
    playerName: 'Marcus Rodriguez',
    score: 2650,
    game: 'Company Trivia',
    timestamp: '2025-01-07T14:15:00Z',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  },
  {
    id: '3',
    playerName: 'Emma Thompson',
    score: 2400,
    game: 'Company Trivia',
    timestamp: '2025-01-07T13:45:00Z',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  }
];

export const quizQuestions: Quiz[] = [
  {
    id: '1',
    question: 'What year was our company founded?',
    options: ['2018', '2019', '2020', '2021'],
    correctAnswer: 1,
    explanation: 'Our company was founded in 2019 with a mission to revolutionize workplace collaboration.',
    category: 'Company History'
  },
  {
    id: '2',
    question: 'Which of these is one of our core values?',
    options: ['Be Customer-Obsessed', 'Move Fast', 'Think Different', 'Just Do It'],
    correctAnswer: 0,
    explanation: 'Being Customer-Obsessed is one of our five core principles, ensuring every decision benefits our customers first.',
    category: 'Company Values'
  },
  {
    id: '3',
    question: 'What is our current employee count?',
    options: ['50-100', '100-200', '200-500', '500+'],
    correctAnswer: 2,
    explanation: 'We currently have approximately 350 employees across all departments and locations.',
    category: 'Company Facts'
  },
  {
    id: '4',
    question: 'Which department was established most recently?',
    options: ['Marketing', 'Design', 'DevOps', 'Customer Success'],
    correctAnswer: 2,
    explanation: 'Our DevOps team was established in late 2023 to support our growing infrastructure needs.',
    category: 'Company Structure'
  },
  {
    id: '5',
    question: 'What is our main product focus?',
    options: ['E-commerce', 'Social Media', 'Workplace Collaboration', 'Gaming'],
    correctAnswer: 2,
    explanation: 'We specialize in workplace collaboration tools that help teams work better together.',
    category: 'Products'
  }
];