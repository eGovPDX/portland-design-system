import unocssTheme, {
  type UnoCSSTheme,
} from "@cityofportland/design-tokens/unocss/theme.js";

import {
  defineConfig,
  presetAttributify,
  presetIcons,
  type Preset,
} from "unocss";

export default defineConfig<UnoCSSTheme>({
  // Use Tailwind-compatible preset for easy migration
  presets: [
    presetAttributify() as Preset<UnoCSSTheme>,
    presetIcons() as Preset<UnoCSSTheme>,
  ],

  layers: {
    default: 0, // All the utility classes
    preflights: 1, // The browser reset styles and CSS variables
  },

  // Load theme dynamically from design tokens
  theme: unocssTheme,

  // Custom rules for additional CSS variable support
  rules: [
    // Support for design token colors: bg-primary, bg-secondary, etc.
    [
      /^bg-(.+)$/,
      ([, variable], { theme }) => {
        console.debug("[UnoCSS] bg- rule matched:", variable);

        // Try different theme paths for the color
        const colorValue =
          theme.color?.[`color-${variable}`] ||
          theme.semantic?.[`semantic-color-background-${variable}`] ||
          null;

        if (colorValue) {
          console.debug("[UnoCSS] Found color value:", colorValue);
          return {
            "background-color": colorValue,
          };
        }

        console.debug("[UnoCSS] No color found for variable:", variable);
        return { "background-color": "transparent" };
      },
    ],
    [
      /^text-(.*)]$/,
      ([, variable], { theme }) => ({
        color:
          theme.color[`color-${variable}`] ||
          theme.semantic[`semantic-color-text-${variable}`] ||
          theme.font[`font-size-${variable}`],
      }),
    ],
    [
      /^border-([\d]*)]$/,
      ([, variable], { theme }) => ({
        "border-size": theme.size[`size-base-${variable}`],
      }),
    ],
    [
      /^border-([\w]*)]$/,
      ([, variable], { theme }) => ({
        "border-color":
          theme.color?.[`color-${variable}`] ||
          theme.semantic[`semantic-color-border-${variable}`],
      }),
    ],
  ],
});
