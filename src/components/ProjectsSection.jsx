// /**
//  * ProjectsSection.jsx — Performance Fix
//  * ✓ Replaced Three.js (600KB, 6-7s) with ProjectThumbnail (canvas 2D, instant)
//  * ✓ Card 3D roll animation on click retained
//  * ✓ Filter tabs with AnimatePresence
//  */

// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { ExternalLink, Github, Layers } from "lucide-react";
// import { projects, filterCategories } from "../data/mock";
// import {
//   Dialog, DialogContent, DialogHeader, DialogTitle,
// } from "./ui/dialog";
// import ProjectThumbnail from "./ProjectThumbnail";

// const CARD_ANIM_MS = 480;

// /* ── Category pill ── */
// const CatPill = ({ label }) => (
//   <span style={{
//     display:"inline-block", padding:"3px 11px", borderRadius:8,
//     fontSize:10, fontFamily:"'Syne',sans-serif", fontWeight:700,
//     textTransform:"uppercase", letterSpacing:"0.14em",
//     background:"rgba(245,255,64,0.09)", border:"1px solid rgba(245,255,64,0.25)",
//     color:"rgba(245,255,64,0.8)",
//   }}>{label}</span>
// );

// /* ── Tech chip ── */
// const TechChip = ({ name }) => (
//   <span style={{
//     padding:"4px 11px", borderRadius:7, fontSize:11,
//     background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)", color:"#8892b0",
//   }}>{name}</span>
// );

// /* ── Project Card ── */
// const ProjectCard = ({ project, onRollComplete, index }) => {
//   const [rolling, setRolling] = useState(false);

//   const handleClick = () => {
//     if (rolling) return;
//     setRolling(true);
//     setTimeout(() => {
//       setRolling(false);
//       onRollComplete(project);
//     }, CARD_ANIM_MS);
//   };

//   return (
//     <motion.div
//       layout
//       initial={{ opacity:0, y:36 }}
//       animate={{
//         opacity: 1, y: 0,
//         rotateY: rolling ? [0, -10, -68] : 0,
//         rotateZ: rolling ? [0, -2,   4 ] : 0,
//         scale:   rolling ? [1, 1.03, 0.84] : 1,
//       }}
//       exit={{ opacity:0, scale:0.88 }}
//       transition={{
//         opacity: { duration:0.4, delay:index*0.07 },
//         y:       { duration:0.4, delay:index*0.07, ease:[0.22,1,0.36,1] },
//         rotateY: { duration: CARD_ANIM_MS/1000, ease:[0.4,0,0.2,1] },
//         rotateZ: { duration: CARD_ANIM_MS/1000, ease:[0.4,0,0.2,1] },
//         scale:   { duration: CARD_ANIM_MS/1000, ease:[0.4,0,0.2,1] },
//       }}
//       whileHover={!rolling ? { y:-8, transition:{ duration:0.22 } } : {}}
//       onClick={handleClick}
//       style={{
//         cursor:"pointer",
//         perspective:"900px",
//         transformStyle:"preserve-3d",
//         borderRadius:20, overflow:"hidden",
//         background:"#08080d",
//         border:"1px solid rgba(245,255,64,0.1)",
//         boxShadow:"0 4px 30px rgba(0,0,0,0.5)",
//         transition:"border-color 0.3s, box-shadow 0.3s",
//       }}
//       onMouseEnter={(e) => {
//         if (rolling) return;
//         e.currentTarget.style.borderColor = "rgba(245,255,64,0.38)";
//         e.currentTarget.style.boxShadow   = "0 8px 50px rgba(245,255,64,0.1), 0 0 28px rgba(0,212,255,0.06)";
//       }}
//       onMouseLeave={(e) => {
//         e.currentTarget.style.borderColor = "rgba(245,255,64,0.1)";
//         e.currentTarget.style.boxShadow   = "0 4px 30px rgba(0,0,0,0.5)";
//       }}
//     >
//       {/* Canvas Thumbnail — instant render */}
//       <div style={{ position:"relative", width:"100%", height:208, overflow:"hidden" }}>
//         <ProjectThumbnail category={project.category} height={208} />
//         {/* Bottom fade */}
//         <div style={{
//           position:"absolute", inset:0, pointerEvents:"none",
//           background:"linear-gradient(to top, #08080d 0%, rgba(8,8,13,0.25) 45%, transparent 100%)",
//         }} />
//         {/* Badge */}
//         <div style={{ position:"absolute", top:12, left:12, zIndex:10 }}>
//           <CatPill label={project.category} />
//         </div>
//       </div>

