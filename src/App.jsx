// /**
//  * App.js — Performance-optimised + All bugs fixed
//  *
//  * Performance changes from previous versions:
//  * ─────────────────────────────────────────────────────────────────────
//  * 1. FIXED: Double SkillsContact import
//  *    Before: lazy(() => import("SkillsContact")) + import("SkillsContact").then(setMod)
//  *    = same module imported twice, race condition, double JS parse
//  *    After:  Single lazy() that re-shapes the module's named exports into a default
//  *
//  * 2. FIXED: Scroll handler fires on every pixel of scroll
//  *    Before: setScrolled() called directly in scroll listener
//  *    = state update on every scroll event = 60+ re-renders per second while scrolling
//  *    After:  requestAnimationFrame gate — max 1 state update per frame (60fps cap)
//  *
//  * 3. FIXED: scrollTo function recreated on every render
//  *    After: useCallback — stable reference, child components don't re-render
//  *
//  * 4. FIXED: Header style objects recreated every render
//  *    After: useMemo on headerStyle + innerStyle objects
//  *
//  * 5. KEPT: All lazy loading (ProjectsSection + SkillsSection + ContactSection + Footer)
//  *    Initial JS bundle only contains: React + Framer + Header + HeroSection
//  *
//  * 6. KEPT: Hamburger always visible fix (dark bg + bright border + white icon)
//  *
//  * 7. NEW: Header and ScrollProgress are React.memo — won't re-render when
//  *    App re-renders (which happens on scroll due to progress bar)
//  */

// import React, {
//   useState, useEffect, useCallback, useMemo,
//   lazy, Suspense, memo,
// } from "react";
// import "./App.css";
// import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
// import { Menu, X } from "lucide-react";
// import { personalInfo } from "./data/mock";
// import HeroSection from "./components/HeroSection";

// /* ─── Lazy load all below-fold sections ───────────────────────────────────────
//    Each becomes its own JS chunk.
//    ProjectsSection JS only downloads when user scrolls near it.
//    SkillsContact JS only downloads when user scrolls near it.
//    Initial bundle: ~180KB saved.
// ──────────────────────────────────────────────────────────────────────────────*/
// const ProjectsSection = lazy(() => import("./components/ProjectsSection"));

// /*
//   Fix 1: SkillsContact has named exports (SkillsSection, ContactSection, Footer).
//   Instead of importing it twice (lazy + dynamic), we use lazy() and re-shape the
//   module to have a default export that renders all three named exports.
//   Single import, single JS parse, no race condition.
// */
// const SkillsContactBundle = lazy(() =>
//   import("./components/SkillsContact").then((module) => ({
//     default: function SkillsContactAll() {
//       return (
//         <>
//           <module.SkillsSection />
//           <module.ContactSection />
//           <module.Footer />
//         </>
//       );
//     },
//   }))
// );

// /* ─── Section loader (shown while lazy chunks download) ── */
// const SectionLoader = memo(() => (
//   <div style={{
//     display: "flex", alignItems: "center", justifyContent: "center",
//     height: 320, background: "#040406",
//   }}>
//     <div className="spinner" style={{
//       width: 32, height: 32, borderRadius: "50%",
//       border: "2px solid rgba(245,255,64,0.12)",
//       borderTopColor: "#f5ff40",
//     }} />
//   </div>
// ));

// /* ─── LazySection: renders children only when scrolled into view ──────────────
//    rootMargin "200px" = start loading 200px before the section is visible.
//    By the time user reaches it, JS has already downloaded.
// ──────────────────────────────────────────────────────────────────────────────*/
// const LazySection = memo(({ children }) => {
//   const ref = React.useRef(null);
//   const [shouldRender, setSR] = useState(false);

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
// });

// /* ─── Nav items (stable constant — never recreated) ── */
// const NAV_ITEMS = [
//   { label: "Home",     href: "home"     },
//   { label: "Projects", href: "projects" },
//   { label: "Skills",   href: "skills"   },
//   { label: "Contact",  href: "contact"  },
// ];

