'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default function CosmosBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mountedRef = useRef(false);

  useEffect(() => {
    if (mountedRef.current || !containerRef.current) return;
    mountedRef.current = true;

    console.log('CosmosBackground: Initializing...');

    const container = containerRef.current;

    let scene: THREE.Scene,
        camera: THREE.PerspectiveCamera,
        renderer: THREE.WebGLRenderer,
        controls: OrbitControls;
    let stars: StarData[] = [];
    const starMeshes: THREE.Mesh[] = [];
    let raycaster: THREE.Raycaster,
        mouse: THREE.Vector2;
    let isAnimating = true;
    let selectedStar: THREE.Mesh | null = null;
    let animationId: number;

    interface StarData {
      name: string;
      ra: number;
      dec: number;
      magnitude: number;
      color: string;
      distance: number;
      risk?: number;
      return?: number;
      sharpe?: number;
    }

    const init = () => {
      if (!containerRef.current) return;

      console.log('CosmosBackground: Creating scene...');

      // Scene
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x000510);

      // Camera
      camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        10000
      );
      camera.position.set(0, 50, 200);

      // Renderer
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      containerRef.current.appendChild(renderer.domElement);

      // Controls
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.screenSpacePanning = false;
      controls.minDistance = 50;
      controls.maxDistance = 1000;

      // Raycaster for mouse interaction
      raycaster = new THREE.Raycaster();
      mouse = new THREE.Vector2();

      // Add ambient starfield background
      addBackgroundStars();

      // Add lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      // Event listeners
      window.addEventListener('resize', onWindowResize);
      window.addEventListener('click', onMouseClick);
      window.addEventListener('keydown', onKeyDown);
    };

    const addBackgroundStars = () => {
      const geometry = new THREE.BufferGeometry();
      const vertices = [];

      for (let i = 0; i < 5000; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        const radius = 800 + Math.random() * 200;

        vertices.push(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi)
        );
      }

      geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

      const material = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.5,
        transparent: true,
        opacity: 0.6
      });

      const backgroundStars = new THREE.Points(geometry, material);
      scene.add(backgroundStars);
    };

    const loadStarData = async () => {
      try {
        console.log('CosmosBackground: Loading star data...');
        const response = await fetch('/data.json');
        const data = await response.json();
        stars = data.stars;
        console.log(`CosmosBackground: Loaded ${stars.length} stars`);
        createStarField();
      } catch (error) {
        console.error('CosmosBackground: Error loading star data:', error);
      }
    };

    const raDecToCartesian = (ra: number, dec: number, distance: number) => {
      const raRad = (ra * Math.PI) / 180;
      const decRad = (dec * Math.PI) / 180;
      const scale = distance / 10;

      return new THREE.Vector3(
        scale * Math.cos(decRad) * Math.cos(raRad),
        scale * Math.sin(decRad),
        scale * Math.cos(decRad) * Math.sin(raRad)
      );
    };

    const createStarField = () => {
      stars.forEach((star: StarData, index: number) => {
        const position = raDecToCartesian(star.ra, star.dec, star.distance);
        const size = Math.max(0.1, 0.4 - star.magnitude * 0.1);

        const geometry = new THREE.SphereGeometry(size, 16, 16);
        const material = new THREE.MeshBasicMaterial({
          color: 0xffffff
        });

        const starMesh = new THREE.Mesh(geometry, material);
        starMesh.position.copy(position);
        starMesh.userData = { index, star };

        const glowGeometry = new THREE.SphereGeometry(size * 1.5, 16, 16);
        const glowMaterial = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.3
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        starMesh.add(glow);

        scene.add(starMesh);
        starMeshes.push(starMesh);
      });
    };

    const onWindowResize = () => {
      if (!camera || !renderer) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const onMouseClick = (event: MouseEvent) => {
      if (!camera || !raycaster) return;

      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(starMeshes);

      if (intersects.length > 0) {
        const star = intersects[0].object.userData.star;
        showStarInfo(star);

        if (selectedStar) {
          selectedStar.scale.set(1, 1, 1);
        }
        selectedStar = intersects[0].object as THREE.Mesh;
        selectedStar.scale.set(1.5, 1.5, 1.5);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        isAnimating = !isAnimating;
      }
    };

    const showStarInfo = (star: StarData) => {
      const infoPanel = document.getElementById('star-info');
      if (!infoPanel) return;

      let html = `<h3>${star.name}</h3>`;

      if (star.risk !== undefined && star.return !== undefined) {
        html += `
          <p><strong>Risk (σ):</strong> ${star.risk.toFixed(3)}</p>
          <p><strong>Return (μ):</strong> ${star.return.toFixed(3)}</p>
          <p><strong>Sharpe Ratio:</strong> ${star.sharpe !== undefined ? star.sharpe.toFixed(3) : 'N/A'}</p>
          <p style="margin-top: 10px; font-size: 11px; color: #888;">On Efficient Frontier</p>
        `;
      } else {
        html += `
          <p><strong>Magnitude:</strong> ${star.magnitude}</p>
          <p><strong>Distance:</strong> ${star.distance} light years</p>
          <p style="margin-top: 10px; font-size: 11px; color: #888;">Background star</p>
        `;
      }

      infoPanel.innerHTML = html;
      infoPanel.style.display = 'block';
    };

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      if (!renderer || !scene || !camera || !controls) return;

      if (isAnimating) {
        scene.rotation.y += 0.0002;

        starMeshes.forEach((mesh: THREE.Mesh, index: number) => {
          const time = Date.now() * 0.001;
          const scale = 1 + Math.sin(time + index) * 0.1;
          if (mesh !== selectedStar && mesh.children[0]) {
            mesh.children[0].scale.set(scale, scale, scale);
          }
        });
      }

      controls.update();
      renderer.render(scene, camera);
    };

    // Initialize everything
    init();
    loadStarData();
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', onWindowResize);
      window.removeEventListener('click', onMouseClick);
      window.removeEventListener('keydown', onKeyDown);

      if (animationId) {
        cancelAnimationFrame(animationId);
      }

      if (renderer && container && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
        renderer.dispose();
      }

      // Dispose geometries and materials
      starMeshes.forEach(mesh => {
        mesh.geometry.dispose();
        if (mesh.material instanceof THREE.Material) {
          mesh.material.dispose();
        }
      });
    };
  }, []);

  return (
    <>
      <div ref={containerRef} className="absolute inset-0 w-full h-full z-0" />
      <div
        id="star-info"
        className="fixed top-20 right-5 bg-black/90 text-white p-4 rounded-lg text-sm min-w-[250px] border-2 border-blue-400 hidden z-50"
      />
    </>
  );
}
