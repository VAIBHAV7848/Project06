export enum View {
  Home = 'Home',
  Notes = 'Notes',
  Donations = 'Donations',
  Events = 'Events',
  Map = 'Map',
  Doubts = 'Doubts',
  Study = 'Study Rooms',
  PYQs = 'PYQs',
  Profile = 'Profile',
}

export interface User {
  id: string;
  name: string;
  avatarUrl: string;
  department: string;
}

export interface Post {
  id:string;
  author: User;
  content: string;
  timestamp: string;
  comments: number;
  likedBy: string[]; // Array of user IDs
}

export interface Note {
  id: string;
  title: string;
  uploader: User;
  subject: string;
  department: string;
  uploadDate: string;
  downloads: number;
  semester: number;
  subjectCode: string;
  fileName: string;
  fileContent: string; // Base64 encoded content
}

export interface PYQ extends Note {} // PYQs have the same structure as Notes

export interface DonationCampaign {
  id: string;
  title: string;
  description: string;
  goal: number;
  raised: number;
  imageUrl: string;
}

export interface Event {
  id: string;
  title: string;
  type: 'Hackathon' | 'Workshop' | 'Seminar';
  date: string;
  location: string;
  organizer: string;
  imageUrl: string;
}

export interface Answer {
    id: string;
    author: User;
    content: string;
    timestamp: string;
}

export interface Doubt {
  id: string;
  asker: User;
  question: string;
  subject: string;
  timestamp: string;
  isResolved: boolean;
  answers: Answer[];
}

export interface MapLocation {
  id: string;
  name: string;
  type: 'Department' | 'Hostel' | 'Canteen' | 'Library';
  top: string;
  left: string;
}

export interface StudyRoom {
  id: string;
  topic: string;
  subject: string;
  activeUsers: User[];
}

export interface Reward {
    id: string;
    userId: string;
    points: number;
    reason: string;
    timestamp: string;
}


// New types for academic structure
export interface Subject {
  code: string;
  name: string;
}

export interface Semester {
  name: string;
  subjects: Subject[];
}

export interface DepartmentData {
  name: string;
  semesters: Semester[];
}