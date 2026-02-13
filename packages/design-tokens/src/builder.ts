import { resolve } from "path";
import StyleDictionary from "style-dictionary";
import type { Config, PlatformConfig } from "style-dictionary/types";

import { processAssets } from "./config/assets.js";
import { DIST_DIR, TOKENS_DIR } from "./config/constants.js";
import { registerFormats } from "./config/formats.js";
import platforms from "./config/platforms.js";
import { registerPreprocessors } from "./config/preprocessors.js";
import { registerTransforms } from "./config/transforms.js";
import { getVariants } from "./config/variants.js";

/**
 * TokenBuilder manages StyleDictionary initialization and builds.
 *
 * This class ensures transforms and formats are only registered once,
 * even when running multiple builds in watch mode.
 */
export class TokenBuilder {
  private initialized = false;

  /**
   * Initialize StyleDictionary transforms and formats.
   * This only runs once, subsequent calls are no-ops.
   */
  initialize(): void {
    if (this.initialized) {
      return;
    }

    console.log("🔧 Registering preprocessors...");
    registerPreprocessors();

    console.log("🔧 Registering transforms...");
    registerTransforms();

    console.log("🔧 Registering formats...");
    registerFormats();

    this.initialized = true;
  }

  /**
   * Build all design token variants.
   * Automatically initializes if not already done.
   */
  async build(): Promise<void> {
    console.log("🚀 Building design tokens...");

    this.initialize();

    console.log("🎨 Processing assets...");
    processAssets();

    console.log("🔍 Analyzing variants...");

    const variants = getVariants();

    const successes: { config: Config }[] = [];
    const failures: { config: Config; error: unknown }[] = [];

    for (const variant of variants) {
      const { category, filter, name } = variant;

      console.log(
        `🔧 Building variant ${[category, variant.name].filter(Boolean).join(" / ")}`
      );

      const config: Config = {
        log: {
          errors: {
            brokenReferences: "throw",
          },
          warnings: "warn",
        },
        source: [
          resolve(TOKENS_DIR, "primitive", "**/*.tokens.json"),
          resolve(TOKENS_DIR, "base", "**/*.tokens.json"),
          ...variant.paths,
        ],
        platforms: [
          platforms.css,
          platforms.js,
          platforms.jsTypes,
          platforms.tailwind,
        ].reduce(
          (acc, generator) => {
            acc[generator.name] = generator(
              category,
              name,
              // Exclude certain paths from tokens builds
              filter
            );
            return acc;
          },
          {} as Record<string, PlatformConfig>
        ),
      };

      try {
        const sd = new StyleDictionary(config);
        await sd.buildAllPlatforms();

        successes.push({ config });

        // print a space between style dictionary output
        console.log();
      } catch (error) {
        console.error(`❌ Error building variant:`, error);
        console.error(`❌ Failed config:`);
        console.error(JSON.stringify(config, null, 2));

        failures.push({ config, error });
      }
    }

    console.log(`✅ Design tokens built successfully!`);
    console.log(`📁 Output directory: ${DIST_DIR}`);
    console.log(
      `📊 Results: ${successes.length} succeeded, ${failures.length} failed`
    );

    if (failures.length > 0) {
      throw new Error(`${failures.length} variant(s) failed to build`);
    }
  }
}

// Shared singleton instance for use across CLI commands
export const TOKEN_BUILDER = new TokenBuilder();
