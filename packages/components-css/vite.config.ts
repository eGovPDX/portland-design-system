import tailwind from "@tailwindcss/vite";
import { readdirSync } from "fs";
import { resolve } from "path";
import { defineConfig } from "vite";

// Dynamically find all .module.css files
const componentsDir = resolve(__dirname, "src");
const componentFiles = readdirSync(componentsDir, { recursive: true, encoding: "utf-8" })
  .filter((file) => file.endsWith(".css"))
  .reduce(
    (entries, file) => {
      const name = file.replace(".css", "");
      entries[name] = resolve(componentsDir, file);
      return entries;
    },
    {} as Record<string, string>
  );

export default defineConfig({
  build: {
    outDir: "dist",
    emptyOutDir: true,
    cssMinify: "lightningcss",
    lib: {
      name: "ComponentsCSS",
      entry: {
        ...componentFiles,
      },
    },
    // Generate minified versions
    cssCodeSplit: true,
  },
  plugins: [tailwind()],
});
