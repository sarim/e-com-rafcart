import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import { viteStaticCopy } from 'vite-plugin-static-copy'
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        transformAssetUrls: {
          includeAbsolute: false,
        },
      },
    }),
    viteStaticCopy({
      targets: [
        {
          src: 'src/assets/images/**/*.{jpg,jpeg,png,svg}',
          dest: '.'
        }
      ],
      flatten: false
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
