/**
 * ProjectThumbnail.jsx
 * Pure canvas 2D animations — zero Three.js, instant load.
 */

import React, { useEffect, useRef, useCallback } from "react";

const Y  = "#f5ff40";
const B  = "#00d4ff";
const P  = "#ff3cac";
const BG = "#040406";

/* ── AI / ML : Neural Network ── */
function drawNeural(ctx, W, H, t) {
  ctx.clearRect(0, 0, W, H);
  const cx = W / 2, cy = H / 2;
  const nodes = [
    { r: 0,   a: 0    },
    { r: 70,  a: 0.8  },
    { r: 65,  a: 2.2  },
    { r: 72,  a: 3.8  },
    { r: 68,  a: 5.1  },
    { r: 110, a: 1.4  },
    { r: 105, a: 3.0  },
    { r: 108, a: 4.6  },
  ].map(({ r, a }) => ({
    x: cx + r * Math.cos(a + t * 0.22),
    y: cy + r * Math.sin(a + t * 0.22) * 0.72,
  }));

  const edges = [[0,1],[0,2],[0,3],[0,4],[1,5],[2,5],[2,6],[3,6],[3,7],[4,7],[5,6],[6,7]];
  edges.forEach(([i, j]) => {
    const pulse = 0.25 + 0.15 * Math.sin(t * 1.8 + i * 0.9);
    ctx.beginPath();
    ctx.moveTo(nodes[i].x, nodes[i].y);
    ctx.lineTo(nodes[j].x, nodes[j].y);
    ctx.strokeStyle = B;
    ctx.globalAlpha = pulse;
    ctx.lineWidth = 1.2;
    ctx.stroke();
  });

  nodes.forEach(({ x, y }, i) => {
    const size = i === 0 ? 10 : 6;
    const glow = ctx.createRadialGradient(x, y, 0, x, y, size * 2.5);
    glow.addColorStop(0, i === 0 ? Y : B);
    glow.addColorStop(1, "transparent");
    ctx.globalAlpha = 0.35;
    ctx.beginPath();
    ctx.arc(x, y, size * 2.5, 0, Math.PI * 2);
    ctx.fillStyle = glow;
    ctx.fill();

    ctx.globalAlpha = 1;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = i === 0 ? Y : B;
    ctx.shadowBlur = 16;
    ctx.shadowColor = i === 0 ? Y : B;
    ctx.fill();
    ctx.shadowBlur = 0;
  });
  ctx.globalAlpha = 1;
}

/* ── Full Stack : Interlocked Rings ── */
function drawRings(ctx, W, H, t) {
  ctx.clearRect(0, 0, W, H);
  const cx = W / 2, cy = H / 2;

  const rings = [
    { rx: 68, ry: 28, rot: t * 0.55,  color: Y, lw: 2.5 },
    { rx: 80, ry: 32, rot: -t * 0.35, color: B, lw: 1.8 },
    { rx: 95, ry: 38, rot: t * 0.2,   color: P, lw: 1.2 },
  ];

  rings.forEach(({ rx, ry, rot, color, lw }) => {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rot);
    ctx.beginPath();
    ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
    ctx.strokeStyle = color;
    ctx.lineWidth = lw;
    ctx.globalAlpha = 0.85;
    ctx.shadowBlur = 14;
    ctx.shadowColor = color;
    ctx.stroke();
    ctx.restore();
  });

  const dot = {
    x: cx + 68 * Math.cos(t * 0.55),
    y: cy + 28 * Math.sin(t * 0.55),
  };
  ctx.beginPath();
  ctx.arc(dot.x, dot.y, 5, 0, Math.PI * 2);
  ctx.fillStyle = Y;
  ctx.shadowBlur = 20;
  ctx.shadowColor = Y;
  ctx.globalAlpha = 1;
  ctx.fill();

  ctx.beginPath();
  ctx.arc(cx, cy, 10, 0, Math.PI * 2);
  ctx.fillStyle = B;
  ctx.shadowBlur = 24;
  ctx.shadowColor = B;
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.globalAlpha = 1;
}

