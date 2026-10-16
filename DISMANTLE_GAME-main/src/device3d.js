import * as THREE from 'three';

// Shared realistic PBR materials helper
function getGunMaterials(isGhost = false) {
  if (isGhost) {
    const ghostMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      emissive: 0x0088cc,
      emissiveIntensity: 0.65,
      transparent: true,
      opacity: 0.38,
      roughness: 0.2,
      metalness: 0.7,
      depthWrite: false
    });
    return {
      parkerizedBlack: ghostMat,
      bluedSteel: ghostMat,
      stainlessSteel: ghostMat,
      nitrideGold: ghostMat,
      polymerBlack: ghostMat,
      stippleGrip: ghostMat,
      brass: ghostMat,
      accentSafety: ghostMat,
      tritiumGreen: ghostMat,
      laserRed: ghostMat,
      opticGlass: ghostMat,
      darkIron: ghostMat,
      bakeliteBrown: ghostMat,
      stampedSteel: ghostMat,
      awmGreen: ghostMat,
      flutedSteel: ghostMat,
      scopeLens: ghostMat,
      ammoBrass: ghostMat,
      parkerizedMatte: ghostMat,
      walnutWood: ghostMat
    };
  }

  return {
    // 1. Military Parkerized Matte Black (phosphate anti-glare finish)
    parkerizedBlack: new THREE.MeshStandardMaterial({
      color: 0x1f2328,
      metalness: 0.88,
      roughness: 0.42,
      emissive: 0x090b0e,
      emissiveIntensity: 0.15
    }),
    // 2. High-Grade Blued Gun Steel (polished firearm slide & barrel steel)
    bluedSteel: new THREE.MeshStandardMaterial({
      color: 0x181c24,
      metalness: 0.94,
      roughness: 0.24,
      emissive: 0x0a1018,
      emissiveIntensity: 0.18
    }),
    // 3. Machined Stainless Steel / Inox (shiny machined weapon pins, guide rods & controls)
    stainlessSteel: new THREE.MeshStandardMaterial({
      color: 0xd8e2ec,
      metalness: 0.96,
      roughness: 0.16
    }),
    // 4. Titanium Nitride Gold (match-grade competition barrels & accents)
    nitrideGold: new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.96,
      roughness: 0.12,
      emissive: 0x4a3b00,
      emissiveIntensity: 0.35
    }),
    // 5. High-Impact Weapon Polymer (DuPont Zytel glass-filled nylon frame)
    polymerBlack: new THREE.MeshStandardMaterial({
      color: 0x191c20,
      metalness: 0.15,
      roughness: 0.72
    }),
    // 6. Aggressive Grip Stippling (laser-textured anti-slip grip panels)
    stippleGrip: new THREE.MeshStandardMaterial({
      color: 0x111316,
      metalness: 0.1,
      roughness: 0.88
    }),
    // 7. Polished Cartridge Brass (live round inspection view)
    brass: new THREE.MeshStandardMaterial({
      color: 0xd49b3d,
      metalness: 0.95,
      roughness: 0.18
    }),
    // 8. Competition Anodized Crimson / Safety Orange
    accentSafety: new THREE.MeshStandardMaterial({
      color: 0xd62828,
      metalness: 0.88,
      roughness: 0.25,
      emissive: 0x550000,
      emissiveIntensity: 0.35
    }),
    // 9. Glowing Tritium Radioactive Night Sight Vials
    tritiumGreen: new THREE.MeshStandardMaterial({
      color: 0x00ff88,
      emissive: 0x00ff88,
      emissiveIntensity: 2.8,
      roughness: 0.1
    }),
    // 10. Reflex Optic Laser Reticle Dot
    laserRed: new THREE.MeshStandardMaterial({
      color: 0xff0044,
      emissive: 0xff0044,
      emissiveIntensity: 3.5,
      roughness: 0.1
    }),
    // 11. Multi-Coated Optical Glass Lens
    opticGlass: new THREE.MeshStandardMaterial({
      color: 0x22d3ee,
      transparent: true,
      opacity: 0.45,
      roughness: 0.04,
      metalness: 0.85
    }),
    // 12. Dark Internal Iron & Breech Blocks
    darkIron: new THREE.MeshStandardMaterial({
      color: 0x121417,
      metalness: 0.9,
      roughness: 0.4
    }),
    // 13. WWII Bakelite / Durfolit Resin (MP40 lower receiver and grips)
    bakeliteBrown: new THREE.MeshStandardMaterial({
      color: 0x442017,
      metalness: 0.12,
      roughness: 0.44,
      emissive: 0x160805,
      emissiveIntensity: 0.12
    }),
    // 14. Cold-Rolled Stamped Sheet Steel (MP40 receiver tube & magazine)
    stampedSteel: new THREE.MeshStandardMaterial({
      color: 0x1b1f24,
      metalness: 0.93,
      roughness: 0.32,
      emissive: 0x090b0e,
      emissiveIntensity: 0.12
    }),
    // 15. Arctic Warfare OD Green Composite Chassis (AWM sniper stock)
    awmGreen: new THREE.MeshStandardMaterial({
      color: 0x2c3829,
      metalness: 0.18,
      roughness: 0.68,
      emissive: 0x0d140c,
      emissiveIntensity: 0.12
    }),
    // 16. CNC Machined Fluted Stainless Precision Barrel (AWM match barrel)
    flutedSteel: new THREE.MeshStandardMaterial({
      color: 0xd0d8e0,
      metalness: 0.96,
      roughness: 0.2,
      emissive: 0x14181c,
      emissiveIntensity: 0.08
    }),
    // 17. Schmidt & Bender Emerald Multi-Coated Sniper Scope Optics
    scopeLens: new THREE.MeshStandardMaterial({
      color: 0x059669,
      emissive: 0x047857,
      emissiveIntensity: 0.3,
      transparent: true,
      opacity: 0.55,
      roughness: 0.04,
      metalness: 0.8
    }),
    // 18. Heavy .338 Lapua Magnum Brass Cartridge
    ammoBrass: new THREE.MeshStandardMaterial({
      color: 0xe5ad35,
      metalness: 0.95,
      roughness: 0.16
    }),
    // 19. Tactical Matte Parkerized Finish (AWM action & scope body)
    parkerizedMatte: new THREE.MeshStandardMaterial({
      color: 0x14161a,
      metalness: 0.86,
      roughness: 0.52
    }),
    // 20. Walnut Armory Wood Finish
    walnutWood: new THREE.MeshStandardMaterial({
      color: 0x5a341a,
      metalness: 0.05,
      roughness: 0.72
    })
  };
}

export class Device3D {
  constructor(scene) {
    this.scene = scene;
    this.components = [];
    this.ghostGroup = new THREE.Group();
    this.deviceGroup = new THREE.Group();
    this.scene.add(this.ghostGroup);
    this.scene.add(this.deviceGroup);

    this.currentModelId = 'spectre9';

    // Tether line for magnetic guidance
    this.tetherLine = null;
    this.setupTetherLine();

    this.loadGunModel('spectre9');
    this.ghostGroup.visible = true;
  }

