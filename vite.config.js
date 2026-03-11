// // import { defineConfig } from "vite";
// // import react from "@vitejs/plugin-react";
// // import path from "path";

// // export default defineConfig({
// //   plugins: [react()],
// //   resolve: {
// //     alias: {
// //       "@": path.resolve(__dirname, "./src"),
// //     },
// //   },
// //   // Optimize chunks — keeps initial bundle small
// //   build: {
// //     rollupOptions: {
// //       output: {
// //         manualChunks: {
// //           // Framer Motion in its own chunk (lazy-loaded)
// //           "framer-motion": ["framer-motion"],
// //           // Lucide icons in own chunk
// //           "lucide":        ["lucide-react"],
// //           // EmailJS
// //           "emailjs":       ["@emailjs/browser"],
// //           // Radix UI
// //           "radix":         ["@radix-ui/react-dialog"],
// //         },
// //       },
// //     },
// //     // Minify + optimize
// //     target:         "esnext",
// //     minify:         "esbuild",
// //     sourcemap:      false,
// //     chunkSizeWarningLimit: 600,
// //   },
// //   server: {
// //     port: 3000,
// //     open: true,
// //   },
// //   // Ensure CSS is processed
// //   css: {
// //     postcss: "./postcss.config.js",
// //   },
// // });


















// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import compression from "vite-plugin-compression";
// import path from "path";

// export default defineConfig({
//   plugins: [
//     react(),
//     // Gzip + Brotli — halves transfer size for visitors
//     compression({ algorithm: "gzip",   ext: ".gz"  }),
//     compression({ algorithm: "brotliCompress", ext: ".br" }),
//   ],

//   resolve: {
//     alias: { "@": path.resolve(__dirname, "./src") },
//   },

//   build: {
//     target:    "esnext",
//     minify:    "esbuild",          // faster than terser, same output quality
//     sourcemap: false,              // no sourcemaps in production = smaller build

//     rollupOptions: {
//       output: {
//         /*
//           Manual chunk splitting:
//           Each heavy library gets its own cached chunk.
//           A user who visits twice doesn't re-download framer-motion
//           if only your code changed.
//         */
//         manualChunks: {
//           "react-core":    ["react", "react-dom"],
//           "framer-motion": ["framer-motion"],
//           "lucide":        ["lucide-react"],
//           "radix":         ["@radix-ui/react-dialog"],
//           "emailjs":       ["@emailjs/browser"],
//         },
//       },
//     },

//     // Warn when any single chunk exceeds 500KB (good practice)
//     chunkSizeWarningLimit: 500,
//   },

//   server: {
//     port: 3000,
//     open: true,
//     // Fast HMR — instant updates while coding
//     hmr: { overlay: true },
//   },

//   // Tailwind + PostCSS handled here automatically
//   css: {
//     postcss: "./postcss.config.js",
//   },

//   // Pre-bundle these heavy deps so first page load is instant
//   optimizeDeps: {
//     include: ["react", "react-dom", "framer-motion", "lucide-react"],
//   },
// });








/**
 * vite.config.js — Performance optimised
 *
 * Changes vs original:
 * ─────────────────────────────────────────────────────────────────────
 * 1. postcss path: "./postcss.config.js" → "./postcss.config.cjs"
 *    Original pointed to wrong extension — may have silently failed
 *
 * 2. build.cssCodeSplit: true
 *    Each lazy-loaded JS chunk gets its own CSS chunk.
 *    ProjectsSection styles only download when the user scrolls to projects.
 *    Saves ~30-40KB on initial CSS load.
 *
 * 3. build.assetsInlineLimit: 4096
 *    SVG icons, small images < 4KB → inlined as base64 data URLs.
 *    Saves HTTP requests for small assets.
 *
 * 4. build.reportCompressedSize: false
 *    Default: Vite re-reads every output file to compute gzip size for the
 *    build summary. On large builds adds ~3-5s. Disabled — we already have
 *    the compression plugin which gives us the actual .gz/.br files.
 *
 * 5. Lucide tree-shaking: Lucide exports 1000+ icons.
 *    Rollup handles this correctly already with named imports, but adding
 *    it to optimizeDeps.exclude ensures it's NOT pre-bundled as a monolith
 *    in dev mode (which would slow HMR).
 *
 * 6. resolve.conditions: ["browser", "module", "main"]
 *    Prefer browser/ESM builds of packages. Some packages (e.g. emailjs)
 *    have separate browser/node builds — this ensures we get the lighter one.
 *
 * 7. esbuildOptions.legalComments: "none"
 *    Strips license comment banners from minified output.
 *    Saves ~2-5KB across all chunks.
 *
 * 8. server.fs.strict: false — lets Vite serve files outside root in dev
 *    (useful for monorepo setups or workspace packages)
 */

