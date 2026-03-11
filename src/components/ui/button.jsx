import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

/* ---------------- variants (unchanged) ---------------- */

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

/* ---------------- Particles (portal) ---------------- */
/* Particles are rendered into document.body to avoid being clipped/affected by transforms
   or stacking contexts inside your app root. We center each particle at (left, top)
   and translate(-50%,-50%) so position is exact.
*/

function ParticlePortal({ rect, isVisible }) {
  // don't render portal if no rect or not visible
  if (!rect || !isVisible || typeof window === "undefined") return null;

  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const particles = [...Array(8)].map((_, i) => {
    const dx = (i % 2 ? 1 : -1) * (Math.random() * 60 + 20);
    const dy = -Math.random() * 60 - 20;
    return (
      <motion.span
        key={i}
        initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
        animate={{
          scale: [0, 1, 0],
          x: dx,
          y: dy,
          opacity: [1, 1, 0],
        }}
        transition={{
          duration: 0.7,
          delay: i * 0.04,
          ease: "easeOut",
        }}
        // Use tailwind classes for visual style; adjust if you want different color
        className="fixed h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)] pointer-events-none"
        style={{
          left: centerX,
          top: centerY,
          transform: "translate(-50%, -50%)", // center the particle on the point
          zIndex: 9999,
        }}
      />
    );
  });

  return createPortal(<AnimatePresence>{particles}</AnimatePresence>, document.body);
}

/* ---------------- Button ---------------- */

const Button = React.forwardRef(
  ({ className, variant, size, children, onClick, ...props }, forwardedRef) => {
    // local ref for measurement
    const localRef = React.useRef(null);

    // merged ref setter so users can still pass a ref
    const setRefs = React.useCallback(
      (node) => {
        localRef.current = node;
        if (!forwardedRef) return;
        if (typeof forwardedRef === "function") forwardedRef(node);
        else forwardedRef.current = node;
      },
      [forwardedRef]
    );

    // rect state measured on click using useLayoutEffect to avoid flicker
    const [rect, setRect] = React.useState(null);
    const [showParticles, setShowParticles] = React.useState(false);

    // measure and show particles on click
    const handleClick = (e) => {
      // measure synchronously after paint using requestAnimationFrame + layout effect pattern
      // we set showParticles after measurement so the portal has coords
      const node = localRef.current;
      if (!node) {
        // fallback: still call onClick
        onClick?.(e);
        return;
      }

      // read bounding box
      const r = node.getBoundingClientRect();
      setRect(r);
      setShowParticles(true);

      // hide after duration
      window.setTimeout(() => {
        setShowParticles(false);
      }, 700);

      // preserve user onClick
      onClick?.(e);
    };

    return (
      <>
        {/* Portal-based particles */}
        <ParticlePortal rect={rect} isVisible={showParticles} />

        <button
          ref={setRefs}
          onClick={handleClick}
          className={cn(
            buttonVariants({ variant, size }),
            showParticles && "scale-95",
            "transition-transform duration-100",
            className
          )}
          {...props}
        >
          {children}
        </button>
      </>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };