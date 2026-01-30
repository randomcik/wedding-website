'use client';

import { PresentationControls, useTexture } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useMemo, useRef } from 'react';
import * as THREE from 'three';

type PassCanvasProps = {
  width?: number;
  height?: number;
};

function PassMeshes() {
  const [front, back] = useTexture(
    ['/vectorWeddingPass%20Front.svg', '/vectorWeddingPass%20back.svg'],
    (textures) =>
      textures.forEach((t) => {
        t.colorSpace = THREE.SRGBColorSpace;
        t.anisotropy = 8;
      }),
  );
  const group = useRef<THREE.Group>(null);

  const cardArgs = useMemo<[number, number]>(() => [3.6, 1.5], []);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    group.current.rotation.x = THREE.MathUtils.degToRad(5) + Math.sin(t / 4) * 0.01;
    group.current.rotation.y = Math.sin(t / 6) * 0.03;
  });

  return (
    <group ref={group}>
      <mesh position={[0, 0, 0.005]}>
        <planeGeometry args={cardArgs} />
        <meshStandardMaterial map={front} roughness={0.6} metalness={0.1} />
      </mesh>
      <mesh rotation={[0, Math.PI, 0]} position={[0, 0, -0.005]}>
        <planeGeometry args={cardArgs} />
        <meshStandardMaterial map={back} roughness={0.6} metalness={0.1} />
      </mesh>
    </group>
  );
}

export function PassCanvas({ width, height }: PassCanvasProps) {
  return (
    <div
      className="pass-shell"
      style={{
        width: width ? `${width}px` : "100%",
        height: height ? `${height}px` : "100%",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 28 }}
        dpr={[1, 2]}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[3.5, 3.5, 3]} intensity={1.9} />
        <directionalLight position={[-2, -1, -3]} intensity={0.9} color="#f0d67b" />
        <Suspense fallback={null}>
          <PresentationControls
            global
            damping={0.25}
            speed={1}
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 2, Math.PI / 2]}
            azimuth={[-Math.PI, Math.PI]}
          >
            <PassMeshes />
          </PresentationControls>
        </Suspense>
      </Canvas>
    </div>
  );
}

