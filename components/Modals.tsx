import React, { useState } from 'react';
import { Task, Attachment, Comment, Status } from '../types';

// --- Shared Modal Wrapper ---
interface ModalWrapperProps {
    onClose: () => void;
    children: React.ReactNode;
    maxWidth?: string;
    showCloseButton?: boolean;
}
const ModalWrapper: React.FC<ModalWrapperProps> = ({ onClose, children, maxWidth = "max-w-2xl", showCloseButton = true }) => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0f14]/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
        <div className={`relative w-full ${maxWidth} max-h-[90vh] flex flex-col bg-white dark:bg-[#1c252e] rounded-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.6)] border border-border-light dark:border-border-dark overflow-hidden animate-in zoom-in-95 duration-200`}>
             {showCloseButton && (
                 <button onClick={onClose} className="absolute top-4 right-4 z-10 text-text-sub-light hover:text-text-main-light dark:text-text-sub-dark dark:hover:text-white transition-colors rounded-full p-1 hover:bg-black/5 dark:hover:bg-white/5">
                    <span className="material-symbols-outlined text-2xl">close</span>
                </button>
             )}
            {children}
        </div>
    </div>
);

// --- Create Task Modal ---
export const CreateTaskModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
    <ModalWrapper onClose={onClose} maxWidth="max-w-[720px]" showCloseButton={false}>
        <div className="flex items-center justify-between px-6 py-5 border-b border-border-light dark:border-border-dark/50 bg-white dark:bg-[#1c252e]">
            <h3 className="text-text-main-light dark:text-white tracking-tight text-xl font-bold leading-tight">Create New Task</h3>
             <button onClick={onClose} className="text-text-sub-light hover:text-text-main-light dark:text-text-sub-dark dark:hover:text-white transition-colors rounded-full p-1 hover:bg-black/5 dark:hover:bg-white/5">
                <span className="material-symbols-outlined text-2xl">close</span>
            </button>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-7 bg-white dark:bg-[#1c252e]">
            <div className="flex flex-col gap-2">
                <label className="sr-only">Task Title</label>
                <input autoFocus className="w-full bg-transparent border-0 border-b border-transparent focus:border-primary/50 focus:ring-0 text-text-main-light dark:text-white text-3xl font-semibold placeholder:text-text-sub-light/50 px-0 py-2 transition-all" placeholder="What needs to be done?" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                    <label className="text-text-sub-light dark:text-text-sub-dark text-[11px] uppercase tracking-wider font-bold">Parent Task</label>
                    <div className="group flex w-full items-center rounded-lg bg-gray-50 dark:bg-background-dark border border-border-light dark:border-border-dark focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                        <div className="pl-3 pr-2 text-text-sub-light dark:text-text-sub-dark flex items-center">
                            <span className="material-symbols-outlined text-[20px]">account_tree</span>
                        </div>
                        <input className="flex-1 w-full bg-transparent border-none text-text-main-light dark:text-white focus:ring-0 placeholder:text-text-sub-light/50 dark:placeholder:text-text-sub-dark/50 h-11 text-sm font-medium" placeholder="Search hierarchy..." />
                        <div className="pr-3 text-text-sub-light dark:text-text-sub-dark">
                            <span className="material-symbols-outlined text-[20px]">search</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-text-sub-light dark:text-text-sub-dark text-[11px] uppercase tracking-wider font-bold">Due Date</label>
                    <div className="relative flex w-full items-center rounded-lg bg-gray-50 dark:bg-background-dark border border-border-light dark:border-border-dark focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                        <div className="pl-3 pr-2 text-text-sub-light dark:text-text-sub-dark flex items-center pointer-events-none">
                            <span className="material-symbols-outlined text-[20px]">event</span>
                        </div>
                        <input type="date" className="flex-1 w-full bg-transparent border-none text-text-main-light dark:text-white focus:ring-0 h-11 text-sm font-medium pr-3 dark:[color-scheme:dark]" />
                    </div>
                </div>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="flex flex-col gap-2">
                    <label className="text-text-sub-light dark:text-text-sub-dark text-[11px] uppercase tracking-wider font-bold">Status</label>
                    <div className="relative">
                        <select className="w-full appearance-none bg-gray-50 dark:bg-background-dark border border-border-light dark:border-border-dark rounded-lg text-text-main-light dark:text-white h-11 px-3 pr-10 text-sm font-medium focus:border-primary focus:ring-1 focus:ring-primary outline-none cursor-pointer">
                            <option value="todo">To Do</option>
                            <option value="in-progress">In Progress</option>
                            <option value="review">In Review</option>
                            <option value="done">Done</option>
                        </select>
                         <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-text-sub-light dark:text-text-sub-dark">
                            <span className="material-symbols-outlined text-[20px]">expand_more</span>
                        </div>
                    </div>
                 </div>
                 <div className="flex flex-col gap-2">
                     <label className="text-text-sub-light dark:text-text-sub-dark text-[11px] uppercase tracking-wider font-bold">Priority</label>
                     <div className="flex h-11 w-full items-center rounded-lg bg-gray-50 dark:bg-background-dark border border-border-light dark:border-border-dark p-1">
                        {['LOW', 'MED', 'HIGH'].map((p, i) => (
                             <label key={p} className="group flex cursor-pointer h-full flex-1 items-center justify-center rounded px-2 transition-all has-[:checked]:bg-white dark:has-[:checked]:bg-surface-dark has-[:checked]:text-text-main-light dark:has-[:checked]:text-white has-[:checked]:shadow-sm text-text-sub-light dark:text-text-sub-dark hover:text-text-main-light dark:hover:text-white">
                                <span className="text-[11px] font-bold">{p}</span>
                                <input type="radio" name="priority" value={p} className="sr-only" defaultChecked={i === 1} />
                            </label>
                        ))}
                         <label className="group flex cursor-pointer h-full flex-1 items-center justify-center rounded px-2 transition-all has-[:checked]:bg-red-500/10 has-[:checked]:text-red-500 dark:has-[:checked]:text-red-400 has-[:checked]:shadow-sm text-text-sub-light dark:text-text-sub-dark hover:text-red-500">
                            <span className="material-symbols-outlined text-[18px]">warning</span>
                            <input type="radio" name="priority" value="Critical" className="sr-only" />
                        </label>
                     </div>
                 </div>
             </div>

             <div className="flex flex-col gap-2">
                <div className="flex justify-between items-end">
                    <label className="text-text-sub-light dark:text-text-sub-dark text-[11px] uppercase tracking-wider font-bold">Description</label>
                     <div className="flex items-center gap-1">
                        <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-white/5 text-text-sub-light dark:text-text-sub-dark hover:text-text-main-light dark:hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-[18px]">format_bold</span>
                        </button>
                        <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-white/5 text-text-sub-light dark:text-text-sub-dark hover:text-text-main-light dark:hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-[18px]">format_italic</span>
                        </button>
                        <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-white/5 text-text-sub-light dark:text-text-sub-dark hover:text-text-main-light dark:hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-[18px]">format_list_bulleted</span>
                        </button>
                    </div>
                </div>
                <textarea className="w-full bg-gray-50 dark:bg-background-dark border border-border-light dark:border-border-dark rounded-lg p-4 text-text-main-light dark:text-white placeholder:text-text-sub-light/40 dark:placeholder:text-text-sub-dark/40 focus:border-primary focus:ring-1 focus:ring-primary text-sm leading-relaxed min-h-[120px] resize-none" placeholder="Add details about this task..."></textarea>
             </div>
             
             <div className="flex flex-col gap-3">
                 <label className="text-text-sub-light dark:text-text-sub-dark text-[11px] uppercase tracking-wider font-bold">File Attachments</label>
                 <div className="relative group cursor-pointer">
                    <div className="flex flex-col items-center justify-center w-full min-h-[100px] border-2 border-dashed border-border-light dark:border-border-dark rounded-xl bg-gray-50 dark:bg-background-dark/50 hover:bg-gray-100 dark:hover:bg-background-dark/80 hover:border-primary/50 transition-all group-active:scale-[0.99]">
                        <span className="material-symbols-outlined text-text-sub-light dark:text-text-sub-dark text-3xl mb-2 group-hover:text-primary transition-colors">upload_file</span>
                        <p className="text-sm font-medium text-text-main-light dark:text-white mb-1">Click to upload or drag & drop</p>
                        <p className="text-xs text-text-sub-light dark:text-text-sub-dark">PDF, JPG, PNG or DOC (max 20MB)</p>
                        <input type="file" multiple className="absolute inset-0 opacity-0 cursor-pointer" />
                    </div>
                 </div>
             </div>
        </div>
        <div className="flex items-center justify-end gap-3 px-6 py-5 border-t border-border-light dark:border-border-dark/50 bg-gray-50 dark:bg-[#161d24] rounded-b-xl">
            <button onClick={onClose} className="px-5 py-2.5 rounded-lg border border-border-light dark:border-border-dark text-text-main-light dark:text-white text-sm font-medium hover:bg-gray-200 dark:hover:bg-white/5 hover:border-text-sub-light dark:hover:border-text-sub-dark transition-all">
                Cancel
            </button>
            <button className="px-6 py-2.5 rounded-lg bg-primary hover:bg-primary-hover text-white text-sm font-medium shadow-[0_0_15px_-3px_rgba(19,127,236,0.4)] transition-all flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px]">add</span>
                Create Task
            </button>
        </div>
    </ModalWrapper>
);

