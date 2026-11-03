import React, { useRef } from 'react';
import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { ExternalLink, Sparkles } from 'lucide-react';
import { GithubIcon as Github } from '../Icons';
import { projects, type Project } from '../../data/projects';

export interface ScreenContentProps {
  progressRef: React.MutableRefObject<number>;
  manualActive?: boolean;
}

export const ScreenContent: React.FC<ScreenContentProps> = ({
  progressRef,
  manualActive = false,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const domWrapperRef = useRef<HTMLDivElement>(null);
  const lastScrollProgressRef = useRef<number>(-1);

  useFrame(() => {
    const rawProgress = progressRef.current;
    // Interactive threshold: after camera dollies in (progress >= 0.70)
    const active = manualActive || rawProgress >= 0.70;

    if (domWrapperRef.current) {
      domWrapperRef.current.style.pointerEvents = active ? 'auto' : 'none';
      domWrapperRef.current.style.userSelect = active ? 'auto' : 'none';
    }

    // When scrolling in range 0.70 - 1.0, drive inner screen vertical scroll
    if (!manualActive && rawProgress >= 0.70 && scrollContainerRef.current) {
      const t = Math.min(1, Math.max(0, (rawProgress - 0.70) / 0.30));
      // Only update DOM scroll if value changed noticeably
      if (Math.abs(t - lastScrollProgressRef.current) > 0.001) {
        lastScrollProgressRef.current = t;
        const container = scrollContainerRef.current;
        const maxScroll = container.scrollHeight - container.clientHeight;
        if (maxScroll > 0) {
          container.scrollTop = t * maxScroll;
        }
      }
    }
  });

  return (
    <Html
      transform
      occlude="blending"
      position={[0, 0, 0.005]}
      // Scale 960px width x 600px height to 2.88 x 1.80 Three.js units
      scale={0.003}
      style={{
        width: '960px',
        height: '600px',
      }}
      className="overflow-hidden rounded-md"
    >
      <div
        ref={domWrapperRef}
        style={{ pointerEvents: manualActive ? 'auto' : 'none' }}
        className="w-[960px] h-[600px] bg-[#090d16] text-slate-100 flex flex-col font-sans select-none antialiased border border-slate-800/80 shadow-2xl transition-opacity duration-300"
      >
        {/* ================= Screen Top Browser Chrome ================= */}
        <div className="h-10 bg-slate-950/90 border-b border-slate-800/90 flex items-center justify-between px-4 shrink-0">
          {/* Window control dots */}
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block shadow-sm" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block shadow-sm" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block shadow-sm" />
          </div>

          {/* Browser URL pill */}
          <div className="flex items-center justify-center bg-slate-900/90 border border-slate-700/60 rounded-md px-5 py-1 text-xs text-slate-300 font-mono tracking-wide w-80 shadow-inner">
            <span className="text-emerald-400 mr-1.5">&#128274;</span>
            https://aditya.dev/projects
          </div>

          {/* Right badge */}
          <div className="flex items-center gap-2 text-[11px] text-indigo-400 font-semibold bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20">
            <Sparkles size={11} />
            <span>Interactive Display</span>
          </div>
        </div>

        {/* ================= Scrollable Screen Content ================= */}
        <div
          ref={scrollContainerRef}
          tabIndex={0}
          aria-label="Interactive projects screen view"
          className="flex-1 overflow-y-auto px-8 py-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900/50 outline-none focus:ring-1 focus:ring-indigo-500/50"
        >
          {/* Header inside screen */}
          <div className="border-b border-slate-800 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-extrabold text-white tracking-tight">
                  Aditya Karki <span className="text-indigo-400 font-medium">/ Works</span>
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  Full-stack Software Engineer &bull; Kathmandu, Nepal &bull; Available for contracts
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">
                  {projects.length} Featured Projects
                </span>
              </div>
            </div>
          </div>

          {/* Project Cards Inside Laptop Screen */}
          <div className="grid grid-cols-2 gap-4 pb-8">
            {projects.map((proj: Project) => (
              <div
                key={proj.id}
                className="group flex flex-col justify-between bg-slate-900/90 border border-slate-800 rounded-xl p-4 hover:border-indigo-500/50 hover:bg-slate-850 transition-all duration-200 shadow-md"
              >
                <div>
                  {proj.image && (
                    <div className="h-28 w-full rounded-lg overflow-hidden mb-3 bg-slate-800 border border-slate-700/50">
                      <img
                        src={proj.image}
                        alt={`${proj.title} thumbnail`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[11px] text-indigo-400 font-semibold mb-1">
                    <span>{proj.role}</span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {proj.title}
                  </h3>

                  <p className="text-xs text-slate-400 mt-1.5 line-clamp-3 leading-relaxed">
                    {proj.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mt-3">
                    {proj.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-medium bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700/50"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-800/80">
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 py-1.5 px-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  >
                    <span>Visit</span>
                    <ExternalLink size={11} />
                  </a>

                  {proj.github && (
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 p-1.5 rounded-lg border border-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400"
                      aria-label={`${proj.title} GitHub repo`}
                    >
                      <Github size={13} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Html>
  );
};

export default ScreenContent;