//       {/* Body */}
//       <div style={{ padding:"18px 20px 20px" }}>
//         <h3 style={{
//           fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:16,
//           color:"#f0e6ff", marginBottom:5, transition:"color 0.25s",
//         }}>
//           {project.title}
//         </h3>
//         <p style={{
//           fontSize:13, lineHeight:1.65, color:"#3d4560", marginBottom:14,
//           display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden",
//         }}>
//           {project.shortDesc}
//         </p>
//         <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:14 }}>
//           {project.techStack.slice(0,4).map((t,i) => <TechChip key={i} name={t} />)}
//           {project.techStack.length > 4 && <TechChip name={`+${project.techStack.length-4}`} />}
//         </div>
//         <div style={{ borderTop:"1px solid rgba(255,255,255,0.04)", paddingTop:12,
//           display:"flex", alignItems:"center", justifyContent:"space-between" }}>
//           <span style={{ fontFamily:"'Syne',sans-serif", fontSize:11,
//             color:"rgba(245,255,64,0.38)", fontWeight:600, letterSpacing:"0.08em" }}>
//             Click to explore
//           </span>
//           <ExternalLink size={12} style={{ color:"rgba(245,255,64,0.32)" }} />
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// /* ── Filter Tabs ── */
// const FilterTabs = ({ active, onChange }) => (
//   <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:52 }}>
//     {filterCategories.map((cat) => {
//       const isA = active === cat;
//       return (
//         <motion.button
//           key={cat}
//           onClick={() => onChange(cat)}
//           whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}
//           style={{
//             fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:11,
//             textTransform:"uppercase", letterSpacing:"0.18em",
//             padding:"8px 16px", borderRadius:11, cursor:"pointer",
//             background: isA ? "rgba(245,255,64,0.12)" : "rgba(255,255,255,0.02)",
//             border: isA ? "1px solid rgba(245,255,64,0.45)" : "1px solid rgba(255,255,255,0.07)",
//             color: isA ? "#f5ff40" : "#3d4560",
//             boxShadow: isA ? "0 0 18px rgba(245,255,64,0.13)" : "none",
//             transition:"all 0.22s",
//           }}
//         >
//           {cat}
//         </motion.button>
//       );
//     })}
//   </div>
// );

// /* ── Section ── */
// const ProjectsSection = () => {
//   const [activeFilter, setActiveFilter] = useState("All");
//   const [selected,     setSelected]     = useState(null);

//   const filtered = activeFilter === "All"
//     ? projects
//     : projects.filter((p) => p.category === activeFilter);

//   return (
//     <section id="projects" className="relative py-28 px-6 lg:px-16" style={{ background:"#040406" }}>
//       <div className="absolute top-0 left-0 right-0" style={{
//         height:1,
//         background:"linear-gradient(90deg,transparent,rgba(245,255,64,0.3),rgba(0,212,255,0.2),transparent)"
//       }} />
//       <div className="absolute pointer-events-none" style={{
//         top:"40%", right:0, width:500, height:500, borderRadius:"50%",
//         background:"rgba(0,212,255,0.022)", filter:"blur(140px)",
//       }} />

//       <div className="relative z-10 max-w-7xl mx-auto">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity:0, y:26 }} whileInView={{ opacity:1, y:0 }}
//           viewport={{ once:true }} transition={{ duration:0.52 }}
//           style={{ marginBottom:36 }}
//         >
//           <div className="section-tag" style={{ marginBottom:18 }}>
//             <Layers size={11} /> Portfolio
//           </div>
//           <h2 style={{
//             fontFamily:"'Syne',sans-serif", fontWeight:800,
//             fontSize:"clamp(2.5rem,5.5vw,4.2rem)", lineHeight:1.05, marginBottom:16,
//             background:"linear-gradient(120deg,#fff 0%,#f5ff40 45%,#00d4ff 90%)",
//             WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
//           }}>
//             Featured Projects
//           </h2>
//           <div className="neon-underline" />
//         </motion.div>

