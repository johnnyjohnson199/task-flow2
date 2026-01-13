import { Task, User, Notification } from '../types';

export const CURRENT_USER: User = {
  id: 'u1',
  name: 'Jane Doe',
  email: 'jane@taskflow.com',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzZP_JQ_P8ULlZMUTJarvOz3IsB0CXDAVLpH5rD6wX3zO8D9SaLwAYT9CpWomxAu-8SxD_3MPUe2ZcSdu4e9qw8iHnCLLMR92UzTJOV7dBRh7JX77cvHeU9txkW6fe77F18iQ_vPS0oRkAc2uq_q0dtdHjZAiMxQ7IOQT6maX-D5wfHQvq56Hqpr9QXRW2XDyTYq735WWuLqmqU9XTCP5f9SAFQOzxWcjzc1j4HpghgVyWgj3ROo3hHrxTkhGLJNRYFdsNZeJNhS4'
};

export const TASKS: Task[] = [
  {
    id: 'T-101',
    title: 'Design System Update',
    description: 'Update color tokens and typography scale for dark mode consistency.',
    status: 'Done',
    priority: 'High',
    dueDate: '2023-10-24',
    x: 130, y: 240,
    dependencies: [],
    tags: ['Design']
  },
  {
    id: 'T-104',
    title: 'Implement UI Components',
    description: 'Build the new Card and Sidebar components using Tailwind.',
    status: 'In Progress',
    priority: 'Medium',
    dueDate: '2023-10-28',
    x: 650, y: 80,
    dependencies: ['T-101'],
    tags: ['Frontend']
  },
  {
    id: 'T-106',
    title: 'Content Migration',
    description: 'Move blog posts from legacy CMS to new platform.',
    status: 'To Do',
    priority: 'Low',
    dueDate: '2023-11-02',
    x: 650, y: 400,
    dependencies: ['T-101'],
    tags: ['Content']
  },
  {
    id: 'T-109',
    title: 'QA Testing',
    description: 'Verify component responsiveness and dark mode compatibility.',
    status: 'Blocked',
    priority: 'High',
    dueDate: '2023-10-29', // Tomorrow relative to mock date
    x: 1150, y: 220,
    dependencies: ['T-104'],
    tags: ['QA']
  },
  {
      id: 'PHX-402',
      title: 'Implement real-time collaboration engine for document editor',
      description: 'We need to integrate a robust Yjs-based collaboration engine to handle concurrent edits.',
      status: 'In Progress',
      priority: 'High',
      dueDate: '2023-10-24',
      dependencies: ['PHX-398'],
      attachments: [
          { id: 'f1', name: 'Architecture_Spec_v2.pdf', size: '2.4 MB', type: 'pdf', uploadedBy: 'Sarah Chen', uploadedAt: 'Oct 23, 10:42 AM' },
          { id: 'f2', name: 'UI_Mockups_Collab.png', size: '1.8 MB', type: 'image', uploadedBy: 'Marcus Wright', uploadedAt: 'Oct 22, 4:15 PM' },
          { id: 'f3', name: 'websocket_config.json', size: '12 KB', type: 'code', uploadedBy: 'Sarah Chen', uploadedAt: 'Oct 22, 11:20 AM' }
      ],
      comments: [
        { id: 'c1', user: {id: 'u2', name: 'Sarah Chen', avatar: '', email: ''}, text: "I've verified the WebSocket provider fallback. It works well on cellular networks.", createdAt: '2 hours ago', likes: 2 },
        { id: 'c2', user: {id: 'u3', name: 'Marcus Wright', avatar: '', email: ''}, text: "Yes, Sarah. Let's add that to the Child Tasks list for tracking.", createdAt: '1 hour ago', likes: 0 }
      ]
  }
];

export const NOTIFICATIONS: Notification[] = [
    {
        id: 'n1',
        type: 'status',
        title: 'Task Status Updated',
        message: 'Sarah Jenkins moved "Q3 Marketing Strategy" to In Review.',
        time: '2m ago',
        read: false
    },
    {
        id: 'n2',
        type: 'file',
        title: 'New File Attached',
        message: 'Mike Ross attached design_v3.fig to "Homepage Redesign".',
        time: '15m ago',
        read: false
    },
    {
        id: 'n3',
        type: 'deadline',
        title: 'Deadline Approaching',
        message: 'The deadline for "Backend Migration" is tomorrow at 5:00 PM.',
        time: '1h ago',
        read: false
    },
    {
        id: 'n4',
        type: 'comment',
        title: 'New Comment',
        message: 'Elena Fisher commented: "Looks great, let\'s ship it!"',
        time: '3h ago',
        read: true
    }
];
