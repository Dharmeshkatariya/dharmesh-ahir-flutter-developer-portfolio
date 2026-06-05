import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface LivingThreeIllustrationProps {
  type: 'flutter-sphere' | 'neural-orb' | 'architecture-galaxy' | 'ai-brain-core' | 'developer-planet';
  className?: string;
  glowColor?: string;
}

export const LivingThreeIllustration: React.FC<LivingThreeIllustrationProps> = ({
  type,
  className = 'w-48 h-48',
  glowColor = '#00ffcc',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 192;
    const height = container.clientHeight || 192;

    // Create scene with alpha (transparent background)
    const scene = new THREE.Scene();

    // Camera setup
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 8;

    // Renderer setup
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch (e) {
      // Fallback if WebGL fails in sandboxed iframes
      container.innerHTML = `
        <div class="flex items-center justify-center h-full w-full relative">
          <div class="absolute inset-0 rounded-full animate-pulse blur-xl opacity-30 bg-radial from-[${glowColor}] to-transparent"></div>
          <div class="w-16 h-16 rounded-full border border-dashed border-white/20 animate-spin flex items-center justify-center">
            <span class="text-[9px] text-white/50 uppercase font-mono tracking-widest">${type.substring(0, 8)}</span>
          </div>
        </div>
      `;
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Dynamic color parsing to Hex code number
    const parseColorToHex = (colorString: string) => {
      const cleaned = colorString.replace('#', '');
      return parseInt(cleaned, 16) || 0x00ffcc;
    };
    const primaryHexColor = parseColorToHex(glowColor);

    // Base lighting schema
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(primaryHexColor, 5.0, 30);
    pointLight.position.set(2, 3, 4);
    scene.add(pointLight);

    const backLight = new THREE.PointLight(0xffffff, 2.0, 20);
    backLight.position.set(-2, -3, -4);
    scene.add(backLight);

    // Group for combined systems rotation
    const group = new THREE.Group();
    scene.add(group);

    let animationFrameId: number;
    let clock = new THREE.Clock();

    // 1. FLUTTER SPHERE Setup
    let flutterSphereMesh: THREE.Mesh;
    let flutterOuterParticles: THREE.Points;

    const buildFlutterSphere = () => {
      // Create geodesic wire core sphere
      const geometry = new THREE.IcosahedronGeometry(2.2, 2);
      const material = new THREE.MeshPhysicalMaterial({
        color: primaryHexColor,
        wireframe: true,
        transparent: true,
        opacity: 0.85,
        roughness: 0.2,
        metalness: 0.9,
      });
      flutterSphereMesh = new THREE.Mesh(geometry, material);
      group.add(flutterSphereMesh);

      // Add orbiting rings
      const ringGeo = new THREE.RingGeometry(2.8, 2.88, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.45,
      });
      const orbitRing1 = new THREE.Mesh(ringGeo, ringMat);
      orbitRing1.rotation.x = Math.PI / 4;
      group.add(orbitRing1);

      const orbitRing2 = new THREE.Mesh(ringGeo, ringMat);
      orbitRing2.rotation.y = Math.PI / 4;
      orbitRing2.rotation.z = Math.PI / 6;
      group.add(orbitRing2);

      // Add micro dust particles
      const dustCount = 80;
      const dustGeo = new THREE.BufferGeometry();
      const dustPositions = new Float32Array(dustCount * 3);
      for (let i = 0; i < dustCount; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        const distance = 2.4 + Math.random() * 0.8;
        dustPositions[i * 3] = distance * Math.sin(phi) * Math.cos(theta);
        dustPositions[i * 3 + 1] = distance * Math.sin(phi) * Math.sin(theta);
        dustPositions[i * 3 + 2] = distance * Math.cos(phi);
      }
      dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
      const dustMat = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.08,
        transparent: true,
        opacity: 0.7,
      });
      flutterOuterParticles = new THREE.Points(dustGeo, dustMat);
      group.add(flutterOuterParticles);

      return {
        update: (time: number) => {
          flutterSphereMesh.rotation.y = time * 0.38;
          flutterSphereMesh.rotation.x = time * 0.15;
          orbitRing1.rotation.z = time * 0.25;
          orbitRing2.rotation.z = -time * 0.18;
          flutterOuterParticles.rotation.y = -time * 0.08;
          group.position.y = Math.sin(time * 1.5) * 0.16;
        },
      };
    };

    // 2. NEURAL ORB Setup
    let neuralConnections: THREE.LineSegments;
    const buildNeuralOrb = () => {
      const nodeCount = 35;
      const nodes: THREE.Vector3[] = [];
      const originalDirs: THREE.Vector3[] = [];
      
      const nodeGeo = new THREE.SphereGeometry(0.12, 6, 6);
      const nodeMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

      for (let i = 0; i < nodeCount; i++) {
        const tempPos = new THREE.Vector3(
          (Math.random() - 0.5) * 3.4,
          (Math.random() - 0.5) * 3.4,
          (Math.random() - 0.5) * 3.4
        );
        nodes.push(tempPos);
        originalDirs.push(tempPos.clone().normalize());

        const mNode = new THREE.Mesh(nodeGeo, nodeMat);
        mNode.position.copy(tempPos);
        group.add(mNode);
      }

      const connectionGeo = new THREE.BufferGeometry();
      const connectionMat = new THREE.LineBasicMaterial({
        color: primaryHexColor,
        transparent: true,
        opacity: 0.65,
      });
      neuralConnections = new THREE.LineSegments(connectionGeo, connectionMat);
      group.add(neuralConnections);

      return {
        update: (time: number) => {
          group.rotation.y = time * 0.22;
          group.rotation.x = time * 0.12;

          const conPoints: number[] = [];
          for (let i = 0; i < nodeCount; i++) {
            const pA = nodes[i];
            const wave = Math.sin(time * 2 + i) * 0.14;
            pA.addScaledVector(originalDirs[i], wave * 0.05);

            // Relocate children meshes dynamically
            const childNodeMesh = group.children[i] as THREE.Mesh;
            if (childNodeMesh && childNodeMesh.position) {
              childNodeMesh.position.copy(pA);
            }

            for (let j = i + 1; j < nodeCount; j++) {
              const pB = nodes[j];
              if (pA.distanceTo(pB) < 1.8) {
                conPoints.push(pA.x, pA.y, pA.z, pB.x, pB.y, pB.z);
              }
            }
          }
          connectionGeo.setAttribute('position', new THREE.Float32BufferAttribute(conPoints, 3));
          connectionGeo.attributes.position.needsUpdate = true;
          group.position.y = Math.sin(time * 1.8) * 0.12;
        },
      };
    };

    // 3. ARCHITECTURE GALAXY Setup
    const buildArchitectureGalaxy = () => {
      // Render central high-performance application core cube
      const coreGeo = new THREE.BoxGeometry(1.6, 1.6, 1.6);
      const coreMat = new THREE.MeshPhysicalMaterial({
        color: primaryHexColor,
        transparent: true,
        opacity: 0.6,
        wireframe: true,
      });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      group.add(coreMesh);

      const ringGeo = new THREE.RingGeometry(2.4, 2.45, 30);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.2, side: THREE.DoubleSide });
      const orbitRing = new THREE.Mesh(ringGeo, ringMat);
      orbitRing.rotation.x = Math.PI / 2.5;
      group.add(orbitRing);

      // Set orbiting blocks representing database layer, routing engines, UI controllers
      const cubeGeo = new THREE.BoxGeometry(0.5, 0.5, 0.5);
      const cubeMat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
      const satelliteCubes: THREE.Mesh[] = [];
      const satCount = 3;

      for (let i = 0; i < satCount; i++) {
        const sat = new THREE.Mesh(cubeGeo, cubeMat);
        group.add(sat);
        satelliteCubes.push(sat);
      }

      return {
        update: (time: number) => {
          coreMesh.rotation.y = time * 0.5;
          coreMesh.rotation.z = time * 0.2;
          orbitRing.rotation.z = time * 0.1;

          satelliteCubes.forEach((sat, idx) => {
            const angle = time * 0.8 + (idx * Math.PI * 2) / satCount;
            sat.position.x = Math.cos(angle) * 2.4;
            sat.position.y = Math.sin(angle) * 0.8;
            sat.position.z = Math.sin(angle) * 2.4;
            sat.rotation.x = time * 1.2;
            sat.rotation.y = time * 0.8;
          });

          group.rotation.y = time * 0.1;
        },
      };
    };

    // 4. AI BRAIN CORE Setup
    const buildAiBrainCore = () => {
      // Highly compact particle cluster behaving as electric cerebral synapses
      const synapseCount = 120;
      const positions = new Float32Array(synapseCount * 3);
      const velocities: number[] = [];
      for (let i = 0; i < synapseCount; i++) {
        const r = 1.6 + Math.random() * 0.6;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);

        velocities.push((Math.random() - 0.5) * 0.1, (Math.random() - 0.5) * 0.1, (Math.random() - 0.5) * 0.1);
      }

      const synapseGeo = new THREE.BufferGeometry();
      synapseGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const synapseMat = new THREE.PointsMaterial({
        color: primaryHexColor,
        size: 0.14,
        transparent: true,
        opacity: 0.9,
      });
      const points = new THREE.Points(synapseGeo, synapseMat);
      group.add(points);

      // Internal brain glowing core globe
      const coreMesh = new THREE.Mesh(
        new THREE.SphereGeometry(1.0, 12, 12),
        new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.2, wireframe: true })
      );
      group.add(coreMesh);

      return {
        update: (time: number) => {
          group.rotation.y = time * 0.4;
          coreMesh.rotation.z = -time * 0.3;
          
          const posAttr = synapseGeo.attributes.position as THREE.BufferAttribute;
          const posArr = posAttr.array as Float32Array;
          for (let i = 0; i < synapseCount; i++) {
            // Apply slight ambient contraction pulsation loops
            const pulse = 1.0 + Math.sin(time * 4.0 + i) * 0.06;
            posArr[i * 3] *= pulse;
            posArr[i * 3 + 1] *= pulse;
            posArr[i * 3 + 2] *= pulse;
          }
          posAttr.needsUpdate = true;
          group.position.y = Math.sin(time * 2.2) * 0.08;
        },
      };
    };

    // 5. DEVELOPER PLANET Setup
    const buildDeveloperPlanet = () => {
      // Outer planetary solid globe mapping a wire representation
      const globeMesh = new THREE.Mesh(
        new THREE.SphereGeometry(1.6, 16, 16),
        new THREE.MeshPhysicalMaterial({
          color: primaryHexColor,
          wireframe: true,
          roughness: 0.3,
          transparent: true,
          opacity: 0.6,
        })
      );
      group.add(globeMesh);

      // Ring structure similar to Saturn (technological stack layers)
      const ringGeo = new THREE.RingGeometry(2.4, 2.7, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.15,
      });
      const TechRing = new THREE.Mesh(ringGeo, ringMat);
      TechRing.rotation.x = Math.PI / 2.3;
      group.add(TechRing);

      // Orbit satellite particles representing framework channels (Android, iOS, Web)
      const satellitesGeo = new THREE.SphereGeometry(0.3, 8, 8);
      const satellitesMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const satelliteNodes: THREE.Mesh[] = [];
      const count = 3;

      for (let i = 0; i < count; i++) {
        const satNode = new THREE.Mesh(satellitesGeo, satellitesMat);
        group.add(satNode);
        satelliteNodes.push(satNode);
      }

      return {
        update: (time: number) => {
          globeMesh.rotation.y = time * 0.25;
          globeMesh.rotation.x = time * 0.08;
          TechRing.rotation.z = -time * 0.05;

          satelliteNodes.forEach((sat, i) => {
            const ang = time * 1.1 + (i * Math.PI * 2) / count;
            sat.position.x = Math.cos(ang) * 2.8;
            sat.position.y = Math.sin(ang * 0.5) * 0.8;
            sat.position.z = Math.sin(ang) * 2.8;
            sat.scale.setScalar(0.8 + Math.sin(time * 3 + i) * 0.25);
          });
          group.position.y = Math.sin(time * 1.2) * 0.12;
        },
      };
    };

    // Active design assignment selector execution
    let designHandler: { update: (time: number) => void } | null = null;
    switch (type) {
      case 'flutter-sphere':
        designHandler = buildFlutterSphere();
        break;
      case 'neural-orb':
        designHandler = buildNeuralOrb();
        break;
      case 'architecture-galaxy':
        designHandler = buildArchitectureGalaxy();
        break;
      case 'ai-brain-core':
        designHandler = buildAiBrainCore();
        break;
      case 'developer-planet':
        designHandler = buildDeveloperPlanet();
        break;
      default:
        designHandler = buildFlutterSphere();
        break;
    }

    // Interactive resize listener
    const handleResize = () => {
      const w = container.clientWidth || 192;
      const h = container.clientHeight || 192;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    const animateLoop = () => {
      const elapsed = clock.getElapsedTime();
      if (designHandler) {
        designHandler.update(elapsed);
      }
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animateLoop);
    };
    animateLoop();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      scene.clear();
      renderer.dispose();
    };
  }, [type, glowColor]);

  return <div ref={containerRef} className={`${className} bg-transparent pointer-events-none select-none`} />;
};
