import React, { useState } from 'react';
import { FileCode, Download, Copy, Check, FileText, Terminal, Shield } from 'lucide-react';
import { REPO_FILES } from '../data/repoData';
import { RepoFile } from '../types';

export const FileViewer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<RepoFile>(REPO_FILES[0]);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (file: RepoFile) => {
    const blob = new Blob([file.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getFileIcon = (name: string) => {
    if (name.includes('Dockerfile') || name.endsWith('.yml')) return <FileCode className="w-4 h-4 text-cyan-400" />;
    if (name.endsWith('.sh')) return <Terminal className="w-4 h-4 text-emerald-400" />;
    if (name === 'LICENSE') return <Shield className="w-4 h-4 text-amber-400" />;
    return <FileText className="w-4 h-4 text-blue-400" />;
  };

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <FileCode className="w-5 h-5 text-cyan-400" />
            مخزن و فایل‌های کلون‌شده پروژه SHΞN™
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            تمام فایل‌های پروژه با نام، برند و آدرس‌های شخصی SHΞN™ بازنویسی شده‌اند و آماده کلون، بیلد و استقرار هستند.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleDownload(selectedFile)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 border border-cyan-500/30 text-xs font-semibold transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>دانلود {selectedFile.name}</span>
          </button>
        </div>
      </div>

      {/* Explorer + Code Viewer Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* File List / Sidebar */}
        <div className="lg:col-span-4 bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden">
          <div className="p-3 bg-slate-800/60 border-b border-slate-800 text-xs font-bold text-slate-300 tracking-wider">
            فهرست فایل‌های سورس مخزن ({REPO_FILES.length} فایل)
          </div>
          <div className="p-2 space-y-1">
            {REPO_FILES.map((file) => {
              const isSelected = selectedFile.name === file.name;
              return (
                <button
                  key={file.name}
                  onClick={() => setSelectedFile(file)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg text-right transition ${
                    isSelected
                      ? 'bg-cyan-500/15 border border-cyan-500/30 text-cyan-200'
                      : 'hover:bg-slate-800/60 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {getFileIcon(file.name)}
                    <div>
                      <div className="font-mono text-xs font-bold">{file.name}</div>
                      <div className="text-[11px] text-slate-400 truncate max-w-[180px]">{file.description}</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                    {file.size}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Code Previewer */}
        <div className="lg:col-span-8 bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
            <div className="flex items-center gap-2 font-mono text-xs text-slate-300">
              {getFileIcon(selectedFile.name)}
              <span className="font-bold text-cyan-400">{selectedFile.path}</span>
              <span className="text-slate-500 text-[11px]">({selectedFile.size})</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'کپی شد' : 'کپی سورس'}</span>
              </button>

              <button
                onClick={() => handleDownload(selectedFile)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-medium transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>ذخیره فایل</span>
              </button>
            </div>
          </div>

          {/* Code Area */}
          <div className="p-4 max-h-[520px] overflow-y-auto font-mono text-xs sm:text-sm text-slate-200 leading-relaxed dir-ltr text-left">
            <pre className="whitespace-pre-wrap selection:bg-cyan-500/30 selection:text-cyan-100">
              <code>{selectedFile.content}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
