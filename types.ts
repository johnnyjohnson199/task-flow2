import React from 'react';

export type ViewType = 'graph' | 'list' | 'timeline';

export type Status = 'To Do' | 'In Progress' | 'In Review' | 'Done' | 'Blocked';
export type Priority = 'Low' | 'Medium' | 'High' | 'Critical';

export interface User {
  id: string;
  name: string;
  avatar: string;
  email: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: Status;
  priority: Priority;
  dueDate: string; // ISO date string
  assignee?: User;
  tags?: string[];
  dependencies?: string[]; // IDs of tasks this task depends on
  x?: number; // For Graph View
  y?: number; // For Graph View
  parent?: string;
  attachments?: Attachment[];
  comments?: Comment[];
}

export interface Attachment {
  id: string;
  name: string;
  size: string;
  type: 'pdf' | 'image' | 'code' | 'other';
  uploadedBy: string;
  uploadedAt: string;
}

export interface Comment {
  id: string;
  user: User;
  text: string;
  createdAt: string;
  likes: number;
}

export interface Notification {
  id: string;
  type: 'status' | 'file' | 'deadline' | 'comment';
  title: string;
  message: React.ReactNode;
  time: string;
  read: boolean;
}