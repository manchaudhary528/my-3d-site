import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Background3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030712, 0.0018);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 400;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Particle Cloud (Cyan & Deep Blue Cyber Constellation)
    const particleCount = window.innerWidth < 768 ? 200 : 450;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(0x38bdf8); // Sky / Cyan
    const color2 = new THREE.Color(0x2563eb); // Royal Blue
    const color3 = new THREE.Color(0x818cf8); // Indigo/Purple accent

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 1200;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1200;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 1000;

      const mixed = Math.random() > 0.6 ? color1 : Math.random() > 0.3 ? color2 : color3;
      colors[i * 3] = mixed.r;
      colors[i * 3 + 1] = mixed.g;
      colors[i * 3 + 2] = mixed.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle texture
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, 'rgba(255,255,255,1)');
      grad.addColorStop(0.3, 'rgba(56,189,248,0.8)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 16, 16);
    }
    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 4,
      vertexColors: true,
      map: texture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Floating 3D Geometric Wireframes (like in the blueprints: cubes, octahedrons)
    const cubesGroup = new THREE.Group();
    const cubeGeom = new THREE.BoxGeometry(22, 22, 22);
    const octaGeom = new THREE.OctahedronGeometry(18);
    const wireMat1 = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true, transparent: true, opacity: 0.22 });
    const wireMat2 = new THREE.MeshBasicMaterial({ color: 0x6366f1, wireframe: true, transparent: true, opacity: 0.18 });

    const floatingMeshes: { mesh: THREE.Mesh; rotSpeed: { x: number; y: number; z: number } }[] = [];

    for (let i = 0; i < 7; i++) {
      const isCube = i % 2 === 0;
      const mesh = new THREE.Mesh(isCube ? cubeGeom : octaGeom, i % 3 === 0 ? wireMat2 : wireMat1);
      mesh.position.set(
        (Math.random() - 0.5) * 900,
        (Math.random() - 0.5) * 700,
        (Math.random() - 0.5) * 400 - 100
      );
      cubesGroup.add(mesh);
      floatingMeshes.push({
        mesh,
        rotSpeed: {
          x: (Math.random() - 0.5) * 0.012,
          y: (Math.random() - 0.5) * 0.012,
          z: (Math.random() - 0.5) * 0.008,
        }
      });
    }
    scene.add(cubesGroup);

    // Mouse Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      mouseX = (e.clientX - windowHalfX) * 0.08;
      mouseY = (e.clientY - windowHalfY) * 0.08;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      targetX += (mouseX - targetX) * 0.03;
      targetY += (mouseY - targetY) * 0.03;

      camera.position.x = targetX;
      camera.position.y = -targetY;
      camera.lookAt(scene.position);

      particles.rotation.y += 0.0006;
      particles.rotation.x += 0.0003;

      floatingMeshes.forEach(item => {
        item.mesh.rotation.x += item.rotSpeed.x;
        item.mesh.rotation.y += item.rotSpeed.y;
        item.mesh.rotation.z += item.rotSpeed.z;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      texture.dispose();
      cubeGeom.dispose();
      octaGeom.dispose();
      wireMat1.dispose();
      wireMat2.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
};
