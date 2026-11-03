import React, { useRef, useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import LaptopScene from '../components/3d/LaptopScene';
import CanvasLoader from '../components/3d/CanvasLoader';
import ProjectsList from '../components/ProjectsList';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { useDeviceCapabilities } from '../hooks/useDeviceCapabilities';
import { Info, HelpCircle, X } from 'lucide-react';

export const LabPage: React.FC = () => {
  // Container ref for 400vh GSAP ScrollTrigger measurement
  const containerRef = useRef<HTMLDivElement>(null);
  const { progressRef } = useScrollProgress(containerRef);

  // Device capabilities & accessibility heuristic detection
  const capabilities = useDeviceCapabilities();
  const [override2DFallback, setOverride2DFallback] = useState<boolean>(false);

  // Clamped device pixel ratio state [1, 2] monitored by PerformanceMonitor
  const [dpr, setDpr] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      return Math.min(Math.max(window.devicePixelRatio || 1, 1), 2);
    }
    return 1.5;
  });

  // Manual debug controls
  const [isManualDebug, setIsManualDebug] = useState<boolean>(false);
  const [debugAngleDeg, setDebugAngleDeg] = useState<number>(75);

  // Documentation drawer toggle
  const [showDocs, setShowDocs] = useState<boolean>(false);

  const manualLidAngleRad = isManualDebug ? (debugAngleDeg * Math.PI) / 180 : null;

  const handleSkipToProjects = () => {
    document.getElementById('projects-list')?.scrollIntoView({ behavior: 'smooth' });
  };

  // If low-end / reduced-motion / no WebGL and user hasn't overridden, render 2D view
  const renderFallbackOnly = capabilities.shouldFallbackTo2D && !override2DFallback;

  return (
    <div className="relative w-full bg-[#070b14] text-white">
      {/* ================= Top Navigation Bar ================= */}
      <nav
        aria-label="Lab navigation"
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 py-3 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 shadow-lg"
      >
        <div className="flex items-center gap-3">
          <a
            href="/"
            className="text-xs font-semibold text-slate-400 hover:text-white transition-colors flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded px-2 py-1"
          >
            &larr; Portfolio
          </a>
          <span className="text-slate-700 hidden sm:inline">|</span>
          <div className="flex items-center gap-2">
            <h1 className="text-xs sm:text-sm font-bold tracking-wide text-white">
              3D Laptop Lab
            </h1>
            <span className="text-[10px] font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded-full hidden md:inline">
              DPR: {dpr.toFixed(1)}x
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Docs Toggle */}
          <button
            type="button"
            onClick={() => setShowDocs(!showDocs)}
            className="text-xs font-medium px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700/80 flex items-center gap-1.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-400"
            title="Read Developer Guide"
          >
            <HelpCircle size={14} />
            <span className="hidden sm:inline">Docs</span>
          </button>

          {/* Manual Debug Mode Slider Toggle */}
          <button
            type="button"
            onClick={() => setIsManualDebug(!isManualDebug)}
            className={`text-xs font-medium px-2.5 sm:px-3 py-1.5 rounded-lg border transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
              isManualDebug
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/30'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border-slate-700/80'
            }`}
          >
            {isManualDebug ? 'Manual Slider' : 'Debug Slider'}
          </button>

          {/* Primary Skip to 2D Projects Button */}
          <button
            type="button"
            onClick={handleSkipToProjects}
            className="text-xs font-semibold px-3 sm:px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white shadow-lg shadow-indigo-600/30 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            Skip 3D / View projects
          </button>
        </div>
      </nav>

      {/* ================= Fallback Notice Banner (if active) ================= */}
      {renderFallbackOnly && (
        <aside
          aria-label="Accessibility Fallback Notification"
          className="fixed top-14 left-0 right-0 z-40 bg-indigo-950/90 border-b border-indigo-800/80 px-4 py-2.5 text-xs text-indigo-200 flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <Info size={15} className="text-indigo-400 shrink-0" />
            <span>
              2D Project view activated: <strong>{capabilities.reason}</strong>
            </span>
          </div>
          <button
            type="button"
            onClick={() => setOverride2DFallback(true)}
            className="ml-4 underline hover:text-white font-semibold cursor-pointer shrink-0"
          >
            Force enable 3D
          </button>
        </aside>
      )}

      {/* ================= Debug Slider Floating Panel ================= */}
      {isManualDebug && (
        <aside
          aria-label="3D Laptop Debug Controls"
          className="fixed top-18 right-4 sm:right-6 z-40 w-72 rounded-xl bg-slate-900/95 backdrop-blur-md border border-slate-800 p-4 shadow-2xl"
        >
          <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Manual Lid Angle
            </h2>
            <span className="text-xs font-mono bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/30">
              {debugAngleDeg.toFixed(0)}° / {((debugAngleDeg * Math.PI) / 180).toFixed(2)} rad
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

      {/* ================= Developer Documentation Modal / Drawer ================= */}
      {showDocs && (
        <aside
          role="dialog"
          aria-modal="true"
          aria-label="3D Portfolio Developer Guide"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
        >
          <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl text-slate-200">
            <button
              type="button"
              onClick={() => setShowDocs(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close Documentation"
            >
              <X size={18} />
            </button>

            <h2 className="text-xl font-bold text-white mb-1">
              3D Opening Laptop Guide
            </h2>
            <p className="text-xs text-slate-400 mb-6">
              Reference guide for models, timeline tweak ranges, and projects configuration.
            </p>

            <div className="space-y-6 text-sm">
              <section className="border-t border-slate-800 pt-4">
                <h3 className="font-semibold text-indigo-400 text-xs uppercase tracking-wider mb-2">
                  1. Where to Change the 3D Model Path
                </h3>
                <p className="text-slate-300 text-xs leading-relaxed">
                  The model loads from <code className="text-indigo-300 bg-slate-800 px-1 py-0.5 rounded">/public/models/laptop.glb</code>.
                  You can pass a custom path or change the default in{' '}
                  <code className="text-indigo-300 bg-slate-800 px-1 py-0.5 rounded">src/components/3d/Laptop.tsx</code> via the{' '}
                  <code className="text-indigo-300 bg-slate-800 px-1 py-0.5 rounded">modelUrl</code> prop. If no file is found, it automatically falls back to the high-detail procedural aluminum laptop.
                </p>
              </section>

              <section className="border-t border-slate-800 pt-4">
                <h3 className="font-semibold text-indigo-400 text-xs uppercase tracking-wider mb-2">
                  2. Where to Tweak Scroll Ranges & Camera Positions
                </h3>
                <p className="text-slate-300 text-xs leading-relaxed mb-2">
                  All timeline boundaries, camera vectors, and angles live at the top of{' '}
                  <code className="text-indigo-300 bg-slate-800 px-1 py-0.5 rounded">src/components/3d/LaptopScene.tsx</code>:
                </p>
                <ul className="list-disc list-inside text-xs text-slate-400 space-y-1">
                  <li><strong className="text-slate-200">0.00 – 0.35:</strong> Lid opening (<code className="text-slate-300">LID_CONFIG.OPEN_RAD = 105°</code>)</li>
                  <li><strong className="text-slate-200">0.35 – 0.70:</strong> Camera dollies in from <code className="text-slate-300">LID_OPEN_POS</code> to <code className="text-slate-300">END_POS</code></li>
                  <li><strong className="text-slate-200">0.70 – 1.00:</strong> Screen interactive & project cards scroll vertically</li>
                </ul>
              </section>

              <section className="border-t border-slate-800 pt-4">
                <h3 className="font-semibold text-indigo-400 text-xs uppercase tracking-wider mb-2">
                  3. How to Add a New Project
                </h3>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Open <code className="text-indigo-300 bg-slate-800 px-1 py-0.5 rounded">src/data/projects.ts</code> and add an object to the <code className="text-indigo-300 bg-slate-800 px-1 py-0.5 rounded">projects</code> array with <code className="text-indigo-300">title</code>, <code className="text-indigo-300">description</code>, <code className="text-indigo-300">tech</code>, <code className="text-indigo-300">role</code>, <code className="text-indigo-300">link</code>, and optional <code className="text-indigo-300">image</code>. Both the 3D screen view and the 2D accessibility list will update automatically.
                </p>
              </section>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 text-right">
              <button
                type="button"
                onClick={() => setShowDocs(false)}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer"
              >
                Got it
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* ================= 3D Canvas Scroll Experience ================= */}
      {!renderFallbackOnly && (
        <div
          ref={containerRef}
          className="relative w-full h-[400vh] bg-[#070b14]"
        >
          {/* Sticky 100vh Canvas Viewport */}
          <div className="sticky top-0 w-full h-screen overflow-hidden">
            <CanvasLoader />
            <div className="w-full h-full" aria-hidden="true">
              <Canvas
                dpr={dpr}
                camera={{ position: [0, 1.8, 4.2], fov: 45 }}
                gl={{
                  antialias: true,
                  powerPreference: 'high-performance',
                  stencil: false,
                }}
              >
                <Suspense fallback={null}>
                  <LaptopScene
                    progressRef={progressRef}
                    manualLidAngle={manualLidAngleRad}
                    onDprChange={setDpr}
                  />
                </Suspense>
              </Canvas>
            </div>

            {/* Subtle Scroll Hint */}
            {!isManualDebug && (
              <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400">
                <span className="text-[11px] uppercase tracking-widest font-semibold bg-slate-900/80 px-3 py-1.5 rounded-full border border-slate-800 backdrop-blur-sm shadow-lg">
                  Scroll to open laptop & explore
                </span>
                <div className="w-5 h-8 border-2 border-slate-600 rounded-full flex justify-center pt-1.5">
                  <div className="w-1 h-2 bg-indigo-400 rounded-full animate-bounce" />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= 2D Accessible Projects Section ================= */}
      {/*
        Always present in the DOM for search engines and screen readers.
        Users can jump directly to this section via "Skip 3D / View projects".
      */}
      <section aria-label="Featured projects catalog" className="relative z-30">
        <ProjectsList
          id="projects-list"
          showBackTo3D={!renderFallbackOnly}
          onBackTo3D={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      </section>
    </div>
  );
};

export default LabPage;