// --- Create Project Modal ---
export const CreateProjectModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
    <ModalWrapper onClose={onClose} maxWidth="max-w-xl">
        <div className="px-6 py-4 border-b border-border-light dark:border-border-dark flex items-center justify-between">
            <h2 className="text-xl font-bold text-text-main-light dark:text-white">Create New Project</h2>
        </div>
        <div className="p-6 flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-text-main-light dark:text-white" htmlFor="project-name">Project Name</label>
                <input id="project-name" type="text" className="w-full h-11 px-4 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-[#283039] text-text-main-light dark:text-white placeholder:text-text-sub-light dark:placeholder:text-text-sub-dark focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="e.g. Q4 Growth Strategy" />
            </div>
            <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-text-main-light dark:text-white" htmlFor="description">Description</label>
                <textarea id="description" rows={3} className="w-full px-4 py-3 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-[#283039] text-text-main-light dark:text-white placeholder:text-text-sub-light dark:placeholder:text-text-sub-dark focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none" placeholder="Define the core objectives and timeline..." />
            </div>
        </div>
        <div className="px-6 py-4 bg-gray-50 dark:bg-[#1c2127] border-t border-border-light dark:border-border-dark flex items-center justify-end gap-3">
             <button onClick={onClose} className="h-10 px-6 rounded-lg text-sm font-bold text-text-sub-light dark:text-text-sub-dark hover:bg-gray-200 dark:hover:bg-[#283039] transition-colors">
                Cancel
            </button>
            <button className="h-10 px-6 rounded-lg bg-primary hover:bg-primary/90 text-white text-sm font-bold shadow-sm shadow-primary/20 transition-colors">
                Create Project
            </button>
        </div>
    </ModalWrapper>
);

