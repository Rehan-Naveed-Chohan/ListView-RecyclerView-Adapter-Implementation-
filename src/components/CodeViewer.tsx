import React, { useState } from 'react';
import { 
  FileCode, 
  Copy, 
  Check, 
  Download, 
  ExternalLink, 
  Folder, 
  Code2, 
  Search,
  Package
} from 'lucide-react';
import { ANDROID_SOURCE_FILES, AndroidSourceFile } from '../data/sourceCode';

export const CodeViewer: React.FC = () => {
  const [selectedFileId, setSelectedFileId] = useState<string>('product-model');
  const [copied, setCopied] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const currentFile = ANDROID_SOURCE_FILES.find(f => f.id === selectedFileId) || ANDROID_SOURCE_FILES[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFile = () => {
    const blob = new Blob([currentFile.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = currentFile.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadAllBundle = () => {
    let bundle = `========================================================\n` +
      `WEEK 3 ANDROID LAB: LISTVIEW & RECYCLERVIEW CATALOG\n` +
      `Complete Android Studio Project Source Files (Java + XML)\n` +
      `========================================================\n\n`;

    ANDROID_SOURCE_FILES.forEach(file => {
      bundle += `\n/* ====================================================\n`;
      bundle += ` * FILE: ${file.name}\n`;
      bundle += ` * PATH: ${file.path}\n`;
      bundle += ` * TASK: ${file.description}\n`;
      bundle += ` * ==================================================== */\n\n`;
      bundle += file.content + '\n\n';
    });

    const blob = new Blob([bundle], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'android_week3_lab_source_bundle.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const lines = currentFile.content.split('\n');

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col h-[740px]">
      
      {/* Top File Tab Bar */}
      <div className="bg-slate-950 px-3 pt-3 border-b border-slate-800 flex items-center justify-between shrink-0 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5">
          {ANDROID_SOURCE_FILES.map(file => {
            const isActive = file.id === selectedFileId;
            return (
              <button
                key={file.id}
                onClick={() => setSelectedFileId(file.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-t-xl text-xs font-mono transition border-t-2 ${
                  isActive
                    ? 'bg-slate-900 text-white font-bold border-indigo-500 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40 border-transparent'
                }`}
              >
                <FileCode size={14} className={isActive ? 'text-indigo-400' : 'text-slate-500'} />
                <span>{file.name}</span>
                <span className="text-[10px] opacity-60 uppercase font-sans">{file.language}</span>
              </button>
            );
          })}
        </div>

        <button
          onClick={handleDownloadAllBundle}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600/90 hover:bg-emerald-600 text-white text-xs font-semibold rounded-lg shadow-xs transition mb-1.5 shrink-0"
          title="Download all Java & XML files as a single bundle"
        >
          <Download size={13} />
          <span>Export All Files</span>
        </button>
      </div>

      {/* File Path & Deliverable Info Banner */}
      <div className="bg-slate-900/90 px-4 py-2 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2">
          <Folder size={14} className="text-amber-400 shrink-0" />
          <span className="text-xs font-mono text-slate-300 select-all">{currentFile.path}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition"
          >
            {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Code'}</span>
          </button>

          <button
            onClick={handleDownloadFile}
            className="flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition"
          >
            <Download size={13} />
            <span>Save .java/.xml</span>
          </button>
        </div>
      </div>

      {/* Task attribution hint */}
      <div className="bg-indigo-950/40 border-b border-indigo-900/40 px-4 py-1.5 text-xs text-indigo-300 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
        <span>{currentFile.description}</span>
      </div>

      {/* Code Editor Body with Line Numbers */}
      <div className="flex-1 overflow-y-auto bg-slate-950 p-4 font-mono text-xs leading-relaxed text-slate-300 selection:bg-indigo-900 selection:text-white">
        <div className="table w-full">
          {lines.map((line, idx) => {
            const lineNum = idx + 1;
            
            // Simple syntax keyword coloring
            let coloredLine = line;
            const isComment = line.trim().startsWith('//') || line.trim().startsWith('/*') || line.trim().startsWith('*') || line.trim().startsWith('<!--');
            const isAnnotation = line.trim().startsWith('@');
            const isTaskTag = line.includes('Task');

            return (
              <div 
                key={lineNum} 
                className={`table-row hover:bg-slate-900/60 ${isTaskTag ? 'bg-indigo-950/20' : ''}`}
              >
                <span className="table-cell pr-4 text-right text-slate-600 select-none text-[11px] w-12 font-mono">
                  {lineNum}
                </span>
                <span 
                  className={`table-cell whitespace-pre ${
                    isComment 
                      ? 'text-slate-500 italic' 
                      : isAnnotation 
                        ? 'text-amber-400' 
                        : isTaskTag
                          ? 'text-indigo-200 font-semibold'
                          : 'text-slate-200'
                  }`}
                >
                  {line}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="bg-slate-950 px-4 py-2 border-t border-slate-800 text-[11px] text-slate-400 font-mono flex items-center justify-between shrink-0">
        <span>Lines: {lines.length} | Charset: UTF-8</span>
        <span className="text-emerald-400">Target SDK: Android 34 (Java 8 / Java 17)</span>
      </div>
    </div>
  );
};
