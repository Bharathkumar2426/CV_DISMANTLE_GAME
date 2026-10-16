import { FilesetResolver, HandLandmarker } from '@mediapipe/tasks-vision';

export class HandTracker {
  constructor(videoElement, canvasElement) {
    this.video = videoElement;
    this.canvas = canvasElement;
    this.ctx = canvasElement ? canvasElement.getContext('2d') : null;

    this.landmarker = null;
    this.isReady = false;
    this.stream = null;
    this.status = 'idle'; // 'idle', 'loading', 'active', 'denied', 'error'
    this.lastVideoTime = -1;
    this.animFrameId = null;

    // Smoothed tracking cursor state
    this.cursor = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      rawX: 0.5,
      rawY: 0.5,
      isPinching: false,
      isPalmOpen: false,
      pinchDistance: 1.0,
      hasHand: false
    };

    // Callback on landmark detection update
    this.onUpdateCallback = null;
    this.onStatusChangeCallback = null;
  }

  setStatus(status, message = '') {
    this.status = status;
    if (this.onStatusChangeCallback) {
      this.onStatusChangeCallback(status, message);
    }
  }

  async init() {
    this.setStatus('loading', 'Loading MediaPipe AI Model...');
    try {
      // 1. Initialize MediaPipe Vision Tasks HandLandmarker
      const vision = await FilesetResolver.forVisionTasks(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
      );

      this.landmarker = await HandLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
            'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task',
          delegate: 'GPU'
        },
        runningMode: 'VIDEO',
        numHands: 1,
        minHandDetectionConfidence: 0.5,
        minHandPresenceConfidence: 0.5,
        minTrackingConfidence: 0.5
      });

      this.setStatus('idle', 'Vision Model Ready. Grant camera permission to start.');
      return true;
    } catch (err) {
      console.warn('Primary HandLandmarker load error, checking fallback:', err);
      try {
        // Fallback without GPU delegate if GPU context fails
        const vision = await FilesetResolver.forVisionTasks(
          'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
        );
        this.landmarker = await HandLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath:
              'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task',
            delegate: 'CPU'
          },
          runningMode: 'VIDEO',
          numHands: 1
        });
        this.setStatus('idle', 'Vision Model Ready (CPU mode).');
        return true;
      } catch (fallbackErr) {
        console.error('Failed to initialize MediaPipe HandLandmarker:', fallbackErr);
        this.setStatus('error', 'Camera AI failed to load. Mouse controls active.');
        return false;
      }
    }
  }

  async startCamera() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      this.setStatus('error', 'Webcam API not supported in this browser.');
      return false;
    }

    this.setStatus('loading', 'Requesting Webcam Permission...');

    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user'
        },
        audio: false
      });

      this.video.srcObject = this.stream;
      await new Promise(resolve => {
        this.video.onloadedmetadata = () => {
          this.video.play().then(resolve);
        };
      });

      if (this.canvas) {
        this.canvas.width = this.video.videoWidth || 640;
        this.canvas.height = this.video.videoHeight || 480;
      }

      this.isReady = true;
      this.setStatus('active', 'Webcam Hand Tracking Active');
      this.startTrackingLoop();
      return true;
    } catch (err) {
      console.warn('Webcam permission error:', err);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        this.setStatus('denied', 'Camera permission denied. Use mouse controls.');
      } else {
        this.setStatus('error', 'No webcam detected. Mouse controls active.');
      }
      return false;
    }
  }

  stopCamera() {
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
    this.isReady = false;
    this.setStatus('idle', 'Camera stopped.');
  }

  startTrackingLoop() {
    const loop = () => {
      this.processFrame();
      this.animFrameId = requestAnimationFrame(loop);
    };
    loop();
  }

  processFrame() {
    if (!this.isReady || !this.landmarker || this.video.paused || this.video.ended) {
      return;
    }

    const videoTime = this.video.currentTime;
    if (videoTime !== this.lastVideoTime) {
      this.lastVideoTime = videoTime;

      try {
        const results = this.landmarker.detectForVideo(this.video, performance.now());
        this.handleResults(results);
      } catch (err) {
        // Ignored frame error during video transitions
      }
    }
  }

  handleResults(results) {
    if (this.ctx && this.canvas) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    if (!results.landmarks || results.landmarks.length === 0) {
      this.cursor.hasHand = false;
      this.cursor.isPinching = false;
      if (this.onUpdateCallback) {
        this.onUpdateCallback(this.cursor);
      }
      return;
    }

    const landmarks = results.landmarks[0];
    this.cursor.hasHand = true;

    // Key landmarks:
    // 0: Wrist
    // 4: Thumb tip
    // 8: Index finger tip
    // 9: Middle MCP (knuckle)
    // 12: Middle finger tip
    // 16: Ring finger tip
    // 20: Pinky finger tip
    const wrist = landmarks[0];
    const thumbTip = landmarks[4];
    const indexTip = landmarks[8];
    const middleMcp = landmarks[9];
    const middleTip = landmarks[12];
    const ringTip = landmarks[16];
    const pinkyTip = landmarks[20];

    // Hand scale: Euclidean distance from wrist to middle MCP
    const handScale = Math.hypot(middleMcp.x - wrist.x, middleMcp.y - wrist.y) || 0.15;

    // Euclidean distance between Thumb tip & Index tip
    const thumbIndexDist = Math.hypot(thumbTip.x - indexTip.x, thumbTip.y - indexTip.y);
    const normalizedPinch = thumbIndexDist / handScale;

    // Extension check relative to wrist
    const distIndex = Math.hypot(indexTip.x - wrist.x, indexTip.y - wrist.y);
    const distMiddle = Math.hypot(middleTip.x - wrist.x, middleTip.y - wrist.y);
    const distRing = Math.hypot(ringTip.x - wrist.x, ringTip.y - wrist.y);
    const distPinky = Math.hypot(pinkyTip.x - wrist.x, pinkyTip.y - wrist.y);

    const isIndexExt = distIndex > handScale * 1.1;
    const isMiddleExt = distMiddle > handScale * 1.1;
    const isRingExt = distRing > handScale * 1.0;
    const isPinkyExt = distPinky > handScale * 0.9;

    // 1. PINCH (Grab): Thumb tip close to index tip
    const PINCH_THRESHOLD = 0.38;
    const isPinching = normalizedPinch < PINCH_THRESHOLD;

    // 2. FIST (✊) Gesture: All 4 fingers folded into palm
    const isFist = !isIndexExt && !isMiddleExt && !isRingExt && !isPinkyExt;

    // 3. TWO FINGERS (✌️) Gesture: Index and Middle extended, Ring and Pinky closed
    const isTwoFingers = isIndexExt && isMiddleExt && !isRingExt && !isPinkyExt;

    // Rotation active if either Fist or Two Fingers is held
    const isRotating = isFist || isTwoFingers;

    // Open Palm check: 4 fingers extended and not pinching
    const isPalmOpen = isIndexExt && isMiddleExt && isRingExt && isPinkyExt && !isPinching;

    // Cursor position is midpoint of thumb and index tips (or center of fist)
    const rawMidX = isFist ? middleMcp.x : (thumbTip.x + indexTip.x) / 2;
    const rawMidY = isFist ? middleMcp.y : (thumbTip.y + indexTip.y) / 2;
    const screenNormX = 1.0 - rawMidX; // mirror horizontally
    const screenNormY = rawMidY;

    // Smooth cursor movement (exponential moving average)
    const smoothFactor = 0.35;
    const targetScreenX = screenNormX * window.innerWidth;
    const targetScreenY = screenNormY * window.innerHeight;

    // Calculate motion delta for smooth 3D scene rotation
    const deltaX = targetScreenX - this.cursor.x;
    const deltaY = targetScreenY - this.cursor.y;

    this.cursor.x += (targetScreenX - this.cursor.x) * smoothFactor;
    this.cursor.y += (targetScreenY - this.cursor.y) * smoothFactor;
    this.cursor.deltaX = deltaX;
    this.cursor.deltaY = deltaY;
    this.cursor.rawX = screenNormX;
    this.cursor.rawY = screenNormY;
    this.cursor.isPinching = isPinching;
    this.cursor.isFist = isFist;
    this.cursor.isTwoFingers = isTwoFingers;
    this.cursor.isRotating = isRotating;
    this.cursor.isPalmOpen = isPalmOpen;
    this.cursor.pinchDistance = normalizedPinch;

    // Draw holographic futuristic skeleton on PIP canvas
    this.drawSkeleton(landmarks, isPinching, isRotating, rawMidX, rawMidY);

    if (this.onUpdateCallback) {
      this.onUpdateCallback(this.cursor);
    }
  }

  drawSkeleton(landmarks, isPinching, isRotating, midX, midY) {
    if (!this.ctx || !this.canvas) return;

    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;

    // MediaPipe Hand 21 Connections
    const connections = [
      [0, 1], [1, 2], [2, 3], [3, 4],       // Thumb
      [0, 5], [5, 6], [6, 7], [7, 8],       // Index
      [5, 9], [9, 10], [10, 11], [11, 12],  // Middle
      [9, 13], [13, 14], [14, 15], [15, 16],// Ring
      [13, 17], [17, 18], [18, 19], [19, 20],// Pinky
      [0, 17]                               // Palm base
    ];

    ctx.save();
    // Mirror the PIP canvas drawing horizontally to match mirrored video
    ctx.scale(-1, 1);
    ctx.translate(-w, 0);

    const themeColor = isRotating ? '#ffaa00' : (isPinching ? '#00ff88' : '#00f0ff');

    // Draw glow bones
    ctx.lineWidth = 3;
    ctx.strokeStyle = themeColor;
    ctx.shadowColor = themeColor;
    ctx.shadowBlur = 8;

    connections.forEach(([i, j]) => {
      const p1 = landmarks[i];
      const p2 = landmarks[j];
      ctx.beginPath();
      ctx.moveTo(p1.x * w, p1.y * h);
      ctx.lineTo(p2.x * w, p2.y * h);
      ctx.stroke();
    });

    // Draw joint nodes
    landmarks.forEach((pt, idx) => {
      ctx.beginPath();
      const r = idx === 4 || idx === 8 ? 6 : 4;
      ctx.arc(pt.x * w, pt.y * h, r, 0, Math.PI * 2);
      ctx.fillStyle = idx === 4 || idx === 8 ? (isPinching ? '#00ff88' : '#ff0077') : '#00f0ff';
      ctx.shadowBlur = 6;
      ctx.fill();
    });

    // Draw pinch indicator connection between thumb (4) and index (8)
    const pThumb = landmarks[4];
    const pIndex = landmarks[8];
    ctx.beginPath();
    ctx.moveTo(pThumb.x * w, pThumb.y * h);
    ctx.lineTo(pIndex.x * w, pIndex.y * h);
    ctx.lineWidth = 2;
    ctx.strokeStyle = isPinching ? '#00ff88' : '#ffaa00';
    ctx.stroke();

    // Draw pinch reticle circle
    ctx.beginPath();
    ctx.arc(midX * w, midY * h, isPinching ? 12 : 8, 0, Math.PI * 2);
    ctx.strokeStyle = isPinching ? '#00ff88' : '#00e5ff';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.restore();
  }
}
