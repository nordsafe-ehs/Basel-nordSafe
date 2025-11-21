import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "robots.txt", "apple-touch-icon.png"],
      devOptions: {
        enabled: true, // 👈 Add this to enable PWA in development
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
        navigateFallback: "index.html",
      },
      manifest: {
        name: "NordSafe EHS",
        short_name: "NordSafe EHS",
        theme_color: "#3a7659",
        background_color: "#fff",
        display: "fullscreen",
        orientation: "portrait",
        start_url: "/",
        icons: [
          {
            src: "/logo 192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/logo 512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
