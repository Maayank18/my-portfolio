/**
 * ProjectThumbnail.jsx — High-Performance Bespoke 2D Canvas Animations
 * ─────────────────────────────────────────────────────────────────────────────
 * • Custom signature visual for every featured project
 * • Crisp 60fps hardware-accelerated 2D canvas drawing
 * • Smooth procedural math — zero Three.js bundle overhead
 * • Auto-pauses when off-screen to preserve CPU/battery
 */

import React, { useEffect, useRef, useCallback } from "react";

const Y  = "#f5ff40"; // neon yellow
const B  = "#00d4ff"; // electric cyan
const P  = "#ff3cac"; // hot pink
const G  = "#4ade80"; // neon emerald
const V  = "#a855f7"; // violet
const BG = "#06060c"; // deep space black

/* ═══════════════════════════════════════════════════════════════════
   1. FLOATGPT — Floating AI Desktop Orb & Voice Waveforms
═══════════════════════════════════════════════════════════════════ */
function drawFloatGPT(ctx, W, H, t) {
  ctx.clearRect(0, 0, W, H);
  const cx = W / 2, cy = H / 2;

  // Background radial aura
  const bgGlow = ctx.createRadialGradient(cx, cy, 10, cx, cy, 130);
  bgGlow.addColorStop(0, "rgba(0,212,255,0.08)");
  bgGlow.addColorStop(0.5, "rgba(245,255,64,0.03)");
  bgGlow.addColorStop(1, "transparent");
  ctx.fillStyle = bgGlow;
  ctx.fillRect(0, 0, W, H);

  // Acoustic voice waveforms (Edge-TTS / Whisper voice ripples)
  for (let ring = 1; ring <= 4; ring++) {
    const baseR = 36 + ring * 18;
    const pulse = Math.sin(t * 3 - ring * 0.7);
    const alpha = (0.35 - ring * 0.07) * (0.8 + 0.2 * pulse);
    ctx.beginPath();
    for (let a = 0; a <= Math.PI * 2; a += 0.08) {
      const wave = Math.sin(a * (ring + 4) + t * 4) * (2.5 + ring * 1.2);
      const r = baseR + wave + pulse * 4;
      const x = cx + r * Math.cos(a);
      const y = cy + r * Math.sin(a) * 0.88;
      a === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.strokeStyle = ring % 2 === 0 ? B : Y;
    ctx.globalAlpha = Math.max(0, alpha);
    ctx.lineWidth = 1.4;
    ctx.stroke();
  }

  // 3D Gyroscopic Orbital Rings
  const gyroRings = [
    { rx: 78, ry: 26, rot: t * 0.6,          color: Y, speed: 1.4 },
    { rx: 64, ry: 34, rot: -t * 0.45 + 0.9,  color: B, speed: -1.8 },
    { rx: 92, ry: 20, rot: t * 0.25 - 0.5,   color: P, speed: 0.9 },
  ];

  gyroRings.forEach(({ rx, ry, rot, color, speed }) => {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rot);
    ctx.beginPath();
    ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
    ctx.strokeStyle = color;
    ctx.globalAlpha = 0.4;
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // Orbital tracer energy bead
    const beadAngle = t * speed;
    const bx = rx * Math.cos(beadAngle);
    const by = ry * Math.sin(beadAngle);
    ctx.beginPath();
    ctx.arc(bx, by, 3.5, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.shadowBlur = 12;
    ctx.shadowColor = color;
    ctx.globalAlpha = 0.95;
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.restore();
  });

  // Central Glowing Orb Nucleus
  const corePulse = 20 + Math.sin(t * 2.8) * 3;
  const coreGrad = ctx.createRadialGradient(cx, cy, 2, cx, cy, corePulse * 1.8);
  coreGrad.addColorStop(0, "#ffffff");
  coreGrad.addColorStop(0.25, Y);
  coreGrad.addColorStop(0.65, B);
  coreGrad.addColorStop(1, "transparent");

  ctx.beginPath();
  ctx.arc(cx, cy, corePulse * 1.8, 0, Math.PI * 2);
  ctx.fillStyle = coreGrad;
  ctx.globalAlpha = 0.9;
  ctx.shadowBlur = 24;
  ctx.shadowColor = Y;
  ctx.fill();
  ctx.shadowBlur = 0;

  // Upward floating ethereal sparks
  for (let i = 0; i < 8; i++) {
    const spT = (t * 0.8 + i * 0.35) % 2;
    const sx = cx + Math.sin(i * 1.4 + t) * (corePulse + 14);
    const sy = cy - spT * 40;
    const sAlpha = Math.max(0, 1 - spT);
    ctx.beginPath();
    ctx.arc(sx, sy, 1.6, 0, Math.PI * 2);
    ctx.fillStyle = Y;
    ctx.globalAlpha = sAlpha * 0.8;
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

/* ═══════════════════════════════════════════════════════════════════
   2. CODEARENA 1v1 — Competitive Duel & Live Algorithm Visualizer
═══════════════════════════════════════════════════════════════════ */
function drawCodeArena(ctx, W, H, t) {
  ctx.clearRect(0, 0, W, H);
  const cx = W / 2, cy = H / 2 - 12;

  // 1v1 Arena Clash Beams
  const p1X = cx - 110, p2X = cx + 110;
  const pY  = cy - 10;

  // Player 1 Node (Cyan)
  ctx.beginPath();
  ctx.arc(p1X, pY, 12, 0, Math.PI * 2);
  ctx.fillStyle = B;
  ctx.shadowBlur = 18;
  ctx.shadowColor = B;
  ctx.fill();

  // Player 2 Node (Yellow)
  ctx.beginPath();
  ctx.arc(p2X, pY, 12, 0, Math.PI * 2);
  ctx.fillStyle = Y;
  ctx.shadowBlur = 18;
  ctx.shadowColor = Y;
  ctx.fill();
  ctx.shadowBlur = 0;

  // 1v1 Clash Laser Streams
  const clashOffset = Math.sin(t * 8) * 8;
  const clashX = cx + clashOffset;
  const clashY = pY + Math.cos(t * 7) * 4;

  // Cyan Laser Beam
  ctx.beginPath();
  ctx.moveTo(p1X + 12, pY);
  ctx.lineTo(clashX, clashY);
  ctx.strokeStyle = B;
  ctx.lineWidth = 3 + Math.sin(t * 12) * 1.2;
  ctx.globalAlpha = 0.85;
  ctx.stroke();

  // Yellow Laser Beam
  ctx.beginPath();
  ctx.moveTo(p2X - 12, pY);
  ctx.lineTo(clashX, clashY);
  ctx.strokeStyle = Y;
  ctx.lineWidth = 3 + Math.cos(t * 12) * 1.2;
  ctx.globalAlpha = 0.85;
  ctx.stroke();

  // Center Clash Impact Flare
  const flareR = 14 + Math.sin(t * 14) * 4;
  ctx.beginPath();
  ctx.arc(clashX, clashY, flareR, 0, Math.PI * 2);
  ctx.fillStyle = "#ffffff";
  ctx.shadowBlur = 24;
  ctx.shadowColor = "#ffffff";
  ctx.globalAlpha = 0.95;
  ctx.fill();
  ctx.shadowBlur = 0;

  // Spark Bursts from Clash
  for (let s = 0; s < 6; s++) {
    const sAng = s * (Math.PI / 3) + t * 5;
    const sLen = 14 + (s % 3) * 6;
    ctx.beginPath();
    ctx.moveTo(clashX, clashY);
    ctx.lineTo(clashX + Math.cos(sAng) * sLen, clashY + Math.sin(sAng) * sLen);
    ctx.strokeStyle = s % 2 === 0 ? Y : B;
    ctx.lineWidth = 1.5;
    ctx.globalAlpha = 0.7;
    ctx.stroke();
  }

  // Bottom Algorithm Sorting Array Visualizer (14 bars)
  const barCount = 14;
  const barW = 7;
  const gap = 6;
  const startX = cx - (barCount * (barW + gap)) / 2;
  const baseBottomY = H - 20;

  const compareIdx = Math.floor((t * 5) % barCount);
  for (let b = 0; b < barCount; b++) {
    // Dynamic simulated sort heights
    const hNorm = 0.35 + 0.55 * Math.abs(Math.sin(b * 0.5 + t * 2.2));
    const barH = 10 + hNorm * 38;
    const bx = startX + b * (barW + gap);
    const by = baseBottomY - barH;

    ctx.beginPath();
    ctx.roundRect ? ctx.roundRect(bx, by, barW, barH, 2) : ctx.rect(bx, by, barW, barH);

    const isComparing = b === compareIdx || b === (compareIdx + 1) % barCount;
    ctx.fillStyle = isComparing ? "#ffffff" : b % 2 === 0 ? B : Y;
    ctx.globalAlpha = isComparing ? 1 : 0.65;
    if (isComparing) {
      ctx.shadowBlur = 10;
      ctx.shadowColor = Y;
    }
    ctx.fill();
    ctx.shadowBlur = 0;
  }
  ctx.globalAlpha = 1;
}

/* ═══════════════════════════════════════════════════════════════════
   3. DIG — Autonomous AI Research Crawler & Radar Scanner
═══════════════════════════════════════════════════════════════════ */
function drawDig(ctx, W, H, t) {
  ctx.clearRect(0, 0, W, H);
  const cx = W / 2, cy = H / 2;
  const maxR = 86;

  // Radar Concentric Grid Rings
  [0.35, 0.65, 0.95].forEach((ratio) => {
    ctx.beginPath();
    ctx.arc(cx, cy, maxR * ratio, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(0,212,255,0.18)";
    ctx.lineWidth = 1;
    ctx.stroke();
  });

  // Crosshairs
  ctx.beginPath();
  ctx.moveTo(cx - maxR, cy);
  ctx.lineTo(cx + maxR, cy);
  ctx.moveTo(cx, cy - maxR);
  ctx.lineTo(cx, cy + maxR);
  ctx.strokeStyle = "rgba(0,212,255,0.14)";
  ctx.lineWidth = 1;
  ctx.stroke();

  // Rotating Radar Sweep Beam
  const sweepAngle = (t * 1.8) % (Math.PI * 2);
  const sweepGrad = ctx.createRadialGradient(cx, cy, 2, cx, cy, maxR);
  sweepGrad.addColorStop(0, "rgba(0,212,255,0.45)");
  sweepGrad.addColorStop(1, "rgba(245,255,64,0.02)");

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(sweepAngle);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.arc(0, 0, maxR, -0.4, 0);
  ctx.closePath();
  ctx.fillStyle = sweepGrad;
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(maxR, 0);
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 1.8;
  ctx.shadowBlur = 8;
  ctx.shadowColor = B;
  ctx.stroke();
  ctx.shadowBlur = 0;
  ctx.restore();

  // Target Research Nodes (Sponsors, Judges, Leads)
  const targets = [
    { r: 42,  a: 0.8,  label: "Sponsor" },
    { r: 68,  a: 2.2,  label: "Judge"   },
    { r: 54,  a: 3.7,  label: "Speaker" },
    { r: 76,  a: 4.8,  label: "Lead"    },
    { r: 35,  a: 5.6,  label: "Partner" },
  ];

  targets.forEach(({ r, a }) => {
    const tx = cx + r * Math.cos(a);
    const ty = cy + r * Math.sin(a);

    // Angular difference to sweep beam
    let diff = (sweepAngle - a) % (Math.PI * 2);
    if (diff < 0) diff += Math.PI * 2;
    const isLit = diff < 0.9;
    const intensity = isLit ? Math.max(0, 1 - diff / 0.9) : 0.15;

    // Connective Data Link back to Center
    if (isLit) {
      ctx.beginPath();
      ctx.setLineDash([3, 4]);
      ctx.moveTo(cx, cy);
      ctx.lineTo(tx, ty);
      ctx.strokeStyle = Y;
      ctx.globalAlpha = intensity * 0.7;
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Node Dot
    ctx.beginPath();
    ctx.arc(tx, ty, isLit ? 4.5 : 2.5, 0, Math.PI * 2);
    ctx.fillStyle = isLit ? Y : B;
    ctx.globalAlpha = isLit ? 1 : 0.4;
    if (isLit) {
      ctx.shadowBlur = 14;
      ctx.shadowColor = Y;
    }
    ctx.fill();
    ctx.shadowBlur = 0;

    // Ping Ring
    if (isLit) {
      ctx.beginPath();
      ctx.arc(tx, ty, 6 + (1 - intensity) * 12, 0, Math.PI * 2);
      ctx.strokeStyle = Y;
      ctx.globalAlpha = intensity * 0.6;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  });

  // Central Radar Command Hub
  ctx.beginPath();
  ctx.arc(cx, cy, 6, 0, Math.PI * 2);
  ctx.fillStyle = "#ffffff";
  ctx.shadowBlur = 16;
  ctx.shadowColor = B;
  ctx.globalAlpha = 1;
  ctx.fill();
  ctx.shadowBlur = 0;
}

/* ═══════════════════════════════════════════════════════════════════
   4. AURAOS — Biology-First Somatic Wave & Ambient Breathing
═══════════════════════════════════════════════════════════════════ */
function drawAuraOS(ctx, W, H, t) {
  ctx.clearRect(0, 0, W, H);
  const cx = W / 2, cy = H / 2;

  // Ambient Breathing Nucleus (4-7-8 Somatic Cadence)
  const breath = Math.sin(t * 1.5) * 0.5 + 0.5; // 0 to 1
  const orbR = 24 + breath * 16;

  const auraGrad = ctx.createRadialGradient(cx, cy, 4, cx, cy, orbR * 2.2);
  auraGrad.addColorStop(0, "rgba(255,255,255,0.9)");
  auraGrad.addColorStop(0.3, "rgba(0,212,255,0.7)");
  auraGrad.addColorStop(0.7, "rgba(168,85,247,0.35)");
  auraGrad.addColorStop(1, "transparent");

  ctx.beginPath();
  ctx.arc(cx, cy, orbR * 2.2, 0, Math.PI * 2);
  ctx.fillStyle = auraGrad;
  ctx.globalAlpha = 0.85;
  ctx.fill();

  // Multi-Frequency Biological Somatic Ribbons
  const waves = [
    { freq: 0.022, speed: 2.2, amp: 26, color: B, yOff: 0 },
    { freq: 0.035, speed: -1.7, amp: 18, color: V, yOff: -8 },
    { freq: 0.018, speed: 3.1, amp: 22, color: Y, yOff: 8 },
  ];

  waves.forEach(({ freq, speed, amp, color, yOff }) => {
    ctx.beginPath();
    for (let x = 0; x <= W; x += 4) {
      const distFromCenter = Math.abs(x - cx) / (W / 2);
      const envelope = Math.max(0, 1 - distFromCenter * 0.6);
      const y = cy + yOff + Math.sin(x * freq + t * speed) * amp * envelope;
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.8;
    ctx.globalAlpha = 0.7;
    ctx.shadowBlur = 14;
    ctx.shadowColor = color;
    ctx.stroke();
    ctx.shadowBlur = 0;
  });

  // Soft floating bioluminescent nodes
  for (let i = 0; i < 7; i++) {
    const angle = i * 0.9 + t * 0.6;
    const r = orbR + 24 + Math.sin(t * 2 + i) * 10;
    const px = cx + Math.cos(angle) * r;
    const py = cy + Math.sin(angle) * (r * 0.6);
    ctx.beginPath();
    ctx.arc(px, py, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = i % 2 === 0 ? B : Y;
    ctx.globalAlpha = 0.8;
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

/* ═══════════════════════════════════════════════════════════════════
   5. AI-CODE-REVIEWER — Syntax Matrix & Real-Time Laser Scan
═══════════════════════════════════════════════════════════════════ */
function drawCodeReviewer(ctx, W, H, t) {
  ctx.clearRect(0, 0, W, H);
  const cx = W / 2, cy = H / 2;

  // Code editor window frame
  const padX = 40, padY = 24;
  const boxW = W - padX * 2, boxH = H - padY * 2;

  ctx.beginPath();
  ctx.roundRect ? ctx.roundRect(padX, padY, boxW, boxH, 10) : ctx.rect(padX, padY, boxW, boxH);
  ctx.fillStyle = "rgba(10,10,20,0.7)";
  ctx.strokeStyle = "rgba(0,212,255,0.2)";
  ctx.lineWidth = 1;
  ctx.fill();
  ctx.stroke();

  // Code Lines & Syntax Tokens
  const lines = [
    [{ w: 38, c: B }, { w: 54, c: "#fff" }, { w: 28, c: Y }],
    [{ w: 60, c: V }, { w: 42, c: B }, { w: 75, c: "#fff" }],
    [{ w: 26, c: Y }, { w: 84, c: "#fff" }, { w: 32, c: G }],
    [{ w: 48, c: B }, { w: 36, c: Y }, { w: 50, c: "#fff" }],
    [{ w: 70, c: V }, { w: 30, c: "#fff" }],
  ];

  const lineStartY = padY + 22;
  const lineSpacing = 22;

  lines.forEach((tokens, idx) => {
    const ly = lineStartY + idx * lineSpacing;
    let curX = padX + 26;

    // Line number indicator
    ctx.font = "9px 'DM Sans', monospace";
    ctx.fillStyle = "rgba(255,255,255,0.22)";
    ctx.fillText(`${idx + 1}`, padX + 10, ly + 4);

    tokens.forEach(({ w, c }) => {
      ctx.beginPath();
      ctx.roundRect ? ctx.roundRect(curX, ly - 4, w, 8, 3) : ctx.rect(curX, ly - 4, w, 8);
      ctx.fillStyle = c;
      ctx.globalAlpha = 0.55;
      ctx.fill();
      curX += w + 8;
    });
  });

  // Vertical Laser Scanning Beam
  const scanY = padY + 8 + ((t * 48) % (boxH - 16));

  ctx.beginPath();
  ctx.moveTo(padX + 2, scanY);
  ctx.lineTo(padX + boxW - 2, scanY);
  ctx.strokeStyle = Y;
  ctx.lineWidth = 2;
  ctx.shadowBlur = 14;
  ctx.shadowColor = Y;
  ctx.globalAlpha = 0.95;
  ctx.stroke();
  ctx.shadowBlur = 0;

  // Laser Glow Spread
  const scanGlow = ctx.createLinearGradient(0, scanY - 14, 0, scanY + 14);
  scanGlow.addColorStop(0, "transparent");
  scanGlow.addColorStop(0.5, "rgba(245,255,64,0.18)");
  scanGlow.addColorStop(1, "transparent");
  ctx.fillStyle = scanGlow;
  ctx.fillRect(padX + 2, scanY - 14, boxW - 4, 28);

  // One-Click Fix Verified Checkmark Badge
  const badgeX = padX + boxW - 36;
  const badgeY = padY + 18 + Math.floor((t * 0.9) % 4) * lineSpacing;

  ctx.beginPath();
  ctx.arc(badgeX, badgeY, 8, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(74,222,128,0.2)";
  ctx.strokeStyle = G;
  ctx.lineWidth = 1.5;
  ctx.shadowBlur = 10;
  ctx.shadowColor = G;
  ctx.fill();
  ctx.stroke();
  ctx.shadowBlur = 0;

  // Checkmark glyph
  ctx.beginPath();
  ctx.moveTo(badgeX - 3.5, badgeY);
  ctx.lineTo(badgeX - 1, badgeY + 2.8);
  ctx.lineTo(badgeX + 3.8, badgeY - 2.5);
  ctx.strokeStyle = G;
  ctx.lineWidth = 1.8;
  ctx.stroke();

  ctx.globalAlpha = 1;
}

/* ═══════════════════════════════════════════════════════════════════
   6. PARTICLE ANIMATOR — Dynamic Gesture Tracking Physics Vortex
═══════════════════════════════════════════════════════════════════ */
function drawParticleAnimator(ctx, W, H, t) {
  ctx.clearRect(0, 0, W, H);
  const cx = W / 2, cy = H / 2;

  // Dual MediaPipe Hand Tracking Focal Attractors
  const f1X = cx + Math.cos(t * 1.4) * 58;
  const f1Y = cy + Math.sin(t * 2.1) * 32;

  const f2X = cx + Math.cos(-t * 1.6 + 1.2) * 58;
  const f2Y = cy + Math.sin(-t * 1.2) * 32;

  // Gesture Tracking Reticles
  [
    { x: f1X, y: f1Y, c: B },
    { x: f2X, y: f2Y, c: Y },
  ].forEach(({ x, y, c }) => {
    ctx.beginPath();
    ctx.arc(x, y, 7, 0, Math.PI * 2);
    ctx.strokeStyle = c;
    ctx.lineWidth = 1.5;
    ctx.shadowBlur = 12;
    ctx.shadowColor = c;
    ctx.stroke();
    ctx.shadowBlur = 0;

    ctx.beginPath();
    ctx.arc(x, y, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
  });

  // Connecting Gesture Force Field Line
  ctx.beginPath();
  ctx.moveTo(f1X, f1Y);
  ctx.lineTo(f2X, f2Y);
  ctx.strokeStyle = "rgba(255,255,255,0.2)";
  ctx.setLineDash([4, 6]);
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.setLineDash([]);

  // 60 Swarming Physics Particles
  const pCount = 56;
  for (let i = 0; i < pCount; i++) {
    const pPhase = i * ((Math.PI * 2) / pCount);
    const speed = 1.6 + (i % 4) * 0.4;
    const progress = (t * speed + pPhase) % (Math.PI * 2);

    // Orbiting interpolator between the two hand points
    const blend = (Math.sin(progress) + 1) / 2;
    const baseTargetX = f1X * blend + f2X * (1 - blend);
    const baseTargetY = f1Y * blend + f2Y * (1 - blend);

    const orbitR = 14 + (i % 5) * 8;
    const px = baseTargetX + Math.cos(progress * 3 + i) * orbitR;
    const py = baseTargetY + Math.sin(progress * 3 + i) * (orbitR * 0.7);

    const color = i % 3 === 0 ? Y : i % 3 === 1 ? B : P;
    const size = 1.5 + (i % 3) * 0.8;

    ctx.beginPath();
    ctx.arc(px, py, size, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.75;
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

/* ═══════════════════════════════════════════════════════════════════
   CATEGORY PROCEDURAL FALLBACKS
═══════════════════════════════════════════════════════════════════ */
function drawRings(ctx, W, H, t) {
  drawCodeArena(ctx, W, H, t);
}

function drawMorph(ctx, W, H, t) {
  drawFloatGPT(ctx, W, H, t);
}

function drawNeural(ctx, W, H, t) {
  drawDig(ctx, W, H, t);
}

function drawIco(ctx, W, H, t) {
  drawParticleAnimator(ctx, W, H, t);
}

/* ── Scene Dispatcher ── */
function resolveDrawFn(project, category) {
  if (project?.id === 1 || project?.title?.includes("FloatGPT")) return drawFloatGPT;
  if (project?.id === 2 || project?.title?.includes("CodeArena")) return drawCodeArena;
  if (project?.id === 3 || project?.title?.includes("Dig")) return drawDig;
  if (project?.id === 4 || project?.title?.includes("AuraOS")) return drawAuraOS;
  if (project?.id === 5 || project?.title?.includes("Reviewer")) return drawCodeReviewer;
  if (project?.id === 6 || project?.title?.includes("Particle")) return drawParticleAnimator;

  const cat = category || project?.category;
  if (cat === "Generative AI") return drawFloatGPT;
  if (cat === "Full Stack") return drawCodeArena;
  if (cat === "AI Engineering") return drawDig;
  if (cat === "Frontend") return drawParticleAnimator;
  return drawFloatGPT;
}

/* ── Component ── */
const ProjectThumbnail = ({ project, category, height = 208 }) => {
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);
  const startRef  = useRef(null);
  const isVisible = useRef(true);

  const drawFn = resolveDrawFn(project, category);

  const animate = useCallback(
    (timestamp) => {
      if (!isVisible.current) return;
      if (!startRef.current) startRef.current = timestamp;
      const t = (timestamp - startRef.current) / 1000;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      drawFn(ctx, canvas.width, canvas.height, t);
      rafRef.current = requestAnimationFrame(animate);
    },
    [drawFn]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Pause animation when card is scrolled off-screen
    const obs = new IntersectionObserver(([entry]) => {
      isVisible.current = entry.isIntersecting;
      if (entry.isIntersecting) {
        rafRef.current = requestAnimationFrame(animate);
      } else if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    }, { threshold: 0.05 });

    obs.observe(canvas);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      obs.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [animate]);

  return (
    <canvas
      ref={canvasRef}
      width={520}
      height={height}
      style={{
        width: "100%",
        height: `${height}px`,
        display: "block",
        background: BG,
      }}
    />
  );
};

export default ProjectThumbnail;
