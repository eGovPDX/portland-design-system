/**
 * @file Card component types
 * @description Shared TypeScript types for Card components across all frameworks
 */

import type { BoxProps } from "./box";

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
export interface CardProps extends BoxProps {
  /**
   * Whether the card has a border or not
   * @default true
   */
  border?: boolean;

  /**
   * Layout of the card
   * @default "vertical"
   */
  layout?: CardLayout;
}

export interface CardMediaProps extends BoxProps {
  /**
   * Position of the media within the card
   * @default "left"
   */
  position?: MediaPosition;
}
