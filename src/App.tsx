/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { DeployGuide } from './components/DeployGuide';
import { TerminalSimulator } from './components/TerminalSimulator';
import { FileViewer } from './components/FileViewer';
import { ConfigGenerator } from './components/ConfigGenerator';
import { SocialBanner } from './components/SocialBanner';
import { REPO_FILES } from './data/repoData';

export default function App() {
  const [activeTab, setActiveTab] = useState<'guide' | 'terminal' | 'files' | 'generator'>('guide');

  const handleDownloadAll = () => {
    REPO_FILES.forEach((file, index) => {
      setTimeout(() => {
        const blob = new Blob([file.content], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, index * 250);
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans" dir="rtl">
      {/* Top Header & Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onDownloadAll={handleDownloadAll}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'guide' && <DeployGuide />}
        {activeTab === 'terminal' && <TerminalSimulator />}
        {activeTab === 'files' && <FileViewer />}
        {activeTab === 'generator' && <ConfigGenerator />}

        {/* Global Telegram Social Banner */}
        <SocialBanner />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 SHΞN™ — تمامی حقوق متعلق به پروژه سرور آزاد ابری اوبونتو است.</p>
          <div className="flex items-center gap-4">
            <a
              href="https://t.me/shervini"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 hover:text-sky-300 font-mono transition"
            >
              Telegram: @shervini
            </a>
            <span>•</span>
            <span>Ubuntu 22.04 LTS (Jammy Jellyfish)</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
