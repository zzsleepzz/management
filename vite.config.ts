import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import Component from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Component({
      resolvers: [NaiveUiResolver()],
      dts: "src/types/components.d.ts",
    }),
    AutoImport({
      imports: ["vue", "vue-router"],
      dts: "src/types/auto-import.d.ts",
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {},
    },
  },
});
