// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import tailwindcss from "@tailwindcss/vite";
// import dotenv from "dotenv";

// dotenv.config();
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), tailwindcss()],
//   define: {
//     global: "window", // <-- polyfill `global` as `window`
//   },
//   server: {
//     proxy: {
//       "/users": API_BASE_URL,
//       "/company": API_BASE_URL,
//       "/job": API_BASE_URL,
//       "/jobpost": API_BASE_URL,
//       "/chat": API_BASE_URL,
//     },
//   },
// });
