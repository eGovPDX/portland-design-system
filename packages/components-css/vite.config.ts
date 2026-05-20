import { readdirSync } from "fs";
import { EOL } from "os";
import { basename, resolve, extname } from "path";
import tailwind from "@tailwindcss/vite";
import { defineConfig, Plugin, PluginOption } from "vite";

const COMPONENTS_DIR = resolve(__dirname, "src");
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
  .filter((file) => extname(file) === ".css");

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

const virtualDarkMode = ({
  mode,
  entry,
}: {
  mode: string;
  entry: Record<string, string>;
}): PluginOption => {
  return {
    name: "virtual-dark-mode",
    enforce: "pre",
    transform(code: string, id: string) {
      if (mode == "development" && Object.values(entry).includes(id)) {
        // Only include dark mode variants in development for faster builds
        return ["@custom-variant dark (&:where(.dark, .dark *));", code].join(
          EOL
        );
      }

      return code;
    },
  };
};

const virtualBarrel = (): Plugin => {
  const virtualModuleId = "virtual:components-barrel.css";
  const resolvedVirtualModuleId = "\0" + virtualModuleId;

  return {
    name: "virtual-components-barrel",
    enforce: "pre",
    resolveId(id: string) {
      if (id.endsWith(virtualModuleId)) return resolvedVirtualModuleId;
    },
    load(id: string) {
      if (id === resolvedVirtualModuleId) {
        // This content will be generated dynamically in the plugin's buildStart hook
        return [
          "/* Auto-generated file - do not edit */",
          "",
          // Generate imports: base files first, then component files alphabetically
          ...[
            ...baseFiles.filter((f) => all.includes(f)),
            ...components.sort(),
          ].map((f) => `@import "${resolve(COMPONENTS_DIR, f)}";`),
        ].join(EOL);
      }
    },
  };
};

export default defineConfig(({ mode }) => {
  const watch = process.argv.includes("--watch") || process.argv.includes("-w");

  const entry = {
    // Individual component files
    ...entries,
    // Generated barrel file outputs as main.css
    main: "virtual:components-barrel.css",
  };

  return {
    build: {
      outDir: "dist",
      emptyOutDir: true,
      // Only set watch config when in watch mode to prevent always-watching
      watch: watch
        ? {
            chokidar: {
              ignored: (path: string) => [BASE_PATH].includes(resolve(path)),
            },
          }
        : null,
      lib: {
        name: "components-css",
        entry,
        // Only build one format since this is CSS-only, format name is irrelevant
        formats: ["es"],
      },
      cssCodeSplit: true,
    },
    css: {
      transformer: "lightningcss",
    },
    plugins: [virtualDarkMode({ mode, entry }), virtualBarrel(), tailwind()],
  };
});
