import confetti from 'canvas-confetti';
import { soundFX } from './audio.js';

export const GameState = {
  START: 'START',
  PLAYING: 'PLAYING',
  VICTORY: 'VICTORY',
  GAME_OVER: 'GAME_OVER'
};

export const WEAPON_MODELS = {
  mp40: {
    id: 'mp40',
    name: 'MP40 MASCHINENPISTOLE (9×19mm)',
    shortName: 'MP40 SMG',
    category: 'Submachine Gun (WWII)',
    caliber: '9×19mm Parabellum',
    finish: 'Stamped Blued Steel & Durfolit Bakelite',
    desc: 'Legendary WWII German open-bolt submachine gun with stamped receiver tube, telescoping recoil spring, under-folding steel stock, resting bar, and 32-round stick magazine.',
    badge: 'WWII SUBMACHINE GUN',
    icon: '⚡',
    image: './assets/weapons/mp40.jpg',
    partsCount: 8,
    defaultTimes: { easy: 130, medium: 90, hard: 60 }
  },
  awm: {
    id: 'awm',
    name: 'AWM / L115A3 TACTICAL SNIPER RIFLE',
    shortName: 'AWM SNIPER',
    category: 'Extreme-Range Sniper System',
    caliber: '.338 Lapua Magnum',
    finish: 'OD Green Composite Chassis & Match Stainless',
    desc: 'Elite British military turn-bolt sniper rifle with 27" fluted match barrel, Schmidt & Bender PM II 50mm high-power optic, dual-ported brake, and folding bipod.',
    badge: 'SNIPER ELITE',
    icon: '🎯',
    image: './assets/weapons/awm.jpg',
    partsCount: 8,
    defaultTimes: { easy: 140, medium: 100, hard: 65 }
  },
  spectre9: {
    id: 'spectre9',
    name: 'SPECTRE-9 TACTICAL COMBAT PISTOL',
    shortName: 'SPECTRE-9',
    category: 'Combat Sidearm',
    caliber: '9×19mm NATO Parabellum',
    finish: 'Matte Parkerized Black & Blued Steel',
    desc: 'Precision-machined military sidearm with CNC slide serrations, match fluted barrel, stippled grip, and RMR red-dot optic.',
    badge: 'STANDARD ISSUE',
    icon: '🔫',
    image: './assets/weapons/spectre9.jpg',
    partsCount: 8,
    defaultTimes: { easy: 120, medium: 90, hard: 60 }
  },
  nighthawk50: {
    id: 'nighthawk50',
    name: 'NIGHTHAWK .50 AE HEAVY CANNON',
    shortName: 'NIGHTHAWK .50',
    category: 'Heavy Magnum Pistol',
    caliber: '.50 Action Express',
    finish: 'Brushed Stainless Steel & Nitride Black',
    desc: 'Massive heavy-caliber magnum hand cannon featuring full-length top rib, gas-operated slide, muzzle brake, and combat hammer.',
    badge: 'MAGNUM CLASS',
    icon: '💥',
    image: './assets/weapons/nighthawk50.jpg',
    partsCount: 8,
    defaultTimes: { easy: 135, medium: 100, hard: 70 }
  },
  valkyrieCQB: {
    id: 'valkyrieCQB',
    name: 'VALKYRIE CQB-R TACTICAL CARBINE',
    shortName: 'VALKYRIE CQB',
    category: 'Close-Quarters Battle SBR',
    caliber: '5.56×45mm NATO',
    finish: 'Mil-Spec Type III Hardcoat Anodized',
    desc: 'Compact special-operations carbine with flattop upper receiver, M-LOK handguard, cold-hammered barrel, PMAG, and EOTech sight.',
    badge: 'SPECIAL FORCES',
    icon: '🛡️',
    image: './assets/weapons/valkyrieCQB.jpg',
    partsCount: 8,
    defaultTimes: { easy: 150, medium: 110, hard: 75 }
  }
};

