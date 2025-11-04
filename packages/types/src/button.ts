/**
 * @file Button component types
 * @description Shared TypeScript types for Button components across all frameworks
 */

/**
 * Available button variants based on design system color tokens
 */
export const BUTTON_VARIANTS = [
  "primary",
  "secondary",
  "accent-cool",
  "accent-warm",
  "base",
  "outline",
  "outline-inverse",
  "unstyled",
] as const;

export type ButtonVariant = (typeof BUTTON_VARIANTS)[number];

/**
 * Available button sizes
 */
export const BUTTON_SIZES = ["default", "small", "big"] as const;

export type ButtonSize = (typeof BUTTON_SIZES)[number];

/**
 * HTML button type attribute values
 */
export const BUTTON_TYPES = ["button", "submit", "reset"] as const;

export type ButtonType = (typeof BUTTON_TYPES)[number];

/**
 * Core button properties shared across all framework implementations
 */
export interface ButtonProps {
  /**
   * Visual style variant of the button
   * @default "primary"
   */
  variant?: ButtonVariant;

  /**
   * Size of the button
   * @default "default"
   */
  size?: ButtonSize;

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
