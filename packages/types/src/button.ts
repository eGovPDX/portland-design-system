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
 * Core button properties shared across all framework implementations
 */
export interface ButtonProps extends BoxProps {
  /**
   * Size of the button
   * @default "md"
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
}

export type ButtonOwnProps = Omit<ButtonProps, keyof BoxProps>;

export const BUTTON_VALID_ELEMENTS = ["button", "a"] as const;

export type ButtonValidElement = (typeof BUTTON_VALID_ELEMENTS)[number];

export function validateButtonElement(
  element: string
): asserts element is ButtonValidElement {
  if (!BUTTON_VALID_ELEMENTS.includes(element as ButtonValidElement)) {
    throw new Error(
      `Invalid button element "${element}". Valid elements are: ${BUTTON_VALID_ELEMENTS.join(
        ", "
      )}`
    );
  }
}
