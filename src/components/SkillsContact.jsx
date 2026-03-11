// /**
//  * SkillsContact.jsx — Professional Redesign
//  *
//  * Skills layout: clean two-panel
//  * LEFT:  sticky category list with subtle active indicator + overall stats
//  * RIGHT: selected category's skills as clean compact rows
//  *
//  * Design principles:
//  * - Muted borders, not glowing frames on every element
//  * - Typography-led hierarchy
//  * - Neon used sparingly (only active state + progress bars)
//  * - Lots of breathing room within a tight structure
//  */

// import React, { useState, useRef, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import * as LucideIcons from "lucide-react";
// import emailjs from "@emailjs/browser";
// import { skillCategories, personalInfo, socialLinks } from "../data/mock";

// /* ─── EmailJS ─── */
// const EMAILJS_SERVICE_ID  = "YOUR_SERVICE_ID";
// const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
// const EMAILJS_PUBLIC_KEY  = "YOUR_PUBLIC_KEY";

// /* ─── Responsive hook ─── */
// function useWindowWidth() {
//   const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
//   useEffect(() => {
//     const h = () => setW(window.innerWidth);
//     window.addEventListener("resize", h, { passive: true });
//     return () => window.removeEventListener("resize", h);
//   }, []);
//   return w;
// }

// /* ─── Icon helper ─── */
// const SIcon = ({ name, size = 14 }) => {
//   const Icon = LucideIcons[name];
//   return Icon ? <Icon size={size} /> : <LucideIcons.Code size={size} />;
// };

// /* ─── Category accent (single colour per category, used minimally) ─── */
// const ACCENTS = ["#f5ff40", "#00d4ff", "#ff3cac", "#a78bfa", "#34d399"];
// const getAccent = (i) => ACCENTS[i % ACCENTS.length];

// /* ════════════════════════════════════════════════════
//    SKILL ROW — clean, one-line layout
//    icon  |  Name  ·····················  72%  ████░░
// ════════════════════════════════════════════════════ */
// const SkillRow = ({ skill, accent, index, inView }) => {
//   const [hov, setHov] = useState(false);

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={inView ? { opacity: 1 } : {}}
//       transition={{ duration: 0.3, delay: 0.04 * index }}
//       onMouseEnter={() => setHov(true)}
//       onMouseLeave={() => setHov(false)}
//       style={{
//         display:      "grid",
//         gridTemplateColumns: "28px 1fr 36px 90px",
//         alignItems:   "center",
//         gap:          12,
//         padding:      "9px 12px",
//         borderRadius: 8,
//         background:   hov ? "rgba(255,255,255,0.03)" : "transparent",
//         transition:   "background 0.2s",
//         cursor:       "default",
//       }}
//     >
//       {/* Icon */}
//       <div style={{
//         width: 28, height: 28, borderRadius: 7, flexShrink: 0,
//         display: "flex", alignItems: "center", justifyContent: "center",
//         background: hov ? `${accent}15` : "rgba(255,255,255,0.04)",
//         border: `1px solid ${hov ? accent + "35" : "rgba(255,255,255,0.07)"}`,
//         color: hov ? accent : "#5a6480",
//         transition: "all 0.2s",
//       }}>
//         <SIcon name={skill.icon} size={12} />
//       </div>

//       {/* Name */}
//       <span style={{
//         fontFamily:   "'DM Sans', sans-serif",
//         fontWeight:   500,
//         fontSize:     13,
//         color:        hov ? "#e2e8f0" : "#8892b0",
//         transition:   "color 0.2s",
//         whiteSpace:   "nowrap",
//         overflow:     "hidden",
//         textOverflow: "ellipsis",
//       }}>
//         {skill.name}
//       </span>

//       {/* Percentage */}
//       <span style={{
//         fontFamily:  "'Syne', sans-serif",
//         fontWeight:  700,
//         fontSize:    11,
//         color:       hov ? accent : "#3d4560",
//         textAlign:   "right",
//         transition:  "color 0.2s",
//       }}>
//         {skill.level}%
//       </span>

//       {/* Progress bar */}
//       <div style={{ height: 3, borderRadius: 99, background: "rgba(255,255,255,0.06)" }}>
//         <motion.div
//           initial={{ width: 0 }}
//           animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
//           transition={{ duration: 0.9, delay: 0.06 * index, ease: [0.22, 1, 0.36, 1] }}
//           style={{
//             height:       "100%",
//             borderRadius: 99,
//             background:   hov
//               ? `linear-gradient(90deg, ${accent}, ${accent}88)`
//               : `linear-gradient(90deg, ${accent}99, ${accent}44)`,
//             transition:   "background 0.2s",
//           }}
//         />
//       </div>
//     </motion.div>
//   );
// };

// /* ════════════════════════════════════════════════════
//    SKILLS SECTION
// ════════════════════════════════════════════════════ */
// export const SkillsSection = () => {
//   const [activeTab, setActiveTab] = useState(0);
//   const [inView,    setInView]    = useState(false);
//   const sectionRef                = useRef(null);
//   const width                     = useWindowWidth();
//   const isDesktop                 = width >= 900;

//   useEffect(() => {
//     const el = sectionRef.current;
//     if (!el) return;
//     const obs = new IntersectionObserver(
//       ([e]) => { if (e.isIntersecting) setInView(true); },
//       { threshold: 0.08 }
//     );
//     obs.observe(el);
//     return () => obs.disconnect();
//   }, []);

//   /* Reset bars when tab changes */
//   const handleTabChange = (i) => {
//     if (i === activeTab) return;
//     setInView(false);
//     setActiveTab(i);
//     requestAnimationFrame(() => requestAnimationFrame(() => setInView(true)));
//   };

//   const cat    = skillCategories[activeTab];
//   const accent = getAccent(activeTab);

//   return (
//     <section
//       id="skills"
//       ref={sectionRef}
//       style={{
//         position:   "relative",
//         padding:    "clamp(56px,9vw,120px) clamp(20px,5vw,64px)",
//         background: "#040406",
//       }}
//     >
//       {/* Top rule */}
//       <div style={{
//         position: "absolute", top: 0, left: 0, right: 0, height: 1,
//         background: "linear-gradient(90deg, transparent, rgba(245,255,64,0.25), transparent)",
//       }} />