//         <motion.div initial={{ opacity:0,y:16 }} whileInView={{ opacity:1,y:0 }}
//           viewport={{ once:true }} transition={{ duration:0.42, delay:0.1 }}>
//           <FilterTabs active={activeFilter} onChange={setActiveFilter} />
//         </motion.div>

//         <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           <AnimatePresence mode="popLayout">
//             {filtered.map((project, index) => (
//               <ProjectCard key={project.id} project={project}
//                 onRollComplete={setSelected} index={index} />
//             ))}
//           </AnimatePresence>
//         </motion.div>
//       </div>

//       {/* Modal */}
//       <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
//         <DialogContent className="max-w-2xl p-0 overflow-hidden rounded-2xl" style={{
//           background:"#08080d",
//           border:"1px solid rgba(245,255,64,0.2)",
//           boxShadow:"0 0 80px rgba(245,255,64,0.1), 0 0 28px rgba(0,212,255,0.05)",
//         }}>
//           {selected && (
//             <motion.div
//               initial={{ opacity:0, rotateY:-16, scale:0.94 }}
//               animate={{ opacity:1, rotateY:0, scale:1 }}
//               transition={{ duration:0.48, ease:[0.22,1,0.36,1] }}
//               style={{ perspective:"800px" }}
//             >
//               {/* Canvas header */}
//               <div style={{ position:"relative", width:"100%", height:240, overflow:"hidden" }}>
//                 <ProjectThumbnail category={selected.category} height={240} />
//                 <div style={{
//                   position:"absolute", inset:0, pointerEvents:"none",
//                   background:"linear-gradient(to top, #08080d 0%, rgba(8,8,13,0.35) 45%, transparent 100%)",
//                 }} />
//                 <div style={{ position:"absolute", top:14, left:14, zIndex:10 }}>
//                   <CatPill label={selected.category} />
//                 </div>
//               </div>

//               <div style={{ padding:"0 28px 28px", marginTop:-12, position:"relative", zIndex:10 }}>
//                 <DialogHeader style={{ marginBottom:16 }}>
//                   <DialogTitle style={{
//                     fontFamily:"'Syne',sans-serif", fontWeight:800,
//                     fontSize:"clamp(1.4rem,3vw,1.85rem)", lineHeight:1.1,
//                     background:"linear-gradient(120deg,#fff,#f5ff40)",
//                     WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
//                   }}>
//                     {selected.title}
//                   </DialogTitle>
//                 </DialogHeader>

//                 <p style={{ fontSize:14, lineHeight:1.76, color:"#8892b0", marginBottom:22 }}>
//                   {selected.description}
//                 </p>

//                 <div style={{ marginBottom:26 }}>
//                   <h4 style={{
//                     fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:10,
//                     textTransform:"uppercase", letterSpacing:"0.2em", color:"#3d4560", marginBottom:11,
//                   }}>
//                     Tech Stack
//                   </h4>
//                   <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
//                     {selected.techStack.map((t,i) => (
//                       <span key={i} style={{
//                         padding:"6px 14px", borderRadius:9, fontSize:12,
//                         fontFamily:"'Syne',sans-serif", fontWeight:600,
//                         background:"rgba(245,255,64,0.08)", border:"1px solid rgba(245,255,64,0.2)",
//                         color:"rgba(245,255,64,0.85)",
//                       }}>{t}</span>
//                     ))}
//                   </div>
//                 </div>

