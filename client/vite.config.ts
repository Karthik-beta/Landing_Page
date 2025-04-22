import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import viteCompression from "vite-plugin-compression"; // Add this import

export default defineConfig({
  plugins: [
    react(),
    viteCompression({ algorithm: "brotliCompress" }), // Enable Brotli compression
    viteCompression({ algorithm: "gzip" }), // (Optional) Also enable gzip
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
          if (id.includes("node_modules")) {
            return "vendor";
          }
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
  packageManager: "pnpm@^10.0.0",
  scripts: {
    preinstall: "corepack prepare pnpm@latest --activate",
  },
});
