import prettier from "prettier";
import StyleDictionary from "style-dictionary";

/**
 * TypeScript type definition format for UnoCSS theme
 * Generates .d.ts file with proper type definitions
 */
StyleDictionary.registerFormat({
  name: "typescript/unocss-declarations",
  format: async function ({ dictionary }) {
    const theme = {};
    const typeDefinitions = {};

    dictionary.allTokens.forEach((token) => {
      const themeKey = token.attributes.category;
      const tokenName = token.name;

      // Build theme object
      if (!theme[themeKey]) {
        theme[themeKey] = {};
        typeDefinitions[themeKey] = [];
      }

      theme[themeKey][tokenName] = token.$value;
      typeDefinitions[themeKey].push(`"${tokenName}"`);
    });

    // Generate TypeScript interface
    const interfaceDefinitions = Object.entries(typeDefinitions)
      .map(([category, tokens]) => {
        const tokenUnion = tokens.join(" | ");
        return `  ${category}: {
    [key in ${tokenUnion}]: string;
  } & Record<string, string>;`;
      })
      .join("\n");

    const typeScript = `
/**
 * UnoCSS Theme Type Definitions
 * Auto-generated from design tokens
 */
export interface UnoCSSTheme {
${interfaceDefinitions}
}

/**
 * Color token names from design system
 */
export type ColorTokens = ${typeDefinitions.color?.join(" | ") || "string"};

/**
 * Spacing token names from design system  
 */
export type SpacingTokens = ${typeDefinitions.space?.join(" | ") || "string"};

/**
 * Font size token names from design system
 */
export type FontSizeTokens = ${typeDefinitions.size?.join(" | ") || "string"};

/**
 * The complete theme object
 */
declare const theme: UnoCSTheme;
export default theme;
`;

    return prettier.format(typeScript, {
      parser: "typescript",
    });
  },
});
