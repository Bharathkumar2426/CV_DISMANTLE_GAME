import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Device3D } from './device3d.js';
import { GameEngine, GameState } from './game.js';
import { HandTracker } from './handTracker.js';
import { soundFX } from './audio.js';

class App {
  constructor() {
    this.container = document.getElementById('canvas-container');
    this.cursorEl = document.getElementById('hand-cursor');
    this.toastEl = document.getElementById('hud-toast');
    this.isAutoRotating = false;

    // Setup Three.js Scene
    this.initThree();

    // Setup 3D Sci-Fi Prop Device & Game Engine
    this.device = new Device3D(this.scene);
    this.game = new GameEngine(this.device);

    // Callbacks for real-time countdown timer & state transitions (Victory / Game Over)
    this.game.onTick = (timeRemaining) => {
      this.updateTimerDisplay(timeRemaining);
    };
    this.game.onStateChange = (state) => {
      this.handleGameStateChange(state);
    };

    // Interaction Raycasting State
    this.raycaster = new THREE.Raycaster();
    this.mouseNDC = new THREE.Vector2(-10, -10);
    this.dragPlane = new THREE.Plane();
    this.planeIntersect = new THREE.Vector3();

    this.hoveredComponent = null;
    this.draggedComponent = null;
    this.dragOffset = new THREE.Vector3();

    // Active input position in screen pixels
    this.currentInput = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      isPinching: false,
      isMouse: false
    };
    this.wasPinching = false;

    // Hand Tracker setup
    this.initHandTracker();

    // Mouse and UI Event Listeners
    this.initEventListeners();

