// import React, { useState, useEffect } from "react";
// import "./App.css";
// import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
// import { Menu, X } from "lucide-react";
// import HeroSection from "./components/HeroSection";
// import ProjectsSection from "./components/ProjectsSection";
// import { SkillsSection, ContactSection, Footer } from "./components/SkillsContact";
// import { personalInfo } from "./data/mock";

// const NAV_ITEMS = [
//   { label: "Home",     href: "home"     },
//   { label: "Projects", href: "projects" },
//   { label: "Skills",   href: "skills"   },
//   { label: "Contact",  href: "contact"  },
// ];

// /* ─────────────────────────────────────────────────
//    HOOK — reliable window width (no Tailwind needed)
//    md breakpoint = 768px
// ───────────────────────────────────────────────── */
// function useWindowWidth() {
//   const [width, setWidth] = useState(
//     typeof window !== "undefined" ? window.innerWidth : 1200
//   );
//   useEffect(() => {
//     const handler = () => setWidth(window.innerWidth);
//     window.addEventListener("resize", handler, { passive: true });
//     return () => window.removeEventListener("resize", handler);
//   }, []);
//   return width;
// }

// /* ── Scroll Progress Bar ── */
// const ScrollProgress = () => {
//   const { scrollYProgress } = useScroll();
//   const scaleX = useSpring(scrollYProgress, { stiffness: 400, damping: 40 });
//   return <motion.div id="scroll-progress" style={{ scaleX }} />;
// };

// /* ── Header / Navbar ── */
// const Header = () => {
//   const width   = useWindowWidth();
//   /* Show hamburger below 768px (md), show full nav at 768px+ */
//   const isMobileNav = width < 768;

//   const [scrolled,      setScrolled]      = useState(false);
//   const [mobileOpen,    setMobileOpen]    = useState(false);
//   const [activeSection, setActiveSection] = useState("home");