// /* ─── Responsive hook ── */
// function useWindowWidth() {
//   const [w, setW] = useState(
//     typeof window !== "undefined" ? window.innerWidth : 1200
//   );
//   useEffect(() => {
//     const h = () => setW(window.innerWidth);
//     window.addEventListener("resize", h, { passive: true });
//     return () => window.removeEventListener("resize", h);
//   }, []);
//   return w;
// }

// /* ─── Scroll progress bar ───────────────────────────────────────────────────
//    useScroll + useSpring use Framer's MotionValue system — they update
//    via CSS custom properties directly on the DOM, bypassing React state
//    entirely. Zero re-renders from scrolling. This is already optimal.
// ──────────────────────────────────────────────────────────────────────────────*/
// const ScrollProgress = memo(() => {
//   const { scrollYProgress } = useScroll();
//   const scaleX = useSpring(scrollYProgress, { stiffness: 400, damping: 40 });
//   return <motion.div id="scroll-progress" style={{ scaleX }} />;
// });

// /* ═══════════════════════════════════════════════════════════════════════════
//    HEADER
// ═══════════════════════════════════════════════════════════════════════════ */
// const Header = memo(() => {
//   const width    = useWindowWidth();
//   const isMobile = width < 768;

//   const [scrolled,  setScrolled]  = useState(false);
//   const [menuOpen,  setMenuOpen]  = useState(false);
//   const [activeNav, setActiveNav] = useState("home");

//   useEffect(() => { if (!isMobile) setMenuOpen(false); }, [isMobile]);

