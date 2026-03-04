/**
 * @file Alert component types
 * @description Shared TypeScript types for Alert components across all frameworks
 */

/**
 * Available alert variants based on design system color tokens
 */
export const ALERT_VARIANTS = ["default", "slim"] as const;

export type AlertVariant = (typeof ALERT_VARIANTS)[number];

/**
 * Alert type attribute values
 */
export const ALERT_TYPES = ["info", "success", "warning", "error"] as const;

export type AlertType = (typeof ALERT_TYPES)[number];

/**
 * Core alert properties shared across all framework implementations
 */
export interface AlertProps {
  /**
   * Visual style variant of the alert
   * @default "default"
   */
  variant?: AlertVariant;

  /**
   * Type of the alert
   * @default "info"
   */
  type?: AlertType;

  /**
   * Show icon
   * @default true
   */
  icon?: boolean;

  /**
   * Alert heading
   */
  heading?: string;

  /**
   * Alert text content
   */
  text: string;

  /**
   * Is alert dismissible
   * @default true
   */
  dismissible?: boolean;
}
