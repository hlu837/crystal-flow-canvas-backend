import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import './LiquidMaterial';

interface LiquidSceneProps {
  texture: THREE.Texture | null;
  progress: number;
}

const LiquidScene = ({ texture, progress }: LiquidSceneProps) => {
  const materialRef = useRef<any>(null);
  const { viewport } = useThree();

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime;
      materialRef.current.uProgress = progress;
    }
  });

  useEffect(() => {
    if (materialRef.current && texture) {
      materialRef.current.uTexture = texture;
      materialRef.current.uResolution.set(viewport.width, viewport.height);
    }
  }, [texture, viewport]);

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <liquidDisplacementMaterial
        ref={materialRef}
        transparent
        uTexture={texture}
        uProgress={progress}
      />
    </mesh>
  );
};

export default LiquidScene;
