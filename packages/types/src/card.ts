/**
 * @file Card component types
 * @description Shared TypeScript types for Card components across all frameworks
 */

/**
 * Available card layouts based on design system layout options
 */
export const CARD_LAYOUTS = ["horizontal", "vertical"] as const;

export type CardLayout = (typeof CARD_LAYOUTS)[number];

/**
 * Available media positions for horizontal cards based on design system layout options
 */
export const MEDIA_POSITIONS = ["left", "right"] as const;

export type MediaPosition = (typeof MEDIA_POSITIONS)[number];

/**
 * Core card properties shared across all framework implementations
 */
export interface CardProps {
  /**
   * Layout of the card
   * @default "vertical"
   */
  layout?: CardLayout;
}

/**
 * Card slots for framework implementations that support slotted content
 */
export interface CardSlots {
  /**
   * Header slot for card media or icon
   */
  header?: unknown;

  /**
   * Body slot for card content
   */
  body?: unknown;

  /**
   * Footer slot for card CTA button or links
   */
  footer?: unknown;
}

/**
 * Extended Card props including slots for template-based frameworks
 */
export interface CardPropsWithSlots extends CardProps {
  /**
   * Header slot for card media or icon
   */
  header?: string | unknown;

  /**
   * Body slot for card content
   */
  body?: string | unknown;

  /**
   * Footer slot for card CTA button or links
   */
  footer?: string | unknown;
}
