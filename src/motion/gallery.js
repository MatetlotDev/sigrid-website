import * as THREE from 'three';
import {
  getLenis,
  gsap,
  isTouch,
  prefersReducedMotion,
  whenPageVisible,
} from './core';

// A fixed, full-screen canvas that redraws every registered <img data-gl>
// as a textured plane, kept in sync with the element's position on screen.
// The DOM image stays in the layout (hidden) so sizing, events and
// accessibility keep working normally.

const vertexShader = /* glsl */ `
  uniform float uVelocity;
  uniform float uHover;
  uniform vec2 uMouse;

  varying vec2 vUv;

  #define PI 3.14159265

  void main() {
    vUv = uv;
    vec3 pos = position;

    // Scroll: the sheet bows like paper pulled through the air.
    pos.y -= sin(uv.x * PI) * uVelocity * 0.00045;

    vec4 world = modelMatrix * vec4(pos, 1.0);

    // Hover: a soft swell that follows the cursor.
    float d = distance(uv, uMouse);
    world.z += uHover * smoothstep(0.65, 0.0, d) * 28.0;

    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

const fragmentShader = /* glsl */ `
  uniform sampler2D uTexture;
  uniform vec2 uImageSize;
  uniform vec2 uPlaneSize;
  uniform vec2 uMouse;
  uniform float uHover;
  uniform float uVelocity;
  uniform float uReveal;
  uniform float uTime;

  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(41.37, 289.13))) * 13758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  // object-fit: cover, in UV space.
  vec2 cover(vec2 uv) {
    float planeRatio = uPlaneSize.x / uPlaneSize.y;
    float imageRatio = uImageSize.x / uImageSize.y;
    vec2 scale = planeRatio > imageRatio
      ? vec2(1.0, imageRatio / planeRatio)
      : vec2(planeRatio / imageRatio, 1.0);
    return (uv - 0.5) * scale + 0.5;
  }

  void main() {
    vec2 uv = vUv;

    // Settle from a slight zoom while revealing, zoom in a touch on hover,
    // drifting toward the cursor.
    float zoom = 1.0 - 0.18 * (1.0 - uReveal) - 0.07 * uHover;
    vec2 focus = mix(vec2(0.5), uMouse, 0.35 * uHover);
    uv = (uv - focus) * zoom + focus;
    uv = cover(uv);

    // Chromatic split proportional to scroll speed.
    vec2 shift = vec2(0.0, clamp(uVelocity, -60.0, 60.0) * 0.00012);
    float r = texture2D(uTexture, uv + shift).r;
    float g = texture2D(uTexture, uv).g;
    float b = texture2D(uTexture, uv - shift).b;
    vec3 color = vec3(r, g, b);

    // Organic, paint-like wipe from the bottom edge.
    float n = noise(vUv * vec2(5.0, 2.5) + uTime * 0.15) - 0.5;
    float edge = uReveal * 1.35 - 0.15;
    float alpha = 1.0 - smoothstep(edge - 0.08, edge, vUv.y + n * 0.16);

    gl_FragColor = vec4(color, alpha);
  }
