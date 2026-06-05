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