/* ── Frontend : Rotating Wireframe Icosahedron ── */
function drawIco(ctx, W, H, t) {
  ctx.clearRect(0, 0, W, H);
  const cx = W / 2, cy = H / 2, R = 75;

  const phi = (1 + Math.sqrt(5)) / 2;
  const raw = [
    [0, 1, phi],[0,-1, phi],[0, 1,-phi],[0,-1,-phi],
    [1, phi, 0],[-1, phi, 0],[1,-phi, 0],[-1,-phi, 0],
    [phi, 0, 1],[ phi,0,-1],[-phi, 0, 1],[-phi, 0,-1],
  ];
  const len = Math.sqrt(1 + phi * phi);
  const verts = raw.map(([x, y, z]) => {
    const nx = x / len, ny = y / len, nz = z / len;
    const ry = t * 0.4, rx = t * 0.18;
    const cosY = Math.cos(ry), sinY = Math.sin(ry);
    const cosX = Math.cos(rx), sinX = Math.sin(rx);
    const x1 = nx * cosY + nz * sinY;
    const y1 = ny;
    const z1 = -nx * sinY + nz * cosY;
    const x2 = x1;
    const y2 = y1 * cosX - z1 * sinX;
    const z2 = y1 * sinX + z1 * cosX;
    return { x: cx + x2 * R, y: cy + y2 * R, z: z2 };
  });

  const edges = [
    [0,1],[0,4],[0,5],[0,8],[0,10],
    [1,6],[1,7],[1,8],[1,10],
    [2,3],[2,4],[2,5],[2,9],[2,11],
    [3,6],[3,7],[3,9],[3,11],
    [4,5],[4,8],[4,9],[5,10],[5,11],
    [6,7],[6,8],[6,9],[7,10],[7,11],
    [8,9],[10,11],
  ];

  edges.forEach(([i, j]) => {
    const alpha = 0.15 + 0.55 * ((verts[i].z + verts[j].z) / 2 + 1) / 2;
    ctx.beginPath();
    ctx.moveTo(verts[i].x, verts[i].y);
    ctx.lineTo(verts[j].x, verts[j].y);
    ctx.strokeStyle = Y;
    ctx.lineWidth = 1.2;
    ctx.globalAlpha = alpha;
    ctx.shadowBlur = 6;
    ctx.shadowColor = Y;
    ctx.stroke();
  });

  ctx.beginPath();
  ctx.arc(cx, cy, 18, 0, Math.PI * 2);
  const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, 18);
  grd.addColorStop(0, B);
  grd.addColorStop(0.6, "rgba(0,212,255,0.5)");
  grd.addColorStop(1, "transparent");
  ctx.fillStyle = grd;
  ctx.globalAlpha = 0.9;
  ctx.shadowBlur = 30;
  ctx.shadowColor = B;
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.globalAlpha = 1;
}