// --- Share Project Modal ---
export const ShareProjectModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
    <ModalWrapper onClose={onClose} maxWidth="max-w-lg">
        <div className="flex items-center justify-between border-b border-border-light dark:border-border-dark px-6 py-4">
            <h3 className="text-lg font-semibold leading-6 text-gray-900 dark:text-white flex items-center gap-2">
                <span className="material-icons-round text-gray-400 dark:text-gray-500 text-xl">ios_share</span>
                Share Project
            </h3>
        </div>
        <div className="px-6 py-6 space-y-6">
            <div>
                <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Project Link</label>
                     <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 dark:text-gray-400">Public Access</span>
                        <div className="bg-primary relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent">
                            <span className="translate-x-4 pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0"></span>
                        </div>
                    </div>
                </div>
                <div className="flex rounded-md shadow-sm">
                    <div className="relative flex-grow focus-within:z-10">
                         <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <span className="material-icons-round text-gray-400 text-lg">link</span>
                        </div>
                        <input readOnly type="text" value="https://app.taskmanager.com/p/hierarchy-v2" className="block w-full rounded-none rounded-l-md border-border-light dark:border-border-dark bg-gray-50 dark:bg-gray-800/50 py-2.5 pl-10 text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-primary focus:ring-primary sm:text-sm transition-colors" />
                    </div>
                    <button className="relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-border-light dark:border-border-dark bg-gray-50 dark:bg-gray-700/50 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors">
                        <span>Copy</span>
                    </button>
                </div>
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">Anyone with the link can view this project.</p>
            </div>
            <div className="border-t border-border-light dark:border-border-dark"></div>
             <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">People with access</h4>
                <div className="space-y-4">
                     <div className="flex gap-2 mb-6">
                        <input type="email" placeholder="Add people by email..." className="block w-full rounded-md border-border-light dark:border-border-dark bg-white dark:bg-gray-800/50 text-gray-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2 px-3" />
                         <button className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-hover transition-colors">
                            Invite
                        </button>
                     </div>
                     <div className="flex items-center justify-between">
                         <div className="flex items-center gap-3">
                            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGrtbk9LQgN4wy3QkWzIoYQhh8uZhKAiFJN1wkRGdl7iJb3F6x-yDovxI5BuJxD3jFs8i-cT_61sTwF7ErefKewf9vGSHxxt47ZN8KYlYF7bIaEaCdHHfG2btfLlkOCR-eWq8e4rMOOkqYa13n0501D_dPo4MhXfpcW-H_JwXouIHA93Yp9PPYqRVEkD0-kUJ4s2iccL4EbE7kTQyvDCg7diTun0RY9bofIcqBKNsP0ZPCM6ZkCUgca0VZ4be_UdebvzsFqWTCg_8" className="h-9 w-9 rounded-full bg-gray-300 ring-2 ring-white dark:ring-gray-800 object-cover" />
                             <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">Tom Cook</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">tom@example.com</p>
                            </div>
                         </div>
                         <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700/50 px-2 py-1 rounded">Owner</span>
                     </div>
                </div>
             </div>
        </div>
    </ModalWrapper>
);

