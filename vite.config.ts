import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import type { ConfigEnv } from "vite";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig((env: ConfigEnv) => ({
  // When deploying to GitHub Pages project site, assets must be served from
  // the repository subpath. Vite exposes this as import.meta.env.BASE_URL,
  // which we also pass to React Router's BrowserRouter as basename.
  base: env.mode === "production" ? "/galib-folio-forge/" : "/",
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