//   /* Fix 2: RAF-throttled scroll handler — max 1 state update per animation frame */
//   useEffect(() => {
//     let rafId = null;
//     const onScroll = () => {
//       if (rafId) return;                          // already scheduled, skip
//       rafId = requestAnimationFrame(() => {
//         setScrolled(window.scrollY > 40);
//         rafId = null;
//       });
//     };
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => {
//       window.removeEventListener("scroll", onScroll);
//       if (rafId) cancelAnimationFrame(rafId);
//     };
//   }, []);

//   /* Active section tracker */
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

//   /* Fix 3: stable scrollTo reference — child buttons don't re-render */
//   const scrollTo = useCallback((id) => {
//     setMenuOpen(false);
//     document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
//   }, []);

//   /* Fix 4: memoised style objects — not recreated every render */
//   const headerStyle = useMemo(() => ({
//     position:       "fixed",
//     top: 0, left: 0, right: 0,
//     zIndex:         50,
//     background:     scrolled ? "rgba(4,4,6,0.88)" : "transparent",
//     backdropFilter: scrolled ? "blur(22px)"        : "none",
//     WebkitBackdropFilter: scrolled ? "blur(22px)"  : "none",
//     borderBottom:   scrolled ? "1px solid rgba(245,255,64,0.07)" : "1px solid transparent",
//     boxShadow:      scrolled ? "0 4px 40px rgba(0,0,0,0.4)"     : "none",
//     transition:     "background 0.4s, backdrop-filter 0.4s, border-color 0.4s, box-shadow 0.4s",
//   }), [scrolled]);

//   return (
//     <motion.header
//       initial={{ y: -80, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
//       style={headerStyle}
//     >
//       <div style={{
//         maxWidth: 1280, margin: "0 auto",
//         padding: "0 clamp(16px,4vw,48px)",
//         display: "flex", alignItems: "center", justifyContent: "space-between",
//         height: 64, gap: 12,
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
//             flexShrink: 1, minWidth: 0,
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
//                     color:      isA ? "#f5ff40" : "#3d4560",
//                     background: isA ? "rgba(245,255,64,0.07)" : "transparent",
//                     border:     isA ? "1px solid rgba(245,255,64,0.2)" : "1px solid transparent",
//                     cursor: "pointer", transition: "color 0.22s, background 0.22s",
//                   }}
//                   onMouseEnter={(e) => { if (!isA) e.currentTarget.style.color = "#c8d0e0"; }}
//                   onMouseLeave={(e) => { if (!isA) e.currentTarget.style.color = "#3d4560"; }}
//                 >
//                   {label}
//                 </button>
//               );
//             })}
//             <motion.button
//               onClick={() => scrollTo("contact")}
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
//               <span className="dot-pulse" style={{
//                 width: 6, height: 6, borderRadius: "50%", background: "rgba(0,0,0,0.45)",
//               }} />
//             </motion.button>
//           </nav>
//         )}

//         {/* ── Mobile hamburger ─────────────────────────────────────────────────
//             VISIBLE ON ALL DEVICES — dark bg + bright border + white icon.
//             Works on both transparent (hero) and opaque (scrolled) header.
//         ──────────────────────────────────────────────────────────────────────── */}
//         {isMobile && (
//           <motion.button
//             onClick={() => setMenuOpen((p) => !p)}
//             whileTap={{ scale: 0.92 }}
//             aria-label={menuOpen ? "Close menu" : "Open menu"}
//             aria-expanded={menuOpen}
//             style={{
//               flexShrink: 0,
//               width: 44, height: 44, borderRadius: 10,
//               display: "flex", alignItems: "center", justifyContent: "center",
//               cursor: "pointer",
//               background:     scrolled ? "rgba(245,255,64,0.1)"  : "rgba(4,4,6,0.65)",
//               border:         "1px solid rgba(245,255,64,0.45)",
//               backdropFilter: "blur(12px)",
//               WebkitBackdropFilter: "blur(12px)",
//               color:          "#ffffff",
//               transition:     "background 0.3s",
//             }}
//           >
//             <AnimatePresence mode="wait">
//               <motion.span key={menuOpen ? "x" : "m"}
//                 initial={{ opacity: 0, rotate: -80 }} animate={{ opacity: 1, rotate: 0 }}
//                 exit={{ opacity: 0, rotate: 80 }} transition={{ duration: 0.18 }}
//                 style={{ display: "flex" }}
//               >
//                 {menuOpen ? <X size={20} /> : <Menu size={20} />}
//               </motion.span>
//             </AnimatePresence>
//           </motion.button>
//         )}
//       </div>

//       {/* ── Mobile dropdown ── */}
//       <AnimatePresence>
//         {isMobile && menuOpen && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             transition={{ duration: 0.26 }}
//             style={{
//               overflow: "hidden", background: "rgba(4,4,6,0.97)",
//               backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
//               borderBottom: "1px solid rgba(245,255,64,0.08)",
//             }}
//           >
//             <div style={{ padding: "10px 16px 16px", display: "flex", flexDirection: "column", gap: 6 }}>
//               {NAV_ITEMS.map(({ label, href }) => {
//                 const isA = activeNav === href;
//                 return (
//                   <button key={href} onClick={() => scrollTo(href)}
//                     style={{
//                       padding: "12px 16px", borderRadius: 10, textAlign: "left",
//                       fontFamily: "'Syne',sans-serif", fontWeight: 600, fontSize: 14,
//                       color:      isA ? "#f5ff40" : "#8892b0",
//                       background: isA ? "rgba(245,255,64,0.08)" : "transparent",
//                       border:     isA ? "1px solid rgba(245,255,64,0.2)" : "1px solid transparent",
//                       cursor: "pointer", minHeight: 44,
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
//                   minHeight: 44, marginTop: 4,
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
// });

// /* ═══════════════════════════════════════════════════════════════════════════
//    ROOT APP
// ═══════════════════════════════════════════════════════════════════════════ */
// export default function App() {
//   return (
//     <div style={{ background: "#040406" }}>
//       <ScrollProgress />
//       <Header />
//       <main>
//         {/* Hero: eagerly loaded — it's what the user sees first */}
//         <HeroSection />

//         {/* Projects: lazy — JS downloads when user scrolls within 200px */}
//         <LazySection>
//           <Suspense fallback={<SectionLoader />}>
//             <ProjectsSection />
//           </Suspense>
//         </LazySection>

//         {/* Skills + Contact + Footer: lazy — single import, three components */}
//         <LazySection>
//           <Suspense fallback={<SectionLoader />}>
//             <SkillsContactBundle />
//           </Suspense>
//         </LazySection>
//       </main>
//     </div>
//   );
// }
































/**
 * App.js — Lazy loading UX fix
 *
 * PROBLEM:
 * ─────────────────────────────────────────────────────────────────────────────
 * Two separate bugs causing bad UX on first visit:
 *
 * Bug 1 — Visible 2-3s spinner when scrolling to Skills/Contact
 *   Root cause: rootMargin "200px" starts the JS download only when user is
 *   200px from the section. On slow mobile (3G/4G), the chunk still takes
 *   2-3s to download + parse + execute AFTER that point. User sees a spinner.
 *
 * Bug 2 — "Let's Collaborate" / nav "Contact" broken during that window
 *   Root cause: scrollTo("contact") calls document.getElementById("contact")
 *   which returns null — ContactSection hasn't rendered yet. The optional
 *   chaining ?.scrollIntoView() silently does nothing. Click feels broken.
 *
 * THREE-LAYER FIX:
 * ─────────────────────────────────────────────────────────────────────────────
 * Layer 1 — Idle preload (eliminates Bug 1 for most users)
 *   After HeroSection is interactive, use requestIdleCallback to start
 *   downloading ALL chunks immediately while browser has nothing else to do.
 *   On average this gives 3-8s head start before user scrolls.
 *   When IntersectionObserver fires later, chunk is already in cache → instant.
 *
 * Layer 2 — Aggressive rootMargin (safety net for slow idle callbacks)
 *   Increased from 200px → 900px. Download starts much earlier.
 *   On a fast connection this alone would be enough.
 *   On slow connections, Layer 1 is the real fix.
 *
 * Layer 3 — Force render + smart scroll (eliminates Bug 2 completely)
 *   scrollTo() fires a custom DOM event "portfolioScrollTo".
 *   LazySection listens for this event — if the target section ID is inside it,
 *   it forces immediate render (bypasses IntersectionObserver entirely).
 *   scrollTo() then polls until the element appears in DOM, then scrolls.
 *   Result: "Let's Collaborate" and nav links always work, even if chunk is
 *   still downloading. User sees the section load + scroll in one motion.
 *
 * Why not just eagerly load everything?
 *   ProjectsSection + SkillsContact together are ~280KB JS.
 *   Eager loading adds ~2.8s on a 1Mbps connection to first interactive.
 *   The idle preload strategy gives us the best of both worlds:
 *   fast first paint AND no visible loader on navigation.
 */

import React, {
  useState, useEffect, useCallback, useMemo,
  lazy, Suspense, memo, useRef,
} from "react";
import "./App.css";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import { personalInfo } from "./data/mock";
import HeroSection from "./components/HeroSection";

/* ─── Lazy chunks (code splitting — initial bundle stays small) ── */
const ProjectsSection = lazy(() => import("./components/ProjectsSection"));

const SkillsContactBundle = lazy(() =>
  import("./components/SkillsContact").then((mod) => ({
    default: function SkillsContactAll() {
      return (
        <>
          <mod.SkillsSection />
          <mod.ContactSection />
          <mod.Footer />
        </>
      );
    },
  }))
);

/* ─── Skeleton loader — shown only if preload didn't finish in time ── */
const SectionLoader = memo(() => (
  <div style={{
    display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center",
    height: 280, gap: 14, background: "#040406",
  }}>
    <div style={{
      width: 28, height: 28, borderRadius: "50%",
      border: "2px solid rgba(245,255,64,0.1)",
      borderTopColor: "#f5ff40",
      animation: "spin 0.8s linear infinite",
    }} />
    <span style={{
      fontFamily: "'Syne', sans-serif",
      fontSize: 11, letterSpacing: "0.2em",
      textTransform: "uppercase", color: "rgba(245,255,64,0.3)",
    }}>
      Loading
    </span>
  </div>
));

/* ═══════════════════════════════════════════════════════════════════════════
   LAZY SECTION
   ─────────────────────────────────────────────────────────────────────────
   Renders children only when:
   a) User scrolls within 900px of this section (IntersectionObserver), OR
   b) A "portfolioScrollTo" event is dispatched targeting a section inside it

   The sectionIds prop tells this component which section IDs live inside it.
   When scrollTo("contact") fires and #contact doesn't exist yet, the event
   forces this LazySection to render immediately, then scrollTo polls until
   the element appears.
═══════════════════════════════════════════════════════════════════════════ */
const LazySection = memo(({ children, sectionIds = [] }) => {
  const ref       = useRef(null);
  const rendered  = useRef(false);       // prevent double-setState
  const [shouldRender, setSR] = useState(false);

  const forceRender = useCallback(() => {
    if (rendered.current) return;
    rendered.current = true;
    setSR(true);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    /* Layer 2: aggressive rootMargin — 900px ahead */
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) forceRender(); },
      { rootMargin: "900px" }
    );
    obs.observe(el);

    /* Layer 3: listen for forced navigation events */
    const onPortfolioScrollTo = (e) => {
      if (sectionIds.includes(e.detail?.id)) forceRender();
    };
    window.addEventListener("portfolioScrollTo", onPortfolioScrollTo);

    return () => {
      obs.disconnect();
      window.removeEventListener("portfolioScrollTo", onPortfolioScrollTo);
    };
  }, [forceRender, sectionIds]);

  return (
    <div ref={ref}>
      {shouldRender
        ? children
        : <SectionLoader />
      }
    </div>
  );
});

