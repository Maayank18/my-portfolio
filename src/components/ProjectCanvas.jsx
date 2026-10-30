/**
 * ProjectCanvas.jsx — Fixed
 * ✓ Explicit pixel height passed as prop (no zero-height issue)
 * ✓ Black background (alpha:false + clear color)
 * ✓ Neon yellow + blue materials matching new theme
 */

import React, { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ═══ NEURAL NET (AI Engineering) ═══ */
function NeuralNet() {
  const groupRef = useRef();
  const nodes = useMemo(() => [
    [0,0,0],[1.1,0.7,0.2],[-0.9,0.6,-0.1],[0.2,-0.9,0.5],
    [-0.4,-0.7,-0.5],[0.9,-0.3,-0.8],[-0.8,0.15,0.95],[0.1,1.05,-0.55],
  ], []);

  const lineGeo = useMemo(() => {
    const pts = [];
    for (let i = 0; i < nodes.length; i++)
      for (let j = i+1; j < nodes.length; j++) {
        const d = Math.hypot(...nodes[i].map((v,k) => v - nodes[j][k]));
        if (d < 1.55) { pts.push(new THREE.Vector3(...nodes[i])); pts.push(new THREE.Vector3(...nodes[j])); }
      }
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, [nodes]);

  useFrame(({ clock: c }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = c.elapsedTime * 0.28;
    groupRef.current.rotation.x = Math.sin(c.elapsedTime * 0.18) * 0.22;
  });

  return (
    <group ref={groupRef} scale={1.1}>
      {nodes.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[i===0 ? 0.18 : 0.1, 16, 16]} />
          <meshStandardMaterial color="#f5ff40" emissive="#f5ff40" emissiveIntensity={i===0?2.2:1.3} roughness={0.05} metalness={0.9} />
        </mesh>
      ))}
      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial color="#00d4ff" transparent opacity={0.4} />
      </lineSegments>
    </group>
  );
}

/* ═══ TORUS KNOT (Full Stack) ═══ */
function TorusKnot() {
  const meshRef = useRef();
  useFrame(({ clock: c }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = c.elapsedTime * 0.32;
    meshRef.current.rotation.z = c.elapsedTime * 0.14;
  });
  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[0.88, 0.22, 80, 12]} />
      <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={0.85} roughness={0.05} metalness={1} />
    </mesh>
  );
}

/* ═══ ICOSAHEDRON (Frontend) ═══ */
function Crystal() {
  const outerRef = useRef();
  const innerRef = useRef();
  useFrame(({ clock: c }) => {
    const t = c.elapsedTime;
    if (outerRef.current) { outerRef.current.rotation.y = t*0.4; outerRef.current.rotation.x = t*0.18; }
    if (innerRef.current) { innerRef.current.rotation.y = -t*0.6; }
  });
  return (
    <group>
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[1.0, 1]} />
        <meshStandardMaterial color="#f5ff40" emissive="#f5ff40" emissiveIntensity={0.7} wireframe roughness={0} metalness={1} />
      </mesh>
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[0.6, 0]} />
        <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={1.1} roughness={0} metalness={1} transparent opacity={0.75} />
      </mesh>
    </group>
  );
}

/* ═══ ORBITAL RINGS (Data) ═══ */
function DataOrbit() {
  const groupRef = useRef();
  const r1 = useRef(); const r2 = useRef();
  useFrame(({ clock: c }) => {
    const t = c.elapsedTime;
    if (groupRef.current) groupRef.current.rotation.y = t*0.2;
    if (r1.current) r1.current.rotation.z = t*0.55;
    if (r2.current) r2.current.rotation.z = -t*0.35;
  });
  return (
    <group ref={groupRef}>
      <mesh><sphereGeometry args={[0.28,20,20]} /><meshStandardMaterial color="#f5ff40" emissive="#f5ff40" emissiveIntensity={2} /></mesh>
      <mesh ref={r1} rotation={[Math.PI/3,0,0]}><torusGeometry args={[0.82,0.025,8,80]} /><meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={1} /></mesh>
      <mesh ref={r2} rotation={[-Math.PI/4,Math.PI/4,0]}><torusGeometry args={[1.1,0.018,8,80]} /><meshStandardMaterial color="#f5ff40" emissive="#f5ff40" emissiveIntensity={0.7} /></mesh>
    </group>
  );
}

