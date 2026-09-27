import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  ChevronDown, 
  ChevronUp, 
  Award, 
  BookOpen, 
  FileText, 
  ExternalLink,
  Code,
  Zap,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { LabTask } from '../types/androidLab';
import { LAB_TASKS_DATA, COMPARISON_ANALYSIS, REFLECTION_ANSWERS } from '../data/labData';

interface LabGuideProps {
  onOpenReportModal: () => void;
  onOpenRecyclingModal: () => void;
}

export const LabGuide: React.FC<LabGuideProps> = ({ 
  onOpenReportModal,
  onOpenRecyclingModal
}) => {
  const [tasks, setTasks] = useState<LabTask[]>(LAB_TASKS_DATA);
  const [expandedTaskId, setExpandedTaskId] = useState<number | null>(1);

  const toggleTaskCompletion = (id: number) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col h-[740px]">
      
      {/* Header & Lab Progress Tracker */}
      <div className="bg-slate-950 p-4 border-b border-slate-800 shrink-0">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                120-Minute Plan
              </span>
              <span className="text-xs text-slate-400">Total Marks: 20</span>
            </div>
            <h2 className="text-base font-bold text-white mt-1">
              Week 3 Lab Tasks & Assessment Guide
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenRecyclingModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/40 text-purple-200 text-xs font-semibold transition"
            >
              <Zap size={14} className="text-purple-400" />
              <span>How Recycling Works</span>
            </button>

            <button
              onClick={onOpenReportModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition shadow-sm"
            >
              <FileText size={14} />
              <span>Lab Report & Submission</span>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-3">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-400">Lab Deliverables Progress</span>
            <span className="text-emerald-400 font-bold font-mono">{completedCount} of {tasks.length} Complete ({progressPercent}%)</span>
          </div>
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Task List Accordion */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {tasks.map((task) => {
          const isExpanded = expandedTaskId === task.id;

          return (
            <div 
              key={task.id}
              className={`rounded-xl border transition overflow-hidden ${
                task.completed 
                  ? 'bg-slate-900/90 border-slate-800' 
                  : 'bg-slate-950 border-slate-800/80'
              }`}
            >
              {/* Task Header Row */}
              <div 
                className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-slate-800/50 transition"
                onClick={() => setExpandedTaskId(isExpanded ? null : task.id)}
              >
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTaskCompletion(task.id);
                    }}
                    className="text-slate-400 hover:text-emerald-400 transition"
                  >
                    {task.completed ? (
                      <CheckCircle2 size={19} className="text-emerald-400" />
                    ) : (
                      <Circle size={19} className="text-slate-600" />
                    )}
                  </button>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-indigo-400">
                        Task {task.id} ({task.timeMinutes} min)
                      </span>
                      <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.2 rounded font-mono">
                        {task.keyConcept}
                      </span>
                    </div>
                    <h3 className={`text-sm font-semibold mt-0.5 ${task.completed ? 'text-slate-200' : 'text-white'}`}>
                      {task.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 hidden sm:inline-block">
                    {task.completed ? 'Completed' : 'Pending'}
                  </span>
                  {isExpanded ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
                </div>
              </div>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-1 border-t border-slate-800/60 space-y-3 text-xs bg-slate-950/40">
                  <div>
                    <span className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider block mb-1">
                      Objective
                    </span>
                    <p className="text-slate-300 leading-relaxed bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                      {task.objective}
                    </p>
                  </div>

                  <div>
                    <span className="text-indigo-400 font-semibold uppercase text-[10px] tracking-wider block mb-1">
                      Implementation Details & Deliverable
                    </span>
                    <ul className="space-y-1.5 pl-2">
                      {task.details.map((detail, idx) => (
                        <li key={idx} className="text-slate-300 flex items-start gap-2">
                          <span className="text-indigo-400 font-bold">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-emerald-950/30 border border-emerald-800/40 p-2.5 rounded-lg text-emerald-200 flex items-start gap-2">
                    <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-emerald-300">Deliverable Required for Submission: </span>
                      <span className="text-emerald-200/90">{task.deliverable}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Assessment Guide (20 Marks Table) */}
        <div className="mt-6 bg-slate-950 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Award size={18} className="text-amber-400" />
            <h3 className="text-sm font-bold text-white">Lab Assessment Rubric (20 Marks Total)</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="py-2 pr-4 font-semibold">Criterion</th>
                  <th className="py-2 px-4 font-semibold">Requirement</th>
                  <th className="py-2 pl-4 font-semibold text-right">Marks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr>
                  <td className="py-2.5 pr-4 font-medium text-white">Product model + data</td>
                  <td className="py-2.5 px-4 text-slate-400">Encapsulated Product.java with getters, at least 8 local items</td>
                  <td className="py-2.5 pl-4 text-right font-mono font-bold text-emerald-400">3</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-medium text-white">ListView implementation</td>
                  <td className="py-2.5 px-4 text-slate-400">Simple list using ArrayAdapter&lt;String&gt; with scroll and item click</td>
                  <td className="py-2.5 pl-4 text-right font-mono font-bold text-emerald-400">3</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-medium text-white">RecyclerView Adapter/ViewHolder</td>
                  <td className="py-2.5 px-4 text-slate-400">ProductAdapter.java with ViewHolder, onCreate, onBind, getItemCount</td>
                  <td className="py-2.5 pl-4 text-right font-mono font-bold text-emerald-400">6</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-medium text-white">UI + images + responsiveness</td>
                  <td className="py-2.5 px-4 text-slate-400">item_product.xml with dp/sp units, ImageView, text formatting, card elevation</td>
                  <td className="py-2.5 pl-4 text-right font-mono font-bold text-emerald-400">3</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-medium text-white">Click handling</td>
                  <td className="py-2.5 px-4 text-slate-400">Clean callback mechanism showing Toast with accurate tapped item details</td>
                  <td className="py-2.5 pl-4 text-right font-mono font-bold text-emerald-400">2</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-medium text-white">Testing, comparison &amp; explanation</td>
                  <td className="py-2.5 px-4 text-slate-400">Task 1 tool explanations, Task 8 comparison, and 3 reflection answers</td>
                  <td className="py-2.5 pl-4 text-right font-mono font-bold text-emerald-400">3</td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-slate-700 text-white font-bold">
                  <td className="py-2.5 pr-4">Total Score</td>
                  <td className="py-2.5 px-4 text-slate-400">All deliverables verified</td>
                  <td className="py-2.5 pl-4 text-right font-mono text-emerald-400 text-sm">20 / 20</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
