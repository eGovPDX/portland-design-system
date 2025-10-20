import fs from "fs";
import path from "path";

/**
 * Reads design tokens and converts them to UnoCSS theme configuration
 * This creates a bridge between your design tokens and UnoCSS
 */
export function loadDesignTokensTheme() {
  const tokensPath = path.resolve("../design-tokens/src/tokens");

  try {
    // Read color tokens
    const colors = JSON.parse(
      fs.readFileSync(path.join(tokensPath, "colors.json"), "utf8"),
    );

    // Read spacing tokens
    const spacing = JSON.parse(
      fs.readFileSync(path.join(tokensPath, "spacing.json"), "utf8"),
    );

    // Read typography tokens
    const typography = JSON.parse(
      fs.readFileSync(path.join(tokensPath, "typography.json"), "utf8"),
    );

    // Read borders tokens
    const borders = JSON.parse(
      fs.readFileSync(path.join(tokensPath, "borders.json"), "utf8"),
    );

    // Convert design tokens to UnoCSS theme format
    return {
      colors: extractColors(colors),
      spacing: extractSpacing(spacing),
      fontSize: extractFontSizes(typography),
      fontWeight: extractFontWeights(typography),
      borderRadius: extractBorderRadius(borders),
    };
  } catch (error) {
    // eslint-disable-next-line no-undef
    console.warn("Could not load design tokens:", error.message);
    // Fallback to hardcoded values
    return getFallbackTheme();
  }
}

/**
 * Extract colors from design tokens and map to CSS custom properties
 */
function extractColors(colorTokens) {
  const colors = {};

  // Recursive function to process nested color tokens
  function processColors(obj, prefix = "") {
    for (const [key, value] of Object.entries(obj)) {
      if (value.$value && value.$type === "color") {
        // Convert to CSS custom property format
        const tokenName = prefix ? `${prefix}-${key}` : key;
        colors[tokenName] = `var(--color-${tokenName})`;
      } else if (typeof value === "object" && !value.$value) {
        // Recurse into nested objects
        const newPrefix = prefix ? `${prefix}-${key}` : key;
        processColors(value, newPrefix);
      }
    }
  }

  if (colorTokens.color) {
    processColors(colorTokens.color);
  }

  return colors;
}

/**
 * Extract spacing values from design tokens
 */
function extractSpacing(spacingTokens) {
  const spacing = {};

  function processSpacing(obj, prefix = "") {
    for (const [key, value] of Object.entries(obj)) {
      if (value.$value && value.$type === "dimension") {
        const tokenName = prefix ? `${prefix}-${key}` : key;
        spacing[tokenName] = `var(--spacing-${tokenName})`;
      } else if (typeof value === "object" && !value.$value) {
        const newPrefix = prefix ? `${prefix}-${key}` : key;
        processSpacing(value, newPrefix);
      }
    }
  }

  if (spacingTokens.spacing) {
    processSpacing(spacingTokens.spacing);
  }

  return spacing;
}

/**
 * Extract font sizes from typography tokens
 */
function extractFontSizes(typographyTokens) {
  const fontSize = {};

  function processFontSizes(obj, prefix = "") {
    for (const [key, value] of Object.entries(obj)) {
      if (value.$value && value.$type === "fontSizes") {
        const tokenName = prefix ? `${prefix}-${key}` : key;
        fontSize[tokenName] = `var(--text-${tokenName})`;
      } else if (typeof value === "object" && !value.$value) {
        const newPrefix = prefix ? `${prefix}-${key}` : key;
        processFontSizes(value, newPrefix);
      }
    }
  }

  if (typographyTokens.typography || typographyTokens.text) {
    processFontSizes(typographyTokens.typography || typographyTokens.text);
  }

  return fontSize;
}

/**
 * Extract font weights from typography tokens
 */
function extractFontWeights(typographyTokens) {
  const fontWeight = {};

  function processFontWeights(obj, prefix = "") {
    for (const [key, value] of Object.entries(obj)) {
      if (value.$value && value.$type === "fontWeights") {
        const tokenName = prefix ? `${prefix}-${key}` : key;
        fontWeight[tokenName] = `var(--font-weight-${tokenName})`;
      } else if (typeof value === "object" && !value.$value) {
        const newPrefix = prefix ? `${prefix}-${key}` : key;
        processFontWeights(value, newPrefix);
      }
    }
  }

  if (typographyTokens.typography || typographyTokens.text) {
    processFontWeights(typographyTokens.typography || typographyTokens.text);
  }

  return fontWeight;
}

/**
 * Extract border radius from border tokens
 */
function extractBorderRadius(borderTokens) {
  const borderRadius = {};

  function processBorderRadius(obj, prefix = "") {
    for (const [key, value] of Object.entries(obj)) {
      if (
        value.$value &&
        (value.$type === "borderRadius" || value.$type === "dimension")
      ) {
        const tokenName = prefix ? `${prefix}-${key}` : key;
        borderRadius[tokenName] = `var(--radius-${tokenName})`;
      } else if (typeof value === "object" && !value.$value) {
        const newPrefix = prefix ? `${prefix}-${key}` : key;
        processBorderRadius(value, newPrefix);
      }
    }
  }

  if (borderTokens.border || borderTokens.radius) {
    processBorderRadius(borderTokens.border || borderTokens.radius);
  }

  return borderRadius;
}

/**
 * Fallback theme if design tokens can't be loaded
 */
function getFallbackTheme() {
  return {
    colors: {
      "primary-medium": "var(--color-primary-medium)",
      "primary-dark": "var(--color-primary-dark)",
      "primary-darker": "var(--color-primary-darker)",
      "secondary-medium": "var(--color-secondary-medium)",
      "secondary-dark": "var(--color-secondary-dark)",
      "secondary-darker": "var(--color-secondary-darker)",
      "accent-cool-medium": "var(--color-accent-cool-medium)",
      "accent-cool-dark": "var(--color-accent-cool-dark)",
      "accent-cool-darker": "var(--color-accent-cool-darker)",
      "base-darkest": "var(--color-base-darkest)",
      "foundation-white": "var(--color-foundation-white)",
      "disabled-dark": "var(--color-disabled-dark)",
      "disabled-lighter": "var(--color-disabled-lighter)",
    },
    spacing: {
      xs: "var(--spacing-xs)",
      sm: "var(--spacing-sm)",
      md: "var(--spacing-md)",
      lg: "var(--spacing-lg)",
      xl: "var(--spacing-xl)",
    },
    fontSize: {
      body: "var(--text-body)",
      "body-sm": "var(--text-body-sm)",
      "body-lg": "var(--text-body-lg)",
      "5xl": "var(--text-5xl)",
    },
    fontWeight: {
      bold: "var(--font-weight-bold)",
    },
    borderRadius: {
      md: "var(--radius-md)",
    },
  };
}
