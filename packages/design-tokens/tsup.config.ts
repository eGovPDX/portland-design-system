import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/cli/build.ts", "src/cli/watch.ts"],
  outDir: "dist",
  format: ["esm"],
  target: "node22",
  platform: "node",
  clean: true,
  splitting: true,
  sourcemap: true,
  dts: false,
  bundle: true,
  external: ["prettier", "style-dictionary"],
  noExternal: [/^\.\/src\//],
  treeshake: true,
  minify: true,
  keepNames: true,
  shims: false,
  esbuildOptions: (options) => {
    // Remove type-only imports
    options.banner = {
      js: `// @ts-nocheck`,
    };
  },
  outExtension: () => ({ js: ".js" }),
});
