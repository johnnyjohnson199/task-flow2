import { Task, User, Notification } from '../types';
import { TASKS, CURRENT_USER, NOTIFICATIONS } from './mockData';

// Configuration
const USE_MOCK_API = false; // Connected to Go Backend
const API_BASE_URL = 'http://localhost:8080/api/v1'; // Local Go server

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
    // --- Tasks ---
    getTasks: async (): Promise<Task[]> => {
        if (USE_MOCK_API) {
            await delay(600); // Simulate network latency
            // Deep copy to prevent reference issues in mocks
            return JSON.parse(JSON.stringify(TASKS));
        }
        const response = await fetch(`${API_BASE_URL}/tasks`);
        if (!response.ok) throw new Error('Failed to fetch tasks');
        return response.json();
    },

    createTask: async (task: Partial<Task>): Promise<Task> => {
        if (USE_MOCK_API) {
            await delay(400);
            const newTask: Task = {
                ...task,
                id: `T-${Math.floor(Math.random() * 1000)}`,
                status: 'To Do',
                priority: 'Medium',
                dueDate: new Date().toISOString().split('T')[0],
                dependencies: [],
            } as Task;
            return newTask;
        }
        const response = await fetch(`${API_BASE_URL}/tasks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task),
        });
        if (!response.ok) throw new Error('Failed to create task');
        return response.json();
    },

    updateTask: async (taskId: string, updates: Partial<Task>): Promise<Task> => {
        if (USE_MOCK_API) {
            await delay(300);
            return { id: taskId, ...updates } as Task; 
        }
        const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updates),
        });
        if (!response.ok) throw new Error('Failed to update task');
        return response.json();
    },

    // --- Users ---
    getCurrentUser: async (): Promise<User> => {
        if (USE_MOCK_API) {
            await delay(200);
            return CURRENT_USER;
        }
        const response = await fetch(`${API_BASE_URL}/users/me`);
        if (!response.ok) throw new Error('Failed to fetch user');
        return response.json();
    },

    // --- Notifications ---
    getNotifications: async (): Promise<Notification[]> => {
        if (USE_MOCK_API) {
            await delay(400);
            return NOTIFICATIONS;
        }
        const response = await fetch(`${API_BASE_URL}/notifications`);
        if (!response.ok) throw new Error('Failed to fetch notifications');
        return response.json();
    }
};