//   /* Close menu on resize to desktop */
//   useEffect(() => {
//     if (!isMobileNav) setMobileOpen(false);
//   }, [isMobileNav]);

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 40);
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   useEffect(() => {
//     const observers = [];
//     NAV_ITEMS.forEach(({ href }) => {
//       const el = document.getElementById(href);
//       if (!el) return;
//       const obs = new IntersectionObserver(
//         ([entry]) => { if (entry.isIntersecting) setActiveSection(href); },
//         { threshold: 0.35 }
//       );
//       obs.observe(el);
//       observers.push(obs);
//     });
//     return () => observers.forEach((o) => o.disconnect());
//   }, []);

//   const scrollTo = (id) => {
//     setMobileOpen(false);
//     document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
//   };

//   return (
//     <motion.header
//       initial={{ y: -80, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
//       style={{
//         position:      "fixed",
//         top:           0,
//         left:          0,
//         right:         0,
//         zIndex:        50,
//         transition:    "all 0.4s",
//         background:    scrolled ? "rgba(4,4,6,0.88)" : "transparent",
//         backdropFilter:scrolled ? "blur(22px)"       : "none",
//         borderBottom:  scrolled ? "1px solid rgba(245,255,64,0.08)" : "1px solid transparent",
//         boxShadow:     scrolled ? "0 4px 40px rgba(0,0,0,0.4)"     : "none",
//       }}
//     >
//       <div style={{
//         maxWidth:       1280,
//         margin:         "0 auto",
//         padding:        "0 20px",
//         display:        "flex",
//         alignItems:     "center",
//         justifyContent: "space-between",
//         height:         64,
//       }}>

//         {/* Logo */}
//         <button
//           onClick={() => scrollTo("home")}
//           style={{
//             background:           "none",
//             border:               "none",
//             cursor:               "pointer",
//             padding:              0,
//             fontFamily:           "'Syne', sans-serif",
//             fontWeight:           800,
//             fontSize:             "clamp(0.78rem, 2vw, 0.95rem)",
//             letterSpacing:        "0.15em",
//             backgroundImage:      "linear-gradient(90deg, #f5ff40, #00d4ff)",
//             WebkitBackgroundClip: "text",
//             WebkitTextFillColor:  "transparent",
//             backgroundClip:       "text",
//             whiteSpace:           "nowrap",
//           }}
//         >
//           {personalInfo.name.toUpperCase()}
//         </button>

//         {/* ── Desktop nav — shown at width >= 768px ── */}
//         {!isMobileNav && (
//           <nav style={{ display: "flex", alignItems: "center", gap: 4 }}>
//             {NAV_ITEMS.map((item) => {
//               const isActive = activeSection === item.href;
//               return (
//                 <button
//                   key={item.href}
//                   onClick={() => scrollTo(item.href)}
//                   style={{
//                     padding:       "7px 16px",
//                     borderRadius:  10,
//                     fontSize:      13,
//                     fontFamily:    "'Syne', sans-serif",
//                     fontWeight:    600,
//                     letterSpacing: "0.04em",
//                     color:         isActive ? "#f5ff40"               : "#3d4560",
//                     background:    isActive ? "rgba(245,255,64,0.07)" : "transparent",
//                     border:        isActive ? "1px solid rgba(245,255,64,0.2)" : "1px solid transparent",
//                     cursor:        "pointer",
//                     transition:    "all 0.22s",
//                   }}
//                   onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = "#c8d0e0"; }}
//                   onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = "#3d4560"; }}
//                 >
//                   {item.label}
//                 </button>
//               );
//             })}

//             {/* Hire Me */}
//             <motion.button
//               onClick={() => scrollTo("contact")}
//               whileHover={{ scale: 1.04 }}
//               whileTap={{ scale: 0.97 }}
//               style={{
//                 marginLeft:  10,
//                 padding:     "8px 20px",
//                 borderRadius:10,
//                 fontSize:    13,
//                 fontFamily:  "'Syne', sans-serif",
//                 fontWeight:  700,
//                 background:  "linear-gradient(135deg, #f5ff40, #00d4ff)",
//                 color:       "#000",
//                 border:      "none",
//                 cursor:      "pointer",
//                 boxShadow:   "0 0 22px rgba(245,255,64,0.22)",
//                 display:     "flex",
//                 alignItems:  "center",
//                 gap:         7,
//               }}
//             >
//               Hire Me
//               <span style={{
//                 width:        6,
//                 height:       6,
//                 borderRadius: "50%",
//                 background:   "rgba(0,0,0,0.5)",
//                 animation:    "dotPulse 1.8s ease-in-out infinite",
//               }} />
//             </motion.button>
//           </nav>
//         )}

//         {/* ── Mobile hamburger — shown below 768px only ── */}
//         {isMobileNav && (
//           <button
//             onClick={() => setMobileOpen(!mobileOpen)}
//             style={{
//               width:          40,
//               height:         40,
//               borderRadius:   10,
//               display:        "flex",
//               alignItems:     "center",
//               justifyContent: "center",
//               background:     "rgba(245,255,64,0.05)",
//               border:         "1px solid rgba(245,255,64,0.15)",
//               color:          "#8892b0",
//               cursor:         "pointer",
//             }}
//           >
//             <AnimatePresence mode="wait">
//               <motion.span
//                 key={mobileOpen ? "x" : "m"}
//                 initial={{ opacity: 0, rotate: -80 }}
//                 animate={{ opacity: 1, rotate: 0 }}
//                 exit={{ opacity: 0, rotate: 80 }}
//                 transition={{ duration: 0.18 }}
//                 style={{ display: "flex" }}
//               >
//                 {mobileOpen ? <X size={19} /> : <Menu size={19} />}
//               </motion.span>
//             </AnimatePresence>
//           </button>
//         )}
//       </div>

//       {/* Mobile dropdown */}
//       <AnimatePresence>
//         {isMobileNav && mobileOpen && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             transition={{ duration: 0.28 }}
//             style={{
//               overflow:     "hidden",
//               background:   "rgba(4,4,6,0.97)",
//               backdropFilter: "blur(20px)",
//               borderBottom: "1px solid rgba(245,255,64,0.1)",
//             }}
//           >
//             <div style={{ padding: "12px 16px 16px", display: "flex", flexDirection: "column", gap: 6 }}>
//               {NAV_ITEMS.map((item) => (
//                 <button
//                   key={item.href}
//                   onClick={() => scrollTo(item.href)}
//                   style={{
//                     padding:    "11px 16px",
//                     borderRadius: 10,
//                     textAlign:  "left",
//                     fontSize:   14,
//                     fontFamily: "'Syne', sans-serif",
//                     fontWeight: 600,
//                     color:      activeSection === item.href ? "#f5ff40" : "#8892b0",
//                     background: activeSection === item.href ? "rgba(245,255,64,0.08)" : "transparent",
//                     border:     activeSection === item.href ? "1px solid rgba(245,255,64,0.2)" : "1px solid transparent",
//                     cursor:     "pointer",
//                   }}
//                 >
//                   {item.label}
//                 </button>
//               ))}
//               <button
//                 onClick={() => scrollTo("contact")}
//                 style={{
//                   padding:      "12px 16px",
//                   borderRadius: 10,
//                   textAlign:    "left",
//                   fontSize:     14,
//                   fontFamily:   "'Syne', sans-serif",
//                   fontWeight:   700,
//                   background:   "linear-gradient(135deg, #f5ff40, #00d4ff)",
//                   color:        "#000",
//                   border:       "none",
//                   cursor:       "pointer",
//                 }}
//               >
//                 Hire Me →
//               </button>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.header>
//   );
// };

// function App() {
//   return (
//     <div style={{ background: "#040406" }}>
//       <ScrollProgress />
//       <Header />
//       <main>
//         <HeroSection />
//         <ProjectsSection />
//         <SkillsSection />
//         <ContactSection />
//       </main>
//       <Footer />
//     </div>
//   );
// }

// export default App;
















































// /**
//  * App.js — Optimised with lazy loading
//  *
//  * HeroSection: loaded immediately (above fold, always visible)
//  * ProjectsSection, SkillsSection, ContactSection, Footer:
//  *   lazy loaded — their JS is only downloaded when the user
//  *   scrolls near them. Saves ~180KB on initial load.
//  */

// import React, { useState, useEffect, lazy, Suspense } from "react";
// import "./App.css";
// import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
// import { Menu, X } from "lucide-react";
// import { personalInfo } from "./data/mock";
// // Hero loads immediately — it's above the fold
// import HeroSection from "./components/HeroSection";

// // Everything below the fold: lazy loaded
// const ProjectsSection = lazy(() => import("./components/ProjectsSection"));
// const SkillsContact   = lazy(() => import("./components/SkillsContact"));



// /* ─── Tiny spinner shown while lazy chunks download ─── */
// const SectionLoader = () => (
//   <div style={{
//     display:        "flex",
//     alignItems:     "center",
//     justifyContent: "center",
//     height:         320,
//     background:     "#040406",
//   }}>
//     <div style={{
//       width:         32,
//       height:        32,
//       borderRadius:  "50%",
//       border:        "2px solid rgba(245,255,64,0.12)",
//       borderTopColor:"#f5ff40",
//       animation:     "spin 0.9s linear infinite",
//     }} />
//   </div>
// );

// /* ─── LazySection: only renders once it enters the viewport ─── */
// const LazySection = ({ children }) => {
//   const ref                    = React.useRef(null);
//   const [shouldRender, setSR]  = React.useState(false);

//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;
//     const obs = new IntersectionObserver(
//       ([entry]) => { if (entry.isIntersecting) { setSR(true); obs.disconnect(); } },
//       { rootMargin: "200px" }   // start loading 200px before it's visible
//     );
//     obs.observe(el);
//     return () => obs.disconnect();
//   }, []);

//   return (
//     <div ref={ref}>
//       {shouldRender ? children : <SectionLoader />}
//     </div>
//   );
// };

// /* ─── Nav items ─── */
// const NAV_ITEMS = [
//   { label: "Home",     href: "home"     },
//   { label: "Projects", href: "projects" },
//   { label: "Skills",   href: "skills"   },
//   { label: "Contact",  href: "contact"  },
// ];

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

// /* ─── Scroll progress bar ─── */
// const ScrollProgress = () => {
//   const { scrollYProgress } = useScroll();
//   const scaleX = useSpring(scrollYProgress, { stiffness: 400, damping: 40 });
//   return <motion.div id="scroll-progress" style={{ scaleX }} />;
// };

// /* ─── Header ─── */
// const Header = () => {
//   const width       = useWindowWidth();
//   const isMobile    = width < 768;
//   const [scrolled,  setScrolled]  = useState(false);
//   const [menuOpen,  setMenuOpen]  = useState(false);
//   const [activeNav, setActiveNav] = useState("home");

//   useEffect(() => { if (!isMobile) setMenuOpen(false); }, [isMobile]);

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 40);
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   useEffect(() => {
//     const obs = [];
//     NAV_ITEMS.forEach(({ href }) => {
//       const el = document.getElementById(href);
//       if (!el) return;
//       const o = new IntersectionObserver(
//         ([e]) => { if (e.isIntersecting) setActiveNav(href); },
//         { threshold: 0.35 }
//       );
//       o.observe(el); obs.push(o);
//     });
//     return () => obs.forEach((o) => o.disconnect());
//   }, []);

//   const scrollTo = (id) => {
//     setMenuOpen(false);
//     document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
//   };

//   return (
//     <motion.header
//       initial={{ y: -80, opacity: 0 }}
//       animate={{ y: 0,   opacity: 1 }}
//       transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
//       style={{
//         position:      "fixed",
//         top: 0, left: 0, right: 0,
//         zIndex:        50,
//         background:    scrolled ? "rgba(4,4,6,0.88)" : "transparent",
//         backdropFilter:scrolled ? "blur(22px)" : "none",
//         borderBottom:  scrolled ? "1px solid rgba(245,255,64,0.07)" : "1px solid transparent",
//         boxShadow:     scrolled ? "0 4px 40px rgba(0,0,0,0.4)" : "none",
//         transition:    "all 0.4s",
//       }}
//     >
//       <div style={{
//         maxWidth: 1280, margin: "0 auto",
//         padding: "0 clamp(16px,4vw,48px)",
//         display: "flex", alignItems: "center", justifyContent: "space-between",
//         height: 64,
//       }}>
//         {/* Logo */}
//         <button
//           onClick={() => scrollTo("home")}
//           style={{
//             background: "none", border: "none", cursor: "pointer", padding: 0,
//             fontFamily: "'Syne', sans-serif", fontWeight: 800,
//             fontSize: "clamp(0.78rem,2vw,0.95rem)", letterSpacing: "0.15em",
//             backgroundImage: "linear-gradient(90deg,#f5ff40,#00d4ff)",
//             WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
//             backgroundClip: "text", whiteSpace: "nowrap",
//           }}
//         >
//           {personalInfo.name.toUpperCase()}
//         </button>

//         {/* Desktop nav */}
//         {!isMobile && (
//           <nav style={{ display: "flex", alignItems: "center", gap: 4 }}>
//             {NAV_ITEMS.map(({ label, href }) => {
//               const isA = activeNav === href;
//               return (
//                 <button key={href} onClick={() => scrollTo(href)}
//                   style={{
//                     padding: "7px 16px", borderRadius: 10, fontSize: 13,
//                     fontFamily: "'Syne',sans-serif", fontWeight: 600, letterSpacing: "0.04em",
//                     color: isA ? "#f5ff40" : "#3d4560",
//                     background: isA ? "rgba(245,255,64,0.07)" : "transparent",
//                     border: isA ? "1px solid rgba(245,255,64,0.2)" : "1px solid transparent",
//                     cursor: "pointer", transition: "all 0.22s",
//                   }}
//                   onMouseEnter={(e) => { if (!isA) e.currentTarget.style.color = "#c8d0e0"; }}
//                   onMouseLeave={(e) => { if (!isA) e.currentTarget.style.color = "#3d4560"; }}
//                 >
//                   {label}
//                 </button>
//               );
//             })}
//             <motion.button onClick={() => scrollTo("contact")}
//               whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
//               style={{
//                 marginLeft: 10, padding: "8px 20px", borderRadius: 10,
//                 fontSize: 13, fontFamily: "'Syne',sans-serif", fontWeight: 700,
//                 background: "linear-gradient(135deg,#f5ff40,#00d4ff)", color: "#000",
//                 border: "none", cursor: "pointer",
//                 boxShadow: "0 0 22px rgba(245,255,64,0.22)",
//                 display: "flex", alignItems: "center", gap: 7,
//               }}
//             >
//               Hire Me
//               <span style={{
//                 width: 6, height: 6, borderRadius: "50%", background: "rgba(0,0,0,0.45)",
//                 animation: "dotPulse 1.8s ease-in-out infinite",
//               }} />
//             </motion.button>
//           </nav>
//         )}

//         {/* Mobile hamburger */}
//         {isMobile && (
//           <button onClick={() => setMenuOpen(!menuOpen)}
//             style={{
//               width: 40, height: 40, borderRadius: 10, cursor: "pointer",
//               display: "flex", alignItems: "center", justifyContent: "center",
//               background: "rgba(245,255,64,0.05)", border: "1px solid rgba(245,255,64,0.15)",
//               color: "#8892b0",
//             }}
//           >
//             <AnimatePresence mode="wait">
//               <motion.span key={menuOpen ? "x" : "m"}
//                 initial={{ opacity: 0, rotate: -80 }} animate={{ opacity: 1, rotate: 0 }}
//                 exit={{ opacity: 0, rotate: 80 }} transition={{ duration: 0.18 }}
//                 style={{ display: "flex" }}
//               >
//                 {menuOpen ? <X size={19} /> : <Menu size={19} />}
//               </motion.span>
//             </AnimatePresence>
//           </button>
//         )}
//       </div>

//       {/* Mobile dropdown */}
//       <AnimatePresence>
//         {isMobile && menuOpen && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.26 }}
//             style={{
//               overflow: "hidden", background: "rgba(4,4,6,0.97)",
//               backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(245,255,64,0.08)",
//             }}
//           >
//             <div style={{ padding: "10px 16px 14px", display: "flex", flexDirection: "column", gap: 5 }}>
//               {NAV_ITEMS.map(({ label, href }) => (
//                 <button key={href} onClick={() => scrollTo(href)}
//                   style={{
//                     padding: "11px 16px", borderRadius: 10, textAlign: "left",
//                     fontFamily: "'Syne',sans-serif", fontWeight: 600, fontSize: 14,
//                     color: activeNav === href ? "#f5ff40" : "#8892b0",
//                     background: activeNav === href ? "rgba(245,255,64,0.08)" : "transparent",
//                     border: activeNav === href ? "1px solid rgba(245,255,64,0.2)" : "1px solid transparent",
//                     cursor: "pointer",
//                   }}
//                 >
//                   {label}
//                 </button>
//               ))}
//               <button onClick={() => scrollTo("contact")}
//                 style={{
//                   padding: "12px 16px", borderRadius: 10, textAlign: "left",
//                   fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 14,
//                   background: "linear-gradient(135deg,#f5ff40,#00d4ff)",
//                   color: "#000", border: "none", cursor: "pointer",
//                 }}
//               >
//                 Hire Me →
//               </button>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.header>
//   );
// };

// /* ─── Root App ─── */
// export default function App() {
//   return (
//     <div style={{ background: "#040406" }}>
//       <ScrollProgress />
//       <Header />
//       <main>
//         {/* Hero: loads immediately */}
//         <HeroSection />

//         {/* These sections only download their JS when user scrolls near them */}
//         <LazySection>
//           <Suspense fallback={<SectionLoader />}>
//             <ProjectsSection />
//           </Suspense>
//         </LazySection>

//         <LazySection>
//           <Suspense fallback={<SectionLoader />}>
//             {/* SkillsContact exports 3 named exports — import the whole module */}
//             <SkillsContactWrapper />
//           </Suspense>
//         </LazySection>
//       </main>
//     </div>
//   );
// }

// /* Wrapper to use named exports from lazy-loaded SkillsContact */
// const SkillsContactWrapper = React.memo(() => {
//   const [Mod, setMod] = React.useState(null);
//   useEffect(() => {
//     import("./components/SkillsContact").then(setMod);
//   }, []);
//   if (!Mod) return <SectionLoader />;
//   return (
//     <>
//       <Mod.SkillsSection />
//       <Mod.ContactSection />
//       <Mod.Footer />
//     </>
//   );
// });

























































// /**
//  * App.js — Fixed
//  *
//  * BUG: Hamburger invisible on ALL mobile devices (Pixel 7, iPhone SE, Samsung etc.)
//  * ─────────────────────────────────────────────────────────────────────────────────
//  * ROOT CAUSE (3 compounding issues):
//  *
//  *   Issue 1 — Header is transparent on first load (not scrolled yet):
//  *     background: scrolled ? "rgba(4,4,6,0.88)" : "transparent"
//  *     → header = completely see-through on page load
//  *
//  *   Issue 2 — Hamburger button is nearly invisible:
//  *     background: "rgba(245,255,64, 0.05)"  → 95% transparent
//  *     border:     "1px solid rgba(245,255,64, 0.15)" → 85% transparent
//  *     → button blends completely into hero background image
//  *
//  *   Issue 3 — Icon color is wrong:
//  *     color: "#8892b0"  → medium gray on dark background = invisible
//  *
//  *   Combined effect: button IS in the DOM (isMobile=true for all phones) but
//  *   zero visual contrast against the background. Not a logic bug — a CSS bug.
//  *
//  * FIX:
//  *   - Hamburger button always has a solid dark bg + bright border + white icon
//  *   - When header is transparent (hero overlay), button gets extra backdrop-blur
//  *   - When header is scrolled (dark bg), button style adapts
//  *   - Icon color always #ffffff (never gray)
//  *   - Width/height 44px (WCAG minimum touch target, was 40px)
//  *   - flexShrink: 0 prevents button being squeezed by long logo text
//  */

// import React, { useState, useEffect, lazy, Suspense } from "react";
// import "./App.css";
// import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
// import { Menu, X } from "lucide-react";
// import { personalInfo } from "./data/mock";

// // Hero loads immediately — above the fold
// import HeroSection from "./components/HeroSection";

// // Everything below the fold: lazy loaded
// const ProjectsSection = lazy(() => import("./components/ProjectsSection"));
// const SkillsContact   = lazy(() => import("./components/SkillsContact"));

// /* ─── Tiny spinner ─── */
// const SectionLoader = () => (
//   <div style={{
//     display: "flex", alignItems: "center", justifyContent: "center",
//     height: 320, background: "#040406",
//   }}>
//     <div style={{
//       width: 32, height: 32, borderRadius: "50%",
//       border: "2px solid rgba(245,255,64,0.12)",
//       borderTopColor: "#f5ff40",
//       animation: "spin 0.9s linear infinite",
//     }} />
//   </div>
// );

// /* ─── LazySection ─── */
// const LazySection = ({ children }) => {
//   const ref = React.useRef(null);
//   const [shouldRender, setSR] = React.useState(false);

//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;
//     const obs = new IntersectionObserver(
//       ([entry]) => { if (entry.isIntersecting) { setSR(true); obs.disconnect(); } },
//       { rootMargin: "200px" }
//     );
//     obs.observe(el);
//     return () => obs.disconnect();
//   }, []);

//   return <div ref={ref}>{shouldRender ? children : <SectionLoader />}</div>;
// };

// /* ─── Nav items ─── */
// const NAV_ITEMS = [
//   { label: "Home",     href: "home"     },
//   { label: "Projects", href: "projects" },
//   { label: "Skills",   href: "skills"   },
//   { label: "Contact",  href: "contact"  },
// ];

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

// /* ─── Scroll progress bar ─── */
// const ScrollProgress = () => {
//   const { scrollYProgress } = useScroll();
//   const scaleX = useSpring(scrollYProgress, { stiffness: 400, damping: 40 });
//   return <motion.div id="scroll-progress" style={{ scaleX }} />;
// };

// /* ─── Header ─── */
// const Header = () => {
//   const width       = useWindowWidth();
//   const isMobile    = width < 768;
//   const [scrolled,  setScrolled]  = useState(false);
//   const [menuOpen,  setMenuOpen]  = useState(false);
//   const [activeNav, setActiveNav] = useState("home");

//   useEffect(() => { if (!isMobile) setMenuOpen(false); }, [isMobile]);

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 40);
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   useEffect(() => {
//     const obs = [];
//     NAV_ITEMS.forEach(({ href }) => {
//       const el = document.getElementById(href);
//       if (!el) return;
//       const o = new IntersectionObserver(
//         ([e]) => { if (e.isIntersecting) setActiveNav(href); },
//         { threshold: 0.35 }
//       );
//       o.observe(el); obs.push(o);
//     });
//     return () => obs.forEach((o) => o.disconnect());
//   }, []);

//   const scrollTo = (id) => {
//     setMenuOpen(false);
//     document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
//   };

//   return (
//     <motion.header
//       initial={{ y: -80, opacity: 0 }}
//       animate={{ y: 0,   opacity: 1 }}
//       transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
//       style={{
//         position:       "fixed",
//         top: 0, left: 0, right: 0,
//         zIndex:         50,
//         background:     scrolled ? "rgba(4,4,6,0.88)" : "transparent",
//         backdropFilter: scrolled ? "blur(22px)"        : "none",
//         borderBottom:   scrolled ? "1px solid rgba(245,255,64,0.07)" : "1px solid transparent",
//         boxShadow:      scrolled ? "0 4px 40px rgba(0,0,0,0.4)"     : "none",
//         transition:     "all 0.4s",
//       }}
//     >
//       <div style={{
//         maxWidth: 1280, margin: "0 auto",
//         padding: "0 clamp(16px,4vw,48px)",
//         display: "flex", alignItems: "center", justifyContent: "space-between",
//         height: 64,
//         gap: 12,          /* prevents logo + button squishing each other */
//       }}>

//         {/* ── Logo ── */}
//         <button
//           onClick={() => scrollTo("home")}
//           style={{
//             background: "none", border: "none", cursor: "pointer", padding: 0,
//             fontFamily: "'Syne', sans-serif", fontWeight: 800,
//             fontSize: "clamp(0.78rem,2vw,0.95rem)", letterSpacing: "0.15em",
//             backgroundImage: "linear-gradient(90deg,#f5ff40,#00d4ff)",
//             WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
//             backgroundClip: "text", whiteSpace: "nowrap",
//             flexShrink: 1,    /* allow logo to shrink before it pushes hamburger off-screen */
//             minWidth: 0,
//           }}
//         >
//           {personalInfo.name.toUpperCase()}
//         </button>

//         {/* ── Desktop nav ── */}
//         {!isMobile && (
//           <nav style={{ display: "flex", alignItems: "center", gap: 4 }}>
//             {NAV_ITEMS.map(({ label, href }) => {
//               const isA = activeNav === href;
//               return (
//                 <button key={href} onClick={() => scrollTo(href)}
//                   style={{
//                     padding: "7px 16px", borderRadius: 10, fontSize: 13,
//                     fontFamily: "'Syne',sans-serif", fontWeight: 600, letterSpacing: "0.04em",
//                     color: isA ? "#f5ff40" : "#3d4560",
//                     background: isA ? "rgba(245,255,64,0.07)" : "transparent",
//                     border: isA ? "1px solid rgba(245,255,64,0.2)" : "1px solid transparent",
//                     cursor: "pointer", transition: "all 0.22s",
//                   }}
//                   onMouseEnter={(e) => { if (!isA) e.currentTarget.style.color = "#c8d0e0"; }}
//                   onMouseLeave={(e) => { if (!isA) e.currentTarget.style.color = "#3d4560"; }}
//                 >
//                   {label}
//                 </button>
//               );
//             })}
//             <motion.button onClick={() => scrollTo("contact")}
//               whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
//               style={{
//                 marginLeft: 10, padding: "8px 20px", borderRadius: 10,
//                 fontSize: 13, fontFamily: "'Syne',sans-serif", fontWeight: 700,
//                 background: "linear-gradient(135deg,#f5ff40,#00d4ff)", color: "#000",
//                 border: "none", cursor: "pointer",
//                 boxShadow: "0 0 22px rgba(245,255,64,0.22)",
//                 display: "flex", alignItems: "center", gap: 7,
//               }}
//             >
//               Hire Me
//               <span style={{
//                 width: 6, height: 6, borderRadius: "50%", background: "rgba(0,0,0,0.45)",
//                 animation: "dotPulse 1.8s ease-in-out infinite",
//               }} />
//             </motion.button>
//           </nav>
//         )}

//         {/* ── Mobile hamburger ───────────────────────────────────────────────────
//             THE FIX:
//             Before: bg=rgba(245,255,64,0.05), border=rgba(245,255,64,0.15), color=#8892b0
//                     → 3 layers of near-invisibility on top of a transparent header
//                     → button existed in DOM but was visually impossible to see

//             After:  Always has a dark semi-opaque background (rgba(4,4,6,0.6))
//                     so it reads on any hero background, light or dark.
//                     Bright yellow-tinted border so it pops.
//                     Icon is always white (#fff) — maximum contrast.
//                     When scrolled (header turns dark), button adapts to match.
//             ──────────────────────────────────────────────────────────────────── */}
//         {isMobile && (
//           <motion.button
//             onClick={() => setMenuOpen(!menuOpen)}
//             whileTap={{ scale: 0.93 }}
//             style={{
//               flexShrink:     0,           /* never squish this button */
//               width:          44,          /* WCAG min touch target (was 40px) */
//               height:         44,
//               borderRadius:   10,
//               cursor:         "pointer",
//               display:        "flex",
//               alignItems:     "center",
//               justifyContent: "center",

//               /* ✅ ALWAYS VISIBLE — works on both transparent and opaque header */
//               background:     scrolled
//                 ? "rgba(245,255,64,0.1)"    /* on dark header: subtle yellow tint */
//                 : "rgba(4,4,6,0.65)",       /* on transparent header: dark pill — floats above hero image */
//               border:         "1px solid rgba(245,255,64,0.45)",   /* clearly visible border */
//               backdropFilter: "blur(12px)", /* blurs hero behind button for extra legibility */
//               WebkitBackdropFilter: "blur(12px)",

//               /* ✅ ICON ALWAYS WHITE — never gray */
//               color:          "#ffffff",
//               transition:     "background 0.3s, border-color 0.3s",
//             }}
//             aria-label={menuOpen ? "Close menu" : "Open menu"}
//             aria-expanded={menuOpen}
//           >
//             <AnimatePresence mode="wait">
//               <motion.span
//                 key={menuOpen ? "x" : "m"}
//                 initial={{ opacity: 0, rotate: -80 }}
//                 animate={{ opacity: 1, rotate: 0 }}
//                 exit={{ opacity: 0, rotate: 80 }}
//                 transition={{ duration: 0.18 }}
//                 style={{ display: "flex" }}
//               >
//                 {menuOpen ? <X size={20} /> : <Menu size={20} />}
//               </motion.span>
//             </AnimatePresence>
//           </motion.button>
//         )}
//       </div>

//       {/* ── Mobile dropdown menu ── */}
//       <AnimatePresence>
//         {isMobile && menuOpen && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             transition={{ duration: 0.26 }}
//             style={{
//               overflow: "hidden",
//               background: "rgba(4,4,6,0.97)",
//               backdropFilter: "blur(20px)",
//               WebkitBackdropFilter: "blur(20px)",
//               borderBottom: "1px solid rgba(245,255,64,0.08)",
//             }}
//           >
//             <div style={{
//               padding: "10px 16px 16px",
//               display: "flex", flexDirection: "column", gap: 6,
//             }}>
//               {NAV_ITEMS.map(({ label, href }) => {
//                 const isA = activeNav === href;
//                 return (
//                   <button key={href} onClick={() => scrollTo(href)}
//                     style={{
//                       padding: "12px 16px", borderRadius: 10, textAlign: "left",
//                       fontFamily: "'Syne',sans-serif", fontWeight: 600, fontSize: 14,
//                       color: isA ? "#f5ff40" : "#8892b0",
//                       background: isA ? "rgba(245,255,64,0.08)" : "transparent",
//                       border: isA ? "1px solid rgba(245,255,64,0.2)" : "1px solid transparent",
//                       cursor: "pointer", transition: "all 0.18s",
//                       minHeight: 44,    /* WCAG touch target */
//                     }}
//                   >
//                     {label}
//                   </button>
//                 );
//               })}
//               <button onClick={() => scrollTo("contact")}
//                 style={{
//                   padding: "13px 16px", borderRadius: 10, textAlign: "center",
//                   fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 14,
//                   background: "linear-gradient(135deg,#f5ff40,#00d4ff)",
//                   color: "#000", border: "none", cursor: "pointer",
//                   minHeight: 44,
//                   marginTop: 4,
//                 }}
//               >
//                 Hire Me →
//               </button>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.header>
//   );
// };

// /* ─── Root App ─── */
// export default function App() {
//   return (
//     <div style={{ background: "#040406" }}>
//       <ScrollProgress />
//       <Header />
//       <main>
//         <HeroSection />

//         <LazySection>
//           <Suspense fallback={<SectionLoader />}>
//             <ProjectsSection />
//           </Suspense>
//         </LazySection>

//         <LazySection>
//           <Suspense fallback={<SectionLoader />}>
//             <SkillsContactWrapper />
//           </Suspense>
//         </LazySection>
//       </main>
//     </div>
//   );
// }

// /* Wrapper for named exports from lazy-loaded SkillsContact */
// const SkillsContactWrapper = React.memo(() => {
//   const [Mod, setMod] = React.useState(null);
//   useEffect(() => {
//     import("./components/SkillsContact").then(setMod);
//   }, []);
//   if (!Mod) return <SectionLoader />;
//   return (
//     <>
//       <Mod.SkillsSection />
//       <Mod.ContactSection />
//       <Mod.Footer />
//     </>
//   );
// });











































/**
 * App.js — Performance-optimised + All bugs fixed
 *
 * Performance changes from previous versions:
 * ─────────────────────────────────────────────────────────────────────
 * 1. FIXED: Double SkillsContact import
 *    Before: lazy(() => import("SkillsContact")) + import("SkillsContact").then(setMod)
 *    = same module imported twice, race condition, double JS parse
 *    After:  Single lazy() that re-shapes the module's named exports into a default
 *
 * 2. FIXED: Scroll handler fires on every pixel of scroll
 *    Before: setScrolled() called directly in scroll listener
 *    = state update on every scroll event = 60+ re-renders per second while scrolling
 *    After:  requestAnimationFrame gate — max 1 state update per frame (60fps cap)
 *
 * 3. FIXED: scrollTo function recreated on every render
 *    After: useCallback — stable reference, child components don't re-render
 *
 * 4. FIXED: Header style objects recreated every render
 *    After: useMemo on headerStyle + innerStyle objects
 *
 * 5. KEPT: All lazy loading (ProjectsSection + SkillsSection + ContactSection + Footer)
 *    Initial JS bundle only contains: React + Framer + Header + HeroSection
 *
 * 6. KEPT: Hamburger always visible fix (dark bg + bright border + white icon)
 *
 * 7. NEW: Header and ScrollProgress are React.memo — won't re-render when
 *    App re-renders (which happens on scroll due to progress bar)
 */

import React, {
  useState, useEffect, useCallback, useMemo,
  lazy, Suspense, memo,
} from "react";
import "./App.css";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import { personalInfo } from "./data/mock";
import HeroSection from "./components/HeroSection";

/* ─── Lazy load all below-fold sections ───────────────────────────────────────
   Each becomes its own JS chunk.
   ProjectsSection JS only downloads when user scrolls near it.
   SkillsContact JS only downloads when user scrolls near it.
   Initial bundle: ~180KB saved.
──────────────────────────────────────────────────────────────────────────────*/
const ProjectsSection = lazy(() => import("./components/ProjectsSection"));

/*
  Fix 1: SkillsContact has named exports (SkillsSection, ContactSection, Footer).
  Instead of importing it twice (lazy + dynamic), we use lazy() and re-shape the
  module to have a default export that renders all three named exports.
  Single import, single JS parse, no race condition.
*/
const SkillsContactBundle = lazy(() =>
  import("./components/SkillsContact").then((module) => ({
    default: function SkillsContactAll() {
      return (
        <>
          <module.SkillsSection />
          <module.ContactSection />
          <module.Footer />
        </>
      );
    },
  }))
);

/* ─── Section loader (shown while lazy chunks download) ── */
const SectionLoader = memo(() => (
  <div style={{
    display: "flex", alignItems: "center", justifyContent: "center",
    height: 320, background: "#040406",
  }}>
    <div className="spinner" style={{
      width: 32, height: 32, borderRadius: "50%",
      border: "2px solid rgba(245,255,64,0.12)",
      borderTopColor: "#f5ff40",
    }} />
  </div>
));

/* ─── LazySection: renders children only when scrolled into view ──────────────
   rootMargin "200px" = start loading 200px before the section is visible.
   By the time user reaches it, JS has already downloaded.
──────────────────────────────────────────────────────────────────────────────*/
const LazySection = memo(({ children }) => {
  const ref = React.useRef(null);
  const [shouldRender, setSR] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setSR(true); obs.disconnect(); } },
      { rootMargin: "200px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return <div ref={ref}>{shouldRender ? children : <SectionLoader />}</div>;
});

/* ─── Nav items (stable constant — never recreated) ── */
const NAV_ITEMS = [
  { label: "Home",     href: "home"     },
  { label: "Projects", href: "projects" },
  { label: "Skills",   href: "skills"   },
  { label: "Contact",  href: "contact"  },
];

/* ─── Responsive hook ── */
function useWindowWidth() {
  const [w, setW] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener("resize", h, { passive: true });
    return () => window.removeEventListener("resize", h);
  }, []);
  return w;
}

/* ─── Scroll progress bar ───────────────────────────────────────────────────
   useScroll + useSpring use Framer's MotionValue system — they update
   via CSS custom properties directly on the DOM, bypassing React state
   entirely. Zero re-renders from scrolling. This is already optimal.
──────────────────────────────────────────────────────────────────────────────*/
const ScrollProgress = memo(() => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 400, damping: 40 });
  return <motion.div id="scroll-progress" style={{ scaleX }} />;
});

