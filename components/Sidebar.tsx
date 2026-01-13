import React from 'react';

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 flex flex-col border-r border-border-light dark:border-border-dark bg-white dark:bg-background-dark z-10 shrink-0 overflow-y-auto hidden md:flex">
      <div className="p-4 flex flex-col gap-6">
        {/* Projects */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-text-sub-light dark:text-text-sub-dark">Projects</h3>
            <button className="text-text-sub-light dark:text-text-sub-dark hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[18px]">add</span>
            </button>
          </div>
          <div className="flex flex-col gap-1">
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 text-primary font-medium text-sm">
              <span className="material-symbols-outlined text-[20px] fill-1">folder_open</span>
              Marketing Launch
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-surface-dark text-text-main-light dark:text-text-sub-dark transition-colors text-sm">
              <span className="material-symbols-outlined text-[20px]">folder</span>
              Q3 Dev Sprint
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-surface-dark text-text-main-light dark:text-text-sub-dark transition-colors text-sm">
              <span className="material-symbols-outlined text-[20px]">folder</span>
              Website Redesign
            </a>
          </div>
        </div>

        {/* Group By (Timeline View context) */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-text-sub-light dark:text-text-sub-dark mb-3">Group By</h3>
          <div className="flex flex-col gap-2">
            <button className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-surface-dark text-sm font-medium text-text-main-light dark:text-text-sub-dark">
              <span>Category</span>
            </button>
            <button className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-surface-dark text-sm font-medium text-text-main-light dark:text-text-sub-dark">
              <span>Status</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3 border-t border-border-light dark:border-border-dark pt-6">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-text-sub-light dark:text-text-sub-dark mb-1">Filters</h3>
          <details className="group" open>
            <summary className="flex cursor-pointer items-center justify-between py-1 list-none">
              <span className="text-sm font-medium text-text-main-light dark:text-white">Status</span>
              <span className="material-symbols-outlined text-[18px] text-text-sub-light transition-transform group-open:rotate-180">expand_more</span>
            </summary>
            <div className="pt-2 flex flex-col gap-2 pl-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-gray-300 dark:border-border-dark text-primary focus:ring-primary bg-transparent size-4" />
                <span className="text-sm text-text-main-light dark:text-text-sub-dark">In Progress</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-gray-300 dark:border-border-dark text-primary focus:ring-primary bg-transparent size-4" />
                <span className="text-sm text-text-main-light dark:text-text-sub-dark">Blocked</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300 dark:border-border-dark text-primary focus:ring-primary bg-transparent size-4" />
                <span className="text-sm text-text-main-light dark:text-text-sub-dark">Done</span>
              </label>
            </div>
          </details>
          
          <div className="mt-4 pt-4 border-t border-border-light dark:border-border-dark">
            <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-gray-300 dark:border-border-dark text-primary focus:ring-primary bg-transparent size-4" />
                <span className="text-sm text-text-main-light dark:text-text-sub-dark">Critical Path</span>
            </label>
          </div>
        </div>

        {/* Unplaced Tasks */}
        <div className="p-3 bg-gray-50 dark:bg-surface-dark rounded-lg border border-border-light dark:border-border-dark mt-auto">
          <h4 className="text-xs font-bold text-text-main-light dark:text-white mb-2">Unplaced Tasks</h4>
          <div className="bg-white dark:bg-background-dark p-2 rounded border border-border-light dark:border-border-dark shadow-sm mb-2 cursor-grab active:cursor-grabbing hover:border-primary/50 transition-colors">
            <p className="text-xs font-medium text-text-main-light dark:text-white">Email Integration</p>
          </div>
          <div className="bg-white dark:bg-background-dark p-2 rounded border border-border-light dark:border-border-dark shadow-sm cursor-grab active:cursor-grabbing hover:border-primary/50 transition-colors">
            <p className="text-xs font-medium text-text-main-light dark:text-white">Analytics Dashboard</p>
          </div>
          <button className="w-full mt-3 text-xs text-primary font-medium hover:underline flex items-center justify-center gap-1">
            <span className="material-symbols-outlined text-[14px]">add</span> Create New
          </button>
        </div>
      </div>
    </aside>
  );
};
