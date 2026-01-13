import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { GraphView } from './components/GraphView';
import { ListView } from './components/ListView';
import { TimelineView } from './components/TimelineView';
import { CreateTaskModal, TaskDetailModal, CreateProjectModal, ShareProjectModal } from './components/Modals';
import { ViewType, Task } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('graph');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeModal, setActiveModal] = useState<null | 'create-task' | 'create-project' | 'share'>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const renderView = () => {
    switch (currentView) {
      case 'graph':
        return <GraphView onTaskClick={setSelectedTask} onNewNode={() => setActiveModal('create-task')} />;
      case 'list':
        return <ListView onTaskClick={setSelectedTask} onNewTask={() => setActiveModal('create-task')} />;
      case 'timeline':
        return <TimelineView />;
      default:
        return <GraphView onTaskClick={setSelectedTask} onNewNode={() => setActiveModal('create-task')} />;
    }
  };

  return (
    <div className="flex h-screen bg-background-light dark:bg-background-dark text-text-main-light dark:text-white font-sans overflow-hidden">
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <TopBar 
          currentView={currentView} 
          onViewChange={setCurrentView} 
          toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          isDarkMode={isDarkMode}
          onOpenShare={() => setActiveModal('share')}
        />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          {renderView()}
        </div>
      </div>

      {/* Modals */}
      {activeModal === 'create-task' && <CreateTaskModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'create-project' && <CreateProjectModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'share' && <ShareProjectModal onClose={() => setActiveModal(null)} />}
      
      {selectedTask && (
        <TaskDetailModal 
          task={selectedTask} 
          onClose={() => setSelectedTask(null)} 
        />
      )}
    </div>
  );
};

export default App;
