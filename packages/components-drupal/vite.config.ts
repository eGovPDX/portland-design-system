import tailwind from "@tailwindcss/vite";
import { defineConfig, PluginOption } from "vite";
import * as fs from "fs";
import { basename, extname, resolve } from "path";
import { stringify } from "yaml";
import * as path from "path";

interface ComponentInfo {
  path: string;
  relativePath: string;
  files: {
    yaml?: string;
    js?: string;
    css?: string;
    twig?: string;
  };
}

const COMPONENTS_DIR = resolve(process.cwd(), "components");

function scanComponents(): Map<string, ComponentInfo> {
  const src = resolve(process.cwd(), "components");
  const components = new Map<string, ComponentInfo>();

  fs.readdirSync(src, { withFileTypes: true, recursive: true })
    .filter((dirent) => dirent.isDirectory())
    .filter((dirent) =>
      fs
        .readdirSync(path.join(dirent.parentPath, dirent.name))
        .some((file) => /\.component\.y[a]?ml/.test(file))
    )
    .forEach((dir) => {
      const componentPath = path.resolve(dir.parentPath, dir.name);
      const relativePath = path.relative(src, componentPath);

      console.debug(`Processing component directory: ${componentPath}...`);

      const files = fs.readdirSync(componentPath);
      const componentInfo: ComponentInfo = {
        path: componentPath,
        relativePath,
        files: {},
      };

      for (const file of files) {
        if (/\.component\.y[a]?ml/.test(file)) {
          componentInfo.files.yaml = file;
        } else if (
          /\.(([cm]?[j|t])+)s$/.test(file) &&
          !file.includes(".stories.") &&
          !file.includes(".test.")
        ) {
          componentInfo.files.js = file;
        } else if (/\.css$/.test(file)) {
          componentInfo.files.css = file;
        } else if (/\.twig$/.test(file)) {
          componentInfo.files.twig = file;
        }
      }

      components.set(relativePath, componentInfo);
    });

  console.debug(`Discovered ${components.size} components`);
  return components;
}

const COMPONENTS = scanComponents();

function getComponentEntryPoints() {
  const entryPoints: Record<string, string> = {};

  for (const [relativePath, info] of COMPONENTS) {
    if (info.files.js) {
      entryPoints[
        `components/${relativePath}/${basename(info.files.js, extname(info.files.js))}`
      ] = path.join(info.path, info.files.js);
    }

    if (info.files.css) {
      entryPoints[
        `components/${relativePath}/${basename(info.files.css, extname(info.files.css)) + ".css"}`
      ] = path.join(info.path, info.files.css);
    }
  }

  console.debug("Discovered entry points:", entryPoints);
  return entryPoints;
}

function withinPath(filePath: string, dirPath: string) {
  const relative = path.relative(dirPath, filePath);
  return !relative.startsWith("..") && !path.isAbsolute(relative);
}

export default defineConfig(({ mode }) => {
  // Get all component entry points dynamically
  const entryPoints = getComponentEntryPoints();

  return {
    build: {
      cssCodeSplit: true,
      emptyOutDir: true,
      lib: {
        entry: {
          ...entryPoints,
        },
        formats: ["es"],
      },
      rollupOptions: {
        output: {
          inlineDynamicImports: false, // Allow code splitting for multiple entries
          // Control chunk naming
          chunkFileNames: "js/[name][extname]",
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
    plugins: [
      {
        name: "sdc-copy",
        writeBundle() {
          const out = resolve(process.cwd(), "dist", "components");

          // Ensure dist/components directory exists
          if (!fs.existsSync(out)) {
            fs.mkdirSync(out, { recursive: true });
          }

          for (const [relativePath, info] of COMPONENTS) {
            const distComponentPath = path.join(out, relativePath);

            // Ensure component directory exists in dist
            if (!fs.existsSync(distComponentPath)) {
              fs.mkdirSync(distComponentPath, { recursive: true });
            }

            // Copy YAML file
            if (info.files.yaml) {
              fs.copyFileSync(
                path.join(info.path, info.files.yaml),
                path.join(distComponentPath, info.files.yaml)
              );
            }

            if (info.files.twig) {
              fs.copyFileSync(
                path.join(info.path, info.files.twig),
                path.join(distComponentPath, info.files.twig)
              );
            }
          }

          // Copy library files and other root files
          const rootFiles = [
            "portland_components.libraries.yml",
            "portland_components.info.yml",
          ];

          const distDir = resolve(process.cwd(), "dist");

          for (const file of rootFiles) {
            const srcFile = resolve(process.cwd(), file);
            const distFile = path.join(distDir, file);

            if (fs.existsSync(srcFile)) {
              fs.copyFileSync(srcFile, distFile);
            }
          }
        },
      } satisfies PluginOption,
      {
        name: "drupal-module",
        generateBundle(_options, bundle) {
          const moduleName = "portland_components";
          const moduleDir = resolve(process.cwd(), "dist");

          fs.mkdirSync(moduleDir, { recursive: true });

          const librariesYmlPath = path.join(
            moduleDir,
            `${moduleName}.libraries.yml`
          );
          const infoYmlPath = path.join(moduleDir, `${moduleName}.info.yml`);

          // Remove existing libraries.yml and info.yml if they exist
          if (fs.existsSync(librariesYmlPath)) {
            fs.unlinkSync(librariesYmlPath);
          }
          if (fs.existsSync(infoYmlPath)) {
            fs.unlinkSync(infoYmlPath);
          }

          const staticInfoYmlContent = `
name: 'Portland Components'
type: module
description: 'A library of reusable components for Drupal.'
core_version_requirement: ^10
package: Custom
dependencies:
  - drupal:sdc
      `;

          fs.writeFileSync(infoYmlPath, staticInfoYmlContent.trim() + "\n");

          // Ensure dist directory exists
          if (!fs.existsSync(moduleDir)) {
            fs.mkdirSync(moduleDir, { recursive: true });
          }

          const library = {
            global: {} as Record<string, Record<string, unknown>>,
          };

          const componentCss = [...COMPONENTS.entries()].reduce(
            (acc, [_, info]) => {
              if (!info.files.css) {
                return acc;
              }

              return acc.concat(
                path.join(info.relativePath, info.files.css) || []
              );
            },
            [] as string[]
          );

          // Add each chunk to libraries.yml if not already present
          for (const [fileName] of Object.entries(bundle)
            .filter(([_, chunk]) => !(chunk.type == "chunk"))
            .filter(([path]) => !withinPath(path, COMPONENTS_DIR))) {
            if (/[m]?js$/.test(fileName)) {
              library.global.js = library.global.js || {};
              library.global.js[fileName] = {};
            }

            if (
              /\.css$/.test(fileName) &&
              !componentCss.some(
                (css) => path.relative(COMPONENTS_DIR, fileName) == css
              )
            ) {
              library.global.css = library.global.css || {};
              library.global.css[fileName] = {};
            }
          }

          fs.writeFileSync(
            path.join(moduleDir, `${moduleName}.libraries.yml`),
            stringify(library, {
              indent: 2,
            })
          );
        },
      } satisfies PluginOption,
      tailwind() as PluginOption,
    ],
  };
});
