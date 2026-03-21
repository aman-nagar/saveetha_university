// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // Root alias for src directory
      "@": path.resolve(__dirname, "./src"),
      // Feature-specific aliases
      "@api": path.resolve(__dirname, "./src/api"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@context": path.resolve(__dirname, "./src/context"),
      "@layouts": path.resolve(__dirname, "./src/layouts"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@constants": path.resolve(__dirname, "./src/constants"),
    },
  },
  // Build optimization for SEO
  build: {
    rollupOptions: {
      output: {
        // Helps with caching and performance
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
        },
      },
    },
  },
  // Note: For pre-rendering, consider using prerender-spa-plugin
  // Install: npm install prerender-spa-plugin --save-dev
  // Then uncomment the section below:
  /*
  plugins: [
    react(),
    tailwindcss(),
    // PrerenderSpaPlugin({
    //   staticDir: path.join(__dirname, 'dist'),
    //   routes: [
    //     '/',
    //     '/about',
    //     '/contact',
    //     '/wiep-Form',
    //     '/apply-admission',
    //     '/academics',
    //     '/gallery',
    //     '/news',
    //   ],
    // }),
  ],
  */
});
