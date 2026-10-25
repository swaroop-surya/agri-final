import React, { useState } from 'react';
import { X, CheckCircle2, ClipboardList, Calendar, Flag, User } from 'lucide-react';
import { FieldTask, Plot } from '../../types/agriculture';

interface NewTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  plots: Plot[];
  onAddTask: (task: FieldTask) => void;
}

export const NewTaskModal: React.FC<NewTaskModalProps> = ({
  isOpen,
  onClose,
  plots,
  onAddTask,
}) => {
  const [title, setTitle] = useState('');
  const [plotName, setPlotName] = useState(plots[0]?.name || 'Plot #14 - North Valley');
  const [category, setCategory] = useState<FieldTask['category']>('Fertilization');
  const [priority, setPriority] = useState<FieldTask['priority']>('High');
  const [dueDate, setDueDate] = useState('2026-10-27');
  const [assignee, setAssignee] = useState('Marcus Henderson');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask: FieldTask = {
      id: `task-${Date.now()}`,
      title: title.trim(),
      plotName,
      category,
      priority,
      dueDate,
      assignee,
      completed: false,
    };

    onAddTask(newTask);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-lg border border-[#cbd5c5] shadow-2xl max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="bg-[#143823] text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded bg-[#2d6a4f]">
              <ClipboardList className="w-5 h-5 text-[#d8f3dc]" />
            </div>
            <div>
              <h3 className="text-base font-semibold">Schedule Agronomic Task</h3>
              <p className="text-xs text-[#a7c5b2]">Farm Work Order & Scouting Log</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-[#a7c5b2] hover:text-white hover:bg-[#1b4332]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit}>
          <div className="p-5 space-y-3.5 text-xs text-[#2b3a2f]">
            <div>
              <label className="block font-semibold uppercase text-[10px] text-[#5f7464] tracking-wider mb-1">
                Task Title / Directive
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Post-emergence herbicide spray on ridge border"
                className="w-full px-3 py-2 bg-[#f8f9f6] border border-[#d1d8cc] rounded-md text-xs font-medium text-[#143823] focus:outline-none focus:ring-1 focus:ring-[#2d6a4f]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold uppercase text-[10px] text-[#5f7464] tracking-wider mb-1">
                  Target Field / Plot
                </label>
                <select
                  value={plotName}
                  onChange={(e) => setPlotName(e.target.value)}
                  className="w-full px-2.5 py-2 bg-[#f8f9f6] border border-[#d1d8cc] rounded-md text-xs font-medium text-[#143823] focus:outline-none focus:ring-1 focus:ring-[#2d6a4f]"
                >
                  {plots.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold uppercase text-[10px] text-[#5f7464] tracking-wider mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-2.5 py-2 bg-[#f8f9f6] border border-[#d1d8cc] rounded-md text-xs font-medium text-[#143823] focus:outline-none focus:ring-1 focus:ring-[#2d6a4f]"
                >
                  <option value="Fertilization">Fertilization</option>
                  <option value="Irrigation">Irrigation</option>
                  <option value="Scouting">Scouting</option>
                  <option value="Spraying">Spraying</option>
                  <option value="Equipment">Equipment</option>
                  <option value="Harvest">Harvest</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold uppercase text-[10px] text-[#5f7464] tracking-wider mb-1">
                  Priority Level
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as any)}
                  className="w-full px-2.5 py-2 bg-[#f8f9f6] border border-[#d1d8cc] rounded-md text-xs font-medium text-[#143823] focus:outline-none focus:ring-1 focus:ring-[#2d6a4f]"
                >
                  <option value="High">High Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="Low">Low Priority</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold uppercase text-[10px] text-[#5f7464] tracking-wider mb-1">
                  Due Date
                </label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-2.5 py-2 bg-[#f8f9f6] border border-[#d1d8cc] rounded-md text-xs font-medium text-[#143823] focus:outline-none focus:ring-1 focus:ring-[#2d6a4f]"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold uppercase text-[10px] text-[#5f7464] tracking-wider mb-1">
                Assignee / Operator
              </label>
              <input
                type="text"
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                className="w-full px-3 py-2 bg-[#f8f9f6] border border-[#d1d8cc] rounded-md text-xs font-medium text-[#143823] focus:outline-none focus:ring-1 focus:ring-[#2d6a4f]"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="px-5 py-3.5 bg-[#f6f7f4] border-t border-[#e1e6dc] flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-md text-xs font-medium text-[#5f7464] hover:text-[#143823]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-md bg-[#2d6a4f] hover:bg-[#1b4332] text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Create Task</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
