import React from 'react';
import ProjectsList from '../components/ProjectsList';

export const LabPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
        <h1 className="text-sm font-medium text-slate-300">
          3D Portfolio Lab <span className="text-xs text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20 ml-2">Under Construction</span>
        </h1>
        <a
          href="/"
          className="text-xs text-slate-400 hover:text-white underline underline-offset-4"
        >
          &larr; Back to Main Portfolio
        </a>
      </div>
      <ProjectsList />
    </div>
  );
};

export default LabPage;
