# 🛸 Gesture Assembly Challenge

An interactive, futuristic 3D computer vision assembly game built for college technology-club demonstrations. Players use real-time webcam hand gestures (or mouse fallback) to grab suspended, floating components of a fictional sci-fi **Quantum Warp Injector MK-VII** and assemble it in 3D space before the countdown expires.

---

## ⚡ Key Highlights

- **3D Mechanical Device:** Fictional, nonfunctional sci-fi mechanical prop composed of 8 distinct procedural components with realistic metallic PBR shaders, dynamic shadows, and glowing energy accents.
- **Exploded View & Ghost Silhouette:** Components hover dynamically in zero-gravity with sinusoidal floating animations. A holographic cyan ghost wireframe/silhouette indicates target arrangement.
- **Real-Time Hand Tracking:** Powered by **MediaPipe Hand Landmarker** (21 landmarks). Detects thumb-and-index pinch gestures to grab, drag in 3D, and snap parts into place.
- **Dual Input Modes:** Seamless automatic mouse & touch fallback if a webcam is not available or in poor lighting.
- **Synthesized Audio:** High-tech procedural sound effects generated live via the Web Audio API (zero audio files to download).
- **Arcade UI & Scoring:** Cyberpunk dark navy and neon cyan HUD, segmented reactor integration bar, multi-difficulty modes (Easy 120s, Medium 90s, Hard 60s), persistent local high scores, and victory celebrations.

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

### 3. Open in Google Chrome
Navigate to:
```
http://localhost:5173/
```
Or simply double-click `run_game.bat` in the project folder.

---

## 🛠️ Tech Stack

- **3D Graphics:** [Three.js](https://threejs.org/) (r186)
- **Computer Vision:** [@mediapipe/tasks-vision](https://developers.google.com/mediapipe/solutions/vision/hand_landmarker)
- **Audio:** Web Audio API (procedural synth oscillators)
- **Bundler:** [Vite](https://vite.dev/)
- **Effects:** [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)