//       <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto" }}>

//         {/* ── Section header ── */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.5 }}
//           style={{ marginBottom: 56 }}
//         >
//           <p style={{
//             fontFamily:    "'Syne', sans-serif",
//             fontSize:      10,
//             fontWeight:    700,
//             letterSpacing: "0.28em",
//             textTransform: "uppercase",
//             color:         "rgba(245,255,64,0.45)",
//             marginBottom:  14,
//           }}>
//             Arsenal
//           </p>
//           <h2 style={{
//             fontFamily:           "'Syne', sans-serif",
//             fontWeight:           800,
//             fontSize:             "clamp(2.2rem, 5vw, 3.6rem)",
//             lineHeight:           1.05,
//             marginBottom:         16,
//             backgroundImage:      "linear-gradient(120deg, #ffffff 0%, #e8eaf0 60%, #8892b0 100%)",
//             WebkitBackgroundClip: "text",
//             WebkitTextFillColor:  "transparent",
//             backgroundClip:       "text",
//           }}>
//             Skills &amp; Tools
//           </h2>
//           {/* Thin accent line — not full neon, just a hint */}
//           <div style={{
//             width: 48, height: 2, borderRadius: 99,
//             background: "linear-gradient(90deg, #f5ff40, #00d4ff)",
//           }} />
//         </motion.div>

//         {/* ── Two-column layout ── */}
//         <div style={{
//           display: isDesktop ? "grid" : "flex",
//           gridTemplateColumns: isDesktop ? "240px 1fr" : undefined,
//           flexDirection: isDesktop ? undefined : "column",
//           gap: isDesktop ? 48 : 32,
//           alignItems: "start",
//         }}>

//           {/* ─── LEFT: Category nav + stats ─── */}
//           <div style={{ position: isDesktop ? "sticky" : "static", top: 88 }}>

//             {/* Category tabs */}
//             <nav style={{ display: "flex", flexDirection: isDesktop ? "column" : "row", gap: 4, flexWrap: "wrap", marginBottom: 32 }}>
//               {skillCategories.map((c, i) => {
//                 const isActive = i === activeTab;
//                 const a = getAccent(i);
//                 return (
//                   <motion.button
//                     key={c.title}
//                     onClick={() => handleTabChange(i)}
//                     whileTap={{ scale: 0.97 }}
//                     style={{
//                       display:       "flex",
//                       alignItems:    "center",
//                       gap:           10,
//                       padding:       "10px 14px",
//                       borderRadius:  10,
//                       textAlign:     "left",
//                       fontFamily:    "'Syne', sans-serif",
//                       fontWeight:    isActive ? 700 : 500,
//                       fontSize:      12,
//                       letterSpacing: "0.06em",
//                       /* Active: subtle filled bg + left border accent */
//                       background:    isActive ? "rgba(255,255,255,0.04)" : "transparent",
//                       border:        isActive
//                         ? `1px solid rgba(255,255,255,0.08)`
//                         : "1px solid transparent",
//                       borderLeft:    isActive ? `3px solid ${a}` : "3px solid transparent",
//                       color:         isActive ? "#e2e8f0" : "#3d4560",
//                       cursor:        "pointer",
//                       transition:    "all 0.22s",
//                       width:         isDesktop ? "100%" : "auto",
//                     }}
//                     onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = "#8892b0"; }}
//                     onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = "#3d4560"; }}
//                   >
//                     {/* Small coloured dot */}
//                     <span style={{
//                       width: 6, height: 6, borderRadius: "50%", flexShrink: 0,
//                       background: isActive ? a : "rgba(255,255,255,0.12)",
//                       boxShadow:  isActive ? `0 0 8px ${a}88` : "none",
//                       transition: "all 0.22s",
//                     }} />
//                     {c.title}
//                     {isActive && (
//                       <span style={{
//                         marginLeft:    "auto",
//                         fontSize:      10,
//                         color:         `${a}99`,
//                         fontWeight:    600,
//                       }}>
//                         {c.skills.length}
//                       </span>
//                     )}
//                   </motion.button>
//                 );
//               })}
//             </nav>

//             {/* ── Overall proficiency mini stats ── */}
//             {isDesktop && (
//               <div style={{
//                 padding:      "18px 20px",
//                 borderRadius: 12,
//                 background:   "rgba(255,255,255,0.02)",
//                 border:       "1px solid rgba(255,255,255,0.06)",
//               }}>
//                 <p style={{
//                   fontFamily:    "'Syne', sans-serif",
//                   fontSize:      9,
//                   fontWeight:    700,
//                   letterSpacing: "0.22em",
//                   textTransform: "uppercase",
//                   color:         "#3d4560",
//                   marginBottom:  16,
//                 }}>
//                   Overall Proficiency
//                 </p>
//                 {[
//                   { label: "Frontend", pct: 88, color: "#f5ff40" },
//                   { label: "Backend",  pct: 84, color: "#00d4ff" },
//                   { label: "AI / ML",  pct: 80, color: "#ff3cac" },
//                 ].map(({ label, pct, color }) => (
//                   <div key={label} style={{ marginBottom: 12 }}>
//                     <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
//                       <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "#8892b0" }}>
//                         {label}
//                       </span>
//                       <span style={{ fontFamily: "'Syne',sans-serif", fontSize: 11, fontWeight: 700, color }}>
//                         {pct}%
//                       </span>
//                     </div>
//                     <div style={{ height: 2, borderRadius: 99, background: "rgba(255,255,255,0.05)" }}>
//                       <motion.div
//                         initial={{ width: 0 }}
//                         animate={inView ? { width: `${pct}%` } : {}}
//                         transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
//                         style={{ height: "100%", borderRadius: 99, background: color }}
//                       />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* ─── RIGHT: Active category skills ─── */}
//           <div style={{ minWidth: 0 }}>
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={activeTab}
//                 initial={{ opacity: 0, y: 12 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -8 }}
//                 transition={{ duration: 0.25 }}
//               >
//                 {/* Category header */}
//                 <div style={{
//                   display:       "flex",
//                   alignItems:    "center",
//                   gap:           12,
//                   paddingBottom: 20,
//                   marginBottom:  8,
//                   borderBottom:  "1px solid rgba(255,255,255,0.05)",
//                 }}>
//                   <div style={{
//                     width: 36, height: 36, borderRadius: 10,
//                     background: `${accent}12`, border: `1px solid ${accent}28`,
//                     display: "flex", alignItems: "center", justifyContent: "center", color: accent,
//                   }}>
//                     <SIcon name={cat.icon || "Code"} size={16} />
//                   </div>
//                   <div>
//                     <h3 style={{
//                       fontFamily:    "'Syne', sans-serif",
//                       fontWeight:    700,
//                       fontSize:      15,
//                       color:         "#e2e8f0",
//                       letterSpacing: "0.02em",
//                     }}>
//                       {cat.title}
//                     </h3>
//                     <p style={{
//                       fontFamily: "'DM Sans', sans-serif",
//                       fontSize:   11,
//                       color:      "#3d4560",
//                       marginTop:  2,
//                     }}>
//                       {cat.skills.length} technologies · avg&nbsp;
//                       <span style={{ color: accent }}>
//                         {Math.round(cat.skills.reduce((s, sk) => s + sk.level, 0) / cat.skills.length)}%
//                       </span>
//                     </p>
//                   </div>
//                 </div>