// --- Task Detail Modal ---
export const TaskDetailModal: React.FC<{ task: Task, onClose: () => void }> = ({ task, onClose }) => {
    const [activeTab, setActiveTab] = useState<'Details' | 'Activity' | 'Files'>('Details');
    const taskData = task;
    
    return (
        <ModalWrapper onClose={onClose} maxWidth="max-w-[1200px]" showCloseButton={false}>
            {/* Header */}
             <div className="flex flex-col border-b border-border-light dark:border-border-dark">
                <div className="flex flex-wrap items-center justify-between gap-2 p-4 pb-0">
                    <div className="flex items-center gap-2">
                        <a href="#" className="text-text-sub-light dark:text-text-sub-dark text-sm font-medium hover:text-primary transition-colors">Project Phoenix</a>
                        <span className="text-text-sub-light dark:text-text-sub-dark text-sm">/</span>
                        <a href="#" className="text-text-sub-light dark:text-text-sub-dark text-sm font-medium hover:text-primary transition-colors">Sprint 24</a>
                         <span className="text-text-sub-light dark:text-text-sub-dark text-sm">/</span>
                         <span className="text-text-main-light dark:text-white text-sm font-medium">{taskData.id}</span>
                    </div>
                     <div className="flex gap-1">
                        <button className="p-2 text-text-sub-light dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"><span className="material-symbols-outlined">edit</span></button>
                        <button className="p-2 text-text-sub-light dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"><span className="material-symbols-outlined">share</span></button>
                        <button className="p-2 text-text-sub-light dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"><span className="material-symbols-outlined">more_vert</span></button>
                        <div className="w-px h-6 bg-border-light dark:bg-gray-700 mx-1 self-center"></div>
                        <button onClick={onClose} className="p-2 text-text-sub-light dark:text-white hover:bg-red-500/20 hover:text-red-500 rounded-lg transition-colors"><span className="material-symbols-outlined">close</span></button>
                    </div>
                </div>
                 <h1 className="text-text-main-light dark:text-white tracking-tight text-3xl font-bold px-4 pt-4 pb-6">{taskData.title}</h1>
                 <div className="flex border-b border-border-light dark:border-border-dark px-4 gap-8">
                    {(['Details', 'Activity', 'Files'] as const).map(tab => (
                        <button 
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex flex-col items-center justify-center border-b-2 pb-3 pt-2 ${activeTab === tab ? 'border-primary text-primary' : 'border-transparent text-text-sub-light dark:text-text-sub-dark hover:text-text-main-light dark:hover:text-white'}`}
                        >
                             <div className="flex items-center gap-1.5">
                                <p className="text-sm font-bold tracking-[0.015em]">{tab}</p>
                                {tab === 'Files' && <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeTab === tab ? 'bg-primary/10 text-primary' : 'bg-gray-100 dark:bg-gray-800'}`}>{taskData.attachments?.length || 0}</span>}
                             </div>
                        </button>
                    ))}
                </div>
             </div>

             <div className="flex flex-col lg:flex-row flex-1 overflow-hidden min-h-[600px] bg-white dark:bg-[#1a222c]">
                 {/* Main Content Area */}
                 <div className="flex-1 overflow-y-auto border-r border-border-light dark:border-border-dark p-6 custom-scrollbar">
                     {activeTab === 'Details' && (
                        <div className="animate-in fade-in slide-in-from-left-4 duration-300">
                             <section className="mb-10">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-text-main-light dark:text-white">Description</h3>
                                    <button className="text-xs text-primary font-medium hover:underline">Edit</button>
                                </div>
                                <div className="prose dark:prose-invert max-w-none text-text-sub-light dark:text-slate-300 space-y-4">
                                    <p>{taskData.description}</p>
                                     <ul className="list-disc pl-5 space-y-2">
                                        <li>Set up WebSocket provider with fallback to long-polling.</li>
                                        <li>Implement awareness protocol for user cursor positions.</li>
                                        <li>Handle conflict resolution for nested JSON blocks.</li>
                                        <li>Ensure end-to-end encryption for document state updates.</li>
                                    </ul>
                                    <div className="bg-gray-50 dark:bg-slate-900/50 border border-border-light dark:border-border-dark p-4 rounded-lg font-mono text-sm overflow-x-auto">
                                        <pre><code>const ydoc = new Y.Doc();<br/>const provider = new WebsocketProvider('wss://api.taskflow.com', 'room-1', ydoc);</code></pre>
                                    </div>
                                </div>
                             </section>
                             <section>
                                 <h3 className="text-lg font-semibold text-text-main-light dark:text-white mb-6">Comments</h3>
                                  <div className="flex gap-4 mb-8">
                                     <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 flex-shrink-0" style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuBzZP_JQ_P8ULlZMUTJarvOz3IsB0CXDAVLpH5rD6wX3zO8D9SaLwAYT9CpWomxAu-8SxD_3MPUe2ZcSdu4e9qw8iHnCLLMR92UzTJOV7dBRh7JX77cvHeU9txkW6fe77F18iQ_vPS0oRkAc2uq_q0dtdHjZAiMxQ7IOQT6maX-D5wfHQvq56Hqpr9QXRW2XDyTYq735WWuLqmqU9XTCP5f9SAFQOzxWcjzc1j4HpghgVyWgj3ROo3hHrxTkhGLJNRYFdsNZeJNhS4")` }}></div>
                                     <div className="flex-1 flex flex-col gap-2">
                                        <textarea className="w-full rounded-lg border-border-light dark:border-border-dark bg-white dark:bg-gray-800 text-text-main-light dark:text-white focus:border-primary focus:ring-1 focus:ring-primary min-h-[100px] p-3 text-sm" placeholder="Write a comment..."></textarea>
                                        <div className="flex justify-between items-center">
                                            <div className="flex gap-2">
                                                <button className="p-1.5 text-text-sub-light hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"><span className="material-symbols-outlined text-lg">attach_file</span></button>
                                                <button className="p-1.5 text-text-sub-light hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"><span className="material-symbols-outlined text-lg">alternate_email</span></button>
                                                <button className="p-1.5 text-text-sub-light hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"><span className="material-symbols-outlined text-lg">mood</span></button>
                                            </div>
                                            <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-sm">Post Comment</button>
                                        </div>
                                     </div>
                                  </div>
                                  <div className="space-y-6">
                                     {taskData.comments?.map(comment => (
                                         <div key={comment.id} className="flex gap-4">
                                            {/* Mock avatars based on name */}
                                             <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 flex-shrink-0" style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuBU2R3FGa7clY9RtjmpQOp3TYC_AE8z7sYbHTUUlPUEIar1L6G3DtYXjhlzKdAJzGKfOayZYGpAXxADwYCEer3kWxJsAOWgsPKMUXnPbDkDqJ6P_0h7L65vhbqgy7iUYbSJaQH3fm77LNSSNXpEvnHDUFz91Ge523ydx3f9JhPwjQsYLQqNPFeLPXXdpyUDPu2uSE1SUjLOlXhghnJ9tMOx2HbSe5hlcESlY_igMnp6GHgP25aCl0WI7ae70b3MECySRhANBvVtNHw")` }}></div>
                                             <div className="flex-1">
                                                 <div className="flex items-center gap-2 mb-1">
                                                     <span className="font-bold text-text-main-light dark:text-white text-sm">{comment.user.name}</span>
                                                     <span className="text-text-sub-light dark:text-text-sub-dark text-xs">{comment.createdAt}</span>
                                                 </div>
                                                 <p className="text-sm text-gray-700 dark:text-slate-300">{comment.text}</p>
                                                 <div className="flex gap-4 mt-2">
                                                    <button className="text-xs text-text-sub-light hover:text-primary font-medium">Reply</button>
                                                    {comment.likes > 0 && (
                                                        <button className="text-xs text-text-sub-light hover:text-primary font-medium flex items-center gap-1">
                                                            <span className="material-symbols-outlined text-sm">thumb_up</span> {comment.likes}
                                                        </button>
                                                    )}
                                                 </div>
                                             </div>
                                         </div>
                                     ))}
                                  </div>
                             </section>
                        </div>
                     )}
                     
                     {activeTab === 'Files' && (
                         <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="mb-6 flex justify-between items-center">
                                <h3 className="text-lg font-semibold text-text-main-light dark:text-white">Attachments</h3>
                                <button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all shadow-sm">
                                    <span className="material-symbols-outlined text-lg">upload_file</span>
                                    Upload File
                                </button>
                            </div>
                             <div className="mb-8 border-2 border-dashed border-border-light dark:border-border-dark rounded-xl p-8 flex flex-col items-center justify-center text-center bg-gray-50 dark:bg-slate-900/30 hover:bg-gray-100 dark:hover:bg-slate-900/50 transition-colors cursor-pointer group">
                                <div className="size-12 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-text-sub-light dark:text-text-sub-dark text-2xl">cloud_upload</span>
                                </div>
                                <p className="text-sm font-medium text-text-main-light dark:text-white mb-1">Click to upload or drag and drop</p>
                                <p className="text-xs text-text-sub-light dark:text-text-sub-dark">SVG, PNG, JPG or PDF (max. 10MB)</p>
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                {taskData.attachments?.map(file => (
                                     <div key={file.id} className="flex items-center p-4 bg-white dark:bg-gray-800 border border-border-light dark:border-border-dark rounded-lg hover:border-primary/50 transition-colors group">
                                         <div className={`size-10 rounded-lg flex items-center justify-center mr-4 
                                            ${file.type === 'pdf' ? 'bg-red-50 dark:bg-red-500/10 text-red-500' : 
                                              file.type === 'image' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-500' : 
                                              'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300'}`}>
                                             <span className="material-symbols-outlined">
                                                 {file.type === 'pdf' ? 'picture_as_pdf' : file.type === 'image' ? 'image' : 'code'}
                                             </span>
                                         </div>
                                         <div className="flex-1 min-w-0">
                                             <h4 className="text-sm font-medium text-text-main-light dark:text-white truncate">{file.name}</h4>
                                             <div className="flex items-center gap-2 text-xs text-text-sub-light dark:text-text-sub-dark mt-1">
                                                 <span>{file.size}</span>
                                                 <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600"></span>
                                                 <span>Uploaded by {file.uploadedBy}</span>
                                                 <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600"></span>
                                                 <span>{file.uploadedAt}</span>
                                             </div>
                                         </div>
                                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 text-text-sub-light hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors" title="Download"><span className="material-symbols-outlined">download</span></button>
                                            <button className="p-2 text-text-sub-light hover:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors" title="Delete"><span className="material-symbols-outlined">delete</span></button>
                                        </div>
                                     </div>
                                ))}
                            </div>
                         </div>
                     )}

                     {activeTab === 'Activity' && (
                          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                             <h3 className="text-lg font-semibold text-text-main-light dark:text-white mb-6">Recent Activity</h3>
                             {/* Simplified Activity Timeline */}
                             <div className="relative pl-12 pb-8 timeline-line before:absolute before:left-[19px] before:top-10 before:bottom-[-24px] before:w-0.5 before:bg-border-light dark:before:bg-border-dark">
                                <div className="absolute left-0 top-0 size-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center border border-blue-100 dark:border-blue-900/30 z-10">
                                    <span className="material-symbols-outlined text-primary text-lg">sync_alt</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium text-text-main-light dark:text-white">Task status changed</span>
                                        <span className="text-xs text-text-sub-light dark:text-text-sub-dark">15 minutes ago</span>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-slate-300">
                                        Status updated from <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-slate-200">To Do</span> to <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary">In Progress</span> by <span className="font-medium text-text-main-light dark:text-white">Jane Doe</span>
                                    </p>
                                </div>
                             </div>
                             
                             <div className="relative pl-12 timeline-line before:hidden">
                                <div className="absolute left-0 top-0 size-10 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center border border-green-100 dark:border-green-900/30 z-10">
                                    <span className="material-symbols-outlined text-green-600 dark:text-green-500 text-lg">add</span>
                                </div>
                                <div className="flex flex-col gap-1 pt-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium text-text-main-light dark:text-white">Task created</span>
                                        <span className="text-xs text-text-sub-light dark:text-text-sub-dark">Oct 12, 2023</span>
                                    </div>
                                </div>
                            </div>
                          </div>
                     )}
                 </div>

                 {/* Sidebar (Right) */}
                 <aside className="w-full lg:w-[340px] bg-gray-50/50 dark:bg-slate-900/20 p-6 flex flex-col gap-8 overflow-y-auto">
                    <div className="space-y-4">
                        <div>
                            <label className="text-xs font-bold text-text-sub-light dark:text-text-sub-dark uppercase tracking-wider mb-2 block">Status</label>
                            <button className="w-full flex items-center justify-between px-3 py-2 bg-primary/10 border border-primary/30 rounded-lg text-primary text-sm font-semibold">
                                <div className="flex items-center gap-2">
                                    <span className="size-2 bg-primary rounded-full animate-pulse"></span>
                                    {taskData.status}
                                </div>
                                <span className="material-symbols-outlined text-sm">expand_more</span>
                            </button>
                        </div>
                         <div className="grid grid-cols-2 gap-4">
                             <div>
                                <label className="text-xs font-bold text-text-sub-light dark:text-text-sub-dark uppercase tracking-wider mb-2 block">Priority</label>
                                <button className="w-full flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 border border-border-light dark:border-border-dark rounded-lg text-sm text-red-500 font-medium">
                                    <span className="material-symbols-outlined text-sm">priority_high</span>
                                    High
                                </button>
                             </div>
                             <div>
                                <label className="text-xs font-bold text-text-sub-light dark:text-text-sub-dark uppercase tracking-wider mb-2 block">Due Date</label>
                                <button className="w-full flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 border border-border-light dark:border-border-dark rounded-lg text-sm text-text-main-light dark:text-white font-medium">
                                    <span className="material-symbols-outlined text-sm">calendar_today</span>
                                    Oct 24
                                </button>
                             </div>
                         </div>
                    </div>
                     <div>
                        <label className="text-xs font-bold text-text-sub-light dark:text-text-sub-dark uppercase tracking-wider mb-3 block">Dependencies</label>
                        <div className="space-y-3">
                             {taskData.dependencies?.map(dep => (
                                 <div key={dep} className="p-3 bg-red-500/5 border border-red-500/20 rounded-lg">
                                    <div className="flex items-center gap-2 text-red-500 mb-2">
                                        <span className="material-symbols-outlined text-sm">block</span>
                                        <span className="text-[10px] font-bold uppercase">Blocked By</span>
                                    </div>
                                    <a href="#" className="text-xs font-medium text-text-main-light dark:text-slate-200 hover:text-primary transition-colors block">
                                        {dep}: Database Schema Migration
                                    </a>
                                </div>
                             ))}
                        </div>
                     </div>
                     <div>
                        <div className="flex items-center justify-between mb-3">
                            <label className="text-xs font-bold text-text-sub-light dark:text-text-sub-dark uppercase tracking-wider">Child Tasks</label>
                            <span className="text-[10px] font-bold bg-gray-200 dark:bg-gray-800 px-1.5 py-0.5 rounded text-text-sub-light dark:text-text-sub-dark">40%</span>
                        </div>
                         <div className="space-y-3">
                             {/* Hardcoded child tasks for visual match */}
                            <div className="group block p-3 bg-white dark:bg-gray-800 border border-border-light dark:border-border-dark rounded-lg hover:border-primary hover:shadow-md transition-all shadow-sm">
                                <div className="flex items-center gap-2 text-[10px] font-bold text-text-sub-light dark:text-text-sub-dark uppercase mb-2">
                                    <span className="material-symbols-outlined text-xs">folder_open</span>
                                    PHX-402-1
                                    <span className="text-gray-300 dark:text-gray-600 mx-1">•</span>
                                    <span className="text-green-500">Done</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <h4 className="text-sm font-semibold text-text-main-light dark:text-slate-200 group-hover:text-primary line-through decoration-gray-400 decoration-2">Setup WebSocket Provider</h4>
                                </div>
                            </div>
                            <button className="w-full mt-2 py-2 border-2 border-dashed border-border-light dark:border-border-dark rounded-lg text-xs font-medium text-text-sub-light hover:border-primary hover:text-primary transition-all">
                                + Add Child Task
                            </button>
                         </div>
                     </div>
                 </aside>
             </div>
        </ModalWrapper>
    );
};
