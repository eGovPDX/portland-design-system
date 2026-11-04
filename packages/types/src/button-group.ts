/**
 * @file Button Group component types
 * @description Shared TypeScript types for Button Group components across all frameworks
 */

/**
 * Core button group properties shared across all framework implementations
 */
export interface ButtonGroupProps {
  /**
   * Whether the actions appear connected without gaps
   * @default false
   */
  segmented?: boolean;

  /**
   * Accessible name describing the group of actions
   */
  label?: string;
}
