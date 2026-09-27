import React, { useState } from 'react';
import { 
  X, 
  RotateCw, 
  ArrowDown, 
  Layers, 
  Zap, 
  CheckCircle2, 
  HelpCircle,
  HardDrive,
  Cpu
} from 'lucide-react';

interface RecyclingExplainerModalProps {
  onClose: () => void;
}

export const RecyclingExplainerModal: React.FC<RecyclingExplainerModalProps> = ({ onClose }) => {
  const [scrollStep, setScrollStep] = useState<number>(0);

  const steps = [
    {
      title: 'Initial State: ViewHolders Loaded on Screen',
      desc: 'The RecyclerView inflates only enough ViewHolders to fill the visible screen height plus 1-2 off-screen buffers (e.g., 5-6 ViewHolders).',
      activeTop: 'Item 0 (Pixel 9 Pro Max)',
      scrapPool: 'Pool Empty (All views active)',
      enteringBottom: 'Item 5 (Waiting below screen)',
      highlight: 'none'
    },
    {
      title: 'Step 1: User Scrolls Downward',
      desc: 'Item 0 moves upward past the top edge of the screen and is detached from the viewport.',
      activeTop: 'Item 0 exiting top...',
      scrapPool: 'Item 0 ViewHolder moving to Scrap Pool',
      enteringBottom: 'Item 5 approaching viewport',
      highlight: 'scrap'
    },
    {
      title: 'Step 2: Scrapped ViewHolder Enters RecycledViewPool',
      desc: 'Instead of destroying the view object and triggering Java Garbage Collection, the entire ViewHolder (including cached ImageView and TextView references) is kept in memory.',
      activeTop: 'Item 1 now at top',
      scrapPool: 'RecycledViewPool holds: [VH #0 (Cached CardView)]',
      enteringBottom: 'Item 5 enters bottom edge',
      highlight: 'pool'
    },
    {
      title: 'Step 3: ViewHolder Reused Without Inflation!',
      desc: 'RecyclerView checks the RecycledViewPool, retrieves VH #0, skips LayoutInflater.inflate() and skips findViewById(). It only calls onBindViewHolder(VH #0, 5) to bind Item 5 data!',
      activeTop: 'Item 1 (Sony WH-1000XM5)',
      scrapPool: 'Pool empty (VH #0 reassigned to Item 5)',
      enteringBottom: 'Item 5 bound to VH #0!',
      highlight: 'bind'
    }
  ];

  const current = steps[scrollStep];

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl text-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30">
              <Zap size={20} />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">How RecyclerView View Recycling Works</h2>
              <p className="text-xs text-slate-400">Core architectural concept for Week 3 Lab Reflection Q2</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
          
          {/* Interactive Stepper */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold text-purple-400 font-mono uppercase tracking-wider">
                Interactive Recycling Simulation ({scrollStep + 1} of {steps.length})
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setScrollStep(prev => Math.max(0, prev - 1))}
                  disabled={scrollStep === 0}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-white font-mono text-xs transition"
                >
                  Prev
                </button>
                <button
                  onClick={() => setScrollStep(prev => (prev + 1) % steps.length)}
                  className="px-3 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition flex items-center gap-1"
                >
                  <span>{scrollStep === steps.length - 1 ? 'Restart' : 'Next Step'}</span>
                  <ArrowDown size={13} />
                </button>
              </div>
            </div>

            <h3 className="text-sm font-bold text-white mb-1">{current.title}</h3>
            <p className="text-slate-300 leading-relaxed text-xs">{current.desc}</p>

            {/* Visual Architecture Diagram */}
            <div className="mt-4 grid grid-cols-3 gap-2 text-center font-mono">
              {/* Top detached view */}
              <div className={`p-3 rounded-xl border transition ${
                current.highlight === 'scrap' 
                  ? 'bg-amber-950/40 border-amber-500 text-amber-300' 
                  : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}>
                <span className="text-[10px] block opacity-70 mb-1">Top of Viewport</span>
                <span className="font-bold text-[11px]">{current.activeTop}</span>
              </div>

              {/* Scrapped Pool */}
              <div className={`p-3 rounded-xl border transition ${
                current.highlight === 'pool' 
                  ? 'bg-purple-950/60 border-purple-500 text-purple-200 shadow-md' 
                  : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}>
                <span className="text-[10px] block opacity-70 mb-1">RecycledViewPool</span>
                <span className="font-bold text-[11px]">{current.scrapPool}</span>
              </div>

              {/* Entering bottom view */}
              <div className={`p-3 rounded-xl border transition ${
                current.highlight === 'bind' 
                  ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300' 
                  : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}>
                <span className="text-[10px] block opacity-70 mb-1">Bottom of Viewport</span>
                <span className="font-bold text-[11px]">{current.enteringBottom}</span>
              </div>
            </div>
          </div>

          {/* Why it Matters: Performance Comparison */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-rose-950/20 border border-rose-900/40 rounded-xl p-3.5">
              <h4 className="font-bold text-rose-300 text-xs flex items-center gap-1.5 mb-1.5">
                <Cpu size={14} className="text-rose-400" />
                <span>Without Recycling (Naive List)</span>
              </h4>
              <p className="text-rose-200/80 leading-relaxed text-[11px]">
                Every single item scrolled calls <code className="bg-rose-900/40 px-1 rounded text-white">LayoutInflater.inflate()</code> to parse XML into memory and runs multiple <code className="bg-rose-900/40 px-1 rounded text-white">findViewById()</code> DOM-tree lookups. Scrolling 100 items creates 100 view objects, forcing constant Garbage Collection pauses and dropped frames.
              </p>
            </div>

            <div className="bg-emerald-950/20 border border-emerald-900/40 rounded-xl p-3.5">
              <h4 className="font-bold text-emerald-300 text-xs flex items-center gap-1.5 mb-1.5">
                <Zap size={14} className="text-emerald-400" />
                <span>With RecyclerView (ViewHolder Pool)</span>
              </h4>
              <p className="text-emerald-200/80 leading-relaxed text-[11px]">
                Only 6 to 8 ViewHolders are ever created. When scrolling 1,000 items, <strong>zero new views are inflated</strong>. The existing ViewHolders simply have their text and image references updated via <code className="bg-emerald-900/40 px-1 rounded text-white">onBindViewHolder()</code>, guaranteeing smooth 60/120 FPS scrolling.
              </p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-950 px-6 py-3 border-t border-slate-800 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition"
          >
            Close Explainer
          </button>
        </div>

      </div>
    </div>
  );
};
