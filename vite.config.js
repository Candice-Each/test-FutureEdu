import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
    base: "/test-FutureEdu/",          // ← 关键：GitHub Pages 子路径
    plugins: [vue()],
    resolve: {
        alias: {
            // 用绝对路径，避免部署到子路径 / Windows 下解析出错
            "@": fileURLToPath(new URL("./src", import.meta.url))
        }
    },
    server: {
        host: "localhost",
        port: 5173,
        open: true
    },
    css: {
        devSourcemap: false
    }
});
