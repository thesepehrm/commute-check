import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { fileURLToPath } from "url";
import path from "path";

// Use import.meta.url to get the directory name in ESM
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  const isProd = mode === "production";

  return {
    plugins: [svelte()],
    build: {
      outDir: "dist",
      minify: isProd ? "terser" : false,
      terserOptions: isProd
        ? {
            compress: {
              drop_console: true, // Remove console.log in production
              drop_debugger: true,
            },
          }
        : undefined,
      sourcemap: !isProd,
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, "index.html"),
          background: path.resolve(__dirname, "src/background.ts"),
        },
        output: {
          entryFileNames: (chunkInfo) => {
            return chunkInfo.name === "background"
              ? "[name].js"
              : "assets/[name].[hash].js";
          },
          chunkFileNames: `assets/[name].[hash].js`,
          assetFileNames: `assets/[name].[hash].[ext]`,
        },
      },
    },
  };
});
