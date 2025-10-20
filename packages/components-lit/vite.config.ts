import UnoCSS from "unocss/vite";

import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    cssCodeSplit: true, // Combine all CSS into a single file
    lib: {
      entry: {
        button: "src/button/index.ts",
        header: "src/header/index.ts",
      },
      name: "ComponentsLit",
      formats: ["es", "cjs"],
      fileName: (format, name) => `${name}.${format}.js`,
    },
    rollupOptions: {
      external: ["lit"], // Exclude Lit from the bundle
      output: {
        globals: {
          lit: "Lit",
        },
      },
    },
  },
  plugins: [
    UnoCSS({
      mode: "shadow-dom",
    }),
    dts({
      insertTypesEntry: true, // Generate type declarations
    }),
  ],
});