//                 {/* Skill rows */}
//                 <div style={{ display: "flex", flexDirection: "column" }}>
//                   {cat.skills.map((skill, i) => (
//                     <SkillRow
//                       key={skill.name}
//                       skill={skill}
//                       accent={accent}
//                       index={i}
//                       inView={inView}
//                     />
//                   ))}
//                 </div>
//               </motion.div>
//             </AnimatePresence>
//           </div>
//         </div>

//       </div>
//     </section>
//   );
// };

// /* ════════════════════════════════════════════════════
//    CONTACT SECTION
// ════════════════════════════════════════════════════ */
// const iBase = {
//   display: "block", width: "100%",
//   padding: "11px 14px", borderRadius: 10,
//   background: "rgba(255,255,255,0.02)",
//   border: "1px solid rgba(245,255,64,0.12)",
//   color: "#e2e8f0", outline: "none",
//   fontFamily: "'DM Sans', sans-serif", fontSize: 14,
//   transition: "all 0.25s", boxSizing: "border-box",
// };
// const onFocus = (e) => {
//   e.target.style.borderColor = "rgba(245,255,64,0.45)";
//   e.target.style.background  = "rgba(245,255,64,0.03)";
//   e.target.style.boxShadow   = "0 0 0 3px rgba(245,255,64,0.05)";
// };
// const onBlur = (e) => {
//   e.target.style.borderColor = "rgba(245,255,64,0.12)";
//   e.target.style.background  = "rgba(255,255,255,0.02)";
//   e.target.style.boxShadow   = "none";
// };

// export const ContactSection = () => {
//   const [form,   setForm]   = useState({ name: "", email: "", subject: "", message: "" });
//   const [status, setStatus] = useState("idle");
//   const [errMsg, setErrMsg] = useState("");
//   const width               = useWindowWidth();
//   const isDesktop           = width >= 900;

//   const onChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     if (status !== "idle") return;
//     setStatus("loading"); setErrMsg("");
//     try {
//       await emailjs.send(
//         EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID,
//         {
//           from_name: form.name, from_email: form.email,
//           subject: form.subject || "Portfolio Contact",
//           message: form.message,
//           to_email: personalInfo.email, reply_to: form.email,
//         },
//         EMAILJS_PUBLIC_KEY
//       );
//       setStatus("success");
//       setForm({ name: "", email: "", subject: "", message: "" });
//       setTimeout(() => setStatus("idle"), 5000);
//     } catch {
//       setErrMsg("Something went wrong. Please email " + personalInfo.email + " directly.");
//       setStatus("error");
//       setTimeout(() => setStatus("idle"), 5000);
//     }
//   };

//   return (
//     <section id="contact" style={{
//       position: "relative",
//       padding: "clamp(56px,9vw,120px) clamp(20px,5vw,64px)",
//       background: "#040406",
//     }}>
//       <div style={{
//         position: "absolute", top: 0, left: 0, right: 0, height: 1,
//         background: "linear-gradient(90deg,transparent,rgba(245,255,64,0.25),transparent)",
//       }} />
//       <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto" }}>
//         <div style={{
//           display: "grid",
//           gridTemplateColumns: isDesktop ? "1fr 1fr" : "1fr",
//           gap: isDesktop ? 64 : 48,
//           alignItems: "start",
//         }}>

//           {/* LEFT */}
//           <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }} transition={{ duration: 0.5 }}>
//             <p style={{
//               fontFamily: "'Syne',sans-serif", fontSize: 10, fontWeight: 700,
//               letterSpacing: "0.28em", textTransform: "uppercase",
//               color: "rgba(245,255,64,0.45)", marginBottom: 14,
//             }}>Contact</p>
//             <h2 style={{
//               fontFamily: "'Syne',sans-serif", fontWeight: 800,
//               fontSize: "clamp(2.2rem,5vw,3.6rem)", lineHeight: 1.05, marginBottom: 16,
//               backgroundImage: "linear-gradient(120deg,#fff 0%,#e8eaf0 60%,#8892b0 100%)",
//               WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
//             }}>
//               Let's Work Together
//             </h2>
//             <div style={{ width: 48, height: 2, borderRadius: 99, background: "linear-gradient(90deg,#f5ff40,#00d4ff)", marginBottom: 28 }} />

//             <p style={{ fontSize: 14, lineHeight: 1.82, color: "#8892b0", marginBottom: 32, maxWidth: 380 }}>
//               Have a project, internship opportunity, or freelance work? I'm open to ideas and collaborations.
//             </p>

//             <div style={{
//               display: "inline-flex", alignItems: "center", gap: 10,
//               padding: "9px 16px", borderRadius: 10, marginBottom: 36,
//               background: "rgba(74,222,128,0.04)", border: "1px solid rgba(74,222,128,0.18)",
//             }}>
//               <span style={{
//                 width: 6, height: 6, borderRadius: "50%", flexShrink: 0,
//                 background: "#4ade80", animation: "dotPulse 1.8s ease-in-out infinite",
//               }} />
//               <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "#4ade80" }}>
//                 Available for opportunities
//               </span>
//             </div>

