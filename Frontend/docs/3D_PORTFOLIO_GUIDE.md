# 3D Opening Laptop Experience (`/lab`)

This document outlines how to configure, customize, and extend the 3D scroll-driven laptop experience rendered at `/lab`.

---

## 1. Where to Change the 3D Model Path

The laptop component supports loading an external `.glb` file while seamlessly falling back to a custom-modeled procedural aluminum laptop if no file is present.

- **Default path:** Place your model at `/public/models/laptop.glb`.
- **Code file:** `Frontend/src/components/3d/Laptop.tsx`
  - In `Laptop.tsx`, change `modelUrl = '/models/laptop.glb'` to your desired path.
  - The loader inspects the node tree for keywords (`lid`, `screen`, `display`, `top`) to automatically attach the hinge rotation.
  - If your GLTF uses specific node names, you can customize the hinge search inside `GLTFModelLaptop` in `Laptop.tsx`.

---

## 2. Where to Tweak Scroll Ranges & Camera Positions

All timeline scroll thresholds, lid angles, and camera coordinates are cleanly defined and commented at the top of:
`Frontend/src/components/3d/LaptopScene.tsx`

### Scroll Timeline Ranges (`SCROLL_TIMELINE`)
```ts
const SCROLL_TIMELINE = {
  LID_OPEN_START: 0.0,
  LID_OPEN_END: 0.35,      // 0.00 – 0.35: Lid opens from closed (0°) to open (~105°)
  DOLLY_START: 0.35,
  DOLLY_END: 0.70,         // 0.35 – 0.70: Camera dollies in to frame the screen
  INTERACTIVE_START: 0.70, // 0.70 – 1.00: Screen interactive & project cards scroll
  INTERACTIVE_END: 1.0,
};
```

### Lid Opening Angles (`LID_CONFIG`)
```ts
const LID_CONFIG = {
  CLOSED_RAD: 0.0,                 // 0 degrees (flat closed)
  OPEN_RAD: (105 * Math.PI) / 180, // 105 degrees open (~1.8326 radians)
  DAMPING_SPEED: 12,               // Smoothness speed for THREE.MathUtils.damp
};
```

### Camera Positions & Targets (`CAMERA_CONFIG`)
```ts
const CAMERA_CONFIG = {
  START_POS: new THREE.Vector3(0, 1.8, 4.2),    // Initial closed overview position
  START_TARGET: new THREE.Vector3(0, 0.0, 0.2),  // Initial camera focus target
  LID_OPEN_POS: new THREE.Vector3(0, 1.4, 3.8),  // Position when lid finishes opening
  LID_OPEN_TARGET: new THREE.Vector3(0, 0.3, 0.0),
  END_POS: new THREE.Vector3(0, 1.22, 1.18),    // Close dolly-in framing the screen
  END_TARGET: new THREE.Vector3(0, 0.72, -0.78),
  CAMERA_DAMPING_SPEED: 10,
  PARALLAX_STRENGTH_X: 0.12,                     // Cursor parallax horizontal strength
  PARALLAX_STRENGTH_Y: 0.08,                     // Cursor parallax vertical strength
};
```

---

## 3. How to Add a New Project

Project data is decoupled and shared across both the 3D interactive screen and the 2D accessibility/fallback list.

- **Data file:** `Frontend/src/data/projects.ts`
- Add an object to the `projects` array adhering to the `Project` interface:

```ts
{
  id: 'my-project-id',
  title: 'Project Title',
  description: 'A concise summary of the project architecture and features.',
  tech: ['Next.js', 'TypeScript', 'TailwindCSS'],
  role: 'Frontend Architect',
  link: 'https://example.com',
  github: 'https://github.com/AdityaXD007/example', // optional
  image: '/assets/preview.png',                     // optional
}
```

---

## 4. Performance & Accessibility Features

- **Dynamic DPR:** Monitored with `@react-three/drei`'s `PerformanceMonitor`, automatically scaling DPR between 1x and 2x to ensure steady 60fps across varied GPUs.
- **Low-End & Reduced Motion Fallback:** Automatically detects `prefers-reduced-motion`, `navigator.hardwareConcurrency <= 4`, `navigator.deviceMemory <= 2`, or missing WebGL, smoothly rendering the 2D `<ProjectsList />`.
- **SEO & Screen Readers:** Real semantic HTML is present directly in the DOM, while the `<Canvas>` is marked `aria-hidden="true"`.
- **Keyboard Navigation:** Tab focus rings are styled with `focus:ring-2 focus:ring-indigo-400`.

