import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/cli/build.ts", "src/cli/watch.ts", "src/utils.ts"],
  outDir: "dist",
  format: ["esm"],
  target: "node24",
  platform: "node",
  clean: true,
  dts: true,
  sourcemap: true,
  treeshake: true,
  minify: true,
  shims: false,
  outExtensions: () => ({ js: ".js" }),
  deps: {
    neverBundle: ["prettier", "style-dictionary"],
    alwaysBundle: [/^\.\/src\//],
  },
});
