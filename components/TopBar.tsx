import React, { useState, useEffect } from 'react';
import { ViewType, Notification, User } from '../types';
import { api } from '../services/api';

interface TopBarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  toggleDarkMode: () => void;
  isDarkMode: boolean;
  onOpenShare: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ currentView, onViewChange, toggleDarkMode, isDarkMode, onOpenShare }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    api.getCurrentUser().then(setUser);
    api.getNotifications().then(setNotifications);
  }, []);

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-border-light dark:border-border-dark bg-white dark:bg-background-dark px-6 py-3 z-30 shrink-0">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-3 text-text-main-light dark:text-white">
          <div className="size-8 rounded bg-primary flex items-center justify-center text-white shadow-sm">
            <span className="material-symbols-outlined text-[20px]">account_tree</span>
          </div>
          <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">TaskFlow</h2>
        </div>
        <label className="hidden md:flex flex-col min-w-40 h-10 w-64">
          <div className="flex w-full flex-1 items-stretch rounded-lg h-full border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent transition-all">
            <div className="text-text-sub-light dark:text-text-sub-dark flex items-center justify-center pl-3">
              <span className="material-symbols-outlined text-[20px]">search</span>
            </div>
            <input 
              className="flex w-full min-w-0 flex-1 resize-none outline-none border-none bg-transparent h-full placeholder:text-text-sub-light dark:placeholder:text-text-sub-dark px-3 text-sm font-normal leading-normal text-text-main-light dark:text-white focus:ring-0" 
              placeholder="Search tasks or nodes..." 
            />
          </div>
        </label>
      </div>
      <div className="flex items-center gap-4">
        <nav className="hidden lg:flex items-center gap-6 mr-4">
          {(['graph', 'list', 'timeline'] as ViewType[]).map((view) => (
            <button
              key={view}
              onClick={() => onViewChange(view)}
              className={`text-sm font-medium leading-normal transition-colors capitalize ${
                currentView === view
                  ? 'text-text-main-light dark:text-white border-b-2 border-primary pb-0.5'
                  : 'text-text-sub-light dark:text-text-sub-dark hover:text-text-main-light dark:hover:text-white'
              }`}
            >
              {view} View
            </button>
          ))}
        </nav>
        <div className="flex gap-2 relative">
          <button 
            onClick={onOpenShare}
            className="hidden sm:flex h-9 items-center justify-center rounded-lg px-4 bg-primary hover:bg-primary-hover text-white text-sm font-bold shadow-sm transition-colors"
          >
            Share
          </button>
          
          {/* Notifications Button */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className={`size-9 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-surface-dark text-text-main-light dark:text-white transition-colors ${showNotifications ? 'bg-gray-100 dark:bg-surface-dark' : ''}`}
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              {notifications.some(n => !n.read) && (
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-background-dark"></span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 top-full mt-3 w-96 bg-white dark:bg-surface-dark rounded-xl shadow-2xl border border-border-light dark:border-border-dark overflow-hidden origin-top-right z-50 animate-in fade-in zoom-in-95 duration-200">
                <div className="px-5 py-4 border-b border-border-light dark:border-border-dark flex items-center justify-between bg-gray-50 dark:bg-background-dark">
                  <h3 className="font-semibold text-base text-text-main-light dark:text-white">Notifications</h3>
                  <button className="text-xs font-medium text-primary hover:text-primary-hover transition-colors">
                    Mark all as read
                  </button>
                </div>
                <div className="max-h-[400px] overflow-y-auto">
                  {notifications.map((note) => (
                    <div key={note.id} className={`px-5 py-4 border-b border-border-light dark:border-border-dark hover:bg-gray-50 dark:hover:bg-background-dark cursor-pointer transition-colors relative group ${note.read ? 'opacity-75' : ''}`}>
                      <div className="flex items-start gap-4">
                        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center 
                          ${note.type === 'status' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' :
                            note.type === 'file' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' :
                            note.type === 'deadline' ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' :
                            'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                          }`}>
                          <span className="material-icons-round text-sm">
                            {note.type === 'status' ? 'donut_large' :
                             note.type === 'file' ? 'attach_file' :
                             note.type === 'deadline' ? 'warning' : 'chat_bubble_outline'}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-text-main-light dark:text-white mb-0.5">{note.title}</p>
                          <p className="text-xs text-text-sub-light dark:text-text-sub-dark line-clamp-2">
                             {note.message as string}
                          </p>
                          <span className="text-[10px] font-medium text-text-sub-light dark:text-text-sub-dark mt-2 block">{note.time}</span>
                        </div>
                        {!note.read && <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 bg-gray-50 dark:bg-background-dark border-t border-border-light dark:border-border-dark text-center">
                  <button className="text-sm font-medium text-text-sub-light dark:text-text-sub-dark hover:text-primary dark:hover:text-primary transition-colors flex items-center justify-center gap-1 group w-full">
                    View all notifications
                    <span className="material-icons-round text-base group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          <button onClick={toggleDarkMode} className="size-9 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-surface-dark text-text-main-light dark:text-white transition-colors">
             <span className="material-symbols-outlined text-[20px]">{isDarkMode ? 'light_mode' : 'dark_mode'}</span>
          </button>

          {user && (
            <div 
              className="size-9 rounded-full bg-cover bg-center border border-border-light dark:border-border-dark cursor-pointer" 
              style={{ backgroundImage: `url("${user.avatar}")` }}
            ></div>
          )}
        </div>
      </div>
    </header>
  );
};
