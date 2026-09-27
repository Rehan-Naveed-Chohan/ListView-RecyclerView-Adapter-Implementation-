import React from 'react';
import { 
  GitCompare, 
  CheckCircle, 
  XCircle, 
  Sparkles, 
  ArrowRight, 
  Grid, 
  Plus, 
  Tag, 
  Layers,
  Copy,
  Check
} from 'lucide-react';
import { COMPARISON_ANALYSIS } from '../data/labData';

interface ComparisonViewProps {
  onSelectChallenge: (challengeIndex: number) => void;
}

export const ComparisonView: React.FC<ComparisonViewProps> = ({ onSelectChallenge }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopySummary = () => {
    navigator.clipboard.writeText(COMPARISON_ANALYSIS.summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col h-[740px]">
      
      {/* Header */}
      <div className="bg-slate-950 p-4 border-b border-slate-800 shrink-0 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-mono font-bold uppercase tracking-wider">
              Task 8 Deliverable
            </span>
            <span className="text-xs text-slate-400">Architectural Analysis</span>
          </div>
          <h2 className="text-base font-bold text-white mt-1">
            ListView vs. RecyclerView: In-Depth Comparison
          </h2>
        </div>

        <button
          onClick={handleCopySummary}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition"
        >
          {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
          <span>{copied ? 'Copied Summary' : 'Copy 4-Line Synthesis'}</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-5 text-xs">
        
        {/* Part A: 4-6 Lines Synthesis (Required Submission) */}
        <div className="bg-slate-950 border border-indigo-900/40 rounded-xl p-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-500"></div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2">
            Part A: Student Analysis (Written Submission Text)
          </h3>
          <p className="text-slate-300 leading-relaxed whitespace-pre-line font-sans text-xs bg-slate-900/60 p-3 rounded-lg border border-slate-800">
            {COMPARISON_ANALYSIS.summary}
          </p>
        </div>

        {/* Comparison Matrix Table */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden">
          <div className="p-3 bg-slate-900 border-b border-slate-800 flex items-center gap-2">
            <GitCompare size={15} className="text-indigo-400" />
            <h4 className="font-bold text-white text-xs">Feature-by-Feature Matrix</h4>
          </div>

          <div className="divide-y divide-slate-800/80">
            {COMPARISON_ANALYSIS.bulletPoints.map((item, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-3 p-3 text-xs gap-2">
                <div className="font-bold text-slate-200 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                  <span>{item.feature}</span>
                </div>
                
                <div className="bg-amber-950/20 border border-amber-900/30 p-2 rounded text-amber-200/90">
                  <span className="text-[10px] uppercase font-bold text-amber-400 block mb-0.5">ListView</span>
                  <span>{item.listView}</span>
                </div>

                <div className="bg-emerald-950/20 border border-emerald-900/30 p-2 rounded text-emerald-200/90">
                  <span className="text-[10px] uppercase font-bold text-emerald-400 block mb-0.5">RecyclerView</span>
                  <span>{item.recyclerView}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Part B: Open Challenges Showcase */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-bold text-white text-xs flex items-center gap-1.5">
              <Sparkles size={15} className="text-amber-400" />
              <span>Part B: Open Challenges (All 4 Ready &amp; Demonstrated)</span>
            </h4>
            <span className="text-[11px] text-slate-400">Task 8 requires completing at least ONE challenge</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Challenge 1 */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-indigo-400 font-bold font-mono text-[11px]">Challenge 1</span>
                  <span className="text-[10px] bg-emerald-950 text-emerald-300 px-1.5 py-0.5 rounded font-mono">Implemented</span>
                </div>
                <h5 className="font-bold text-white mb-1">2-Column GridLayoutManager</h5>
                <p className="text-slate-400 text-[11px]">
                  Configured <code className="text-indigo-300 font-mono">new GridLayoutManager(this, 2)</code> with responsive card span sizing.
                </p>
              </div>
              <button
                onClick={() => onSelectChallenge(1)}
                className="mt-3 flex items-center justify-center gap-1.5 py-1.5 bg-slate-800 hover:bg-indigo-600 text-white rounded-lg transition text-[11px] font-semibold"
              >
                <Grid size={13} />
                <span>Test in Phone Emulator</span>
              </button>
            </div>

            {/* Challenge 2 */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-indigo-400 font-bold font-mono text-[11px]">Challenge 2</span>
                  <span className="text-[10px] bg-emerald-950 text-emerald-300 px-1.5 py-0.5 rounded font-mono">Implemented</span>
                </div>
                <h5 className="font-bold text-white mb-1">Category Field &amp; Badge Badging</h5>
                <p className="text-slate-400 text-[11px]">
                  Extended Product model with <code className="text-indigo-300 font-mono">category</code> string and styled badge pills + filter bar.
                </p>
              </div>
              <button
                onClick={() => onSelectChallenge(2)}
                className="mt-3 flex items-center justify-center gap-1.5 py-1.5 bg-slate-800 hover:bg-indigo-600 text-white rounded-lg transition text-[11px] font-semibold"
              >
                <Tag size={13} />
                <span>Test Categories</span>
              </button>
            </div>

            {/* Challenge 3 */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-indigo-400 font-bold font-mono text-[11px]">Challenge 3</span>
                  <span className="text-[10px] bg-emerald-950 text-emerald-300 px-1.5 py-0.5 rounded font-mono">Implemented</span>
                </div>
                <h5 className="font-bold text-white mb-1">Append Product &amp; notifyItemInserted</h5>
                <p className="text-slate-400 text-[11px]">
                  Floating Action Button opens product insertion form and fires <code className="text-indigo-300 font-mono">notifyItemInserted(position)</code>.
                </p>
              </div>
              <button
                onClick={() => onSelectChallenge(3)}
                className="mt-3 flex items-center justify-center gap-1.5 py-1.5 bg-slate-800 hover:bg-indigo-600 text-white rounded-lg transition text-[11px] font-semibold"
              >
                <Plus size={13} />
                <span>Add Product</span>
              </button>
            </div>

            {/* Challenge 4 */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-indigo-400 font-bold font-mono text-[11px]">Challenge 4</span>
                  <span className="text-[10px] bg-emerald-950 text-emerald-300 px-1.5 py-0.5 rounded font-mono">Implemented</span>
                </div>
                <h5 className="font-bold text-white mb-1">Polished Material Card &amp; Elevation</h5>
                <p className="text-slate-400 text-[11px]">
                  Designed MaterialCardView with 12dp corner radius, 3dp elevation, and touch feedback ripple.
                </p>
              </div>
              <button
                onClick={() => onSelectChallenge(4)}
                className="mt-3 flex items-center justify-center gap-1.5 py-1.5 bg-slate-800 hover:bg-indigo-600 text-white rounded-lg transition text-[11px] font-semibold"
              >
                <Layers size={13} />
                <span>Inspect Card UI</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
