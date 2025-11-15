import { User, Post, Note, DonationCampaign, Event, Doubt, MapLocation, DepartmentData, PYQ, StudyRoom, Reward } from './types';

export const INITIAL_USERS: User[] = [
  { id: 'u1', name: 'Rohan Sharma', avatarUrl: 'https://picsum.photos/seed/u1/100/100', department: 'Computer Science' },
  { id: 'u2', name: 'Priya Verma', avatarUrl: 'https://picsum.photos/seed/u2/100/100', department: 'Electronics' },
  { id: 'u3', name: 'Amit Patel', avatarUrl: 'https://picsum.photos/seed/u3/100/100', department: 'Mechanical' },
];

export const CURRENT_USER = INITIAL_USERS[0];

export const INITIAL_POSTS: Post[] = [
  { id: 'p1', author: INITIAL_USERS[0], content: 'Just finished my project on AI-driven recommendation systems. Anyone interested in collaborating on a paper?', timestamp: '2 hours ago', likedBy: ['u2', 'u3'], comments: 5 },
  { id: 'p2', author: INITIAL_USERS[1], content: 'The upcoming workshop on Embedded Systems looks amazing! Who else is going? #KLETechEvents', timestamp: '5 hours ago', likedBy: ['u1'], comments: 12 },
  { id: 'p3', author: INITIAL_USERS[2], content: 'Looking for a study group for Thermodynamics. We meet Tuesdays and Thursdays at the library.', timestamp: '1 day ago', likedBy: [], comments: 3 },
];

export const INITIAL_NOTES: Note[] = [
  { id: 'n1', title: 'DSA Unit 1: Introduction to Stacks', uploader: INITIAL_USERS[0], subject: 'DSA', department: 'Computer Science', uploadDate: '2023-10-26', downloads: 152, semester: 3, subjectCode: 'CS301', fileName: 'dsa_unit1.pdf', fileContent: '' },
  { id: 'n2', title: 'Digital Logic Design Complete Notes', uploader: INITIAL_USERS[1], subject: 'DLD', department: 'Electronics', uploadDate: '2023-10-25', downloads: 98, semester: 3, subjectCode: 'EC301', fileName: 'dld_notes.pdf', fileContent: '' },
  { id: 'n3', title: 'Fluid Mechanics Important Questions', uploader: INITIAL_USERS[2], subject: 'FM', department: 'Mechanical', uploadDate: '2023-10-24', downloads: 120, semester: 3, subjectCode: 'ME301', fileName: 'fm_imp.pdf', fileContent: '' },
  { id: 'n4', title: 'Operating Systems Module 3', uploader: INITIAL_USERS[0], subject: 'OS', department: 'Computer Science', uploadDate: '2023-10-22', downloads: 210, semester: 3, subjectCode: 'CS302', fileName: 'os_mod3.pdf', fileContent: '' },
  { id: 'n5', title: 'DSA Unit 2: Queues and Linked Lists', uploader: INITIAL_USERS[0], subject: 'DSA', department: 'Computer Science', uploadDate: '2023-10-28', downloads: 180, semester: 3, subjectCode: 'CS301', fileName: 'dsa_unit2.pdf', fileContent: '' },
];

export const INITIAL_PYQS: PYQ[] = [
    { id: 'pyq1', title: 'DSA End Semester Exam 2022', uploader: INITIAL_USERS[0], subject: 'DSA', department: 'Computer Science', uploadDate: '2023-01-15', downloads: 350, semester: 3, subjectCode: 'CS301', fileName: 'dsa_ese_2022.pdf', fileContent: '' },
    { id: 'pyq2', title: 'Operating Systems Mid Term 2023', uploader: INITIAL_USERS[0], subject: 'OS', department: 'Computer Science', uploadDate: '2023-05-20', downloads: 280, semester: 3, subjectCode: 'CS302', fileName: 'os_mse_2023.pdf', fileContent: '' },
];


export const INITIAL_CAMPAIGNS: DonationCampaign[] = [
  { id: 'c1', title: 'Upgrade Library Computers', description: 'Help us upgrade the library computers to support modern software for all students.', goal: 500000, raised: 275000, imageUrl: 'https://picsum.photos/seed/c1/600/400' },
  { id: 'c2', title: 'Sponsor a Student Tech Club', description: 'Your donation will help fund projects, workshops, and competition travel for our tech clubs.', goal: 200000, raised: 150000, imageUrl: 'https://picsum.photos/seed/c2/600/400' },
  { id: 'c3', title: 'Campus Green Initiative', description: 'Support our initiative to make the campus more sustainable with solar panels and better waste management.', goal: 800000, raised: 350000, imageUrl: 'https://picsum.photos/seed/c3/600/400' },
];

