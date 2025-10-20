import { defineConfig } from "vite";
import { resolve } from "path";
import * as fs from "fs";
import * as path from "path";
import { drupalModule, sdcCopyPlugin } from "./vite-plugins.js";

function getComponentEntryPoints() {
  const src = resolve(process.cwd(), "src");
  const entryPoints: Record<string, string> = {};

  // Only those directories that contain a .component.yaml file
  const componentDirs = fs
    .readdirSync(src, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .filter((dirent) =>
      fs
        .readdirSync(path.join(src, dirent.name))
        .some((file) => /\.component\.y[a]?ml/.test(file))
    )
    .map((dirent) => dirent.name);

  console.debug("Found component directories:", componentDirs);

  for (const dir of componentDirs) {
    const componentPath = path.join(src, dir);

    // Look for JS/MJS files in the component directory
    const entry = fs
      .readdirSync(componentPath)
      .find(
        (file) =>
          /\.[cmjt]*s$/.test(file) &&
          !file.includes(".stories.") &&
          !file.includes(".test.")
      );

    console.debug(`Component: ${dir}, Entry file: ${entry}`);

    if (entry) {
      entryPoints[dir] = path.join(componentPath, entry);
    }
  }

  return entryPoints;
}

export default defineConfig(({ mode }) => {
  // Get all component entry points dynamically
  const entryPoints = getComponentEntryPoints();

  console.debug("Building with entry points:", Object.keys(entryPoints));

  return {
    build: {
      lib: {
        entry: {
          ...entryPoints,
        }, // Multiple entry points
        name: "PortlandComponents",
        fileName: (_format, entryName) => {
          // Generate appropriate filenames for each entry
          return `components/${entryName}/${entryName}.js`;
        },
        formats: ["es"], // Only ES format for multiple entries
      },
      rollupOptions: {
        output: {
          inlineDynamicImports: false, // Allow code splitting for multiple entries
          // Control chunk naming
          chunkFileNames: (chunkInfo) => `js/${chunkInfo.name || 'chunk'}.js`,
        },
      },
      outDir: "dist",
      minify: mode === "production" ? "esbuild" : false, // Only minify in production
      terserOptions: {
        compress: {
          drop_console: mode === "production", // Remove console.log in production only
          drop_debugger: true, // Always remove debugger statements
        },
        mangle: {
          keep_classnames: true, // Keep class names for web components
          keep_fnames: true, // Keep function names for Drupal behaviors
        },
        format: {
          comments: false, // Remove comments
        },
      },
    },
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
      },
    },
    plugins: [sdcCopyPlugin(), drupalModule()],
  };
});
