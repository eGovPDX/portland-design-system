import StyleDictionary from "style-dictionary";
import type { Format } from "style-dictionary/types";
import { fileHeader } from "style-dictionary/utils";

import type { VariantCategory } from "./variants.js";

/**
 * Custom formats for token output
 */

type VariantFormatOptions = {
  category?: VariantCategory;
  name?: string;
};

export const tailwind: Format = {
  name: "css/tailwind",
  format: async ({ dictionary, file, options }) => {
    const { category, name } = options as VariantFormatOptions;

    if (category && !name) {
      throw new Error(`Variant name is required when category is specified`);
    }

    const content = [];

    if (fileHeader) {
      content.push(await fileHeader({ file }));
    }

    let tabSize = 1;

    switch (category) {
      case "breakpoint":
        content.push(`@media (width >= --theme(--breakpoint-${name})) {`);
        content.push("  :root,");
        content.push("  :host {");
        tabSize = 2;
        break;

      case "color":
        content.push(`@variant ${name} {`);
        tabSize = 1;
        break;

      default:
        content.push("@theme {");
        content.push("  --*: initial;");
    }

    for (const token of dictionary.allTokens) {
      content.push(`${"  ".repeat(tabSize)}--${token.name}: ${token.$value};`);
    }

    for (let i = tabSize; i > 0; i--) {
      content.push(`${"  ".repeat(i - 1)}}`);
    }

    return content.join("\n");
  },
};

/**
 * Custom format names for use in platform configurations
 */
export const FORMATS = {
  tailwind: tailwind.name,
} as const;

/**
 * All custom format definitions for registration
 */
const ALL_FORMATS = [tailwind];

/**
 * Register all custom formats with Style Dictionary
 */
export function registerFormats(): void {
  ALL_FORMATS.forEach((format) => {
    StyleDictionary.registerFormat(format);
  });
}

export default FORMATS;
