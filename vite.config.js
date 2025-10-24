import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    global: "window",
  },
  // Dev-server proxy to avoid CORS during local development.

  // server: {
  //   proxy: {
  //     // direct user endpoints used by this app (e.g. /users/public)
  //     "/users": {
  //       target: "http://localhost:8080",
  //       changeOrigin: true,
  //       secure: false,
  //     },
  //     // job-related endpoints
  //     "/job": {
  //       target: "http://localhost:8080",
  //       changeOrigin: true,
  //       secure: false,
  //     },
  //     // jobpost endpoints
  //     "/jobpost": {
  //       target: "http://localhost:8080",
  //       changeOrigin: true,
  //       secure: false,
  //     },
  //     // jobApplication endpoints
  //     "/jobApplication": {
  //       target: "http://localhost:8080",
  //       changeOrigin: true,
  //       secure: false,
  //     },
  //     // chat endpoints
  //     "/chat": {
  //       target: "http://localhost:8080",
  //       changeOrigin: true,
  //       secure: false,
  //     },
  //     // company endpoints
  //     "/company": {
  //       target: "http://localhost:8080",
  //       changeOrigin: true,
  //       secure: false,
  //     },
  //     // if your API is namespaced under /api, forward those too
  //     "/api": {
  //       target: "http://localhost:8080",
  //       changeOrigin: true,
  //       secure: false,
  //       rewrite: (path) => path.replace(/^\/api/, "/api"),
  //     },
  //   },
  // },
});
