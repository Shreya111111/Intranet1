export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  avatar: string;
  email: string;
  startDate: string;
}

export interface SearchItem {
  id: string;
  title: string;
  type: 'person' | 'document' | 'tool' | 'event';
  category: string;
  url?: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'meeting' | 'lunch' | 'hackathon' | 'holiday';
  location?: string;
}

export interface Project {
  id: string;
  name: string;
  progress: number;
  status: 'active' | 'completed' | 'overdue';
  deadline: string;
  assignedTo: string[];
}

export interface KudosMessage {
  id: string;
  from: string;
  to: string;
  message: string;
  timestamp: string;
  likes: number;
}

export interface LeadershipMessage {
  id: string;
  author: string;
  role: string;
  message: string;
  timestamp: string;
  avatar: string;
}

export type MoodType = 'happy' | 'okay' | 'stressed';

export interface MoodEntry {
  date: string;
  mood: MoodType;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  authorRole: string;
  authorAvatar: string;
  timestamp: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  likes: number;
  comments: number;
  isRead: boolean;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  category: 'document' | 'tool' | 'template' | 'guide';
  url: string;
  downloadCount: number;
  rating: number;
  tags: string[];
  lastUpdated: string;
  fileSize?: string;
  thumbnail?: string;
}

export interface Highlight {
  id: string;
  title: string;
  description: string;
  image: string;
  category: 'achievement' | 'milestone' | 'news' | 'feature';
  date: string;
  author: string;
  likes: number;
  isBookmarked: boolean;
}

export interface GameScore {
  id: string;
  playerName: string;
  score: number;
  game: string;
  timestamp: string;
  avatar: string;
}

export interface Quiz {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
}