export const INITIAL_EVENTS: Event[] = [
  { id: 'e1', title: 'InnovateX Hackathon 2023', type: 'Hackathon', date: 'Nov 15-16, 2023', location: 'Main Auditorium', organizer: 'CSE Department', imageUrl: 'https://picsum.photos/seed/e1/600/400' },
  { id: 'e2', title: 'Advanced React Workshop', type: 'Workshop', date: 'Nov 20, 2023', location: 'Lab 301, CS Block', organizer: 'Web Dev Club', imageUrl: 'https://picsum.photos/seed/e2/600/400' },
  { id: 'e3', title: 'Future of AI Seminar', type: 'Seminar', date: 'Nov 25, 2023', location: 'Convention Center', organizer: 'KLE Tech University', imageUrl: 'https://picsum.photos/seed/e3/600/400' },
];

export const INITIAL_DOUBTS: Doubt[] = [
  { id: 'd1', asker: INITIAL_USERS[1], question: 'Can someone explain the difference between latches and flip-flops in DLD?', subject: 'Digital Logic Design', timestamp: '4 hours ago', isResolved: false, answers: [
      { id: 'a1', author: INITIAL_USERS[0], content: 'A Latch is a level-sensitive device, meaning it responds to the input level (high or low). A Flip-Flop is edge-sensitive, meaning it only changes state on the rising or falling edge of a clock signal. That clock input is the main difference!', timestamp: '3 hours ago' },
      { id: 'a2', author: INITIAL_USERS[2], content: 'Basically, latches are asynchronous and flip-flops are synchronous.', timestamp: '1 hour ago' },
  ] },
  { id: 'd2', asker: INITIAL_USERS[0], question: 'I\'m having trouble with understanding the time complexity of recursive functions. Any good resources?', subject: 'Data Structures', timestamp: '1 day ago', isResolved: true, answers: [
      { id: 'a3', author: INITIAL_USERS[1], content: 'Check out the Master Theorem. It provides a formula for solving recurrence relations of a specific form. Also, drawing out the recursion tree can really help visualize the complexity.', timestamp: '20 hours ago' }
  ] },
  { id: 'd3', asker: INITIAL_USERS[2], question: 'What is the significance of Reynolds number in fluid dynamics?', subject: 'Fluid Mechanics', timestamp: '2 days ago', isResolved: false, answers: [] },
];

export const INITIAL_LOCATIONS: MapLocation[] = [
    { id: 'l1', name: 'CS Department', type: 'Department', top: '25%', left: '30%' },
    { id: 'l2', name: 'Mechanical Dept.', type: 'Department', top: '50%', left: '60%' },
    { id: 'l3', name: 'Main Canteen', type: 'Canteen', top: '60%', left: '20%' },
    { id: 'l4', name: 'Central Library', type: 'Library', top: '35%', left: '55%' },
    { id: 'l5', name: 'Boys Hostel A', type: 'Hostel', top: '80%', left: '75%' },
];

export const INITIAL_STUDY_ROOMS: StudyRoom[] = [
    { id: 'sr1', topic: 'Finals Prep for DSA', subject: 'Data Structures', activeUsers: [INITIAL_USERS[0], INITIAL_USERS[1]] },
    { id: 'sr2', topic: 'Thermodynamics Problem Solving Session', subject: 'Thermodynamics', activeUsers: [INITIAL_USERS[2]] },
    { id: 'sr3', topic: 'React Project Collaboration', subject: 'Web Development', activeUsers: [INITIAL_USERS[0], INITIAL_USERS[1], INITIAL_USERS[2]] },
];

export const INITIAL_REWARDS: Reward[] = [
    { id: 'r1', userId: 'u1', points: 50, reason: 'Welcome Bonus!', timestamp: new Date().toISOString() }
];

export const ACADEMIC_DATA: DepartmentData[] = [
  {
    name: 'Computer Science',
    semesters: [
      {
        name: 'Sem 3',
        subjects: [
          { name: 'Data Structures & Algorithms', code: 'CS301' },
          { name: 'Operating Systems', code: 'CS302' },
          { name: 'Analog and Electronic Circuits', code: 'CS303' },
          { name: 'Mathematics for CS - III', code: 'CS304' },
        ],
      },
      {
        name: 'Sem 4',
        subjects: [
          { name: 'Design and Analysis of Algorithms', code: 'CS401' },
          { name: 'Microprocessors and Microcontrollers', code: 'CS402' },
          { name: 'Database Management Systems', code: 'CS403' },
        ],
      },
    ],
  },
  {
    name: 'Electronics',
    semesters: [
      {
        name: 'Sem 3',
        subjects: [
          { name: 'Digital Logic Design', code: 'EC301' },
          { name: 'Network Analysis', code: 'EC302' },
        ],
      },
       {
        name: 'Sem 4',
        subjects: [
          { name: 'Signals and Systems', code: 'EC401' },
          { name: 'Control Systems', code: 'EC402' },
        ],
      },
    ],
  },
    {
    name: 'Mechanical',
    semesters: [
      {
        name: 'Sem 3',
        subjects: [
          { name: 'Fluid Mechanics', code: 'ME301' },
          { name: 'Thermodynamics', code: 'ME302' },
        ],
      },
    ],
  },
];