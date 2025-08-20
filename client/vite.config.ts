import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import viteCompression from "vite-plugin-compression";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    react(),
    viteCompression({ algorithm: "brotliCompress" }), // Enable Brotli compression
    viteCompression({ algorithm: "gzip" }), // (Optional) Also enable gzip
    // Bundle analyzer - generates stats.html after build
    visualizer({
      filename: "dist/stats.html",
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      treeshake: true,
      output: {
        manualChunks(id) {
          // Split major UI libraries into separate chunks for better caching
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
          // Group smaller utility libraries together
          if (id.includes("clsx") || id.includes("class-variance-authority") || id.includes("tailwind-merge")) {
            return "utils";
          }
          // Keep React core separate
          if (id.includes("react") || id.includes("react-dom")) {
            return "react-vendor";
          }
          // Everything else from node_modules goes to vendor
          if (id.includes("node_modules")) {
            return "vendor";
          }
          // Split icons into separate chunk
          if (id.includes("src/components/Icons")) {
            return "icons";
          }
        },
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",
      },
    },
    // assetsInlineLimit: 0,
  },
  cacheDir: "node_modules/.vite",
  // Removed invalid property 'packageManager'
  // scripts: {
  //   preinstall: "corepack prepare pnpm@10.x --activate",
  // },
});
