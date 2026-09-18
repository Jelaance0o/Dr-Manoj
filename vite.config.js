import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Standard Vite + React setup. No SSR/Next.js — plain client-rendered SPA.
export default defineConfig({
  plugins: [react()],
});
