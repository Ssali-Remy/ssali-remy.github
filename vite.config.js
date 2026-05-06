import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Use './' so the build works under any path (GitHub Pages project sites
// are served from /<repo-name>/, custom domains from /, etc.)
export default defineConfig({
  plugins: [react()],
  base: "./",
});
