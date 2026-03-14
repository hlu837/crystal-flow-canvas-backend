import { shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';
import * as THREE from 'three';
import { vertexShader, fragmentShader } from './shaders';

// Create the shader material
const LiquidDisplacementMaterial = shaderMaterial(
  {
    uTexture: null,
    uProgress: 0,
    uTime: 0,
    uResolution: new THREE.Vector2(1, 1),
  },
  vertexShader,
  fragmentShader
);

// Extend so we can use it in JSX
extend({ LiquidDisplacementMaterial });

// Type declaration for TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      liquidDisplacementMaterial: any;
    }
  }
}

export { LiquidDisplacementMaterial };
