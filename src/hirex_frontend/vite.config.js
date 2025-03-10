import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "url";
import EnvironmentPlugin from "vite-plugin-environment";
import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    EnvironmentPlugin([
      "DFX_VERSION",
      "DFX_NETWORK",
      "CANISTER_ID_HIREX_FRONTEND",
      "CANISTER_ID_HIREX_BACKEND",
      "CANISTER_ID_INTERNET_IDENTITY",
      "CANISTER_ID",
      "CANISTER_CANDID_PATH",
    ]),
  ],
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:4943',
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: [
      {
        find: "declarations",
        replacement: fileURLToPath(new URL("../declarations", import.meta.url)),
      },
      {
        find: "@",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
    ],
  },
});
