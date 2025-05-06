import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': '/src' // 确保路径别名正确
        }
    },
    server: {
        host: "localhost",
        port: 5173,
        open: true // 自动打开浏览器
    },
    css: {
        devSourcemap: false // 临时关闭开发环境 SourceMap
    }
});