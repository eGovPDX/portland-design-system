/**
 * @file Button component types
 * @description Shared TypeScript types for Button components across all frameworks
 */
import type { BoxProps } from "./box";
import { SPACING, type Spacing } from "./spacing";

/**
 * Available button sizes
 */
export const BUTTON_SIZES = SPACING;

export type ButtonSize = Spacing;

/**
 * HTML button type attribute values
 */
export const BUTTON_TYPES = ["button", "submit", "reset"] as const;

export type ButtonType = (typeof BUTTON_TYPES)[number];

/**
 * Core button properties shared across all framework implementations
 */
export interface ButtonProps extends BoxProps {
  /**
   * Size of the button
   * @default "default"
   */
  size?: ButtonSize;

  /**
   * Whether the button should have an outline style
   * @default false
   */
  outline?: boolean;

  /**
   * Whether the button is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * HTML button type attribute
   * @default "button"
   */
  type?: ButtonType;
}

/**
 * Button slots for framework implementations that support slotted content
 */
export interface ButtonSlots {
  /**
   * Default slot for button content
   */
  content?: unknown;

  /**
   * Left/start icon or content slot
   */
  left?: unknown;

  /**
   * Right/end icon or content slot
   */
  right?: unknown;
}

/**
 * Extended button props including slots for template-based frameworks
 */
export interface ButtonPropsWithSlots extends ButtonProps {
  /**
   * Main button content
   */
  content?: string | unknown;

  /**
   * Left icon or content
   */
  left?: string | unknown;

  /**
   * Right icon or content
   */
  right?: string | unknown;
}