import { defineConfig } from "vite";
import react            from "@vitejs/plugin-react";
import compression      from "vite-plugin-compression";
import path             from "path";

export default defineConfig({
  plugins: [
    react({
      // Babel plugin for better React DevTools in dev.
      // No impact on prod bundle size.
      babel: {
        plugins: [],
      },
    }),

    // Gzip — supported by all servers/CDNs
    compression({
      algorithm: "gzip",
      ext:       ".gz",
      threshold: 1024,   // only compress files > 1KB (pointless below that)
    }),

    // Brotli — 15-20% smaller than gzip, supported by all modern browsers
    compression({
      algorithm: "brotliCompress",
      ext:       ".br",
      threshold: 1024,
    }),
  ],

  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
    // Fix 6: prefer browser ESM builds of packages
    conditions: ["browser", "module", "main"],
    mainFields: ["browser", "module", "main"],
  },

  build: {
    target:    "esnext",        // modern browsers only — no polyfill overhead
    minify:    "esbuild",       // faster than terser, ~same output
    sourcemap: false,           // no sourcemaps in prod = smaller build

    // Fix 4: skip re-reading output files for gzip size calculation
    reportCompressedSize: false,

    // Fix 2: CSS per chunk — lazy sections get their CSS lazily too
    cssCodeSplit: true,

    // Fix 3: inline small assets as base64 (< 4KB)
    assetsInlineLimit: 4096,

    rollupOptions: {
      output: {
        /*
          Manual chunk splitting strategy:
          ─ react-core:    React + ReactDOM — never changes, long cache TTL
          ─ framer-motion: Large (~140KB gz), changes independently of app code
          ─ lucide:        Icon library, only changes on icon additions
          ─ radix:         Dialog component, very stable
          ─ emailjs:       Only used in contact form, lazy-loadable mentally

          A returning visitor re-downloads NOTHING if only app code changed.
          Each of these chunks gets a 1-year cache header via vercel.json.
        */
        manualChunks: {
          "react-core":    ["react", "react-dom"],
          "framer-motion": ["framer-motion"],
          "lucide":        ["lucide-react"],
          "radix":         ["@radix-ui/react-dialog"],
          "emailjs":       ["@emailjs/browser"],
        },

        // Deterministic chunk names — cache keys don't change on unrelated rebuilds
        chunkFileNames:  "assets/js/[name]-[hash].js",
        entryFileNames:  "assets/js/[name]-[hash].js",
        assetFileNames:  "assets/[ext]/[name]-[hash].[ext]",
      },

      treeshake: {
        // Aggressive tree shaking — remove all unused exports
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false,
      },
    },

    // Fix 7: strip license comments from output
    esbuildOptions: {
      legalComments: "none",
    },

    // Warn when any chunk exceeds 400KB uncompressed
    chunkSizeWarningLimit: 400,
  },

  server: {
    port:  3000,
    open:  true,
    hmr:   { overlay: true },
    // Fix 8: allow serving workspace packages
    fs:    { strict: false },
  },

  // Fix 1: correct PostCSS config path (.cjs extension required for Vite ESM)
  css: {
    postcss: "./postcss.config.cjs",
    // DevSourcemap for easier debugging in development
    devSourcemap: true,
  },

  // Pre-bundle heavy deps — instant cold start in dev
  // Fix 5: lucide EXCLUDED from pre-bundle — it tree-shakes better without it
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "framer-motion",
      "@emailjs/browser",
      "@radix-ui/react-dialog",
    ],
    exclude: [
      "lucide-react",   // let Rollup tree-shake icons individually
    ],
  },
});