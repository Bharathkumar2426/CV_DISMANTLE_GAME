# 🛸 Project Execution & Deployment Guide

This document contains full operational documentation, gameplay instructions, live deployment links, and environment troubleshooting for the **3D Computer Vision Gun & Mech Dismantle/Assembly Game**.

---

## 🌐 1. Live Deployment

The game is hosted and running in production on Vercel:

| Platform | Deployment URL | SSL / HTTPS Status | Hand Tracking Enabled |
| :--- | :--- | :--- | :--- |
| **Vercel** | **[https://cvassemblegame.vercel.app/](https://cvassemblegame.vercel.app/)** | ✅ Active (Valid SSL) | ✅ Full Support |

> [!IMPORTANT]
> **Webcam Security Policy**: Modern web browsers (Google Chrome, Microsoft Edge, Firefox, Brave, Safari) enforce strict security constraints on media devices. The camera API (`navigator.mediaDevices.getUserMedia`) only activates under secure contexts: **HTTPS** or `localhost`. The Vercel deployment above is fully certified with HTTPS.

---

## 🎮 2. How to Play

### Pre-Mission Phase
1. Open the application at [https://cvassemblegame.vercel.app/](https://cvassemblegame.vercel.app/).
2. Click **"Allow"** when the browser prompts for camera access.
3. Review the weapon selection (AWM, MP40, Nighthawk .50, Spectre 9, Valkyrie CQB).
4. Select your desired difficulty mode:
   - **Recruit (Easy)**: 120-second timer
   - **Veteran (Medium)**: 90-second timer
   - **Elite (Hard)**: 60-second timer
5. Click **"Deploy Mission"** to begin.

### In-Game Phase
1. **Target Inspection**: Use air gestures or mouse drag to rotate the weapon in 360° space.
2. **Component Acquisition**: Hover the hand reticle over a detached component.
3. **Pinch & Drag**: Pinch your thumb and index finger together to lock magnetic grip. Move your hand to translate the component toward the cyan holographic ghost silhouette.
4. **Assembly Snap**: Release the pinch when aligned with the ghost outline. When properly seated, the component will lock into place with audio chime and particle feedback.
5. **Completion**: Assemble all components before the mission clock reaches 00:00 to earn an arcade victory rating.

---

## 🖐️ 3. Computer Vision Controls & Fallbacks

| Interaction | Primary Gesture (Webcam) | Alternative (Mouse / Trackpad) |
| :--- | :--- | :--- |
| **Aim / Reticle** | Open palm facing camera | Move mouse across screen |
| **Grab Part** | Pinch (Thumb + Index tip contact) | Left Click & Hold |
| **Translate Part** | Move hand while maintaining pinch | Drag mouse while holding Left Click |
| **Release / Assemble** | Spread thumb and index apart | Release Left Mouse Button |
| **360° Rotate View** | Air wave or secondary hand swipe | Right Click / Two-finger drag |

---

## 💻 4. Running the Project Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (Version 18.x or 20.x recommended)
- A modern web browser with WebGL 2.0 and Webcam support

### Installation & Run Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Bharathkumar2426/CV_DISMANTLE_GAME.git
   cd CV_DISMANTLE_GAME
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start local development server**:
   ```bash
   npm run dev
   ```
   Open your browser to:
   ```
   http://localhost:5173/
   ```

4. **Production Build & Preview**:
   ```bash
   # Build optimized bundle
   npm run build

   # Preview the production bundle locally
   npm run preview
   ```

---

## 🛠️ 5. Technology Stack & Architecture

- **Rendering Engine**: [Three.js](https://threejs.org/) (r186) — Procedural PBR shaders, dynamic shadows, zero-gravity physics, and particle emitters.
- **Vision Pipeline**: Google MediaPipe Tasks Vision (`@mediapipe/tasks-vision`) — 21-point hand landmark model running on WebAssembly with CPU fallback.
- **Audio Synthesis**: Native Web Audio API — Real-time dynamic sine/sawtooth sound synthesis for cybernetic UI feedback (zero network asset latency).
- **Tooling & Bundler**: [Vite](https://vite.dev/) — Lightning-fast ES module bundling and asset optimization.
- **Deployment**: Vercel Edge Network with automated HTTP/2 and Brotli compression.

---

## 🔧 6. Troubleshooting & FAQs

### The camera does not turn on
- Ensure your browser has camera permission granted for `https://cvassemblegame.vercel.app/`.
- Check if another application (Zoom, Teams, OBS) is currently locking the camera.
- If no camera is available, the game seamlessly falls back to standard mouse/touch drag controls.

### Hand tracking is sluggish or laggy
- Ensure your room has balanced, adequate lighting. Harsh backlight can silhouette hands.
- Position your hand approximately 1.5 to 3 feet (0.5 to 1 meter) in front of the lens.
- Close heavy background applications to free GPU and WebAssembly worker threads.

### Assets or models fail to load
- All models and shaders are generated procedurally, meaning they do not rely on external 3D server endpoints. Weapon textures and icons use local relative paths bundled in the build.
