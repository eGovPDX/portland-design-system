/**
 * @file Collection component types
 * @description Shared TypeScript types for Collection components across all frameworks
 */
import type { BoxProps } from "./box";

/**
 * Core collection properties shared across all framework implementations
 */
export interface CollectionProps extends BoxProps {
  /**
   * Whether the collection has a divider between items
   * @default false
   */
  divider?: boolean;
}
