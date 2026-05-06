import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

// SINGLE_FILE=1 npm run build → dist-single/index.html (everything inlined)
// otherwise → standard multi-file dist/
const singleFile = process.env.SINGLE_FILE === "1";

export default defineConfig({
  plugins: [react(), ...(singleFile ? [viteSingleFile()] : [])],
  base: "./",
  build: {
    outDir: singleFile ? "dist-single" : "dist",
  },
});
