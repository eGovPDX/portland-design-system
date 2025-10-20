import postcss from "esbuild-postcss";
import glob from "fast-glob";
import { defineConfig } from "tsup";

// Find all index.ts files under src/elements, src/components, src/layouts
const entryPoints = glob.sync(["src/**/index.ts", "src/tailwind.css"]);

export default defineConfig({
  entry: entryPoints,
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  outDir: "dist",
  target: "esnext",
  esbuildPlugins: [postcss()],
});
