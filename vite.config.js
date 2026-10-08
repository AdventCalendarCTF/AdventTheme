import { cpSync, renameSync, rmSync } from "fs";
import { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // Copies fonts, images, and sounds into the build output.
    {
      name: "copy-static-assets",
      closeBundle() {
        cpSync(
          "./node_modules/@fortawesome/fontawesome-free/webfonts",
          "static/webfonts",
          { recursive: true },
        );
        cpSync("./node_modules/boosted/dist/fonts", "static/webfonts", {
          recursive: true,
        });
        cpSync("./assets/img", "static/img", { recursive: true });
        cpSync("./assets/sounds", "static/sounds", { recursive: true });
      },
    },
    // CTFd expects the manifest at static/manifest.json.
    // Vite >= 5 writes it to static/.vite/manifest.json instead.
    {
      name: "flatten-vite-manifest",
      closeBundle() {
        renameSync("static/.vite/manifest.json", "static/manifest.json");
        rmSync("static/.vite", { recursive: true });
      },
    },
  ],
  resolve: {
    alias: {
      "~": resolve(__dirname, "./node_modules/"),
    },
  },
  build: {
    manifest: true,
    outDir: "static",
    rollupOptions: {
      output: {
        manualChunks: {
          echarts: ["echarts", "zrender"],
        },
      },
      input: {
        index: resolve(__dirname, "assets/js/index.js"),
        page: resolve(__dirname, "assets/js/page.js"),
        setup: resolve(__dirname, "assets/js/setup.js"),
        settings: resolve(__dirname, "assets/js/settings.js"),
        challenges: resolve(__dirname, "assets/js/challenges.js"),
        scoreboard: resolve(__dirname, "assets/js/scoreboard.js"),
        notifications: resolve(__dirname, "assets/js/notifications.js"),
        teams_public: resolve(__dirname, "assets/js/teams/public.js"),
        teams_private: resolve(__dirname, "assets/js/teams/private.js"),
        teams_list: resolve(__dirname, "assets/js/teams/list.js"),
        users_public: resolve(__dirname, "assets/js/users/public.js"),
        users_private: resolve(__dirname, "assets/js/users/private.js"),
        users_list: resolve(__dirname, "assets/js/users/list.js"),
        main: resolve(__dirname, "assets/scss/main.scss"),
        color_mode_switcher: resolve(__dirname, "assets/js/color_mode_switcher.js"),
      },
    },
  },
});
