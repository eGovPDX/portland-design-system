/**
 * @file Alert component types
 * @description Shared TypeScript types for Alert components across all frameworks
 */

import type { BoxProps } from "./box";

/**
 * Available alert variants based on design system tokens
 */
export const ALERT_SIZES = ["default", "slim"] as const;

export type AlertSize = (typeof ALERT_SIZES)[number];

/**
 * Available alert roles based on ARIA specifications
 */
export const ALERT_ROLES = ["status", "alert"] as const;

export type AlertRole = (typeof ALERT_ROLES)[number];

/**
 * Core alert properties shared across all framework implementations
 */
export interface AlertProps extends BoxProps {
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

  /**
   * ARIA role for the alert
   * @default "status"
   */
  role?: AlertRole;
}