    // Render loop
    this.startTime = performance.now();
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);

    // Initial HUD update
    this.updateHUD();
  }

  initThree() {
    this.scene = new THREE.Scene();
    // Professional cinematic dark dim tone
    this.scene.background = new THREE.Color(0x060912);
    this.scene.fog = new THREE.FogExp2(0x060912, 0.007);

    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      140
    );
    // Initial 3/4 angled isometric perspective showing side profile & depth
    this.camera.position.set(4.6, 2.0, 6.2);
    this.camera.lookAt(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x060912, 1);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.25;
    this.container.appendChild(this.renderer.domElement);

    // Full 360-degree interactive camera OrbitControls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.08;
    this.controls.minDistance = 3.2;
    this.controls.maxDistance = 22;
    this.controls.target.set(0, 0, 0);

    // --- PROFESSIONAL CINEMATIC STUDIO LIGHTING ---
    // 1. Crisp Key Directional Light (upper front-right)
    const dirLight = new THREE.DirectionalLight(0xffffff, 2.8);
    dirLight.position.set(5.5, 8.5, 6.0);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 30;
    dirLight.shadow.bias = -0.0005;
    this.scene.add(dirLight);

    // 2. Mild Electric Rim Light (rear-left edge highlights)
    const rimLight = new THREE.DirectionalLight(0x38bdf8, 2.0);
    rimLight.position.set(-7.0, 4.5, -6.0);
    this.scene.add(rimLight);

    // 3. Subtle Warm Specular Kick (rear-right lower edge)
    const goldRimLight = new THREE.DirectionalLight(0xf59e0b, 1.4);
    goldRimLight.position.set(6.5, -2.0, -5.5);
    this.scene.add(goldRimLight);

    // 4. Mild Underbelly Fill Light (ensures 360 rotation looking from below is fully visible without glare)
    const underFill = new THREE.DirectionalLight(0x1e293b, 1.6);
    underFill.position.set(0, -7.0, 2.0);
    this.scene.add(underFill);

    // 5. Front-Left Soft Studio Fill
    const fillLight = new THREE.DirectionalLight(0x64748b, 1.2);
    fillLight.position.set(-5.0, 3.0, 4.0);
    this.scene.add(fillLight);

    // 6. Deep Ambient Fill
    const ambientLight = new THREE.AmbientLight(0x0e1422, 1.4);
    this.scene.add(ambientLight);

    // Setup Professional Atmospheric Dark Dim Environment with Mild Horizon Lighting
    this.setupSpaceEnvironment();

    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  createStarTexture() {
    // Soft, realistic micro-point texture (clean circular dot, no cartoon glints)
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');

    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(240, 246, 252, 0.9)');
    grad.addColorStop(0.25, 'rgba(203, 213, 225, 0.45)');
    grad.addColorStop(0.7, 'rgba(100, 116, 139, 0.08)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);

    return new THREE.CanvasTexture(canvas);
  }

  createSpaceDomeTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Professional dark dim gradient (deep obsidian to subtle dark midnight slate)
    const bgGrad = ctx.createLinearGradient(0, 0, 0, 512);
    bgGrad.addColorStop(0, '#04060c');
    bgGrad.addColorStop(0.35, '#060a14');
    bgGrad.addColorStop(0.5, '#091022');
    bgGrad.addColorStop(0.65, '#060a14');
    bgGrad.addColorStop(1, '#03050a');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1024, 512);

    // Mild, subtle atmospheric horizon backlight (soft, low-opacity ambient bloom)
    const drawSoftAura = (cx, cy, rx, ry, color) => {
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, rx);
      grad.addColorStop(0, color);
      grad.addColorStop(0.5, color.replace(/[\d\.]+\)$/, '0.04)'));
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
      ctx.fill();
    };

    // Very gentle, mature background backlight washes
    drawSoftAura(512, 256, 420, 200, 'rgba(24, 48, 88, 0.16)');
    drawSoftAura(220, 320, 260, 120, 'rgba(14, 34, 64, 0.12)');
    drawSoftAura(800, 200, 280, 140, 'rgba(18, 42, 78, 0.14)');

    return new THREE.CanvasTexture(canvas);
  }

  setupSpaceEnvironment() {
    this.spaceGroup = new THREE.Group();

    // 0. Professional Dark Dim Cosmic Skydome (360-degree sphere backdrop, no blocking meshes)
    const domeGeo = new THREE.SphereGeometry(110, 36, 36);
    const domeMat = new THREE.MeshBasicMaterial({
      map: this.createSpaceDomeTexture(),
      side: THREE.BackSide,
      depthWrite: false
    });
    const skyDome = new THREE.Mesh(domeGeo, domeMat);
    this.spaceGroup.add(skyDome);

    const dustTex = this.createStarTexture();

    // 1. Sparse, subtle micro-dust particles (realistic clean-room / orbital depth, NOT childish stars)
    const dustCount = 240;
    const dustGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(dustCount * 3);
    const colors = new Float32Array(dustCount * 3);

    // Muted, mature neutral palette
    const dustPalette = [
      new THREE.Color(0xdce7f5), // Muted soft white
      new THREE.Color(0x94a3b8), // Slate gray
      new THREE.Color(0x64748b)  // Deep slate
    ];

    for (let i = 0; i < dustCount; i++) {
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 38 + Math.random() * 55;

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      const col = dustPalette[Math.floor(Math.random() * dustPalette.length)];
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    dustGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    dustGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const dustMat = new THREE.PointsMaterial({
      size: 0.85,
      map: dustTex,
      vertexColors: true,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.dustPoints = new THREE.Points(dustGeo, dustMat);
    this.spaceGroup.add(this.dustPoints);

    // 2. Subtle Translucent Holographic Celestial Tactical Horizon Ring
    const ringGeo = new THREE.RingGeometry(24 - 0.03, 24 + 0.03, 96);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.12,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.2;
    this.spaceGroup.add(ring);

    this.scene.add(this.spaceGroup);
  }

  async initHandTracker() {
    const video = document.getElementById('webcam-video');
    const canvas = document.getElementById('pip-canvas');
    this.tracker = new HandTracker(video, canvas);

    // Tracker status updates UI
    this.tracker.onStatusChangeCallback = (status, msg) => {
      const badge = document.getElementById('cam-status-badge');
      const startStatus = document.getElementById('modal-cam-status');
      if (badge) {
        badge.textContent = `CAMERA: ${status.toUpperCase()}`;
        badge.className = `status-pill status-${status}`;
      }
      if (startStatus) {
        startStatus.textContent = msg;
      }
    };

    // Landmark update handler
    this.tracker.onUpdateCallback = cursor => {
      if (cursor.hasHand) {
        this.currentInput.x = cursor.x;
        this.currentInput.y = cursor.y;
        this.currentInput.isPinching = cursor.isPinching;
        this.currentInput.isRotating = cursor.isRotating;
        this.currentInput.deltaX = cursor.deltaX || 0;
        this.currentInput.deltaY = cursor.deltaY || 0;
        this.currentInput.isMouse = false;
        this.handleCursorUpdate();
      }
    };

    // Initialize model in background
    await this.tracker.init();
  }

  initEventListeners() {
    // --- Mouse Backup Controls ---
    window.addEventListener('mousemove', e => {
      // If no hand is currently tracked, mouse controls the cursor
      if (!this.tracker || !this.tracker.cursor.hasHand) {
        this.currentInput.x = e.clientX;
        this.currentInput.y = e.clientY;
        this.currentInput.isMouse = true;
        this.handleCursorUpdate();
      }
    });

    window.addEventListener('mousedown', e => {
      if (e.target.closest('button, .modal, .interactive-ui')) return;
      if (!this.tracker || !this.tracker.cursor.hasHand) {
        this.currentInput.isPinching = true;
        this.currentInput.isMouse = true;
        this.handleCursorUpdate();
      }
    });

    window.addEventListener('mouseup', () => {
      if (!this.tracker || !this.tracker.cursor.hasHand) {
        this.currentInput.isPinching = false;
        this.handleCursorUpdate();
      }
    });

    // Touch support for touchscreens
    window.addEventListener('touchmove', e => {
      if (e.touches.length > 0) {
        this.currentInput.x = e.touches[0].clientX;
        this.currentInput.y = e.touches[0].clientY;
        this.currentInput.isMouse = true;
        this.handleCursorUpdate();
      }
    }, { passive: true });

    // --- UI Controls ---
    document.getElementById('btn-start-game').addEventListener('click', () => {
      soundFX.ensureContext();
      this.startGame();
    });

    document.getElementById('btn-retry-game').addEventListener('click', () => {
      this.startGame();
    });

    document.getElementById('btn-play-again').addEventListener('click', () => {
      this.startGame();
    });

    // Next Level Progression
    const nextLevelBtn = document.getElementById('btn-next-level');
    if (nextLevelBtn) {
      nextLevelBtn.addEventListener('click', () => {
        const nextDiff = this.game.getNextDifficulty();
        if (nextDiff) {
          this.game.setDifficulty(nextDiff);
          document.querySelectorAll('.diff-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.diff === nextDiff);
          });
          soundFX.playSnap();
        } else {
          // If was on hard, restart from easy
          this.game.setDifficulty('easy');
          document.querySelectorAll('.diff-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.diff === 'easy');
          });
        }
        this.startGame();
      });
    }

    // Auto complete & inspect weapon on game over
    const autoCompBtn = document.getElementById('btn-auto-complete-view');
    if (autoCompBtn) {
      autoCompBtn.addEventListener('click', () => {
        document.getElementById('gameover-modal').classList.add('hidden');
        this.device.components.forEach(comp => {
          if (!comp.isAssembled) {
            this.device.snapComponent(comp);
          }
        });
        soundFX.playSnap();
        this.showToast('ALL 8 COMPONENTS ASSEMBLED FOR 3D INSPECTION');
        this.updateHUD();
      });
    }

    // Pause / Resume Controls
    const pauseBtn = document.getElementById('btn-pause-game');
    if (pauseBtn) {
      pauseBtn.addEventListener('click', () => {
        this.game.togglePause();
      });
    }

    const resumeBtn = document.getElementById('btn-resume-mission');
    if (resumeBtn) {
      resumeBtn.addEventListener('click', () => {
        this.game.resume();
      });
    }

    // Reset Level Controls
    const resetBtn = document.getElementById('btn-reset-game');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        soundFX.playSnap();
        this.game.resetLevel();
        this.showToast('LEVEL RESTARTED - TIMER RESET');
      });
    }

    const pauseResetBtn = document.getElementById('btn-pause-reset');
    if (pauseResetBtn) {
      pauseResetBtn.addEventListener('click', () => {
        soundFX.playSnap();
        this.game.resetLevel();
        this.showToast('LEVEL RESTARTED');
      });
    }

    // Home / Main Menu Controls
    const returnToHome = () => {
      this.game.returnToHome();
      this.showToast('RETURNED TO ARMORER HANGAR MENU');
    };

    ['btn-home-game', 'btn-pause-home', 'btn-victory-home', 'btn-gameover-home'].forEach(id => {
      const btn = document.getElementById(id);
      if (btn) btn.addEventListener('click', returnToHome);
    });

    // --- Weapon Shop / Armory Event Listeners ---
    const openShop = () => {
      this.updateShopUI();
      document.getElementById('shop-modal')?.classList.remove('hidden');
      soundFX.playHover();
    };

    document.getElementById('btn-armory-shop')?.addEventListener('click', openShop);
    document.getElementById('btn-open-shop-start')?.addEventListener('click', openShop);

    document.getElementById('btn-close-shop')?.addEventListener('click', () => {
      document.getElementById('shop-modal')?.classList.add('hidden');
      soundFX.playHover();
    });

    // Equip Weapon Platform Buttons (Shop & Start Modal)
    document.querySelectorAll('.btn-equip-weapon').forEach(btn => {
      btn.addEventListener('click', e => {
        const weaponId = e.currentTarget.dataset.weapon;
        this.game.setWeapon(weaponId);
        soundFX.playGunRack();
        this.updateShopUI();
        this.updateHUD();
        this.showToast(`EQUIPPED: ${this.game.getCurrentWeapon().name}`);
      });
    });

    // In-HUD Tactical Weapon Selector Tabs (Assemble Section Switcher)
    document.querySelectorAll('.hud-weapon-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        const weaponId = e.currentTarget.dataset.weapon;
        if (weaponId && weaponId !== this.game.currentWeaponId) {
          this.game.setWeapon(weaponId);
          soundFX.playGunRack();
          this.updateShopUI();
          this.updateHUD();
          this.showToast(`PLATFORM: ${this.game.getCurrentWeapon().name}`);
        }
      });
    });

    // Save Custom Timers for Active Weapon
    document.getElementById('btn-save-custom-timers')?.addEventListener('click', () => {
      const easyVal = document.getElementById('input-time-easy')?.value;
      const medVal = document.getElementById('input-time-medium')?.value;
      const hardVal = document.getElementById('input-time-hard')?.value;
      if (easyVal) this.game.setCustomTime(this.game.currentWeaponId, 'easy', easyVal);
      if (medVal) this.game.setCustomTime(this.game.currentWeaponId, 'medium', medVal);
      if (hardVal) this.game.setCustomTime(this.game.currentWeaponId, 'hard', hardVal);
      soundFX.playSnap();
      this.updateShopUI();
      this.updateHUD();
      this.showToast('SAVED CUSTOM TIMERS FOR ACTIVE WEAPON');
    });

    // Reset Default Timers for Active Weapon
    document.getElementById('btn-reset-default-timers')?.addEventListener('click', () => {
      this.game.resetCustomTimes(this.game.currentWeaponId);
      soundFX.playSnap();
      this.updateShopUI();
      this.updateHUD();
      this.showToast('FACTORY DEFAULT TIMERS RESTORED');
    });

    document.getElementById('btn-camera-toggle').addEventListener('click', async () => {
      if (this.tracker.isReady) {
        this.tracker.stopCamera();
      } else {
        await this.tracker.startCamera();
      }
    });

    document.getElementById('btn-sound-toggle').addEventListener('click', () => {
      const isMuted = soundFX.toggleMute();
      const soundBtn = document.getElementById('btn-sound-toggle');
      soundBtn.textContent = isMuted ? '🔇 AUDIO: MUTED' : '🔊 AUDIO: ON';
      soundBtn.classList.toggle('muted', isMuted);
    });

    document.getElementById('btn-fullscreen-toggle').addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    });

    // Difficulty selection
    document.querySelectorAll('.diff-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        const diff = e.currentTarget.dataset.diff;
        this.game.setDifficulty(diff);
        soundFX.playHover();
      });
    });

    // Instructions modal toggle
    const howToBtn = document.getElementById('btn-how-to');
    const instructionsModal = document.getElementById('instructions-modal');
    if (howToBtn && instructionsModal) {
      howToBtn.addEventListener('click', () => {
        instructionsModal.classList.toggle('hidden');
        soundFX.playHover();
      });
      document.getElementById('btn-close-instructions').addEventListener('click', () => {
        instructionsModal.classList.add('hidden');
      });
    }

    // Snap Assist Button (and keyboard shortcut 'A' or Space)
    const snapAssistBtn = document.getElementById('btn-snap-assist');
    if (snapAssistBtn) {
      snapAssistBtn.addEventListener('click', () => {
        this.triggerSnapAssist();
      });
    }

    window.addEventListener('keydown', e => {
      if (e.key === ' ' || e.key === 'a' || e.key === 'A') {
        this.triggerSnapAssist();
      }
    });

    // Camera Perspective Toolbar buttons
    document.querySelectorAll('.cam-btn[data-view]').forEach(btn => {
      btn.addEventListener('click', e => {
        document.querySelectorAll('.cam-btn[data-view]').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.setCameraView(e.currentTarget.dataset.view);
      });
    });

    const autoRotateBtn = document.getElementById('btn-auto-rotate');
    if (autoRotateBtn) {
      autoRotateBtn.addEventListener('click', () => {
        this.toggleAutoRotate();
      });
    }

    // Toggle camera PIP visibility
    const pipHeader = document.getElementById('pip-header');
    const pipBody = document.getElementById('pip-body');
    if (pipHeader && pipBody) {
      pipHeader.addEventListener('click', () => {
        pipBody.classList.toggle('collapsed');
      });
    }
  }

  setCameraView(view) {
    if (!this.camera || !this.controls) return;
    switch (view) {
      case 'iso':
        this.camera.position.set(4.6, 2.0, 6.2);
        break;
      case 'side':
        this.camera.position.set(8.5, 0.4, 0.1);
        break;
      case 'top':
        this.camera.position.set(0.1, 9.5, 0.1);
        break;
      case 'front':
        this.camera.position.set(0.1, 0.8, 8.8);
        break;
    }
    this.controls.target.set(0, 0, 0);
    this.controls.update();
    soundFX.playHover();
  }

  triggerSnapAssist() {
    if (this.game.state !== GameState.PLAYING) return;

    // If currently dragging or hovering a component, snap that one
    let targetComp = this.draggedComponent || this.hoveredComponent;

    // Otherwise find the first unplaced component
    if (!targetComp || targetComp.isAssembled) {
      targetComp = this.device.components.find(c => !c.isAssembled);
    }

    if (targetComp) {
      if (this.draggedComponent === targetComp) {
        this.draggedComponent = null;
      }
      this.device.snapComponent(targetComp);
      this.game.onComponentPlaced(targetComp);
      this.showToast(`LOCKED: ${targetComp.name} (+${this.game.difficulties[this.game.currentDifficulty].baseScore})`);
      this.updateInspectorHUD(targetComp);
      this.updateHUD();
    }
  }

  async startGame() {
    // Attempt camera start if not already active
    if (!this.tracker.isReady) {
      await this.tracker.startCamera();
    }

    this.hoveredComponent = null;
    this.draggedComponent = null;

    this.game.start();

    // Hide modals
    document.getElementById('start-modal').classList.add('hidden');
    document.getElementById('victory-modal').classList.add('hidden');
    document.getElementById('gameover-modal').classList.add('hidden');
    document.getElementById('pause-modal')?.classList.add('hidden');
    document.getElementById('shop-modal')?.classList.add('hidden');
    document.getElementById('instructions-modal').classList.add('hidden');

    const config = this.game.getCurrentDifficultyConfig();
    this.showToast(`MISSION STARTED: ${config.title}`);
  }

  handleCursorUpdate() {
    const { x, y, isPinching, isRotating, deltaX = 0, deltaY = 0 } = this.currentInput;

    // 1. Move visual glowing cursor reticle
    if (this.cursorEl) {
      this.cursorEl.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      this.cursorEl.classList.toggle('pinching', isPinching);
      this.cursorEl.classList.toggle('has-target', !!this.hoveredComponent);
      this.cursorEl.classList.toggle('rotating', isRotating);

      const statusLabel = this.cursorEl.querySelector('.cursor-status-label');
      if (statusLabel) {
        if (isRotating) {
          statusLabel.textContent = '✊ ROTATING 3D MODEL';
        } else if (isPinching) {
          statusLabel.textContent = this.draggedComponent ? '🤏 DRAGGING PART' : '🤏 PINCH';
        } else if (this.hoveredComponent) {
          statusLabel.textContent = '🎯 READY TO PINCH';
        } else {
          statusLabel.textContent = '🖐️ AIM / HOVER';
        }
      }
    }

    // 2. HAND GESTURE 3D ROTATION: If player makes a Fist (✊) or Two Fingers (✌️)
    if (isRotating && !this.draggedComponent) {
      if (this.controls && (Math.abs(deltaX) > 0.5 || Math.abs(deltaY) > 0.5)) {
        // Freely rotate the 3D scene matching hand movement!
        this.controls.rotateLeft(deltaX * 0.006);
        this.controls.rotateUp(deltaY * 0.006);
        this.controls.update();
      }
      return;
    }

    // 3. Convert Screen coordinates to NDC [-1, 1]
    this.mouseNDC.x = (x / window.innerWidth) * 2 - 1;
    this.mouseNDC.y = -(y / window.innerHeight) * 2 + 1;

    // 4. Raycast to 3D components
    this.raycaster.setFromCamera(this.mouseNDC, this.camera);

    // If currently dragging a component:
    if (this.draggedComponent) {
      // Project ray onto drag plane
      if (this.raycaster.ray.intersectPlane(this.dragPlane, this.planeIntersect)) {
        const targetWorldPos = this.planeIntersect.clone().sub(this.dragOffset);
        // Calculate XY distance to target
        const dx = targetWorldPos.x - this.draggedComponent.targetPos.x;
        const dy = targetWorldPos.y - this.draggedComponent.targetPos.y;
        const xyDist = Math.hypot(dx, dy);

        // Smoothly adjust Z towards targetPos.z as the piece moves near targetPos
        const zFactor = Math.max(0, 1 - xyDist / 3.2);
        targetWorldPos.z = THREE.MathUtils.lerp(targetWorldPos.z, this.draggedComponent.targetPos.z, zFactor);

        // Calculate 2D distance on screen in pixels
        const screenP1 = this.draggedComponent.mesh.position.clone().project(this.camera);
        const screenP2 = this.draggedComponent.targetPos.clone().project(this.camera);
        const screenPixelDist = Math.hypot(
          (screenP1.x - screenP2.x) * (window.innerWidth / 2),
          (screenP1.y - screenP2.y) * (window.innerHeight / 2)
        );

        // Check proximity to target position for snap guidance
        const distToTarget = targetWorldPos.distanceTo(this.draggedComponent.targetPos);
        const config = this.game.difficulties[this.game.currentDifficulty];
        const snapThreshold = this.draggedComponent.snapDistance * config.snapFactor;

        const isNearSnap = (distToTarget <= snapThreshold) || (screenPixelDist <= 130);

        if (isNearSnap) {
          // Magnetic suction feel towards target
          targetWorldPos.lerp(this.draggedComponent.targetPos, 0.45);
        }

        // Move dragged component smoothly
        this.draggedComponent.mesh.position.copy(targetWorldPos);

        this.device.updateTether(
          this.draggedComponent.mesh.position,
          this.draggedComponent.targetPos,
          isNearSnap
        );

        if (this.cursorEl) {
          this.cursorEl.classList.toggle('snap-ready', isNearSnap);
        }
      }

      // Check for PINCH RELEASE (Drop)
      if (this.wasPinching && !isPinching) {
        this.dropComponent();
      }
    } else {
      // Not dragging: test hover
      const interactiveMeshes = [];
      this.device.components.forEach(comp => {
        if (!comp.isAssembled) {
          interactiveMeshes.push(comp.mesh);
        }
      });

      const intersects = this.raycaster.intersectObjects(interactiveMeshes, true);

      if (intersects.length > 0) {
        // Find top-level component group
        let hitMesh = intersects[0].object;
        while (hitMesh.parent && !hitMesh.userData.isComponent) {
          hitMesh = hitMesh.parent;
        }

        const compId = hitMesh.userData.componentId;
        const comp = this.device.components.find(c => c.id === compId);

        if (comp && !comp.isAssembled) {
          if (this.hoveredComponent !== comp) {
            if (this.hoveredComponent) {
              this.device.setComponentHighlight(this.hoveredComponent, false);
            }
            this.hoveredComponent = comp;
            this.device.setComponentHighlight(comp, true);
            soundFX.playHover();
            this.updateInspectorHUD(comp);
          }
        }
      } else {
        if (this.hoveredComponent) {
          this.device.setComponentHighlight(this.hoveredComponent, false);
          this.hoveredComponent = null;
          this.updateInspectorHUD(null);
        }
      }

      // Check for PINCH START (Grab)
      if (!this.wasPinching && isPinching && this.hoveredComponent) {
        this.grabComponent(this.hoveredComponent);
      }
    }

    this.wasPinching = isPinching;
  }

  grabComponent(comp) {
    if (this.game.state !== GameState.PLAYING) return;
    this.draggedComponent = comp;

    // Setup drag plane perpendicular to camera ray at component's position
    const camDir = new THREE.Vector3();
    this.camera.getWorldDirection(camDir).negate();
    this.dragPlane.setFromNormalAndCoplanarPoint(camDir, comp.mesh.position);

    // Compute grab offset
    if (this.raycaster.ray.intersectPlane(this.dragPlane, this.planeIntersect)) {
      this.dragOffset.copy(this.planeIntersect).sub(comp.mesh.position);
    } else {
      this.dragOffset.set(0, 0, 0);
    }

    soundFX.playGrab();
    this.device.setComponentHighlight(comp, true);
    if (this.controls) this.controls.enabled = false;
  }

  dropComponent() {
    if (!this.draggedComponent) return;

    const comp = this.draggedComponent;
    this.draggedComponent = null;
    this.device.hideTether();

    if (this.controls) this.controls.enabled = true;

    if (this.cursorEl) {
      this.cursorEl.classList.remove('snap-ready');
    }

    const distToTarget = comp.mesh.position.distanceTo(comp.targetPos);
    const screenP1 = comp.mesh.position.clone().project(this.camera);
    const screenP2 = comp.targetPos.clone().project(this.camera);
    const screenPixelDist = Math.hypot(
      (screenP1.x - screenP2.x) * (window.innerWidth / 2),
      (screenP1.y - screenP2.y) * (window.innerHeight / 2)
    );

    const config = this.game.difficulties[this.game.currentDifficulty];
    const snapThreshold = comp.snapDistance * config.snapFactor;

    if (distToTarget <= snapThreshold || screenPixelDist <= 135) {
      // Snapped into place!
      this.device.snapComponent(comp);
      this.game.onComponentPlaced(comp);
      this.showToast(`LOCKED IN PLACE: ${comp.name} (+${config.baseScore})`);
      this.updateInspectorHUD(comp);
    } else {
      // Incorrect drop
      this.game.onIncorrectDrop();
      soundFX.playRelease();
      this.showToast(`ALIGN WITH GHOST SILHOUETTE TO SNAP`);
    }

    this.device.setComponentHighlight(comp, false);
    this.updateHUD();
  }

  showToast(text) {
    if (!this.toastEl) return;
    this.toastEl.textContent = text;
    this.toastEl.classList.add('visible');
    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      this.toastEl.classList.remove('visible');
    }, 2400);
  }

  updateInspectorHUD(comp) {
    const nameEl = document.getElementById('inspector-name');
    const catEl = document.getElementById('inspector-cat');
    const statusEl = document.getElementById('inspector-status');

    if (comp) {
      if (nameEl) nameEl.textContent = comp.name;
      if (catEl) catEl.textContent = comp.category.toUpperCase();
      if (statusEl) {
        statusEl.textContent = comp.isAssembled ? 'LOCKED & CHARGED' : 'DISMANTLED';
        statusEl.className = comp.isAssembled ? 'status-locked' : 'status-dismantled';
      }
    } else {
      if (nameEl) nameEl.textContent = 'AWAITING SELECTION';
      if (catEl) catEl.textContent = 'HOVER / PINCH COMPONENT';
      if (statusEl) {
        statusEl.textContent = 'STANDBY';
        statusEl.className = 'status-standby';
      }
    }
  }

  renderPartsInventory() {
    const listEl = document.getElementById('parts-list');
    if (!listEl) return;

    listEl.innerHTML = '';
    this.device.components.forEach(comp => {
      const item = document.createElement('div');
      item.className = `part-item ${comp.isAssembled ? 'assembled' : ''} ${this.hoveredComponent === comp ? 'active' : ''}`;

      const badge = comp.isAssembled ? '✅' : '⏳';
      const statusText = comp.isAssembled ? 'LOCKED' : 'UNPLACED';

      item.innerHTML = `
        <div class="part-info">
          <span class="part-badge">${badge}</span>
          <span class="part-name">${comp.name}</span>
        </div>
        <button class="part-action-btn" title="${comp.isAssembled ? 'Assembled' : 'Click to Snap'}">
          ${comp.isAssembled ? 'LOCKED' : '⚡ SNAP'}
        </button>
      `;

      item.addEventListener('click', (e) => {
        if (e.target.closest('.part-action-btn')) {
          if (!comp.isAssembled) {
            this.device.snapComponent(comp);
            this.game.onComponentPlaced(comp);
            this.showToast(`LOCKED: ${comp.name}`);
            this.updateInspectorHUD(comp);
            this.updateHUD();
          }
          return;
        }

        // Highlight and focus component in 3D
        if (this.hoveredComponent) {
          this.device.setComponentHighlight(this.hoveredComponent, false);
        }
        this.hoveredComponent = comp;
        this.device.setComponentHighlight(comp, true);
        soundFX.playHover();
        this.updateInspectorHUD(comp);
        this.showToast(`LOCATED: ${comp.name} (${statusText})`);

        if (!comp.isAssembled) {
          this.device.updateTether(comp.mesh.position, comp.targetPos, false);
        }
      });

      listEl.appendChild(item);
    });
  }

  updateTimerDisplay(timeRemaining) {
    const timerEl = document.getElementById('hud-timer');
    if (timerEl) {
      const mins = Math.floor(timeRemaining / 60);
      const secs = timeRemaining % 60;
      timerEl.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
      timerEl.classList.toggle('urgent', timeRemaining <= 15 && this.game.state === GameState.PLAYING);
    }
  }

  handleGameStateChange(state) {
    this.updateHUD();

    const pauseBtn = document.getElementById('btn-pause-game');
    const pauseModal = document.getElementById('pause-modal');
    const vModal = document.getElementById('victory-modal');
    const goModal = document.getElementById('gameover-modal');
    const startModal = document.getElementById('start-modal');

    // 1. Handling PAUSE state
    if (state === GameState.PAUSED) {
      if (pauseModal) pauseModal.classList.remove('hidden');
      if (pauseBtn) {
        pauseBtn.textContent = '▶️ RESUME';
        pauseBtn.classList.add('paused');
      }
      const config = this.game.getCurrentDifficultyConfig();
      const pTitle = document.getElementById('pause-level-title');
      if (pTitle) pTitle.textContent = config.title;
      const pScore = document.getElementById('pause-score');
      if (pScore) pScore.textContent = this.game.score.toLocaleString();
      const pCount = document.getElementById('pause-assembled');
      if (pCount) pCount.textContent = `${this.device.getAssembledCount()} / ${this.device.components.length}`;
      return;
    }

    if (pauseModal) pauseModal.classList.add('hidden');
    if (pauseBtn) {
      pauseBtn.textContent = '⏸️ PAUSE';
      pauseBtn.classList.remove('paused');
    }

    // 2. Handling START (Home Menu) state
    if (state === GameState.START) {
      if (startModal) startModal.classList.remove('hidden');
      if (vModal) vModal.classList.add('hidden');
      if (goModal) goModal.classList.add('hidden');
      return;
    }

    // 3. Handling PLAYING state
    if (state === GameState.PLAYING) {
      if (startModal) startModal.classList.add('hidden');
      if (vModal) vModal.classList.add('hidden');
      if (goModal) goModal.classList.add('hidden');
      return;
    }

    // 4. Handling VICTORY state
    if (state === GameState.VICTORY) {
      if (vModal) vModal.classList.remove('hidden');

      const config = this.game.getCurrentDifficultyConfig();
      const levelTitleEl = document.getElementById('victory-level-title');
      if (levelTitleEl) {
        levelTitleEl.textContent = `${config.title} - CLEARED`;
      }

      const scoreEl = document.getElementById('victory-score');
      if (scoreEl) scoreEl.textContent = this.game.score.toLocaleString();

      const timeEl = document.getElementById('victory-time');
      if (timeEl) timeEl.textContent = `${this.game.completionTime.toFixed(1)}s`;

      const rankEl = document.getElementById('victory-rank');
      if (rankEl) rankEl.textContent = this.game.getRank();

      const accEl = document.getElementById('victory-accuracy');
      if (accEl) accEl.textContent = `${this.game.getAccuracy()}%`;

      // Detailed Point Breakdown Card
      const baseEl = document.getElementById('breakdown-base-pts');
      if (baseEl) baseEl.textContent = `+${this.game.baseScoreEarned.toLocaleString()}`;

      const timeBonusEl = document.getElementById('breakdown-time-pts');
      if (timeBonusEl) timeBonusEl.textContent = `+${this.game.speedBonusEarned.toLocaleString()}`;

      const accBonusEl = document.getElementById('breakdown-accuracy-pts');
      if (accBonusEl) accBonusEl.textContent = `+${this.game.accuracyBonusEarned.toLocaleString()}`;

      // Configure Next Level Button
      const nextDiff = this.game.getNextDifficulty();
      const nextBtnText = document.getElementById('btn-next-level-text');
      if (nextBtnText) {
        if (nextDiff) {
          const nextConfig = this.game.difficulties[nextDiff];
          nextBtnText.textContent = `▶️ PROCEED TO LEVEL ${nextConfig.level}: ${nextConfig.label} (${nextConfig.time}s)`;
        } else {
          nextBtnText.textContent = `🏆 MASTER GUNSMITH COMPLETE! RESTART`;
        }
      }
    } else if (state === GameState.GAME_OVER) {
      if (goModal) goModal.classList.remove('hidden');

      const config = this.game.getCurrentDifficultyConfig();
      const levelTitleEl = document.getElementById('gameover-level-title');
      if (levelTitleEl) {
        levelTitleEl.textContent = `${config.title} - TIME EXPIRED`;
      }

      const completed = this.device.getAssembledCount();
      const total = this.device.components.length;

      const scoreEl = document.getElementById('gameover-score');
      if (scoreEl) scoreEl.textContent = this.game.score.toLocaleString();

      const assembledEl = document.getElementById('gameover-assembled');
      if (assembledEl) assembledEl.textContent = `${completed} / ${total}`;

      const accEl = document.getElementById('gameover-accuracy');
      if (accEl) accEl.textContent = `${this.game.getAccuracy()}%`;

      const evalEl = document.getElementById('gameover-eval');
      if (evalEl) {
        evalEl.textContent = completed >= 6 ? 'FIELD QUALIFIED (PROCEED)' : 'CADET IN TRAINING';
      }
    }
  }

  updateShopUI() {
    const activeWId = this.game.currentWeaponId;
    const activeW = this.game.getCurrentWeapon();

    // 1. Update weapon cards in shop modal & quick picker
    document.querySelectorAll('.shop-weapon-card').forEach(card => {
      const wId = card.dataset.weapon;
      const isActive = wId === activeWId;
      card.classList.toggle('active', isActive);

      const btn = card.querySelector('.btn-equip-weapon');
      if (btn) {
        btn.textContent = isActive ? 'EQUIPPED' : 'EQUIP WEAPON';
      }

      ['easy', 'medium', 'hard'].forEach(diff => {
        const span = document.getElementById(`shop-timer-${wId}-${diff}`);
        if (span) {
          const t = this.game.getWeaponTime(wId, diff);
          const label = diff === 'easy' ? 'Easy' : diff === 'medium' ? 'Med' : 'Hard';
          span.textContent = `⏱️ ${label}: ${t}s`;
        }
      });
    });

    // 2. Update all equip buttons across start modal and shop
    document.querySelectorAll('.btn-equip-weapon').forEach(btn => {
      const isEq = btn.dataset.weapon === activeWId;
      btn.classList.toggle('active', isEq);
      if (btn.closest('.shop-weapon-card')) {
        btn.textContent = isEq ? 'EQUIPPED' : 'EQUIP WEAPON';
      }
    });

    // 3. Update timer input fields for active weapon
    const easyInput = document.getElementById('input-time-easy');
    const medInput = document.getElementById('input-time-medium');
    const hardInput = document.getElementById('input-time-hard');
    if (easyInput) easyInput.value = this.game.getWeaponTime(activeWId, 'easy');
    if (medInput) medInput.value = this.game.getWeaponTime(activeWId, 'medium');
    if (hardInput) hardInput.value = this.game.getWeaponTime(activeWId, 'hard');

    // 4. Update Start Screen Banner
    const startWTitle = document.getElementById('start-weapon-title');
    const startWMeta = document.getElementById('start-weapon-meta');
    const startWImg = document.getElementById('start-weapon-img');
    if (startWTitle) {
      startWTitle.textContent = `${activeW.icon} ${activeW.name}`;
      if (startWMeta) {
        startWMeta.textContent = `${activeW.caliber} • ${activeW.finish} • ${activeW.partsCount} Parts`;
      }
      if (startWImg && activeW.image) {
        startWImg.src = activeW.image;
      }
    }
  }

  updateHUD() {
    // 1. Timer
    this.updateTimerDisplay(this.game.timeRemaining);

    // 2. Level Badge & Weapon Badge in Header
    const levelBadge = document.getElementById('hud-level-badge');
    if (levelBadge) {
      const config = this.game.getCurrentDifficultyConfig();
      levelBadge.textContent = `${config.title} (${config.time}s)`;
    }

    const weaponBadge = document.getElementById('hud-weapon-badge');
    if (weaponBadge) {
      const w = this.game.getCurrentWeapon();
      weaponBadge.textContent = `${w.icon} ${w.shortName}`;
    }

    // 3. Update In-HUD Weapon Selector Tabs (Assemble Section)
    document.querySelectorAll('.hud-weapon-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.weapon === this.game.currentWeaponId);
    });

    // 4. Update Left Panel Firearm Telemetry
    const panelBadge = document.getElementById('panel-weapon-badge');
    const panelCal = document.getElementById('panel-weapon-caliber');
    const panelDesc = document.getElementById('panel-weapon-desc');
    const panelImg = document.getElementById('panel-weapon-img');
    const w = this.game.getCurrentWeapon();
    if (panelBadge) panelBadge.textContent = `${w.icon} ${w.shortName}`;
    if (panelCal) panelCal.textContent = w.caliber;
    if (panelDesc) panelDesc.textContent = w.desc;
    if (panelImg && w.image) panelImg.src = w.image;

    // 5. Start Screen Weapon Card
    const startWTitle = document.getElementById('start-weapon-title');
    const startWMeta = document.getElementById('start-weapon-meta');
    const startWImg = document.getElementById('start-weapon-img');
    if (startWTitle) {
      startWTitle.textContent = `${w.icon} ${w.name}`;
      if (startWMeta) {
        startWMeta.textContent = `${w.caliber} • ${w.finish} • ${w.partsCount} Parts`;
      }
      if (startWImg && w.image) {
        startWImg.src = w.image;
      }
    }

    // 6. Score
    document.getElementById('hud-score').textContent = this.game.score.toLocaleString();

    // 7. Progress Count and Bar
    const completed = this.device.getAssembledCount();
    const total = this.device.components.length;
    document.getElementById('hud-count').textContent = `${completed} / ${total}`;

    const progressPct = (completed / total) * 100;
    document.getElementById('hud-progress-fill').style.width = `${progressPct}%`;

    // 8. Mistake count and accuracy
    document.getElementById('hud-mistakes').textContent = this.game.mistakes;
    document.getElementById('hud-accuracy').textContent = `${this.game.getAccuracy()}%`;

    // 9. Persistent High Scores
    document.getElementById('best-score-display').textContent = this.game.bestScore.toLocaleString();
    document.getElementById('last-score-display').textContent = this.game.lastScore.toLocaleString();

    // 10. Parts Inventory Checklist
    this.renderPartsInventory();
  }

  animate() {
    requestAnimationFrame(this.animate);

    const time = (performance.now() - this.startTime) * 0.001;

    // Subtle, calm ambient drift
    if (this.spaceGroup) {
      this.spaceGroup.rotation.y = time * 0.005;
    }

    // Update 3D device idle wobble & gyro rotation
    this.device.update(time, this.draggedComponent);

    // Smooth OrbitControls 360-degree rotation
    if (this.controls) {
      this.controls.autoRotate = this.isAutoRotating;
      this.controls.autoRotateSpeed = 1.5;
      this.controls.update();
    }

    // Render WebGL frame
    this.renderer.render(this.scene, this.camera);

    // Update timer and metrics display
    const timerEl = document.getElementById('hud-timer');
    if (timerEl) {
      const mins = Math.floor(this.game.timeRemaining / 60);
      const secs = this.game.timeRemaining % 60;
      timerEl.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
  }
}

// Instantiate on window load
window.addEventListener('DOMContentLoaded', () => {
  new App();
});
