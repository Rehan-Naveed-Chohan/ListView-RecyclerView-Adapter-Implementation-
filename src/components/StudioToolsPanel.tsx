import React, { useState } from 'react';
import { 
  Terminal, 
  Bug, 
  Layers, 
  Activity, 
  Trash2, 
  Filter, 
  Send, 
  Copy, 
  Check, 
  Play, 
  Pause,
  AlertCircle,
  HelpCircle,
  Cpu,
  HardDrive
} from 'lucide-react';
import { LogEntry, ActiveToolTab } from '../types/androidLab';

interface StudioToolsPanelProps {
  logs: LogEntry[];
  onClearLogs: () => void;
  onAddLog: (log: Omit<LogEntry, 'id' | 'timestamp'>) => void;
}

export const StudioToolsPanel: React.FC<StudioToolsPanelProps> = ({
  logs,
  onClearLogs,
  onAddLog
}) => {
  const [activeTab, setActiveTab] = useState<ActiveToolTab>('logcat');
  const [logFilter, setLogFilter] = useState<string>('');
  const [levelFilter, setLevelFilter] = useState<string>('ALL');
  const [customLogMsg, setCustomLogMsg] = useState<string>('Task 1 verified: Logcat output received in MainActivity!');
  const [copied, setCopied] = useState<boolean>(false);

  // Debugger simulation state
  const [debuggerPaused, setDebuggerPaused] = useState<boolean>(false);
  const [currentBreakpoint, setCurrentBreakpoint] = useState<string>('onBindViewHolder');

  const filteredLogs = logs.filter(entry => {
    const matchesLevel = levelFilter === 'ALL' || entry.level === levelFilter;
    const matchesSearch = logFilter === '' || 
      entry.tag.toLowerCase().includes(logFilter.toLowerCase()) || 
      entry.message.toLowerCase().includes(logFilter.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  const handleSendCustomLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customLogMsg.trim()) return;
    onAddLog({
      level: 'D',
      tag: 'MainActivity',
      message: customLogMsg
    });
  };

  const copyLogsToClipboard = () => {
    const text = filteredLogs.map(l => `[${l.timestamp}] ${l.level}/${l.tag}: ${l.message}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl flex flex-col h-[740px] overflow-hidden shadow-xl text-slate-200">
      
      {/* Studio Header & Tool Switcher */}
      <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
          <span className="font-mono text-xs font-bold text-slate-300">Android Studio Iguana | Hedgehog</span>
        </div>

        {/* Studio Tool Tabs */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('logcat')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition font-medium ${
              activeTab === 'logcat' 
                ? 'bg-indigo-600 text-white font-bold shadow-xs' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Terminal size={14} />
            <span>Logcat</span>
            <span className="text-[10px] px-1.5 py-0.2 bg-slate-800 text-slate-300 rounded-full font-mono">{logs.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('debugger')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition font-medium ${
              activeTab === 'debugger' 
                ? 'bg-indigo-600 text-white font-bold shadow-xs' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Bug size={14} />
            <span>Debugger</span>
          </button>

          <button
            onClick={() => setActiveTab('inspector')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition font-medium ${
              activeTab === 'inspector' 
                ? 'bg-indigo-600 text-white font-bold shadow-xs' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Layers size={14} />
            <span>Layout Inspector</span>
          </button>

          <button
            onClick={() => setActiveTab('profiler')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition font-medium ${
              activeTab === 'profiler' 
                ? 'bg-indigo-600 text-white font-bold shadow-xs' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Activity size={14} />
            <span>Profiler</span>
          </button>
        </div>
      </div>

      {/* TAB 1: LOGCAT */}
      {activeTab === 'logcat' && (
        <div className="flex-1 flex flex-col min-h-0 bg-slate-950/60 font-mono text-xs">
          
          {/* Logcat Control Bar */}
          <div className="p-3 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 shrink-0">
            <div className="flex items-center gap-2 flex-1 min-w-[200px]">
              {/* Level Filter */}
              <select
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value)}
                className="bg-slate-950 border border-slate-700 text-slate-200 text-xs px-2.5 py-1.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
              >
                <option value="ALL">All Levels</option>
                <option value="V">V - Verbose</option>
                <option value="D">D - Debug</option>
                <option value="I">I - Info</option>
                <option value="W">W - Warning</option>
                <option value="E">E - Error</option>
              </select>

              {/* Search filter */}
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Filter by tag or message (e.g. MainActivity, ViewHolder)..."
                  value={logFilter}
                  onChange={(e) => setLogFilter(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 text-xs pl-3 pr-8 py-1.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 font-sans"
                />
                {logFilter && (
                  <button 
                    onClick={() => setLogFilter('')} 
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={copyLogsToClipboard}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition"
                title="Copy displayed logs for lab submission"
              >
                {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>

              <button
                onClick={onClearLogs}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/50 text-slate-400 hover:text-rose-300 text-xs transition"
                title="Clear Logcat"
              >
                <Trash2 size={13} />
                <span>Clear</span>
              </button>
            </div>
          </div>

          {/* Logcat Output Area */}
          <div className="flex-1 overflow-y-auto p-3 space-y-1 selection:bg-indigo-900 selection:text-white">
            {filteredLogs.length === 0 ? (
              <div className="h-full flex items-center justify-center text-slate-500 font-sans text-xs">
                No Logcat messages matching current filter.
              </div>
            ) : (
              filteredLogs.map(entry => {
                let badgeClass = 'text-blue-400';
                if (entry.level === 'D') badgeClass = 'text-emerald-400 font-bold';
                if (entry.level === 'I') badgeClass = 'text-cyan-400';
                if (entry.level === 'W') badgeClass = 'text-amber-400 font-bold';
                if (entry.level === 'E') badgeClass = 'text-rose-400 font-bold';

                return (
                  <div key={entry.id} className="leading-relaxed hover:bg-slate-900/70 px-2 py-0.5 rounded transition flex items-start gap-2">
                    <span className="text-slate-500 shrink-0 select-none text-[11px]">{entry.timestamp}</span>
                    <span className={`shrink-0 text-[11px] ${badgeClass}`}>{entry.level}/{entry.tag}:</span>
                    <span className="text-slate-200 break-all text-[11px]">{entry.message}</span>
                  </div>
                );
              })
            )}
          </div>

          {/* Task 1 Deliverable Helper: Send Logcat Entry */}
          <div className="p-3 bg-slate-900 border-t border-slate-800 shrink-0">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-sans text-indigo-300 font-semibold flex items-center gap-1">
                <Check size={12} className="text-emerald-400" />
                Task 1 Requirement: Logcat Demonstration from MainActivity
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Log.d(TAG, message);</span>
            </div>

            <form onSubmit={handleSendCustomLog} className="flex gap-2">
              <input
                type="text"
                value={customLogMsg}
                onChange={(e) => setCustomLogMsg(e.target.value)}
                placeholder="Log message from student code..."
                className="flex-1 bg-slate-950 border border-slate-700 px-3 py-1.5 text-xs text-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 font-sans"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg text-xs flex items-center gap-1 font-sans transition shrink-0"
              >
                <Send size={13} />
                <span>Log to Logcat</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* TAB 2: DEBUGGER & BREAKPOINTS */}
      {activeTab === 'debugger' && (
        <div className="flex-1 flex flex-col min-h-0 bg-slate-950/70 p-4 overflow-y-auto space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Bug size={16} className="text-rose-400" />
                Task 1: Breakpoints & Variable Inspection
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Simulates pausing execution inside <code className="text-indigo-300 font-mono">onBindViewHolder()</code> to inspect view binding variables.
              </p>
            </div>

            <button
              onClick={() => setDebuggerPaused(!debuggerPaused)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                debuggerPaused 
                  ? 'bg-amber-600 text-white shadow-sm' 
                  : 'bg-emerald-600 text-white'
              }`}
            >
              {debuggerPaused ? <Play size={14} /> : <Pause size={14} />}
              <span>{debuggerPaused ? 'Resume App' : 'Pause at Breakpoint'}</span>
            </button>
          </div>

          {/* Breakpoint Code Frame */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 font-mono text-xs overflow-hidden">
            <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2 mb-2">
              <span className="text-[11px]">ProductAdapter.java: line 54</span>
              <span className="text-[10px] text-amber-400 bg-amber-950/60 border border-amber-800 px-2 py-0.5 rounded">
                Breakpoint Hit: onBindViewHolder()
              </span>
            </div>

            <div className="space-y-1 text-slate-300 text-[11px]">
              <div className="text-slate-500">52: public void onBindViewHolder(@NonNull ProductViewHolder holder, int position) &#123;</div>
              <div className="bg-rose-950/70 text-rose-200 px-2 py-1 rounded border-l-4 border-rose-500 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                <span>53: Product currentProduct = productList.get(position);</span>
              </div>
              <div className="text-slate-400 pl-4">54: holder.tvProductName.setText(currentProduct.getName());</div>
              <div className="text-slate-400 pl-4">55: holder.tvProductPrice.setText(currentProduct.getFormattedPrice());</div>
              <div className="text-slate-500">56: &#125;</div>
            </div>
          </div>

          {/* Variables Inspector */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5">
            <h4 className="text-xs font-bold text-indigo-300 mb-2 font-mono uppercase tracking-wider">
              Variables at Breakpoint
            </h4>
            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex items-center justify-between bg-slate-950 p-2 rounded border border-slate-800">
                <span className="text-cyan-400">position</span>
                <span className="text-amber-400 font-bold">2 (int)</span>
              </div>
              <div className="flex items-center justify-between bg-slate-950 p-2 rounded border border-slate-800">
                <span className="text-cyan-400">currentProduct.name</span>
                <span className="text-emerald-400 font-bold">"MacBook Air M3"</span>
              </div>
              <div className="flex items-center justify-between bg-slate-950 p-2 rounded border border-slate-800">
                <span className="text-cyan-400">currentProduct.price</span>
                <span className="text-emerald-400 font-bold">1099.00 (double)</span>
              </div>
              <div className="flex items-center justify-between bg-slate-950 p-2 rounded border border-slate-800">
                <span className="text-cyan-400">holder.itemView</span>
                <span className="text-purple-400 font-bold">CardView@0x7f09001b (Recycled VH #2)</span>
              </div>
              <div className="flex items-center justify-between bg-slate-950 p-2 rounded border border-slate-800">
                <span className="text-cyan-400">productList.size()</span>
                <span className="text-amber-400">8</span>
              </div>
            </div>
          </div>

          {/* Tool explanation */}
          <div className="bg-blue-950/40 border border-blue-800/60 rounded-xl p-3 text-xs text-blue-200">
            <p className="font-semibold mb-1">When does the Debugger help with Dynamic Lists?</p>
            <p className="text-blue-300/90 leading-relaxed">
              When items show duplicate data during fast scrolling, or an <code className="bg-blue-900/60 px-1 rounded text-white">IndexOutOfBoundsException</code> occurs, setting a breakpoint inside <code className="bg-blue-900/60 px-1 rounded text-white">onBindViewHolder()</code> allows you to pause every frame and verify whether the <code className="bg-blue-900/60 px-1 rounded text-white">position</code> matches the expected dataset index.
            </p>
          </div>
        </div>
      )}

      {/* TAB 3: LAYOUT INSPECTOR */}
      {activeTab === 'inspector' && (
        <div className="flex-1 flex flex-col min-h-0 bg-slate-950/70 p-4 overflow-y-auto space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers size={16} className="text-purple-400" />
              Task 1 & Task 5: 3D Layout Hierarchy Inspector
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Inspects view bounds, constraints, and verifies <code className="text-indigo-300 font-mono">item_product.xml</code> nesting structure.
            </p>
          </div>

          {/* Interactive Hierarchy Tree */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 font-mono text-xs space-y-1">
            <div className="text-slate-400 font-bold pb-1 mb-1 border-b border-slate-800">
              Component Tree (activity_main.xml + item_product.xml)
            </div>

            <div className="pl-0 text-slate-300">▼ DecorView [1080x2400]</div>
            <div className="pl-3 text-slate-400">▼ LinearLayout (vertical)</div>
            <div className="pl-6 text-slate-400">├─ Toolbar [id/toolbar] (h=56dp)</div>
            <div className="pl-6 text-indigo-400 font-bold">
              ▼ RecyclerView [id/recyclerViewProducts] (match_parent)
            </div>
            
            <div className="pl-9 text-purple-300 font-semibold bg-purple-950/40 p-1 rounded border border-purple-800/60 my-1">
              ▼ CardView [id/cardProduct] (layout_margin=6dp, cornerRadius=12dp)
            </div>

            <div className="pl-12 text-slate-300">
              ▼ ConstraintLayout (padding=12dp)
            </div>
            <div className="pl-16 text-emerald-400">
              ├─ ImageView [id/ivProductImage] (72dp x 72dp)
            </div>
            <div className="pl-16 text-emerald-400">
              ├─ TextView [id/tvProductCategory] (11sp, bold)
            </div>
            <div className="pl-16 text-emerald-400">
              ├─ TextView [id/tvProductName] (16sp, bold, ellipsize=end)
            </div>
            <div className="pl-16 text-emerald-400">
              ├─ TextView [id/tvProductPrice] (15sp, bold, #16A34A)
            </div>
            <div className="pl-16 text-slate-500">
              └─ ImageView [id/ivChevron] (20dp x 20dp)
            </div>
          </div>

          {/* Dimensions / Attributes Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs">
            <h4 className="font-bold text-indigo-300 mb-2 font-mono uppercase">
              Selected View: item_product.xml (Task 5 Specifications)
            </h4>
            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
              <div className="bg-slate-950 p-2 rounded border border-slate-800">
                <span className="text-slate-400 block">Row Dimensions:</span>
                <span className="text-white font-bold">match_parent x wrap_content</span>
              </div>
              <div className="bg-slate-950 p-2 rounded border border-slate-800">
                <span className="text-slate-400 block">Image Dimensions:</span>
                <span className="text-white font-bold">72dp x 72dp (scaleType: centerInside)</span>
              </div>
              <div className="bg-slate-950 p-2 rounded border border-slate-800">
                <span className="text-slate-400 block">Title Typography:</span>
                <span className="text-white font-bold">16sp, Bold, maxLines=1</span>
              </div>
              <div className="bg-slate-950 p-2 rounded border border-slate-800">
                <span className="text-slate-400 block">Price Typography:</span>
                <span className="text-emerald-400 font-bold">15sp, Bold (#16A34A)</span>
              </div>
            </div>
          </div>

          {/* Tool explanation */}
          <div className="bg-purple-950/40 border border-purple-800/60 rounded-xl p-3 text-xs text-purple-200">
            <p className="font-semibold mb-1">When does Layout Inspector help with Dynamic Lists?</p>
            <p className="text-purple-300/90 leading-relaxed">
              When an item view row collapses to zero height, text overflows and gets clipped, or margins between cards overlap unexpectedly, Layout Inspector visually isolates the padding, bounding box, and constraint chain of each item in real time without restarting the app.
            </p>
          </div>
        </div>
      )}

      {/* TAB 4: PROFILER */}
      {activeTab === 'profiler' && (
        <div className="flex-1 flex flex-col min-h-0 bg-slate-950/70 p-4 overflow-y-auto space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Activity size={16} className="text-emerald-400" />
              Task 1 & Task 8: Memory & CPU Profiler
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Measures memory allocations and rendering frame rates (60 FPS vs jank) during scrolling.
            </p>
          </div>

          {/* Visual Benchmark Comparison */}
          <div className="grid grid-cols-2 gap-3">
            {/* ListView Profile */}
            <div className="bg-slate-900 border border-amber-800/50 rounded-xl p-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-bold text-amber-400 font-mono">ListView Profile</span>
                <span className="text-[10px] text-amber-300 bg-amber-950 px-1.5 py-0.5 rounded">High Overhead</span>
              </div>

              <div className="mt-2 space-y-2 text-xs">
                <div>
                  <div className="flex justify-between text-slate-400 text-[11px] mb-1">
                    <span>Memory Allocation</span>
                    <span className="text-amber-400 font-mono font-bold">48 MB (Spikes on scroll)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="w-3/4 h-full bg-amber-500"></div>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 space-y-1 pt-1 font-mono">
                  <div>Inflations on scroll: <span className="text-rose-400 font-bold">Frequent</span></div>
                  <div>findViewById calls: <span className="text-rose-400 font-bold">Uncached / High</span></div>
                  <div>Frame render: <span className="text-amber-400">42-55 FPS</span></div>
                </div>
              </div>
            </div>

            {/* RecyclerView Profile */}
            <div className="bg-slate-900 border border-emerald-800/50 rounded-xl p-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-bold text-emerald-400 font-mono">RecyclerView Profile</span>
                <span className="text-[10px] text-emerald-300 bg-emerald-950 px-1.5 py-0.5 rounded">Optimized</span>
              </div>

              <div className="mt-2 space-y-2 text-xs">
                <div>
                  <div className="flex justify-between text-slate-400 text-[11px] mb-1">
                    <span>Memory Allocation</span>
                    <span className="text-emerald-400 font-mono font-bold">18 MB (Flat pool)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="w-1/4 h-full bg-emerald-500"></div>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 space-y-1 pt-1 font-mono">
                  <div>Inflations on scroll: <span className="text-emerald-400 font-bold">0 (Zero after load)</span></div>
                  <div>findViewById calls: <span className="text-emerald-400 font-bold">Cached in VH</span></div>
                  <div>Frame render: <span className="text-emerald-400">60 FPS Smooth</span></div>
                </div>
              </div>
            </div>
          </div>

          {/* Explanation */}
          <div className="bg-emerald-950/40 border border-emerald-800/60 rounded-xl p-3 text-xs text-emerald-200">
            <p className="font-semibold mb-1">When does the Profiler help with Dynamic Lists?</p>
            <p className="text-emerald-300/90 leading-relaxed">
              When scrolling causes stutter or frame drops (UI jank), the Android Profiler pinpoints garbage collection pauses caused by creating new view objects inside <code className="bg-emerald-900/60 px-1 rounded text-white">getView()</code> instead of reusing cached ViewHolders.
            </p>
          </div>
        </div>
      )}

    </div>
  );
};
