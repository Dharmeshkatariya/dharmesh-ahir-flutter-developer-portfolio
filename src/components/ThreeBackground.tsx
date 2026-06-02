import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeBackgroundProps {
  bgType: string;
  theme: string;
  mousePos: { x: number; y: number };
  mouseRelative: { x: number; y: number };
  customConfig?: {
    particleCount?: number;
    particleSize?: number;
    particleSpeed?: number;
    glowIntensity?: number;
    blurAmount?: number;
    depthIntensity?: number;
    lightingStrength?: number;
    bloomStrength?: number;
    sceneRotationSpeed?: number;
    objectDensity?: number;
    objectSize?: number;
    animationIntensity?: number;
  };
}

export const ThreeBackground: React.FC<ThreeBackgroundProps> = ({
  bgType,
  theme,
  mousePos,
  mouseRelative,
  customConfig,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // SCENE SETUP
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020813, 0.012);

    // CAMERA SETUP
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const camera = new THREE.PerspectiveCamera(65, width / height, 0.1, 1000);
    camera.position.z = 24;

    // RENDERER SETUP
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // DYNAMIC ACCENT COLORS MAPPINGS BASED ON ACTIVE PALETTE
    const isLight = document.body.classList.contains('light-mode');
    
    // Read customConfig custom options or fall back
    const pCount = customConfig?.particleCount ?? 800;
    const pSize = customConfig?.particleSize ?? 0.6;
    const pSpeed = customConfig?.particleSpeed ?? 0.1;
    const rotSpeed = customConfig?.sceneRotationSpeed ?? 1.0;
    const objDensity = customConfig?.objectDensity ?? 1.0;
    const objSize = customConfig?.objectSize ?? 1.0;

    const getAccentColors = () => {
      switch (theme) {
        case 'forest':
          return { primary: 0x00e676, secondary: isLight ? 0xf1f7f2 : 0x040e07, hex: '#00e676' };
        case 'sunset':
          return { primary: 0xff5722, secondary: isLight ? 0xfbf6f3 : 0x1a0a03, hex: '#ff5722' };
        case 'purple':
          return { primary: 0xd500f9, secondary: isLight ? 0xf5f0fb : 0x12032b, hex: '#d500f9' };
        case 'cyberpunk':
          return { primary: 0xff007f, secondary: isLight ? 0xfcf0f7 : 0x0e001c, hex: '#ff007f' };
        case 'nord':
          return { primary: 0x88c0d0, secondary: isLight ? 0xf0f4f6 : 0x2e3440, hex: '#88c0d0' };
        case 'amoled':
          return { primary: 0x00ffcc, secondary: isLight ? 0xfafafa : 0x000000, hex: '#00ffcc' };
        case 'flutter-official':
          return { primary: 0x02569b, secondary: isLight ? 0xf0f5fa : 0x011627, hex: '#02569b' };
        case 'material-you':
          return { primary: 0xd0bcff, secondary: isLight ? 0xf6f5fb : 0x1c1b1f, hex: '#d0bcff' };
        case 'apple-white':
          return { primary: 0x0071e3, secondary: isLight ? 0xf5f5f7 : 0x1d1d1f, hex: '#0071e3' };
        case 'matrix-green':
          return { primary: 0x00ff3c, secondary: isLight ? 0xeefeed : 0x010802, hex: '#00ff3c' };
        case 'dev-dark':
          return { primary: 0xff79c6, secondary: isLight ? 0xfafafa : 0x1e1e1e, hex: '#ff79c6' };
        case 'tesla-black':
          return { primary: 0xe82127, secondary: isLight ? 0xf6f6f6 : 0x0a0a0a, hex: '#e82127' };
        default: // ocean blue
          return { primary: 0x00e5ff, secondary: isLight ? 0xf0f4f8 : 0x040d1a, hex: '#00e5ff' };
      }
    };

    const colors = getAccentColors();
    scene.fog.color.setHex(colors.secondary);

    // AMBIENT LIGHTS & POINT LIGHTS
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(colors.primary, 2.2, 85);
    pointLight.position.set(10, 15, 10);
    scene.add(pointLight);

    // CONTAINER OBJECT GROUP FOR ANIMATION
    const group = new THREE.Group();
    scene.add(group);

    let animationFrameId: number;
    let clock = new THREE.Clock();

    // Re-useable round custom texture generator
    const generateTexture = (colorHex: string) => {
      const canvas = document.createElement('canvas');
      canvas.width = 16;
      canvas.height = 16;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
        gradient.addColorStop(0, 'rgba(255,255,255,1)');
        gradient.addColorStop(0.45, colorHex);
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 16, 16);
      }
      return new THREE.CanvasTexture(canvas);
    };

    const particleTexture = generateTexture(colors.hex);

    // --- PROCEDURAL SCENE BUILDERS (20 SCENES) ---

    // SCENE 1: CUSTOMIZABLE PARTICLE UNIVERSE
    const setupParticles = () => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount; i++) {
        const theta = Math.random() * 2.0 * Math.PI;
        const phi = Math.acos(2.0 * Math.random() - 1.0);
        const r = (6 + Math.random() * 14) * objSize;

        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);
      }
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const material = new THREE.PointsMaterial({
        size: pSize,
        map: particleTexture,
        transparent: true,
        blending: isLight ? THREE.NormalBlending : THREE.AdditiveBlending,
        depthWrite: false,
      });

      const points = new THREE.Points(geometry, material);
      group.add(points);

      return {
        update: (time: number) => {
          group.rotation.y = time * 0.05 * rotSpeed;
          group.rotation.x = time * 0.02 * rotSpeed;
          group.position.x += (mouseRelative.x * 3 - group.position.x) * 0.05;
          group.position.y += (-mouseRelative.y * 3 - group.position.y) * 0.05;
        }
      };
    };

    // SCENE 2: FLUTTER GALAXY
    const setupFlutterGalaxy = () => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(pCount * 3);
      const originalCoords: THREE.Vector3[] = [];

      for (let i = 0; i < pCount; i++) {
        let x = 0, y = 0, z = (Math.random() - 0.5) * 5;
        const selector = i % 3;
        if (selector === 0) {
          const progress = Math.random();
          x = progress * 6 - 3;
          y = progress * 6 + 1;
        } else if (selector === 1) {
          const progress = Math.random();
          x = progress * 6 - 3;
          y = -progress * 6 - 1;
        } else {
          const progress = Math.random();
          x = progress * 5 + 1;
          y = -progress * 5 + 2;
        }

        positions[i * 3] = x * 2.2 * objSize;
        positions[i * 3 + 1] = y * 2.2 * objSize;
        positions[i * 3 + 2] = z * objSize;
        originalCoords.push(new THREE.Vector3(x * 2.2, y * 2.2, z));
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const material = new THREE.PointsMaterial({
        size: pSize * 1.1,
        map: particleTexture,
        transparent: true,
        blending: isLight ? THREE.NormalBlending : THREE.AdditiveBlending,
      });

      const points = new THREE.Points(geometry, material);
      group.add(points);

      return {
        update: (time: number) => {
          const posAttr = geometry.attributes.position as THREE.BufferAttribute;
          const posArr = posAttr.array as Float32Array;

          for (let i = 0; i < pCount; i++) {
            const orig = originalCoords[i];
            const wave = Math.sin(time * 1.5 * pSpeed + orig.x + orig.y) * 0.4;
            posArr[i * 3] = (orig.x + Math.sin(orig.y + time * pSpeed) * 0.2) * objSize;
            posArr[i * 3 + 1] = (orig.y + wave) * objSize;
            posArr[i * 3 + 2] = (orig.z + Math.cos(orig.x + time * pSpeed) * 0.4) * objSize;
          }
          posAttr.needsUpdate = true;
          group.rotation.y = time * 0.08 * rotSpeed;
        }
      };
    };

    // SCENE 3: FLOATING GLASS CUBES
    const setupCubes = () => {
      const cubeCount = Math.floor(20 * objDensity);
      const cubes: THREE.Mesh[] = [];

      for (let i = 0; i < cubeCount; i++) {
        const size = (Math.random() * 2 + 1) * objSize;
        const geom = new THREE.BoxGeometry(size, size, size);
        const mat = new THREE.MeshPhysicalMaterial({
          color: colors.primary,
          transmission: 0.6,
          transparent: true,
          opacity: 0.35,
          side: THREE.DoubleSide,
        });

        const mesh = new THREE.Mesh(geom, mat);
        mesh.position.set((Math.random() - 0.5) * 40, (Math.random() - 0.5) * 30, (Math.random() - 0.5) * 20);
        
        const geoWire = new THREE.EdgesGeometry(geom);
        const matWire = new THREE.LineBasicMaterial({ color: colors.primary });
        const wireframe = new THREE.LineSegments(geoWire, matWire);
        mesh.add(wireframe);

        group.add(mesh);
        cubes.push(mesh);
      }

      return {
        update: (time: number) => {
          cubes.forEach((cube, idx) => {
            cube.rotation.x += 0.005 * rotSpeed;
            cube.rotation.y += 0.007 * rotSpeed;
            cube.position.y += Math.sin(time * pSpeed + idx) * 0.01;
          });
          group.position.x += (mouseRelative.x * 2 - group.position.x) * 0.05;
        }
      };
    };

    // SCENE 4: NEON GRID
    const setupNeonGrid = () => {
      const size = 60;
      const divisions = 30;
      const gridHelper = new THREE.GridHelper(size, divisions, colors.primary, 0x1f2937);
      gridHelper.position.y = -10;
      gridHelper.rotation.x = Math.PI / 12;
      group.add(gridHelper);

      return {
        update: (time: number) => {
          gridHelper.position.z = (time * 8 * pSpeed) % (size / divisions);
        }
      };
    };

    // SCENE 5: AI NEURAL NETWORK
    const setupNeuralNetwork = () => {
      const nodeCount = Math.floor(60 * objDensity);
      const nodes: { pos: THREE.Vector3; vel: THREE.Vector3; mesh: THREE.Mesh }[] = [];
      const sphereGeo = new THREE.SphereGeometry(0.18 * objSize, 8, 8);
      const sphereMat = new THREE.MeshBasicMaterial({ color: colors.primary });

      for (let i = 0; i < nodeCount; i++) {
        const pos = new THREE.Vector3((Math.random() - 0.5) * 32, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 15);
        const vel = new THREE.Vector3((Math.random() - 0.5) * 0.03 * pSpeed, (Math.random() - 0.5) * 0.03 * pSpeed, (Math.random() - 0.5) * 0.03 * pSpeed);
        const mesh = new THREE.Mesh(sphereGeo, sphereMat);
        mesh.position.copy(pos);
        group.add(mesh);
        nodes.push({ pos, vel, mesh });
      }

      const lineGeometry = new THREE.BufferGeometry();
      const lineMaterial = new THREE.LineBasicMaterial({ color: colors.primary, transparent: true, opacity: 0.3 });
      const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
      group.add(lineSegments);

      return {
        update: (time: number) => {
          const positionsArray = [];
          nodes.forEach(node => {
            node.pos.add(node.vel);
            if (Math.abs(node.pos.x) > 18) node.vel.x *= -1;
            if (Math.abs(node.pos.y) > 12) node.vel.y *= -1;
            node.mesh.position.copy(node.pos);
          });

          for (let i = 0; i < nodeCount; i++) {
            const nodeA = nodes[i];
            for (let j = i + 1; j < nodeCount; j++) {
              const nodeB = nodes[j];
              if (nodeA.pos.distanceTo(nodeB.pos) < 6.5) {
                positionsArray.push(nodeA.pos.x, nodeA.pos.y, nodeA.pos.z);
                positionsArray.push(nodeB.pos.x, nodeB.pos.y, nodeB.pos.z);
              }
            }
          }
          lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positionsArray, 3));
          lineGeometry.attributes.position.needsUpdate = true;
          group.rotation.y = time * 0.04 * rotSpeed;
        }
      };
    };

    // SCENE 6: DYNAMIC ORBITAL SYSTEM
    const setupOrbitalSystem = () => {
      const coreGeo = new THREE.SphereGeometry(2.5 * objSize, 16, 16);
      const coreMat = new THREE.MeshBasicMaterial({ color: colors.primary, wireframe: true });
      const core = new THREE.Mesh(coreGeo, coreMat);
      group.add(core);

      const satellites: THREE.Mesh[] = [];
      const orbits = 4;
      for (let i = 0; i < orbits; i++) {
        const satGeo = new THREE.SphereGeometry(0.5 * objSize, 8, 8);
        const satMat = new THREE.MeshBasicMaterial({ color: colors.primary });
        const sat = new THREE.Mesh(satGeo, satMat);
        group.add(sat);
        satellites.push(sat);
      }

      return {
        update: (time: number) => {
          core.rotation.y = time * 0.15;
          satellites.forEach((sat, idx) => {
            const rad = (6 + idx * 3.5) * objSize;
            sat.position.x = Math.cos(time * (1 - idx * 0.15) * pSpeed * rotSpeed) * rad;
            sat.position.y = Math.sin(idx) * 2;
            sat.position.z = Math.sin(time * (1 - idx * 0.15) * pSpeed * rotSpeed) * rad;
          });
        }
      };
    };

    // SCENE 7: CODE MATRIX RAIN
    const setupMatrixRain = () => {
      const geom = new THREE.BufferGeometry();
      const count = Math.floor(600 * objDensity);
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 45 * objSize;
        positions[i * 3 + 1] = Math.random() * 25 * objSize;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 15 * objSize;
      }
      geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const mat = new THREE.PointsMaterial({
        size: pSize * 1.5,
        map: particleTexture,
        transparent: true,
      });
      const points = new THREE.Points(geom, mat);
      group.add(points);

      return {
        update: (time: number) => {
          const arr = geom.attributes.position.array as Float32Array;
          for (let i = 0; i < count; i++) {
            arr[i * 3 + 1] -= (0.05 + Math.random() * 0.1) * pSpeed * 5;
            if (arr[i * 3 + 1] < -15 * objSize) {
              arr[i * 3 + 1] = 15 * objSize;
            }
          }
          geom.attributes.position.needsUpdate = true;
        }
      };
    };

    // SCENE 8: FLOATING TECH ICONS
    const setupTechIcons = () => {
      const geometries = [
        new THREE.TetrahedronGeometry(1.2 * objSize),
        new THREE.IcosahedronGeometry(1.0 * objSize),
        new THREE.OctahedronGeometry(1.1 * objSize)
      ];
      const meshes: THREE.Mesh[] = [];
      const count = Math.floor(15 * objDensity);

      for (let i = 0; i < count; i++) {
        const mat = new THREE.MeshBasicMaterial({ color: colors.primary, wireframe: true });
        const mesh = new THREE.Mesh(geometries[i % geometries.length], mat);
        mesh.position.set((Math.random() - 0.5) * 35, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 15);
        group.add(mesh);
        meshes.push(mesh);
      }

      return {
        update: (time: number) => {
          meshes.forEach((m, idx) => {
            m.rotation.x += 0.006 * rotSpeed;
            m.rotation.y += 0.009 * rotSpeed;
            m.position.y += Math.sin(time + idx * 0.5) * 0.015;
          });
        }
      };
    };

    // SCENE 9: DIGITAL CITY
    const setupDigitalCity = () => {
      const count = Math.floor(25 * objDensity);
      const buildings: THREE.Mesh[] = [];

      for (let i = 0; i < count; i++) {
        const w = (1 + Math.random() * 2) * objSize;
        const h = (4 + Math.random() * 12) * objSize;
        const d = (1 + Math.random() * 2) * objSize;
        const geom = new THREE.BoxGeometry(w, h, d);
        const mat = new THREE.MeshBasicMaterial({ color: colors.primary, wireframe: true });
        const mesh = new THREE.Mesh(geom, mat);
        mesh.position.set((Math.random() - 0.5) * 30, h / 2 - 12, (Math.random() - 0.5) * 15);
        group.add(mesh);
        buildings.push(mesh);
      }

      return {
        update: (time: number) => {
          group.rotation.y = time * 0.03 * rotSpeed;
        }
      };
    };

    // SCENE 10: HOLOGRAPHIC INTERFACE
    const setupHologram = () => {
      const ringGeo1 = new THREE.RingGeometry(3 * objSize, 3.2 * objSize, 30);
      const ringGeo2 = new THREE.RingGeometry(5 * objSize, 5.1 * objSize, 30);
      const mat = new THREE.MeshBasicMaterial({ color: colors.primary, side: THREE.DoubleSide });
      const ring1 = new THREE.Mesh(ringGeo1, mat);
      const ring2 = new THREE.Mesh(ringGeo2, mat);
      
      ring1.rotation.x = Math.PI / 2.5;
      ring2.rotation.y = Math.PI / 4;
      
      group.add(ring1);
      group.add(ring2);

      return {
        update: (time: number) => {
          ring1.rotation.z = time * 0.2 * rotSpeed;
          ring2.rotation.z = -time * 0.3 * rotSpeed;
        }
      };
    };

    // SCENE 11: SPACE NEBULA
    const setupNebula = () => {
      return setupParticles(); // Procedurally identical to customizable point density
    };

    // SCENE 12: DATA STREAMS
    const setupDataStreams = () => {
      const splineCount = 5;
      const curves: THREE.LineLoop[] = [];

      for (let i = 0; i < splineCount; i++) {
        const points = [];
        for (let j = 0; j < 10; j++) {
          points.push(new THREE.Vector3(
            (j - 5) * 4 * objSize,
            Math.sin(j * 0.5 + i) * 6 * objSize,
            (Math.random() - 0.5) * 8 * objSize
          ));
        }
        const curve = new THREE.CatmullRomCurve3(points);
        const geom = new THREE.BufferGeometry().setFromPoints(curve.getPoints(50));
        const mat = new THREE.LineBasicMaterial({ color: colors.primary, transparent: true, opacity: 0.6 });
        const line = new THREE.LineLoop(geom, mat);
        group.add(line);
        curves.push(line);
      }

      return {
        update: (time: number) => {
          curves.forEach((c, idx) => {
            c.rotation.z = Math.sin(time * 0.2 + idx) * 0.1;
          });
        }
      };
    };

    // SCENE 13: INTERACTIVE GLOBE
    const setupInteractiveGlobe = () => {
      const geom = new THREE.SphereGeometry(8 * objSize, 18, 18);
      const mat = new THREE.MeshBasicMaterial({ color: colors.primary, wireframe: true, transparent: true, opacity: 0.5 });
      const globeMesh = new THREE.Mesh(geom, mat);
      group.add(globeMesh);

      return {
        update: (time: number) => {
          globeMesh.rotation.y = time * 0.08 * rotSpeed;
          globeMesh.rotation.x = Math.sin(time * 0.1) * 0.15;
        }
      };
    };

    // SCENE 14: ARCHITECTURE DIAGRAM
    const setupArchitectureDiagram = () => {
      const gridCount = 3;
      const grids: THREE.GridHelper[] = [];
      for (let i = 0; i < gridCount; i++) {
        const grid = new THREE.GridHelper(20 * objSize, 10, colors.primary, colors.primary);
        grid.position.y = (i - 1) * 6 * objSize;
        group.add(grid);
        grids.push(grid);
      }
      return {
        update: (time: number) => {
          group.rotation.y = time * 0.05 * rotSpeed;
        }
      };
    };

    // SCENE 15: QUANTUM ENERGY FIELD
    const setupQuantumField = () => {
      const xSize = 25;
      const ySize = 25;
      const geom = new THREE.PlaneGeometry(35, 35, xSize, ySize);
      const mat = new THREE.MeshBasicMaterial({ color: colors.primary, wireframe: true, side: THREE.DoubleSide, transparent: true, opacity: 0.4 });
      const plane = new THREE.Mesh(geom, mat);
      plane.rotation.x = -Math.PI / 3;
      group.add(plane);

      return {
        update: (time: number) => {
          const pos = geom.attributes.position;
          for (let i = 0; i < pos.count; i++) {
            const x = pos.getX(i);
            const y = pos.getY(i);
            const z = Math.sin(x * 0.2 + time) * Math.cos(y * 0.2 + time) * 1.5;
            pos.setZ(i, z);
          }
          pos.needsUpdate = true;
        }
      };
    };

    // SCENE 16: TESLA STYLE ENVIRONMENT
    const setupTeslaEnvironment = () => {
      const core = new THREE.Mesh(new THREE.SphereGeometry(1.5, 8, 8), new THREE.MeshBasicMaterial({ color: 0xffffff }));
      group.add(core);

      const sparks: THREE.Line[] = [];
      const sparkCount = 4;

      for (let i = 0; i < sparkCount; i++) {
        const pts = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(5, 5, 5)];
        const geom = new THREE.BufferGeometry().setFromPoints(pts);
        const l = new THREE.Line(geom, new THREE.LineBasicMaterial({ color: colors.primary }));
        group.add(l);
        sparks.push(l);
      }

      return {
        update: (time: number) => {
          sparks.forEach((spark, idx) => {
            const destination = new THREE.Vector3(
              (Math.random() - 0.5) * 15 * objSize,
              (Math.random() - 0.5) * 15 * objSize,
              (Math.random() - 0.5) * 15 * objSize
            );
            const points = [new THREE.Vector3(0, 0, 0), destination];
            spark.geometry.setFromPoints(points);
          });
        }
      };
    };

    // SCENE 17: APPLE EVENT STAGE
    const setupAppleStage = () => {
      const ringGeo = new THREE.RingGeometry(8 * objSize, 14 * objSize, 32);
      const ringMat = new THREE.MeshBasicMaterial({ color: colors.primary, side: THREE.DoubleSide, transparent: true, opacity: 0.15 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      group.add(ring);

      return {
        update: (time: number) => {
          ring.rotation.z = time * 0.05;
        }
      };
    };

    // SCENE 18: FRAMER MOTION
    const setupFramerMotionScene = () => {
      return setupCubes(); // Uses responsive wire cubes falling smoothly
    };

    // SCENE 19: INSPIRATIONAL WORKSPACE
    const setupWorkspace = () => {
      return setupParticles(); // Space particles with custom sizing
    };

    // SCENE 20: CUSTOM SCENE BUILDER (Dynamic parameters map)
    const setupCustomBuilder = () => {
      return setupParticles(); // Default custom points reacting to sliders!
    };


    // --- CHOOSE ACTIVE SCENE LAUNCH HANDLER ---
    let activeHandler: { update: (time: number) => void } | null = null;

    switch (bgType) {
      case 'galaxy':
      case 'flutter-galaxy':
        activeHandler = setupFlutterGalaxy();
        break;
      case 'cubes':
      case 'floating-glass-cubes':
        activeHandler = setupCubes();
        break;
      case 'grid':
      case 'neon-cyber-grid':
        activeHandler = setupNeonGrid();
        break;
      case 'neural':
      case 'neural-network':
        activeHandler = setupNeuralNetwork();
        break;
      case 'orbital':
        activeHandler = setupOrbitalSystem();
        break;
      case 'matrix-rain':
        activeHandler = setupMatrixRain();
        break;
      case 'tech-icons':
        activeHandler = setupTechIcons();
        break;
      case 'digital-city':
        activeHandler = setupDigitalCity();
        break;
      case 'hologram-circles':
        activeHandler = setupHologram();
        break;
      case 'nebula':
        activeHandler = setupNebula();
        break;
      case 'data-streams':
        activeHandler = setupDataStreams();
        break;
      case 'globe':
        activeHandler = setupInteractiveGlobe();
        break;
      case 'architecture':
        activeHandler = setupArchitectureDiagram();
        break;
      case 'quantum':
        activeHandler = setupQuantumField();
        break;
      case 'tesla-sparks':
        activeHandler = setupTeslaEnvironment();
        break;
      case 'apple-stage':
        activeHandler = setupAppleStage();
        break;
      case 'framer-motion':
        activeHandler = setupFramerMotionScene();
        break;
      case 'workspace-universe':
        activeHandler = setupWorkspace();
        break;
      case 'custom-scene':
        activeHandler = setupCustomBuilder();
        break;
      default:
        activeHandler = setupParticles();
        break;
    }

    // ANIMATION LOOP EXECUTION
    const animate = () => {
      const time = clock.getElapsedTime();
      if (activeHandler) {
        activeHandler.update(time);
      }
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      scene.clear();
      renderer.dispose();
    };
  }, [bgType, theme, customConfig?.particleCount, customConfig?.particleSize, customConfig?.particleSpeed, customConfig?.sceneRotationSpeed, customConfig?.objectSize, customConfig?.objectDensity]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none opacity-80"
      style={{ overflow: 'hidden' }}
    />
  );
};
