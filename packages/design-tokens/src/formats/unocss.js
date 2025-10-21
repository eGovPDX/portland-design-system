import prettier from "prettier";
import StyleDictionary from "style-dictionary";

/**
 * This custom format generates a JavaScript module containing a theme object
 * compatible with UnoCSS's `theme` configuration.
 *
 * It maps Style Dictionary categories to UnoCSS theme keys (e.g., 'color' -> 'colors').
 */
StyleDictionary.registerFormat({
  name: "javascript/unocss",
  format: async function ({ dictionary }) {
    const theme = {};

    dictionary.allTokens.forEach((token) => {
      // Determine the UnoCSS theme key (e.g., 'colors', 'fontSize')
      const themeKey = token.attributes.category;
      //   if (!themeKey) {
      //     return; // Skip tokens that don't map to a theme property
      //   }

      // Get the final key for the token (e.g., 'primary', '400')
      // This uses the last part of the token's path.
      const tokenName = token.name;

      // Ensure the theme category object exists
      if (!theme[themeKey]) {
        theme[themeKey] = {};
      }

      // Assign the CSS variable to the theme object
      // Assumes you have a transform that creates the CSS variable name.
      // The `token.name` is often the kebab-cased variable name, e.g., 'color-primary'.
      theme[themeKey][tokenName] = token.$value;
    });

    return prettier.format(
      ["export default " + JSON.stringify(theme, null, 2) + ";"].join("\n"),
      {
        parser: "babel",
      },
    );
  },
});