/* ═══ OCTAHEDRON (Design) ═══ */
function DesignGem() {
  const outerRef = useRef(); const innerRef = useRef();
  useFrame(({ clock: c }) => {
    const t = c.elapsedTime;
    if (outerRef.current) { outerRef.current.rotation.y = t*0.45; outerRef.current.rotation.x = t*0.22; }
    if (innerRef.current) innerRef.current.rotation.y = -t*0.65;
  });
  return (
    <group>
      <mesh ref={outerRef}><octahedronGeometry args={[1.0,0]} /><meshStandardMaterial color="#ff3cac" emissive="#ff3cac" emissiveIntensity={0.6} roughness={0} metalness={1} transparent opacity={0.6} /></mesh>
      <mesh ref={innerRef}><octahedronGeometry args={[0.55,0]} /><meshStandardMaterial color="#f5ff40" emissive="#f5ff40" emissiveIntensity={1.5} roughness={0} metalness={1} /></mesh>
    </group>
  );
}

/* ═══ STACKED CARDS (Mobile) ═══ */
function MobileStack() {
  const groupRef = useRef();
  useFrame(({ clock: c }) => {
    const t = c.elapsedTime;
    if (groupRef.current) { groupRef.current.rotation.y = t*0.3; groupRef.current.rotation.x = Math.sin(t*0.4)*0.2; }
  });
  const layers = [
    { y:0.6,  color:"#f5ff40", emissive:"#f5ff40" },
    { y:0,    color:"#00d4ff", emissive:"#00d4ff" },
    { y:-0.6, color:"#f5ff40", emissive:"#f5ff40", opacity:0.75 },
  ];
  return (
    <group ref={groupRef}>
      {layers.map((l,i) => (
        <mesh key={i} position={[0,l.y,0]} rotation={[0,i*0.35,0]}>
          <boxGeometry args={[1.5,0.09,0.95]} />
          <meshStandardMaterial color={l.color} emissive={l.emissive} emissiveIntensity={0.8} transparent opacity={l.opacity??0.9} roughness={0.1} metalness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

/* ═══ DEFAULT ═══ */
function DefaultScene() {
  const meshRef = useRef();
  useFrame(({ clock: c }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = c.elapsedTime*0.38;
    meshRef.current.rotation.x = c.elapsedTime*0.2;
  });
  return (
    <mesh ref={meshRef}>
      <dodecahedronGeometry args={[0.9,0]} />
      <meshStandardMaterial color="#f5ff40" emissive="#f5ff40" emissiveIntensity={0.7} wireframe roughness={0} metalness={1} />
    </mesh>
  );
}

const SCENE_MAP = {
  "AI Engineering": NeuralNet,
  "Full Stack": TorusKnot,
  "Frontend":   Crystal,
//   "Data":       DataOrbit,
//   "Design":     DesignGem,
  "Mobile":     MobileStack,
  "AI":         DataOrbit,
  "Generative AI": MobileStack,
  "Deep Learning": DesignGem,
};

/* ─── Fallback ─── */
const Fallback = () => (
  <div style={{ width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center", background:"#040406" }}>
    <div style={{ width:28, height:28, borderRadius:"50%", border:"2px solid rgba(245,255,64,0.3)", borderTopColor:"#f5ff40", animation:"spin 1s linear infinite" }} />
  </div>
);

/* ─── MAIN EXPORT ─── */
const ProjectCanvas = ({ category, height = 208 }) => {
  const Scene = SCENE_MAP[category] || DefaultScene;

  return (
    <div style={{ width: "100%", height: `${height}px`, background: "#040406" }}>
      <Suspense fallback={<Fallback />}>
        <Canvas
          camera={{ position: [0, 0, 3.8], fov: 48 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: false, clearColor: "#040406" }}
          style={{ width: "100%", height: "100%", display: "block" }}
          onCreated={({ gl }) => {
            gl.setClearColor("#040406", 1);
          }}
        >
          <ambientLight intensity={0.3} />
          <pointLight position={[4, 4, 4]}    intensity={2.0} color="#f5ff40" />
          <pointLight position={[-4, -3, -4]} intensity={1.2} color="#00d4ff" />
          <pointLight position={[0, -5, 2]}   intensity={0.6} color="#ff3cac" />
          <Scene />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default ProjectCanvas;