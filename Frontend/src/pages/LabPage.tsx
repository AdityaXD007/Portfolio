import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Laptop from '../components/3d/Laptop';
import ProjectsList from '../components/ProjectsList';

export const LabPage: React.FC = () => {
  // Debug lid angle in degrees (0 to 105)
  const [debugAngleDeg, setDebugAngleDeg] = useState<number>(75);
  const [show2DList, setShow2DList] = useState<boolean>(false);

  // Convert to radians: 105 deg = 1.8326 rad
  const lidAngleRad = (debugAngleDeg * Math.PI) / 180;

  return (
    <div className="relative w-full min-h-screen bg-[#070b14] text-white overflow-hidden">
      {/* Top Bar Navigation & Controls */}
      <nav
        aria-label="Lab navigation"
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80"
      >
        <div className="flex items-center gap-3">
          <a
            href="/"
            className="text-xs font-semibold text-slate-400 hover:text-white transition-colors flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded px-1.5 py-1"
          >
            &larr; Back to Portfolio
          </a>
          <span className="text-slate-600">|</span>
          <h1 className="text-sm font-semibold tracking-wide text-slate-200">
            3D Opening Laptop Lab
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShow2DList(!show2DList)}
            className="text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors cursor-pointer"
          >
            {show2DList ? 'Hide 2D Fallback' : 'Skip 3D / View projects'}
          </button>
        </div>
      </nav>

      {/* Debug Slider Floating Panel (Top-Right) */}
      <aside
        aria-label="3D Laptop Debug Controls"
        className="fixed top-20 right-6 z-40 w-72 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-800 p-4 shadow-2xl"
      >
        <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-400">
            Lid Angle Debugger
          </h2>
          <span className="text-xs font-mono bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/30">
            {debugAngleDeg.toFixed(0)}° / {lidAngleRad.toFixed(2)} rad
          </span>
        </div>

        <label
          htmlFor="lid-angle-slider"
          className="block text-xs text-slate-400 mb-1.5 font-medium"
        >
          Angle (0° closed to 105° open):
        </label>
        <input
          id="lid-angle-slider"
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

      {/* 3D Canvas Area */}
      <main className="w-full h-screen pt-16">
        <div className="w-full h-full" aria-hidden="true">
          <Canvas
            camera={{ position: [0, 1.2, 4.5], fov: 45 }}
            gl={{ antialias: true }}
          >
            <ambientLight intensity={0.6} />
            <directionalLight position={[4, 6, 5]} intensity={1.2} />
            <directionalLight position={[-4, 3, -3]} intensity={0.3} color="#818cf8" />
            <Laptop lidAngle={lidAngleRad} />
            <OrbitControls enablePan={false} maxDistance={8} minDistance={2} />
          </Canvas>
        </div>
      </main>

      {/* 2D Fallback Modal / Section */}
      {show2DList && (
        <div className="relative z-50 bg-[#0B1120] border-t border-slate-800">
          <ProjectsList
            onBackTo3D={() => setShow2DList(false)}
            showBackTo3D={true}
          />
        </div>
      )}
    </div>
  );
};

export default LabPage;