//             <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
//               {[
//                 { icon: "Mail",     href: `mailto:${personalInfo.email}`, label: personalInfo.email },
//                 { icon: "Github",   href: personalInfo.github,             label: "github.com/Maayank18" },
//                 { icon: "Linkedin", href: personalInfo.linkedin,            label: "linkedin.com/in/mayank-garg" },
//               ].map(({ icon, href, label }) => {
//                 const Icon = LucideIcons[icon];
//                 return (
//                   <motion.a key={icon} href={href} target="_blank" rel="noopener noreferrer"
//                     whileHover={{ x: 4 }}
//                     style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}
//                   >
//                     <div style={{
//                       width: 38, height: 38, borderRadius: 10, flexShrink: 0,
//                       display: "flex", alignItems: "center", justifyContent: "center",
//                       background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
//                       color: "#5a6480", transition: "all 0.22s",
//                     }}
//                       onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(245,255,64,0.35)"; e.currentTarget.style.color = "#f5ff40"; e.currentTarget.style.background = "rgba(245,255,64,0.06)"; }}
//                       onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.color = "#5a6480"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
//                     >
//                       {Icon && <Icon size={15} />}
//                     </div>
//                     <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "#8892b0" }}>{label}</span>
//                   </motion.a>
//                 );
//               })}
//             </div>
//           </motion.div>

//           {/* RIGHT — form */}
//           <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
//             <form onSubmit={onSubmit} style={{
//               padding: "28px 28px 24px", borderRadius: 16,
//               background: "rgba(8,8,13,0.7)", border: "1px solid rgba(255,255,255,0.07)",
//             }}>
//               <div style={{
//                 display: "grid",
//                 gridTemplateColumns: width >= 480 ? "1fr 1fr" : "1fr",
//                 gap: 14, marginBottom: 14,
//               }}>
//                 {[
//                   { name: "name",  label: "Name",  ph: "Your name",  type: "text"  },
//                   { name: "email", label: "Email", ph: "your@email.com", type: "email" },
//                 ].map((f) => (
//                   <div key={f.name}>
//                     <label style={{
//                       display: "block", fontFamily: "'Syne',sans-serif", fontWeight: 600,
//                       fontSize: 10, textTransform: "uppercase", letterSpacing: "0.16em",
//                       color: "rgba(245,255,64,0.4)", marginBottom: 7,
//                     }}>{f.label}</label>
//                     <input name={f.name} type={f.type} value={form[f.name]}
//                       onChange={onChange} onFocus={onFocus} onBlur={onBlur}
//                       required placeholder={f.ph} style={iBase} />
//                   </div>
//                 ))}
//               </div>

//               <div style={{ marginBottom: 14 }}>
//                 <label style={{
//                   display: "block", fontFamily: "'Syne',sans-serif", fontWeight: 600,
//                   fontSize: 10, textTransform: "uppercase", letterSpacing: "0.16em",
//                   color: "rgba(245,255,64,0.4)", marginBottom: 7,
//                 }}>Subject</label>
//                 <input name="subject" value={form.subject} onChange={onChange}
//                   onFocus={onFocus} onBlur={onBlur}
//                   placeholder="Internship / Freelance / Collaboration" style={iBase} />
//               </div>

//               <div style={{ marginBottom: 22 }}>
//                 <label style={{
//                   display: "block", fontFamily: "'Syne',sans-serif", fontWeight: 600,
//                   fontSize: 10, textTransform: "uppercase", letterSpacing: "0.16em",
//                   color: "rgba(245,255,64,0.4)", marginBottom: 7,
//                 }}>Message</label>
//                 <textarea name="message" value={form.message} onChange={onChange}
//                   onFocus={onFocus} onBlur={onBlur} required rows={5}
//                   placeholder="Tell me about your project or opportunity..."
//                   style={{ ...iBase, resize: "none" }} />
//               </div>

//               {status === "error" && (
//                 <p style={{ fontSize: 12, color: "#f87171", marginBottom: 12, fontFamily: "'DM Sans',sans-serif" }}>
//                   {errMsg}
//                 </p>
//               )}

//               <motion.button type="submit" disabled={status !== "idle"}
//                 whileHover={status === "idle" ? { y: -1 } : {}}
//                 whileTap={status === "idle" ? { scale: 0.98 } : {}}
//                 style={{
//                   width: "100%", padding: "13px 24px", borderRadius: 10,
//                   fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 12,
//                   textTransform: "uppercase", letterSpacing: "0.12em",
//                   background: status === "success" ? "#166534"
//                     : status === "error" ? "#7f1d1d"
//                     : "linear-gradient(135deg,#f5ff40,#00d4ff)",
//                   color: (status === "success" || status === "error") ? "#fff" : "#000",
//                   border: "none", cursor: status === "idle" ? "pointer" : "default",
//                   boxShadow: status === "idle" ? "0 2px 20px rgba(245,255,64,0.18)" : "none",
//                   display: "flex", alignItems: "center", justifyContent: "center", gap: 9,
//                   transition: "all 0.3s",
//                 }}>
//                 <AnimatePresence mode="wait">
//                   {status === "loading" && (
//                     <motion.span key="l" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//                       style={{ display: "flex", alignItems: "center", gap: 8 }}>
//                       <span style={{
//                         width: 14, height: 14, borderRadius: "50%",
//                         border: "2px solid rgba(0,0,0,0.2)", borderTopColor: "#000",
//                         animation: "spin 0.9s linear infinite",
//                       }} />
//                       Sending…
//                     </motion.span>
//                   )}
//                   {status === "success" && (
//                     <motion.span key="s" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
//                       style={{ display: "flex", alignItems: "center", gap: 8 }}>
//                       <LucideIcons.CheckCircle size={15} /> Message sent!
//                     </motion.span>
//                   )}
//                   {(status === "idle" || status === "error") && (
//                     <motion.span key="i" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//                       style={{ display: "flex", alignItems: "center", gap: 8 }}>
//                       <LucideIcons.Send size={13} /> Send Message
//                     </motion.span>
//                   )}
//                 </AnimatePresence>
//               </motion.button>

