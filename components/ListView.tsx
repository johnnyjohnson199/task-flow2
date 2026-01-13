import React, { useEffect, useState } from 'react';
import { Task } from '../types';
import { api } from '../services/api';

interface ListViewProps {
    onTaskClick: (task: Task) => void;
    onNewTask: () => void;
}

export const ListView: React.FC<ListViewProps> = ({ onTaskClick, onNewTask }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        api.getTasks().then(data => {
            setTasks(data);
            setIsLoading(false);
        });
    }, []);

    const getStatusStyle = (status: string) => {
        switch(status) {
            case 'Done': return 'bg-green-500/10 dark:bg-green-500/20 text-green-700 dark:text-green-400 ring-green-600/20';
            case 'In Progress': return 'bg-blue-500/10 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 ring-blue-700/10';
            case 'Blocked': return 'bg-red-500/10 dark:bg-red-500/20 text-red-700 dark:text-red-400 ring-red-600/10';
            default: return 'bg-gray-500/10 dark:bg-gray-500/20 text-gray-700 dark:text-gray-400 ring-gray-600/10';
        }
    };

    const getPriorityColor = (priority: string) => {
        switch(priority) {
            case 'High': case 'Critical': return 'text-red-500';
            case 'Medium': return 'text-orange-500';
            default: return 'text-gray-400';
        }
    }

    if (isLoading) {
        return (
            <main className="flex-1 flex items-center justify-center bg-white dark:bg-[#0f172a]">
                <div className="flex flex-col items-center gap-3">
                    <div className="size-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-sm text-text-sub-light dark:text-text-sub-dark">Loading list...</span>
                </div>
            </main>
        );
    }

    return (
        <main className="flex-1 flex flex-col bg-white dark:bg-[#0f172a] overflow-hidden">
            {/* Header Controls */}
            <div className="px-6 py-4 flex items-center justify-between border-b border-border-light dark:border-border-dark">
                <div className="flex items-center gap-4">
                    <h1 className="text-xl font-bold text-text-main-light dark:text-white">Marketing Launch</h1>
                    <div className="h-4 w-px bg-gray-300 dark:bg-gray-700"></div>
                    <div className="flex items-center gap-1 text-text-sub-light dark:text-text-sub-dark text-sm">
                        <span className="material-symbols-outlined text-[18px]">check_circle</span>
                        <span>{tasks.filter(t => t.status === 'Done').length}/{tasks.length} Tasks</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[18px] text-text-sub-light">search</span>
                        <input className="pl-10 pr-4 py-1.5 text-sm rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-[#111418] focus:ring-primary focus:border-primary w-64 dark:text-white placeholder-text-sub-light" placeholder="Search tasks..." type="text"/>
                    </div>
                    <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-background-dark text-text-sub-light dark:text-text-sub-dark transition-colors border border-border-light dark:border-border-dark">
                        <span className="material-symbols-outlined text-[20px]">filter_list</span>
                    </button>
                    <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-background-dark text-text-sub-light dark:text-text-sub-dark transition-colors border border-border-light dark:border-border-dark">
                        <span className="material-symbols-outlined text-[20px]">sort</span>
                    </button>
                    <button 
                        onClick={onNewTask}
                        className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-4 py-1.5 rounded-lg text-sm font-bold shadow-sm transition-colors ml-2"
                    >
                        <span className="material-symbols-outlined text-[18px]">add</span>
                        New Task
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="flex-1 overflow-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="sticky top-0 bg-gray-50 dark:bg-surface-dark z-10 border-b border-border-light dark:border-border-dark">
                        <tr>
                            <th className="px-6 py-3 text-[11px] font-bold text-text-sub-light dark:text-text-sub-dark uppercase tracking-wider w-24">ID</th>
                            <th className="px-6 py-3 text-[11px] font-bold text-text-sub-light dark:text-text-sub-dark uppercase tracking-wider min-w-[300px]">Title</th>
                            <th className="px-6 py-3 text-[11px] font-bold text-text-sub-light dark:text-text-sub-dark uppercase tracking-wider w-32">Status</th>
                            <th className="px-6 py-3 text-[11px] font-bold text-text-sub-light dark:text-text-sub-dark uppercase tracking-wider w-32">Priority</th>
                            <th className="px-6 py-3 text-[11px] font-bold text-text-sub-light dark:text-text-sub-dark uppercase tracking-wider w-32">Due Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border-light dark:divide-border-dark">
                        {tasks.map(task => (
                            <tr key={task.id} onClick={() => onTaskClick(task)} className="hover:bg-gray-50 dark:hover:bg-surface-dark transition-colors group cursor-pointer">
                                <td className="px-6 py-4 text-sm font-medium text-text-sub-light dark:text-text-sub-dark">{task.id}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2 pl-8 border-l-2 border-transparent hover:border-gray-200 dark:hover:border-gray-700 ml-2.5">
                                        <span className="material-symbols-outlined text-[16px] text-text-sub-dark">subdirectory_arrow_right</span>
                                        <span className="text-sm font-semibold text-text-main-light dark:text-white group-hover:text-primary transition-colors">{task.title}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center rounded-md px-2 py-1 text-[11px] font-bold ring-1 ring-inset uppercase tracking-tighter ${getStatusStyle(task.status)}`}>{task.status.toUpperCase()}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-1.5">
                                        <span className={`material-symbols-outlined text-[16px] fill-1 ${getPriorityColor(task.priority)}`}>flag</span>
                                        <span className="text-sm text-text-sub-light dark:text-text-sub-dark">{task.priority}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-text-sub-light dark:text-text-sub-dark">
                                    {task.status === 'Blocked' ? <span className="text-red-500 font-medium italic">Due Tomorrow</span> : task.dueDate}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            {/* Pagination Footer */}
            <div className="px-6 py-3 border-t border-border-light dark:border-border-dark flex items-center justify-between bg-white dark:bg-[#111418]">
                <span className="text-xs text-text-sub-light dark:text-text-sub-dark">Showing {tasks.length} results</span>
                <div className="flex items-center gap-2">
                    <button className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-background-dark text-text-sub-light disabled:opacity-30" disabled>
                        <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                    </button>
                    <button className="px-3 py-1 rounded-md bg-primary text-white text-xs font-bold">1</button>
                    <button className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-background-dark text-text-sub-light">
                        <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                    </button>
                </div>
            </div>
        </main>
    );
};
