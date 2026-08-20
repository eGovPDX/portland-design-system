import { copyFile, mkdir, readdir } from "fs/promises";
import { dirname, join } from "path";

import { ASSETS_DIR, DIST_DIR } from "./config/constants.js";

/**
 * AssetCopier manages copying assets..
 */
export class AssetCopier {
  /**
   * Copy assets from the source directory to the distribution directory.
   */
  async copy(): Promise<void> {
    console.log("📚 Copying assets...");

    const files = await readdir(ASSETS_DIR, {
      encoding: "utf-8",
      recursive: true,
    }).catch(() => {
      console.error(`Assets not created yet at ${ASSETS_DIR}`);
      throw new Error(`Assets not created yet at ${ASSETS_DIR}`);
    });

    if (files.length === 0) {
      throw new Error("No assets found to copy.");
    }

    for (const file of files) {
      console.log(`📄 Copying asset: ${file}...`);

      const filePath = join(ASSETS_DIR, file);
      const distPath = join(DIST_DIR, "assets", file);

      const distDir = dirname(distPath);

      await readdir(distDir, { encoding: "utf-8" }).catch(() => {
        return mkdir(distDir, { recursive: true });
      });

      await copyFile(filePath, distPath);
    }
  }
}

// Shared singleton instance for use across CLI commands
export const ASSET_COPIER = new AssetCopier();
