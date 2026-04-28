import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 px-6 border-t border-white/5 bg-[#0F172A]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
            <span className="bg-indigo-500 text-white p-1 rounded-md text-xs font-bold">AK</span>
            <span className="text-xl font-bold tracking-tighter">Aditya<span className="text-indigo-500">.</span></span>
        </div>
        
        <p className="text-slate-500 text-sm">
          © {currentYear} Aditya Karki. All rights reserved.
        </p>
        
        <div className="flex gap-8">
            <a href="#" className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-indigo-500 transition-colors">Privacy</a>
            <a href="#" className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-indigo-500 transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
