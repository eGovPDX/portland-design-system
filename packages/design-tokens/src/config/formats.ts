import { EOL } from "os";
import StyleDictionary from "style-dictionary";
import type { Format } from "style-dictionary/types";
import { fileHeader } from "style-dictionary/utils";
import { format } from "prettier";

import type { VariantCategory } from "./variants.js";

/**
 * Custom formats for token output
 */

type VariantFormatOptions = {
  category?: VariantCategory;
  name?: string;
  overrides?: Record<
    VariantCategory,
    (
      category: VariantCategory,
      name: string
    ) => { tabs: number; content: string[] }
  >;
};

export const tailwind: Format = {
  name: "css/tailwind",
  format: async ({ dictionary, file, options }) => {
    const { category, name, overrides } = options as VariantFormatOptions;

    if (category && !name) {
      throw new Error(`Variant name is required when category is specified`);
    }

    const frontmatter = [];
    const backmatter = [];

    if (fileHeader) {
      frontmatter.push(await fileHeader({ file }));
    }

    switch (category) {
      case "breakpoint":
        if (overrides?.breakpoint) {
          const { tabs, content } = overrides.breakpoint(category, name!);
          frontmatter.push(...content);
          backmatter.push("}".repeat(tabs));
        } else {
          frontmatter.push(
            `@media (width >= --theme(--breakpoint-${name}))`,
            "{",
            ":root,",
            ":host",
            "{"
          );
          backmatter.push("}".repeat(2));
        }

        break;

      case "color":
        if (overrides?.color) {
          const { tabs, content } = overrides.color(category, name!);
          frontmatter.push(...content);
          backmatter.push("}".repeat(tabs));
        } else {
          frontmatter.push(`@variant ${name}`, "{", ":root,", ":host", "{");
          backmatter.push("}".repeat(2));
        }

        break;

      default:
        frontmatter.push("@theme {");
        frontmatter.push("--*: initial;");
        backmatter.push("}");
    }

    const content = [
      ...frontmatter,
      ...dictionary.allTokens.map(
        (token) => `--${token.name}: ${token.$value};`
      ),
      ...backmatter,
    ];

    return format(content.join(EOL), { parser: "css", printWidth: 128 });
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
