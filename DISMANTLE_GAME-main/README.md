# 🛸 Gesture Assembly Challenge

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-success?style=for-the-badge&logo=vercel)](https://cvassemblegame.vercel.app/)
[![Three.js](https://img.shields.io/badge/Three.js-r186-black?style=for-the-badge&logo=three.js)](https://threejs.org/)
[![MediaPipe](https://img.shields.io/badge/AI-MediaPipe%20Vision-00C4B4?style=for-the-badge&logo=google)](https://developers.google.com/mediapipe)

An interactive, futuristic 3D computer vision assembly game. Players use real-time webcam hand gestures (or mouse fallback) to grab suspended, floating components of mechanical devices and assemble them in 3D space before the countdown expires.

🔗 **Play Live**: [https://cvassemblegame.vercel.app/](https://cvassemblegame.vercel.app/)

---

## ⚡ Key Highlights

- **3D Mechanical Device:** Procedural components with realistic metallic PBR shaders, dynamic shadows, and glowing energy accents.
- **Exploded View & Ghost Silhouette:** Components hover dynamically in zero-gravity. A holographic cyan ghost wireframe/silhouette indicates target arrangement.
- **Real-Time Hand Tracking:** Powered by **MediaPipe Hand Landmarker** (21 landmarks). Detects thumb-and-index pinch gestures to grab, drag in 3D, and snap parts into place.
- **Dual Input Modes:** Seamless automatic mouse & touch fallback if a webcam is not available or in poor lighting.
- **Synthesized Audio:** High-tech procedural sound effects generated live via the Web Audio API (zero audio files to download).
- **Arcade UI & Scoring:** Clean cyber-military HUD, segmented integration bar, multi-difficulty modes, persistent local high scores, and victory celebrations.

---

## 🖐️ Gesture Control Scheme

| Gesture | Physical Action | Visual Feedback | Action in Game |
| :--- | :--- | :--- | :--- |
| **Open Palm** | Fingers extended | Cyan reticle | Aim reticle over floating components |
| **Pinch** | Thumb tip + Index tip together | Emerald reticle + shrunk rings | Grab component beneath cursor |
| **Hold & Drag** | Move hand while pinching | Green magnetic guidance tether | Move component freely in 3D space |
| **Release Pinch** | Open fingers near ghost target | Sound chime + particle flash | Snap component into place |
| **Mouse Drag** | Click and drag with mouse | Crosshair indicator | Backup 3D manipulation |

---

## 🚀 Quick Start (Windows PowerShell)

### 1. Install Dependencies
```powershell
npm install
```

### 2. Run the Development Server
```powershell
npm run dev
```

### 3. Open in Browser
Navigate to `http://localhost:5173/` or launch the live production deployment at [https://cvassemblegame.vercel.app/](https://cvassemblegame.vercel.app/).

---

## 🛠️ Tech Stack

- **3D Graphics:** [Three.js](https://threejs.org/) (r186)
- **Computer Vision:** [@mediapipe/tasks-vision](https://developers.google.com/mediapipe/solutions/vision/hand_landmarker)
- **Audio:** Web Audio API (procedural synth oscillators)
- **Bundler:** [Vite](https://vite.dev/)
- **Effects:** [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)
