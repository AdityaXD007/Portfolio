import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import LaptopScene from '../components/3d/LaptopScene';
import ProjectsList from '../components/ProjectsList';
import { useScrollProgress } from '../hooks/useScrollProgress';

export const LabPage: React.FC = () => {
  // Container ref for 400vh scroll progress measurement
  const containerRef = useRef<HTMLDivElement>(null);
  const { progressRef } = useScrollProgress(containerRef);

  // Debug controls
  const [isManualDebug, setIsManualDebug] = useState<boolean>(false);
  const [debugAngleDeg, setDebugAngleDeg] = useState<number>(75);
  const [show2DList, setShow2DList] = useState<boolean>(false);

  const manualLidAngleRad = isManualDebug ? (debugAngleDeg * Math.PI) / 180 : null;

  const handleSkipToProjects = () => {
    setShow2DList(true);
    // Smooth scroll to projects section after DOM updates
    setTimeout(() => {
      document.getElementById('projects-list')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  return (
    <div className="relative w-full bg-[#070b14] text-white">
      {/* Top Navbar */}
      <nav
        aria-label="Lab navigation"
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 py-3.5 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80"
      >
        <div className="flex items-center gap-3">
          <a
            href="/"
            className="text-xs font-semibold text-slate-400 hover:text-white transition-colors flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded px-1.5 py-1"
          >
            &larr; Back to Portfolio
          </a>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <h1 className="text-xs sm:text-sm font-semibold tracking-wide text-slate-200">
            3D Opening Laptop Lab
          </h1>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setIsManualDebug(!isManualDebug)}
            className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
              isManualDebug
                ? 'bg-indigo-600 text-white border-indigo-500'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 border-slate-700'
            }`}
          >
            {isManualDebug ? 'Debug: Manual Slider' : 'Debug: Scroll Scrub'}
          </button>

          <button
            type="button"
            onClick={handleSkipToProjects}
            className="text-xs font-semibold px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            Skip 3D / View projects
          </button>
        </div>
      </nav>

      {/* Debug Slider Overlay Panel (Available when manual mode is active) */}
      {isManualDebug && (
        <aside
          aria-label="3D Laptop Debug Controls"
          className="fixed top-20 right-4 sm:right-6 z-40 w-72 rounded-xl bg-slate-900/95 backdrop-blur-md border border-slate-800 p-4 shadow-2xl"
        >
          <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Manual Lid Angle
            </h2>
            <span className="text-xs font-mono bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/30">
              {debugAngleDeg.toFixed(0)}°
            </span>
          </div>

          <label
            htmlFor="manual-angle-slider"
            className="block text-xs text-slate-400 mb-1.5 font-medium"
          >
            Angle (0° closed to 105° open):
          </label>
          <input
            id="manual-angle-slider"
            type="range"
            min="0"
            max="105"
            step="1"
            value={debugAngleDeg}
            onChange={(e) => setDebugAngleDeg(parseFloat(e.target.value))}
            className="w-full accent-indigo-500 cursor-pointer"
          />

          <div className="grid grid-cols-4 gap-1.5 mt-3">
            {[
              { label: '0°', val: 0 },
              { label: '45°', val: 45 },
              { label: '90°', val: 90 },
              { label: '105°', val: 105 },
            ].map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => setDebugAngleDeg(preset.val)}
                className={`text-[11px] py-1 px-1 rounded font-medium transition-colors cursor-pointer ${
                  debugAngleDeg === preset.val
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </aside>
      )}

      {/* 400vh Scroll Container */}
      <div
        ref={containerRef}
        className="relative w-full h-[400vh] bg-[#070b14]"
      >
        {/* Sticky 100vh Canvas Viewport */}
        <div className="sticky top-0 w-full h-screen overflow-hidden">
          <div className="w-full h-full" aria-hidden="true">
            <Canvas
              camera={{ position: [0, 1.8, 4.2], fov: 45 }}
              gl={{ antialias: true, powerPreference: 'high-performance' }}
            >
              <ambientLight intensity={0.6} />
              <directionalLight position={[4, 6, 5]} intensity={1.2} />
              <directionalLight position={[-4, 3, -3]} intensity={0.4} color="#818cf8" />
              <LaptopScene
                progressRef={progressRef}
                manualLidAngle={manualLidAngleRad}
              />
            </Canvas>
          </div>

          {/* Interactive Scroll Hint Badge */}
          {!isManualDebug && (
            <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400">
              <span className="text-xs uppercase tracking-widest font-semibold bg-slate-900/80 px-3 py-1.5 rounded-full border border-slate-800 backdrop-blur-sm">
                Scroll to Open & Explore
              </span>
              <div className="w-5 h-8 border-2 border-slate-600 rounded-full flex justify-center pt-1.5">
                <div className="w-1 h-2 bg-indigo-400 rounded-full animate-bounce" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2D Fallback and Screen Reader Accessible Projects Section */}
      <section aria-label="Projects directory" className="relative z-30">
        <ProjectsList
          id="projects-list"
          className={show2DList ? 'block' : 'mt-0'}
          showBackTo3D={show2DList}
          onBackTo3D={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setShow2DList(false);
          }}
        />
      </section>
    </div>
  );
};

export default LabPage;