/* ── Data : Orbital System ── */
function drawOrbit(ctx, W, H, t) {
  ctx.clearRect(0, 0, W, H);
  const cx = W / 2, cy = H / 2;

  const orbits = [
    { rx: 50,  ry: 22, speed: 0.55,  color: Y, dotR: 5 },
    { rx: 80,  ry: 36, speed: -0.35, color: B, dotR: 4 },
    { rx: 108, ry: 46, speed: 0.22,  color: P, dotR: 3 },
  ];

  orbits.forEach(({ rx, ry, color }) => {
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, ry, 0.3, 0, Math.PI * 2);
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.18;
    ctx.stroke();
  });

  orbits.forEach(({ rx, ry, speed, color, dotR }) => {
    for (let i = 10; i >= 0; i--) {
      const angle = t * speed - i * 0.12;
      const tx = cx + rx * Math.cos(angle);
      const ty = cy + ry * Math.sin(angle);
      ctx.beginPath();
      ctx.arc(tx, ty, dotR * (i / 10), 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.globalAlpha = (i / 10) * 0.6;
      ctx.fill();
    }
    const hx = cx + rx * Math.cos(t * speed);
    const hy = cy + ry * Math.sin(t * speed);
    ctx.beginPath();
    ctx.arc(hx, hy, dotR, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.shadowBlur = 18;
    ctx.shadowColor = color;
    ctx.globalAlpha = 1;
    ctx.fill();
    ctx.shadowBlur = 0;
  });

  ctx.beginPath();
  ctx.arc(cx, cy, 9, 0, Math.PI * 2);
  ctx.fillStyle = Y;
  ctx.shadowBlur = 28;
  ctx.shadowColor = Y;
  ctx.globalAlpha = 1;
  ctx.fill();
  ctx.shadowBlur = 0;
}

/* ── Design : Morphing Polygon ── */
function drawMorph(ctx, W, H, t) {
  ctx.clearRect(0, 0, W, H);
  const cx = W / 2, cy = H / 2;

  const layers = [
    { n: 8, R: 90, rot: t * 0.25,  color: P, lw: 1.5, a: 0.7 },
    { n: 6, R: 65, rot: -t * 0.4,  color: Y, lw: 2,   a: 0.9 },
    { n: 4, R: 40, rot: t * 0.6,   color: B, lw: 2.5, a: 1   },
  ];

  layers.forEach(({ n, R, rot, color, lw, a }) => {
    ctx.beginPath();
    for (let i = 0; i <= n; i++) {
      const angle = (i / n) * Math.PI * 2 + rot;
      const r = R + 6 * Math.sin(t * 1.5 + i * 1.2);
      const px = cx + r * Math.cos(angle);
      const py = cy + r * Math.sin(angle);
      i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.strokeStyle = color;
    ctx.lineWidth = lw;
    ctx.globalAlpha = a;
    ctx.shadowBlur = 12;
    ctx.shadowColor = color;
    ctx.stroke();
  });

  const pulse = 8 + 4 * Math.sin(t * 2);
  ctx.beginPath();
  ctx.arc(cx, cy, pulse, 0, Math.PI * 2);
  const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, pulse);
  grd.addColorStop(0, "#fff");
  grd.addColorStop(0.5, P);
  grd.addColorStop(1, "transparent");
  ctx.fillStyle = grd;
  ctx.globalAlpha = 0.9;
  ctx.shadowBlur = 24;
  ctx.shadowColor = P;
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.globalAlpha = 1;
}

/* ── Mobile : Layered Screens ── */
function drawMobile(ctx, W, H, t) {
  ctx.clearRect(0, 0, W, H);
  const cx = W / 2, cy = H / 2;

  const layers = [
    { dy: -44, color: Y, alpha: 0.8 },
    { dy:   0, color: B, alpha: 0.9 },
    { dy:  44, color: Y, alpha: 0.7 },
  ];

  layers.forEach(({ dy, color, alpha }, i) => {
    const w = 120, h = 22;
    const rot = (i - 1) * 0.12 + Math.sin(t * 0.5 + i) * 0.04;

    ctx.save();
    ctx.translate(cx, cy + dy);
    ctx.rotate(rot);

    ctx.shadowBlur = 20;
    ctx.shadowColor = color;
    ctx.globalAlpha = alpha * 0.3;
    ctx.fillStyle = color;
    ctx.fillRect(-w / 2 - 4, -h / 2 - 4, w + 8, h + 8);

    ctx.globalAlpha = alpha;
    ctx.fillRect(-w / 2, -h / 2, w, h);

    ctx.globalAlpha = 0.25;
    ctx.fillStyle = "#fff";
    ctx.fillRect(-w / 2 + 4, -h / 2 + 3, w - 8, 4);

    ctx.shadowBlur = 0;
    ctx.restore();
  });
  ctx.globalAlpha = 1;
}

/* ── Scene Map ── */
const DRAW_MAP = {
  "AI / ML":    drawNeural,
  "Full Stack": drawRings,
  "Frontend":   drawIco,
//   "Data":       drawOrbit,
//   "Design":     drawMorph,
  "Mobile":     drawMobile,
  "AI":         drawOrbit,
  "Generative AI": drawMobile,
  "Deep Learning": drawMorph,
};

/* ── Component ── */
const ProjectThumbnail = ({ category, height = 208 }) => {
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);
  const startRef  = useRef(null);
  const drawFn    = DRAW_MAP[category] || drawNeural;

  const animate = useCallback(
    (timestamp) => {
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
    startRef.current = null;
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
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