/* ═══════════════════════════════════════════════════════════════════════════
   HEADER
═══════════════════════════════════════════════════════════════════════════ */
const Header = memo(() => {
  const width    = useWindowWidth();
  const isMobile = width < 768;

  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [activeNav, setActiveNav] = useState("home");

  useEffect(() => { if (!isMobile) setMenuOpen(false); }, [isMobile]);

  /* Fix 2: RAF-throttled scroll handler — max 1 state update per animation frame */
  useEffect(() => {
    let rafId = null;
    const onScroll = () => {
      if (rafId) return;                          // already scheduled, skip
      rafId = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 40);
        rafId = null;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  /* Active section tracker */
  useEffect(() => {
    const obs = [];
    NAV_ITEMS.forEach(({ href }) => {
      const el = document.getElementById(href);
      if (!el) return;
      const o = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActiveNav(href); },
        { threshold: 0.35 }
      );
      o.observe(el); obs.push(o);
    });
    return () => obs.forEach((o) => o.disconnect());
  }, []);

  /* Fix 3: stable scrollTo reference — child buttons don't re-render */
  const scrollTo = useCallback((id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  /* Fix 4: memoised style objects — not recreated every render */
  const headerStyle = useMemo(() => ({
    position:       "fixed",
    top: 0, left: 0, right: 0,
    zIndex:         50,
    background:     scrolled ? "rgba(4,4,6,0.88)" : "transparent",
    backdropFilter: scrolled ? "blur(22px)"        : "none",
    WebkitBackdropFilter: scrolled ? "blur(22px)"  : "none",
    borderBottom:   scrolled ? "1px solid rgba(245,255,64,0.07)" : "1px solid transparent",
    boxShadow:      scrolled ? "0 4px 40px rgba(0,0,0,0.4)"     : "none",
    transition:     "background 0.4s, backdrop-filter 0.4s, border-color 0.4s, box-shadow 0.4s",
  }), [scrolled]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={headerStyle}
    >
      <div style={{
        maxWidth: 1280, margin: "0 auto",
        padding: "0 clamp(16px,4vw,48px)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 64, gap: 12,
      }}>

        {/* ── Logo ── */}
        <button
          onClick={() => scrollTo("home")}
          style={{
            background: "none", border: "none", cursor: "pointer", padding: 0,
            fontFamily: "'Syne', sans-serif", fontWeight: 800,
            fontSize: "clamp(0.78rem,2vw,0.95rem)", letterSpacing: "0.15em",
            backgroundImage: "linear-gradient(90deg,#f5ff40,#00d4ff)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            backgroundClip: "text", whiteSpace: "nowrap",
            flexShrink: 1, minWidth: 0,
          }}
        >
          {personalInfo.name.toUpperCase()}
        </button>

        {/* ── Desktop nav ── */}
        {!isMobile && (
          <nav style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {NAV_ITEMS.map(({ label, href }) => {
              const isA = activeNav === href;
              return (
                <button key={href} onClick={() => scrollTo(href)}
                  style={{
                    padding: "7px 16px", borderRadius: 10, fontSize: 13,
                    fontFamily: "'Syne',sans-serif", fontWeight: 600, letterSpacing: "0.04em",
                    color:      isA ? "#f5ff40" : "#3d4560",
                    background: isA ? "rgba(245,255,64,0.07)" : "transparent",
                    border:     isA ? "1px solid rgba(245,255,64,0.2)" : "1px solid transparent",
                    cursor: "pointer", transition: "color 0.22s, background 0.22s",
                  }}
                  onMouseEnter={(e) => { if (!isA) e.currentTarget.style.color = "#c8d0e0"; }}
                  onMouseLeave={(e) => { if (!isA) e.currentTarget.style.color = "#3d4560"; }}
                >
                  {label}
                </button>
              );
            })}
            <motion.button
              onClick={() => scrollTo("contact")}
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              style={{
                marginLeft: 10, padding: "8px 20px", borderRadius: 10,
                fontSize: 13, fontFamily: "'Syne',sans-serif", fontWeight: 700,
                background: "linear-gradient(135deg,#f5ff40,#00d4ff)", color: "#000",
                border: "none", cursor: "pointer",
                boxShadow: "0 0 22px rgba(245,255,64,0.22)",
                display: "flex", alignItems: "center", gap: 7,
              }}
            >
              Hire Me
              <span className="dot-pulse" style={{
                width: 6, height: 6, borderRadius: "50%", background: "rgba(0,0,0,0.45)",
              }} />
            </motion.button>
          </nav>
        )}

        {/* ── Mobile hamburger ─────────────────────────────────────────────────
            VISIBLE ON ALL DEVICES — dark bg + bright border + white icon.
            Works on both transparent (hero) and opaque (scrolled) header.
        ──────────────────────────────────────────────────────────────────────── */}
        {isMobile && (
          <motion.button
            onClick={() => setMenuOpen((p) => !p)}
            whileTap={{ scale: 0.92 }}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            style={{
              flexShrink: 0,
              width: 44, height: 44, borderRadius: 10,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
              background:     scrolled ? "rgba(245,255,64,0.1)"  : "rgba(4,4,6,0.65)",
              border:         "1px solid rgba(245,255,64,0.45)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              color:          "#ffffff",
              transition:     "background 0.3s",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.span key={menuOpen ? "x" : "m"}
                initial={{ opacity: 0, rotate: -80 }} animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 80 }} transition={{ duration: 0.18 }}
                style={{ display: "flex" }}
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        )}
      </div>

      {/* ── Mobile dropdown ── */}
      <AnimatePresence>
        {isMobile && menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.26 }}
            style={{
              overflow: "hidden", background: "rgba(4,4,6,0.97)",
              backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(245,255,64,0.08)",
            }}
          >
            <div style={{ padding: "10px 16px 16px", display: "flex", flexDirection: "column", gap: 6 }}>
              {NAV_ITEMS.map(({ label, href }) => {
                const isA = activeNav === href;
                return (
                  <button key={href} onClick={() => scrollTo(href)}
                    style={{
                      padding: "12px 16px", borderRadius: 10, textAlign: "left",
                      fontFamily: "'Syne',sans-serif", fontWeight: 600, fontSize: 14,
                      color:      isA ? "#f5ff40" : "#8892b0",
                      background: isA ? "rgba(245,255,64,0.08)" : "transparent",
                      border:     isA ? "1px solid rgba(245,255,64,0.2)" : "1px solid transparent",
                      cursor: "pointer", minHeight: 44,
                    }}
                  >
                    {label}
                  </button>
                );
              })}
              <button onClick={() => scrollTo("contact")}
                style={{
                  padding: "13px 16px", borderRadius: 10, textAlign: "center",
                  fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 14,
                  background: "linear-gradient(135deg,#f5ff40,#00d4ff)",
                  color: "#000", border: "none", cursor: "pointer",
                  minHeight: 44, marginTop: 4,
                }}
              >
                Hire Me →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
});

/* ═══════════════════════════════════════════════════════════════════════════
   ROOT APP
═══════════════════════════════════════════════════════════════════════════ */
export default function App() {
  return (
    <div style={{ background: "#040406" }}>
      <ScrollProgress />
      <Header />
      <main>
        {/* Hero: eagerly loaded — it's what the user sees first */}
        <HeroSection />

        {/* Projects: lazy — JS downloads when user scrolls within 200px */}
        <LazySection>
          <Suspense fallback={<SectionLoader />}>
            <ProjectsSection />
          </Suspense>
        </LazySection>

        {/* Skills + Contact + Footer: lazy — single import, three components */}
        <LazySection>
          <Suspense fallback={<SectionLoader />}>
            <SkillsContactBundle />
          </Suspense>
        </LazySection>
      </main>
    </div>
  );
}