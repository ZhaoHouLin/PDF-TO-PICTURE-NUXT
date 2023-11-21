// https://nuxt.com/docs/api/configuration/nuxt-config
import path from "node:path"

export default defineNuxtConfig({
  devtools: { enabled: false },
  imports: {
    dirs: ["stores"],
  },
  modules: [
    "formidable",
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", "acceptHMRUpdate"],
      },
    ],
  ],
  vite: {
    optimizeDeps: {
      include:
        process.env.NODE_ENV === "development" ? ["naive-ui", "vueuc"] : [],
    },
    css: {
      preprocessorOptions: {
        stylus: {
          additionalData: `@import "${path.resolve(
            __dirname,
            "./assets/style.styl"
          )}"`,
        },
      },
    },
  },
  build: {
    transpile:
      process.env.NODE_ENV === "production"
        ? [
            "naive-ui",
            "vueuc",
            "@css-render/vue3-ssr",
            "@juggle/resize-observer",
          ]
        : ["@juggle/resize-observer"],
  },
  ssr: false,
  server: {
    port: 4040, // 設置伺服器的端口號
    host: "0.0.0.0", // 設置伺服器的主機地址
  },
})
