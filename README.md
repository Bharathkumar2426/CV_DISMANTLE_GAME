# 🛸 3D Computer Vision Gun / Mech Dismantle & Assembly Game

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-success?style=for-the-badge&logo=vercel)](https://cvassemblegame.vercel.app/)
[![Three.js](https://img.shields.io/badge/Three.js-r186-black?style=for-the-badge&logo=three.js)](https://threejs.org/)
[![MediaPipe](https://img.shields.io/badge/AI-MediaPipe%20Vision-00C4B4?style=for-the-badge&logo=google)](https://developers.google.com/mediapipe)

An interactive, high-fidelity 3D computer vision assembly and dismantling game. Players use real-time webcam AI hand gestures (or mouse fallback) to interact with 3D components, rotate them 360°, inspect weapon schematics, and assemble parts before the timer runs out.

🔗 **Play Live**: [https://cvassemblegame.vercel.app/](https://cvassemblegame.vercel.app/)

---

## ⚡ Features

- **Real-Time Hand Tracking:** Powered by Google MediaPipe Tasks Vision (21 landmarks). Detects pinch gestures, air drags, and 360° rotational gestures.
- **Interactive 3D Engine:** High-performance Three.js procedural metallic PBR shaders, dynamic lighting, and deep atmospheric space background.
- **Armory & Weapon Selection:** Choose and inspect weapons (AWM, MP40, Nighthawk .50, Spectre 9, Valkyrie CQB) in the pre-mission briefing.
- **Audio & Visual FX:** Procedural Web Audio synth sound effects, confetti celebrations, and mission statistics.
- **Responsive HUD:** Clean, non-intrusive cyber-military HUD with top-mounted mission timers, accuracy scoring, and live gesture hints.

---

## 🖐️ Hand Gesture Controls

| Gesture | Action | In-Game Effect |
| :--- | :--- | :--- |
| **Open Palm** | Fingers spread | Aim cursor reticle in 3D space |
| **Pinch** | Thumb tip + Index tip together | Grab component / interact |
| **Air Drag** | Move hand while pinching | Translate component in 3D |
| **Release Pinch** | Open fingers near target silhouette | Snap component into place |
| **Mouse / Touch** | Left click & drag | Universal fallback control |

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

---

## 🌐 Live Deployment & Execution Guide

- **Live URL**: [https://cvassemblegame.vercel.app/](https://cvassemblegame.vercel.app/)
- **Detailed Execution & Troubleshooting Guide**: See [EXECUTION.md](EXECUTION.md) for full deployment instructions, camera permissions, and browser compatibility notes.

> **Note on Webcam Permissions:** Modern browsers require **HTTPS** (or `localhost`) to access the webcam for hand tracking.
