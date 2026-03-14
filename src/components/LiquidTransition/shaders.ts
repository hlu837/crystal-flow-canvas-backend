export const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const fragmentShader = `
  uniform sampler2D uTexture;
  uniform float uProgress;
  uniform float uTime;
  uniform vec2 uResolution;
  
  varying vec2 vUv;
  
  // Simplex noise function
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
  
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
             -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
      + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
      dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }
  
  void main() {
    vec2 uv = vUv;
    
    // Create displacement based on noise
    float noise1 = snoise(uv * 3.0 + uTime * 0.5);
    float noise2 = snoise(uv * 5.0 - uTime * 0.3);
    
    // Smooth progress curve for organic feel
    float smoothProgress = smoothstep(0.0, 1.0, uProgress);
    float waveAmount = sin(smoothProgress * 3.14159) * 0.15;
    
    // Displacement vectors
    vec2 displacement = vec2(
      noise1 * waveAmount,
      noise2 * waveAmount
    );
    
    // Apply displacement
    vec2 distortedUv = uv + displacement;
    
    // Chromatic aberration strength based on displacement intensity
    float aberrationStrength = length(displacement) * 2.0;
    
    // Sample with chromatic aberration
    vec2 redOffset = displacement * 1.1;
    vec2 blueOffset = displacement * 0.9;
    
    float r = texture2D(uTexture, distortedUv + redOffset * 0.02).r;
    float g = texture2D(uTexture, distortedUv).g;
    float b = texture2D(uTexture, distortedUv - blueOffset * 0.02).b;
    float a = texture2D(uTexture, distortedUv).a;
    
    vec4 color = vec4(r, g, b, a);
    
    gl_FragColor = color;
  }
`;
