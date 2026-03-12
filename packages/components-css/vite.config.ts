import {
  readdirSync,
  writeFileSync,
  unlinkSync,
  existsSync,
  readFileSync,
} from "fs";
import { EOL } from "os";
import { basename, resolve, extname } from "path";
import tailwind from "@tailwindcss/vite";
import { defineConfig } from "vite";

const COMPONENTS_DIR = resolve(__dirname, "src");
const BARREL_PATH = resolve(COMPONENTS_DIR, "index.css");
const BASE_PATH = resolve(COMPONENTS_DIR, "base.css");

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
  const baseContent = readFileSync(BASE_PATH, "utf-8");
  const watch = process.argv.includes("--watch") || process.argv.includes("-w");

  return {
    build: {
      outDir: "dist",
      emptyOutDir: true,
      // Only set watch config when in watch mode to prevent always-watching
      watch: watch
        ? {
            chokidar: {
              ignored: (path: string) =>
                [BARREL_PATH, BASE_PATH].includes(resolve(path)),
            },
          }
        : null,
      lib: {
        name: "components-css",
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
      {
        name: "generate-dark-mode",
        buildStart() {
          const variant =
            mode == "development"
              ? "@custom-variant dark (&:where(.dark, .dark *));"
              : "";

          writeFileSync(
            BASE_PATH,
            [baseContent, variant].filter(Boolean).join(EOL)
          );
        },
        buildEnd() {
          writeFileSync(BASE_PATH, baseContent);
        },
      },
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
