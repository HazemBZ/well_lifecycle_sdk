import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tagger from "@dhiwise/component-tagger";

// https://vitejs.dev/config/
export default defineConfig({
  // This changes the out put dir from dist to build
  // comment this out if that isn't relevant for your project
  build: {
    outDir: "build",
    chunkSizeWarningLimit: 2000,
  },
  plugins: [tsconfigPaths(), react(), tagger()],
  server: {
    port: "4028",
    host: "0.0.0.0",
    strictPort: true,
    cors: true,
    // cors: {
    //   allowedHeaders: "*",
    //   origin: "*",
    //   // methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    //   methods: "*",
    //   credentials: false,
    //   exposedHeaders: ["Content-Length", "X-JSON"],
    //   optionsSuccessStatus: 204, // some legacy browsers (IE11, various
    //   preflightContinue: true,
    // },
    allowedHosts: true
    // proxy: {
    //   "/api": {
    //     target: "http://localhost:3000",
    //     secure: false,
    //     changeOrigin: true,
    //     rewrite: (path) => {
    //       console.log(path);
    //       // return path.replace(/^\/api/, "");
    //       return path
    //     },
    //   },
    // },
    // allowedHosts: [".amazonaws.com", ".builtwithrocket.new", "*"],
  },
});
