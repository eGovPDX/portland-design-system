import fs from "fs";
import { resolve } from "path";
import path from "path";
import type { Plugin } from "vite";

/**
 * Vite plugin to copy SDC component files to dist
 */
export function sdcCopyPlugin(): Plugin {
  return {
    name: "sdc-copy",
    writeBundle() {
      const componentsDir = resolve(process.cwd(), "src");
      const distComponentsDir = resolve(process.cwd(), "dist", "components");

      // Ensure dist/components directory exists
      if (!fs.existsSync(distComponentsDir)) {
        fs.mkdirSync(distComponentsDir, { recursive: true });
      }

      if (fs.existsSync(componentsDir)) {
        const componentDirs = fs
          .readdirSync(componentsDir, { withFileTypes: true })
          .filter((dirent) => dirent.isDirectory())
          .map((dirent) => dirent.name);

        for (const componentDir of componentDirs) {
          const srcComponentPath = path.join(componentsDir, componentDir);
          const distComponentPath = path.join(distComponentsDir, componentDir);

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
            if (file.match(/\.[cmjt]*s$/)) {
              continue;
            }

            // Copy other files (twig, yml, css, etc.)
            if (fs.statSync(srcFile).isFile()) {
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
      const specialFiles = { "DIST_README.md": "README.md" }; // Rename during copy
      const distDir = resolve(process.cwd(), "dist");

      for (const file of rootFiles) {
        const srcFile = resolve(process.cwd(), file);
        const distFile = path.join(distDir, file);

        if (fs.existsSync(srcFile)) {
          fs.copyFileSync(srcFile, distFile);
        }
      }

      // Copy special files with renaming
      for (const [srcName, distName] of Object.entries(specialFiles)) {
        const srcFile = resolve(process.cwd(), srcName);
        const distFile = path.join(distDir, distName);

        if (fs.existsSync(srcFile)) {
          fs.copyFileSync(srcFile, distFile);
        }
      }

      console.log(
        "Copied component files to dist/components and root files to dist/"
      );
    },
  };
}

export function drupalModule(): Plugin {
  return {
    name: "drupal-module",
    generateBundle(_options, bundle) {
      const moduleName = "portland_components";
      const moduleDir = resolve(process.cwd(), "dist");
      const librariesYmlPath = path.join(moduleDir, `${moduleName}.libraries.yml`);
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

      fs.writeFileSync(
        infoYmlPath,
        staticInfoYmlContent.trim() + "\n"
      );

      // Ensure dist directory exists
      if (!fs.existsSync(moduleDir)) {
        fs.mkdirSync(moduleDir, { recursive: true });
      }

      let librariesYmlContent = "global:\n  js:";

      // Add each chunk to libraries.yml if not already present
      for (const [fileName, chunk] of Object.entries(bundle)) {
        if (
          (fileName.endsWith(".js") || fileName.endsWith(".mjs")) &&
          chunk.type === "chunk" &&
          !chunk.isEntry
        ) {
          const chunkName = path.basename(fileName, path.extname(fileName));
          if (!librariesYmlContent.includes(`${chunkName}:`)) {
            librariesYmlContent += `\n    ${fileName}: {}`;
          }
        }
      }

      if (librariesYmlContent.trim()) {
        fs.writeFileSync(librariesYmlPath, librariesYmlContent.trim() + "\n");
      }
    },

    buildEnd() {
      console.debug("Creating drupal module files...");

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
        infoYmlContent.trim(),
      );

      // Create .module file (empty for now)
      fs.writeFileSync(path.join(moduleDir, `${moduleName}.module`), "");

      // Create .install file (empty for now)
      fs.writeFileSync(path.join(moduleDir, `${moduleName}.install`), "");

      console.log(`Drupal module files created in ${moduleDir}`);
    },
  };
}