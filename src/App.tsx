import React, { useState } from 'react';
import { 
  Smartphone, 
  Terminal, 
  Code2, 
  CheckSquare, 
  GitCompare, 
  FileText, 
  Zap, 
  RotateCcw, 
  Download, 
  ExternalLink,
  BookOpen,
  Award
} from 'lucide-react';
import { ProductItem, LogEntry, MainTab } from './types/androidLab';
import { INITIAL_PRODUCTS, INITIAL_LOGCAT_ENTRIES } from './data/labData';
import { PhoneEmulator } from './components/PhoneEmulator';
import { StudioToolsPanel } from './components/StudioToolsPanel';
import { CodeViewer } from './components/CodeViewer';
import { LabGuide } from './components/LabGuide';
import { ComparisonView } from './components/ComparisonView';
import { SubmissionReportModal } from './components/SubmissionReportModal';
import { RecyclingExplainerModal } from './components/RecyclingExplainerModal';

export default function App() {
  const [products, setProducts] = useState<ProductItem[]>(INITIAL_PRODUCTS);
  const [logs, setLogs] = useState<LogEntry[]>(INITIAL_LOGCAT_ENTRIES);
  const [activeTab, setActiveTab] = useState<MainTab>('emulator');
  
  // Modals
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [showRecyclingModal, setShowRecyclingModal] = useState<boolean>(false);

  // Add new product
  const handleAddProduct = (newProduct: Omit<ProductItem, 'id'>) => {
    const item: ProductItem = {
      ...newProduct,
      id: Date.now()
    };
    setProducts(prev => [...prev, item]);
  };

  const handleResetProducts = () => {
    setProducts(INITIAL_PRODUCTS);
    handleAddLog({
      level: 'I',
      tag: 'MainActivity',
      message: 'Reset products list to default 8 catalog items'
    });
  };

  const handleAddLog = (newLog: Omit<LogEntry, 'id' | 'timestamp'>) => {
    const now = new Date();
    const timestamp = now.toTimeString().split(' ')[0] + '.' + String(now.getMilliseconds()).padStart(3, '0');
    const entry: LogEntry = {
      ...newLog,
      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp
    };
    setLogs(prev => [...prev, entry]);
  };

  const handleClearLogs = () => {
    setLogs([]);
  };

  const handleSelectChallenge = (challengeIdx: number) => {
    setActiveTab('emulator');
    handleAddLog({
      level: 'I',
      tag: 'MainActivity',
      message: `User activated Challenge ${challengeIdx} in emulator`
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-600 selection:text-white">
      
      {/* Top Main Navigation Header */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
          
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-indigo-600 flex items-center justify-center shadow-md shadow-indigo-900/30 text-white font-bold ring-2 ring-emerald-400/20">
              <Smartphone size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-extrabold text-white tracking-tight">
                  Android Lab Studio
                </h1>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-mono font-bold">
                  Week 3: 20 Marks
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                ListView, RecyclerView &amp; Adapter Implementation (Java + XML)
              </p>
            </div>
          </div>

          {/* Center Navigation Tabs */}
          <div className="flex items-center bg-slate-950 p-1 rounded-2xl border border-slate-800 text-xs font-medium">
            <button
              onClick={() => setActiveTab('emulator')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition ${
                activeTab === 'emulator' 
                  ? 'bg-indigo-600 text-white font-bold shadow-sm' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Smartphone size={14} />
              <span>Emulator &amp; Tools</span>
            </button>

            <button
              onClick={() => setActiveTab('tasks')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition ${
                activeTab === 'tasks' 
                  ? 'bg-indigo-600 text-white font-bold shadow-sm' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <CheckSquare size={14} />
              <span>Tasks &amp; Rubric</span>
            </button>

            <button
              onClick={() => setActiveTab('code')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition ${
                activeTab === 'code' 
                  ? 'bg-indigo-600 text-white font-bold shadow-sm' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Code2 size={14} />
              <span>Source Code (Java/XML)</span>
            </button>

            <button
              onClick={() => setActiveTab('comparison')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition ${
                activeTab === 'comparison' 
                  ? 'bg-indigo-600 text-white font-bold shadow-sm' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <GitCompare size={14} />
              <span>Comparison &amp; Challenges</span>
            </button>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowRecyclingModal(true)}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-950/60 hover:bg-purple-900/60 border border-purple-700/50 text-purple-200 text-xs font-semibold transition"
            >
              <Zap size={14} className="text-purple-400" />
              <span>Recycling Concept</span>
            </button>

            <button
              onClick={() => setShowReportModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-sm"
            >
              <FileText size={14} />
              <span>Lab Report &amp; Submission</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Workstation Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6">
        
        {/* TAB 1: EMULATOR & STUDIO TOOLS WORKSPACE (Side by side) */}
        {activeTab === 'emulator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left: Interactive Android Phone Emulator */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <PhoneEmulator
                products={products}
                onAddProduct={handleAddProduct}
                onResetProducts={handleResetProducts}
                onLogcatMessage={handleAddLog}
              />
            </div>

            {/* Right: Android Studio Tools Panel (Logcat, Debugger, Layout Inspector, Profiler) */}
            <div className="lg:col-span-7">
              <StudioToolsPanel
                logs={logs}
                onClearLogs={handleClearLogs}
                onAddLog={handleAddLog}
              />
            </div>

          </div>
        )}

        {/* TAB 2: TASKS & ASSESSMENT RUBRIC */}
        {activeTab === 'tasks' && (
          <LabGuide
            onOpenReportModal={() => setShowReportModal(true)}
            onOpenRecyclingModal={() => setShowRecyclingModal(true)}
          />
        )}

        {/* TAB 3: SOURCE CODE HUB (Java + XML) */}
        {activeTab === 'code' && (
          <CodeViewer />
        )}

        {/* TAB 4: COMPARISON & CHALLENGES (Task 8) */}
        {activeTab === 'comparison' && (
          <ComparisonView
            onSelectChallenge={handleSelectChallenge}
          />
        )}

      </main>

      {/* Modals */}
      {showReportModal && (
        <SubmissionReportModal onClose={() => setShowReportModal(false)} />
      )}

      {showRecyclingModal && (
        <RecyclingExplainerModal onClose={() => setShowRecyclingModal(false)} />
      )}

      {/* Footer */}
      <footer className="bg-slate-900/60 border-t border-slate-800 py-3 text-center text-xs text-slate-500 shrink-0">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-between gap-2">
          <span>Android Mobile Application Development Lab — Week 3 Practical</span>
          <span>Target Architecture: Java + XML Views (Material 3)</span>
          <button 
            onClick={() => setShowReportModal(true)}
            className="text-indigo-400 hover:text-indigo-300 font-medium"
          >
            Review Submission Answers (20/20 Marks)
          </button>
        </div>
      </footer>

    </div>
  );
}
