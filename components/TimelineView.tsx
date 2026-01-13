import React, { useEffect, useState } from 'react';
import { Task } from '../types';
import { api } from '../services/api';

export const TimelineView: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const weeks = ['Oct 23 - 29', 'Oct 30 - Nov 05', 'Nov 06 - 12', 'Nov 13 - 19', 'Nov 20 - 26'];
    
    useEffect(() => {
        api.getTasks().then(data => {
            setTasks(data);
            setIsLoading(false);
        });
    }, []);

    const getTaskPosition = (task: Task) => {
        // Simple mock positioning logic for visual effect
        // In a real app, this would calculate offsets based on task.dueDate vs timeline start date
        switch(task.id) {
            case 'T-101': return { left: 110, width: 320, color: 'bg-green-500', text: 'text-green-700 dark:text-green-400' };
            case 'T-104': return { left: 530, width: 320, color: 'bg-primary', text: 'text-primary' };
            case 'T-106': return { left: 650, width: 280, color: 'bg-gray-500', text: 'text-gray-700 dark:text-gray-400' };
            case 'T-109': return { left: 950, width: 240, color: 'bg-red-500', text: 'text-red-600 dark:text-red-400', pulse: true };
            default: return { left: 100, width: 200, color: 'bg-gray-500', text: 'text-gray-500' };
        }
    };

    if (isLoading) {
        return (
            <main className="flex-1 flex items-center justify-center bg-white dark:bg-[#0f172a]">
                <div className="flex flex-col items-center gap-3">
                    <div className="size-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-sm text-text-sub-light dark:text-text-sub-dark">Loading timeline...</span>
                </div>
            </main>
        );
    }

    return (
        <main className="flex-1 flex flex-col overflow-hidden bg-white dark:bg-[#0f172a]">
             {/* Sub-Header */}
            <div className="flex-none flex items-center justify-between px-4 py-3 border-b border-border-light dark:border-border-dark bg-white dark:bg-[#111418] z-30">
                <div className="flex items-center gap-4">
                    <div className="flex bg-gray-100 dark:bg-background-dark p-1 rounded-lg border border-border-light dark:border-border-dark">
                        <button className="px-4 py-1.5 rounded-md bg-white dark:bg-[#111418] shadow-sm text-xs font-bold text-text-main-light dark:text-white border border-border-light dark:border-border-dark transition-all">All Tasks</button>
                        <button className="px-4 py-1.5 rounded-md text-xs font-medium text-text-sub-light dark:text-text-sub-dark hover:text-text-main-light dark:hover:text-white transition-colors">Subtree View</button>
                    </div>
                    <div className="h-4 w-px bg-border-light dark:bg-border-dark"></div>
                    <button className="flex items-center gap-2 text-text-sub-light dark:text-text-sub-dark hover:text-text-main-light dark:hover:text-white transition-colors text-xs font-medium">
                        <span className="material-symbols-outlined text-[18px]">filter_list</span>
                        Filter
                    </button>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 text-xs text-text-sub-light dark:text-text-sub-dark">
                        <span className="size-2 bg-primary rounded-full"></span>
                        <span>4 Dependencies Visible</span>
                    </div>
                </div>
            </div>

            {/* Timeline Header */}
            <div className="flex-none border-b border-border-light dark:border-border-dark bg-gray-50 dark:bg-[#111418] z-20">
                <div className="flex w-full">
                    <div className="flex-1 overflow-hidden">
                        <div className="flex text-center text-xs font-semibold text-text-sub-light dark:text-text-sub-dark border-b border-border-light dark:border-border-dark">
                            <div className="w-[360px] py-2 border-r border-border-light dark:border-border-dark">October 2023</div>
                            <div className="w-[360px] py-2 border-r border-border-light dark:border-border-dark">November 2023</div>
                        </div>
                        <div className="flex text-center text-[10px] text-text-sub-light dark:text-text-sub-dark">
                            {weeks.map((week, i) => (
                                <div key={i} className="w-[120px] py-2 border-r border-border-light dark:border-border-dark">{week}</div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Timeline Content */}
            <div className="flex-1 relative overflow-auto" 
                 style={{
                     backgroundImage: 'linear-gradient(to right, #334155 1px, transparent 1px)',
                     backgroundSize: '120px 100%'
                 }}>
                <div className="absolute top-0 bottom-0 left-[280px] w-px bg-red-500 z-10">
                    <div className="absolute -top-1 -left-1.5 size-3 bg-red-500 rounded-full border-2 border-white dark:border-[#0f172a]"></div>
                    <div className="absolute top-0 left-2 px-1.5 py-0.5 bg-red-500 text-white text-[10px] rounded font-bold">TODAY</div>
                </div>

                <div className="flex flex-col min-w-max">
                    {tasks.map(task => {
                        const style = getTaskPosition(task);
                        return (
                            <div key={task.id} className="flex group/row min-h-[80px] border-b border-border-light dark:border-border-dark hover:bg-gray-50/50 dark:hover:bg-surface-dark/50 transition-colors">
                                <div className="flex-1 relative py-4">
                                    <div 
                                        style={{ left: style.left, width: style.width }}
                                        className={`absolute top-6 h-9 rounded-lg flex items-center px-3 gap-2 group cursor-pointer border transition-all z-10 shadow-sm
                                        ${style.color.replace('bg-', 'bg-')}/10 border-${style.color.replace('bg-', '')}/30 hover:border-${style.color.replace('bg-', '')}`}
                                    >
                                        <span className={`size-2 rounded-full ${style.color} ${style.pulse ? 'animate-pulse' : ''}`}></span>
                                        <span className={`text-xs font-semibold truncate ${style.text}`}>{task.title} ({task.id})</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="absolute bottom-6 right-6 flex items-center gap-2 bg-white dark:bg-surface-dark p-2 rounded-xl shadow-lg border border-border-light dark:border-border-dark z-50">
                <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-background-dark text-text-sub-light dark:text-text-sub-dark"><span className="material-symbols-outlined text-[20px]">zoom_out</span></button>
                <span className="text-xs font-medium w-12 text-center text-text-main-light dark:text-white">1 Week</span>
                <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-background-dark text-text-sub-light dark:text-text-sub-dark"><span className="material-symbols-outlined text-[20px]">zoom_in</span></button>
            </div>
        </main>
    );
};
