import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import type { ConfigEnv } from "vite";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig((env: ConfigEnv) => ({
  // For Vercel deployment, base should always be "/"
  base: "/",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    env.mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      // Use project root to avoid ESM __dirname gymnastics
      "@": path.resolve(process.cwd(), "./src"),
    },
  },
}));