//                 <div style={{ display:"flex", gap:12 }}>
//                   <a href={selected.liveUrl} target="_blank" rel="noopener noreferrer"
//                     style={{
//                       flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:8,
//                       padding:"12px 20px", borderRadius:12,
//                       fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:13,
//                       background:"linear-gradient(135deg,rgba(245,255,64,0.16),rgba(0,212,255,0.1))",
//                       border:"1px solid rgba(245,255,64,0.35)", color:"#f5ff40",
//                       textDecoration:"none", transition:"box-shadow 0.25s",
//                     }}
//                     onMouseEnter={(e) => { e.currentTarget.style.boxShadow="0 0 24px rgba(245,255,64,0.18)"; }}
//                     onMouseLeave={(e) => { e.currentTarget.style.boxShadow="none"; }}
//                   >
//                     <ExternalLink size={14} /> Live Demo
//                   </a>
//                   <a href={selected.sourceUrl} target="_blank" rel="noopener noreferrer"
//                     style={{
//                       flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:8,
//                       padding:"12px 20px", borderRadius:12,
//                       fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:13,
//                       background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.1)",
//                       color:"#8892b0", textDecoration:"none", transition:"all 0.25s",
//                     }}
//                     onMouseEnter={(e) => { e.currentTarget.style.borderColor="rgba(255,255,255,0.2)"; e.currentTarget.style.color="#fff"; }}
//                     onMouseLeave={(e) => { e.currentTarget.style.borderColor="rgba(255,255,255,0.1)"; e.currentTarget.style.color="#8892b0"; }}
//                   >
//                     <Github size={14} /> Source Code
//                   </a>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </DialogContent>
//       </Dialog>
//     </section>
//   );
// };

// export default ProjectsSection;





































/**
 * ProjectsSection.jsx
 *
 * Architecture decisions (senior notes):
 * ─────────────────────────────────────
 * • Card grid  → always shows canvas animation (techy, eye-catching, fast)
 * • Modal      → shows real screenshot IF project.thumbnail is set,
 *                falls back to canvas animation gracefully (no broken images)
 * • ModalHeader is its own component so it owns its own imgError state
 *   and can re-mount cleanly when `selected` changes
 * • No inline ternary hell — each visual concern is its own small component
 * • onRollComplete fires AFTER the 3D roll animation finishes, not on click
 * • All magic numbers are named constants at the top
 */

import React, { useState, memo, useCallback } from "react";
import { motion, AnimatePresence }             from "framer-motion";
import { ExternalLink, Github, Layers }        from "lucide-react";
import { projects, filterCategories }          from "../data/mock";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import ProjectThumbnail from "./ProjectThumbnail";

/* ─── Constants ──────────────────────────────────────────────────── */
const CARD_ROLL_MS   = 480;   // duration of the 3D roll animation before modal opens
const CARD_HEIGHT_PX = 208;   // canvas animation height on grid card
const MODAL_HEIGHT_PX = 260;  // screenshot/canvas height inside modal

/* ─── Design tokens (match index.css) ───────────────────────────── */
const T = {
  bg:         "#040406",
  bgCard:     "#08080d",
  yellow:     "#f5ff40",
  yellowDim:  "rgba(245,255,64,0.8)",
  yellowBdr:  "rgba(245,255,64,0.1)",
  yellowBdrH: "rgba(245,255,64,0.38)",
  yellowGlow: "rgba(245,255,64,0.1)",
  blue:       "#00d4ff",
  text3:      "#8892b0",
  text4:      "#3d4560",
};

/* ═══════════════════════════════════════════════════════════════════
   SMALL SHARED COMPONENTS
═══════════════════════════════════════════════════════════════════ */

const CatPill = memo(({ label }) => (
  <span style={{
    display: "inline-flex", alignItems: "center", gap: 6,
    padding: "4px 11px", borderRadius: 8,
    fontSize: 10, fontFamily: "'Syne',sans-serif", fontWeight: 700,
    textTransform: "uppercase", letterSpacing: "0.14em",
    background: "rgba(6,6,12,0.85)",
    backdropFilter: "blur(8px)",
    border: `1px solid rgba(245,255,64,0.32)`,
    color: T.yellowDim,
    whiteSpace: "nowrap",
  }}>
    <span style={{ width: 5, height: 5, borderRadius: "50%", background: T.yellow, boxShadow: `0 0 6px ${T.yellow}` }} />
    {label}
  </span>
));

