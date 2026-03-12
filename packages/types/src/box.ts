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
] as const;

export type BoxColorVariation = (typeof BOX_VARIANTS)[number];

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
