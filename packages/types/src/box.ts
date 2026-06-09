/**
 * @file Box component types
 * @description Shared TypeScript types for polymorphic Box components across all frameworks
 */

/**
 * Available color schemes based on design system color tokens
 */
export const BOX_COLORS = [
  "default",
  "primary",
  "secondary",
  "success",
  "danger",
  "warning",
  "info",
  "disabled",
  "fixed",
] as const;

export type BoxColorScheme = (typeof BOX_COLORS)[number];

/**
 * Available color variations based on design system tokens
 */
export const BOX_VARIANTS = [
  "subtle",
  "moderate",
  "emphasis",
  "strong",
  "light",
  "dark",
] as const;

export type BoxColorVariation = (typeof BOX_VARIANTS)[number];

/**
 * Error messages for invalid prop combinations in the Box component
 */
export const BOX_ERRORS = {
  "invalid-color-variant":
    "[Box component] The 'light' and 'dark' variants can only be used with the 'fixed' color scheme. Please choose an appropriate variant for the Box component.",
  "invalid-fixed-variant":
    "[Box component] The 'fixed' color scheme can only be used with the 'light' and 'dark' variants. Please choose an appropriate variant for the Box component.",
} as const;

export type BoxError = (typeof BOX_ERRORS)[keyof typeof BOX_ERRORS];

const STANDARD_BOX_VARIANTS: Array<BoxColorVariation> = [
  "subtle",
  "moderate",
  "emphasis",
  "strong",
];

export const BOX_VALID_CONFIGURATIONS: Map<
  BoxColorScheme,
  Array<BoxColorVariation>
> = new Map([
  ["default", STANDARD_BOX_VARIANTS],
  ["primary", STANDARD_BOX_VARIANTS],
  ["secondary", STANDARD_BOX_VARIANTS],
  ["success", STANDARD_BOX_VARIANTS],
  ["danger", STANDARD_BOX_VARIANTS],
  ["warning", STANDARD_BOX_VARIANTS],
  ["info", STANDARD_BOX_VARIANTS],
  ["disabled", STANDARD_BOX_VARIANTS],
  ["fixed", ["dark", "light"]],
]);

export const validateBoxConfiguration = (
  color?: BoxColorScheme,
  variant?: BoxColorVariation
): [BoxColorScheme | undefined, BoxColorVariation | undefined] => {
  const validated: [BoxColorScheme | undefined, BoxColorVariation | undefined] =
    [color, variant];

  if (!color || !variant) {
    return [undefined, undefined];
  }

  if (!BOX_VALID_CONFIGURATIONS.has(color)) {
    console.error(`"${color}" is not a valid box color.`);
    return [undefined, undefined];
  }

  if (!BOX_VALID_CONFIGURATIONS.get(color)?.includes(variant)) {
    console.error(`"${variant}" is not a valid variant for color "${color}".`);
    return [undefined, undefined];
  }

  return validated;
};

/**
 * Core box properties shared across all framework implementations
 */
export interface BoxProps {
  /**
   * Color scheme for background and content colors
   * @default "default"
   */
  color?: BoxColorScheme;

  /**
   * Color variation within the chosen color scheme
   * @default "moderate"
   */
  variant?: BoxColorVariation;
}