const TechChip = memo(({ name }) => (
  <span style={{
    padding: "4px 10px", borderRadius: 7, fontSize: 11,
    fontFamily: "'DM Sans',sans-serif",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.09)",
    color: "#a0aec0",
  }}>
    {name}
  </span>
));

/* Gradient overlay that fades canvas/image into the dark modal body */
const FadeOverlay = () => (
  <div style={{
    position: "absolute", inset: 0, pointerEvents: "none",
    background: "linear-gradient(to top, #08080d 0%, rgba(8,8,13,0.45) 40%, transparent 100%)",
  }} />
);

/* ═══════════════════════════════════════════════════════════════════
   MODAL HEADER
   Owns its own imgError state so it resets cleanly on each open.
   Priority: real screenshot → canvas animation fallback
═══════════════════════════════════════════════════════════════════ */
const ModalHeader = memo(({ project }) => {
  const [imgFailed, setImgFailed] = useState(false);

  // A thumbnail is "usable" only when the field is a non-empty string AND hasn't 404'd
  const showScreenshot = Boolean(project.thumbnail) && !imgFailed;

  return (
    <div style={{
      position: "relative",
      width: "100%",
      height: MODAL_HEIGHT_PX,
      overflow: "hidden",
      background: T.bg,
      flexShrink: 0,
    }}>

      {showScreenshot ? (
        /* ── Real project screenshot ── */
        <img
          key={project.thumbnail}   /* key forces remount if URL changes */
          src={project.thumbnail}
          alt={`${project.title} preview`}
          onError={() => setImgFailed(true)}
          style={{
            width:          "100%",
            height:         "100%",
            objectFit:      "cover",
            objectPosition: "top center",
            display:        "block",
            filter:         "brightness(0.85) saturate(1.1)",
          }}
        />
      ) : (
        /* ── Canvas animation fallback ── */
        <ProjectThumbnail project={project} category={project.category} height={MODAL_HEIGHT_PX} />
      )}

      <FadeOverlay />

      {/* Category pill — bottom left, sits above the gradient */}
      <div style={{ position: "absolute", bottom: 16, left: 16, zIndex: 2 }}>
        <CatPill label={project.category} />
      </div>

      {/* "Live Preview" badge — only shown when screenshot is real */}
      {showScreenshot && (
        <div style={{
          position:       "absolute", top: 14, right: 14, zIndex: 2,
          display:        "flex", alignItems: "center", gap: 6,
          padding:        "4px 12px", borderRadius: 99,
          background:     "rgba(0,0,0,0.6)",
          backdropFilter: "blur(10px)",
          border:         "1px solid rgba(255,255,255,0.1)",
          fontFamily:     "'Syne',sans-serif", fontSize: 9, fontWeight: 700,
          letterSpacing:  "0.16em", textTransform: "uppercase",
          color:          "rgba(255,255,255,0.55)",
          userSelect:     "none",
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: "50%",
            background: "#4ade80",
            boxShadow: "0 0 6px #4ade80",
            flexShrink: 0,
          }} />
          Live Preview
        </div>
      )}
    </div>
  );
});

