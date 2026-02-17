import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default function Construct() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 5);

    // Renderer (Transparent)
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true // 🔥 transparent background
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0); // fully transparent
    container.appendChild(renderer.domElement);

    // Lights (important for visibility)
    scene.add(new THREE.AmbientLight(0xffffff, 1.5));

    const dirLight = new THREE.DirectionalLight(0xffffff, 2);
    dirLight.position.set(5, 10, 5);
    scene.add(dirLight);

    // Controls (optional but smooth)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = false;

    // Animation mixer
    let mixer;
    const clock = new THREE.Clock();

    // Load Model
    const loader = new GLTFLoader();
    loader.load(
      "/models/construct.glb",
      (gltf) => {
        const model = gltf.scene;
        model.scale.set(1, 1, 1); // 2x bigger

        scene.add(model);

        // Center & scale automatically
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        model.position.sub(center);

        const maxDim = Math.max(size.x, size.y, size.z);
        model.scale.setScalar(2 / maxDim);

        // 🔥 Play animations if present
        if (gltf.animations && gltf.animations.length) {
          mixer = new THREE.AnimationMixer(model);
          gltf.animations.forEach((clip) => {
            mixer.clipAction(clip).play();
          });
        }
      },
      undefined,
      (error) => console.error("Model load error:", error)
    );

    // Resize handler
    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // Animate loop
    let frameId;
    const animate = () => {
      frameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      if (mixer) mixer.update(delta);

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="w-[350px] h-[350px] overflow-visible" />;
}
