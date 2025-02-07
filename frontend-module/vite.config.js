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
                target: "http://www.dcco.kr/api/openData/code.json",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api2/, ""),
            },
        },

    },
});