export class GameEngine {
  constructor(device3d) {
    this.device = device3d;
    this.state = GameState.START;

    // Active weapon model
    this.currentWeaponId = localStorage.getItem('gesture_assembly_weapon') || 'mp40';
    if (!WEAPON_MODELS[this.currentWeaponId]) this.currentWeaponId = 'mp40';

    // Difficulty configs & levels
    this.difficulties = {
      easy: {
        key: 'easy',
        level: 1,
        title: 'LEVEL 1: RECRUIT ARMORER',
        time: 120,
        label: 'EASY',
        snapFactor: 1.3,
        baseScore: 200
      },
      medium: {
        key: 'medium',
        level: 2,
        title: 'LEVEL 2: FIELD TECHNICIAN',
        time: 90,
        label: 'MEDIUM',
        snapFactor: 1.0,
        baseScore: 250
      },
      hard: {
        key: 'hard',
        level: 3,
        title: 'LEVEL 3: MASTER GUNSMITH',
        time: 60,
        label: 'HARD',
        snapFactor: 0.85,
        baseScore: 300
      }
    };
    this.currentDifficulty = 'easy';

    // Initial load weapon in 3D device
    this.device.loadGunModel(this.currentWeaponId);

    // Game variables
    const initialConfig = this.getCurrentDifficultyConfig();
    this.timeRemaining = initialConfig.time;
    this.totalTime = initialConfig.time;
    this.score = 0;
    this.baseScoreEarned = 0;
    this.speedBonusEarned = 0;
    this.accuracyBonusEarned = 0;
    this.mistakes = 0;
    this.assembledCount = 0;
    this.totalComponents = 8;
    this.startTime = 0;
    this.completionTime = 0;

    // Timer interval
    this.timerInterval = null;

    // Callbacks for UI updates
    this.onStateChange = null;
    this.onTick = null;

    // Load persistent stats
    this.loadStats();
  }

  loadStats() {
    this.bestScore = parseInt(localStorage.getItem('gesture_assembly_best_score') || '0', 10);
    this.lastScore = parseInt(localStorage.getItem('gesture_assembly_last_score') || '0', 10);
    this.bestTime = parseFloat(localStorage.getItem('gesture_assembly_best_time') || '0');
  }

  saveStats() {
    localStorage.setItem('gesture_assembly_last_score', this.score.toString());
    if (this.score > this.bestScore) {
      this.bestScore = this.score;
      localStorage.setItem('gesture_assembly_best_score', this.score.toString());
    }
    if (this.completionTime > 0 && (this.bestTime === 0 || this.completionTime < this.bestTime)) {
      this.bestTime = this.completionTime;
      localStorage.setItem('gesture_assembly_best_time', this.completionTime.toFixed(1));
    }
  }

  setDifficulty(diffKey) {
    if (this.difficulties[diffKey]) {
      this.currentDifficulty = diffKey;
      const config = this.getCurrentDifficultyConfig();
      this.totalTime = config.time;
      this.timeRemaining = config.time;
    }
  }

  getCurrentWeapon() {
    return WEAPON_MODELS[this.currentWeaponId] || WEAPON_MODELS.mp40;
  }

  setWeapon(weaponId) {
    if (WEAPON_MODELS[weaponId]) {
      this.currentWeaponId = weaponId;
      localStorage.setItem('gesture_assembly_weapon', weaponId);
      this.device.loadGunModel(weaponId);
      const config = this.getCurrentDifficultyConfig();
      this.totalTime = config.time;
      this.timeRemaining = config.time;
      if (this.onTick) this.onTick(this.timeRemaining);
      if (this.onStateChange) this.onStateChange(this.state);
    }
  }

  setCustomTime(weaponId, diffKey, seconds) {
    const s = parseInt(seconds, 10);
    if (s > 10 && s <= 600) {
      localStorage.setItem(`gesture_assembly_time_${weaponId}_${diffKey}`, s.toString());
      if (this.currentWeaponId === weaponId && this.currentDifficulty === diffKey) {
        this.totalTime = s;
        this.timeRemaining = s;
        if (this.onTick) this.onTick(this.timeRemaining);
      }
    }
  }

  getWeaponTime(weaponId, diffKey) {
    const saved = localStorage.getItem(`gesture_assembly_time_${weaponId}_${diffKey}`);
    if (saved) return parseInt(saved, 10);
    const weapon = WEAPON_MODELS[weaponId];
    if (weapon && weapon.defaultTimes[diffKey]) return weapon.defaultTimes[diffKey];
    return this.difficulties[diffKey]?.time || 90;
  }

  getCurrentDifficultyConfig() {
    const base = this.difficulties[this.currentDifficulty] || this.difficulties.easy;
    const time = this.getWeaponTime(this.currentWeaponId, this.currentDifficulty);
    return {
      ...base,
      time
    };
  }

  getNextDifficulty() {
    if (this.currentDifficulty === 'easy') return 'medium';
    if (this.currentDifficulty === 'medium') return 'hard';
    return null;
  }

