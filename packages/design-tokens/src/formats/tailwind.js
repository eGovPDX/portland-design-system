/**
 * Tailwind Theme CSS Format
 *
 * Generates a Tailwind-compatible CSS file with CSS custom properties
 * organized by Tailwind utility categories for easy integration with
 * Tailwind's theme configuration.
 */

import { fileHeader } from "style-dictionary/utils";

export default {
  name: "css/tailwind",
  format: async ({ dictionary, file }) =>
    (await fileHeader({ file })) +
    `
@theme {
  --*: initial;
${dictionary.allTokens.map((token) => `  --${token.name}: ${token.$value};`).join("\n")}
}`.trimStart(),
};