/* ═══════════════════════════════════════════════════════════════════
   PROJECT CARD
   Canvas animation on the grid — punchy, techy, zero load time.
   Rolls in 3D on click → modal opens after animation completes.
═══════════════════════════════════════════════════════════════════ */
const ProjectCard = memo(({ project, onRollComplete, index }) => {
  const [rolling, setRolling] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleClick = useCallback(() => {
    if (rolling) return;
    setRolling(true);
    setTimeout(() => {
      setRolling(false);
      onRollComplete(project);
    }, CARD_ROLL_MS);
  }, [rolling, project, onRollComplete]);

  const handleMouseEnter = useCallback((e) => {
    if (rolling) return;
    setHovered(true);
    e.currentTarget.style.borderColor = "rgba(0,212,255,0.45)";
    e.currentTarget.style.boxShadow   = `0 12px 50px rgba(0,212,255,0.12), 0 0 28px rgba(245,255,64,0.08)`;
  }, [rolling]);

  const handleMouseLeave = useCallback((e) => {
    setHovered(false);
    e.currentTarget.style.borderColor = T.yellowBdr;
    e.currentTarget.style.boxShadow   = "0 4px 30px rgba(0,0,0,0.5)";
  }, []);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 36 }}
      animate={{
        opacity: 1,
        y:       0,
        rotateY: rolling ? [0, -10, -68] : 0,
        rotateZ: rolling ? [0,  -2,   4] : 0,
        scale:   rolling ? [1, 1.03, 0.84] : 1,
      }}
      exit={{ opacity: 0, scale: 0.88 }}
      transition={{
        opacity: { duration: 0.4,                      delay: index * 0.07 },
        y:       { duration: 0.4, ease: [0.22,1,0.36,1], delay: index * 0.07 },
        rotateY: { duration: CARD_ROLL_MS / 1000, ease: [0.4, 0, 0.2, 1] },
        rotateZ: { duration: CARD_ROLL_MS / 1000, ease: [0.4, 0, 0.2, 1] },
        scale:   { duration: CARD_ROLL_MS / 1000, ease: [0.4, 0, 0.2, 1] },
      }}
      whileHover={rolling ? {} : { y: -8, transition: { duration: 0.22 } }}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        cursor:         "pointer",
        perspective:    "900px",
        transformStyle: "preserve-3d",
        borderRadius:   20,
        overflow:       "hidden",
        background:     "linear-gradient(180deg, #0a0a14 0%, #06060c 100%)",
        border:         `1px solid ${T.yellowBdr}`,
        boxShadow:      "0 4px 30px rgba(0,0,0,0.5)",
        transition:     "border-color 0.3s, box-shadow 0.3s",
      }}
    >
      {/* ── Card media header ── */}
      <div style={{ position: "relative", width: "100%", height: CARD_HEIGHT_PX, overflow: "hidden", background: "#06060c" }}>
        {project.thumbnail ? (
          <>
            <img
              src={project.thumbnail}
              alt={`${project.title} preview`}
              loading="lazy"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "top center",
                display: "block",
                transition: "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), filter 0.45s ease",
                transform: hovered ? "scale(1.05)" : "scale(1)",
                filter: hovered ? "brightness(1.02) contrast(1.05)" : "brightness(0.88) contrast(1)",
              }}
            />
            {/* Animated Canvas Overlay on hover */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                opacity: hovered ? 1 : 0,
                transition: "opacity 0.35s ease",
                pointerEvents: "none",
              }}
            >
              <ProjectThumbnail project={project} category={project.category} height={CARD_HEIGHT_PX} />
            </div>
          </>
        ) : (
          <ProjectThumbnail project={project} category={project.category} height={CARD_HEIGHT_PX} />
        )}
        <FadeOverlay />
        
        {/* Category badge */}
        <div style={{ position: "absolute", top: 12, left: 12, zIndex: 2 }}>
          <CatPill label={project.category} />
        </div>

        {/* Project sequence index */}
        <span style={{
          position: "absolute", top: 12, right: 14, zIndex: 2,
          fontFamily: "'Syne', sans-serif", fontSize: 11, fontWeight: 800,
          color: "rgba(255,255,255,0.22)", letterSpacing: "0.1em",
        }}>
          0{index + 1}
        </span>
      </div>

      {/* ── Card body ── */}
      <div style={{ padding: "18px 20px 20px" }}>
        <h3 style={{
          fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 17,
          color: "#ffffff", marginBottom: 6, lineHeight: 1.3,
          letterSpacing: "-0.01em",
        }}>
          {project.title}
        </h3>

        <p style={{
          fontSize: 13, lineHeight: 1.65, color: "#94a3b8", marginBottom: 14,
          display: "-webkit-box", WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical", overflow: "hidden",
        }}>
          {project.shortDesc}
        </p>

        {/* Show first 4 chips only — "+N more" for the rest */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
          {project.techStack.slice(0, 4).map((t) => (
            <TechChip key={t} name={t} />
          ))}
          {project.techStack.length > 4 && (
            <TechChip name={`+${project.techStack.length - 4} more`} />
          )}
        </div>

        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 14,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <span style={{
            fontFamily: "'Syne',sans-serif", fontSize: 11,
            color: "rgba(0,212,255,0.85)", fontWeight: 700, letterSpacing: "0.08em",
          }}>
            Explore Architecture &amp; Demo
          </span>
          <ExternalLink size={13} style={{ color: "#00d4ff" }} />
        </div>
      </div>
    </motion.div>
  );
});

