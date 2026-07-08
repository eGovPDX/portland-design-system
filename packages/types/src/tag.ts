/**
 * @file Tag component types
 * @description Shared TypeScript types for Tag components across all frameworks
 */

/**
 * Available color variations based on design system tokens
 */
export const TAG_VARIANTS = ["info", "success", "warning", "danger"] as const;

export type TagVariant = (typeof TAG_VARIANTS)[number];

/**
 * Core tag properties shared across all framework implementations
 */
export interface TagProps {
  /**
   * Color variation within the chosen color scheme
   * @default "info"
   */
  variant?: TagVariant;
}
