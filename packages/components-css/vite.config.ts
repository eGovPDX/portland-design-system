import { readdirSync, writeFileSync, unlinkSync, existsSync } from "fs";
import { EOL } from "os";
import { basename, resolve, extname } from "path";
import tailwind from "@tailwindcss/vite";
import { defineConfig } from "vite";

const COMPONENTS_DIR = resolve(__dirname, "src");
const BARREL_PATH = resolve(COMPONENTS_DIR, "index.css");

// Find all component CSS files (excluding base files like preflight)
const baseFiles = ["preflight.css", "base.css"];

const all = readdirSync(COMPONENTS_DIR, {
  recursive: true,
  encoding: "utf-8",
  withFileTypes: true,
})
  .filter((dirent) => dirent.isFile())
  .map((dirent) => dirent.name)
  .filter((file) => extname(file) === ".css")
  .filter((file) => file !== "index.css");

// Separate base/utility files from component files
const components = all.filter((file) => !baseFiles.includes(file));

// Build entry points for individual files
const entries = components.reduce(
  (entries, file) => {
    entries[basename(file, ".css")] = resolve(COMPONENTS_DIR, file);
    return entries;
  },
  {} as Record<string, string>
);

export default defineConfig(({ mode }) => {
  return {
    build: {
      outDir: "dist",
      emptyOutDir: true,
      cssMinify: "lightningcss",
      // Only set watch config when in watch mode to prevent always-watching
      watch:
        mode === "development"
          ? {
              chokidar: {
                ignored: (path: string) => resolve(path) === BARREL_PATH,
              },
            }
          : null,
      lib: {
        name: "ComponentsCSS",
        entry: {
          // Individual component files
          ...entries,
          // Generated barrel file outputs as main.css
          main: BARREL_PATH,
        },
        // Only build one format since this is CSS-only, format name is irrelevant
        formats: ["es"],
      },
      cssCodeSplit: true,
    },
    css: {
      transformer: "lightningcss",
    },
    plugins: [
      /**
       * Plugin to generate a barrel CSS file that imports all component CSS files.
       * Creates a real file before build and cleans it up after.
       */
      {
        name: "generate-barrel",
        buildStart() {
          const content = [
            "/* Auto-generated file - do not edit */",
            "",
            // Generate imports: base files first, then component files alphabetically
            ...[
              ...baseFiles.filter((f) => all.includes(f)),
              ...components.sort(),
            ].map((f) => `@import "${resolve(COMPONENTS_DIR, f)}";`),
          ];

          // Generate the barrel file before build starts
          writeFileSync(BARREL_PATH, content.join(EOL));
        },
        closeBundle() {
          // Only clean up in non-watch mode
          // In watch mode, keep the file to avoid regenerating on each rebuild
          if (existsSync(BARREL_PATH)) {
            unlinkSync(BARREL_PATH);
          }
        },
      },
      tailwind(),
    ],
  };
});