  setupTetherLine() {
    const geom = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, 0)
    ]);
    const mat = new THREE.LineDashedMaterial({
      color: 0x00f0ff,
      dashSize: 0.15,
      gapSize: 0.08,
      linewidth: 3,
      transparent: true,
      opacity: 0.85
    });
    this.tetherLine = new THREE.Line(geom, mat);
    this.tetherLine.computeLineDistances();
    this.tetherLine.visible = false;
    this.scene.add(this.tetherLine);
  }

  updateTether(fromPos, toPos, isValid) {
    if (!this.tetherLine) return;
    const posAttr = this.tetherLine.geometry.attributes.position;
    posAttr.setXYZ(0, fromPos.x, fromPos.y, fromPos.z);
    posAttr.setXYZ(1, toPos.x, toPos.y, toPos.z);
    posAttr.needsUpdate = true;
    this.tetherLine.computeLineDistances();
    this.tetherLine.material.color.setHex(isValid ? 0x00ff88 : 0x00f0ff);
    this.tetherLine.visible = true;
  }

  hideTether() {
    if (this.tetherLine) this.tetherLine.visible = false;
  }

  clearCurrentModel() {
    // Remove all existing children
    while (this.deviceGroup.children.length > 0) {
      const obj = this.deviceGroup.children[0];
      this.deviceGroup.remove(obj);
    }
    while (this.ghostGroup.children.length > 0) {
      const obj = this.ghostGroup.children[0];
      this.ghostGroup.remove(obj);
    }
    this.components = [];
    this.hideTether();
  }

  loadGunModel(modelId) {
    this.clearCurrentModel();
    this.currentModelId = modelId;

    let specs = [];
    if (modelId === 'mp40') {
      specs = this.getMP40Specs();
    } else if (modelId === 'awm') {
      specs = this.getAWMSpecs();
    } else if (modelId === 'nighthawk50') {
      specs = this.getNighthawkSpecs();
    } else if (modelId === 'valkyrieCQB') {
      specs = this.getValkyrieSpecs();
    } else {
      specs = this.getSpectreSpecs();
    }

    specs.forEach((spec, index) => {
      // 1. Interactive Mesh
      const mesh = spec.createMesh(false);
      mesh.name = spec.id;
      mesh.position.copy(spec.explodedPos);
      mesh.rotation.copy(spec.targetRot);
      mesh.userData = {
        componentId: spec.id,
        isComponent: true
      };

      mesh.traverse(child => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          child.userData.defaultEmissive = child.material.emissive ? child.material.emissive.clone() : new THREE.Color(0, 0, 0);
          child.userData.defaultColor = child.material.color.clone();
        }
      });
      this.deviceGroup.add(mesh);

      // 2. Ghost Target Mesh
      const ghostMesh = spec.createMesh(true);
      ghostMesh.position.copy(spec.targetPos);
      ghostMesh.rotation.copy(spec.targetRot);
      this.makeGhostMaterial(ghostMesh);
      this.ghostGroup.add(ghostMesh);

      // Component Registry
      this.components.push({
        id: spec.id,
        name: spec.name,
        category: spec.category,
        index,
        mesh,
        ghostMesh,
        targetPos: spec.targetPos.clone(),
        targetRot: spec.targetRot.clone(),
        explodedPos: spec.explodedPos.clone(),
        currentPos: spec.explodedPos.clone(),
        isAssembled: false,
        floatPhase: (Math.PI * 2 * index) / specs.length,
        snapDistance: spec.snapDistance
      });
    });

    return this.components;
  }

  makeGhostMaterial(group) {
    const ghostMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      emissive: 0x0088cc,
      emissiveIntensity: 0.65,
      transparent: true,
      opacity: 0.38,
      roughness: 0.2,
      metalness: 0.7,
      depthWrite: false
    });

    group.traverse(child => {
      if (child.isMesh) {
        child.material = ghostMat;
        child.castShadow = false;
        child.receiveShadow = false;
      }
    });
  }

  // =========================================================================
  // MODEL 1: SPECTRE-9 TACTICAL COMBAT PISTOL (9x19mm NATO)
  // =========================================================================
  getSpectreSpecs() {
    return [
      {
        id: 'frame',
        name: 'Lower Polymer Receiver & Grip Frame',
        category: 'Chassis / Receiver',
        targetPos: new THREE.Vector3(0, -0.4, 0),
        targetRot: new THREE.Euler(0, 0, 0),
        explodedPos: new THREE.Vector3(-4.5, 0.2, 0),
        snapDistance: 2.4,
        createMesh: isGhost => this.buildSpectreFrame(isGhost)
      },
      {
        id: 'barrel',
        name: 'Match-Grade Fluted Barrel (9×19mm)',
        category: 'Barrel Assembly',
        targetPos: new THREE.Vector3(0, 0.52, 0.5),
        targetRot: new THREE.Euler(0, 0, 0),
        explodedPos: new THREE.Vector3(3.2, 2.0, 0),
        snapDistance: 2.2,
        createMesh: isGhost => this.buildSpectreBarrel(isGhost)
      },
      {
        id: 'recoilSpring',
        name: 'Captured Recoil Spring & Steel Guide Rod',
        category: 'Cycling Mechanism',
        targetPos: new THREE.Vector3(0, 0.28, 0.45),
        targetRot: new THREE.Euler(0, 0, 0),
        explodedPos: new THREE.Vector3(3.3, 0.1, 0),
        snapDistance: 2.2,
        createMesh: isGhost => this.buildSpectreSpring(isGhost)
      },
      {
        id: 'slide',
        name: 'CNC Serrated Blued Tactical Slide',
        category: 'Upper Receiver / Slide',
        targetPos: new THREE.Vector3(0, 0.58, 0.1),
        targetRot: new THREE.Euler(0, 0, 0),
        explodedPos: new THREE.Vector3(0, 2.4, 0),
        snapDistance: 2.4,
        createMesh: isGhost => this.buildSpectreSlide(isGhost)
      },
      {
        id: 'magazine',
        name: '17-Round Double-Stack Steel Magazine',
        category: 'Ammunition Feed',
        targetPos: new THREE.Vector3(0, -1.35, -0.35),
        targetRot: new THREE.Euler(0.24, 0, 0),
        explodedPos: new THREE.Vector3(-3.0, -1.8, 0),
        snapDistance: 2.2,
        createMesh: isGhost => this.buildSpectreMagazine(isGhost)
      },
      {
        id: 'trigger',
        name: 'Flat-Face Skeletonized Match Trigger',
        category: 'Fire Control Group',
        targetPos: new THREE.Vector3(0, -0.55, 0.25),
        targetRot: new THREE.Euler(0, 0, 0),
        explodedPos: new THREE.Vector3(-1.0, -2.6, 0),
        snapDistance: 2.2,
        createMesh: isGhost => this.buildSpectreTrigger(isGhost)
      },
      {
        id: 'sight',
        name: 'Trijicon RMR-Style Micro Reflex Optic',
        category: 'Targeting Optic',
        targetPos: new THREE.Vector3(0, 1.15, -0.2),
        targetRot: new THREE.Euler(0, 0, 0),
        explodedPos: new THREE.Vector3(-3.2, 2.2, 0),
        snapDistance: 2.2,
        createMesh: isGhost => this.buildSpectreSight(isGhost)
      },
      {
        id: 'tacticalLight',
        name: 'SureFire X300-Style Weaponlight',
        category: 'Under-Barrel Accessory',
        targetPos: new THREE.Vector3(0, -0.05, 1.15),
        targetRot: new THREE.Euler(0, 0, 0),
        explodedPos: new THREE.Vector3(2.8, -1.8, 0),
        snapDistance: 2.2,
        createMesh: isGhost => this.buildSpectreLight(isGhost)
      }
    ];
  }

  buildSpectreFrame(isGhost) {
    const m = getGunMaterials(isGhost);
    const g = new THREE.Group();

    // 1. Dust Cover and Slide Rails
    const rail = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.44, 2.5), m.polymerBlack);
    rail.position.set(0, 0.15, 0.2);
    g.add(rail);

    // Steel slide rail insert tabs
    [-0.34, 0.34].forEach(x => {
      const tab = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.08, 0.4), m.stainlessSteel);
      tab.position.set(x, 0.38, -0.5);
      g.add(tab);
    });

    // 2. Picatinny 1913 Under-Barrel Rail with Cross-Slots
    const pic = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.18, 1.15), m.darkIron);
    pic.position.set(0, -0.12, 0.9);
    g.add(pic);

    for (let i = -2; i <= 2; i++) {
      const slot = new THREE.Mesh(new THREE.BoxGeometry(0.66, 0.06, 0.09), m.parkerizedBlack);
      slot.position.set(0, -0.18, 0.9 + i * 0.16);
      g.add(slot);
    }

    // 3. Ergonomic Grip with Grip Angle
    const grip = new THREE.Mesh(new THREE.BoxGeometry(0.68, 1.85, 0.96), m.polymerBlack);
    grip.position.set(0, -0.92, -0.32);
    grip.rotation.x = 0.24;
    g.add(grip);

    // Grip stippling side panels
    [-0.35, 0.35].forEach(x => {
      const stipple = new THREE.Mesh(new THREE.BoxGeometry(0.02, 1.35, 0.76), m.stippleGrip);
      stipple.position.set(x, -0.92, -0.32);
      stipple.rotation.x = 0.24;
      g.add(stipple);
    });

    // 4. Undercut Trigger Guard Loop
    const guard = new THREE.Mesh(new THREE.TorusGeometry(0.38, 0.065, 12, 28, Math.PI), m.polymerBlack);
    guard.position.set(0, -0.15, 0.25);
    guard.rotation.y = Math.PI / 2;
    g.add(guard);

    // 5. Extended Beavertail Overhang
    const beaver = new THREE.Mesh(new THREE.BoxGeometry(0.66, 0.18, 0.55), m.polymerBlack);
    beaver.position.set(0, 0.06, -0.85);
    beaver.rotation.x = -0.28;
    g.add(beaver);

    // 6. Slide Stop Lever & Takedown Pins (Stainless Steel)
    const slideStop = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.12, 0.35), m.stainlessSteel);
    slideStop.position.set(-0.37, 0.22, -0.15);
    g.add(slideStop);

    const takedownPin = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.74, 12), m.stainlessSteel);
    takedownPin.rotation.z = Math.PI / 2;
    takedownPin.position.set(0, 0.1, 0.35);
    g.add(takedownPin);

    return g;
  }

  buildSpectreBarrel(isGhost) {
    const m = getGunMaterials(isGhost);
    const g = new THREE.Group();

    // Breech Locking Chamber Block (Blackened Steel with Caliber Rollmark)
    const chamber = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.54, 0.72), m.bluedSteel);
    chamber.position.set(0, 0, -0.55);
    g.add(chamber);

    // Polished Feed Ramp Angle
    const ramp = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.18, 0.2), m.stainlessSteel);
    ramp.position.set(0, -0.22, -0.82);
    ramp.rotation.x = 0.5;
    g.add(ramp);

    // Titanium Nitride Fluted Barrel Tube
    const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.21, 0.21, 1.85, 24), m.nitrideGold);
    tube.position.set(0, 0, 0.5);
    tube.rotation.x = Math.PI / 2;
    g.add(tube);

    // Spiral cooling flutes along barrel
    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2;
      const flute = new THREE.Mesh(new THREE.BoxGeometry(0.04, 1.15, 0.04), m.darkIron);
      flute.position.set(Math.cos(angle) * 0.2, 0.45, Math.sin(angle) * 0.2);
      flute.rotation.x = Math.PI / 2;
      g.add(flute);
    }

    // 11-Degree Recessed Target Muzzle Crown
    const crown = new THREE.Mesh(new THREE.CylinderGeometry(0.21, 0.12, 0.15, 20), m.bluedSteel);
    crown.position.set(0, 0, 1.45);
    crown.rotation.x = Math.PI / 2;
    g.add(crown);

    // Deep rifled muzzle bore hole
    const bore = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.3, 16), m.darkIron);
    bore.position.set(0, 0, 1.55);
    bore.rotation.x = Math.PI / 2;
    g.add(bore);

    return g;
  }

  buildSpectreSpring(isGhost) {
    const m = getGunMaterials(isGhost);
    const g = new THREE.Group();

    // Mirror stainless steel guide rod
    const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.075, 1.85, 16), m.stainlessSteel);
    rod.rotation.x = Math.PI / 2;
    g.add(rod);

    // Front Flanged Retention Collar
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.12, 16), m.bluedSteel);
    cap.position.set(0, 0, 0.92);
    cap.rotation.x = Math.PI / 2;
    g.add(cap);

    // Rear Guide Lug Base
    const rearLug = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.25, 0.14), m.bluedSteel);
    rearLug.position.set(0, 0, -0.9);
    g.add(rearLug);

    // High-Tension Dual Wound Spring Coils (Blued Spring Steel)
    const coilCount = 15;
    for (let i = 0; i < coilCount; i++) {
      const spring = new THREE.Mesh(new THREE.TorusGeometry(0.145, 0.032, 10, 24), m.bluedSteel);
      spring.position.set(0, 0, (i - coilCount / 2) * 0.11);
      g.add(spring);
    }

    return g;
  }

  buildSpectreSlide(isGhost) {
    const m = getGunMaterials(isGhost);
    const g = new THREE.Group();

    // Main Slide Body (CNC Machined Blued Gun Steel)
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.66, 2.95), m.bluedSteel);
    g.add(body);

    // Beveled Slide Top Edges (Chamfer relief)
    [-0.34, 0.34].forEach(x => {
      const bevel = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.12, 2.9), m.parkerizedBlack);
      bevel.position.set(x, 0.3, 0);
      g.add(bevel);
    });

    // Lowered & Flared Ejection Port with Breech Relief
    const port = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.36, 0.78), m.darkIron);
    port.position.set(0.2, 0.18, -0.42);
    g.add(port);

    // Extractor Claw Bar (Stainless Steel)
    const extractor = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.08, 0.3), m.stainlessSteel);
    extractor.position.set(0.37, 0.16, -0.2);
    g.add(extractor);

    // Deep CNC Cocking Serrations (Rear & Front)
    for (let i = -4; i <= 2; i++) {
      [-0.37, 0.37].forEach(x => {
        const ser = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.44, 0.06), m.darkIron);
        ser.position.set(x, 0.02, -1.0 + i * 0.09);
        g.add(ser);
      });
    }

    for (let i = -2; i <= 3; i++) {
      [-0.37, 0.37].forEach(x => {
        const ser = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.38, 0.06), m.darkIron);
        ser.position.set(x, -0.02, 0.8 + i * 0.09);
        g.add(ser);
      });
    }

    // Front Blade Sight with Tritium Dot
    const fSight = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.18, 0.14), m.bluedSteel);
    fSight.position.set(0, 0.4, 1.28);
    g.add(fSight);

    const fDot = new THREE.Mesh(new THREE.SphereGeometry(0.038, 8, 8), m.tritiumGreen);
    fDot.position.set(0, 0.4, 1.22);
    g.add(fDot);

    // Rear Combat Notch Sight with Dual White Dots
    const rSight = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.18, 0.16), m.bluedSteel);
    rSight.position.set(0, 0.4, -1.35);
    g.add(rSight);

    [-0.1, 0.1].forEach(x => {
      const rDot = new THREE.Mesh(new THREE.SphereGeometry(0.035, 8, 8), m.stainlessSteel);
      rDot.position.set(x, 0.4, -1.28);
      g.add(rDot);
    });

    return g;
  }

  buildSpectreMagazine(isGhost) {
    const m = getGunMaterials(isGhost);
    const g = new THREE.Group();

    // Stamped Steel Magazine Body (Black Oxide)
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.54, 2.15, 0.82), m.parkerizedBlack);
    g.add(body);

    // Tapered Feed Lips at Top
    const lips = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.14, 0.65), m.darkIron);
    lips.position.set(0, 1.12, 0.05);
    g.add(lips);

    // High-Visibility Orange Anti-Tilt Follower
    const follower = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.1, 0.5), m.accentSafety);
    follower.position.set(0, 1.08, 0.05);
    g.add(follower);

    // Witness Round Inspection Holes on Spine (Showing Brass Cartridges)
    for (let i = -2; i <= 2; i++) {
      const hole = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.56, 12), m.brass);
      hole.position.set(0, i * 0.32, 0.12);
      hole.rotation.z = Math.PI / 2;
      g.add(hole);
    }

    // Extended Textured Polymer Basepad
    const basepad = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.34, 0.98), m.polymerBlack);
    basepad.position.set(0, -1.18, 0);
    g.add(basepad);

    return g;
  }

  buildSpectreTrigger(isGhost) {
    const m = getGunMaterials(isGhost);
    const g = new THREE.Group();

    // Curved Match Trigger Shoe (Anodized Aluminum)
    const shoe = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.56, 0.14), m.bluedSteel);
    shoe.rotation.x = -0.16;
    g.add(shoe);

    // Red Safety Blade Inset (Glock-style Passive Drop Safety)
    const safety = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.44, 0.09), m.accentSafety);
    safety.position.set(0, 0, 0.06);
    safety.rotation.x = -0.16;
    g.add(safety);

    // Top Pivot Linkage Pin
    const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.32, 12), m.stainlessSteel);
    pin.position.set(0, 0.28, -0.12);
    pin.rotation.z = Math.PI / 2;
    g.add(pin);

    return g;
  }

  buildSpectreSight(isGhost) {
    const m = getGunMaterials(isGhost);
    const g = new THREE.Group();

    // 7075-T6 Aluminum Optic Body Mount
    const base = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.14, 0.96), m.bluedSteel);
    g.add(base);

    // Protective Optic Hood Arch
    const hood = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 0.72, 16, 1, true, 0, Math.PI), m.parkerizedBlack);
    hood.position.set(0, 0.26, 0);
    hood.rotation.x = Math.PI / 2;
    hood.rotation.z = Math.PI / 2;
    g.add(hood);

    // Multi-Coated Reflex Glass Lens
    const lens = new THREE.Mesh(new THREE.PlaneGeometry(0.56, 0.44), m.opticGlass);
    lens.position.set(0, 0.26, -0.06);
    g.add(lens);

    // Glowing Laser Red-Dot Reticle
    const dot = new THREE.Mesh(new THREE.SphereGeometry(0.045, 12, 12), m.laserRed);
    dot.position.set(0, 0.26, -0.05);
    g.add(dot);

    // Elevation & Windage Adjustment Screws
    const screw1 = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.1, 10), m.stainlessSteel);
    screw1.position.set(0, 0.44, 0.1);
    g.add(screw1);

    return g;
  }

  buildSpectreLight(isGhost) {
    const m = getGunMaterials(isGhost);
    const g = new THREE.Group();

    // Aluminum Flashlight Body
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.64, 0.42, 1.15), m.parkerizedBlack);
    g.add(body);

    // Knurled Bezel Ring at Front
    const bezel = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.25, 20), m.darkIron);
    bezel.position.set(0, -0.02, 0.65);
    bezel.rotation.x = Math.PI / 2;
    g.add(bezel);

    // Glass Reflector Lens with High-Output LED Emitter
    const glass = new THREE.Mesh(new THREE.CircleGeometry(0.2, 16), m.opticGlass);
    glass.position.set(0, -0.02, 0.78);
    g.add(glass);

    const led = new THREE.Mesh(new THREE.SphereGeometry(0.08, 10, 10), m.tritiumGreen);
    led.position.set(0, -0.02, 0.74);
    g.add(led);

    // Rail Cross-Bar Clamp & Thumbscrew
    const screw = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.76, 12), m.stainlessSteel);
    screw.position.set(0, 0.18, 0);
    screw.rotation.z = Math.PI / 2;
    g.add(screw);

    return g;
  }

  // =========================================================================
  // MODEL 2: NIGHTHAWK .50 AE HEAVY CANNON (Desert Eagle Style)
  // =========================================================================
  getNighthawkSpecs() {
    return [
      {
        id: 'frame',
        name: 'Heavy Forged Steel Magnum Frame',
        category: 'Chassis / Receiver',
        targetPos: new THREE.Vector3(0, -0.4, 0),
        targetRot: new THREE.Euler(0, 0, 0),
        explodedPos: new THREE.Vector3(-4.5, 0.2, 0),
        snapDistance: 2.4,
        createMesh: isGhost => this.buildNighthawkFrame(isGhost)
      },
      {
        id: 'barrel',
        name: 'Polygonal .50 AE Barrel & Top Rib',
        category: 'Barrel Assembly',
        targetPos: new THREE.Vector3(0, 0.58, 0.55),
        targetRot: new THREE.Euler(0, 0, 0),
        explodedPos: new THREE.Vector3(3.2, 2.0, 0),
        snapDistance: 2.2,
        createMesh: isGhost => this.buildNighthawkBarrel(isGhost)
      },
      {
        id: 'recoilSpring',
        name: 'Dual Magnum Guide Rods & Springs',
        category: 'Cycling Mechanism',
        targetPos: new THREE.Vector3(0, 0.26, 0.45),
        targetRot: new THREE.Euler(0, 0, 0),
        explodedPos: new THREE.Vector3(3.3, 0.1, 0),
        snapDistance: 2.2,
        createMesh: isGhost => this.buildNighthawkSpring(isGhost)
      },
      {
        id: 'slide',
        name: 'Gas-Operated Triangular Magnum Slide',
        category: 'Upper Receiver / Slide',
        targetPos: new THREE.Vector3(0, 0.65, 0.08),
        targetRot: new THREE.Euler(0, 0, 0),
        explodedPos: new THREE.Vector3(0, 2.4, 0),
        snapDistance: 2.4,
        createMesh: isGhost => this.buildNighthawkSlide(isGhost)
      },
      {
        id: 'magazine',
        name: '7-Round .50 AE Stamped Steel Magazine',
        category: 'Ammunition Feed',
        targetPos: new THREE.Vector3(0, -1.35, -0.32),
        targetRot: new THREE.Euler(0.24, 0, 0),
        explodedPos: new THREE.Vector3(-3.0, -1.8, 0),
        snapDistance: 2.2,
        createMesh: isGhost => this.buildNighthawkMagazine(isGhost)
      },
      {
        id: 'trigger',
        name: 'Single-Action Match Trigger & Hammer',
        category: 'Fire Control Group',
        targetPos: new THREE.Vector3(0, -0.55, 0.25),
        targetRot: new THREE.Euler(0, 0, 0),
        explodedPos: new THREE.Vector3(-1.0, -2.6, 0),
        snapDistance: 2.2,
        createMesh: isGhost => this.buildNighthawkTrigger(isGhost)
      },
      {
        id: 'sight',
        name: 'Tubular Tactical Aimpoint Optic',
        category: 'Targeting Optic',
        targetPos: new THREE.Vector3(0, 1.25, -0.2),
        targetRot: new THREE.Euler(0, 0, 0),
        explodedPos: new THREE.Vector3(-3.2, 2.2, 0),
        snapDistance: 2.2,
        createMesh: isGhost => this.buildNighthawkSight(isGhost)
      },
      {
        id: 'tacticalLight',
        name: 'Military LAM Laser Aiming Module',
        category: 'Under-Barrel Accessory',
        targetPos: new THREE.Vector3(0, -0.05, 1.15),
        targetRot: new THREE.Euler(0, 0, 0),
        explodedPos: new THREE.Vector3(2.8, -1.8, 0),
        snapDistance: 2.2,
        createMesh: isGhost => this.buildNighthawkLAM(isGhost)
      }
    ];
  }

  buildNighthawkFrame(isGhost) {
    const m = getGunMaterials(isGhost);
    const g = new THREE.Group();

    // Heavy Brushed Stainless Steel Frame
    const frame = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.48, 2.65), m.stainlessSteel);
    frame.position.set(0, 0.16, 0.2);
    g.add(frame);

    // Massive Magnum Grip with Rubberized Panels & Hex Screws
    const grip = new THREE.Mesh(new THREE.BoxGeometry(0.74, 1.95, 1.05), m.polymerBlack);
    grip.position.set(0, -0.95, -0.32);
    grip.rotation.x = 0.24;
    g.add(grip);

    [-0.38, 0.38].forEach(x => {
      const panel = new THREE.Mesh(new THREE.BoxGeometry(0.04, 1.45, 0.85), m.stippleGrip);
      panel.position.set(x, -0.95, -0.32);
      panel.rotation.x = 0.24;
      g.add(panel);

      // Grip hex screws
      [-0.4, 0.4].forEach(y => {
        const screw = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.06, 6), m.bluedSteel);
        screw.position.set(x * 1.02, -0.95 + y, -0.32);
        screw.rotation.z = Math.PI / 2;
        g.add(screw);
      });
    });

    // Square Combat Trigger Guard
    const guard = new THREE.Mesh(new THREE.BoxGeometry(0.74, 0.1, 0.85), m.stainlessSteel);
    guard.position.set(0, -0.45, 0.25);
    g.add(guard);

    // Ambidextrous Thumb Safety Lever
    const safety = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.16, 0.35), m.bluedSteel);
    safety.position.set(-0.4, 0.32, -0.7);
    g.add(safety);

    return g;
  }

  buildNighthawkBarrel(isGhost) {
    const m = getGunMaterials(isGhost);
    const g = new THREE.Group();

    // Massive .50 AE Chamber Block
    const chamber = new THREE.Mesh(new THREE.BoxGeometry(0.66, 0.62, 0.8), m.bluedSteel);
    chamber.position.set(0, 0, -0.55);
    g.add(chamber);

    // Full-length Top Barrel Rib with Weaver Cutouts
    const rib = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.2, 2.2), m.stainlessSteel);
    rib.position.set(0, 0.34, 0.45);
    g.add(rib);

    // Heavy .50 AE Polygonal Rifled Barrel Tube
    const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.26, 1.95, 24), m.stainlessSteel);
    tube.position.set(0, 0, 0.55);
    tube.rotation.x = Math.PI / 2;
    g.add(tube);

    // Integrated Quad-Port Muzzle Brake / Compensator
    const comp = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.6, 0.45), m.bluedSteel);
    comp.position.set(0, 0, 1.58);
    g.add(comp);

    // Side blast ports
    [-0.37, 0.37].forEach(x => {
      const vent = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.3, 0.25), m.darkIron);
      vent.position.set(x, 0.05, 1.58);
      g.add(vent);
    });

    // Massive .50 Caliber Muzzle Bore
    const bore = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.3, 20), m.darkIron);
    bore.position.set(0, 0, 1.7);
    bore.rotation.x = Math.PI / 2;
    g.add(bore);

    return g;
  }

  buildNighthawkSpring(isGhost) {
    const m = getGunMaterials(isGhost);
    const g = new THREE.Group();

    // Twin Dual Stainless Guide Rods
    [-0.14, 0.14].forEach(x => {
      const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 1.85, 14), m.stainlessSteel);
      rod.position.set(x, 0, 0);
      rod.rotation.x = Math.PI / 2;
      g.add(rod);

      // Magnum Spring Coils
      for (let i = 0; i < 14; i++) {
        const coil = new THREE.Mesh(new THREE.TorusGeometry(0.09, 0.024, 8, 18), m.bluedSteel);
        coil.position.set(x, 0, (i - 7) * 0.12);
        g.add(coil);
      }
    });

    // Dual-hole front guide bracket
    const bracket = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.2, 0.1), m.bluedSteel);
    bracket.position.set(0, 0, 0.92);
    g.add(bracket);

    return g;
  }

  buildNighthawkSlide(isGhost) {
    const m = getGunMaterials(isGhost);
    const g = new THREE.Group();

    // Triangular Faceted Magnum Slide Body
    const slide = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.72, 2.85), m.stainlessSteel);
    g.add(slide);

    // Massive .50 AE Ejection Port
    const port = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.42, 0.95), m.darkIron);
    port.position.set(0.22, 0.22, -0.42);
    g.add(port);

    // Deep Cocking Serrations
    for (let i = -4; i <= 1; i++) {
      [-0.41, 0.41].forEach(x => {
        const ser = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.5, 0.08), m.bluedSteel);
        ser.position.set(x, 0.04, -1.0 + i * 0.11);
        g.add(ser);
      });
    }

    // Heavy Combat Rear Sight
    const sight = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.2, 0.18), m.bluedSteel);
    sight.position.set(0, 0.44, -1.3);
    g.add(sight);

    return g;
  }

  buildNighthawkMagazine(isGhost) {
    const m = getGunMaterials(isGhost);
    const g = new THREE.Group();

    // Heavy Stamped Steel Magazine Body
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.58, 2.2, 0.92), m.bluedSteel);
    g.add(body);

    // Visible .50 Action Express Brass Cartridge at Top
    const brass = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.72, 16), m.brass);
    brass.position.set(0, 1.15, 0.05);
    brass.rotation.x = Math.PI / 2;
    g.add(brass);

    // Copper Bullet Tip
    const bullet = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.22, 16), m.accentSafety);
    bullet.position.set(0, 1.15, 0.48);
    bullet.rotation.x = Math.PI / 2;
    g.add(bullet);

    // Heavy Steel Baseplate
    const base = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.25, 1.05), m.stainlessSteel);
    base.position.set(0, -1.18, 0);
    g.add(base);

    return g;
  }

  buildNighthawkTrigger(isGhost) {
    const m = getGunMaterials(isGhost);
    const g = new THREE.Group();

    // Curved Single-Action Match Trigger Shoe
    const shoe = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.55, 0.16), m.stainlessSteel);
    shoe.rotation.x = -0.18;
    g.add(shoe);

    // Cocked Combat Hammer at Rear
    const hammer = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.45, 0.25), m.bluedSteel);
    hammer.position.set(0, 0.52, -1.1);
    hammer.rotation.x = -0.45;
    g.add(hammer);

    return g;
  }

  buildNighthawkSight(isGhost) {
    const m = getGunMaterials(isGhost);
    const g = new THREE.Group();

    // Aimpoint Tubular Optic Body
    const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 1.1, 20), m.bluedSteel);
    tube.rotation.x = Math.PI / 2;
    g.add(tube);

    // Heavy Mounting Cross-Clamps
    [-0.32, 0.32].forEach(z => {
      const clamp = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.2, 0.2), m.parkerizedBlack);
      clamp.position.set(0, -0.22, z);
      g.add(clamp);
    });

    // Coated Lens & Red Reticle Dot
    const lens = new THREE.Mesh(new THREE.CircleGeometry(0.2, 16), m.opticGlass);
    lens.position.set(0, 0, -0.5);
    g.add(lens);

    const dot = new THREE.Mesh(new THREE.SphereGeometry(0.045, 10, 10), m.laserRed);
    dot.position.set(0, 0, -0.45);
    g.add(dot);

    return g;
  }

  buildNighthawkLAM(isGhost) {
    const m = getGunMaterials(isGhost);
    const g = new THREE.Group();

    // Military Tactical Laser Aiming Module Body
    const lam = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.45, 1.2), m.parkerizedBlack);
    g.add(lam);

    // Dual Emitter Lenses (IR & Visible Laser)
    [-0.18, 0.18].forEach(x => {
      const emitter = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.18, 14), m.darkIron);
      emitter.position.set(x, 0, 0.65);
      emitter.rotation.x = Math.PI / 2;
      g.add(emitter);

      const diode = new THREE.Mesh(new THREE.SphereGeometry(0.04, 8, 8), m.laserRed);
      diode.position.set(x, 0, 0.72);
      g.add(diode);
    });

    return g;
  }

  // =========================================================================
  // MODEL 3: VALKYRIE CQB-R TACTICAL CARBINE (5.56x45mm NATO SBR)
  // =========================================================================
  getValkyrieSpecs() {
    return [
      {
        id: 'frame',
        name: 'Mil-Spec Forged Lower Receiver & Grip',
        category: 'Chassis / Receiver',
        targetPos: new THREE.Vector3(0, -0.4, 0),
        targetRot: new THREE.Euler(0, 0, 0),
        explodedPos: new THREE.Vector3(-4.5, 0.2, 0),
        snapDistance: 2.4,
        createMesh: isGhost => this.buildValkyrieLower(isGhost)
      },
      {
        id: 'barrel',
        name: 'Cold-Hammer-Forged 10.5" Barrel & Gas Tube',
        category: 'Barrel Assembly',
        targetPos: new THREE.Vector3(0, 0.52, 0.65),
        targetRot: new THREE.Euler(0, 0, 0),
        explodedPos: new THREE.Vector3(3.2, 2.0, 0),
        snapDistance: 2.2,
        createMesh: isGhost => this.buildValkyrieBarrel(isGhost)
      },
      {
        id: 'recoilSpring',
        name: 'Carbine Buffer Weight & Spring',
        category: 'Cycling Mechanism',
        targetPos: new THREE.Vector3(0, 0.28, -0.65),
        targetRot: new THREE.Euler(0, 0, 0),
        explodedPos: new THREE.Vector3(3.3, 0.1, 0),
        snapDistance: 2.2,
        createMesh: isGhost => this.buildValkyrieBuffer(isGhost)
      },
      {
        id: 'slide',
        name: 'Flattop Upper Receiver & M-LOK Handguard',
        category: 'Upper Receiver / Handguard',
        targetPos: new THREE.Vector3(0, 0.58, 0.2),
        targetRot: new THREE.Euler(0, 0, 0),
        explodedPos: new THREE.Vector3(0, 2.4, 0),
        snapDistance: 2.4,
        createMesh: isGhost => this.buildValkyrieUpper(isGhost)
      },
      {
        id: 'magazine',
        name: '30-Round Curved Polymer PMAG Magazine',
        category: 'Ammunition Feed',
        targetPos: new THREE.Vector3(0, -1.35, 0.15),
        targetRot: new THREE.Euler(-0.15, 0, 0),
        explodedPos: new THREE.Vector3(-3.0, -1.8, 0),
        snapDistance: 2.2,
        createMesh: isGhost => this.buildValkyriePMAG(isGhost)
      },
      {
        id: 'trigger',
        name: 'Two-Stage Combat Match Trigger Group',
        category: 'Fire Control Group',
        targetPos: new THREE.Vector3(0, -0.55, 0.05),
        targetRot: new THREE.Euler(0, 0, 0),
        explodedPos: new THREE.Vector3(-1.0, -2.6, 0),
        snapDistance: 2.2,
        createMesh: isGhost => this.buildValkyrieTrigger(isGhost)
      },
      {
        id: 'sight',
        name: 'EOTech-Style Holographic Weapon Sight',
        category: 'Targeting Optic',
        targetPos: new THREE.Vector3(0, 1.25, -0.1),
        targetRot: new THREE.Euler(0, 0, 0),
        explodedPos: new THREE.Vector3(-3.2, 2.2, 0),
        snapDistance: 2.2,
        createMesh: isGhost => this.buildValkyrieEOTech(isGhost)
      },
      {
        id: 'tacticalLight',
        name: 'Offset Scout-Light & Hand-Stop Grip',
        category: 'Under-Barrel Accessory',
        targetPos: new THREE.Vector3(0, 0.1, 1.45),
        targetRot: new THREE.Euler(0, 0, 0),
        explodedPos: new THREE.Vector3(2.8, -1.8, 0),
        snapDistance: 2.2,
        createMesh: isGhost => this.buildValkyrieForegrip(isGhost)
      }
    ];
  }

  buildValkyrieLower(isGhost) {
    const m = getGunMaterials(isGhost);
    const g = new THREE.Group();

    // 7075-T6 Forged Lower Receiver Body
    const lower = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.52, 2.4), m.parkerizedBlack);
    lower.position.set(0, 0.15, 0);
    g.add(lower);

    // Flared Magazine Well Funnel
    const magwell = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.65, 0.95), m.bluedSteel);
    magwell.position.set(0, -0.22, 0.45);
    g.add(magwell);

    // Ergonomic A2 Pistol Grip
    const grip = new THREE.Mesh(new THREE.BoxGeometry(0.68, 1.8, 0.95), m.polymerBlack);
    grip.position.set(0, -0.9, -0.45);
    grip.rotation.x = 0.28;
    g.add(grip);

    // Buffer Tube Extension at Rear
    const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 1.2, 16), m.parkerizedBlack);
    tube.position.set(0, 0.25, -1.5);
    tube.rotation.x = Math.PI / 2;
    g.add(tube);

    // Bolt Catch Paddle Lever (Stainless Steel)
    const boltCatch = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.2, 0.2), m.stainlessSteel);
    boltCatch.position.set(-0.38, 0.35, 0.1);
    g.add(boltCatch);

    return g;
  }

  buildValkyrieBarrel(isGhost) {
    const m = getGunMaterials(isGhost);
    const g = new THREE.Group();

    // Chrome-Moly Barrel Tube
    const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 2.3, 20), m.bluedSteel);
    barrel.position.set(0, 0, 0.7);
    barrel.rotation.x = Math.PI / 2;
    g.add(barrel);

    // Low-Profile Gas Block & Gas Tube
    const gasBlock = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.38, 0.3), m.darkIron);
    gasBlock.position.set(0, 0.1, 0.9);
    g.add(gasBlock);

    const gasTube = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.4, 8), m.stainlessSteel);
    gasTube.position.set(0, 0.25, 0.1);
    gasTube.rotation.x = Math.PI / 2;
    g.add(gasTube);

    // A2 Steel Birdcage Flash Hider with Vents
    const hider = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.45, 16), m.bluedSteel);
    hider.position.set(0, 0, 1.88);
    hider.rotation.x = Math.PI / 2;
    g.add(hider);

    for (let i = 0; i < 5; i++) {
      const angle = (i * Math.PI * 2) / 5;
      const slot = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.25, 0.04), m.darkIron);
      slot.position.set(Math.cos(angle) * 0.21, Math.sin(angle) * 0.21, 1.88);
      g.add(slot);
    }

    return g;
  }

  buildValkyrieBuffer(isGhost) {
    const m = getGunMaterials(isGhost);
    const g = new THREE.Group();

    // Long Carbine Buffer Spring
    for (let i = 0; i < 16; i++) {
      const coil = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.028, 8, 20), m.bluedSteel);
      coil.position.set(0, 0, (i - 8) * 0.12);
      g.add(coil);
    }

    // Stainless Steel Buffer Weight Body
    const weight = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.65, 16), m.stainlessSteel);
    weight.position.set(0, 0, 0.55);
    weight.rotation.x = Math.PI / 2;
    g.add(weight);

    // Polyurethane Bumper Tip
    const bumper = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.15, 14), m.accentSafety);
    bumper.position.set(0, 0, 0.9);
    bumper.rotation.x = Math.PI / 2;
    g.add(bumper);

    return g;
  }

  buildValkyrieUpper(isGhost) {
    const m = getGunMaterials(isGhost);
    const g = new THREE.Group();

    // Flattop Upper Receiver
    const upper = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.64, 2.1), m.parkerizedBlack);
    g.add(upper);

    // Top Full-Length Picatinny Rail
    const rail = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.14, 2.9), m.bluedSteel);
    rail.position.set(0, 0.38, 0.4);
    g.add(rail);

    // Free-Float M-LOK Octagon Handguard
    const handguard = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.78, 1.8), m.parkerizedBlack);
    handguard.position.set(0, 0, 1.35);
    g.add(handguard);

    // M-LOK Cooling Slots
    for (let i = -2; i <= 2; i++) {
      [-0.4, 0.4].forEach(x => {
        const slot = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.15, 0.28), m.darkIron);
        slot.position.set(x, 0, 1.35 + i * 0.35);
        g.add(slot);
      });
    }

    // Forward Assist Plunger
    const fwdAssist = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.3, 10), m.stainlessSteel);
    fwdAssist.position.set(0.42, 0.15, -0.55);
    fwdAssist.rotation.z = -Math.PI / 4;
    g.add(fwdAssist);

    // Brass Deflector Wedge
    const deflector = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.25, 0.25), m.bluedSteel);
    deflector.position.set(0.42, 0.1, -0.2);
    g.add(deflector);

    return g;
  }

  buildValkyriePMAG(isGhost) {
    const m = getGunMaterials(isGhost);
    const g = new THREE.Group();

    // Curved 30-Round Polymer PMAG Body
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.58, 2.3, 1.05), m.polymerBlack);
    body.rotation.x = -0.15;
    g.add(body);

    // PMAG Texture Ribs
    for (let i = -3; i <= 2; i++) {
      const rib = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.06, 0.95), m.darkIron);
      rib.position.set(0, i * 0.28, 0);
      rib.rotation.x = -0.15;
      g.add(rib);
    }

    // Witness Round Window Showing Brass 5.56 NATO Rounds
    const windowGlass = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.8, 0.1), m.brass);
    windowGlass.position.set(0, 0.1, 0.35);
    windowGlass.rotation.x = -0.15;
    g.add(windowGlass);

    return g;
  }

  buildValkyrieTrigger(isGhost) {
    const m = getGunMaterials(isGhost);
    const g = new THREE.Group();

    // Curved Match Trigger
    const shoe = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.58, 0.18), m.bluedSteel);
    shoe.rotation.x = -0.22;
    g.add(shoe);

    // Safety Selector Switch Lever
    const selector = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.15, 0.32), m.stainlessSteel);
    selector.position.set(-0.38, 0.42, -0.25);
    g.add(selector);

    return g;
  }

  buildValkyrieEOTech(isGhost) {
    const m = getGunMaterials(isGhost);
    const g = new THREE.Group();

    // Rectangular Protective Aluminum Hood
    const hood = new THREE.Mesh(new THREE.BoxGeometry(0.74, 0.65, 1.25), m.parkerizedBlack);
    g.add(hood);

    // Cutout Viewing Window
    const windowCut = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.48, 1.3), m.darkIron);
    g.add(windowCut);

    // Multi-Coated Holographic Glass Window
    const glass = new THREE.Mesh(new THREE.PlaneGeometry(0.52, 0.42), m.opticGlass);
    glass.position.set(0, 0.02, 0);
    g.add(glass);

    // EOTech Holographic Circle-Dot Reticle (Glowing Red Ring + Dot)
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.018, 8, 24), m.laserRed);
    ring.position.set(0, 0.02, 0.01);
    g.add(ring);

    const dot = new THREE.Mesh(new THREE.SphereGeometry(0.03, 8, 8), m.laserRed);
    dot.position.set(0, 0.02, 0.01);
    g.add(dot);

    return g;
  }

  buildValkyrieForegrip(isGhost) {
    const m = getGunMaterials(isGhost);
    const g = new THREE.Group();

    // Angled Hand-Stop Foregrip
    const stop = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.65, 0.8), m.polymerBlack);
    stop.position.set(0, -0.4, 0);
    stop.rotation.x = 0.4;
    g.add(stop);

    // Offset Scout Weaponlight
    const light = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.9, 16), m.bluedSteel);
    light.position.set(0.42, 0.15, 0.2);
    light.rotation.x = Math.PI / 2;
    g.add(light);

    const led = new THREE.Mesh(new THREE.SphereGeometry(0.08, 10, 10), m.tritiumGreen);
    led.position.set(0.42, 0.15, 0.68);
    g.add(led);

    return g;
  }

  // =========================================================================
  // MODEL 4: MP40 MASCHINENPISTOLE (9x19mm Parabellum WWII Submachine Gun)
  // =========================================================================
  getMP40Specs() {
    return [
      {
        id: 'frame',
        name: 'Lower Housing & Bakelite Grip Frame',
        category: 'Lower Receiver / Grip',
        targetPos: new THREE.Vector3(0, -0.42, -0.15),
        targetRot: new THREE.Euler(0, 0, 0),
        explodedPos: new THREE.Vector3(-4.6, 0.2, 0),
        snapDistance: 2.4,
        createMesh: isGhost => this.buildMP40Lower(isGhost)
      },
      {
        id: 'barrel',
        name: '9.8" Barrel Assembly & Resting Bar',
        category: 'Barrel Assembly',
        targetPos: new THREE.Vector3(0, 0.44, 1.25),
        targetRot: new THREE.Euler(0, 0, 0),
        explodedPos: new THREE.Vector3(3.8, 2.0, 0),
        snapDistance: 2.2,
        createMesh: isGhost => this.buildMP40Barrel(isGhost)
      },
      {
        id: 'receiver',
        name: 'Stamped Steel Fluted Receiver Tube',
        category: 'Upper Receiver / Action',
        targetPos: new THREE.Vector3(0, 0.52, -0.28),
        targetRot: new THREE.Euler(0, 0, 0),
        explodedPos: new THREE.Vector3(0, 2.4, 0),
        snapDistance: 2.4,
        createMesh: isGhost => this.buildMP40Receiver(isGhost)
      },
      {
        id: 'bolt',
        name: 'Telescoping Recoil Spring & Bolt',
        category: 'Cycling Mechanism',
        targetPos: new THREE.Vector3(0, 0.52, -0.38),
        targetRot: new THREE.Euler(0, 0, 0),
        explodedPos: new THREE.Vector3(3.2, 0.2, 0),
        snapDistance: 2.2,
        createMesh: isGhost => this.buildMP40Bolt(isGhost)
      },
      {
        id: 'magazine',
        name: '32-Round Ribbed Stick Magazine',
        category: 'Ammunition Feed',
        targetPos: new THREE.Vector3(0, -1.28, 0.48),
        targetRot: new THREE.Euler(0.1, 0, 0),
        explodedPos: new THREE.Vector3(-3.0, -1.8, 0),
        snapDistance: 2.2,
        createMesh: isGhost => this.buildMP40Magazine(isGhost)
      },
      {
        id: 'stock',
        name: 'Under-Folding Steel Wire Buttstock',
        category: 'Buttstock Assembly',
        targetPos: new THREE.Vector3(0, -0.18, -1.25),
        targetRot: new THREE.Euler(0, 0, 0),
        explodedPos: new THREE.Vector3(-3.8, -1.6, 0),
        snapDistance: 2.2,
        createMesh: isGhost => this.buildMP40Stock(isGhost)
      },
      {
        id: 'trigger',
        name: 'Open-Bolt Trigger & Sear Mechanism',
        category: 'Fire Control Group',
        targetPos: new THREE.Vector3(0, -0.48, 0.05),
        targetRot: new THREE.Euler(0, 0, 0),
        explodedPos: new THREE.Vector3(-1.0, -2.6, 0),
        snapDistance: 2.2,
        createMesh: isGhost => this.buildMP40Trigger(isGhost)
      },
      {
        id: 'sight',
        name: 'Hooded Front Sight & Dual-Leaf Rear Notch',
        category: 'Iron Sights',
        targetPos: new THREE.Vector3(0, 0.86, -0.15),
        targetRot: new THREE.Euler(0, 0, 0),
        explodedPos: new THREE.Vector3(2.4, -2.0, 0),
        snapDistance: 2.2,
        createMesh: isGhost => this.buildMP40Sight(isGhost)
      }
    ];
  }

  buildMP40Lower(isGhost) {
    const m = getGunMaterials(isGhost);
    const g = new THREE.Group();

    // 1. Stamped sheet metal lower housing box
    const housing = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.46, 2.2), m.stampedSteel);
    housing.position.set(0, 0.12, 0);
    g.add(housing);

    // 2. Bakelite Under-Receiver Resting Cradle & Magwell Flange
    const cradle = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.38, 1.1), m.bakeliteBrown);
    cradle.position.set(0, -0.16, 0.45);
    g.add(cradle);

    // 3. Iconic Angled Pistol Grip with Durfolit Bakelite Panels
    const gripCore = new THREE.Mesh(new THREE.BoxGeometry(0.62, 1.85, 0.85), m.darkIron);
    gripCore.position.set(0, -0.92, -0.42);
    gripCore.rotation.x = 0.35;
    g.add(gripCore);

    [-0.33, 0.33].forEach(x => {
      const panel = new THREE.Mesh(new THREE.BoxGeometry(0.04, 1.45, 0.75), m.bakeliteBrown);
      panel.position.set(x, -0.92, -0.42);
      panel.rotation.x = 0.35;
      g.add(panel);

      // Bakelite grip diagonal ribbing
      for (let i = -3; i <= 3; i++) {
        const rib = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.04, 0.65), m.darkIron);
        rib.position.set(x * 1.05, -0.92 + i * 0.16, -0.42);
        rib.rotation.x = 0.35;
        g.add(rib);
      }
    });

    // 4. Stamped Steel Undercut Trigger Guard Loop
    const guard = new THREE.Mesh(new THREE.TorusGeometry(0.38, 0.055, 10, 24, Math.PI), m.stampedSteel);
    guard.position.set(0, -0.15, 0.08);
    guard.rotation.y = Math.PI / 2;
    g.add(guard);

    // 5. Magazine Release Catch Button (Left Side)
    const magRelease = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.15, 12), m.stainlessSteel);
    magRelease.position.set(-0.38, 0.15, 0.5);
    magRelease.rotation.z = Math.PI / 2;
    g.add(magRelease);

    // 6. Stock Hinge Pivot Bushing Bosses
    [-0.38, 0.38].forEach(x => {
      const boss = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.08, 16), m.bluedSteel);
      boss.position.set(x, -0.05, -0.85);
      boss.rotation.z = Math.PI / 2;
      g.add(boss);
    });

    return g;
  }

  buildMP40Barrel(isGhost) {
    const m = getGunMaterials(isGhost);
    const g = new THREE.Group();

    // 1. Slender 9.8" Submachine Barrel Tube
    const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.15, 2.35, 24), m.bluedSteel);
    barrel.position.set(0, 0, 0.4);
    barrel.rotation.x = Math.PI / 2;
    g.add(barrel);

    // 2. Heavy Receiver Locking Nut Collar
    const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.35, 20), m.stampedSteel);
    collar.position.set(0, 0, -0.7);
    collar.rotation.x = Math.PI / 2;
    g.add(collar);

    // 3. Iconic Under-Barrel Resting Bar (Schürzenstab)
    const restBar = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.14, 1.55), m.bakeliteBrown);
    restBar.position.set(0, -0.25, 0.35);
    g.add(restBar);

    // Resting bar front and rear steel support lugs
    [-0.35, 1.05].forEach(z => {
      const lug = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.18, 0.12), m.bluedSteel);
      lug.position.set(0, -0.16, z);
      g.add(lug);
    });

    // 4. Muzzle Thread Retaining Nut & Crown
    const muzzleNut = new THREE.Mesh(new THREE.CylinderGeometry(0.21, 0.21, 0.22, 18), m.stampedSteel);
    muzzleNut.position.set(0, 0, 1.48);
    muzzleNut.rotation.x = Math.PI / 2;
    g.add(muzzleNut);

    // Deep rifled 9mm bore
    const bore = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.3, 14), m.darkIron);
    bore.position.set(0, 0, 1.55);
    bore.rotation.x = Math.PI / 2;
    g.add(bore);

    // 5. Hooded Front Sight Assembly
    const sightBase = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.24, 0.25), m.bluedSteel);
    sightBase.position.set(0, 0.25, 1.35);
    g.add(sightBase);

    // Protective Sight Hood Arch
    const hood = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.22, 16, 1, true, 0, Math.PI), m.stampedSteel);
    hood.position.set(0, 0.4, 1.35);
    hood.rotation.x = Math.PI / 2;
    hood.rotation.z = Math.PI / 2;
    g.add(hood);

    // Front barleycorn sight post
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.16, 0.04), m.stainlessSteel);
    post.position.set(0, 0.35, 1.35);
    g.add(post);

    return g;
  }

  buildMP40Receiver(isGhost) {
    const m = getGunMaterials(isGhost);
    const g = new THREE.Group();

    // 1. Main Cylindrical Stamped Steel Receiver Tube
    const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.33, 0.33, 2.75, 24), m.stampedSteel);
    tube.rotation.x = Math.PI / 2;
    g.add(tube);

    // 2. Longitudinal Stamped Reinforcement Ribs along Receiver
    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2 + Math.PI / 4;
      const rib = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 2.3, 8), m.bluedSteel);
      rib.position.set(Math.cos(angle) * 0.33, Math.sin(angle) * 0.33, -0.1);
      rib.rotation.x = Math.PI / 2;
      g.add(rib);
    }

    // 3. Right-Side Ejection Port Rectangular Relief
    const port = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.28, 0.65), m.darkIron);
    port.position.set(0.22, 0.12, 0.35);
    g.add(port);

    // 4. Left-Side Bolt Cocking Slot & Safety Notch
    const slot = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.12, 1.45), m.darkIron);
    slot.position.set(-0.32, 0.08, -0.2);
    g.add(slot);

    // Rear Safety Hook Notch
    const notch = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.22, 0.14), m.darkIron);
    notch.position.set(-0.32, 0.22, -0.85);
    g.add(notch);

    // 5. Magazine Well Collar Housing at Front
    const magwell = new THREE.Mesh(new THREE.BoxGeometry(0.74, 0.78, 0.95), m.stampedSteel);
    magwell.position.set(0, -0.22, 0.75);
    g.add(magwell);

    // 6. Knurled Rear Receiver End Cap
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.25, 20), m.bluedSteel);
    cap.position.set(0, 0, -1.35);
    cap.rotation.x = Math.PI / 2;
    g.add(cap);

    // Sling swivel loop on left side
    const sling = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.035, 8, 16), m.stainlessSteel);
    sling.position.set(-0.36, -0.05, -1.1);
    sling.rotation.y = Math.PI / 2;
    g.add(sling);

    return g;
  }

  buildMP40Bolt(isGhost) {
    const m = getGunMaterials(isGhost);
    const g = new THREE.Group();

    // 1. Cylindrical Blued Steel Open-Bolt Body
    const boltBody = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 1.25, 20), m.bluedSteel);
    boltBody.position.set(0, 0, 0.2);
    boltBody.rotation.x = Math.PI / 2;
    g.add(boltBody);

    // Bolt Face & Fixed Firing Pin
    const face = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.12, 16), m.darkIron);
    face.position.set(0, 0, 0.84);
    face.rotation.x = Math.PI / 2;
    g.add(face);

    const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.1, 8), m.stainlessSteel);
    pin.position.set(0, 0, 0.9);
    pin.rotation.x = Math.PI / 2;
    g.add(pin);

    // 2. Iconic Two-Piece Hook Cocking Handle (Left Side)
    const arm = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.12, 0.14), m.bluedSteel);
    arm.position.set(-0.42, 0.08, 0.25);
    g.add(arm);

    // Hooked Knurled Safety Cocking Knob
    const knob = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.28, 14), m.stainlessSteel);
    knob.position.set(-0.62, 0.08, 0.25);
    knob.rotation.x = Math.PI / 2;
    g.add(knob);

    // 3. Characteristic 3-Stage Telescoping Recoil Spring Tube
    const tube1 = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 1.05, 16), m.parkerizedBlack);
    tube1.position.set(0, 0, -0.65);
    tube1.rotation.x = Math.PI / 2;
    g.add(tube1);

    const tube2 = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.85, 14), m.stainlessSteel);
    tube2.position.set(0, 0, -1.25);
    tube2.rotation.x = Math.PI / 2;
    g.add(tube2);

    // High-Tension Recoil Buffer Spring Coils
    for (let i = 0; i < 14; i++) {
      const coil = new THREE.Mesh(new THREE.TorusGeometry(0.155, 0.026, 8, 18), m.bluedSteel);
      coil.position.set(0, 0, -0.2 - i * 0.08);
      g.add(coil);
    }

    return g;
  }

  buildMP40Magazine(isGhost) {
    const m = getGunMaterials(isGhost);
    const g = new THREE.Group();

    // 1. Long Straight 32-Round Stamped Steel Magazine Body
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.52, 3.15, 0.78), m.stampedSteel);
    g.add(body);

    // 2. Dual Stamped Reinforcing Ribs along Front & Sides
    [-0.26, 0.26].forEach(x => {
      const rib = new THREE.Mesh(new THREE.BoxGeometry(0.04, 2.7, 0.1), m.darkIron);
      rib.position.set(x, 0, 0.12);
      g.add(rib);
    });

    for (let i = -4; i <= 4; i++) {
      const hRib = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.05, 0.05), m.darkIron);
      hRib.position.set(0, i * 0.3, 0.38);
      g.add(hRib);
    }

    // 3. Tapered Feed Lips & Magazine Catch Indentation
    const lips = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.18, 0.65), m.bluedSteel);
    lips.position.set(0, 1.62, 0.04);
    g.add(lips);

    // Live 9x19mm Parabellum Cartridge visible in feed lips
    const cartridge = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.52, 14), m.ammoBrass);
    cartridge.position.set(0, 1.62, 0.08);
    cartridge.rotation.x = Math.PI / 2;
    g.add(cartridge);

    const bulletTip = new THREE.Mesh(new THREE.ConeGeometry(0.11, 0.18, 14), m.accentSafety);
    bulletTip.position.set(0, 1.62, 0.38);
    bulletTip.rotation.x = Math.PI / 2;
    g.add(bulletTip);

    // 4. Stamped Steel Floorplate with Locking Dimple
    const floorplate = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.14, 0.9), m.bluedSteel);
    floorplate.position.set(0, -1.62, 0);
    g.add(floorplate);

    return g;
  }

  buildMP40Stock(isGhost) {
    const m = getGunMaterials(isGhost);
    const g = new THREE.Group();

    // 1. Central Push-Button Pivot Hinge Block
    const hinge = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.74, 16), m.bluedSteel);
    hinge.rotation.z = Math.PI / 2;
    g.add(hinge);

    // Spring-loaded checkered hinge release push button
    const btn = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.12, 12), m.stainlessSteel);
    btn.position.set(0.42, 0, 0);
    btn.rotation.z = Math.PI / 2;
    g.add(btn);

    // 2. Under-Folding Twin Steel Tubular Arms
    [-0.34, 0.34].forEach(x => {
      const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 2.55, 14), m.stampedSteel);
      arm.position.set(x, -0.05, -1.25);
      arm.rotation.x = Math.PI / 2;
      g.add(arm);
    });

    // Cross-strut brace between arms
    const brace = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.68, 12), m.bluedSteel);
    brace.position.set(0, -0.05, -1.6);
    brace.rotation.z = Math.PI / 2;
    g.add(brace);

    // 3. Pivoting Pressed-Steel Shoulder Rest Buttplate
    const buttplatePivot = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.68, 12), m.bluedSteel);
    buttplatePivot.position.set(0, -0.05, -2.52);
    buttplatePivot.rotation.z = Math.PI / 2;
    g.add(buttplatePivot);

    // Curved Stamped Shoulder Rest Plate
    const rest = new THREE.Mesh(new THREE.BoxGeometry(0.66, 1.15, 0.08), m.stampedSteel);
    rest.position.set(0, -0.42, -2.55);
    rest.rotation.x = -0.15;
    g.add(rest);

    // Corrugated horizontal grip ridges on shoulder rest
    for (let i = -2; i <= 2; i++) {
      const ridge = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.04, 0.04), m.darkIron);
      ridge.position.set(0, -0.42 + i * 0.18, -2.52);
      g.add(ridge);
    }

    return g;
  }

  buildMP40Trigger(isGhost) {
    const m = getGunMaterials(isGhost);
    const g = new THREE.Group();

    // Curved Stamped Steel Match Trigger
    const shoe = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.54, 0.16), m.bluedSteel);
    shoe.rotation.x = -0.22;
    g.add(shoe);

    // Hardened Pivot Pin
    const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.35, 12), m.stainlessSteel);
    pin.position.set(0, 0.28, -0.08);
    pin.rotation.z = Math.PI / 2;
    g.add(pin);

    // Internal Open-Bolt Sear Hook Lever
    const sear = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.35, 0.42), m.darkIron);
    sear.position.set(0, 0.32, -0.25);
    g.add(sear);

    return g;
  }

  buildMP40Sight(isGhost) {
    const m = getGunMaterials(isGhost);
    const g = new THREE.Group();

    // Stamped Base Block on Top of Receiver
    const base = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.14, 0.52), m.stampedSteel);
    g.add(base);

    // Fixed 100m Standing Leaf with Center U-Notch
    const leaf1 = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.24, 0.06), m.bluedSteel);
    leaf1.position.set(0, 0.16, -0.12);
    g.add(leaf1);

    // U-notch center cut
    const notchCut = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.08, 0.08), m.darkIron);
    notchCut.position.set(0, 0.24, -0.12);
    g.add(notchCut);

    // Folding 200m Auxiliary Flip Leaf
    const leaf2 = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.32, 0.05), m.stainlessSteel);
    leaf2.position.set(0, 0.12, 0.08);
    leaf2.rotation.x = 0.55;
    g.add(leaf2);

    return g;
  }

  // =========================================================================
  // MODEL 5: AWM / L115A3 TACTICAL SNIPER RIFLE (.338 Lapua Magnum)
  // =========================================================================
  getAWMSpecs() {
    return [
      {
        id: 'frame',
        name: 'AI Ergonomic OD Green Thumbhole Chassis',
        category: 'Sniper Chassis / Stock',
        targetPos: new THREE.Vector3(0, -0.42, -0.3),
        targetRot: new THREE.Euler(0, 0, 0),
        explodedPos: new THREE.Vector3(-4.8, -0.2, 0),
        snapDistance: 2.4,
        createMesh: isGhost => this.buildAWMLower(isGhost)
      },
      {
        id: 'barrel',
        name: '27" Fluted Match Barrel & Ported Brake',
        category: 'Barrel Assembly',
        targetPos: new THREE.Vector3(0, 0.48, 1.6),
        targetRot: new THREE.Euler(0, 0, 0),
        explodedPos: new THREE.Vector3(4.5, 1.8, 0),
        snapDistance: 2.2,
        createMesh: isGhost => this.buildAWMBarrel(isGhost)
      },
      {
        id: 'receiver',
        name: 'Machined Steel Sniper Action & Picatinny Rail',
        category: 'Upper Receiver / Action',
        targetPos: new THREE.Vector3(0, 0.52, -0.15),
        targetRot: new THREE.Euler(0, 0, 0),
        explodedPos: new THREE.Vector3(0, 2.5, 0),
        snapDistance: 2.4,
        createMesh: isGhost => this.buildAWMReceiver(isGhost)
      },
      {
        id: 'bolt',
        name: '60° Turn-Bolt with Tactical Teardrop Knob',
        category: 'Cycling Mechanism',
        targetPos: new THREE.Vector3(0.28, 0.58, -0.35),
        targetRot: new THREE.Euler(0, 0, 0),
        explodedPos: new THREE.Vector3(3.0, 1.0, 0),
        snapDistance: 2.2,
        createMesh: isGhost => this.buildAWMBolt(isGhost)
      },
      {
        id: 'magazine',
        name: '5-Round Detachable .338 Lapua Box Magazine',
        category: 'Ammunition Feed',
        targetPos: new THREE.Vector3(0, -1.18, 0.15),
        targetRot: new THREE.Euler(-0.06, 0, 0),
        explodedPos: new THREE.Vector3(-2.8, -2.2, 0),
        snapDistance: 2.2,
        createMesh: isGhost => this.buildAWMMagazine(isGhost)
      },
      {
        id: 'scope',
        name: 'Schmidt & Bender PM II Tactical Sniper Scope',
        category: 'Targeting Optic',
        targetPos: new THREE.Vector3(0, 1.26, -0.1),
        targetRot: new THREE.Euler(0, 0, 0),
        explodedPos: new THREE.Vector3(-3.2, 2.4, 0),
        snapDistance: 2.2,
        createMesh: isGhost => this.buildAWMScope(isGhost)
      },
      {
        id: 'bipod',
        name: 'Spigot-Mounted Folding Tactical Sniper Bipod',
        category: 'Stabilization Bipod',
        targetPos: new THREE.Vector3(0, -0.55, 1.7),
        targetRot: new THREE.Euler(0, 0, 0),
        explodedPos: new THREE.Vector3(3.2, -1.8, 0),
        snapDistance: 2.2,
        createMesh: isGhost => this.buildAWMBipod(isGhost)
      },
      {
        id: 'trigger',
        name: 'Two-Stage Adjustable Match Trigger & Safety',
        category: 'Fire Control Group',
        targetPos: new THREE.Vector3(0, -0.48, -0.22),
        targetRot: new THREE.Euler(0, 0, 0),
        explodedPos: new THREE.Vector3(-0.6, -2.6, 0),
        snapDistance: 2.2,
        createMesh: isGhost => this.buildAWMTrigger(isGhost)
      }
    ];
  }

  buildAWMLower(isGhost) {
    const m = getGunMaterials(isGhost);
    const g = new THREE.Group();

    // 1. Accuracy International OD Green Composite Forend Chassis
    const forend = new THREE.Mesh(new THREE.BoxGeometry(0.74, 0.62, 3.2), m.awmGreen);
    forend.position.set(0, 0.08, 0.8);
    g.add(forend);

    // Aluminum full-length internal bedding block core (visible in magwell)
    const beddingBlock = new THREE.Mesh(new THREE.BoxGeometry(0.66, 0.35, 2.8), m.stainlessSteel);
    beddingBlock.position.set(0, 0.16, 0.2);
    g.add(beddingBlock);

    // 2. Iconic Ergonomic Thumbhole Sniper Stock Body
    const stockBody = new THREE.Mesh(new THREE.BoxGeometry(0.72, 1.75, 1.95), m.awmGreen);
    stockBody.position.set(0, -0.52, -1.35);
    g.add(stockBody);

    // Thumbhole open ergonomic oval cutout
    const holeCut = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.78, 16), m.darkIron);
    holeCut.position.set(0, -0.45, -1.1);
    holeCut.rotation.z = Math.PI / 2;
    g.add(holeCut);

    // 3. Adjustable Cheek-Piece Comb Riser
    const cheekPiece = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.42, 1.15), m.polymerBlack);
    cheekPiece.position.set(0, 0.42, -1.35);
    g.add(cheekPiece);

    // Dual stainless height adjustment pillars
    [-0.35, 0.35].forEach(z => {
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.35, 12), m.stainlessSteel);
      post.position.set(0, 0.18, -1.35 + z);
      g.add(post);
    });

    // 4. Thick Ribbed Rubber Recoil Buttpad with Aluminum Spacer Shims
    const buttpad = new THREE.Mesh(new THREE.BoxGeometry(0.74, 1.65, 0.38), m.polymerBlack);
    buttpad.position.set(0, -0.48, -2.42);
    g.add(buttpad);

    // Buttpad horizontal comfort serrations
    for (let i = -3; i <= 3; i++) {
      const rib = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.06, 0.05), m.stippleGrip);
      rib.position.set(0, -0.48 + i * 0.2, -2.6);
      g.add(rib);
    }

    // 5. Flared Magazine Well & Trigger Guard
    const magwell = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.72, 1.1), m.parkerizedMatte);
    magwell.position.set(0, -0.28, 0.15);
    g.add(magwell);

    const guard = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.1, 0.85), m.bluedSteel);
    guard.position.set(0, -0.45, -0.22);
    g.add(guard);

    // 6. Front Bipod Mounting Spigot Tube
    const spigot = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.65, 16), m.stainlessSteel);
    spigot.position.set(0, -0.05, 2.35);
    spigot.rotation.x = Math.PI / 2;
    g.add(spigot);

    return g;
  }

  buildAWMBarrel(isGhost) {
    const m = getGunMaterials(isGhost);
    const g = new THREE.Group();

    // 1. Massive 27" Match-Grade Precision Fluted Stainless Barrel
    const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.19, 4.1, 24), m.flutedSteel);
    barrel.position.set(0, 0, 0.7);
    barrel.rotation.x = Math.PI / 2;
    g.add(barrel);

    // 6 Precision CNC Longitudinal Cooling Flutes
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI * 2) / 6;
      const flute = new THREE.Mesh(new THREE.BoxGeometry(0.04, 2.6, 0.04), m.parkerizedBlack);
      flute.position.set(Math.cos(angle) * 0.21, Math.sin(angle) * 0.21, 0.65);
      flute.rotation.x = Math.PI / 2;
      g.add(flute);
    }

    // Heavy Threaded Barrel Tenon & Locking Collar
    const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.45, 20), m.parkerizedMatte);
    collar.position.set(0, 0, -1.25);
    collar.rotation.x = Math.PI / 2;
    g.add(collar);

    // 2. Massive Tactical Dual-Chamber Ported Muzzle Brake
    const brake = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.54, 0.85), m.parkerizedMatte);
    brake.position.set(0, 0, 2.95);
    g.add(brake);

    // Dual Angled Blast Deflection Side Vents
    [-0.35, 0.35].forEach(x => {
      [-0.15, 0.15].forEach(z => {
        const port = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.32, 0.2), m.darkIron);
        port.position.set(x, 0.05, 2.95 + z);
        g.add(port);
      });
    });

    // Deep .338 Lapua Caliber Muzzle Crown & Bore Hole
    const bore = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.4, 16), m.darkIron);
    bore.position.set(0, 0, 3.25);
    bore.rotation.x = Math.PI / 2;
    g.add(bore);

    return g;
  }

  buildAWMReceiver(isGhost) {
    const m = getGunMaterials(isGhost);
    const g = new THREE.Group();

    // 1. Machined Flat-Bottom Steel Sniper Receiver Action
    const receiver = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.72, 2.75), m.parkerizedMatte);
    g.add(receiver);

    // Large Right-Side Ejection Port for Long .338 Magnum Cartridges
    const port = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.42, 1.25), m.darkIron);
    port.position.set(0.24, 0.18, 0.1);
    g.add(port);

    // 2. Full-Length Mil-Std 1913 Picatinny Rail with 20 MOA Cant
    const rail = new THREE.Mesh(new THREE.BoxGeometry(0.64, 0.16, 3.1), m.bluedSteel);
    rail.position.set(0, 0.42, 0.05);
    g.add(rail);

    // Cross-slots along Picatinny rail
    for (let i = -6; i <= 6; i++) {
      const slot = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.05, 0.08), m.darkIron);
      slot.position.set(0, 0.48, 0.05 + i * 0.22);
      g.add(slot);
    }

    // Heavy Action Bedding Screws & Hex Recoil Lug
    [-0.8, 0.8].forEach(z => {
      const screw = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.12, 12), m.stainlessSteel);
      screw.position.set(0, -0.38, z);
      g.add(screw);
    });

    return g;
  }

  buildAWMBolt(isGhost) {
    const m = getGunMaterials(isGhost);
    const g = new THREE.Group();

    // 1. Polished CNC Stainless Steel Cylindrical Bolt Body
    const bolt = new THREE.Mesh(new THREE.CylinderGeometry(0.23, 0.23, 2.15, 20), m.stainlessSteel);
    bolt.rotation.x = Math.PI / 2;
    g.add(bolt);

    // Spiral fluting on bolt body for debris clearing in extreme cold
    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2;
      const flute = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.6, 8), m.bluedSteel);
      flute.position.set(Math.cos(angle) * 0.22, Math.sin(angle) * 0.22, 0);
      flute.rotation.x = Math.PI / 2;
      flute.rotation.z = 0.25;
      g.add(flute);
    }

    // 2. 60-Degree Angled Tactical Bolt Handle Arm
    const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.72, 14), m.bluedSteel);
    arm.position.set(0.38, 0.18, -0.75);
    arm.rotation.z = -Math.PI / 3;
    g.add(arm);

    // Oversized Knurled Teardrop Tactical Bolt Knob
    const knob = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.12, 0.38, 16), m.parkerizedBlack);
    knob.position.set(0.68, 0.36, -0.75);
    knob.rotation.z = -Math.PI / 3;
    g.add(knob);

    // 3. Rear Bolt Shroud & Cocking Indicator Pin
    const shroud = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.26, 0.45, 18), m.parkerizedMatte);
    shroud.position.set(0, 0, -1.2);
    shroud.rotation.x = Math.PI / 2;
    g.add(shroud);

    const indicator = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 8), m.accentSafety);
    indicator.position.set(0, 0, -1.45);
    g.add(indicator);

    // 6-Lug Front Locking Bolt Head & Extractor Claw
    const boltHead = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.28, 16), m.darkIron);
    boltHead.position.set(0, 0, 1.15);
    boltHead.rotation.x = Math.PI / 2;
    g.add(boltHead);

    return g;
  }

  buildAWMMagazine(isGhost) {
    const m = getGunMaterials(isGhost);
    const g = new THREE.Group();

    // 1. Stamped Steel 5-Round Detachable Box Magazine
    const mag = new THREE.Mesh(new THREE.BoxGeometry(0.64, 1.85, 1.35), m.stampedSteel);
    g.add(mag);

    // Reinforcing side ribs
    [-0.33, 0.33].forEach(x => {
      const rib = new THREE.Mesh(new THREE.BoxGeometry(0.03, 1.45, 0.9), m.darkIron);
      rib.position.set(x, 0, 0);
      g.add(rib);
    });

    // 2. Giant .338 Lapua Magnum Brass Cartridge visible in feed lips
    const brassCase = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.17, 1.1, 16), m.ammoBrass);
    brassCase.position.set(0, 0.96, 0.05);
    brassCase.rotation.x = Math.PI / 2;
    g.add(brassCase);

    // Sleek Copper VLD Match Sniper Bullet Tip
    const bullet = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.38, 16), m.brass);
    bullet.position.set(0, 0.96, 0.72);
    bullet.rotation.x = Math.PI / 2;
    g.add(bullet);

    // 3. Stamped Steel Floorplate with Release Catch
    const base = new THREE.Mesh(new THREE.BoxGeometry(0.74, 0.16, 1.48), m.bluedSteel);
    base.position.set(0, -0.98, 0);
    g.add(base);

    return g;
  }

  buildAWMScope(isGhost) {
    const m = getGunMaterials(isGhost);
    const g = new THREE.Group();

    // 1. Schmidt & Bender PM II 34mm Main Tube Body
    const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.23, 0.23, 3.4, 24), m.parkerizedBlack);
    tube.rotation.x = Math.PI / 2;
    g.add(tube);

    // 2. Large 50mm Objective Lens Bell at Front
    const objBell = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.23, 0.95, 24), m.parkerizedBlack);
    objBell.position.set(0, 0, 1.55);
    objBell.rotation.x = Math.PI / 2;
    g.add(objBell);

    const sunshade = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 0.5, 24), m.darkIron);
    sunshade.position.set(0, 0, 2.15);
    sunshade.rotation.x = Math.PI / 2;
    g.add(sunshade);

    // Emerald Anti-Reflective Multi-Coated Objective Lens
    const objLens = new THREE.Mesh(new THREE.CircleGeometry(0.34, 20), m.scopeLens);
    objLens.position.set(0, 0, 2.38);
    g.add(objLens);

    // 3. Ocular Eyepiece Bell with Rubber Eye Relief Ring at Rear
    const ocularBell = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.23, 0.85, 24), m.parkerizedBlack);
    ocularBell.position.set(0, 0, -1.45);
    ocularBell.rotation.x = -Math.PI / 2;
    g.add(ocularBell);

    const ocularLens = new THREE.Mesh(new THREE.CircleGeometry(0.26, 20), m.scopeLens);
    ocularLens.position.set(0, 0, -1.9);
    g.add(ocularLens);

    // Glowing Illuminated Red Mil-Dot Crosshair Reticle in Eye Bell
    const reticleRing = new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.015, 8, 20), m.laserRed);
    reticleRing.position.set(0, 0, -1.89);
    g.add(reticleRing);

    const reticleDot = new THREE.Mesh(new THREE.SphereGeometry(0.025, 8, 8), m.laserRed);
    reticleDot.position.set(0, 0, -1.89);
    g.add(reticleDot);

    // 4. Tall Double-Turn Elevation Target Turret on Top
    const elevTurret = new THREE.Mesh(new THREE.CylinderGeometry(0.21, 0.21, 0.38, 20), m.bluedSteel);
    elevTurret.position.set(0, 0.38, 0.05);
    g.add(elevTurret);

    // Turret elevation graduation dial ring
    const elevDial = new THREE.Mesh(new THREE.CylinderGeometry(0.23, 0.23, 0.08, 20), m.stainlessSteel);
    elevDial.position.set(0, 0.26, 0.05);
    g.add(elevDial);

    // Windage Turret on Right Side
    const windTurret = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.32, 16), m.bluedSteel);
    windTurret.position.set(0.36, 0.02, 0.05);
    windTurret.rotation.z = Math.PI / 2;
    g.add(windTurret);

    // Parallax Side-Focus Turret on Left Side
    const parallaxTurret = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.32, 16), m.bluedSteel);
    parallaxTurret.position.set(-0.36, 0.02, 0.05);
    parallaxTurret.rotation.z = Math.PI / 2;
    g.add(parallaxTurret);

    // 5. Heavy 34mm Picatinny Double-Crossbolt Scope Mounting Rings
    [-0.85, 0.75].forEach(z => {
      const ring = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.72, 0.36), m.parkerizedMatte);
      ring.position.set(0, -0.06, z);
      g.add(ring);

      // Clamp cross-bolts
      const bolt1 = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.82, 10), m.stainlessSteel);
      bolt1.position.set(0, -0.32, z);
      bolt1.rotation.z = Math.PI / 2;
      g.add(bolt1);
    });

    return g;
  }

  buildAWMBipod(isGhost) {
    const m = getGunMaterials(isGhost);
    const g = new THREE.Group();

    // 1. Central Spigot Mount Bracket Block
    const mount = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.36, 0.42), m.parkerizedMatte);
    g.add(mount);

    // Pivot Pin Tensioner
    const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.65, 12), m.stainlessSteel);
    pin.rotation.z = Math.PI / 2;
    g.add(pin);

    // 2. Left & Right Folding Telescoping Bipod Legs
    [-1, 1].forEach(side => {
      const legGroup = new THREE.Group();
      legGroup.position.set(side * 0.25, -0.1, 0);

      // Upper leg tube
      const upperLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 1.25, 12), m.parkerizedBlack);
      upperLeg.position.set(0, -0.55, 0);
      legGroup.add(upperLeg);

      // Knurled leg extension locking collar
      const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.15, 14), m.stainlessSteel);
      collar.position.set(0, -1.05, 0);
      legGroup.add(collar);

      // Lower extending foot tube
      const lowerLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.75, 10), m.stainlessSteel);
      lowerLeg.position.set(0, -1.35, 0);
      legGroup.add(lowerLeg);

      // Heavy Ribbed Rubber Pod Foot
      const foot = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.18, 0.22, 14), m.polymerBlack);
      foot.position.set(0, -1.72, 0);
      legGroup.add(foot);

      // Leg splay angle
      legGroup.rotation.z = side * -0.28;
      legGroup.rotation.x = -0.15;
      g.add(legGroup);
    });

    return g;
  }

  buildAWMTrigger(isGhost) {
    const m = getGunMaterials(isGhost);
    const g = new THREE.Group();

    // Two-Stage Match Precision Trigger Shoe
    const shoe = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.54, 0.16), m.stainlessSteel);
    shoe.rotation.x = -0.25;
    g.add(shoe);

    // Trigger Pull Weight Adjustment Hex Screw
    const screw = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.18, 8), m.bluedSteel);
    screw.position.set(0, 0.12, 0.1);
    screw.rotation.x = Math.PI / 2;
    g.add(screw);

    // 3-Position Shroud Safety Lever
    const safety = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.18, 0.35), m.bluedSteel);
    safety.position.set(0.35, 0.32, -0.4);
    safety.rotation.y = -0.2;
    g.add(safety);

    // Internal Drop-In Match Cassette Trigger Box
    const box = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.58, 0.85), m.darkIron);
    box.position.set(0, 0.25, -0.15);
    g.add(box);

    return g;
  }

  // =========================================================================
  // INTERACTION & LIFECYCLE MANAGEMENT
  // =========================================================================

  snapComponent(component) {
    if (!component || component.isAssembled) return false;

    component.isAssembled = true;
    component.mesh.position.copy(component.targetPos);
    component.mesh.rotation.copy(component.targetRot);

    if (component.ghostMesh) {
      component.ghostMesh.visible = false;
    }

    // Flash lock-in emissive pulse
    component.mesh.traverse(child => {
      if (child.isMesh && child.material && child.material.emissive) {
        child.material.emissive.setHex(0x00ff88);
        child.material.emissiveIntensity = 2.0;
        setTimeout(() => {
          if (child.userData.defaultEmissive) {
            child.material.emissive.copy(child.userData.defaultEmissive);
            child.material.emissiveIntensity = 0.4;
          }
        }, 600);
      }
    });

    this.hideTether();
    return true;
  }

  resetAll() {
    this.components.forEach(comp => {
      comp.isAssembled = false;
      comp.mesh.position.copy(comp.explodedPos);
      comp.mesh.rotation.copy(comp.targetRot);
      if (comp.ghostMesh) {
        comp.ghostMesh.visible = true;
      }
      this.setComponentHighlight(comp, false);
    });
    this.hideTether();
  }

  isFullyAssembled() {
    return this.components.every(c => c.isAssembled);
  }

  getAssembledCount() {
    return this.components.filter(c => c.isAssembled).length;
  }

  setComponentHighlight(component, isHighlighted) {
    if (!component || component.isAssembled) return;

    component.mesh.traverse(child => {
      if (child.isMesh && child.material) {
        if (isHighlighted) {
          if (child.material.emissive) {
            child.material.emissive.setHex(0x00f0ff);
            child.material.emissiveIntensity = 0.85;
          }
        } else {
          if (child.userData.defaultEmissive && child.material.emissive) {
            child.material.emissive.copy(child.userData.defaultEmissive);
            child.material.emissiveIntensity = 0.2;
          }
        }
      }
    });
  }

  update(time, draggedComp) {
    this.components.forEach(comp => {
      if (!comp.isAssembled && comp !== draggedComp) {
        const floatOffset = Math.sin(time * 1.8 + comp.floatPhase) * 0.08;
        comp.mesh.position.y = comp.explodedPos.y + floatOffset;
        comp.mesh.rotation.y = comp.targetRot.y + Math.sin(time * 1.2 + comp.floatPhase) * 0.04;
      }
    });
  }
}
