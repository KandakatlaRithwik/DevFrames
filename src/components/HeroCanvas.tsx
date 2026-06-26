import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [shouldRender3D, setShouldRender3D] = useState(false);

  // 1. Feature detection: check for prefers-reduced-motion, mobile, and WebGL support
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setShouldRender3D(false);
      return;
    }

    // Check mobile screen size (typically <768px for disabling heavy 3D)
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      setShouldRender3D(false);
      return;
    }

    // Check WebGL support
    try {
      const canvas = document.createElement("canvas");
      const supportsWebGL = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
      );
      if (!supportsWebGL) {
        setShouldRender3D(false);
        return;
      }
    } catch (e) {
      setShouldRender3D(false);
      return;
    }

    // If all checks pass, lazy mount after the component is in view
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldRender3D(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 2. Three.js Initialization & Animation Loop
  useEffect(() => {
    if (!shouldRender3D || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!container) return;

    // Get current container size
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Create Scene
    const scene = new THREE.Scene();

    // Create Camera - Orthographic-like perspective camera
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    camera.position.set(0, 0, 9);

    // Create Renderer with antialiasing and transparency
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // --- Create 3D Architectural Abstract Composition ---
    const group = new THREE.Group();

    // Shared physical materials in our pastel palette
    const materialBlue = new THREE.MeshPhysicalMaterial({
      color: 0x8ca8c6, // Slate blue
      roughness: 0.7,
      metalness: 0.05,
      clearcoat: 0.1,
    });

    const materialRose = new THREE.MeshPhysicalMaterial({
      color: 0xe6c9d8, // Soft rose
      roughness: 0.65,
      metalness: 0.05,
      clearcoat: 0.1,
    });

    const materialCream = new THREE.MeshPhysicalMaterial({
      color: 0xf5efeb, // Cream
      roughness: 0.75,
      metalness: 0.02,
      clearcoat: 0.1,
    });

    // 1. Base Platform
    const baseGeo = new THREE.BoxGeometry(4.2, 0.12, 1.8);
    const base = new THREE.Mesh(baseGeo, materialCream);
    base.position.y = -1.2;
    base.receiveShadow = true;
    group.add(base);

    // 2. Frame structure (Hollow Portal)
    const portalGroup = new THREE.Group();
    const pillarGeo = new THREE.BoxGeometry(0.18, 2.0, 0.18);
    const topGeo = new THREE.BoxGeometry(1.6, 0.18, 0.18);

    const leftPillar = new THREE.Mesh(pillarGeo, materialBlue);
    leftPillar.position.set(-0.7, 0.9, 0);
    leftPillar.castShadow = true;
    leftPillar.receiveShadow = true;

    const rightPillar = new THREE.Mesh(pillarGeo, materialBlue);
    rightPillar.position.set(0.7, 0.9, 0);
    rightPillar.castShadow = true;
    rightPillar.receiveShadow = true;

    const topBar = new THREE.Mesh(topGeo, materialBlue);
    topBar.position.set(0, 1.9, 0);
    topBar.castShadow = true;
    topBar.receiveShadow = true;

    portalGroup.add(leftPillar, rightPillar, topBar);
    portalGroup.position.set(-0.6, -1.2, 0.2); // Positioned on base
    group.add(portalGroup);

    // 3. Curved Arch (Half ring)
    const archGroup = new THREE.Group();
    // We construct a simple visual arch using columns and a torus top
    const colGeo = new THREE.CylinderGeometry(0.1, 0.1, 1.2, 32);
    const archTopGeo = new THREE.TorusGeometry(0.5, 0.1, 16, 100, Math.PI); // Half ring

    const leftCol = new THREE.Mesh(colGeo, materialRose);
    leftCol.position.set(-0.5, 0.6, 0);
    leftCol.castShadow = true;
    leftCol.receiveShadow = true;

    const rightCol = new THREE.Mesh(colGeo, materialRose);
    rightCol.position.set(0.5, 0.6, 0);
    rightCol.castShadow = true;
    rightCol.receiveShadow = true;

    const archTop = new THREE.Mesh(archTopGeo, materialRose);
    archTop.position.set(0, 1.2, 0);
    archTop.castShadow = true;
    archTop.receiveShadow = true;

    archGroup.add(leftCol, rightCol, archTop);
    archGroup.position.set(0.8, -1.2, -0.3); // Back-right position
    group.add(archGroup);

    // 4. Floating Spheres
    const sphereGeo1 = new THREE.SphereGeometry(0.38, 64, 64);
    const sphere1 = new THREE.Mesh(sphereGeo1, materialCream);
    sphere1.position.set(-0.6, 0.2, 0.2); // Floating inside the portal
    sphere1.castShadow = true;
    group.add(sphere1);

    const sphereGeo2 = new THREE.SphereGeometry(0.2, 32, 32);
    const sphere2 = new THREE.Mesh(sphereGeo2, materialBlue);
    sphere2.position.set(0.8, 0.7, -0.3); // Hovering above the arch
    sphere2.castShadow = true;
    group.add(sphere2);

    // 5. Cylindrical Step / Column
    const cylinderGeo = new THREE.CylinderGeometry(0.25, 0.25, 0.8, 32);
    const stepColumn = new THREE.Mesh(cylinderGeo, materialCream);
    stepColumn.position.set(1.4, -0.8, 0.4);
    stepColumn.castShadow = true;
    stepColumn.receiveShadow = true;
    group.add(stepColumn);

    scene.add(group);

    // Slightly angle the group initially for composition view
    group.rotation.set(0.12, -0.35, 0);

    // Soft Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xfff8f2, 1.0);
    scene.add(ambientLight);

    const roseLight = new THREE.DirectionalLight(0xe6c9d8, 2.5);
    roseLight.position.set(-5, 4, 3);
    roseLight.castShadow = true;
    roseLight.shadow.mapSize.width = 1024;
    roseLight.shadow.mapSize.height = 1024;
    scene.add(roseLight);

    const blueLight = new THREE.DirectionalLight(0x7fa9d1, 3.0);
    blueLight.position.set(5, 5, 2);
    blueLight.castShadow = true;
    scene.add(blueLight);

    // Smooth Cursor Tracking state
    const mouse = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      mouse.x = x * 2 - 1;
      mouse.y = -(y * 2 - 1);
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Gentle floating loops for individual floating objects
      sphere1.position.y = 0.1 + Math.sin(elapsedTime * 1.2) * 0.12;
      sphere2.position.y = 0.8 + Math.sin(elapsedTime * 1.5 + 1.0) * 0.08;

      // Floating base group movement
      group.position.y = Math.sin(elapsedTime * 0.6) * 0.08;

      // Smooth mouse lerping
      target.x += (mouse.x - target.x) * 0.05;
      target.y += (mouse.y - target.y) * 0.05;

      // Get scroll percentage of hero area
      const scrollPercent = typeof window !== "undefined" ? Math.max(0, Math.min(1.5, window.scrollY / window.innerHeight)) : 0;

      // Apply subtle cursor tilting + scroll-scrubbed rotation (2.0 radians max rotation)
      group.rotation.y = -0.35 + target.x * 0.28 + scrollPercent * 2.0;
      group.rotation.x = 0.12 - target.y * 0.2 + scrollPercent * 0.5;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      resizeObserver.disconnect();
      baseGeo.dispose();
      pillarGeo.dispose();
      topGeo.dispose();
      colGeo.dispose();
      archTopGeo.dispose();
      sphereGeo1.dispose();
      sphereGeo2.dispose();
      cylinderGeo.dispose();
      materialBlue.dispose();
      materialRose.dispose();
      materialCream.dispose();
      renderer.dispose();
    };
  }, [shouldRender3D]);

  return (
    <div
      ref={containerRef}
      className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[24px] bg-gradient-to-tr from-bg-elevated/20 to-bg-elevated/40 border border-hairline shadow-subtle"
    >
      {shouldRender3D ? (
        <canvas ref={canvasRef} className="h-full w-full touch-none" />
      ) : (
        // Non-3D Premium Static Fallback for reduced motion, mobile, or initial load
        <div className="group relative flex h-full w-full items-center justify-center bg-bg-elevated/10">
          <div className="absolute size-56 animate-pulse rounded-full bg-gradient-to-tr from-accent/15 to-accent-secondary/15 blur-3xl pointer-events-none" />
          <svg
            viewBox="0 0 200 200"
            className="size-48 text-accent opacity-85 transition-transform duration-1000 group-hover:scale-105"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="100"
              cy="100"
              r="70"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeDasharray="4 4"
            />
            <path
              d="M 60 140 L 60 70 A 40 40 0 0 1 140 70 L 140 140"
              stroke="var(--color-accent-secondary)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line x1="40" y1="140" x2="160" y2="140" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="100" cy="90" r="14" fill="var(--color-accent-secondary)" opacity="0.9" />
          </svg>
        </div>
      )}
    </div>
  );
}
