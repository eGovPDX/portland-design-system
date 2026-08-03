/**
 * @file Alert component types
 * @description Shared TypeScript types for Alert components across all frameworks
 */

/**
 * Available alert variants based on design system color tokens
 */
export const ALERT_SIZES = ["default", "slim"] as const;

export type AlertSize = (typeof ALERT_SIZES)[number];

/**
 * Core alert properties shared across all framework implementations
 */
export interface AlertProps {
  /**
   * Visual style variant of the alert
   * @default "default"
   */
  size?: AlertSize;

  /**
   * Is alert dismissible
   * @default true
   */
  dismissible?: boolean;
}
