import { defineConfig } from "vite";
export default defineConfig({
  build: {
    assetsInlineLimit: 0,
  },
  test: {
    include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
  },
});
