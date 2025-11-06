import tailwind from "@tailwindcss/vite";
import { defineConfig, PluginOption } from "vite";
import * as fs from "fs";
import { stringify } from "yaml";
import { basename, extname, resolve } from "path";
import * as path from "path";

function getComponentEntryPoints() {
  const src = resolve(process.cwd(), "components");

  const entryPoints: Record<string, string> = {};

  // Only those directories that contain a .component.yaml file
  fs.readdirSync(src, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .filter((dirent) =>
      fs
        .readdirSync(path.join(src, dirent.name))
        .some((file) => /\.component\.y[a]?ml/.test(file))
    )
    .map((dirent) => dirent.name)
    .forEach(function (dir) {
      const componentPath = path.join(src, dir);

      fs.readdirSync(componentPath)
        .filter(
          (file) =>
            // Look for js-like and css files only
            /\.(([cm]?[j|t])+|(cs))s$/.test(file) &&
            !file.includes(".stories.") &&
            !file.includes(".test.")
        )
        .forEach((file) => {
          // Every component should have a css file, and may have a javascript or typescripot file.
          // We neeed to treat the entries for them slightly differently to ensure proper naming.
          const entry =
            basename(file, extname(file)) +
            (/css$/.test(extname(file)) ? ".css" : "");

          entryPoints[`components/${dir}/${entry}`] = path.join(
            componentPath,
            file
          );
        });
    });

  console.debug("Discovered entry points:", entryPoints);
  return entryPoints;
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
          const src = resolve(process.cwd(), "components");
          const out = resolve(process.cwd(), "dist", "components");

          // Ensure dist/components directory exists
          if (!fs.existsSync(out)) {
            fs.mkdirSync(out, { recursive: true });
          }

          if (fs.existsSync(src)) {
            const components = fs
              .readdirSync(src, { withFileTypes: true })
              .filter((dirent) => dirent.isDirectory())
              .filter((dirent) =>
                fs
                  .readdirSync(path.join(src, dirent.name))
                  .some((file) => /\.component\.y[a]?ml/.test(file))
              )
              .map((dirent) => dirent.name);

            for (const dir of components) {
              const srcComponentPath = path.join(src, dir);
              const distComponentPath = path.join(out, dir);

              // Ensure component directory exists in dist
              if (!fs.existsSync(distComponentPath)) {
                fs.mkdirSync(distComponentPath, { recursive: true });
              }

              // Copy all files except JS/MJS
              const files = fs.readdirSync(srcComponentPath);
              for (const file of files) {
                const srcFile = path.join(srcComponentPath, file);
                const distFile = path.join(distComponentPath, file);

                // Skip JS/MJS files (they're bundled separately)
                if (/\.[cmjts]+s$/.test(file)) {
                  continue;
                }

                // Copy other files (twig, yml, css, etc.)
                if (fs.statSync(srcFile).isFile()) {
                  console.debug(`Copying file: ${srcFile} to ${distFile}...`);
                  fs.copyFileSync(srcFile, distFile);
                }
              }
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

          // Add each chunk to libraries.yml if not already present
          for (const [fileName] of Object.entries(bundle).filter(
            ([_, chunk]) => !(chunk.type == "chunk")
          )) {
            if (/[m]?js$/.test(fileName)) {
              library.global.js = library.global.js || {};
              library.global.js[fileName] = {};
            }

            if (/css$/.test(fileName)) {
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

        buildEnd() {
          const moduleName = "portland_components";
          const moduleDir = resolve(process.cwd(), "dist");

          // Ensure dist directory exists
          if (!fs.existsSync(moduleDir)) {
            fs.mkdirSync(moduleDir, { recursive: true });
          }

          // Create .info.yml file
          const infoYmlContent = `
name: 'Portland Components'
type: module
description: 'A library of reusable components for Drupal.'
core_version_requirement: ^10
package: Custom
dependencies:
  - drupal:sdc
`;
          fs.writeFileSync(
            path.join(moduleDir, `${moduleName}.info.yml`),
            infoYmlContent.trim()
          );

          console.info(`Generated ${moduleName}.info.yml`);
        },
      } satisfies PluginOption,
      tailwind() as PluginOption,
    ],
  };
});