  start() {
    this.state = GameState.PLAYING;
    const config = this.getCurrentDifficultyConfig();
    this.totalTime = config.time;
    this.timeRemaining = config.time;
    this.score = 0;
    this.baseScoreEarned = 0;
    this.speedBonusEarned = 0;
    this.accuracyBonusEarned = 0;
    this.mistakes = 0;
    this.assembledCount = 0;
    this.totalComponents = this.device.components.length;
    this.startTime = performance.now();
    this.completionTime = 0;

    // Reset 3D components
    this.device.resetAll();

    if (this.onTick) this.onTick(this.timeRemaining);
    if (this.onStateChange) this.onStateChange(this.state);

    // Start countdown timer
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      if (this.state === GameState.PLAYING) {
        this.timeRemaining--;
        if (this.onTick) this.onTick(this.timeRemaining);

        if (this.timeRemaining <= 10 && this.timeRemaining > 0) {
          soundFX.playCountdownTick();
        }

        if (this.timeRemaining <= 0) {
          this.timeRemaining = 0;
          this.triggerGameOver();
        }
      }
    }, 1000);
  }

  pause() {
    if (this.state !== GameState.PLAYING) return;
    this.state = GameState.PAUSED;
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    if (this.onStateChange) this.onStateChange(this.state);
  }

  resume() {
    if (this.state !== GameState.PAUSED) return;
    this.state = GameState.PLAYING;
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      if (this.state === GameState.PLAYING) {
        this.timeRemaining--;
        if (this.onTick) this.onTick(this.timeRemaining);

        if (this.timeRemaining <= 10 && this.timeRemaining > 0) {
          soundFX.playCountdownTick();
        }

        if (this.timeRemaining <= 0) {
          this.timeRemaining = 0;
          this.triggerGameOver();
        }
      }
    }, 1000);
    if (this.onStateChange) this.onStateChange(this.state);
  }

  togglePause() {
    if (this.state === GameState.PLAYING) {
      this.pause();
    } else if (this.state === GameState.PAUSED) {
      this.resume();
    }
  }

  resetLevel() {
    this.start();
  }

  returnToHome() {
    this.state = GameState.START;
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    this.device.resetAll();
    if (this.onStateChange) this.onStateChange(this.state);
  }

  onComponentPlaced(component) {
    if (this.state !== GameState.PLAYING) return;

    const config = this.getCurrentDifficultyConfig();
    this.baseScoreEarned += config.baseScore;
    this.score = this.baseScoreEarned;
    this.assembledCount = this.device.getAssembledCount();

    soundFX.playSnap();

    // Check victory condition
    if (this.device.isFullyAssembled()) {
      this.triggerVictory();
    }
  }

  onIncorrectDrop() {
    if (this.state !== GameState.PLAYING) return;
    this.mistakes++;
    soundFX.playMistake();
  }

  triggerVictory() {
    this.state = GameState.VICTORY;
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }

    this.completionTime = (performance.now() - this.startTime) / 1000;

    // Speed bonus: 25 points per leftover second
    this.speedBonusEarned = Math.floor(this.timeRemaining * 25);
    // Accuracy bonus: max 500, reduced by mistakes
    this.accuracyBonusEarned = Math.max(0, 500 - this.mistakes * 50);

    this.score = this.baseScoreEarned + this.speedBonusEarned + this.accuracyBonusEarned;
    this.saveStats();

    soundFX.playVictory();

    // Fire fireworks celebration confetti
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#00f0ff', '#00ff88', '#ffaa00', '#ffffff', '#7209b7']
      });
      setTimeout(() => {
        confetti({
          particleCount: 80,
          angle: 60,
          spread: 60,
          origin: { x: 0.1, y: 0.7 },
          colors: ['#00f0ff', '#00ff88']
        });
        confetti({
          particleCount: 80,
          angle: 120,
          spread: 60,
          origin: { x: 0.9, y: 0.7 },
          colors: ['#ffaa00', '#ffffff']
        });
      }, 350);
    } catch (e) {
      // Confetti optional
    }

    if (this.onStateChange) this.onStateChange(this.state);
  }

  triggerGameOver() {
    this.state = GameState.GAME_OVER;
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    this.completionTime = this.totalTime;
    this.score = this.baseScoreEarned;
    this.saveStats();
    soundFX.playGameOver();

    if (this.onStateChange) this.onStateChange(this.state);
  }

  getAccuracy() {
    const attempts = this.assembledCount + this.mistakes;
    if (attempts === 0) return 100;
    return Math.round((this.assembledCount / attempts) * 100);
  }

  getRank() {
    const accuracy = this.getAccuracy();
    if (this.score >= 3200 && accuracy >= 90) return 'S-RANK OVERLORD';
    if (this.score >= 2600 && accuracy >= 80) return 'A-RANK CHIEF ARMORER';
    if (this.score >= 1800) return 'B-RANK FIELD SPECIALIST';
    return 'C-RANK CADET';
  }
}

