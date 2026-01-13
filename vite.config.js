import { svelte } from "@sveltejs/vite-plugin-svelte";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import webfontDownload from "vite-plugin-webfont-dl";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    tailwindcss(),
    webfontDownload(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["vite.svg", "apple-touch-icon.png"],
      manifest: {
        name: "OpenPeriods",
        short_name: "OpenPeriods",
        description: "An app to track menstrual cycles and provide health tips.",
        theme_color: "#89083E",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "vite.svg",
            sizes: "512x512",
            type: "image/svg+xml",
            purpose: "any maskable",
          },
        ],
        edge_side_panel: {
          preferred_width: 400,
        },
      },
    })
  ],
});
