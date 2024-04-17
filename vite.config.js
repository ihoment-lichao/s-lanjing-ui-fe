import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
const path = require("path");
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    chunkSizeWarningLimit: 1000,
    lib: {
      entry: path.resolve(__dirname, "./src/components/index.js"),
      name: "s-lanjing-ui",
      fileName: "s-lanjing-ui",
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        exports: "named",
        globals: { vue: "Vue" },
        // 分包
        // manualChunks(id) {
        //   if (id.includes("node_modules")) {
        //     return id
        //       .toString()
        //       .split("node_modules/")[1]
        //       .split("/")[0]
        //       .toString();
        //   }
        // },
      },
    },
  },
  resolve: {
    // 配置路径别名
    alias: {
      "@": path.resolve(__dirname, "./src"),
      views: "@/views",
      assets: "@/assets",
      components: "@components",
      router: "@/router",
      store: "@/store",
      extensions: ["", ".js", ".json", ".vue", ".scss", ".css"],
    },
  },
  css: {
    // extract: false,
    preprocessorOptions: {
      // 添加公共样式、scss变量
      scss: {
        additionalData: '@import "./src/scss/variable.scss";',
      },
    },
    postcss: {
      plugins: [
        // 移除打包element时的@charset警告
        {
          postcssPlugin: "internal:charset-removal",
          AtRule: {
            charset: (atRule) => {
              if (atRule.name === "charset") {
                atRule.remove();
              }
            },
          },
        },
      ],
    },
  },
});