//               <p style={{ textAlign: "center", fontSize: 11, marginTop: 14, fontFamily: "'DM Sans',sans-serif", color: "#3d4560" }}>
//                 Sent directly to&nbsp;
//                 <span style={{ color: "rgba(245,255,64,0.4)" }}>{personalInfo.email}</span>
//               </p>
//             </form>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };

// /* ════════════════════════════════════════════════════
//    FOOTER
// ════════════════════════════════════════════════════ */
// export const Footer = () => (
//   <footer style={{
//     position: "relative", padding: "28px 0",
//     borderTop: "1px solid rgba(255,255,255,0.05)",
//     background: "#020204",
//   }}>
//     <div style={{
//       maxWidth: 1280, margin: "0 auto",
//       padding: "0 clamp(20px,5vw,64px)",
//       display: "flex", flexWrap: "wrap",
//       alignItems: "center", justifyContent: "space-between", gap: 16,
//     }}>
//       <div>
//         <div style={{
//           fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 13,
//           letterSpacing: "0.14em",
//           backgroundImage: "linear-gradient(90deg,#f5ff40,#00d4ff)",
//           WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
//         }}>
//           {personalInfo.name.toUpperCase()}
//         </div>
//         <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "#3d4560", marginTop: 2 }}>
//           Full Stack · AI/GenAI · Open to Opportunities
//         </div>
//       </div>

//       <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "#3d4560" }}>
//         © {new Date().getFullYear()} {personalInfo.name}
//       </p>

//       <div style={{ display: "flex", gap: 8 }}>
//         {socialLinks.map((link) => {
//           const Icon = LucideIcons[link.icon];
//           return (
//             <motion.a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer"
//               whileHover={{ y: -2 }} aria-label={link.name}
//               style={{
//                 width: 32, height: 32, borderRadius: 8,
//                 display: "flex", alignItems: "center", justifyContent: "center",
//                 background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
//                 color: "#3d4560", textDecoration: "none", transition: "all 0.22s",
//               }}
//               onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(245,255,64,0.3)"; e.currentTarget.style.color = "#f5ff40"; }}
//               onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.color = "#3d4560"; }}
//             >
//               {Icon && <Icon size={12} />}
//             </motion.a>
//           );
//         })}
//       </div>
//     </div>
//   </footer>
// );


















































































/**
 * SkillsContact.jsx — Professional Redesign (EmailJS updated)
 *
 * NOTE:
 * - Put your EmailJS IDs in a .env (recommended) or replace the defaults below.
 * - This file uses @emailjs/browser and calls emailjs.init() when ContactSection mounts.
 */

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as LucideIcons from "lucide-react";
import emailjs from "@emailjs/browser";
import { skillCategories, personalInfo, socialLinks } from "../data/mock";

/* ─── EmailJS — prefer .env values, fallback to placeholders ───
   Add to .env.local (see step 2 below):
   REACT_APP_EMAILJS_SERVICE_ID=service_xxxxxxx
   REACT_APP_EMAILJS_TEMPLATE_ID=template_xxxxxxx
   REACT_APP_EMAILJS_PUBLIC_KEY=aBcDeFgHiJkLmNoPqR
*/
const EMAILJS_SERVICE_ID  = process.env.REACT_APP_EMAILJS_SERVICE_ID  || "service_xxxxxxx";
const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || "template_xxxxxxx";
const EMAILJS_PUBLIC_KEY  = process.env.REACT_APP_EMAILJS_PUBLIC_KEY  || "aBcDeFgHiJkLmNoPqR";

/* ─── Responsive hook ─── */
function useWindowWidth() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener("resize", h, { passive: true });
    return () => window.removeEventListener("resize", h);
  }, []);
  return w;
}

/* ─── Icon helper ─── */
const SIcon = ({ name, size = 14 }) => {
  const Icon = LucideIcons[name];
  return Icon ? <Icon size={size} /> : <LucideIcons.Code size={size} />;
};

/* ─── Category accent ─── */
const ACCENTS = ["#f5ff40", "#00d4ff", "#ff3cac", "#a78bfa", "#34d399"];
const getAccent = (i) => ACCENTS[i % ACCENTS.length];

/* SkillRow component (unchanged) */
const SkillRow = ({ skill, accent, index, inView }) => {
  const [hov, setHov] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.3, delay: 0.04 * index }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display:      "grid",
        gridTemplateColumns: "28px 1fr 36px 90px",
        alignItems:   "center",
        gap:          12,
        padding:      "9px 12px",
        borderRadius: 8,
        background:   hov ? "rgba(255,255,255,0.03)" : "transparent",
        transition:   "background 0.2s",
        cursor:       "default",
      }}
    >
      <div style={{
        width: 28, height: 28, borderRadius: 7, flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: hov ? `${accent}15` : "rgba(255,255,255,0.04)",
        border: `1px solid ${hov ? accent + "35" : "rgba(255,255,255,0.07)"}`,
        color: hov ? accent : "#5a6480",
        transition: "all 0.2s",
      }}>
        <SIcon name={skill.icon} size={12} />
      </div>

      <span style={{
        fontFamily:   "'DM Sans', sans-serif",
        fontWeight:   500,
        fontSize:     13,
        color:        hov ? "#e2e8f0" : "#8892b0",
        transition:   "color 0.2s",
        whiteSpace:   "nowrap",
        overflow:     "hidden",
        textOverflow: "ellipsis",
      }}>
        {skill.name}
      </span>

      <span style={{
        fontFamily:  "'Syne', sans-serif",
        fontWeight:  700,
        fontSize:    11,
        color:       hov ? accent : "#3d4560",
        textAlign:   "right",
        transition:  "color 0.2s",
      }}>
        {skill.level}%
      </span>

      <div style={{ height: 3, borderRadius: 99, background: "rgba(255,255,255,0.06)" }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 0.9, delay: 0.06 * index, ease: [0.22, 1, 0.36, 1] }}
          style={{
            height:       "100%",
            borderRadius: 99,
            background:   hov
              ? `linear-gradient(90deg, ${accent}, ${accent}88)`
              : `linear-gradient(90deg, ${accent}99, ${accent}44)`,
            transition:   "background 0.2s",
          }}
        />
      </div>
    </motion.div>
  );
};

