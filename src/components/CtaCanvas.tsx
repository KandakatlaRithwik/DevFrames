import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export function CtaCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [shouldRender3D, setShouldRender3D] = useState(false);

  // 1. Feature detection and lazy mounting
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setShouldRender3D(false);
      return;
    }

    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      setShouldRender3D(false);
      return;
    }

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

  // 2. Three.js scene setup
  useEffect(() => {
    if (!shouldRender3D || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);

    const group = new THREE.Group();

    // Soft Physical Materials
    const materialBlue = new THREE.MeshPhysicalMaterial({
      color: 0x7fa9d1, // Blue accent
      roughness: 0.6,
      metalness: 0.1,
      clearcoat: 0.3,
      clearcoatRoughness: 0.1,
    });

    const materialRose = new THREE.MeshPhysicalMaterial({
      color: 0xe6c9d8, // Rose accent
      roughness: 0.5,
      metalness: 0.05,
      clearcoat: 0.4,
    });

    const materialCream = new THREE.MeshPhysicalMaterial({
      color: 0xf5efeb,
      roughness: 0.7,
      metalness: 0.02,
    });

    // Central Sphere (slow morphing/spinning centerpiece)
    const sphereGeo = new THREE.SphereGeometry(1.2, 64, 64);
    const sphere = new THREE.Mesh(sphereGeo, materialBlue);
    group.add(sphere);

    // Torus Ring representing orbit / completion
    const torusGeo = new THREE.TorusGeometry(1.8, 0.08, 16, 100);
    const ring = new THREE.Mesh(torusGeo, materialRose);
    ring.rotation.x = Math.PI / 2.3;
    group.add(ring);

    // Small Satellite Sphere
    const satGeo = new THREE.SphereGeometry(0.25, 32, 32);
    const satellite = new THREE.Mesh(satGeo, materialCream);
    satellite.position.set(2.0, 0.4, -0.5);
    group.add(satellite);

    scene.add(group);
    group.rotation.set(0.2, -0.2, 0);

    // Light Setup
    const ambientLight = new THREE.AmbientLight(0xfff8f2, 1.2);
    scene.add(ambientLight);

    const roseLight = new THREE.DirectionalLight(0xe6c9d8, 3.5);
    roseLight.position.set(-4, 3, 2);
    scene.add(roseLight);

    const blueLight = new THREE.DirectionalLight(0x7fa9d1, 4.0);
    blueLight.position.set(4, 4, 3);
    scene.add(blueLight);

    // Cursor position tracking
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

    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Slow spinning and orbital loops
      sphere.rotation.y = elapsedTime * 0.15;
      sphere.rotation.x = elapsedTime * 0.08;

      ring.rotation.z = -elapsedTime * 0.1;
      
      // Orbiting satellite path
      satellite.position.x = Math.cos(elapsedTime * 0.8) * 2.2;
      satellite.position.z = Math.sin(elapsedTime * 0.8) * 2.2 - 0.5;
      satellite.position.y = Math.sin(elapsedTime * 0.4) * 0.5;

      // Mouse tracking interpolation
      target.x += (mouse.x - target.x) * 0.05;
      target.y += (mouse.y - target.y) * 0.05;

      // Tie scale & rotation to scroll proximity
      if (typeof window !== "undefined" && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const viewProgress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
        group.scale.setScalar(0.4 + viewProgress * 0.6);
        group.rotation.y = -0.2 + target.x * 0.22 + (1 - viewProgress) * 1.5;
        group.rotation.x = 0.2 - target.y * 0.18;
      } else {
        group.rotation.y = -0.2 + target.x * 0.22;
        group.rotation.x = 0.2 - target.y * 0.18;
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      resizeObserver.disconnect();
      sphereGeo.dispose();
      torusGeo.dispose();
      satGeo.dispose();
      materialBlue.dispose();
      materialRose.dispose();
      materialCream.dispose();
      renderer.dispose();
    };
  }, [shouldRender3D]);

  return (
    <div
      ref={containerRef}
      className="relative flex h-64 w-full items-center justify-center overflow-hidden rounded-[20px] bg-gradient-to-tr from-white/[0.01] to-white/[0.03] border border-white/5 shadow-inner md:h-72"
    >
      {shouldRender3D ? (
        <canvas ref={canvasRef} className="h-full w-full touch-none" />
      ) : (
        // High fidelity SVG fallback
        <div className="group relative flex h-full w-full items-center justify-center">
          <div className="absolute size-44 rounded-full bg-gradient-to-tr from-[#7fa9d1]/10 to-[#e6c9d8]/10 blur-2xl animate-pulse" />
          <svg
            viewBox="0 0 200 200"
            className="size-36 text-[#7fa9d1]/80 transition-transform duration-1000 group-hover:scale-105"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="100" cy="100" r="45" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="100" cy="100" r="30" stroke="var(--color-accent-secondary)" strokeWidth="1.5" />
            <circle cx="150" cy="80" r="8" fill="var(--color-accent-secondary)" opacity="0.8" />
            <path
              d="M 50 100 A 50 40 45 0 1 150 100"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      )}
    </div>
  );
}