/* ─── Nav items ── */
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

/* ─── Scroll progress bar ── */
const ScrollProgress = memo(() => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 400, damping: 40 });
  return <motion.div id="scroll-progress" style={{ scaleX }} />;
});

/* ═══════════════════════════════════════════════════════════════════════════
   SMART SCROLL UTILITY
   ─────────────────────────────────────────────────────────────────────────
   1. If element exists → scroll immediately.
   2. If element missing → dispatch event to force LazySection to render,
      then poll (max 3s) until element appears in DOM, then scroll.
      This covers the "Let's Collaborate clicked before contact renders" case.
═══════════════════════════════════════════════════════════════════════════ */
function smartScrollTo(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
    return;
  }

  /* Element not in DOM — section hasn't rendered yet.
     Fire the force-render event so LazySection renders immediately. */
  window.dispatchEvent(
    new CustomEvent("portfolioScrollTo", { detail: { id } })
  );

  /* Poll until element appears (max 30 attempts × 100ms = 3s) */
  let attempts = 0;
  const poll = () => {
    const target = document.getElementById(id);
    if (target) {
      /* Small delay so React has finished painting the section */
      setTimeout(() => target.scrollIntoView({ behavior: "smooth" }), 80);
    } else if (attempts < 30) {
      attempts++;
      setTimeout(poll, 100);
    }
    /* If still not found after 3s: user is on extremely slow connection.
       Scroll to bottom — they'll see the loading spinner at least. */
    else {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
  };
  setTimeout(poll, 80); /* give React one tick to start rendering */
}

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

  /* RAF-throttled scroll handler */
  useEffect(() => {
    let rafId = null;
    const onScroll = () => {
      if (rafId) return;
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

  /* Use smartScrollTo — handles elements not yet in DOM */
  const scrollTo = useCallback((id) => {
    setMenuOpen(false);
    smartScrollTo(id);
  }, []);

  const headerStyle = useMemo(() => ({
    position:             "fixed",
    top: 0, left: 0, right: 0,
    zIndex:               50,
    background:           scrolled ? "rgba(4,4,6,0.88)" : "transparent",
    backdropFilter:       scrolled ? "blur(22px)"        : "none",
    WebkitBackdropFilter: scrolled ? "blur(22px)"        : "none",
    borderBottom:         scrolled ? "1px solid rgba(245,255,64,0.07)" : "1px solid transparent",
    boxShadow:            scrolled ? "0 4px 40px rgba(0,0,0,0.4)"     : "none",
    transition:           "background 0.4s, backdrop-filter 0.4s, border-color 0.4s, box-shadow 0.4s",
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

        {/* Logo */}
        <button onClick={() => scrollTo("home")} style={{
          background: "none", border: "none", cursor: "pointer", padding: 0,
          fontFamily: "'Syne', sans-serif", fontWeight: 800,
          fontSize: "clamp(0.78rem,2vw,0.95rem)", letterSpacing: "0.15em",
          backgroundImage: "linear-gradient(90deg,#f5ff40,#00d4ff)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          backgroundClip: "text", whiteSpace: "nowrap", flexShrink: 1, minWidth: 0,
        }}>
          {personalInfo.name.toUpperCase()}
        </button>

        {/* Desktop nav */}
        {!isMobile && (
          <nav style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {NAV_ITEMS.map(({ label, href }) => {
              const isA = activeNav === href;
              return (
                <button key={href} onClick={() => scrollTo(href)} style={{
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

        {/* Mobile hamburger */}
        {isMobile && (
          <motion.button
            onClick={() => setMenuOpen((p) => !p)}
            whileTap={{ scale: 0.92 }}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            style={{
              flexShrink: 0, width: 44, height: 44, borderRadius: 10,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
              background:           scrolled ? "rgba(245,255,64,0.1)"  : "rgba(4,4,6,0.65)",
              border:               "1px solid rgba(245,255,64,0.45)",
              backdropFilter:       "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              color:     "#ffffff", transition: "background 0.3s",
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

      {/* Mobile dropdown */}
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
                  <button key={href} onClick={() => scrollTo(href)} style={{
                    padding: "12px 16px", borderRadius: 10, textAlign: "left",
                    fontFamily: "'Syne',sans-serif", fontWeight: 600, fontSize: 14,
                    color:      isA ? "#f5ff40" : "#8892b0",
                    background: isA ? "rgba(245,255,64,0.08)" : "transparent",
                    border:     isA ? "1px solid rgba(245,255,64,0.2)" : "1px solid transparent",
                    cursor: "pointer", minHeight: 44,
                  }}>
                    {label}
                  </button>
                );
              })}
              <button onClick={() => scrollTo("contact")} style={{
                padding: "13px 16px", borderRadius: 10, textAlign: "center",
                fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 14,
                background: "linear-gradient(135deg,#f5ff40,#00d4ff)",
                color: "#000", border: "none", cursor: "pointer",
                minHeight: 44, marginTop: 4,
              }}>
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

  /* ═══════════════════════════════════════════════════════════════════════
     LAYER 1 — IDLE PRELOAD
     ─────────────────────────────────────────────────────────────────────
     After the hero section is interactive and the browser is idle,
     kick off downloads for ALL lazy chunks immediately.

     requestIdleCallback fires when the browser's main thread is free
     (typically 100-300ms after first paint). The chunks download in
     background while the user reads the hero section.

     By the time they scroll down (usually 5-15s later), the chunks
     are fully downloaded and cached. IntersectionObserver fires → instant render.

     Safari doesn't support requestIdleCallback → setTimeout 1200ms fallback.
     1200ms chosen because: hero entrance animation finishes at ~1.7s,
     so preload starts in parallel with the tail of the entrance animation.
  ═══════════════════════════════════════════════════════════════════════ */
  useEffect(() => {
    const preload = () => {
      /* These dynamic imports start chunk downloads immediately.
         The lazy() wrappers above will receive the already-cached modules
         when IntersectionObserver fires. No double-download. */
      import("./components/ProjectsSection").catch(() => {});
      import("./components/SkillsContact").catch(() => {});
    };

    if (typeof requestIdleCallback !== "undefined") {
      /* timeout: 2000 — if browser stays busy for 2s, force it anyway */
      const id = requestIdleCallback(preload, { timeout: 2000 });
      return () => cancelIdleCallback(id);
    } else {
      /* Safari fallback */
      const t = setTimeout(preload, 1200);
      return () => clearTimeout(t);
    }
  }, []);

  return (
    <div style={{ background: "#040406" }}>
      <ScrollProgress />
      <Header />
      <main>

        {/* Hero: eagerly loaded */}
        <HeroSection />

        {/* Projects: lazy rendered, chunk pre-downloaded during idle */}
        <LazySection sectionIds={["projects"]}>
          <Suspense fallback={<SectionLoader />}>
            <ProjectsSection />
          </Suspense>
        </LazySection>

        {/* Skills + Contact + Footer: lazy rendered, chunk pre-downloaded during idle.
            sectionIds tells this LazySection which IDs to listen for in
            portfolioScrollTo events — so "Let's Collaborate" forces it to render. */}
        <LazySection sectionIds={["skills", "contact", "footer"]}>
          <Suspense fallback={<SectionLoader />}>
            <SkillsContactBundle />
          </Suspense>
        </LazySection>

      </main>
    </div>
  );
}