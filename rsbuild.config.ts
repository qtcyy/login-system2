import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
  plugins: [pluginReact()],
  server: {
    proxy: {
      "/api": "http://localhost:3000",
      "/user": "http://localhost:8080",
    },
  },
});
