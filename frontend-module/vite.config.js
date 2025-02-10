import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: [{find: "@", replacement: "/src"}],
    },
    server: {
        proxy: {
            "/test": {
                target: "https://apis.data.go.kr",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/test/, ""),
            },
            "/api2": {
                target: "https://www.dcco.kr",  // https로 변경
                changeOrigin: true,  // CORS 문제 해결을 위해 원본 출처를 변경
                rewrite: (path) => path.replace(/^\/api2/, "/api/openData/code.json"),
            },
            "/wasteStats": {
                target: "https://www.recycling-info.or.kr",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/wasteStats/, ""),
            }
        },

    },
});