/* SkillsSection (unchanged) */
export const SkillsSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [inView,    setInView]    = useState(false);
  const sectionRef                = useRef(null);
  const width                     = useWindowWidth();
  const isDesktop                 = width >= 900;

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleTabChange = (i) => {
    if (i === activeTab) return;
    setInView(false);
    setActiveTab(i);
    requestAnimationFrame(() => requestAnimationFrame(() => setInView(true)));
  };

  const cat    = skillCategories[activeTab];
  const accent = getAccent(activeTab);

  return (
    <section
      id="skills"
      ref={sectionRef}
      style={{
        position:   "relative",
        padding:    "clamp(56px,9vw,120px) clamp(20px,5vw,64px)",
        background: "#040406",
      }}
    >
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg, transparent, rgba(245,255,64,0.25), transparent)",
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 56 }}
        >
          <p style={{
            fontFamily:    "'Syne', sans-serif",
            fontSize:      10,
            fontWeight:    700,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color:         "rgba(245,255,64,0.45)",
            marginBottom:  14,
          }}>
            Arsenal
          </p>
          <h2 style={{
            fontFamily:           "'Syne', sans-serif",
            fontWeight:           800,
            fontSize:             "clamp(2.2rem, 5vw, 3.6rem)",
            lineHeight:           1.05,
            marginBottom:         16,
            backgroundImage:      "linear-gradient(120deg, #ffffff 0%, #e8eaf0 60%, #8892b0 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor:  "transparent",
            backgroundClip:       "text",
          }}>
            Skills &amp; Tools
          </h2>
          <div style={{
            width: 48, height: 2, borderRadius: 99,
            background: "linear-gradient(90deg, #f5ff40, #00d4ff)",
          }} />
        </motion.div>

        <div style={{
          display: isDesktop ? "grid" : "flex",
          gridTemplateColumns: isDesktop ? "240px 1fr" : undefined,
          flexDirection: isDesktop ? undefined : "column",
          gap: isDesktop ? 48 : 32,
          alignItems: "start",
        }}>

          <div style={{ position: isDesktop ? "sticky" : "static", top: 88 }}>
            <nav style={{ display: "flex", flexDirection: isDesktop ? "column" : "row", gap: 4, flexWrap: "wrap", marginBottom: 32 }}>
              {skillCategories.map((c, i) => {
                const isActive = i === activeTab;
                const a = getAccent(i);
                return (
                  <motion.button
                    key={c.title}
                    onClick={() => handleTabChange(i)}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      display:       "flex",
                      alignItems:    "center",
                      gap:           10,
                      padding:       "10px 14px",
                      borderRadius:  10,
                      textAlign:     "left",
                      fontFamily:    "'Syne', sans-serif",
                      fontWeight:    isActive ? 700 : 500,
                      fontSize:      12,
                      letterSpacing: "0.06em",
                      background:    isActive ? "rgba(255,255,255,0.04)" : "transparent",
                      border:        isActive ? `1px solid rgba(255,255,255,0.08)` : "1px solid transparent",
                      borderLeft:    isActive ? `3px solid ${a}` : "3px solid transparent",
                      color:         isActive ? "#e2e8f0" : "#3d4560",
                      cursor:        "pointer",
                      transition:    "all 0.22s",
                      width:         isDesktop ? "100%" : "auto",
                    }}
                    onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = "#8892b0"; }}
                    onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = "#3d4560"; }}
                  >
                    <span style={{
                      width: 6, height: 6, borderRadius: "50%", flexShrink: 0,
                      background: isActive ? a : "rgba(255,255,255,0.12)",
                      boxShadow:  isActive ? `0 0 8px ${a}88` : "none",
                      transition: "all 0.22s",
                    }} />
                    {c.title}
                    {isActive && (
                      <span style={{
                        marginLeft:    "auto",
                        fontSize:      10,
                        color:         `${a}99`,
                        fontWeight:    600,
                      }}>
                        {c.skills.length}
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </nav>

            {isDesktop && (
              <div style={{
                padding:      "18px 20px",
                borderRadius: 12,
                background:   "rgba(255,255,255,0.02)",
                border:       "1px solid rgba(255,255,255,0.06)",
              }}>
                <p style={{
                  fontFamily:    "'Syne', sans-serif",
                  fontSize:      9,
                  fontWeight:    700,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color:         "#3d4560",
                  marginBottom:  16,
                }}>
                  Overall Proficiency
                </p>
                {[
                  { label: "Frontend", pct: 88, color: "#f5ff40" },
                  { label: "Backend",  pct: 84, color: "#00d4ff" },
                  { label: "AI / ML",  pct: 80, color: "#ff3cac" },
                ].map(({ label, pct, color }) => (
                  <div key={label} style={{ marginBottom: 12 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                      <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "#8892b0" }}>
                        {label}
                      </span>
                      <span style={{ fontFamily: "'Syne',sans-serif", fontSize: 11, fontWeight: 700, color }}>
                        {pct}%
                      </span>
                    </div>
                    <div style={{ height: 2, borderRadius: 99, background: "rgba(255,255,255,0.05)" }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${pct}%` } : {}}
                        transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        style={{ height: "100%", borderRadius: 99, background: color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ minWidth: 0 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <div style={{
                  display:       "flex",
                  alignItems:    "center",
                  gap:           12,
                  paddingBottom: 20,
                  marginBottom:  8,
                  borderBottom:  "1px solid rgba(255,255,255,0.05)",
                }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: `${accent}12`, border: `1px solid ${accent}28`,
                    display: "flex", alignItems: "center", justifyContent: "center", color: accent,
                  }}>
                    <SIcon name={cat.icon || "Code"} size={16} />
                  </div>
                  <div>
                    <h3 style={{
                      fontFamily:    "'Syne', sans-serif",
                      fontWeight:    700,
                      fontSize:      15,
                      color:         "#e2e8f0",
                      letterSpacing: "0.02em",
                    }}>
                      {cat.title}
                    </h3>
                    <p style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize:   11,
                      color:      "#3d4560",
                      marginTop:  2,
                    }}>
                      {cat.skills.length} technologies · avg&nbsp;
                      <span style={{ color: accent }}>
                        {Math.round(cat.skills.reduce((s, sk) => s + sk.level, 0) / cat.skills.length)}%
                      </span>
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  {cat.skills.map((skill, i) => (
                    <SkillRow
                      key={skill.name}
                      skill={skill}
                      accent={accent}
                      index={i}
                      inView={inView}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

/* CONTACT SECTION — updated to init EmailJS and improved error logging */
const iBase = {
  display: "block", width: "100%",
  padding: "11px 14px", borderRadius: 10,
  background: "rgba(255,255,255,0.02)",
  border: "1px solid rgba(245,255,64,0.12)",
  color: "#e2e8f0", outline: "none",
  fontFamily: "'DM Sans', sans-serif", fontSize: 14,
  transition: "all 0.25s", boxSizing: "border-box",
};
const onFocus = (e) => {
  e.target.style.borderColor = "rgba(245,255,64,0.45)";
  e.target.style.background  = "rgba(245,255,64,0.03)";
  e.target.style.boxShadow   = "0 0 0 3px rgba(245,255,64,0.05)";
};
const onBlur = (e) => {
  e.target.style.borderColor = "rgba(245,255,64,0.12)";
  e.target.style.background  = "rgba(255,255,255,0.02)";
  e.target.style.boxShadow   = "none";
};

export const ContactSection = () => {
  const [form,   setForm]   = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [errMsg, setErrMsg] = useState("");
  const width               = useWindowWidth();
  const isDesktop           = width >= 900;

  // Initialize EmailJS once when contact section mounts
  useEffect(() => {
    try {
      if (EMAILJS_PUBLIC_KEY && EMAILJS_PUBLIC_KEY !== "aBcDeFgHiJkLmNoPqR") {
        emailjs.init(EMAILJS_PUBLIC_KEY);
        console.info("EmailJS initialized with public key (from env).");
      } else {
        // If running with placeholder keys, we still call init to avoid runtime errors.
        emailjs.init(EMAILJS_PUBLIC_KEY);
        console.warn("EmailJS public key is placeholder — replace with your real public key.");
      }
    } catch (err) {
      console.error("Failed initializing EmailJS:", err);
    }
  }, []);

  const onChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status !== "idle") return;
    setStatus("loading");
    setErrMsg("");

    // Basic client-side validation
    if (!form.name || !form.email || !form.message) {
      setErrMsg("Please fill Name, Email and Message.");
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
      return;
    }
    // Simple email pattern check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setErrMsg("Please enter a valid email address.");
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
      return;
    }

    try {
      // Using emailjs.send(serviceID, templateID, templateParams, publicKey)
      const templateParams = {
        from_name:  form.name,
        from_email: form.email,
        subject:    form.subject || "Portfolio Contact",
        message:    form.message,
        // optional: force to_email if your template expects it (your template's "To Email" can be fixed inside EmailJS)
        to_email: personalInfo.email,
        reply_to: form.email,
      };

      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      console.info("EmailJS send success:", result);
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      // show friendly message + log details for debugging
      console.error("EmailJS send error:", err);
      const hint = err?.text || err?.statusText || err?.message || JSON.stringify(err);
      setErrMsg("Something went wrong. Please email " + personalInfo.email + " directly. (" + hint + ")");
      setStatus("error");
      setTimeout(() => setStatus("idle"), 6000);
    }
  };

  return (
    <section id="contact" style={{
      position: "relative",
      padding: "clamp(56px,9vw,120px) clamp(20px,5vw,64px)",
      background: "#040406",
    }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg,transparent,rgba(245,255,64,0.25),transparent)",
      }} />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: isDesktop ? "1fr 1fr" : "1fr",
          gap: isDesktop ? 64 : 48,
          alignItems: "start",
        }}>

          {/* LEFT */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <p style={{
              fontFamily: "'Syne',sans-serif", fontSize: 10, fontWeight: 700,
              letterSpacing: "0.28em", textTransform: "uppercase",
              color: "rgba(245,255,64,0.45)", marginBottom: 14,
            }}>Contact</p>
            <h2 style={{
              fontFamily: "'Syne',sans-serif", fontWeight: 800,
              fontSize: "clamp(2.2rem,5vw,3.6rem)", lineHeight: 1.05, marginBottom: 16,
              backgroundImage: "linear-gradient(120deg,#fff 0%,#e8eaf0 60%,#8892b0 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              Let's Work Together
            </h2>
            <div style={{ width: 48, height: 2, borderRadius: 99, background: "linear-gradient(90deg,#f5ff40,#00d4ff)", marginBottom: 28 }} />

            <p style={{ fontSize: 14, lineHeight: 1.82, color: "#8892b0", marginBottom: 32, maxWidth: 380 }}>
              Have a project, internship opportunity, or freelance work? I'm open to ideas and collaborations.
            </p>

            <div style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "9px 16px", borderRadius: 10, marginBottom: 36,
              background: "rgba(74,222,128,0.04)", border: "1px solid rgba(74,222,128,0.18)",
            }}>
              <span style={{
                width: 6, height: 6, borderRadius: "50%", flexShrink: 0,
                background: "#4ade80", animation: "dotPulse 1.8s ease-in-out infinite",
              }} />
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "#4ade80" }}>
                Available for opportunities
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { icon: "Mail",     href: `mailto:${personalInfo.email}`, label: personalInfo.email },
                { icon: "Github",   href: personalInfo.github,             label: "github.com/Maayank18" },
                { icon: "Linkedin", href: personalInfo.linkedin,            label: "linkedin.com/in/mayank-garg" },
              ].map(({ icon, href, label }) => {
                const Icon = LucideIcons[icon];
                return (
                  <motion.a key={icon} href={href} target="_blank" rel="noopener noreferrer"
                    whileHover={{ x: 4 }}
                    style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}
                  >
                    <div style={{
                      width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
                      color: "#5a6480", transition: "all 0.22s",
                    }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(245,255,64,0.35)"; e.currentTarget.style.color = "#f5ff40"; e.currentTarget.style.background = "rgba(245,255,64,0.06)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.color = "#5a6480"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
                    >
                      {Icon && <Icon size={15} />}
                    </div>
                    <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "#8892b0" }}>{label}</span>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* RIGHT — form */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
            <form onSubmit={onSubmit} style={{
              padding: "28px 28px 24px", borderRadius: 16,
              background: "rgba(8,8,13,0.7)", border: "1px solid rgba(255,255,255,0.07)",
            }}>
              <div style={{
                display: "grid",
                gridTemplateColumns: width >= 480 ? "1fr 1fr" : "1fr",
                gap: 14, marginBottom: 14,
              }}>
                {[
                  { name: "name",  label: "Name",  ph: "Your name",  type: "text"  },
                  { name: "email", label: "Email", ph: "your@email.com", type: "email" },
                ].map((f) => (
                  <div key={f.name}>
                    <label style={{
                      display: "block", fontFamily: "'Syne',sans-serif", fontWeight: 600,
                      fontSize: 10, textTransform: "uppercase", letterSpacing: "0.16em",
                      color: "rgba(245,255,64,0.4)", marginBottom: 7,
                    }}>{f.label}</label>
                    <input name={f.name} type={f.type} value={form[f.name]}
                      onChange={onChange} onFocus={onFocus} onBlur={onBlur}
                      required placeholder={f.ph} style={iBase} />
                  </div>
                ))}
              </div>

              <div style={{ marginBottom: 14 }}>
                <label style={{
                  display: "block", fontFamily: "'Syne',sans-serif", fontWeight: 600,
                  fontSize: 10, textTransform: "uppercase", letterSpacing: "0.16em",
                  color: "rgba(245,255,64,0.4)", marginBottom: 7,
                }}>Subject</label>
                <input name="subject" value={form.subject} onChange={onChange}
                  onFocus={onFocus} onBlur={onBlur}
                  placeholder="Internship / Freelance / Collaboration" style={iBase} />
              </div>

              <div style={{ marginBottom: 22 }}>
                <label style={{
                  display: "block", fontFamily: "'Syne',sans-serif", fontWeight: 600,
                  fontSize: 10, textTransform: "uppercase", letterSpacing: "0.16em",
                  color: "rgba(245,255,64,0.4)", marginBottom: 7,
                }}>Message</label>
                <textarea name="message" value={form.message} onChange={onChange}
                  onFocus={onFocus} onBlur={onBlur} required rows={5}
                  placeholder="Tell me about your project or opportunity..."
                  style={{ ...iBase, resize: "none" }} />
              </div>

              {status === "error" && (
                <p style={{ fontSize: 12, color: "#f87171", marginBottom: 12, fontFamily: "'DM Sans',sans-serif" }}>
                  {errMsg}
                </p>
              )}

              <motion.button type="submit" disabled={status !== "idle"}
                whileHover={status === "idle" ? { y: -1 } : {}}
                whileTap={status === "idle" ? { scale: 0.98 } : {}}
                style={{
                  width: "100%", padding: "13px 24px", borderRadius: 10,
                  fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 12,
                  textTransform: "uppercase", letterSpacing: "0.12em",
                  background: status === "success" ? "#166534"
                    : status === "error" ? "#7f1d1d"
                    : "linear-gradient(135deg,#f5ff40,#00d4ff)",
                  color: (status === "success" || status === "error") ? "#fff" : "#000",
                  border: "none", cursor: status === "idle" ? "pointer" : "default",
                  boxShadow: status === "idle" ? "0 2px 20px rgba(245,255,64,0.18)" : "none",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 9,
                  transition: "all 0.3s",
                }}>
                <AnimatePresence mode="wait">
                  {status === "loading" && (
                    <motion.span key="l" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{
                        width: 14, height: 14, borderRadius: "50%",
                        border: "2px solid rgba(0,0,0,0.2)", borderTopColor: "#000",
                        animation: "spin 0.9s linear infinite",
                      }} />
                      Sending…
                    </motion.span>
                  )}
                  {status === "success" && (
                    <motion.span key="s" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                      style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <LucideIcons.CheckCircle size={15} /> Message sent!
                    </motion.span>
                  )}
                  {(status === "idle" || status === "error") && (
                    <motion.span key="i" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <LucideIcons.Send size={13} /> Send Message
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              <p style={{ textAlign: "center", fontSize: 11, marginTop: 14, fontFamily: "'DM Sans',sans-serif", color: "#3d4560" }}>
                Sent directly to&nbsp;
                <span style={{ color: "rgba(245,255,64,0.4)" }}>{personalInfo.email}</span>
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* FOOTER (unchanged) */
export const Footer = () => (
  <footer style={{
    position: "relative", padding: "28px 0",
    borderTop: "1px solid rgba(255,255,255,0.05)",
    background: "#020204",
  }}>
    <div style={{
      maxWidth: 1280, margin: "0 auto",
      padding: "0 clamp(20px,5vw,64px)",
      display: "flex", flexWrap: "wrap",
      alignItems: "center", justifyContent: "space-between", gap: 16,
    }}>
      <div>
        <div style={{
          fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 13,
          letterSpacing: "0.14em",
          backgroundImage: "linear-gradient(90deg,#f5ff40,#00d4ff)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
        }}>
          {personalInfo.name.toUpperCase()}
        </div>
        <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "#3d4560", marginTop: 2 }}>
          Full Stack · AI/GenAI · Open to Opportunities
        </div>
      </div>

      <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "#3d4560" }}>
        © {new Date().getFullYear()} {personalInfo.name}
      </p>

      <div style={{ display: "flex", gap: 8 }}>
        {socialLinks.map((link) => {
          const Icon = LucideIcons[link.icon];
          return (
            <motion.a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer"
              whileHover={{ y: -2 }} aria-label={link.name}
              style={{
                width: 32, height: 32, borderRadius: 8,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
                color: "#3d4560", textDecoration: "none", transition: "all 0.22s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(245,255,64,0.3)"; e.currentTarget.style.color = "#f5ff40"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.color = "#3d4560"; }}
            >
              {Icon && <Icon size={12} />}
            </motion.a>
          );
        })}
      </div>
    </div>
  </footer>
);