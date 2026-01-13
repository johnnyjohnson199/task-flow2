import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Task } from '../types';
import { api } from '../services/api';

interface GraphViewProps {
    onTaskClick: (task: Task) => void;
    onNewNode: () => void;
}

// Helper to calculate Bezier curve
const getPath = (x1: number, y1: number, x2: number, y2: number) => {
    return `M ${x1} ${y1} C ${x1 + 50} ${y1}, ${x2 - 50} ${y2}, ${x2} ${y2}`;
};

export const GraphView: React.FC<GraphViewProps> = ({ onTaskClick, onNewNode }) => {
    // State
    const [localTasks, setLocalTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [zoom, setZoom] = useState(100);
    const [pan, setPan] = useState({ x: 0, y: 0 });
    
    // Interaction States
    const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
    const [isPanning, setIsPanning] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 }); 
    const [initialItemPos, setInitialItemPos] = useState({ x: 0, y: 0 }); 

    // Connection States
    const [connectingNodeId, setConnectingNodeId] = useState<string | null>(null);
    const [connectionMousePos, setConnectionMousePos] = useState({ x: 0, y: 0 });

    const containerRef = useRef<HTMLDivElement>(null);

    // Fetch Tasks on Mount
    useEffect(() => {
        const loadTasks = async () => {
            try {
                setIsLoading(true);
                const data = await api.getTasks();
                // Ensure coordinates exist for graph view
                const positionedTasks = data.map((t, i) => ({
                    ...t,
                    x: t.x ?? 100 + (i * 50),
                    y: t.y ?? 100 + (i * 50)
                }));
                setLocalTasks(positionedTasks);
            } catch (err) {
                setError('Failed to load graph data.');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        loadTasks();
    }, []);

    // --- Interaction Handlers (Same as before) ---
    const getStatusColor = (status: string) => {
        switch(status) {
            case 'Done': return 'bg-green-500/10 dark:bg-green-500/20 text-green-700 dark:text-green-400 ring-green-600/20';
            case 'In Progress': return 'bg-blue-500/10 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 ring-blue-700/10';
            case 'Blocked': return 'bg-red-500/10 dark:bg-red-500/20 text-red-700 dark:text-red-400 ring-red-600/10';
            default: return 'bg-gray-500/10 dark:bg-gray-500/20 text-gray-700 dark:text-gray-400 ring-gray-600/10';
        }
    };

    const handleCanvasMouseDown = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget || (e.target as HTMLElement).tagName === 'svg') {
            setIsPanning(true);
            setDragStart({ x: e.clientX, y: e.clientY });
            setInitialItemPos({ x: pan.x, y: pan.y });
        }
    };

    const handleNodeMouseDown = (e: React.MouseEvent, taskId: string, taskX: number, taskY: number) => {
        e.stopPropagation();
        setDraggingNodeId(taskId);
        setDragStart({ x: e.clientX, y: e.clientY });
        setInitialItemPos({ x: taskX, y: taskY });
    };

    const handleConnectorMouseDown = (e: React.MouseEvent, taskId: string) => {
        e.stopPropagation();
        const containerRect = containerRef.current?.getBoundingClientRect();
        if(!containerRect) return;
        const relX = (e.clientX - containerRect.left - pan.x) / (zoom / 100);
        const relY = (e.clientY - containerRect.top - pan.y) / (zoom / 100);
        setConnectingNodeId(taskId);
        setConnectionMousePos({ x: relX, y: relY });
    };

    const handleNodeMouseUp = (e: React.MouseEvent, targetId: string) => {
        if (connectingNodeId && connectingNodeId !== targetId) {
            e.stopPropagation();
            const targetTask = localTasks.find(t => t.id === targetId);
            const alreadyConnected = targetTask?.dependencies?.includes(connectingNodeId);

            if (!alreadyConnected) {
                // Optimistic UI Update
                setLocalTasks(prev => prev.map(t => {
                    if (t.id === targetId) {
                        return { ...t, dependencies: [...(t.dependencies || []), connectingNodeId] };
                    }
                    return t;
                }));
                // In a real app, call api.updateTask here
            }
        }
    };

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        const scale = zoom / 100;
        if (isPanning) {
            const dx = e.clientX - dragStart.x;
            const dy = e.clientY - dragStart.y;
            setPan({ x: initialItemPos.x + dx, y: initialItemPos.y + dy });
        } else if (draggingNodeId) {
            const dx = (e.clientX - dragStart.x) / scale;
            const dy = (e.clientY - dragStart.y) / scale;
            setLocalTasks(prev => prev.map(t => {
                if (t.id === draggingNodeId) {
                    return { ...t, x: initialItemPos.x + dx, y: initialItemPos.y + dy };
                }
                return t;
            }));
        } else if (connectingNodeId && containerRef.current) {
            const containerRect = containerRef.current.getBoundingClientRect();
            const relX = (e.clientX - containerRect.left - pan.x) / scale;
            const relY = (e.clientY - containerRect.top - pan.y) / scale;
            setConnectionMousePos({ x: relX, y: relY });
        }
    }, [isPanning, draggingNodeId, dragStart, initialItemPos, zoom, connectingNodeId, pan]);

    const handleGlobalMouseUp = () => {
        setIsPanning(false);
        setDraggingNodeId(null);
        setConnectingNodeId(null);
    };

    const handleRemoveDependency = (taskId: string, depId: string) => {
        if (window.confirm(`Remove dependency link from ${depId} to ${taskId}?`)) {
            setLocalTasks(prev => prev.map(t => {
                if (t.id === taskId) {
                    return { ...t, dependencies: t.dependencies?.filter(id => id !== depId) };
                }
                return t;
            }));
        }
    };

    if (isLoading) {
        return (
            <main className="flex-1 flex items-center justify-center bg-[#f0f2f5] dark:bg-[#0f172a]">
                <div className="flex flex-col items-center gap-4">
                    <div className="size-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                    <p className="text-text-sub-light dark:text-text-sub-dark font-medium animate-pulse">Loading Graph...</p>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="flex-1 flex items-center justify-center bg-[#f0f2f5] dark:bg-[#0f172a]">
                <div className="text-red-500 font-medium">{error}</div>
            </main>
        );
    }

    return (
        <main 
            className="flex-1 relative bg-[#f0f2f5] dark:bg-[#0f172a] overflow-hidden select-none"
            onMouseMove={handleMouseMove}
            onMouseUp={handleGlobalMouseUp}
            onMouseLeave={handleGlobalMouseUp}
            onMouseDown={handleCanvasMouseDown}
            ref={containerRef}
            style={{ cursor: isPanning ? 'grabbing' : 'default' }}
        >
            <div className="absolute inset-0 pointer-events-none opacity-50" 
                style={{
                    backgroundImage: 'radial-gradient(circle, #3b4754 1px, transparent 1px)',
                    backgroundSize: `${40 * (zoom/100)}px ${40 * (zoom/100)}px`,
                    backgroundPosition: `${pan.x}px ${pan.y}px`
                }}
            ></div>

            <div 
                className="absolute inset-0 origin-top-left will-change-transform"
                style={{
                    transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom / 100})`
                }}
            >
                <svg className="absolute inset-0 overflow-visible pointer-events-none" style={{ width: '100%', height: '100%', pointerEvents: 'none' }}>
                    <defs>
                        <marker id="arrowhead" markerHeight="7" markerWidth="10" orient="auto" refX="10" refY="3.5">
                            <polygon fill="#9ca3af" points="0 0, 10 3.5, 0 7" className="dark:fill-gray-500"></polygon>
                        </marker>
                        <marker id="arrowhead-active" markerHeight="7" markerWidth="10" orient="auto" refX="10" refY="3.5">
                            <polygon fill="#137fec" points="0 0, 10 3.5, 0 7"></polygon>
                        </marker>
                    </defs>

                    {localTasks.map(task => 
                        task.dependencies?.map(depId => {
                            const depTask = localTasks.find(t => t.id === depId);
                            if (!depTask) return null;
                            const startX = (depTask.x || 0) + 320;
                            const startY = (depTask.y || 0) + 60;
                            const endX = (task.x || 0);
                            const endY = (task.y || 0) + 60;

                            return (
                                <g key={`${task.id}-${depId}`} className="pointer-events-auto" onDoubleClick={() => handleRemoveDependency(task.id, depId)}>
                                    <path d={getPath(startX, startY, endX, endY)} fill="none" stroke="transparent" strokeWidth="15" className="cursor-pointer hover:stroke-black/5 dark:hover:stroke-white/5" />
                                    <path d={getPath(startX, startY, endX, endY)} fill="none" markerEnd="url(#arrowhead)" stroke="#9ca3af" strokeWidth="2" className="dark:stroke-gray-600 pointer-events-none" />
                                </g>
                            );
                        })
                    )}

                    {connectingNodeId && (() => {
                        const sourceTask = localTasks.find(t => t.id === connectingNodeId);
                        if (sourceTask) {
                            const startX = (sourceTask.x || 0) + 320;
                            const startY = (sourceTask.y || 0) + 60;
                            return (
                                <path d={getPath(startX, startY, connectionMousePos.x, connectionMousePos.y)} fill="none" markerEnd="url(#arrowhead-active)" stroke="#137fec" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse" />
                            );
                        }
                    })()}
                </svg>

                {localTasks.map((task) => (
                    <div 
                        key={task.id}
                        className={`absolute w-[320px] bg-white dark:bg-surface-dark rounded-lg shadow-xl border z-10 group transition-shadow ${draggingNodeId === task.id ? 'shadow-2xl cursor-grabbing scale-[1.02] ring-2 ring-primary' : 'cursor-grab border-border-light dark:border-border-dark hover:ring-2 hover:ring-primary/50'}`}
                        style={{ top: task.y, left: task.x }}
                        onMouseDown={(e) => handleNodeMouseDown(e, task.id, task.x || 0, task.y || 0)}
                        onMouseUp={(e) => handleNodeMouseUp(e, task.id)}
                        onClick={() => onTaskClick(task)}
                    >
                        <div className="px-4 py-3 border-b border-border-light dark:border-border-dark flex justify-between items-start pointer-events-none">
                            <div>
                                <span className="text-xs font-bold text-text-sub-light dark:text-text-sub-dark block mb-1">{task.id}</span>
                                <h3 className="text-base font-bold text-text-main-light dark:text-white leading-tight">{task.title}</h3>
                            </div>
                            <button className="text-text-sub-dark hover:text-text-main-light dark:hover:text-white pointer-events-auto">
                                <span className="material-symbols-outlined text-[20px]">more_horiz</span>
                            </button>
                        </div>
                        <div className="px-4 py-3 pointer-events-none">
                            <p className="text-sm text-text-sub-light dark:text-text-sub-dark line-clamp-2">{task.description}</p>
                        </div>
                        <div className="px-4 py-2 bg-gray-50 dark:bg-background-dark rounded-b-lg flex items-center justify-between pointer-events-none">
                            <div className="flex items-center gap-2">
                                <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${getStatusColor(task.status)} uppercase`}>{task.status}</span>
                                <span className="text-xs text-text-sub-light dark:text-text-sub-dark flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">flag</span> {task.priority}</span>
                            </div>
                            {task.status === 'Blocked' ? <span className="text-xs text-red-500 font-medium">Due Tomorrow</span> : <span className="text-xs text-text-sub-light dark:text-text-sub-dark">Oct 24</span>}
                        </div>
                        <div className="absolute top-1/2 -left-3 w-6 h-6 flex items-center justify-center cursor-crosshair z-20" onMouseUp={(e) => handleNodeMouseUp(e, task.id)}>
                            <div className="w-3 h-3 bg-white dark:bg-text-sub-dark border-2 border-text-sub-light dark:border-text-sub-dark rounded-full hover:scale-125 hover:border-primary transition-all"></div>
                        </div>
                        <div className="absolute top-1/2 -right-3 w-6 h-6 flex items-center justify-center cursor-crosshair z-20" onMouseDown={(e) => handleConnectorMouseDown(e, task.id)}>
                             <div className="w-3 h-3 bg-white dark:bg-text-sub-dark border-2 border-primary rounded-full hover:scale-125 hover:bg-primary transition-all"></div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-white dark:bg-surface-dark p-1.5 rounded-xl shadow-lg border border-border-light dark:border-border-dark z-50">
                <button onClick={() => setZoom(z => Math.max(50, z - 10))} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-background-dark text-text-sub-light dark:text-text-sub-dark transition-colors tooltip" title="Zoom Out"><span className="material-symbols-outlined text-[20px]">remove</span></button>
                <span className="text-xs font-medium text-text-main-light dark:text-white w-12 text-center">{zoom}%</span>
                <button onClick={() => setZoom(z => Math.min(200, z + 10))} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-background-dark text-text-sub-light dark:text-text-sub-dark transition-colors tooltip" title="Zoom In"><span className="material-symbols-outlined text-[20px]">add</span></button>
                <div className="w-px h-6 bg-border-light dark:bg-border-dark mx-1"></div>
                <button onClick={() => { setZoom(100); setPan({x:0, y:0}); }} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-background-dark text-text-sub-light dark:text-text-sub-dark transition-colors tooltip" title="Reset View"><span className="material-symbols-outlined text-[20px]">fit_screen</span></button>
                <button onClick={onNewNode} className="ml-2 flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-3 py-1.5 rounded-lg text-sm font-bold shadow-md transition-colors"><span className="material-symbols-outlined text-[18px]">add_circle</span> New Node</button>
            </div>
            
            <div className="absolute top-4 right-4 bg-white/80 dark:bg-surface-dark/80 backdrop-blur border border-border-light dark:border-border-dark p-3 rounded-lg text-xs text-text-sub-light dark:text-text-sub-dark pointer-events-none">
                <p className="flex items-center gap-2 mb-1"><span className="material-symbols-outlined text-sm">pan_tool</span> Pan: Drag background</p>
                <p className="flex items-center gap-2 mb-1"><span className="material-symbols-outlined text-sm">drag_indicator</span> Move: Drag nodes</p>
                <p className="flex items-center gap-2 mb-1"><span className="material-symbols-outlined text-sm">link</span> Connect: Drag right-dot to left-dot</p>
                <p className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">link_off</span> Delete: Double-click line</p>
            </div>
        </main>
    );
};
