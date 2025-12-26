import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react({
      // React 19: Enhanced JSX runtime with optimizations
      jsxRuntime: "automatic",
    }),
    tailwindcss(),
    // Note: Vercel handles brotli/gzip compression automatically at the edge.
    visualizer({
      filename: "dist/stats.html",
      open: false,
      gzipSize: true,
      brotliSize: true,
      template: "treemap", // Better visualization
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    // Prevent multiple copies of React in the production bundle (can cause hooks dispatcher to be null).
    dedupe: ["react", "react-dom"],
  },
  build: {
    target: "es2022", // Modern target for better optimizations
    minify: "esbuild", // Faster minification
    // React 19: Enhanced module preloading
    modulePreload: {
      polyfill: false,
    },
    // React 19: Optimize chunk generation
    rollupOptions: {
      output: {
        manualChunks(id) {
          // More granular chunking for better caching
          if (id.includes("framer-motion")) {
            return "framer-motion";
          }
          if (id.includes("@radix-ui")) {
            return "radix-ui";
          }
          if (id.includes("lucide-react")) {
            return "lucide-react";
          }
          if (id.includes("react-intersection-observer")) {
            return "intersection-observer";
          }
          // Separate vendor libraries by size
          if (id.includes("node_modules")) {
            // Large libraries get their own chunks
            const isReact = /[\\/]node_modules[\\/]react[\\/]/.test(id);
            const isReactDom = /[\\/]node_modules[\\/]react-dom[\\/]/.test(id);
            if (isReact || isReactDom) {
              return "react-vendor";
            }
            // Medium-sized utilities
            if (
              id.includes("clsx") ||
              id.includes("class-variance-authority") ||
              id.includes("tailwind-merge")
            ) {
              return "utils";
            }
            // Everything else
            return "vendor";
          }
          // Component chunks by route/feature
          if (id.includes("src/components/")) {
            if (id.includes("ui/")) return "ui-components";
            if (id.includes("Hero") || id.includes("Navbar")) return "critical-components";
            return "feature-components";
          }
        },
        chunkFileNames: (_chunkInfo) => {
          // Add hashing for long-term caching
          return `assets/[name]-[hash].js`;
        },
        entryFileNames: "assets/[name]-[hash].js",
        assetFileNames: (assetInfo) => {
          // Organize assets by type
          const info = assetInfo.name.split(".");
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/css/i.test(ext)) {
            return `assets/styles/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
        // Enable module preloading
        inlineDynamicImports: false,
        preserveModules: false,
      },
    },
    // Asset optimization
    assetsInlineLimit: 4096, // Inline assets smaller than 4KB
    chunkSizeWarningLimit: 1000, // Warn for chunks larger than 1MB
    // Enable source maps for debugging (remove in production)
    sourcemap: false,
    // CSS code splitting
    cssCodeSplit: true,
  },
  // Optimization settings
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "@radix-ui/react-accordion",
      "@radix-ui/react-avatar",
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
      "framer-motion",
      "lucide-react",
    ],
    exclude: ["@vite/client", "@vite/env"],
  },
  // Server settings for development
  server: {
    hmr: {
      overlay: false, // Disable error overlay for better UX
    },
  },
  // Experimental features
  experimental: {
    renderBuiltUrl(filename) {
      // Custom asset URL handling for CDN
      return `/${filename}`;
    },
  },
  cacheDir: "node_modules/.vite",
});
