import { readdirSync, statSync } from "fs";
import { join, parse, resolve } from "path";
import { TOKENS_DIR } from "./constants";
import type { Filter } from "style-dictionary/types";

const VARIANT_CATEGORIES = ["breakpoint", "color"] as const;

export type VariantCategory = (typeof VARIANT_CATEGORIES)[number];

export interface VariantFile {
  name: string;
  category?: VariantCategory;
  paths: Array<string>;
  filter: Filter["filter"];
  description?: string;
}

// Default variants configuration
const DEFAULT_VARIANTS: Record<VariantCategory, string> = {
  breakpoint: "xs",
  color: "light",
};

/**
 * Dynamically discover all variant mode folders from the tokens/variant directory
 * Combines all token files under each mode folder into a single output
 * Example: variant/color/light/*.tokens.json → color.css (default) or color-light.css
 */

function variantPath(category: VariantCategory, name: string): string {
  return resolve(TOKENS_DIR, "variant", category, name, "**/*.tokens.json");
}

export function getVariants(): VariantFile[] {
  const variantDir = "src/tokens/variant";

  const variants: Map<string, VariantFile> = new Map([
    [
      "base",
      {
        name: "base",
        paths: [
          ...VARIANT_CATEGORIES.map((category) =>
            variantPath(category, DEFAULT_VARIANTS[category])
          ),
        ],
        filter: (token) =>
          ![resolve(TOKENS_DIR, "primitive")].some((exclusion) =>
            parse(token.filePath).dir.includes(exclusion)
          ),
        description: "Default tokens",
      },
    ],
  ]);

  // Scan top-level categories (color, responsive)
  const variantCategories = readdirSync(variantDir).filter((item) =>
    statSync(join(variantDir, item)).isDirectory()
  ) as VariantCategory[];

  for (const category of variantCategories) {
    const categoryPath = join(variantDir, category);

    // Scan mode folders under each category (light, dark, xs, xl)
    const names = readdirSync(categoryPath, { withFileTypes: true })
      .filter((item) => item.isDirectory())
      .map((item) => item.name);

    for (const name of names) {
      // Check if this mode is the default for this category
      const isDefault = DEFAULT_VARIANTS[category] === name;

      if (isDefault) {
        continue; // Default variant already added
      }

      const modePath = join(categoryPath, name);

      const variantName = variants.has(category) ? `${category}-${name}` : name;

      // Get all token files in this mode folder
      const tokenFiles = readdirSync(modePath)
        .filter((file) => file.endsWith(".tokens.json"))
        .map((file) => join(modePath, file).replace("src/tokens/", ""));

      if (tokenFiles.length > 0) {
        variants.set(variantName, {
          name: variantName,
          category,
          paths: [variantPath(category, name)],
          filter: (token) =>
            ![
              resolve(TOKENS_DIR, "primitive"),
              resolve(TOKENS_DIR, "base"),
            ].some((exclusion) =>
              parse(token.filePath).dir.includes(exclusion)
            ),
          description: `Combined tokens from ${category}/${name}`,
        });
      }
    }
  }

  return Array.from(variants.values());
}