/* ═══════════════════════════════════════════════════════════════════
   FILTER TABS
═══════════════════════════════════════════════════════════════════ */
const FilterTabs = memo(({ active, onChange }) => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 52 }}>
    {filterCategories.map((cat) => {
      const isActive = active === cat;
      return (
        <motion.button
          key={cat}
          onClick={() => onChange(cat)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            fontFamily:    "'Syne',sans-serif", fontWeight: 700, fontSize: 11,
            textTransform: "uppercase", letterSpacing: "0.18em",
            padding:       "8px 16px", borderRadius: 11, cursor: "pointer",
            background:    isActive ? "rgba(245,255,64,0.12)" : "rgba(255,255,255,0.02)",
            border:        isActive ? "1px solid rgba(245,255,64,0.45)" : "1px solid rgba(255,255,255,0.07)",
            color:         isActive ? T.yellow : T.text4,
            boxShadow:     isActive ? "0 0 18px rgba(245,255,64,0.13)" : "none",
            transition:    "all 0.22s",
          }}
        >
          {cat}
        </motion.button>
      );
    })}
  </div>
));

/* ═══════════════════════════════════════════════════════════════════
   ACTION BUTTONS (Live Demo + Source Code)
═══════════════════════════════════════════════════════════════════ */
const ActionButton = memo(({ href, icon: Icon, label, variant }) => {
  const isPrimary = variant === "primary";
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        flex:           1,
        display:        "flex", alignItems: "center", justifyContent: "center", gap: 8,
        padding:        "12px 20px", borderRadius: 12, textDecoration: "none",
        fontFamily:     "'Syne',sans-serif", fontWeight: 700, fontSize: 13,
        transition:     "box-shadow 0.25s, border-color 0.25s, color 0.25s",
        ...(isPrimary ? {
          background: "linear-gradient(135deg,rgba(245,255,64,0.16),rgba(0,212,255,0.1))",
          border:     "1px solid rgba(245,255,64,0.35)",
          color:      T.yellow,
        } : {
          background: "rgba(255,255,255,0.03)",
          border:     "1px solid rgba(255,255,255,0.1)",
          color:      T.text3,
        }),
      }}
      onMouseEnter={(e) => {
        if (isPrimary) {
          e.currentTarget.style.boxShadow = "0 0 24px rgba(245,255,64,0.18)";
        } else {
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)";
          e.currentTarget.style.color        = "#ffffff";
        }
      }}
      onMouseLeave={(e) => {
        if (isPrimary) {
          e.currentTarget.style.boxShadow = "none";
        } else {
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
          e.currentTarget.style.color       = T.text3;
        }
      }}
    >
      <Icon size={14} />
      {label}
    </a>
  );
});

