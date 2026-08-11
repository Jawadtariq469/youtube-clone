import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      "/search-suggestions": {
        target: "https://suggestqueries.google.com",

        changeOrigin: true,

        rewrite: (path) => path.replace(/^\/search-suggestions/, ""),
      },
    },
  },
});