`;

class Gallery {
  constructor() {
    this.items = new Map();
    this.velocity = 0;
    this.loader = new THREE.TextureLoader();
    this.textures = new Map();

    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x000000, 0);

    const canvas = this.renderer.domElement;
    Object.assign(canvas.style, {
      position: 'fixed',
      inset: '0',
      width: '100vw',
      height: '100vh',
      pointerEvents: 'none',
      zIndex: '1',
    });
    canvas.setAttribute('aria-hidden', 'true');
    document.body.appendChild(canvas);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, 1, 10, 3000);
    this.camera.position.z = 800;
    this.geometry = new THREE.PlaneGeometry(1, 1, 32, 32);

    this.observer = new IntersectionObserver(this.onIntersect, {
      rootMargin: '0px 0px -8% 0px',
    });

    this.resize();
    window.addEventListener('resize', this.resize);

    getLenis();
    gsap.ticker.add(this.render);
    document.documentElement.classList.add('is-webgl');
  }

  resize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.width = width;
    this.height = height;
    this.renderer.setSize(width, height, false);
    this.camera.aspect = width / height;
    // One world unit equals one CSS pixel at z = 0.
    this.camera.fov =
      2 * Math.atan(height / 2 / this.camera.position.z) * (180 / Math.PI);
    this.camera.updateProjectionMatrix();
  };

  loadTexture(src) {
    if (!this.textures.has(src)) {
      this.textures.set(
        src,
        new Promise((resolve, reject) => {
          this.loader.load(
            src,
            (texture) => {
              texture.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
              resolve(texture);
            },
            undefined,
            reject
          );
        })
      );
    }
    return this.textures.get(src);
  }

  add(element, src, onSize) {
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      uniforms: {
        uTexture: { value: null },
        uImageSize: { value: new THREE.Vector2(1, 1) },
        uPlaneSize: { value: new THREE.Vector2(1, 1) },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uHover: { value: 0 },
        uVelocity: { value: 0 },
        uReveal: { value: 0 },
        uTime: { value: 0 },
      },
    });
    const mesh = new THREE.Mesh(this.geometry, material);
    mesh.visible = false;
    this.scene.add(mesh);

    const item = { element, mesh, material, loaded: false, inView: false };
    this.items.set(element, item);

    this.loadTexture(src)
      .then((texture) => {
        if (!this.items.has(element)) return;
        material.uniforms.uTexture.value = texture;
        material.uniforms.uImageSize.value.set(
          texture.image.width,
          texture.image.height
        );
        item.loaded = true;
        onSize?.(texture.image.width, texture.image.height);
        this.maybeReveal(item);
      })
      .catch(() => {
        // Fall back to the plain DOM image.
        element.removeAttribute('data-gl');
      });

    // Hover effects follow a mouse only: on touch screens a tap would swell
    // the painting and snap it back on release.
    const isMouse = (event) => event.pointerType === 'mouse';
    const onEnter = (event) =>
      isMouse(event) &&
      gsap.to(material.uniforms.uHover, {
        value: 1,
        duration: 0.9,
        ease: 'power3.out',
      });
    const onLeave = (event) =>
      isMouse(event) &&
      gsap.to(material.uniforms.uHover, {
        value: 0,
        duration: 0.9,
        ease: 'power3.out',
      });
    const onMove = (event) => {
      if (!isMouse(event)) return;
      const rect = element.getBoundingClientRect();
      gsap.to(material.uniforms.uMouse.value, {
        x: (event.clientX - rect.left) / rect.width,
        y: 1 - (event.clientY - rect.top) / rect.height,
        duration: 0.6,
        ease: 'power2.out',
      });
    };
    element.addEventListener('pointerenter', onEnter);
    element.addEventListener('pointerleave', onLeave);
    element.addEventListener('pointermove', onMove);

    const cancelGate = whenPageVisible(() => this.observer.observe(element));

    return () => {
      cancelGate();
      this.observer.unobserve(element);
      element.removeEventListener('pointerenter', onEnter);
      element.removeEventListener('pointerleave', onLeave);
      element.removeEventListener('pointermove', onMove);
      gsap.killTweensOf(material.uniforms.uReveal);
      gsap.killTweensOf(material.uniforms.uHover);
      gsap.killTweensOf(material.uniforms.uMouse.value);
      this.scene.remove(mesh);
      material.dispose();
      this.items.delete(element);
    };
  }

  onIntersect = (entries) => {
    entries.forEach((entry) => {
      const item = this.items.get(entry.target);
      if (!item || !entry.isIntersecting) return;
      item.inView = true;
      this.observer.unobserve(entry.target);
      this.maybeReveal(item);
    });
  };

  maybeReveal(item) {
    if (!item.loaded || !item.inView || item.revealed) return;
    item.revealed = true;
    gsap.to(item.material.uniforms.uReveal, {
      value: 1,
      duration: 1.8,
      ease: 'power3.out',
    });
  }

  render = (time) => {
    const lenis = getLenis();
    // Touch scrolling is native and jerky: keep the paintings flat there.
    const target = lenis && !isTouch ? lenis.velocity : 0;
    this.velocity += (target - this.velocity) * 0.12;

    this.items.forEach((item) => {
      const rect = item.element.getBoundingClientRect();
      const visible =
        item.loaded &&
        rect.width > 0 &&
        rect.bottom > -100 &&
        rect.top < this.height + 100;

      item.mesh.visible = visible;
      if (!visible) return;

      const { uniforms } = item.material;
      item.mesh.scale.set(rect.width, rect.height, 1);
      item.mesh.position.set(
        rect.left + rect.width / 2 - this.width / 2,
        this.height / 2 - rect.top - rect.height / 2,
        0
      );
      uniforms.uPlaneSize.value.set(rect.width, rect.height);
      uniforms.uVelocity.value = this.velocity;
      uniforms.uTime.value = time;
    });

    this.renderer.render(this.scene, this.camera);
  };
}

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

let gallery;

export function getGallery() {
  if (gallery === undefined) {
    gallery = !prefersReducedMotion && supportsWebGL() ? new Gallery() : null;
  }
  return gallery;
}