/* ═══════════════════════════════════════════════════════════════════
   PROJECTS SECTION  (main export)
═══════════════════════════════════════════════════════════════════ */
const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selected,     setSelected]     = useState(null);

  const handleFilterChange = useCallback((cat) => setActiveFilter(cat), []);
  const handleModalClose   = useCallback((open) => { if (!open) setSelected(null); }, []);

  const filtered = activeFilter === "All"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section
      id="projects"
      className="relative py-28 px-6 lg:px-16"
      style={{ background: T.bg }}
    >
      {/* Ambient glow line at section top */}
      <div style={{
        position:   "absolute", top: 0, left: 0, right: 0, height: 1, pointerEvents: "none",
        background: "linear-gradient(90deg,transparent,rgba(245,255,64,0.3),rgba(0,212,255,0.2),transparent)",
      }} />

      {/* Background orbs */}
      <div style={{
        position:     "absolute", top: "40%", right: 0, pointerEvents: "none",
        width:        500, height: 500, borderRadius: "50%",
        background:   "rgba(0,212,255,0.022)", filter: "blur(140px)",
      }} />
      <div style={{
        position:     "absolute", bottom: 0, left: "15%", pointerEvents: "none",
        width:        400, height: 400, borderRadius: "50%",
        background:   "rgba(245,255,64,0.018)", filter: "blur(120px)",
      }} />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* ── Section heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.52 }}
          style={{ marginBottom: 36 }}
        >
          <div className="section-tag" style={{ marginBottom: 18 }}>
            <Layers size={11} /> Portfolio
          </div>
          <h2 style={{
            fontFamily:           "'Syne',sans-serif", fontWeight: 800,
            fontSize:             "clamp(2.5rem,5.5vw,4.2rem)", lineHeight: 1.05,
            marginBottom:         16,
            background:           "linear-gradient(120deg,#fff 0%,#f5ff40 45%,#00d4ff 90%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            backgroundClip:       "text",
          }}>
            Featured Projects
          </h2>
          <div className="neon-underline" />
        </motion.div>

        {/* ── Filter tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.42, delay: 0.1 }}
        >
          <FilterTabs active={activeFilter} onChange={handleFilterChange} />
        </motion.div>

        {/* ── Project grid ── */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                onRollComplete={setSelected}
                index={index}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          MODAL
          Header  → ModalHeader  (screenshot or canvas fallback)
          Content → description + tech stack + action buttons
      ══════════════════════════════════════════════════════════ */}
      <Dialog open={!!selected} onOpenChange={handleModalClose}>
        <DialogContent
          className="max-w-2xl p-0 overflow-hidden rounded-2xl"
          style={{
            background: T.bgCard,
            border:     "1px solid rgba(245,255,64,0.2)",
            boxShadow:  "0 0 80px rgba(245,255,64,0.1), 0 0 28px rgba(0,212,255,0.05)",
            maxHeight:  "90vh",
            overflowY:  "auto",
          }}
        >
          {selected && (
            <motion.div
              initial={{ opacity: 0, rotateY: -16, scale: 0.94 }}
              animate={{ opacity: 1, rotateY: 0,   scale: 1    }}
              transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
              style={{ perspective: "800px" }}
            >
              {/* Screenshot or canvas */}
              <ModalHeader project={selected} />

              {/* Text content */}
              <div style={{ padding: "18px 28px 28px", position: "relative", zIndex: 1 }}>
                <DialogHeader style={{ marginBottom: 14 }}>
                  <DialogTitle style={{
                    fontFamily:           "'Syne',sans-serif", fontWeight: 800,
                    fontSize:             "clamp(1.35rem,3vw,1.85rem)", lineHeight: 1.15,
                    background:           "linear-gradient(120deg,#fff,#f5ff40)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    backgroundClip:       "text",
                  }}>
                    {selected.title}
                  </DialogTitle>
                </DialogHeader>

                <p style={{
                  fontSize: 14, lineHeight: 1.78, color: T.text3, marginBottom: 22,
                }}>
                  {selected.description}
                </p>

                {/* Tech stack */}
                <div style={{ marginBottom: 26 }}>
                  <p style={{
                    fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 10,
                    textTransform: "uppercase", letterSpacing: "0.2em",
                    color: T.text4, marginBottom: 12,
                  }}>
                    Tech Stack
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {selected.techStack.map((t) => (
                      <span key={t} style={{
                        padding:    "6px 14px", borderRadius: 9, fontSize: 12,
                        fontFamily: "'Syne',sans-serif", fontWeight: 600,
                        background: "rgba(245,255,64,0.08)",
                        border:     "1px solid rgba(245,255,64,0.2)",
                        color:      "rgba(245,255,64,0.85)",
                      }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA buttons */}
                <div style={{ display: "flex", gap: 12 }}>
                  <ActionButton
                    href={selected.liveUrl}
                    icon={ExternalLink}
                    label="Live Demo"
                    variant="primary"
                  />
                  <ActionButton
                    href={selected.sourceUrl}
                    icon={Github}
                    label="Source Code"
                    variant="secondary"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ProjectsSection;