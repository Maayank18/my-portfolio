import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

export default defineConfig({
  plugins: [
    react(),
  ],

  define: {
    "process.env": {},
  },

  envPrefix: ["VITE_", "REACT_APP_"],

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    conditions: ["browser", "module", "main"],
    mainFields: ["browser", "module", "main"],
  },

  build: {
    target: "esnext",
    minify: true,
    sourcemap: false,
    reportCompressedSize: false,
    cssCodeSplit: true,
    assetsInlineLimit: 4096,

    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react-dom") || id.includes("react/")) {
              return "react-core";
            }
            if (id.includes("framer-motion")) {
              return "framer-motion";
            }
            if (id.includes("lucide-react")) {
              return "lucide";
            }
            if (id.includes("@radix-ui")) {
              return "radix";
            }
            if (id.includes("@emailjs")) {
              return "emailjs";
            }
          }
        },
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
      },
    },

    chunkSizeWarningLimit: 400,
  },

  server: {
    port: 3000,
    open: false,
    hmr: { overlay: true },
    fs: { strict: false },
  },

  css: {
    postcss: "./postcss.config.cjs",
    devSourcemap: true,
  },

  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "framer-motion",
      "@emailjs/browser",
      "@radix-ui/react-dialog",
    ],
    exclude: ["lucide-react"],
  },
});
