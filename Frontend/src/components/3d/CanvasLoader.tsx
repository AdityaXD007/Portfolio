import React from 'react';
import { useProgress } from '@react-three/drei';

export const CanvasLoader: React.FC = () => {
  const { active, progress } = useProgress();

  if (!active && progress >= 100) {
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#070b14]/90 backdrop-blur-md transition-opacity duration-500"
    >
      <div className="relative flex items-center justify-center mb-6">
        {/* Animated circular track */}
        <div className="w-16 h-16 rounded-full border-2 border-indigo-500/20 border-t-indigo-500 animate-spin" />
        <span className="absolute text-xs font-mono font-bold text-indigo-300">
          {Math.round(progress)}%
        </span>
      </div>

      <p className="text-sm font-medium text-slate-200 tracking-wide">
        Preparing 3D Workspace
      </p>
      <p className="text-xs text-slate-400 mt-1">
        Assembling procedural shaders and geometries...
      </p>
    </div>
  );
};

export default CanvasLoader;

