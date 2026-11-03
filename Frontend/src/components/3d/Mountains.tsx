import React, { useMemo } from 'react';

export interface MountainsProps {
  className?: string;
}

/**
 * Minimal low-poly mountain silhouette for background atmosphere.
 * Designed with flat-shaded geometric cones/pyramids; subtle draw calls and no textures.
 */
export const Mountains: React.FC<MountainsProps> = () => {
  // Mountain peak configurations: [x, y, z, radius, height, radialSegments, color]
  const peaks = useMemo(
    () => [
      // Far background massive ridge
      { pos: [0, 1.2, -16] as [number, number, number], r: 9, h: 7, seg: 5, color: '#0c101c' },
      { pos: [-8, 0.8, -17] as [number, number, number], r: 8, h: 6, seg: 5, color: '#090d17' },
      { pos: [8, 0.9, -17] as [number, number, number], r: 8.5, h: 6.2, seg: 5, color: '#0a0e1a' },

      // Midground prominent Himalayan peaks
      { pos: [-4.5, 0.2, -12] as [number, number, number], r: 5.5, h: 4.8, seg: 6, color: '#13192b' },
      { pos: [0, 0.4, -11] as [number, number, number], r: 4.8, h: 4.4, seg: 5, color: '#161e33' },
      { pos: [4.2, 0.1, -12] as [number, number, number], r: 5.2, h: 4.6, seg: 6, color: '#121829' },

      // Foreground subtle foothills
      { pos: [-2.2, -0.6, -8] as [number, number, number], r: 3.2, h: 2.6, seg: 5, color: '#1a233b' },
      { pos: [2.5, -0.7, -8] as [number, number, number], r: 3.4, h: 2.7, seg: 5, color: '#192238' },
    ],
    []
  );

  return (
    <group position={[0, -0.4, 0]}>
      {peaks.map((p, idx) => (
        <mesh
          key={idx}
          position={p.pos}
          rotation={[0, idx * 0.7, 0]}
          receiveShadow
        >
          <coneGeometry args={[p.r, p.h, p.seg]} />
          <meshStandardMaterial
            color={p.color}
            flatShading={true}
            roughness={0.9}
            metalness={0.1}
          />
        </mesh>
      ))}

      {/* Subtle horizon mist plane to blend mountains smoothly with the deep space */}
      <mesh position={[0, -0.6, -7]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[40, 25]} />
        <meshBasicMaterial
          color="#070b14"
          transparent
          opacity={0.85}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};

export default Mountains;
